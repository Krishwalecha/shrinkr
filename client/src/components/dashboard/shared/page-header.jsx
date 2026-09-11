export function PageHeader({ icon, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
          {icon}
        </div>

        <div>
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>

          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {action}
    </div>
  );
}
