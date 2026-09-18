import type { MatePostSummary } from "@/lib/server/mates";

const STATUS_LABEL: Record<MatePostSummary["status"], string> = {
  recruiting: "모집중",
  closing_soon: "마감임박",
  closed: "마감",
};

const STATUS_CLASS: Record<MatePostSummary["status"], string> = {
  recruiting: "bg-[rgba(30,142,90,0.12)] text-[#1E8E5A]",
  closing_soon: "bg-[rgba(180,83,9,0.12)] text-[#B45309]",
  closed: "bg-[#EFEFF1] text-[#6B7280]",
};

export function effectiveStatus(
  post: Pick<MatePostSummary, "status" | "endDate">,
): MatePostSummary["status"] {
  const today = new Date().toISOString().slice(0, 10);
  if (post.status !== "closed" && post.endDate < today) {
    return "closed";
  }
  return post.status;
}

export function MatePostCard({
  post,
  onSelect,
}: {
  post: MatePostSummary;
  onSelect: (id: string) => void;
}) {
  const status = effectiveStatus(post);

  return (
    <button
      type="button"
      data-testid="mate-post-card"
      onClick={() => onSelect(post.id)}
      className="flex w-full flex-col gap-2 rounded-[12px] border border-[#E4E4E7] p-4 text-left"
    >
      <h3 className="text-base font-semibold text-[#1F2328]">{post.title}</h3>
      <p className="text-sm text-[#42474F]">
        {post.countryCode} · {post.region}
      </p>
      <p className="text-sm text-[#42474F]">
        {post.startDate} ~ {post.endDate} · {post.headcount}명
      </p>
      <span
        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${STATUS_CLASS[status]}`}
      >
        {STATUS_LABEL[status]}
      </span>
    </button>
  );
}
