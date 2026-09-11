import { Link } from "react-router-dom";

import Footer from "@/components/landing/Footer.jsx";

export default function LegalLayout({ title, updated, children }) {
  return (
    <main className="force-light min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-6">
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            shrinkr.
          </Link>

          <Link
            to="/dashboard/overview"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Go to Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Legal
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: {updated}
        </p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
          {children}
        </div>
      </div>

      <section className="w-full bg-muted px-3 pt-3 sm:px-5 sm:pt-5">
        <Footer />
      </section>
    </main>
  );
}
