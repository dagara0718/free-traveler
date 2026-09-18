"use client";

import { useState } from "react";
import { SummaryCard } from "./SummaryCard";

export function isValidFlightDateRange(
  startDate: string,
  endDate: string,
  today: string,
): string | null {
  if (!startDate || !endDate) return "출발일과 귀국일을 입력해 주세요.";
  if (startDate < today) return "출발일은 오늘 이후여야 합니다.";
  if (endDate < startDate) return "귀국일은 출발일 이후여야 합니다.";
  return null;
}

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export function FlightForm() {
  const [countryName, setCountryName] = useState("");
  const [region, setRegion] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<{
    countryName: string;
    region: string;
    startDate: string;
    endDate: string;
  } | null>(null);

  function handleSubmit() {
    if (!countryName || !region) {
      setError("국가와 지역을 입력해 주세요.");
      setSummary(null);
      return;
    }

    const dateError = isValidFlightDateRange(startDate, endDate, todayString());
    if (dateError) {
      setError(dateError);
      setSummary(null);
      return;
    }

    setError(null);
    setSummary({ countryName, region, startDate, endDate });
  }

  const externalUrl = "https://www.google.com/travel/flights?q=flights";

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
          출발일
          <input
            type="date"
            className="h-[52px] rounded-[8px] border border-[#E4E4E7] px-4"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
          귀국일
          <input
            type="date"
            className="h-[52px] rounded-[8px] border border-[#E4E4E7] px-4"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-[#C1272D]">
            {error}
          </p>
        )}

        <button
          type="button"
          data-testid="flight-form-submit"
          onClick={handleSubmit}
          className="flex h-12 w-fit items-center rounded-full bg-[#F2603C] px-6 text-base font-semibold text-white"
        >
          요약 보기
        </button>
      </div>

      {summary && (
        <SummaryCard
          title="항공 조건 요약"
          lines={[
            `${summary.countryName} · ${summary.region}`,
            `${summary.startDate} ~ ${summary.endDate}`,
          ]}
          externalUrl={externalUrl}
          externalLabel="항공권 검색으로 이동"
          externalTestId="flight-external-link"
        />
      )}
    </div>
  );
}
