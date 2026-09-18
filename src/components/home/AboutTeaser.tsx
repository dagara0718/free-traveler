import Link from "next/link";
import { profile } from "@/data/profile";

export function AboutTeaser() {
  return (
    <section className="flex flex-col items-center gap-6 rounded-2xl border border-[#E4E4E7] px-6 py-12 text-center">
      <h2 className="text-2xl font-bold text-[#1F2328]">
        {profile.displayName}가 만든 여행 준비 허브
      </h2>
      <div className="flex gap-8">
        <div>
          <p className="text-2xl font-bold text-[#F2603C]">
            {profile.tripsLabel}
          </p>
          <p className="text-sm text-[#6B7280]">여행 기록</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-[#F2603C]">
            {profile.countriesLabel}
          </p>
          <p className="text-sm text-[#6B7280]">방문 국가</p>
        </div>
      </div>
      <p className="max-w-xl text-base text-[#42474F]">{profile.philosophy}</p>
      <Link
        href="/about"
        data-testid="about-section-cta"
        className="flex h-11 items-center rounded-full border border-[#E4E4E7] bg-white px-6 text-sm font-semibold text-[#1F2328]"
      >
        대표 소개 자세히 보기
      </Link>
    </section>
  );
}
