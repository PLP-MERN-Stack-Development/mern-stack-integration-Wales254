import PostCard from "../PostCard";

export default function PostCardExample() {
  return (
    <div className="max-w-sm">
      <PostCard
        id="1"
        title="Getting Started with React and TypeScript"
        excerpt="Learn how to set up a modern React application with TypeScript, including best practices and common patterns for building scalable applications."
        featuredImage="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop"
        author={{
          id: "author-1",
          name: "Sarah Johnson",
          profilePicture: "https://i.pravatar.cc/150?img=1"
        }}
        category={{
          name: "Technology",
          slug: "technology"
        }}
        createdAt={new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)}
        readTime={8}
        likes={42}
      />
    </div>
  );
}
