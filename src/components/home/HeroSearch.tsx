"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function HeroSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("q") ?? "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (keyword) params.set("q", keyword);
    else params.delete("q");
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  }

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-12 text-center md:min-h-[65vh]">
      <h1 className="max-w-2xl text-3xl font-bold text-[#1F2328] md:text-4xl">
        여행지 탐색부터 동행 매칭까지, 한 화면에서 정리하세요
      </h1>
      <p className="max-w-xl text-base text-[#42474F]">
        국내외 여행지를 검색하고, 항공·숙소 조건을 정리한 뒤 동행을 찾아보세요.
      </p>

      <form
        onSubmit={handleSubmit}
        role="search"
        className="flex w-full max-w-xl items-center gap-2 rounded-full border border-[#E4E4E7] bg-white px-5 py-3 shadow-[0_1px_2px_rgba(0,0,0,.04),0_4px_12px_rgba(0,0,0,.06)]"
      >
        <label htmlFor="destination-search" className="sr-only">
          여행지 검색
        </label>
        <input
          id="destination-search"
          type="text"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="여행지, 국가, 테마로 검색"
          className="h-8 flex-1 border-none text-base text-[#1F2328] outline-none"
        />
        <button
          type="submit"
          className="flex h-10 items-center rounded-full bg-[#F2603C] px-5 text-sm font-semibold text-white"
        >
          검색
        </button>
      </form>

      <Link
        href="/travel-tools"
        className="flex h-12 items-center rounded-full bg-[#F2603C] px-6 text-base font-semibold text-white"
      >
        항공·숙소 조건 정리하기
      </Link>
    </section>
  );
}
