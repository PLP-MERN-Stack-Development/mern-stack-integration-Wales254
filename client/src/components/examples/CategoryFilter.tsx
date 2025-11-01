import CategoryFilter from "../CategoryFilter";
import { useState } from "react";

export default function CategoryFilterExample() {
  const [selected, setSelected] = useState<string | undefined>();

  const categories = [
    { id: "1", name: "Technology", slug: "technology", count: 24 },
    { id: "2", name: "Design", slug: "design", count: 18 },
    { id: "3", name: "Business", slug: "business", count: 32 },
    { id: "4", name: "Lifestyle", slug: "lifestyle", count: 15 },
    { id: "5", name: "Travel", slug: "travel", count: 12 },
  ];

  return (
    <CategoryFilter
      categories={categories}
      selectedCategory={selected}
      onCategoryChange={setSelected}
    />
  );
}
