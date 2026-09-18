import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ShareButton } from "@/components/common/ShareButton";
import { ProfileHero } from "@/components/about/ProfileHero";
import { StatCards } from "@/components/about/StatCards";
import { Timeline } from "@/components/about/Timeline";
import { CountryChips } from "@/components/about/CountryChips";
import { Gallery } from "@/components/about/Gallery";
import { TopPicks } from "@/components/about/TopPicks";

export const metadata: Metadata = buildMetadata({
  title: "대표 소개",
  description:
    "free_traveler의 50회 이상, 30개국 이상 여행 경험과 콘텐츠 편집 원칙을 소개합니다.",
  path: "/about",
});

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-[26px] font-bold text-[#1F2328]">{title}</h2>
      <p className="mt-2 text-base text-[#42474F]">{description}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-16 px-4 py-12 md:gap-24 md:px-8 md:py-20">
      <section>
        <div className="flex items-start justify-between gap-4">
          <ProfileHero />
          <ShareButton url="/about" title="free_traveler 대표 소개" />
        </div>
      </section>

      <section>
        <SectionHeading
          title="여행 지표"
          description="지금까지 다녀온 여행을 숫자로 정리했습니다."
        />
        <StatCards />
      </section>

      <section>
        <SectionHeading
          title="여행 Timeline"
          description="연도별 주요 여행 기록입니다."
        />
        <Timeline />
      </section>

      <section>
        <SectionHeading
          title="방문 국가"
          description="지금까지 방문한 30개국을 권역별로 정리했습니다."
        />
        <CountryChips />
      </section>

      <section>
        <SectionHeading
          title="여행 사진"
          description="여행 중 담은 장면들을 모았습니다."
        />
        <Gallery />
      </section>

      <section>
        <SectionHeading
          title="기억에 남는 여행지"
          description="직접 다녀온 여행지 중 다시 추천하고 싶은 곳입니다."
        />
        <TopPicks />
      </section>
    </div>
  );
}
