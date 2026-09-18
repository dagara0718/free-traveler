import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { TravelToolsTabs } from "@/components/travel-tools/TravelToolsTabs";
import { FlightForm } from "@/components/travel-tools/FlightForm";
import { HotelForm } from "@/components/travel-tools/HotelForm";
import { MateWriteForm } from "@/components/travel-tools/MateWriteForm";

export const metadata: Metadata = buildMetadata({
  title: "여행 도구",
  description:
    "항공·숙소 조건을 정리하고 외부 사이트로 이동하거나, 동행 게시글을 작성할 수 있는 여행 준비 도구입니다.",
  path: "/travel-tools",
});

const TIPS = [
  "국가·지역·날짜만 정리하면 항공/숙소 검색 사이트에서 바로 조건을 이어서 입력할 수 있습니다.",
  "출발일과 귀국일 사이 간격을 먼저 정하면 항공권 가격 변동 폭을 줄일 수 있습니다.",
  "동행을 구할 때는 여행 스타일과 예상 인원을 구체적으로 적을수록 매칭 확률이 높아집니다.",
];

export default function TravelToolsPage() {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-12 px-4 py-12 md:px-8 md:py-20">
      <section>
        <h1 className="text-[26px] font-bold text-[#1F2328]">여행 도구</h1>
        <p className="mt-3 text-base text-[#42474F]">
          아래 3단계로 여행 준비를 정리하세요: ① 항공·숙소 조건 입력 → ② 요약
          확인 후 외부 사이트로 이동 → ③ 필요하면 동행 게시글 작성.
        </p>
      </section>

      <section>
        <TravelToolsTabs
          tabs={[
            { id: "flight", label: "항공편", panel: <FlightForm /> },
            { id: "hotel", label: "숙소", panel: <HotelForm /> },
            {
              id: "mate",
              label: "동행 구하기",
              panel: <MateWriteForm />,
            },
          ]}
        />
      </section>

      <section>
        <h2 className="text-[26px] font-bold text-[#1F2328]">Tip</h2>
        <p className="mt-2 text-base text-[#42474F]">
          입력값은 외부로 전달되지 않습니다. 조건을 정리한 뒤 아래 팁을 참고해
          다음 단계를 진행하세요.
        </p>
        <ul className="mt-4 flex flex-col gap-3">
          {TIPS.map((tip) => (
            <li
              key={tip}
              className="rounded-[12px] border border-[#E4E4E7] p-4 text-sm text-[#42474F]"
            >
              {tip}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
