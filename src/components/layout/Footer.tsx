const POLICY_ITEMS = [
  "이용약관",
  "개인정보처리방침",
  "동행 안전수칙",
  "콘텐츠 면책 안내",
];

export function Footer() {
  return (
    <footer className="border-t border-[#E4E4E7] bg-white">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-12 md:grid-cols-3 md:px-8 md:py-16">
        <div>
          <h2 className="text-base font-semibold text-[#1F2328]">서비스</h2>
          <p className="mt-3 text-sm text-[#42474F]">
            여행지 탐색, 항공·숙소 조건 정리, 동행 매칭을 하나의 화면에서
            제공합니다.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-[#1F2328]">정책</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {POLICY_ITEMS.map((item) => (
              <li key={item} className="text-sm text-[#42474F]">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-[#1F2328]">안내</h2>
          <p className="mt-3 text-sm text-[#42474F]">
            항공·숙소 링크는 제3자 사이트로 연결되며 예약을 대행하지 않습니다.
          </p>
        </div>
      </div>

      <div className="border-t border-[#E4E4E7] px-4 py-6 md:px-8">
        <p className="text-sm text-[#6B7280]">
          © {new Date().getFullYear()} Free Traveler. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
