import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center border-b border-border/80 bg-card">
      <div className="flex h-full w-full items-center px-4 lg:px-6">
        <SidebarTrigger
          className="
            -ml-1
            text-muted-foreground
            hover:bg-accent
            hover:text-primary
          "
        />
      </div>
    </header>
  );
}
