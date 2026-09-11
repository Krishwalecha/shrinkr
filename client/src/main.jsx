import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import ThemeProvider from "./context/ThemeContext.jsx";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScroll } from "@/components/SmoothScroll";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <SmoothScroll />
        <TooltipProvider>
          <App />
        </TooltipProvider>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
