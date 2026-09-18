import Link from "next/link";
import { destinations, type Destination } from "@/data/destinations";

function getRelatedDestinations(destination: Destination): Destination[] {
  return destinations
    .filter(
      (d) =>
        d.id !== destination.id &&
        (d.countryCode === destination.countryCode ||
          d.themes.some((theme) => destination.themes.includes(theme))),
    )
    .slice(0, 6);
}

export function DestinationDetail({
  destination,
}: {
  destination: Destination;
}) {
  const related = getRelatedDestinations(destination);

  return (
    <div className="flex flex-col gap-5 text-left">
      <div
        role="img"
        aria-label={destination.image.alt}
        className="flex h-40 items-center justify-center rounded-xl bg-[#F7F7F8] text-sm text-[#6B7280]"
      >
        {destination.image.alt}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[#1F2328]">
          {destination.name}
        </h3>
        <p className="mt-1 text-sm text-[#42474F]">{destination.description}</p>
      </div>

      <dl className="grid grid-cols-1 gap-3 text-sm">
        <div>
          <dt className="font-semibold text-[#1F2328]">추천 시기</dt>
          <dd className="text-[#42474F]">{destination.season}</dd>
        </div>
        <div>
          <dt className="font-semibold text-[#1F2328]">추천 일정</dt>
          <dd className="text-[#42474F]">{destination.recommendedDuration}</dd>
        </div>
        <div>
          <dt className="font-semibold text-[#1F2328]">대표 명소</dt>
          <dd className="text-[#42474F]">
            {destination.attractions.join(", ")}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-[#1F2328]">예산</dt>
          <dd className="text-[#42474F]">{destination.budget}</dd>
        </div>
        <div>
          <dt className="font-semibold text-[#1F2328]">교통</dt>
          <dd className="text-[#42474F]">{destination.transportation}</dd>
        </div>
        <div>
          <dt className="font-semibold text-[#1F2328]">음식</dt>
          <dd className="text-[#42474F]">{destination.food.join(", ")}</dd>
        </div>
        <div>
          <dt className="font-semibold text-[#1F2328]">에티켓</dt>
          <dd className="text-[#42474F]">{destination.etiquette}</dd>
        </div>
      </dl>

      <p className="text-xs text-[#6B7280]">
        출처: {destination.source} · 최종 수정일 {destination.lastUpdatedAt}
      </p>

      {related.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-[#1F2328]">관련 여행지</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/?drawer=destination&id=${item.id}`}
                className="rounded-full bg-[#F7F7F8] px-3 py-1 text-xs text-[#1F2328]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
