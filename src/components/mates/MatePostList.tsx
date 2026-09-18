import Link from "next/link";
import type { MatePostSummary } from "@/lib/server/mates";
import { MatePostCard } from "./MatePostCard";

const MAX_VISIBLE = 8;

export function MatePostList({
  posts,
  onSelect,
}: {
  posts: MatePostSummary[];
  onSelect: (id: string) => void;
}) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-[16px] border border-[#E4E4E7] p-8">
        <p className="text-base text-[#1F2328]">
          조건에 맞는 동행 모집글이 아직 없습니다.
        </p>
        <p className="text-sm text-[#6B7280]">
          필터를 초기화하거나 새 동행글을 직접 작성해 보세요.
        </p>
        <Link
          href="/travel-tools"
          className="flex h-11 items-center rounded-full bg-[#F2603C] px-5 text-sm font-semibold text-white"
        >
          새 동행글 작성하기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {posts.slice(0, MAX_VISIBLE).map((post) => (
        <MatePostCard key={post.id} post={post} onSelect={onSelect} />
      ))}
    </div>
  );
}
