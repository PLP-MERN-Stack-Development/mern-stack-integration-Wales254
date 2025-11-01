import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: string;
  onCategoryChange: (slug: string | undefined) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-4">
        <Badge
          variant={!selectedCategory ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onCategoryChange(undefined)}
          data-testid="badge-category-all"
        >
          All Posts
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.slug ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onCategoryChange(category.slug)}
            data-testid={`badge-category-${category.slug}`}
          >
            {category.name}
            {category.count !== undefined && (
              <span className="ml-1 text-xs">({category.count})</span>
            )}
          </Badge>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
