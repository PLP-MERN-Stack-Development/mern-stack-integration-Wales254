import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (showEllipsisStart) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (showEllipsisEnd) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        data-testid="button-previous-page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((page, index) => (
        typeof page === "number" ? (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(page)}
            data-testid={`button-page-${page}`}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="px-2 text-muted-foreground">
            {page}
          </span>
        )
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        data-testid="button-next-page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
