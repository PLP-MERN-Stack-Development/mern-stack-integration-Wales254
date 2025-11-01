import { useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Image, Save } from "lucide-react";

export default function CreatePost() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    published: false,
  });

  const categories = [
    { id: "1", name: "Technology", slug: "technology" },
    { id: "2", name: "Design", slug: "design" },
    { id: "3", name: "Business", slug: "business" },
    { id: "4", name: "Lifestyle", slug: "lifestyle" },
    { id: "5", name: "Travel", slug: "travel" },
    { id: "6", name: "Food", slug: "food" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create post:", formData);
    
    toast({
      title: formData.published ? "Post published!" : "Draft saved!",
      description: formData.published 
        ? "Your post is now live and visible to everyone."
        : "Your draft has been saved. You can publish it later.",
    });
    
    setLocation("/");
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Create New Post</h1>
            <p className="text-muted-foreground">Share your story with the world</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter a compelling title..."
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="text-2xl font-bold"
                    required
                    data-testid="input-title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Write a short summary (appears in preview cards)..."
                    value={formData.excerpt}
                    onChange={(e) => handleChange("excerpt", e.target.value)}
                    className="min-h-[80px] resize-none"
                    data-testid="input-excerpt"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Tell your story..."
                    value={formData.content}
                    onChange={(e) => handleChange("content", e.target.value)}
                    className="min-h-[400px] resize-y font-serif text-lg leading-relaxed"
                    required
                    data-testid="input-content"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Post Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                        <SelectTrigger data-testid="select-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.slug}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="featured-image">Featured Image</Label>
                      <Button type="button" variant="outline" className="w-full" data-testid="button-upload-image">
                        <Image className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="published">Publish immediately</Label>
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) => handleChange("published", checked)}
                        data-testid="switch-publish"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <Button type="submit" className="w-full" data-testid="button-save">
                    <Save className="h-4 w-4 mr-2" />
                    {formData.published ? "Publish Post" : "Save Draft"}
                  </Button>
                  <Button type="button" variant="outline" className="w-full" onClick={() => setLocation("/")} data-testid="button-cancel">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
