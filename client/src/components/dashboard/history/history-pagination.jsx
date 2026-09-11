import { Button } from "@/components/ui/button";

export function HistoryPagination({
  page,
  pagination,
  loading,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        {pagination.totalUrls} {pagination.totalUrls === 1 ? "link" : "links"}
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1 || loading}
          onClick={onPrevious}
        >
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">
          Page {pagination.page} of {pagination.totalPages || 1}
        </span>

        <Button
          variant="outline"
          size="sm"
          disabled={page >= pagination.totalPages || loading}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
