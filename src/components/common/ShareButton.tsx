"use client";

import { useState } from "react";

export function ShareButton({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // 사용자가 공유를 취소한 경우 등 — 클립보드 폴백으로 넘어가지 않는다.
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={handleShare}
        aria-label="공유하기"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E4E4E7] bg-white text-[#1F2328]"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          aria-hidden="true"
        >
          <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
          <path d="M16 6l-4-4-4 4" />
          <path d="M12 2v14" />
        </svg>
      </button>

      {copied && (
        <div
          role="status"
          className="absolute top-full right-0 mt-2 whitespace-nowrap rounded-[12px] bg-[#1F2328] px-4 py-2 text-sm text-white shadow-[0_1px_2px_rgba(0,0,0,.04),0_4px_12px_rgba(0,0,0,.06)]"
        >
          링크가 복사되었습니다
        </div>
      )}
    </div>
  );
}
