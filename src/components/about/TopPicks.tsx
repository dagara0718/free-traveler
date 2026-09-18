import Link from "next/link";
import { profile } from "@/data/profile";
import { destinations } from "@/data/destinations";

export function TopPicks() {
  const picks = profile.recommendedDestinationIds
    .map((id) => destinations.find((d) => d.id === id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d))
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {picks.map((destination) => (
          <div
            key={destination.id}
            className="rounded-[16px] border border-[#E4E4E7] p-4"
          >
            <h3 className="text-base font-semibold text-[#1F2328]">
              {destination.name}
            </h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              {destination.countryName}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 rounded-[16px] bg-[#F7F7F8] p-8 text-center">
        <p className="text-base text-[#42474F]">
          다음 여행을 지금 정리해 보세요.
        </p>
        <div className="flex gap-3">
          <Link
            href="/travel-tools"
            className="flex h-12 items-center rounded-full bg-[#F2603C] px-6 text-base font-semibold text-white"
          >
            여행 도구로 이동
          </Link>
          <Link
            href="/mates"
            className="flex h-12 items-center rounded-full border border-[#E4E4E7] bg-white px-6 text-base font-semibold text-[#1F2328]"
          >
            동행 찾기
          </Link>
        </div>
      </div>
    </div>
  );
}
