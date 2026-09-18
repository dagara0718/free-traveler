"use client";

import { useState } from "react";
import { SummaryCard } from "./SummaryCard";

export function isValidHotelDateRange(
  checkIn: string,
  checkOut: string,
  today: string,
): string | null {
  if (!checkIn || !checkOut) return "체크인과 체크아웃 날짜를 입력해 주세요.";
  if (checkIn < today) return "체크인은 오늘 이후여야 합니다.";
  if (checkOut <= checkIn) return "체크아웃은 체크인 이후여야 합니다.";
  return null;
}

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export function HotelForm() {
  const [countryName, setCountryName] = useState("");
  const [region, setRegion] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<{
    countryName: string;
    region: string;
    checkIn: string;
    checkOut: string;
  } | null>(null);

  function handleSubmit() {
    if (!countryName || !region) {
      setError("국가와 지역을 입력해 주세요.");
      setSummary(null);
      return;
    }

    const dateError = isValidHotelDateRange(checkIn, checkOut, todayString());
    if (dateError) {
      setError(dateError);
      setSummary(null);
      return;
    }

    setError(null);
    setSummary({ countryName, region, checkIn, checkOut });
  }

  const externalUrl = "https://www.google.com/travel/hotels";

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
          국가
          <input
            className="h-[52px] rounded-[8px] border border-[#E4E4E7] px-4"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
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

        <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
          체크인
          <input
            type="date"
            className="h-[52px] rounded-[8px] border border-[#E4E4E7] px-4"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
          체크아웃
          <input
            type="date"
            className="h-[52px] rounded-[8px] border border-[#E4E4E7] px-4"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-[#C1272D]">
            {error}
          </p>
        )}

        <button
          type="button"
          data-testid="hotel-form-submit"
          onClick={handleSubmit}
          className="flex h-12 w-fit items-center rounded-full bg-[#F2603C] px-6 text-base font-semibold text-white"
        >
          요약 보기
        </button>
      </div>

      {summary && (
        <SummaryCard
          title="숙소 조건 요약"
          lines={[
            `${summary.countryName} · ${summary.region}`,
            `${summary.checkIn} ~ ${summary.checkOut}`,
          ]}
          externalUrl={externalUrl}
          externalLabel="숙소 검색으로 이동"
          externalTestId="hotel-external-link"
        />
      )}
    </div>
  );
}
