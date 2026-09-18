import type { CountrySafety } from "@/data/safety";

const STALE_THRESHOLD_DAYS = 7;

function isStale(lastVerifiedAt: string): boolean {
  const last = new Date(lastVerifiedAt).getTime();
  const diffDays = (Date.now() - last) / (1000 * 60 * 60 * 24);
  return diffDays > STALE_THRESHOLD_DAYS;
}

const CATEGORY_LABELS: Record<keyof CountrySafety["categories"], string> = {
  security: "치안",
  commonScams: "흔한 사기",
  localLaws: "현지 법규",
  transportation: "교통",
  disasterClimate: "재난·기후",
  health: "보건",
  cultureDress: "문화·복장",
  emergencyContacts: "긴급연락처",
};

export function SafetyDetail({ safety }: { safety: CountrySafety }) {
  const stale = isStale(safety.lastVerifiedAt);

  return (
    <div className="flex flex-col gap-5 text-left">
      <div>
        <h3 className="text-lg font-semibold text-[#1F2328]">
          {safety.countryName} 안전정보
        </h3>
        <p className="mt-1 text-sm font-semibold text-[#C1272D]">
          경보 단계: {safety.alertLevel} (
          {safety.alertScope.type === "country" ? "국가 전체" : "일부 지역"}:{" "}
          {safety.alertScope.text})
        </p>
        {stale && (
          <p className="mt-1 text-sm font-semibold text-[#B45309]">
            최종 확인일로부터 {STALE_THRESHOLD_DAYS}일이 지났습니다 — 최신
            정보를 원문에서 재확인하세요.
          </p>
        )}
      </div>

      <dl className="grid grid-cols-1 gap-3 text-sm">
        {(
          Object.keys(CATEGORY_LABELS) as Array<
            keyof CountrySafety["categories"]
          >
        ).map((key) => (
          <div key={key}>
            <dt className="font-semibold text-[#1F2328]">
              {CATEGORY_LABELS[key]}
            </dt>
            <dd className="text-[#42474F]">{safety.categories[key]}</dd>
          </div>
        ))}
      </dl>

      <div className="rounded-xl bg-[#F7F7F8] p-4 text-sm text-[#42474F]">
        <p className="font-semibold text-[#1F2328]">긴급 연락처</p>
        <p>
          경찰 {safety.emergencyNumbers.police} · 구급{" "}
          {safety.emergencyNumbers.ambulance}
        </p>
        <p>영사콜센터 {safety.emergencyNumbers.mofaConsular}</p>
      </div>

      <p className="text-xs text-[#6B7280]">
        출처:{" "}
        <a
          href={safety.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2454C7]"
        >
          {safety.source.name}
        </a>{" "}
        · 최종 확인일 {safety.lastVerifiedAt}
      </p>

      <p className="text-xs text-[#6B7280]">{safety.disclaimer}</p>
    </div>
  );
}
