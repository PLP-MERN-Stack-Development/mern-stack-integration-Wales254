import Pagination from "../Pagination";
import { useState } from "react";

export default function PaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}
    />
  );
}
