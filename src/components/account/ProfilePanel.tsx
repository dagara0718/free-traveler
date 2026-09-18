"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ProfilePanel({ userId }: { userId: string }) {
  const [displayName, setDisplayName] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("user_profile")
        .select("display_name, is_adult")
        .eq("id", userId)
        .single();

      if (cancelled) return;
      setDisplayName(data?.display_name ?? "");
      setIsAdult(Boolean(data?.is_adult));
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  async function handleSave() {
    if (!displayName.trim()) {
      setError("닉네임을 입력해 주세요.");
      return;
    }

    setError(null);
    setMessage(null);
    setSaving(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("user_profile")
        .update({ display_name: displayName })
        .eq("id", userId);

      if (updateError) {
        setError("저장에 실패했습니다. 다시 시도해 주세요.");
        return;
      }
      setMessage("프로필이 저장되었습니다.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="h-40 animate-pulse rounded-[16px] bg-[#F7F7F8]" />;
  }

  return (
    <div className="flex flex-col gap-4 rounded-[16px] border border-[#E4E4E7] p-6">
      <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
        닉네임
        <input
          className="h-[52px] rounded-[8px] border border-[#E4E4E7] px-4"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>

      <div>
        <span
          className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${
            isAdult
              ? "bg-[rgba(30,142,90,0.12)] text-[#1E8E5A]"
              : "bg-[rgba(180,83,9,0.12)] text-[#B45309]"
          }`}
        >
          {isAdult ? "성인 인증 완료" : "성인 인증 필요"}
        </span>
      </div>

      {error && (
        <p role="alert" className="text-sm text-[#C1272D]">
          {error}
        </p>
      )}
      {message && (
        <p role="status" className="text-sm text-[#1E8E5A]">
          {message}
        </p>
      )}

      <button
        type="button"
        disabled={saving}
        onClick={handleSave}
        className="flex h-11 w-fit items-center rounded-full bg-[#F2603C] px-5 text-sm font-semibold text-white disabled:opacity-50"
      >
        저장
      </button>
    </div>
  );
}
