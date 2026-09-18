import type { MatePostSummary } from "@/lib/server/mates";
import { effectiveStatus } from "./MatePostCard";

export type MatePostDetail = MatePostSummary & { description: string };

const STATUS_LABEL: Record<MatePostSummary["status"], string> = {
  recruiting: "모집중",
  closing_soon: "마감임박",
  closed: "마감",
};

function DetailBody({ post }: { post: MatePostDetail }) {
  const status = effectiveStatus(post);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-[26px] font-bold text-[#1F2328]">{post.title}</h2>
        <p className="mt-2 text-sm text-[#6B7280]">
          {post.countryCode} · {post.region} · {post.startDate} ~ {post.endDate}{" "}
          · {post.headcount}명{post.style ? ` · ${post.style}` : ""}
        </p>
        <span className="mt-2 inline-block w-fit rounded-full bg-[#F7F7F8] px-3 py-1 text-xs font-semibold text-[#1F2328]">
          {STATUS_LABEL[status]}
        </span>
      </div>
      <p className="text-base whitespace-pre-wrap text-[#42474F]">
        {post.description}
      </p>
    </div>
  );
}

export function MateDetailPanel({
  post,
  onClose,
}: {
  post: MatePostDetail | null;
  onClose: () => void;
}) {
  if (!post) {
    return (
      <div className="hidden rounded-[16px] border border-[#E4E4E7] p-8 text-center md:block">
        <p className="text-base text-[#6B7280]">
          왼쪽 목록에서 동행글을 선택하면 상세 내용이 여기에 표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop: 우측 60% 패널 */}
      <div
        data-testid="mate-detail-panel"
        className="hidden rounded-[16px] border border-[#E4E4E7] p-6 md:block"
      >
        <DetailBody post={post} />
      </div>

      {/* Mobile: 하단 Full-height Drawer */}
      <div className="fixed inset-0 z-40 flex items-end md:hidden">
        <div
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
          aria-hidden="true"
        />
        <div className="relative z-10 max-h-[85vh] w-full overflow-y-auto rounded-t-[16px] bg-white p-6">
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#F7F7F8]"
          >
            ×
          </button>
          <DetailBody post={post} />
        </div>
      </div>
    </>
  );
}
