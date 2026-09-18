"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { policies } from "@/data/policies";

const PHONE_PATTERN = /(01[016789])[-.\s]?\d{3,4}[-.\s]?\d{4}/;
const EMAIL_PATTERN = /[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}/;
const MESSENGER_PATTERN =
  /(카카오\s?톡|카톡|kakao\s?talk|텔레그램|telegram|라인\s?(아이디|id)|line\s?id)\s*(아이디|id)?\s*[:：]?\s*@?[\w.]+/i;

export function detectContactInfo(text: string): boolean {
  return (
    PHONE_PATTERN.test(text) ||
    EMAIL_PATTERN.test(text) ||
    MESSENGER_PATTERN.test(text)
  );
}

type AuthState =
  | { status: "loading" }
  | { status: "guest" }
  | { status: "minor" }
  | { status: "member"; userId: string };

export function MateWriteForm() {
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      let supabase;
      try {
        supabase = createClient();
      } catch {
        if (!cancelled) setAuth({ status: "guest" });
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (!cancelled) setAuth({ status: "guest" });
        return;
      }

      const { data: profile } = await supabase
        .from("user_profile")
        .select("is_adult")
        .eq("id", user.id)
        .single();

      if (cancelled) return;
      setAuth(
        profile?.is_adult
          ? { status: "member", userId: user.id }
          : { status: "minor" },
      );
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (auth.status === "loading") {
    return <div className="h-40 animate-pulse rounded-[16px] bg-[#F7F7F8]" />;
  }

  if (auth.status === "guest") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-[16px] border border-[#E4E4E7] p-6">
        <p className="text-base text-[#42474F]">
          동행글을 작성하려면 로그인이 필요합니다.
        </p>
        <Link
          href="/account"
          className="flex h-11 items-center rounded-full bg-[#F2603C] px-5 text-sm font-semibold text-white"
        >
          로그인하러 가기
        </Link>
      </div>
    );
  }

  if (auth.status === "minor") {
    return (
      <div className="rounded-[16px] border border-[#E4E4E7] p-6">
        <p className="text-base text-[#42474F]">
          동행글 작성은 성인 인증이 완료된 회원만 이용할 수 있습니다. 계정
          화면에서 성인 인증을 먼저 진행해 주세요.
        </p>
      </div>
    );
  }

  return <MateWriteFormFields />;
}

function MateWriteFormFields() {
  const [title, setTitle] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [region, setRegion] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [headcount, setHeadcount] = useState(2);
  const [style, setStyle] = useState("");
  const [description, setDescription] = useState("");
  const [safetyAck, setSafetyAck] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    if (detectContactInfo(description)) {
      setError(
        "연락처(전화번호·메신저ID·이메일)로 보이는 내용이 포함되어 있습니다. 삭제 후 다시 시도해 주세요.",
      );
      return;
    }
    if (
      !title ||
      !countryCode ||
      !region ||
      !startDate ||
      !endDate ||
      !description
    ) {
      setError("필수 항목을 모두 입력해 주세요.");
      return;
    }
    if (endDate < startDate) {
      setError("종료일은 시작일 이후여야 합니다.");
      return;
    }
    if (!safetyAck) {
      setError("안전수칙 동의가 필요합니다.");
      return;
    }

    setError(null);
    const response = await fetch("/api/mates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        countryCode,
        region,
        startDate,
        endDate,
        headcount,
        style: style || undefined,
        description,
        safetyAck: true,
      }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.error ?? "동행글 등록에 실패했습니다.");
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <div role="status" className="rounded-[16px] border border-[#E4E4E7] p-6">
        <p className="text-base text-[#1F2328]">
          동행글이 등록되었습니다. 목록에서 확인할 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div
      data-testid="mate-write-form"
      className="flex flex-col gap-4 rounded-[16px] border border-[#E4E4E7] p-6"
    >
      <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
        제목
        <input
          className="h-[52px] rounded-[8px] border border-[#E4E4E7] px-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
          국가 코드
          <input
            className="h-[52px] rounded-[8px] border border-[#E4E4E7] px-4"
            value={countryCode}
            maxLength={2}
            placeholder="JP"
            onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
          지역
          <input
            className="h-[52px] rounded-[8px] border border-[#E4E4E7] px-4"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
          시작일
          <input
            type="date"
            className="h-[52px] rounded-[8px] border border-[#E4E4E7] px-4"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
          종료일
          <input
            type="date"
            className="h-[52px] rounded-[8px] border border-[#E4E4E7] px-4"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
          모집 인원
          <input
            type="number"
            min={1}
            max={20}
            className="h-[52px] rounded-[8px] border border-[#E4E4E7] px-4"
            value={headcount}
            onChange={(e) => setHeadcount(Number(e.target.value))}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
          여행 스타일
          <input
            className="h-[52px] rounded-[8px] border border-[#E4E4E7] px-4"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
        설명
        <textarea
          className="min-h-[120px] rounded-[8px] border border-[#E4E4E7] px-4 py-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label className="flex items-start gap-2 text-sm text-[#42474F]">
        <input
          type="checkbox"
          checked={safetyAck}
          onChange={(e) => setSafetyAck(e.target.checked)}
        />
        <span>{policies.mateSafety.body[0]} 안전수칙에 동의합니다.</span>
      </label>

      {error && (
        <p role="alert" className="text-sm text-[#C1272D]">
          {error}
        </p>
      )}

      <button
        type="button"
        data-testid="mate-write-submit"
        onClick={handleSubmit}
        className="flex h-12 w-fit items-center rounded-full bg-[#F2603C] px-6 text-base font-semibold text-white"
      >
        동행글 등록
      </button>
    </div>
  );
}
