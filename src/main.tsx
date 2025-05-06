import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRoutes } from "./routes/AppRoutes";
import { SessionProvider } from "./context/session/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfirmModalProvider } from "./context/confirm-modal/provider";
import { Toaster } from "react-hot-toast";
import { ContextMenuProvider } from "./context/context-menu/provider";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextMenuProvider>
      <Toaster />
      <ConfirmModalProvider>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <AppRoutes />
          </SessionProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ConfirmModalProvider>
    </ContextMenuProvider>
  </StrictMode>
);
