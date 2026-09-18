import { profile } from "@/data/profile";

const DISPLAY_REGIONS = ["아시아", "유럽", "북미", "오세아니아"] as const;

const REGION_OVERRIDE: Record<string, (typeof DISPLAY_REGIONS)[number]> = {
  아메리카: "북미",
  중동: "아시아",
};

function toDisplayRegion(region: string): (typeof DISPLAY_REGIONS)[number] {
  return (
    REGION_OVERRIDE[region] ??
    (DISPLAY_REGIONS as readonly string[]).find((r) => r === region) ??
    "아시아"
  );
}

export function CountryChips() {
  const grouped = DISPLAY_REGIONS.map((region) => ({
    region,
    countries: profile.visitedCountries.filter(
      (country) => toDisplayRegion(country.region) === region,
    ),
  })).filter((group) => group.countries.length > 0);

  return (
    <div className="flex flex-col gap-6">
      {grouped.map((group) => (
        <div key={group.region}>
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-[#6B7280] uppercase">
            {group.region}
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.countries.map((country) => (
              <span
                key={country.name}
                className="rounded-full bg-[#F7F7F8] px-4 py-2 text-sm text-[#1F2328]"
              >
                {country.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
