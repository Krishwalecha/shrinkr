import * as React from "react";
import { ListIcon, Trash2Icon, XIcon } from "lucide-react";
import { toast } from "sonner";

import api from "@/lib/api";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/shared/page-header";
import { HistoryFilters } from "@/components/dashboard/history/history-filters";
import { HistoryTable } from "@/components/dashboard/history/history-table";
import { HistoryPagination } from "@/components/dashboard/history/history-pagination";
import { BatchDeleteDialog } from "@/components/dashboard/shared/batch-delete-dialog";

export default function History() {
  const [urls, setUrls] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  const [status, setStatus] = React.useState("all");
  const [sort, setSort] = React.useState("newest");

  const [page, setPage] = React.useState(1);

  const [pagination, setPagination] = React.useState({
    page: 1,
    totalPages: 1,
    totalUrls: 0,
  });

  const [selectedIds, setSelectedIds] = React.useState(new Set());
  const [batchDeleteOpen, setBatchDeleteOpen] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchUrls = React.useCallback(async () => {
    try {
      setLoading(true);

      const params = {
        page,
        sort,
      };

      if (debouncedSearch.trim()) {
        params.search = debouncedSearch.trim();
      }

      if (status !== "all") {
        params.status = status;
      }

      const res = await api.get("/urls", {
        params,
      });

      setUrls(res.data.data.urls);
      setPagination(res.data.data.pagination);
    } catch (error) {
      toast.error("Failed to fetch link history");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, status, sort]);

  React.useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  React.useEffect(() => {
    setSelectedIds(new Set());
  }, [page, debouncedSearch, status, sort]);

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setPage(1);
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const handleToggleSelectAll = (rows) => {
    setSelectedIds((prev) => {
      const allSelected = rows.length > 0 && rows.every((url) => prev.has(url._id));

      if (allSelected) {
        return new Set();
      }

      return new Set(rows.map((url) => url._id));
    });
  };

  const handleBatchDeleted = () => {
    setSelectedIds(new Set());
    fetchUrls();
  };

  return (
    <div className="flex flex-col gap-6 px-4 lg:px-6">
      <PageHeader
        icon={<ListIcon className="size-5" />}
        title="Link History"
        description="View and manage all your shortened links"
      />

      <HistoryFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={handleStatusChange}
        sort={sort}
        onSortChange={handleSortChange}
      />

      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-border/80 bg-card px-4 py-2.5">
          <p className="text-sm font-medium">
            {selectedIds.size} {selectedIds.size === 1 ? "link" : "links"} selected
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedIds(new Set())}
            >
              <XIcon />
              Clear
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => setBatchDeleteOpen(true)}
            >
              <Trash2Icon />
              Delete
            </Button>
          </div>
        </div>
      )}

      <HistoryTable
        urls={urls}
        loading={loading}
        onRefresh={fetchUrls}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
      />

      <BatchDeleteDialog
        ids={Array.from(selectedIds)}
        open={batchDeleteOpen}
        onOpenChange={setBatchDeleteOpen}
        onDeleted={handleBatchDeleted}
      />

      <HistoryPagination
        page={page}
        pagination={pagination}
        loading={loading}
        onPrevious={() => setPage((prev) => prev - 1)}
        onNext={() => setPage((prev) => prev + 1)}
      />
    </div>
  );
}
