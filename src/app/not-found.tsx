import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-[#1F2328]">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="text-base text-[#42474F]">
        요청하신 주소가 변경되었거나 삭제되었을 수 있습니다. 아래에서 여행지
        탐색으로 돌아가세요.
      </p>
      <Link
        href="/"
        className="flex h-12 items-center rounded-full bg-[#F2603C] px-6 text-base font-semibold text-white"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
