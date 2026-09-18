import Link from "next/link";
import { getRecentRecruitingMates } from "@/lib/server/mates";

export async function MateTeaser() {
  let posts: Awaited<ReturnType<typeof getRecentRecruitingMates>> = [];
  let loadError = false;

  try {
    posts = await getRecentRecruitingMates(3);
  } catch {
    loadError = true;
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1F2328]">최근 동행글</h2>
        <Link
          href="/mates"
          data-testid="mate-section-cta"
          className="text-sm font-semibold text-[#F2603C]"
        >
          전체 동행글 보기
        </Link>
      </div>

      {loadError ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#C1272D] bg-[rgba(193,39,45,0.06)] px-6 py-8 text-center">
          <p className="text-base text-[#C1272D]">
            최근 동행글을 불러오지 못했습니다.
          </p>
          <Link
            href="/"
            className="flex h-10 items-center rounded-full bg-[#F2603C] px-5 text-sm font-semibold text-white"
          >
            다시 시도
          </Link>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#E4E4E7] px-6 py-12 text-center">
          <p className="text-base text-[#1F2328]">
            아직 등록된 동행글이 없습니다.
          </p>
          <p className="text-sm text-[#6B7280]">
            여행 조건을 정리한 뒤 동행 탭에서 첫 번째 동행글을 작성해보세요.
          </p>
          <Link
            href="/travel-tools"
            className="flex h-11 items-center rounded-full bg-[#F2603C] px-5 text-sm font-semibold text-white"
          >
            동행 모집 시작하기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href="/mates"
              className="flex flex-col gap-2 rounded-xl border border-[#E4E4E7] bg-white p-4"
            >
              <h3 className="text-base font-semibold text-[#1F2328]">
                {post.title}
              </h3>
              <p className="text-sm text-[#42474F]">
                {post.region} · {post.startDate} ~ {post.endDate}
              </p>
              <span className="w-fit rounded-full bg-[rgba(30,142,90,0.12)] px-3 py-1 text-xs font-semibold text-[#1E8E5A]">
                모집중
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
