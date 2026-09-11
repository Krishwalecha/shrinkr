export function getStatusBadgeClass(status) {
  if (status === "Active") {
    return "border-success/20 bg-success/10 text-success";
  }

  if (status === "Expired") {
    return "border-destructive/20 bg-destructive/10 text-destructive";
  }

  return "border-warning/20 bg-warning/10 text-warning";
}
