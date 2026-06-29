export type ContinentKey =
  | "asia"
  | "europe"
  | "africa"
  | "northAmerica"
  | "southAmerica"
  | "oceania";

export type RepresentativeCountry = {
  name: string;
  continent: ContinentKey;
  flag: string;
  flagImage: string;
  capital: string;
  language: string;
  currency: string;
  area: string;
  areaComparison: string;
  population: string;
  populationComparison: string;
  greeting: string;
  overview: string;
  mapNote: string;
  clothing: string;
  food: string;
  house: string;
  color: string;
};

export const continents: Record<
  ContinentKey,
  {
    name: string;
    population: string;
    area: string;
    countryCount: number;
    color: string;
    countries: string[];
  }
> = {
  asia: {
    name: "아시아",
    population: "약 47억 명",
    area: "약 4,458만 km²",
    countryCount: 49,
    color: "#4f75d6",
    countries: ["대한민국", "일본", "중국"],
  },
  europe: {
    name: "유럽",
    population: "약 7억 4천만 명",
    area: "약 1,018만 km²",
    countryCount: 44,
    color: "#4f75d6",
    countries: ["영국", "프랑스", "독일"],
  },
  africa: {
    name: "아프리카",
    population: "약 14억 명",
    area: "약 3,037만 km²",
    countryCount: 54,
    color: "#4f75d6",
    countries: ["이집트"],
  },
  northAmerica: {
    name: "북아메리카",
    population: "약 6억 명",
    area: "약 2,471만 km²",
    countryCount: 23,
    color: "#4f75d6",
    countries: ["미국", "멕시코"],
  },
  southAmerica: {
    name: "남아메리카",
    population: "약 4억 4천만 명",
    area: "약 1,784만 km²",
    countryCount: 12,
    color: "#4f75d6",
    countries: ["브라질"],
  },
  oceania: {
    name: "오세아니아",
    population: "약 4천5백만 명",
    area: "약 852만 km²",
    countryCount: 14,
    color: "#4f75d6",
    countries: ["호주"],
  },
};

export const representativeCountries: RepresentativeCountry[] = [
  {
    name: "대한민국",
    continent: "asia",
    flag: "🇰🇷",
    flagImage: "https://flagcdn.com/w320/kr.png",
    capital: "서울",
    language: "한국어",
    currency: "원",
    area: "약 10만 km²",
    areaComparison: "대한민국 기준 1배",
    population: "약 5,100만 명",
    populationComparison: "대한민국 기준 1배",
    greeting: "안녕하세요",
    overview: "한반도 남쪽에 위치한 나라로, 전통과 첨단 기술이 함께 발전했습니다.",
    mapNote: "동아시아, 한반도 남부",
    clothing: "한복",
    food: "김치와 비빔밥",
    house: "한옥",
    color: "#3156a3",
  },
  {
    name: "일본",
    continent: "asia",
    flag: "🇯🇵",
    flagImage: "https://flagcdn.com/w320/jp.png",
    capital: "도쿄",
    language: "일본어",
    currency: "엔",
    area: "약 37만 km²",
    areaComparison: "대한민국의 약 3.7배",
    population: "약 1억 2천만 명",
    populationComparison: "대한민국의 약 2.4배",
    greeting: "こんにちは",
    overview: "태평양의 섬나라로 전통 문화와 현대 도시가 조화를 이룹니다.",
    mapNote: "동아시아의 열도",
    clothing: "기모노",
    food: "스시와 라멘",
    house: "다다미집",
    color: "#b43b4a",
  },
  {
    name: "중국",
    continent: "asia",
    flag: "🇨🇳",
    flagImage: "https://flagcdn.com/w320/cn.png",
    capital: "베이징",
    language: "중국어",
    currency: "위안",
    area: "약 960만 km²",
    areaComparison: "대한민국의 약 96배",
    population: "약 14억 명",
    populationComparison: "대한민국의 약 27배",
    greeting: "你好",
    overview: "넓은 영토와 긴 역사를 가진 동아시아의 큰 나라입니다.",
    mapNote: "동아시아 대륙",
    clothing: "치파오",
    food: "딤섬과 만두",
    house: "사합원",
    color: "#c7473d",
  },
  {
    name: "영국",
    continent: "europe",
    flag: "🇬🇧",
    flagImage: "https://flagcdn.com/w320/gb.png",
    capital: "런던",
    language: "영어",
    currency: "파운드",
    area: "약 24만 km²",
    areaComparison: "대한민국의 약 2.4배",
    population: "약 6,800만 명",
    populationComparison: "대한민국의 약 1.3배",
    greeting: "Hello",
    overview: "유럽 서쪽의 섬나라로 의회 민주주의와 왕실 문화가 알려져 있습니다.",
    mapNote: "서유럽의 섬",
    clothing: "타탄과 정장 문화",
    food: "피시 앤 칩스",
    house: "벽돌집",
    color: "#3953a4",
  },
  {
    name: "프랑스",
    continent: "europe",
    flag: "🇫🇷",
    flagImage: "https://flagcdn.com/w320/fr.png",
    capital: "파리",
    language: "프랑스어",
    currency: "유로",
    area: "약 64만 km²",
    areaComparison: "대한민국의 약 6.4배",
    population: "약 6,800만 명",
    populationComparison: "대한민국의 약 1.3배",
    greeting: "Bonjour",
    overview: "예술, 패션, 음식 문화로 유명한 서유럽의 나라입니다.",
    mapNote: "서유럽",
    clothing: "베레모와 코트",
    food: "바게트와 크루아상",
    house: "석조 주택",
    color: "#4267b2",
  },
  {
    name: "독일",
    continent: "europe",
    flag: "🇩🇪",
    flagImage: "https://flagcdn.com/w320/de.png",
    capital: "베를린",
    language: "독일어",
    currency: "유로",
    area: "약 35만 km²",
    areaComparison: "대한민국의 약 3.5배",
    population: "약 8,400만 명",
    populationComparison: "대한민국의 약 1.6배",
    greeting: "Guten Tag",
    overview: "중앙유럽에 위치하며 산업과 음악, 축구 문화가 발달했습니다.",
    mapNote: "중앙유럽",
    clothing: "레더호젠",
    food: "소시지와 프레첼",
    house: "목골조 주택",
    color: "#7a6536",
  },
  {
    name: "이집트",
    continent: "africa",
    flag: "🇪🇬",
    flagImage: "https://flagcdn.com/w320/eg.png",
    capital: "카이로",
    language: "아랍어",
    currency: "이집트 파운드",
    area: "약 100만 km²",
    areaComparison: "대한민국의 약 10배",
    population: "약 1억 1천만 명",
    populationComparison: "대한민국의 약 2.2배",
    greeting: "مرحبا",
    overview: "나일강과 피라미드로 유명한 북아프리카의 나라입니다.",
    mapNote: "북아프리카",
    clothing: "갈라비야",
    food: "코샤리",
    house: "흙벽돌 집",
    color: "#c5912d",
  },
  {
    name: "미국",
    continent: "northAmerica",
    flag: "🇺🇸",
    flagImage: "https://flagcdn.com/w320/us.png",
    capital: "워싱턴 D.C.",
    language: "영어",
    currency: "달러",
    area: "약 983만 km²",
    areaComparison: "대한민국의 약 98배",
    population: "약 3억 3천만 명",
    populationComparison: "대한민국의 약 6.5배",
    greeting: "Hello",
    overview: "북아메리카의 큰 나라로 다양한 문화와 자연환경을 가지고 있습니다.",
    mapNote: "북아메리카 중부",
    clothing: "데님과 캐주얼",
    food: "햄버거",
    house: "단독 주택",
    color: "#b43b4a",
  },
  {
    name: "멕시코",
    continent: "northAmerica",
    flag: "🇲🇽",
    flagImage: "https://flagcdn.com/w320/mx.png",
    capital: "멕시코시티",
    language: "스페인어",
    currency: "멕시코 페소",
    area: "약 196만 km²",
    areaComparison: "대한민국의 약 20배",
    population: "약 1억 3천만 명",
    populationComparison: "대한민국의 약 2.5배",
    greeting: "Hola",
    overview: "고대 문명과 화려한 축제 문화가 살아 있는 나라입니다.",
    mapNote: "북아메리카 남부",
    clothing: "솜브레로와 전통 의상",
    food: "타코",
    house: "아도베 주택",
    color: "#288657",
  },
  {
    name: "브라질",
    continent: "southAmerica",
    flag: "🇧🇷",
    flagImage: "https://flagcdn.com/w320/br.png",
    capital: "브라질리아",
    language: "포르투갈어",
    currency: "브라질 헤알",
    area: "약 851만 km²",
    areaComparison: "대한민국의 약 85배",
    population: "약 2억 1천만 명",
    populationComparison: "대한민국의 약 4.1배",
    greeting: "Olá",
    overview: "아마존 열대우림과 축구, 카니발로 유명한 남미의 큰 나라입니다.",
    mapNote: "남아메리카 동부",
    clothing: "카니발 의상",
    food: "페이조아다",
    house: "열대 지역 주택",
    color: "#1e9b57",
  },
  {
    name: "호주",
    continent: "oceania",
    flag: "🇦🇺",
    flagImage: "https://flagcdn.com/w320/au.png",
    capital: "캔버라",
    language: "영어",
    currency: "호주 달러",
    area: "약 769만 km²",
    areaComparison: "대한민국의 약 77배",
    population: "약 2,600만 명",
    populationComparison: "대한민국의 약 0.5배",
    greeting: "G'day",
    overview: "오세아니아의 큰 섬 대륙 국가로 독특한 자연과 동물이 많습니다.",
    mapNote: "오세아니아 대륙",
    clothing: "부시웨어",
    food: "미트파이",
    house: "베란다가 있는 주택",
    color: "#1c8d8a",
  },
];

export function countryPath(name: string) {
  return encodeURIComponent(name);
}

export function isKoreaCountry(country: RepresentativeCountry) {
  return country.flagImage.includes("/kr.");
}

export function isWorkbookEligibleCountry(country: RepresentativeCountry) {
  return !isKoreaCountry(country);
}

export const workbookCountries = representativeCountries.filter(isWorkbookEligibleCountry);

export function findCountry(name: string) {
  return representativeCountries.find((country) => country.name === name);
}

export function isRepresentativeCountry(name: string) {
  return representativeCountries.some((country) => country.name === name);
}
