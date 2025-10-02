import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import { router } from "./App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="bottom-center" />
    <RouterProvider router={router} />
  </StrictMode>
);
