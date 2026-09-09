import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import { Toaster } from "@/components/ui/sonner";

import Lenis from "lenis";

const lenis = new Lenis({
  duration: 1.1,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster />
    </AuthProvider>
  </BrowserRouter>,
);
