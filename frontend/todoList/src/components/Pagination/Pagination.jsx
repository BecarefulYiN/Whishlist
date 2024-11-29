import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ totalPages = 5, initialPage = 1, onPageChange }) => {
  const [active, setActive] = React.useState(initialPage);

  const handlePageChange = (page) => {
    setActive(page);
    if (onPageChange) {
      onPageChange(page); // Notify parent about the page change
    }
  };

  const next = () => {
    if (active < totalPages) {
      handlePageChange(active + 1);
    }
  };

  const prev = () => {
    if (active > 1) {
      handlePageChange(active - 1);
    }
  };

  const renderPageButtons = () => {
    return Array.from({ length: totalPages }, (_, index) => (
      <IconButton
        key={index + 1}
        variant={active === index + 1 ? "filled" : "text"}
        color={active === index + 1 ? "blue" : "gray"}
        onClick={() => handlePageChange(index + 1)}
        aria-label={`Page ${index + 1}`}
      >
        {index + 1}
      </IconButton>
    ));
  };

  return (
    <div className="flex items-center gap-4">
      {/* Previous Button */}
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
        aria-label="Previous page"
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>

      {/* Page Buttons */}
      <div className="flex items-center gap-2">{renderPageButtons()}</div>

      {/* Next Button */}
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === totalPages}
        aria-label="Next page"
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
