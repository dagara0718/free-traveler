"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function DetailDrawer({
  open,
  closeHref,
  title,
  children,
}: {
  open: boolean;
  closeHref: string;
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") router.push(closeHref);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, closeHref, router]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="닫기 배경"
        onClick={() => router.push(closeHref)}
        className="absolute inset-0 bg-black/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex h-full w-full flex-col overflow-y-auto rounded-t-2xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,.04),0_4px_12px_rgba(0,0,0,.06)] md:h-full md:w-[520px] md:rounded-l-2xl md:rounded-tr-none"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1F2328]">{title}</h2>
          <button
            type="button"
            onClick={() => router.push(closeHref)}
            aria-label="상세 정보 닫기"
            className="flex h-11 w-11 items-center justify-center rounded-full"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="#1F2328"
              strokeWidth={1.8}
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
}
