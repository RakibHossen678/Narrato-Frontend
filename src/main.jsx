import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import Router from "./routes/Router.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { Toaster } from "react-hot-toast";

// create client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MotionConfig
        transition={{
          type: "spring",
          damping: 22,
          stiffness: 240,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Router />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#0f172a",
                  color: "#e2e8f0",
                  border: "1px solid #334155",
                },
              }}
            />
          </AuthProvider>
        </QueryClientProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
);
