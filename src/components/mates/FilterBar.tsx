"use client";

import { useState } from "react";

export interface MateFilters {
  countryCode: string;
  region: string;
  startDate: string;
  endDate: string;
  style: string;
  status: "" | "recruiting" | "closing_soon" | "closed";
}

export const EMPTY_FILTERS: MateFilters = {
  countryCode: "",
  region: "",
  startDate: "",
  endDate: "",
  style: "",
  status: "",
};

export function FilterBar({
  filters,
  onChange,
  resultCount,
}: {
  filters: MateFilters;
  onChange: (filters: MateFilters) => void;
  resultCount: number;
}) {
  const [local, setLocal] = useState(filters);

  function update<K extends keyof MateFilters>(key: K, value: MateFilters[K]) {
    const next = { ...local, [key]: value };
    setLocal(next);
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <input
          aria-label="국가"
          placeholder="국가 코드"
          className="h-11 w-32 rounded-full border border-[#E4E4E7] px-4 text-sm"
          value={local.countryCode}
          onChange={(e) => update("countryCode", e.target.value.toUpperCase())}
        />
        <input
          aria-label="지역"
          placeholder="지역"
          className="h-11 w-32 rounded-full border border-[#E4E4E7] px-4 text-sm"
          value={local.region}
          onChange={(e) => update("region", e.target.value)}
        />
        <input
          aria-label="시작일 이후"
          type="date"
          className="h-11 rounded-full border border-[#E4E4E7] px-4 text-sm"
          value={local.startDate}
          onChange={(e) => update("startDate", e.target.value)}
        />
        <input
          aria-label="종료일 이전"
          type="date"
          className="h-11 rounded-full border border-[#E4E4E7] px-4 text-sm"
          value={local.endDate}
          onChange={(e) => update("endDate", e.target.value)}
        />
        <input
          aria-label="여행 스타일"
          placeholder="스타일"
          className="h-11 w-32 rounded-full border border-[#E4E4E7] px-4 text-sm"
          value={local.style}
          onChange={(e) => update("style", e.target.value)}
        />
        <select
          aria-label="모집 상태"
          className="h-11 rounded-full border border-[#E4E4E7] px-4 text-sm"
          value={local.status}
          onChange={(e) =>
            update("status", e.target.value as MateFilters["status"])
          }
        >
          <option value="">전체 상태</option>
          <option value="recruiting">모집중</option>
          <option value="closing_soon">마감임박</option>
          <option value="closed">마감</option>
        </select>
      </div>

      <p className="text-sm text-[#6B7280]">{resultCount}개의 모집글</p>
    </div>
  );
}
