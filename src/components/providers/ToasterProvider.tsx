"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#0B1D3A",
          color: "#fff",
        },
        success: {
          iconTheme: {
            primary: "#F59E0B",
            secondary: "#0B1D3A",
          },
        },
      }}
    />
  );
}
