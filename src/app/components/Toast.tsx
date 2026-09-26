"use client";

import React, { useEffect, useState } from "react";

export type ToastMessage = {
  id: string;
  message: string;
  type: "success" | "info" | "warning";
};

export function showToast(
  message: string,
  type: "success" | "info" | "warning" = "success"
) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("fitlog-toast", {
        detail: { message, type },
      })
    );
  }
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToastEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{
        message: string;
        type: "success" | "info" | "warning";
      }>;
      if (!customEvent?.detail?.message) return;

      const newToast: ToastMessage = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
        message: customEvent.detail.message,
        type: customEvent.detail.type || "success",
      };

      setToasts((prev) => [...prev, newToast]);
    };

    window.addEventListener("fitlog-toast", handleToastEvent);
    return () => {
      window.removeEventListener("fitlog-toast", handleToastEvent);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3500);
    return () => clearTimeout(timer);
  }, [toasts]);

  if (toasts.length === 0) return null;

  return (
    <div
      style={{ zIndex: 99999 }}
      className="fixed bottom-6 right-6 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{ animation: "toastSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
          className="pointer-events-auto flex items-center justify-between gap-3 rounded-xl border border-[#343942] bg-[#15181e] px-4 py-3.5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
        >
          <div className="flex items-center gap-3 min-w-0">
            {toast.type === "success" && (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#baff00] text-[12px] font-black text-black">
                ✓
              </span>
            )}
            {toast.type === "info" && (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#343942] bg-[#20252d] text-[12px] font-bold text-[#baff00]">
                ℹ
              </span>
            )}
            {toast.type === "warning" && (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 border border-amber-500/40 text-[12px] font-bold text-amber-400">
                ⚠️
              </span>
            )}
            <span className="text-[12px] font-bold text-[#f5f5f5] truncate">
              {toast.message}
            </span>
          </div>

          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="ml-2 shrink-0 text-[14px] text-[#777d88] transition hover:text-white"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
