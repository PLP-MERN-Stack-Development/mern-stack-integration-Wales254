import { db } from "./db";
import { users, categories, posts, comments, likes } from "@shared/schema";
import type { User, InsertUser, Category, InsertCategory, Post, InsertPost, Comment, InsertComment, Like, InsertLike } from "@shared/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;

  // Category operations
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Post operations
  getAllPosts(published?: boolean, categorySlug?: string, limit?: number, offset?: number): Promise<Post[]>;
  getPostById(id: string): Promise<Post | undefined>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  getPostsByAuthor(authorId: string): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: string, updates: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: string): Promise<boolean>;

  // Comment operations
  getCommentsByPost(postId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  deleteComment(id: string): Promise<boolean>;

  // Like operations
  getLikesByPost(postId: string): Promise<Like[]>;
  getUserLike(postId: string, userId: string): Promise<Like | undefined>;
  createLike(like: InsertLike): Promise<Like>;
  deleteLike(id: string): Promise<boolean>;
}

export class DbStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Category operations
  async getAllCategories(): Promise<Category[]> {
    return await db.select().from(categories).orderBy(categories.name);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db.insert(categories).values(insertCategory).returning();
    return category;
  }

  // Post operations
  async getAllPosts(published?: boolean, categorySlug?: string, limit: number = 100, offset: number = 0): Promise<Post[]> {
    let query = db.select().from(posts);
    
    const conditions = [];
    if (published !== undefined) {
      conditions.push(eq(posts.published, published));
    }
    if (categorySlug) {
      const category = await this.getCategoryBySlug(categorySlug);
      if (category) {
        conditions.push(eq(posts.categoryId, category.id));
      }
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    return await query.orderBy(desc(posts.createdAt)).limit(limit).offset(offset);
  }

  async getPostById(id: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post;
  }

  async getPostsByAuthor(authorId: string): Promise<Post[]> {
    return await db.select().from(posts).where(eq(posts.authorId, authorId)).orderBy(desc(posts.createdAt));
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const [post] = await db.insert(posts).values(insertPost).returning();
    return post;
  }

  async updatePost(id: string, updates: Partial<InsertPost>): Promise<Post | undefined> {
    const updateData = { ...updates, updatedAt: new Date() };
    const [post] = await db.update(posts).set(updateData).where(eq(posts.id, id)).returning();
    return post;
  }

  async deletePost(id: string): Promise<boolean> {
    const result = await db.delete(posts).where(eq(posts.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Comment operations
  async getCommentsByPost(postId: string): Promise<Comment[]> {
    return await db.select().from(comments).where(eq(comments.postId, postId)).orderBy(comments.createdAt);
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const [comment] = await db.insert(comments).values(insertComment).returning();
    return comment;
  }

  async deleteComment(id: string): Promise<boolean> {
    const result = await db.delete(comments).where(eq(comments.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Like operations
  async getLikesByPost(postId: string): Promise<Like[]> {
    return await db.select().from(likes).where(eq(likes.postId, postId));
  }

  async getUserLike(postId: string, userId: string): Promise<Like | undefined> {
    const [like] = await db.select().from(likes).where(and(eq(likes.postId, postId), eq(likes.userId, userId)));
    return like;
  }

  async createLike(insertLike: InsertLike): Promise<Like> {
    const [like] = await db.insert(likes).values(insertLike).returning();
    return like;
  }

  async deleteLike(id: string): Promise<boolean> {
    const result = await db.delete(likes).where(eq(likes.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }
}

export const storage = new DbStorage();
