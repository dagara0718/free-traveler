export interface ProfileImage {
  url: string;
  alt: string;
  source: string;
  author: string;
  license: string;
}

export interface TimelineItem {
  year: number;
  place: string;
  summary: string;
}

export interface VisitedCountry {
  name: string;
  region: string;
}

export const profile = {
  displayName: "free_traveler",
  tripsLabel: "50+ Trips",
  countriesLabel: "30+ Countries",
  intro: [
    "free_traveler는 10년간 30개국 이상을 다니며 얻은 여행 경험을 바탕으로 Free Traveler를 만들었습니다.",
    "여행 준비의 첫 단계인 '어디로, 언제, 어떻게 갈 것인가'를 정리하는 데 필요한 정보만 모아 제공합니다.",
    "화려한 후기보다 실제로 확인한 사실과 출처가 분명한 정보를 우선한다는 편집 원칙을 지킵니다.",
  ],
  philosophy:
    "여행 정보는 예쁘게 포장된 광고보다 실제로 확인된 사실이어야 한다고 믿습니다. 모든 콘텐츠는 출처와 최종 확인일을 함께 표기합니다.",
  timeline: [
    {
      year: 2016,
      place: "태국 방콕·치앙마이",
      summary: "첫 배낭여행. 동남아 저비용 장기 여행의 기초를 다졌다.",
    },
    {
      year: 2017,
      place: "일본 도쿄·오사카",
      summary: "간토·간사이 지역을 각각 2주씩 체류하며 도시 여행 루틴을 정립.",
    },
    {
      year: 2018,
      place: "프랑스 파리·니스",
      summary: "유럽 첫 여행. 대중교통 기반 이동 전략을 실험.",
    },
    {
      year: 2019,
      place: "아이슬란드 링로드 일주",
      summary: "렌터카로 1번 순환도로를 완주하며 오로라와 폭포를 기록.",
    },
    {
      year: 2022,
      place: "이탈리아·스위스",
      summary: "알프스 산악열차와 이탈리아 미식 여행을 결합한 3주 일정.",
    },
    {
      year: 2023,
      place: "튀르키예 이스탄불·카파도키아",
      summary: "열기구 투어와 지하도시 탐방으로 동서양 교차점을 체험.",
    },
    {
      year: 2024,
      place: "호주 시드니·멜버른",
      summary: "남반구 겨울 시즌을 활용한 첫 장기 남반구 여행.",
    },
    {
      year: 2025,
      place: "포르투갈·그리스",
      summary: "지중해 연안 국가를 잇는 해안 도시 여행 시리즈 완료.",
    },
  ] as TimelineItem[],
  visitedCountries: [
    { name: "대한민국", region: "아시아" },
    { name: "일본", region: "아시아" },
    { name: "태국", region: "아시아" },
    { name: "베트남", region: "아시아" },
    { name: "대만", region: "아시아" },
    { name: "싱가포르", region: "아시아" },
    { name: "말레이시아", region: "아시아" },
    { name: "인도네시아", region: "아시아" },
    { name: "필리핀", region: "아시아" },
    { name: "인도", region: "아시아" },
    { name: "프랑스", region: "유럽" },
    { name: "이탈리아", region: "유럽" },
    { name: "스페인", region: "유럽" },
    { name: "영국", region: "유럽" },
    { name: "독일", region: "유럽" },
    { name: "스위스", region: "유럽" },
    { name: "포르투갈", region: "유럽" },
    { name: "그리스", region: "유럽" },
    { name: "튀르키예", region: "유럽" },
    { name: "아이슬란드", region: "유럽" },
    { name: "네덜란드", region: "유럽" },
    { name: "오스트리아", region: "유럽" },
    { name: "체코", region: "유럽" },
    { name: "미국", region: "아메리카" },
    { name: "캐나다", region: "아메리카" },
    { name: "멕시코", region: "아메리카" },
    { name: "페루", region: "아메리카" },
    { name: "호주", region: "오세아니아" },
    { name: "뉴질랜드", region: "오세아니아" },
    { name: "아랍에미리트", region: "중동" },
  ] as VisitedCountry[],
  gallery: [
    {
      url: "/images/profile/gallery-01.jpg",
      alt: "아이슬란드 셀랴란즈포스 폭포 앞에서",
      source: "본인 촬영",
      author: "free_traveler",
      license: "All rights reserved",
    },
    {
      url: "/images/profile/gallery-02.jpg",
      alt: "산토리니 이아 마을 일몰",
      source: "본인 촬영",
      author: "free_traveler",
      license: "All rights reserved",
    },
    {
      url: "/images/profile/gallery-03.jpg",
      alt: "카파도키아 열기구 투어 탑승 전",
      source: "본인 촬영",
      author: "free_traveler",
      license: "All rights reserved",
    },
    {
      url: "/images/profile/gallery-04.jpg",
      alt: "교토 사찰 앞 단풍길",
      source: "본인 촬영",
      author: "free_traveler",
      license: "All rights reserved",
    },
    {
      url: "/images/profile/gallery-05.jpg",
      alt: "스위스 융프라우요흐 만년설",
      source: "본인 촬영",
      author: "free_traveler",
      license: "All rights reserved",
    },
    {
      url: "/images/profile/gallery-06.jpg",
      alt: "베트남 하롱베이 크루즈",
      source: "본인 촬영",
      author: "free_traveler",
      license: "All rights reserved",
    },
    {
      url: "/images/profile/gallery-07.jpg",
      alt: "포르투 도루강변 야경",
      source: "본인 촬영",
      author: "free_traveler",
      license: "All rights reserved",
    },
    {
      url: "/images/profile/gallery-08.jpg",
      alt: "시드니 오페라하우스 야경",
      source: "본인 촬영",
      author: "free_traveler",
      license: "All rights reserved",
    },
  ] as ProfileImage[],
  recommendedDestinationIds: [
    "kr-jeju",
    "jp-tokyo",
    "fr-paris",
    "it-florence",
    "es-barcelona",
    "gr-santorini",
  ],
};
