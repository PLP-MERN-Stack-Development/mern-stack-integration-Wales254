import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import { storage } from "./storage";
import { hashPassword, comparePassword, generateToken, authMiddleware, optionalAuthMiddleware, type AuthRequest } from "./auth";
import { insertUserSchema, insertCategorySchema, insertPostSchema, insertCommentSchema, insertLikeSchema } from "@shared/schema";
import { z } from "zod";

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = insertUserSchema.extend({
        email: z.string().email(),
      }).parse(req.body);

      const existingUser = await storage.getUserByEmail(data.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }

      const existingUsername = await storage.getUserByUsername(data.username);
      if (existingUsername) {
        return res.status(400).json({ error: "Username already in use" });
      }

      const hashedPassword = await hashPassword(data.password);
      const user = await storage.createUser({
        ...data,
        password: hashedPassword,
      });

      const token = generateToken(user.id);
      const { password, ...userWithoutPassword } = user;

      res.json({ user: userWithoutPassword, token });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = generateToken(user.id);
      const { password: _, ...userWithoutPassword } = user;

      res.json({ user: userWithoutPassword, token });
    } catch (error) {
      res.status(500).json({ error: "Failed to login" });
    }
  });

  app.get("/api/auth/me", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const user = await storage.getUser(req.userId!);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  app.patch("/api/users/:id", authMiddleware, upload.single("profilePicture"), async (req: AuthRequest, res) => {
    try {
      if (req.params.id !== req.userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const updates: any = {};
      if (req.body.fullName) updates.fullName = req.body.fullName;
      if (req.body.bio) updates.bio = req.body.bio;
      if (req.file) updates.profilePicture = `/uploads/${req.file.filename}`;

      const user = await storage.updateUser(req.params.id, updates);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  app.delete("/api/users/:id", authMiddleware, async (req: AuthRequest, res) => {
    try {
      if (req.params.id !== req.userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const success = await storage.deleteUser(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  });

  // Category routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to get categories" });
    }
  });

  app.post("/api/categories", authMiddleware, async (req, res) => {
    try {
      const data = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(data);
      res.json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create category" });
    }
  });

  // Post routes
  app.get("/api/posts", optionalAuthMiddleware, async (req: AuthRequest, res) => {
    try {
      const published = req.query.published === "false" ? false : true;
      const categorySlug = req.query.category as string | undefined;
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;

      const posts = await storage.getAllPosts(published, categorySlug, limit, offset);
      
      const postsWithDetails = await Promise.all(
        posts.map(async (post) => {
          const author = await storage.getUser(post.authorId);
          const category = post.categoryId ? await storage.getCategoryBySlug((await storage.getAllCategories()).find(c => c.id === post.categoryId)?.slug || "") : null;
          const likesCount = (await storage.getLikesByPost(post.id)).length;
          
          return {
            ...post,
            author: author ? { id: author.id, username: author.username, fullName: author.fullName, profilePicture: author.profilePicture } : null,
            category,
            likesCount,
          };
        })
      );

      res.json(postsWithDetails);
    } catch (error) {
      res.status(500).json({ error: "Failed to get posts" });
    }
  });

  app.get("/api/posts/:id", optionalAuthMiddleware, async (req: AuthRequest, res) => {
    try {
      const post = await storage.getPostById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      const author = await storage.getUser(post.authorId);
      const category = post.categoryId ? await storage.getAllCategories().then(cats => cats.find(c => c.id === post.categoryId)) : null;
      const likesData = await storage.getLikesByPost(post.id);
      const likesCount = likesData.length;
      const userLiked = req.userId ? !!likesData.find(l => l.userId === req.userId) : false;

      res.json({
        ...post,
        author: author ? { id: author.id, username: author.username, fullName: author.fullName, profilePicture: author.profilePicture } : null,
        category,
        likesCount,
        userLiked,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get post" });
    }
  });

  app.post("/api/posts", authMiddleware, upload.single("featuredImage"), async (req: AuthRequest, res) => {
    try {
      const data = {
        ...req.body,
        authorId: req.userId!,
        published: req.body.published === "true" || req.body.published === true,
      };

      if (req.file) {
        data.featuredImage = `/uploads/${req.file.filename}`;
      }

      const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now();
      data.slug = slug;

      const post = await storage.createPost(data);
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  app.patch("/api/posts/:id", authMiddleware, upload.single("featuredImage"), async (req: AuthRequest, res) => {
    try {
      const post = await storage.getPostById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      if (post.authorId !== req.userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const updates: any = { ...req.body };
      if (req.body.published !== undefined) {
        updates.published = req.body.published === "true" || req.body.published === true;
      }
      if (req.file) {
        updates.featuredImage = `/uploads/${req.file.filename}`;
      }

      const updatedPost = await storage.updatePost(req.params.id, updates);
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: "Failed to update post" });
    }
  });

  app.delete("/api/posts/:id", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const post = await storage.getPostById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      if (post.authorId !== req.userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const success = await storage.deletePost(req.params.id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  });

  // Comment routes
  app.get("/api/posts/:postId/comments", async (req, res) => {
    try {
      const comments = await storage.getCommentsByPost(req.params.postId);
      
      const commentsWithAuthors = await Promise.all(
        comments.map(async (comment) => {
          const author = await storage.getUser(comment.authorId);
          return {
            ...comment,
            author: author ? { id: author.id, username: author.username, fullName: author.fullName, profilePicture: author.profilePicture } : null,
          };
        })
      );

      res.json(commentsWithAuthors);
    } catch (error) {
      res.status(500).json({ error: "Failed to get comments" });
    }
  });

  app.post("/api/posts/:postId/comments", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const data = insertCommentSchema.parse({
        ...req.body,
        postId: req.params.postId,
        authorId: req.userId!,
      });

      const comment = await storage.createComment(data);
      const author = await storage.getUser(comment.authorId);

      res.json({
        ...comment,
        author: author ? { id: author.id, username: author.username, fullName: author.fullName, profilePicture: author.profilePicture } : null,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create comment" });
    }
  });

  app.delete("/api/comments/:id", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const success = await storage.deleteComment(req.params.id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete comment" });
    }
  });

  // Like routes
  app.post("/api/posts/:postId/like", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const existing = await storage.getUserLike(req.params.postId, req.userId!);
      
      if (existing) {
        await storage.deleteLike(existing.id);
        return res.json({ liked: false });
      }

      await storage.createLike({
        postId: req.params.postId,
        userId: req.userId!,
      });

      res.json({ liked: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to toggle like" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
