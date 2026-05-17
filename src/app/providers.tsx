"use client";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: React.ReactNode }) {
  const [NextUIProvider, setNextUIProvider] = useState<React.ComponentType<{ children: React.ReactNode }> | null>(null);
  const loading = useRef(false);

  useEffect(() => {
    if (loading.current) return;
    loading.current = true;
    import("@nextui-org/react").then((m) => setNextUIProvider(() => m.NextUIProvider));
  }, []);

  if (!NextUIProvider) {
    return <>{children}</>;
  }

  return (
    <NextUIProvider>
      {children}
      <ToastContainer position="bottom-right" />
    </NextUIProvider>
  );
}
