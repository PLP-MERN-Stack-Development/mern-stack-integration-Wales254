import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    profilePicture?: string;
  };
  createdAt: Date;
  likes: number;
  replies?: Comment[];
}

interface CommentSectionProps {
  comments: Comment[];
  currentUser?: {
    id: string;
    name: string;
    profilePicture?: string;
  };
}

function CommentItem({ comment, currentUser, depth = 0 }: { comment: Comment; currentUser?: any; depth?: number }) {
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [liked, setLiked] = useState(false);

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleReply = () => {
    console.log("Reply:", replyContent);
    setReplyContent("");
    setShowReply(false);
  };

  return (
    <div className={depth > 0 ? "ml-8 mt-4" : "mt-6"} data-testid={`comment-${comment.id}`}>
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={comment.author.profilePicture} />
          <AvatarFallback>{getInitials(comment.author.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{comment.author.name}</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
            </span>
          </div>
          <p className="mt-1 text-sm">{comment.content}</p>
          <div className="mt-2 flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 text-xs"
              onClick={() => setLiked(!liked)}
              data-testid={`button-like-comment-${comment.id}`}
            >
              <Heart className={`h-3 w-3 mr-1 ${liked ? "fill-current text-destructive" : ""}`} />
              {comment.likes + (liked ? 1 : 0)}
            </Button>
            {currentUser && depth < 2 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1 text-xs"
                onClick={() => setShowReply(!showReply)}
                data-testid={`button-reply-comment-${comment.id}`}
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                Reply
              </Button>
            )}
          </div>
          {showReply && currentUser && (
            <div className="mt-3 flex gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.profilePicture} />
                <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[60px] resize-none"
                  data-testid={`input-reply-${comment.id}`}
                />
                <div className="mt-2 flex gap-2">
                  <Button size="sm" onClick={handleReply} data-testid={`button-submit-reply-${comment.id}`}>
                    Reply
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowReply(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} currentUser={currentUser} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function CommentSection({ comments, currentUser }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    console.log("New comment:", newComment);
    setNewComment("");
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
      
      {currentUser && (
        <div className="flex gap-3 mb-8">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.profilePicture} />
            <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] resize-none"
              data-testid="input-new-comment"
            />
            <Button className="mt-2" onClick={handleSubmit} data-testid="button-submit-comment">
              Post Comment
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
}
