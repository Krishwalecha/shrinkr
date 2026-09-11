import { Toaster as Sonner } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

import { useTheme } from "@/context/ThemeContext";

const Toaster = ({ ...props }) => {
  const themeContext = useTheme();
  const resolvedTheme = themeContext?.resolvedTheme ?? "light";
  const isDark = resolvedTheme === "dark";

  return (
    <Sonner
      theme={resolvedTheme}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        isDark
          ? {
              "--normal-bg": "#141416",
              "--normal-text": "#f2f2f4",
              "--normal-border": "#222225",
              "--border-radius": "8px",
            }
          : {
              "--normal-bg": "#ffffff",
              "--normal-text": "#111827",
              "--normal-border": "#dce5f2",
              "--border-radius": "8px",
            }
      }
      toastOptions={{
        classNames: {
          toast: "font-[Inclusive_Sans] shadow-lg",
          title: "text-sm font-medium",
          description: isDark
            ? "text-xs text-white/50"
            : "text-xs text-black/50",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
