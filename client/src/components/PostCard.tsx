import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Heart } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  id: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  author: {
    id: string;
    name: string;
    profilePicture?: string;
  };
  category?: {
    name: string;
    slug: string;
  };
  createdAt: Date;
  readTime?: number;
  likes?: number;
}

export default function PostCard({
  id,
  title,
  excerpt,
  featuredImage,
  author,
  category,
  createdAt,
  readTime = 5,
  likes = 0,
}: PostCardProps) {
  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <Card className="overflow-hidden hover-elevate cursor-pointer h-full flex flex-col" data-testid={`card-post-${id}`}>
      <Link href={`/post/${id}`}>
        {featuredImage && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={featuredImage}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-2">
            {category && (
              <Badge variant="secondary" data-testid={`badge-category-${category.slug}`}>
                {category.name}
              </Badge>
            )}
          </div>
          <h2 className="text-2xl font-bold leading-tight line-clamp-2" data-testid="text-post-title">
            {title}
          </h2>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-muted-foreground line-clamp-3" data-testid="text-post-excerpt">
            {excerpt}
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-4">
          <Link href={`/profile/${author.id}`}>
            <div className="flex items-center gap-2 hover-elevate rounded-md p-1 active-elevate-2" onClick={(e) => e.stopPropagation()}>
              <Avatar className="h-8 w-8">
                <AvatarImage src={author.profilePicture} />
                <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium" data-testid="text-author-name">{author.name}</span>
            </div>
          </Link>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{readTime} min read</span>
            </div>
            {likes > 0 && (
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                <span>{likes}</span>
              </div>
            )}
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
