"use client";

import { useState } from "react";

export function ReportButton({
  targetType,
  targetId,
}: {
  targetType: "mate_post" | "mate_application" | "user_profile";
  targetId: string;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!reason.trim()) {
      setError("신고 사유를 입력해 주세요.");
      return;
    }

    setError(null);
    const response = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetType, targetId, reason }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.error ?? "신고 접수에 실패했습니다.");
      return;
    }

    const data = await response.json();
    setOpen(false);
    setReason("");
    setToast(`신고가 접수되었습니다. (접수번호: ${data.id.slice(0, 8)})`);
    setTimeout(() => setToast(null), 5000);
  }

  return (
    <div className="relative inline-flex flex-col gap-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center rounded-full border border-[#E4E4E7] px-4 text-sm text-[#1F2328]"
      >
        신고
      </button>

      {open && (
        <div className="absolute top-full left-0 z-10 mt-2 w-72 rounded-[12px] border border-[#E4E4E7] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,.04),0_4px_12px_rgba(0,0,0,.06)]">
          <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
            신고 사유
            <textarea
              className="min-h-[80px] rounded-[8px] border border-[#E4E4E7] px-3 py-2 text-sm"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </label>
          {error && (
            <p role="alert" className="mt-2 text-sm text-[#C1272D]">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-3 flex h-9 items-center rounded-full bg-[#F2603C] px-4 text-sm font-semibold text-white"
          >
            신고 제출
          </button>
        </div>
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
