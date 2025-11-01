import { useState } from "react";
import { useRoute, Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommentSection from "@/components/CommentSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, Bookmark, Calendar, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/lib/auth-context";

export default function PostView() {
  const [, params] = useRoute("/post/:id");
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const post = {
    id: params?.id || "1",
    title: "Building Scalable Web Applications with React and TypeScript",
    content: `
      <p>In today's fast-paced web development landscape, building scalable applications is more important than ever. React and TypeScript together provide a powerful combination that helps developers create maintainable, type-safe applications.</p>

      <h2>Why React and TypeScript?</h2>
      <p>React has become the go-to library for building user interfaces, while TypeScript adds static typing that catches errors before runtime. This combination significantly improves developer experience and code quality.</p>

      <h2>Key Principles</h2>
      <p>When building scalable applications, consider these fundamental principles:</p>
      <ul>
        <li>Component reusability and composition</li>
        <li>Strong typing with TypeScript interfaces</li>
        <li>Proper state management architecture</li>
        <li>Code splitting and lazy loading</li>
        <li>Performance optimization techniques</li>
      </ul>

      <h2>Best Practices</h2>
      <p>Following established patterns and best practices will save you countless hours of debugging and refactoring. Always prioritize code readability and maintainability over cleverness.</p>

      <p>Remember that scalability isn't just about handling more users—it's also about making your codebase easier to work with as your team and feature set grow.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
    author: {
      id: "author-1",
      name: "Sarah Johnson",
      profilePicture: "https://i.pravatar.cc/150?img=1",
      bio: "Full-stack developer and tech writer passionate about building great user experiences."
    },
    category: { name: "Technology", slug: "technology" },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    readTime: 8,
    likes: 42
  };

  const comments = [
    {
      id: "1",
      content: "Great article! This really helped me understand the concepts better. I especially appreciated the practical examples.",
      author: {
        id: "user-1",
        name: "Alex Chen",
        profilePicture: "https://i.pravatar.cc/150?img=3"
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      likes: 5,
      replies: [
        {
          id: "2",
          content: "I agree! The examples were really helpful and easy to follow.",
          author: {
            id: "user-2",
            name: "Maria Garcia",
            profilePicture: "https://i.pravatar.cc/150?img=5"
          },
          createdAt: new Date(Date.now() - 1000 * 60 * 60),
          likes: 2,
        }
      ]
    },
    {
      id: "3",
      content: "Could you elaborate more on the advanced patterns section? I'd love to see more examples of that.",
      author: {
        id: "user-3",
        name: "John Smith",
        profilePicture: "https://i.pravatar.cc/150?img=8"
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      likes: 1,
    }
  ];

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleShare = () => {
    console.log("Share post");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full aspect-video object-cover rounded-lg mb-8"
            />
          )}

          <div className="mb-6">
            <Badge variant="secondary" data-testid="badge-category">
              {post.category.name}
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6" data-testid="text-post-title">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b mb-8">
            <Link href={`/profile/${post.author.id}`}>
              <div className="flex items-center gap-3 hover-elevate rounded-md p-2 active-elevate-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.profilePicture} />
                  <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold" data-testid="text-author-name">{post.author.name}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDistanceToNow(post.createdAt, { addSuffix: true })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <Button
                variant={liked ? "default" : "outline"}
                size="sm"
                onClick={() => setLiked(!liked)}
                data-testid="button-like"
              >
                <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-current" : ""}`} />
                {post.likes + (liked ? 1 : 0)}
              </Button>
              <Button
                variant={bookmarked ? "default" : "outline"}
                size="icon"
                onClick={() => setBookmarked(!bookmarked)}
                data-testid="button-bookmark"
              >
                <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare} data-testid="button-share">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div 
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
            data-testid="content-post"
          />

          <CommentSection comments={comments} currentUser={user} />
        </article>
      </main>

      <Footer />
    </div>
  );
}
