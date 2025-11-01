import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", searchQuery);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 sm:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          Discover Stories That
          <span className="block text-primary mt-2">Inspire & Inform</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
          Join thousands of readers and writers sharing knowledge, experiences, and ideas
          on topics that matter to you.
        </p>
        <form onSubmit={handleSearch} className="mt-10 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for articles, topics, or authors..."
              className="h-14 pl-12 pr-4 text-base bg-background/60 backdrop-blur-sm border-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-hero-search"
            />
          </div>
        </form>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" data-testid="button-get-started">
            Get Started
          </Button>
          <Button size="lg" variant="outline" data-testid="button-explore">
            Explore Articles
          </Button>
        </div>
      </div>
    </div>
  );
}
