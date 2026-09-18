export function SummaryCard({
  title,
  lines,
  externalUrl,
  externalLabel,
  externalTestId,
}: {
  title: string;
  lines: string[];
  externalUrl: string;
  externalLabel: string;
  externalTestId: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[16px] border border-[#E4E4E7] p-6">
      <h3 className="text-base font-semibold text-[#1F2328]">{title}</h3>
      <ul className="flex flex-col gap-1">
        {lines.map((line) => (
          <li key={line} className="text-sm text-[#42474F]">
            {line}
          </li>
        ))}
      </ul>

      <p className="text-sm text-[#6B7280]">
        입력값은 외부로 전달되지 않습니다. 조건 확인 후 외부 사이트에서 직접
        예약을 진행해 주세요.
      </p>

      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={externalTestId}
        className="flex h-12 items-center justify-center rounded-full bg-[#F2603C] px-6 text-base font-semibold text-white"
      >
        {externalLabel}
      </a>
    </div>
  );
}
