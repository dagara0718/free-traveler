"use client";

import { useState } from "react";

export function BlockButton({
  blockedUserId,
  onBlocked,
}: {
  blockedUserId: string;
  onBlocked?: () => void;
}) {
  const [blocked, setBlocked] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    const response = await fetch("/api/blocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blockedId: blockedUserId }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.error ?? "차단에 실패했습니다.");
      return;
    }

    setBlocked(true);
    setToast("차단되었습니다. 이후 이 사용자의 글이 노출되지 않습니다.");
    setTimeout(() => setToast(null), 4000);
    onBlocked?.();
  }

  return (
    <div className="inline-flex flex-col gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={blocked}
        className="flex h-9 items-center rounded-full border border-[#E4E4E7] px-4 text-sm text-[#1F2328] disabled:opacity-50"
      >
        {blocked ? "차단됨" : "차단"}
      </button>

      {error && (
        <p role="alert" className="text-sm text-[#C1272D]">
          {error}
        </p>
      )}

      {toast && (
        <div
          role="status"
          className="fixed right-6 bottom-6 rounded-[12px] bg-[#1F2328] px-4 py-3 text-sm text-white shadow-[0_1px_2px_rgba(0,0,0,.04),0_4px_12px_rgba(0,0,0,.06)]"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
