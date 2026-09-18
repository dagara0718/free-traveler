"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
  domesticDestinations,
  overseasDestinations,
  type Destination,
} from "@/data/destinations";
import { ThemeChips } from "./ThemeChips";
import { FavoriteButton } from "@/components/destination/FavoriteButton";

function getTopThemes(destinations: Destination[], count: number): string[] {
  const frequency = new Map<string, number>();
  for (const destination of destinations) {
    for (const theme of destination.themes) {
      frequency.set(theme, (frequency.get(theme) ?? 0) + 1);
    }
  }
  return Array.from(frequency.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, count)
    .map(([theme]) => theme);
}

function matches(
  destination: Destination,
  keyword: string,
  theme: string | null,
) {
  const keywordMatch =
    !keyword ||
    destination.name.includes(keyword) ||
    destination.city.includes(keyword) ||
    destination.countryName.includes(keyword) ||
    destination.themes.some((t) => t.includes(keyword));
  const themeMatch = !theme || destination.themes.includes(theme);
  return keywordMatch && themeMatch;
}

function DestinationCard({
  destination,
  drawerHref,
}: {
  destination: Destination;
  drawerHref: string;
}) {
  return (
    <div className="relative rounded-2xl border border-[#E4E4E7] bg-white">
      <div className="absolute right-3 top-3 z-10">
        <FavoriteButton
          destinationId={destination.id}
          destinationName={destination.name}
        />
      </div>
      <Link
        href={drawerHref}
        data-testid="destination-card"
        className="flex w-full flex-col gap-2 rounded-2xl p-4 text-left"
      >
        <div
          role="img"
          aria-label={destination.image.alt}
          className="flex h-40 items-center justify-center rounded-xl bg-[#F7F7F8] text-sm text-[#6B7280]"
        >
          {destination.image.alt}
        </div>
        <h3 className="text-lg font-semibold text-[#1F2328]">
          {destination.name}
        </h3>
        <div className="flex flex-wrap gap-1">
          {destination.themes.slice(0, 2).map((theme) => (
            <span
              key={theme}
              className="rounded-full bg-[#F7F7F8] px-3 py-1 text-xs text-[#1F2328]"
            >
              {theme}
            </span>
          ))}
        </div>
        <p className="text-sm text-[#6B7280]">
          {destination.recommendedDuration}
        </p>
      </Link>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center gap-3 rounded-2xl border border-[#E4E4E7] px-6 py-12 text-center">
      <p className="text-base text-[#1F2328]">
        선택한 조건에 맞는 여행지가 없습니다.
      </p>
      <p className="text-sm text-[#6B7280]">
        검색어나 테마 조건을 완화하면 더 많은 여행지를 볼 수 있습니다.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="flex h-11 items-center rounded-full bg-[#F2603C] px-5 text-sm font-semibold text-white"
      >
        조건 초기화
      </button>
    </div>
  );
}

export function DestinationGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q") ?? "";
  const theme = searchParams.get("theme");

  function drawerHrefFor(destinationId: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("drawer", "destination");
    params.set("id", destinationId);
    return `/?${params.toString()}`;
  }

  const themes = useMemo(
    () => getTopThemes([...domesticDestinations, ...overseasDestinations], 6),
    [],
  );

  const domestic = useMemo(
    () =>
      domesticDestinations
        .filter((d) => matches(d, keyword, theme))
        .slice(0, 6),
    [keyword, theme],
  );
  const overseas = useMemo(
    () =>
      overseasDestinations
        .filter((d) => matches(d, keyword, theme))
        .slice(0, 6),
    [keyword, theme],
  );

  function updateQuery(next: { q?: string; theme?: string | null }) {
    const params = new URLSearchParams(searchParams.toString());
    if (next.q !== undefined) {
      if (next.q) params.set("q", next.q);
      else params.delete("q");
    }
    if (next.theme !== undefined) {
      if (next.theme) params.set("theme", next.theme);
      else params.delete("theme");
    }
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  }

  function handleReset() {
    router.push("/");
  }

  const isEmpty = domestic.length === 0 && overseas.length === 0;

  return (
    <div className="flex flex-col gap-10">
      <ThemeChips
        themes={themes}
        selected={theme}
        onSelect={(next) => updateQuery({ theme: next })}
      />

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-[#1F2328]">국내 여행지</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {isEmpty ? (
            <EmptyState onReset={handleReset} />
          ) : (
            domestic.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                drawerHref={drawerHrefFor(destination.id)}
              />
            ))
          )}
        </div>
      </section>

      {!isEmpty && (
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-[#1F2328]">해외 여행지</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {overseas.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                drawerHref={drawerHrefFor(destination.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
