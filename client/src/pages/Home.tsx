import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { id: "1", name: "Technology", slug: "technology", count: 24 },
    { id: "2", name: "Design", slug: "design", count: 18 },
    { id: "3", name: "Business", slug: "business", count: 32 },
    { id: "4", name: "Lifestyle", slug: "lifestyle", count: 15 },
    { id: "5", name: "Travel", slug: "travel", count: 12 },
    { id: "6", name: "Food", slug: "food", count: 9 },
  ];

  const posts = [
    {
      id: "1",
      title: "Building Scalable Web Applications with React and TypeScript",
      excerpt: "Learn the best practices for creating maintainable and scalable web applications using modern React patterns and TypeScript's type safety features.",
      featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
      author: {
        id: "author-1",
        name: "Sarah Johnson",
        profilePicture: "https://i.pravatar.cc/150?img=1"
      },
      category: { name: "Technology", slug: "technology" },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      readTime: 8,
      likes: 42
    },
    {
      id: "2",
      title: "The Future of Design Systems in 2024",
      excerpt: "Exploring how design systems are evolving to meet the needs of modern product teams and the tools that make them successful.",
      featuredImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
      author: {
        id: "author-2",
        name: "Michael Chen",
        profilePicture: "https://i.pravatar.cc/150?img=3"
      },
      category: { name: "Design", slug: "design" },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      readTime: 6,
      likes: 38
    },
    {
      id: "3",
      title: "Startup Growth Strategies That Actually Work",
      excerpt: "Proven strategies from successful founders on growing your startup from zero to one million users.",
      featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
      author: {
        id: "author-3",
        name: "Emily Rodriguez",
        profilePicture: "https://i.pravatar.cc/150?img=5"
      },
      category: { name: "Business", slug: "business" },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
      readTime: 10,
      likes: 56
    },
    {
      id: "4",
      title: "Minimalist Living: A Practical Guide",
      excerpt: "Discover how embracing minimalism can lead to a more focused, peaceful, and intentional lifestyle.",
      featuredImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=450&fit=crop",
      author: {
        id: "author-4",
        name: "David Kim",
        profilePicture: "https://i.pravatar.cc/150?img=8"
      },
      category: { name: "Lifestyle", slug: "lifestyle" },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      readTime: 7,
      likes: 29
    },
    {
      id: "5",
      title: "Hidden Gems: Exploring Southeast Asia",
      excerpt: "Off-the-beaten-path destinations in Southeast Asia that offer authentic cultural experiences away from tourist crowds.",
      featuredImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=450&fit=crop",
      author: {
        id: "author-5",
        name: "Lisa Thompson",
        profilePicture: "https://i.pravatar.cc/150?img=9"
      },
      category: { name: "Travel", slug: "travel" },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
      readTime: 12,
      likes: 64
    },
    {
      id: "6",
      title: "Mastering the Art of Sourdough Bread",
      excerpt: "A comprehensive guide to creating the perfect sourdough loaf at home, from starter to the final bake.",
      featuredImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=450&fit=crop",
      author: {
        id: "author-6",
        name: "James Miller",
        profilePicture: "https://i.pravatar.cc/150?img=12"
      },
      category: { name: "Food", slug: "food" },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      readTime: 9,
      likes: 31
    },
  ];

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category?.slug === selectedCategory)
    : posts;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No posts found in this category.</p>
            </div>
          )}

          {filteredPosts.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={5}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
