import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { router } from "./app/router";
import { ThemeProvider } from "./providers/ThemeProvider";
import { SocketProvider } from "./providers/SocketProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig transition={{ type: "spring", damping: 20, stiffness: 210 }}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <SocketProvider>
              <RouterProvider router={router} />
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: "#0b1220",
                    color: "#e2e8f0",
                    border: "1px solid #1f2937",
                  },
                }}
              />
            </SocketProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </MotionConfig>
  </StrictMode>,
);
