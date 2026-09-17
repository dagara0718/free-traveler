"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-[#1F2328]">
        일시적인 오류가 발생했습니다
      </h1>
      <p className="text-base text-[#42474F]">
        페이지를 불러오는 중 문제가 생겼습니다. 다시 시도해 주세요.
      </p>
      <button
        type="button"
        onClick={reset}
        className="flex h-12 items-center rounded-full bg-[#F2603C] px-6 text-base font-semibold text-white"
      >
        다시 시도
      </button>
    </div>
  );
}
