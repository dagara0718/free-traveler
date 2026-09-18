export interface SafetyCategories {
  security: string;
  commonScams: string;
  localLaws: string;
  transportation: string;
  disasterClimate: string;
  health: string;
  cultureDress: string;
  emergencyContacts: string;
}

export interface CountrySafety {
  countryCode: string;
  countryName: string;
  alertLevel: string;
  alertScope: { type: "country" | "region"; text: string };
  source: { name: string; url: string };
  lastVerifiedAt: string;
  editor: string;
  emergencyNumbers: { police: string; ambulance: string; mofaConsular: string };
  disclaimer: string;
  categories: SafetyCategories;
}

const MOFA_DISCLAIMER =
  "본 안전정보는 공식 판단을 대체하지 않습니다. 출국 직전 외교부 해외안전여행 원문을 반드시 재확인하세요.";

export const safetyByCountry: CountrySafety[] = [
  {
    countryCode: "JP",
    countryName: "일본",
    alertLevel: "안전여행(특별 경보 없음)",
    alertScope: { type: "country", text: "전역" },
    source: { name: "외교부 해외안전여행", url: "https://www.0404.go.kr" },
    lastVerifiedAt: "2026-09-10",
    editor: "안전정보팀",
    emergencyNumbers: {
      police: "110",
      ambulance: "119",
      mofaConsular: "+82-2-3210-0404",
    },
    disclaimer: MOFA_DISCLAIMER,
    categories: {
      security: "전반적으로 치안이 우수하나 관광지 소매치기에 유의해야 한다.",
      commonScams:
        "밤거리 호객 바가지 요금, 가짜 티켓 판매 사기 사례가 보고된다.",
      localLaws: "공공장소 흡연 구역이 지정되어 있고, 위반 시 벌금이 부과된다.",
      transportation:
        "JR·지하철이 정시성이 높고 안전하나 러시아워 혼잡에 유의한다.",
      disasterClimate:
        "지진·태풍 발생 빈도가 높아 기상청 경보를 수시로 확인해야 한다.",
      health: "의료 수준이 높으나 여행자보험 가입을 권장한다.",
      cultureDress:
        "온천 시설은 문신 제한이 있는 곳이 있어 사전 확인이 필요하다.",
      emergencyContacts:
        "경찰 110, 구급 119, 주일본 대한민국 대사관 영사콜센터 이용 가능.",
    },
  },
  {
    countryCode: "FR",
    countryName: "프랑스",
    alertLevel: "여행유의(파리 일부 지역)",
    alertScope: { type: "region", text: "파리 관광지·대중교통 밀집 구역" },
    source: { name: "외교부 해외안전여행", url: "https://www.0404.go.kr" },
    lastVerifiedAt: "2026-09-05",
    editor: "안전정보팀",
    emergencyNumbers: {
      police: "17",
      ambulance: "15",
      mofaConsular: "+82-2-3210-0404",
    },
    disclaimer: MOFA_DISCLAIMER,
    categories: {
      security: "파리 지하철·관광명소 인근 소매치기와 날치기 사고가 빈번하다.",
      commonScams:
        "가짜 서명 요청, 금팔찌 사기 등 관광객 대상 사기에 주의한다.",
      localLaws: "대중교통 무임승차 적발 시 즉시 벌금이 부과된다.",
      transportation: "메트로는 야간 운행이 제한적이니 막차 시간을 확인한다.",
      disasterClimate:
        "폭염 시 대중교통 냉방이 약할 수 있어 수분 보충이 필요하다.",
      health:
        "응급실 대기시간이 길 수 있어 경미한 증상은 약국을 우선 이용한다.",
      cultureDress: "성당 방문 시 노출이 심한 복장은 입장이 제한될 수 있다.",
      emergencyContacts:
        "경찰 17, 구급 15, 주프랑스 대한민국 대사관 영사콜센터 이용 가능.",
    },
  },
  {
    countryCode: "IT",
    countryName: "이탈리아",
    alertLevel: "여행유의(로마·나폴리 일부 지역)",
    alertScope: { type: "region", text: "로마 테르미니역, 나폴리 구시가지" },
    source: { name: "외교부 해외안전여행", url: "https://www.0404.go.kr" },
    lastVerifiedAt: "2026-09-01",
    editor: "안전정보팀",
    emergencyNumbers: {
      police: "113",
      ambulance: "118",
      mofaConsular: "+82-2-3210-0404",
    },
    disclaimer: MOFA_DISCLAIMER,
    categories: {
      security: "테르미니역·관광지 인근 소매치기, 오토바이 날치기 사례가 있다.",
      commonScams: "가짜 팔찌 강매, 부정확한 택시 요금 청구에 주의한다.",
      localLaws: "문화재 인근 취식·좌석 취식 금지 조례가 있는 도시가 있다.",
      transportation: "기차 파업이 잦으니 출발 전 운행 정보를 확인한다.",
      disasterClimate:
        "여름철 폭염과 화산 지역(시칠리아 등) 활동 정보를 확인한다.",
      health: "약국 심볼(녹색 십자가)로 응급 의약품 구매가 가능하다.",
      cultureDress: "성당·바티칸 방문 시 어깨·무릎 노출 복장은 입장 제한된다.",
      emergencyContacts:
        "경찰 113, 구급 118, 주이탈리아 대한민국 대사관 영사콜센터 이용 가능.",
    },
  },
  {
    countryCode: "ES",
    countryName: "스페인",
    alertLevel: "여행유의(바르셀로나·마드리드 일부 지역)",
    alertScope: { type: "region", text: "람블라스 거리, 대중교통 밀집 구역" },
    source: { name: "외교부 해외안전여행", url: "https://www.0404.go.kr" },
    lastVerifiedAt: "2026-08-28",
    editor: "안전정보팀",
    emergencyNumbers: {
      police: "091",
      ambulance: "112",
      mofaConsular: "+82-2-3210-0404",
    },
    disclaimer: MOFA_DISCLAIMER,
    categories: {
      security: "람블라스 거리·해변에서 소매치기, 가방 절도 사고가 빈번하다.",
      commonScams: "장미꽃 강매, 축구 경기 티켓 위조 사기에 주의한다.",
      localLaws: "공공장소 음주는 지역 조례에 따라 벌금 대상이 될 수 있다.",
      transportation:
        "메트로 T-casual 티켓 구간 외 이동 시 추가 요금이 발생한다.",
      disasterClimate: "여름철 폭염 경보가 잦으니 실외 활동 시간을 조정한다.",
      health: "응급 전화 112로 다국어 상담이 가능하다.",
      cultureDress: "시에스타 시간대(오후 2~5시) 상점 휴무가 일반적이다.",
      emergencyContacts:
        "경찰 091, 응급 112, 주스페인 대한민국 대사관 영사콜센터 이용 가능.",
    },
  },
  {
    countryCode: "TH",
    countryName: "태국",
    alertLevel: "여행유의(남부 국경 일부 지역)",
    alertScope: { type: "region", text: "얄라·빳따니·나라티왓 등 남부 3개주" },
    source: { name: "외교부 해외안전여행", url: "https://www.0404.go.kr" },
    lastVerifiedAt: "2026-09-08",
    editor: "안전정보팀",
    emergencyNumbers: {
      police: "191",
      ambulance: "1669",
      mofaConsular: "+82-2-3210-0404",
    },
    disclaimer: MOFA_DISCLAIMER,
    categories: {
      security:
        "방콕·치앙마이는 안전하나 남부 국경 지역은 여행을 자제해야 한다.",
      commonScams: "보석 사기, 투어 이중 요금 청구 사례가 보고된다.",
      localLaws: "왕실 모독죄가 엄격히 적용되니 관련 언행을 삼간다.",
      transportation: "야간 오토바이 택시 이용 시 헬멧 착용을 확인한다.",
      disasterClimate: "우기(6~10월) 홍수 가능성이 있어 이동 경로를 확인한다.",
      health: "뎅기열 등 모기 매개 질병 예방 접종을 권장한다.",
      cultureDress: "사원 방문 시 어깨·무릎을 가리는 복장이 필수다.",
      emergencyContacts:
        "관광경찰 1155, 구급 1669, 주태국 대한민국 대사관 영사콜센터 이용 가능.",
    },
  },
  {
    countryCode: "VN",
    countryName: "베트남",
    alertLevel: "안전여행(특별 경보 없음)",
    alertScope: { type: "country", text: "전역" },
    source: { name: "외교부 해외안전여행", url: "https://www.0404.go.kr" },
    lastVerifiedAt: "2026-09-03",
    editor: "안전정보팀",
    emergencyNumbers: {
      police: "113",
      ambulance: "115",
      mofaConsular: "+82-2-3210-0404",
    },
    disclaimer: MOFA_DISCLAIMER,
    categories: {
      security: "대도시 관광지에서 오토바이 날치기 사고가 종종 발생한다.",
      commonScams: "택시 미터기 조작, 환전 사기에 주의한다.",
      localLaws: "마약류 소지·유통은 사형까지 가능한 중범죄로 처벌된다.",
      transportation:
        "도로 횡단 시 오토바이 물결 속에서 일정한 속도로 걸어야 한다.",
      disasterClimate: "우기(5~10월) 홍수와 태풍 경로를 사전에 확인한다.",
      health: "식수는 생수를 이용하고 노점 위생 상태를 확인한다.",
      cultureDress: "사원·유적지 방문 시 단정한 복장을 갖춘다.",
      emergencyContacts:
        "경찰 113, 구급 115, 주베트남 대한민국 대사관 영사콜센터 이용 가능.",
    },
  },
  {
    countryCode: "US",
    countryName: "미국",
    alertLevel: "여행유의(일부 대도시 야간 지역)",
    alertScope: {
      type: "region",
      text: "대도시 우범 지역(야간 단독 이동 자제)",
    },
    source: { name: "외교부 해외안전여행", url: "https://www.0404.go.kr" },
    lastVerifiedAt: "2026-08-30",
    editor: "안전정보팀",
    emergencyNumbers: {
      police: "911",
      ambulance: "911",
      mofaConsular: "+82-2-3210-0404",
    },
    disclaimer: MOFA_DISCLAIMER,
    categories: {
      security: "대도시 일부 지역은 야간 단독 이동을 자제해야 한다.",
      commonScams: "가짜 자선단체 모금, 렌터카 보험 강매에 주의한다.",
      localLaws:
        "주(state)별로 법이 달라 음주 가능 연령·대마 합법 여부를 확인해야 한다.",
      transportation: "렌터카 이용 시 국제운전면허증과 보험 가입이 필수다.",
      disasterClimate: "허리케인·산불 시즌에는 대피 경보를 수시로 확인한다.",
      health: "의료비가 매우 높아 여행자보험 가입이 사실상 필수다.",
      cultureDress: "종교 시설 방문 시 지역 관습에 맞는 복장을 갖춘다.",
      emergencyContacts:
        "긴급 911, 주미국 대한민국 대사관 영사콜센터 이용 가능.",
    },
  },
  {
    countryCode: "GB",
    countryName: "영국",
    alertLevel: "안전여행(특별 경보 없음)",
    alertScope: { type: "country", text: "전역" },
    source: { name: "외교부 해외안전여행", url: "https://www.0404.go.kr" },
    lastVerifiedAt: "2026-09-06",
    editor: "안전정보팀",
    emergencyNumbers: {
      police: "999",
      ambulance: "999",
      mofaConsular: "+82-2-3210-0404",
    },
    disclaimer: MOFA_DISCLAIMER,
    categories: {
      security: "런던 관광지 및 지하철에서 소매치기에 유의해야 한다.",
      commonScams: "가짜 자선 서명 요청, 불법 택시 바가지 요금에 주의한다.",
      localLaws: "공공장소 음주 제한 구역이 지정되어 있다.",
      transportation: "지하철 파업이 종종 있어 대체 노선을 확인한다.",
      disasterClimate: "겨울철 폭설로 항공·기차 지연이 발생할 수 있다.",
      health: "응급 상황은 999, 비응급은 111로 상담 가능하다.",
      cultureDress: "왕실 관련 행사 시 복장 규정이 있는 장소가 있다.",
      emergencyContacts:
        "긴급 999, 비응급 111, 주영국 대한민국 대사관 영사콜센터 이용 가능.",
    },
  },
  {
    countryCode: "DE",
    countryName: "독일",
    alertLevel: "안전여행(특별 경보 없음)",
    alertScope: { type: "country", text: "전역" },
    source: { name: "외교부 해외안전여행", url: "https://www.0404.go.kr" },
    lastVerifiedAt: "2026-09-02",
    editor: "안전정보팀",
    emergencyNumbers: {
      police: "110",
      ambulance: "112",
      mofaConsular: "+82-2-3210-0404",
    },
    disclaimer: MOFA_DISCLAIMER,
    categories: {
      security: "대체로 안전하나 축제 기간 소매치기가 증가한다.",
      commonScams: "가짜 설문조사 서명 요청 사기에 주의한다.",
      localLaws: "나치 관련 상징물 표현은 형법으로 엄격히 금지된다.",
      transportation: "아우토반 렌터카 운행 시 속도 구간 표지를 확인한다.",
      disasterClimate: "겨울철 폭설로 산간 도로가 통제될 수 있다.",
      health: "응급 112, 약국은 초록 십자가로 표시된다.",
      cultureDress: "일요일 대부분 상점이 휴무이니 사전에 확인한다.",
      emergencyContacts:
        "경찰 110, 응급 112, 주독일 대한민국 대사관 영사콜센터 이용 가능.",
    },
  },
  {
    countryCode: "AU",
    countryName: "호주",
    alertLevel: "안전여행(특별 경보 없음)",
    alertScope: { type: "country", text: "전역" },
    source: { name: "외교부 해외안전여행", url: "https://www.0404.go.kr" },
    lastVerifiedAt: "2026-08-25",
    editor: "안전정보팀",
    emergencyNumbers: {
      police: "000",
      ambulance: "000",
      mofaConsular: "+82-2-3210-0404",
    },
    disclaimer: MOFA_DISCLAIMER,
    categories: {
      security: "전반적으로 치안이 우수하나 야간 유흥가는 주의가 필요하다.",
      commonScams: "가짜 부동산 임대, 온라인 중고거래 사기에 주의한다.",
      localLaws: "공공장소 음주 금지 구역(dry zone)이 지정되어 있다.",
      transportation: "좌측통행 국가이므로 렌터카 이용 시 방향에 유의한다.",
      disasterClimate: "여름철 산불·폭염 경보를 수시로 확인해야 한다.",
      health: "해변에서는 지정 깃발 구역 내에서만 수영해야 한다.",
      cultureDress: "자외선이 강해 자외선 차단 및 모자 착용을 권장한다.",
      emergencyContacts:
        "긴급 000, 주호주 대한민국 대사관 영사콜센터 이용 가능.",
    },
  },
  {
    countryCode: "CH",
    countryName: "스위스",
    alertLevel: "안전여행(특별 경보 없음)",
    alertScope: { type: "country", text: "전역" },
    source: { name: "외교부 해외안전여행", url: "https://www.0404.go.kr" },
    lastVerifiedAt: "2026-09-04",
    editor: "안전정보팀",
    emergencyNumbers: {
      police: "117",
      ambulance: "144",
      mofaConsular: "+82-2-3210-0404",
    },
    disclaimer: MOFA_DISCLAIMER,
    categories: {
      security: "치안이 매우 우수하나 관광열차 내 소매치기는 드물게 발생한다.",
      commonScams: "환전소 수수료 미고지 사기에 주의한다.",
      localLaws: "야간 소음 제한 조례가 엄격히 적용된다.",
      transportation: "산악열차·케이블카는 기상에 따라 운행이 취소될 수 있다.",
      disasterClimate: "고산 지역 눈사태·기상 급변에 대비해야 한다.",
      health: "고산병 예방을 위해 고도 적응 시간을 확보한다.",
      cultureDress: "고산 지역 방문 시 방한·방풍 장비가 필수다.",
      emergencyContacts:
        "경찰 117, 응급 144, 주스위스 대한민국 대사관 영사콜센터 이용 가능.",
    },
  },
  {
    countryCode: "PT",
    countryName: "포르투갈",
    alertLevel: "안전여행(특별 경보 없음)",
    alertScope: { type: "country", text: "전역" },
    source: { name: "외교부 해외안전여행", url: "https://www.0404.go.kr" },
    lastVerifiedAt: "2026-08-27",
    editor: "안전정보팀",
    emergencyNumbers: {
      police: "112",
      ambulance: "112",
      mofaConsular: "+82-2-3210-0404",
    },
    disclaimer: MOFA_DISCLAIMER,
    categories: {
      security: "리스본 트램 등 관광지에서 소매치기가 발생한다.",
      commonScams: "불법 택시 요금 과다 청구에 주의한다.",
      localLaws: "해변 지정 흡연구역 외 흡연이 제한된다.",
      transportation: "언덕길이 많아 대중교통·트램 이용이 도보보다 효율적이다.",
      disasterClimate: "여름철 산불 경보 지역 방문을 자제한다.",
      health: "응급 112로 다국어 상담이 가능하다.",
      cultureDress: "성당 방문 시 단정한 복장을 갖춘다.",
      emergencyContacts:
        "긴급 112, 주포르투갈 대한민국 대사관 영사콜센터 이용 가능.",
    },
  },
  {
    countryCode: "GR",
    countryName: "그리스",
    alertLevel: "안전여행(특별 경보 없음)",
    alertScope: { type: "country", text: "전역" },
    source: { name: "외교부 해외안전여행", url: "https://www.0404.go.kr" },
    lastVerifiedAt: "2026-09-07",
    editor: "안전정보팀",
    emergencyNumbers: {
      police: "100",
      ambulance: "166",
      mofaConsular: "+82-2-3210-0404",
    },
    disclaimer: MOFA_DISCLAIMER,
    categories: {
      security: "관광지 소매치기, 여름철 파업으로 인한 일정 변경에 유의한다.",
      commonScams: "택시 정액 요금 미고지, 레스토랑 이중 청구에 주의한다.",
      localLaws: "고대 유적 반출·훼손은 중범죄로 처벌된다.",
      transportation: "섬 간 이동은 페리 일정이 기상에 따라 변경될 수 있다.",
      disasterClimate: "여름철 산불·폭염 경보를 확인해야 한다.",
      health: "응급 166, 관광 성수기 응급실 대기시간이 길 수 있다.",
      cultureDress: "수도원 방문 시 긴 옷과 스카프가 필요한 곳이 있다.",
      emergencyContacts:
        "경찰 100, 응급 166, 주그리스 대한민국 대사관 영사콜센터 이용 가능.",
    },
  },
  {
    countryCode: "TR",
    countryName: "튀르키예",
    alertLevel: "여행유의(국경 인접 지역)",
    alertScope: { type: "region", text: "시리아·이라크 접경 동남부 지역" },
    source: { name: "외교부 해외안전여행", url: "https://www.0404.go.kr" },
    lastVerifiedAt: "2026-09-09",
    editor: "안전정보팀",
    emergencyNumbers: {
      police: "155",
      ambulance: "112",
      mofaConsular: "+82-2-3210-0404",
    },
    disclaimer: MOFA_DISCLAIMER,
    categories: {
      security:
        "이스탄불·카파도키아는 안전하나 동남부 국경 지역은 여행을 자제해야 한다.",
      commonScams: "환전 사기, 카펫 강매 사기에 주의한다.",
      localLaws: "국가 지도자·상징 모독은 형사처벌 대상이 될 수 있다.",
      transportation: "장거리 버스 이용 시 공식 터미널 예매를 권장한다.",
      disasterClimate: "지진 발생 빈도가 높아 대피 요령을 숙지해야 한다.",
      health: "여행자보험 가입 시 응급 후송 특약을 포함하는 것을 권장한다.",
      cultureDress: "모스크 방문 시 여성은 스카프, 신발 탈의가 필요하다.",
      emergencyContacts:
        "경찰 155, 응급 112, 주튀르키예 대한민국 대사관 영사콜센터 이용 가능.",
    },
  },
  {
    countryCode: "IS",
    countryName: "아이슬란드",
    alertLevel: "안전여행(화산 활동 지역 유의)",
    alertScope: { type: "region", text: "레이캬네스 반도 화산 활동 구역" },
    source: { name: "외교부 해외안전여행", url: "https://www.0404.go.kr" },
    lastVerifiedAt: "2026-09-11",
    editor: "안전정보팀",
    emergencyNumbers: {
      police: "112",
      ambulance: "112",
      mofaConsular: "+82-2-3210-0404",
    },
    disclaimer: MOFA_DISCLAIMER,
    categories: {
      security: "치안이 매우 우수하나 겨울철 블랙아이스 도로 사고에 유의한다.",
      commonScams: "렌터카 보험 미가입 상태의 도로 손상 과다 청구에 주의한다.",
      localLaws: "지정 도로 외 오프로드 주행은 자연보호법 위반으로 처벌된다.",
      transportation:
        "겨울철 순환도로 일부 구간이 폐쇄될 수 있어 사전 확인이 필요하다.",
      disasterClimate: "레이캬네스 반도 화산 활동 정보를 수시로 확인해야 한다.",
      health: "응급 112, 외딴 지역은 이동통신 음영 구간이 있을 수 있다.",
      cultureDress: "혹한기 방문 시 방한 장비를 철저히 준비해야 한다.",
      emergencyContacts:
        "긴급 112, 주아이슬란드 대한민국 대사관(핀란드 겸임) 영사콜센터 이용 가능.",
    },
  },
];
