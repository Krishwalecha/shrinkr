import { createContext, useContext } from "react";

// Radix portals render into document.body by default, which sits OUTSIDE
// the dashboard's scoped `.dark` wrapper (see DashboardLayout.jsx). That
// meant dropdowns, selects, tooltips, dialogs and the mobile sidebar sheet
// never picked up dark mode. DashboardLayout provides the scoped wrapper
// node here so every portal-based ui/* component can render inside it
// instead of body, keeping dark mode contained without leaking it back out
// to the landing/auth pages (which never provide this context, so those
// portals keep defaulting to document.body).
const PortalContext = createContext(null);

export const PortalProvider = PortalContext.Provider;

export function usePortalContainer() {
  return useContext(PortalContext);
}
