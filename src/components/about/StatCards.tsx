import { profile } from "@/data/profile";

export function StatCards() {
  const firstYear = Math.min(...profile.timeline.map((item) => item.year));
  const yearsActive = new Date().getFullYear() - firstYear;

  const stats = [
    { label: "여행 횟수", value: profile.tripsLabel },
    { label: "방문 국가", value: profile.countriesLabel },
    { label: "활동 연차", value: `${yearsActive}+ Years` },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[16px] border border-[#E4E4E7] p-6 text-center"
        >
          <p className="text-[26px] font-bold text-[#F2603C]">{stat.value}</p>
          <p className="mt-1 text-sm text-[#6B7280]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
