import { HeroSearch } from "@/components/home/HeroSearch";
import { DestinationGrid } from "@/components/home/DestinationGrid";
import { MateTeaser } from "@/components/home/MateTeaser";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { DetailDrawer } from "@/components/drawer/DetailDrawer";
import { DestinationDetail } from "@/components/drawer/DestinationDetail";
import { SafetyDetail } from "@/components/drawer/SafetyDetail";
import { destinations } from "@/data/destinations";
import { safetyByCountry } from "@/data/safety";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const drawer = typeof params.drawer === "string" ? params.drawer : undefined;
  const id = typeof params.id === "string" ? params.id : undefined;

  const closeParams = new URLSearchParams();
  if (typeof params.q === "string") closeParams.set("q", params.q);
  if (typeof params.theme === "string") closeParams.set("theme", params.theme);
  const closeQuery = closeParams.toString();
  const closeHref = closeQuery ? `/?${closeQuery}` : "/";

  const selectedDestination =
    drawer === "destination" && id
      ? destinations.find((d) => d.id === id)
      : undefined;
  const selectedSafety =
    drawer === "safety" && id
      ? safetyByCountry.find((s) => s.countryCode === id)
      : undefined;

  const featuredSafety = safetyByCountry.slice(0, 6);

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-16 px-4 py-8 md:px-8 md:py-16">
      <HeroSearch />

      <DestinationGrid />

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-[#1F2328]">국가별 주의사항</h2>
        <p className="text-base text-[#42474F]">
          출국 전 최신 안전정보를 확인하세요. 최종 확인일이 7일을 넘으면 재확인
          경고가 표시됩니다.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {featuredSafety.map((safety) => (
            <Link
              key={safety.countryCode}
              href={`/?drawer=safety&id=${safety.countryCode}`}
              className="flex flex-col gap-2 rounded-xl border border-[#E4E4E7] bg-white p-4"
            >
              <h3 className="text-base font-semibold text-[#1F2328]">
                {safety.countryName}
              </h3>
              <p className="text-sm text-[#42474F]">{safety.alertLevel}</p>
              <p className="text-xs text-[#6B7280]">
                최종 확인일 {safety.lastVerifiedAt}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <MateTeaser />

      <AboutTeaser />

      {selectedDestination && (
        <DetailDrawer
          open
          closeHref={closeHref}
          title={selectedDestination.name}
        >
          <DestinationDetail destination={selectedDestination} />
        </DetailDrawer>
      )}

      {selectedSafety && (
        <DetailDrawer
          open
          closeHref={closeHref}
          title={`${selectedSafety.countryName} 안전정보`}
        >
          <SafetyDetail safety={selectedSafety} />
        </DetailDrawer>
      )}
    </div>
  );
}
