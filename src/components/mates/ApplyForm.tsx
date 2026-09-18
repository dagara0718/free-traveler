"use client";

import { useState } from "react";

const MAX_MESSAGE_LENGTH = 500;

export function ApplyForm({ postId }: { postId: string }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  async function handleSubmit() {
    if (!message.trim()) {
      setError("참가 메시지를 입력해 주세요.");
      return;
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      setError(`메시지는 ${MAX_MESSAGE_LENGTH}자 이하로 작성해 주세요.`);
      return;
    }

    setError(null);
    const response = await fetch(`/api/mates/${postId}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(
        response.status === 409
          ? "이미 이 동행글에 참가 신청을 보냈습니다."
          : (body.error ?? "참가 신청에 실패했습니다."),
      );
      return;
    }

    setMessage("");
    setToast("참가 신청이 접수되었습니다.");
    setTimeout(() => setToast(null), 4000);
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
        참가 메시지
        <textarea
          data-testid="mate-apply-message"
          className="min-h-[100px] rounded-[8px] border border-[#E4E4E7] px-4 py-3"
          maxLength={MAX_MESSAGE_LENGTH}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      {error && (
        <p role="alert" className="text-sm text-[#C1272D]">
          {error}
        </p>
      )}

      <button
        type="button"
        data-testid="mate-apply-submit"
        onClick={handleSubmit}
        className="flex h-11 w-fit items-center rounded-full bg-[#F2603C] px-5 text-sm font-semibold text-white"
      >
        참가 신청 보내기
      </button>

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
