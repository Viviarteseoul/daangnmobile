export interface Phone {
  id: string;
  name: string;
  subName: string;
  brand: "Apple" | "Samsung";
  image: string;
  releasePrice: number; // 출고가
  carrierDiscounts: {
    skt: { gongsi: number; storeDiscount: number; defaultPlan: string; planPrice: number };
    kt: { gongsi: number; storeDiscount: number; defaultPlan: string; planPrice: number };
    lgu: { gongsi: number; storeDiscount: number; defaultPlan: string; planPrice: number };
  };
  tags: string[];
  colors: { name: string; hex: string }[];
  isHot?: boolean;
  isPreOrder?: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
}

export interface PlanOption {
  id: string;
  carrier: "SKT" | "KT" | "LGU+";
  name: string;
  data: string;
  voice: string;
  monthlyFee: number;
}

export const PHONES_DATA: Phone[] = [
  {
    id: "iphone-18-pro",
    name: "아이폰 18 Pro (사전예약)",
    subName: "128GB / A19 차세대 칩셋 탑재 • 단독 사은품",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=80",
    releasePrice: 1590000,
    carrierDiscounts: {
      skt: { gongsi: 500000, storeDiscount: 380000, defaultPlan: "5G 프라임 (월 8.9만)", planPrice: 89000 },
      kt: { gongsi: 510000, storeDiscount: 390000, defaultPlan: "스페셜 5G (월 9.0만)", planPrice: 90000 },
      lgu: { gongsi: 530000, storeDiscount: 420000, defaultPlan: "5G 프리미어 (월 8.5만)", planPrice: 85000 },
    },
    tags: ["🔥 1차 사전예약 접수중", "당근 단독 사은품", "100% 출시일 당일배송"],
    colors: [
      { name: "티타늄 코스믹", hex: "#3b3c40" },
      { name: "프로스트 실버", hex: "#e0e3e8" },
      { name: "엠버 골드", hex: "#d9b48f" },
    ],
    isHot: true,
    isPreOrder: true,
    stockCount: 50,
    rating: 5.0,
    reviewCount: 380,
  },
  {
    id: "galaxy-s24-ultra",
    name: "갤럭시 S24 울트라 5G",
    subName: "256GB / AI 온디바이스 탑재",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=80",
    releasePrice: 1698400,
    carrierDiscounts: {
      skt: { gongsi: 500000, storeDiscount: 350000, defaultPlan: "5G 프라임 (월 8.9만)", planPrice: 89000 },
      kt: { gongsi: 520000, storeDiscount: 360000, defaultPlan: "스페셜 5G (월 9.0만)", planPrice: 90000 },
      lgu: { gongsi: 550000, storeDiscount: 380000, defaultPlan: "5G 프리미어 (월 8.5만)", planPrice: 85000 },
    },
    tags: ["🔥 이번 주 1위", "당근 단독특가", "무료 당일 퀵"],
    colors: [
      { name: "티타늄 그레이", hex: "#787679" },
      { name: "티타늄 블랙", hex: "#2b2b2c" },
      { name: "티타늄 옐로우", hex: "#e5d8a8" },
    ],
    isHot: true,
    stockCount: 7,
    rating: 4.9,
    reviewCount: 142,
  },
  {
    id: "iphone-16-pro",
    name: "아이폰 16 Pro",
    subName: "128GB / A18 Pro 칩셋",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=80",
    releasePrice: 1550000,
    carrierDiscounts: {
      skt: { gongsi: 450000, storeDiscount: 320000, defaultPlan: "5G 프라임 (월 8.9만)", planPrice: 89000 },
      kt: { gongsi: 460000, storeDiscount: 330000, defaultPlan: "스페셜 5G (월 9.0만)", planPrice: 90000 },
      lgu: { gongsi: 480000, storeDiscount: 350000, defaultPlan: "5G 프리미어 (월 8.5만)", planPrice: 85000 },
    },
    tags: ["🍎 즉시 출고", "선택약정 추천", "수도권 당일퀵"],
    colors: [
      { name: "데저트 티타늄", hex: "#c3b091" },
      { name: "내추럴 티타늄", hex: "#9e9893" },
      { name: "화이트 티타늄", hex: "#f2f3f4" },
    ],
    isHot: true,
    stockCount: 4,
    rating: 4.95,
    reviewCount: 208,
  },
  {
    id: "galaxy-z-flip6",
    name: "갤럭시 Z 플립 6",
    subName: "256GB / 컴팩트 폴더블 AI",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop&q=80",
    releasePrice: 1485000,
    carrierDiscounts: {
      skt: { gongsi: 580000, storeDiscount: 400000, defaultPlan: "5G 프라임 (월 8.9만)", planPrice: 89000 },
      kt: { gongsi: 600000, storeDiscount: 420000, defaultPlan: "스페셜 5G (월 9.0만)", planPrice: 90000 },
      lgu: { gongsi: 620000, storeDiscount: 430000, defaultPlan: "5G 프리미어 (월 8.5만)", planPrice: 85000 },
    },
    tags: ["✨ 번호이동 특가", "최대 지원금", "한정수량"],
    colors: [
      { name: "실버 섀도우", hex: "#c0c0c0" },
      { name: "옐로우", hex: "#fced72" },
      { name: "블루", hex: "#87ceeb" },
    ],
    isHot: true,
    stockCount: 5,
    rating: 4.85,
    reviewCount: 96,
  },
  {
    id: "galaxy-a15",
    name: "갤럭시 A15 LTE",
    subName: "128GB / 효도폰·학생폰 최강",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80",
    releasePrice: 319000,
    carrierDiscounts: {
      skt: { gongsi: 250000, storeDiscount: 69000, defaultPlan: "LTE 안심 33 (월 3.3만)", planPrice: 33000 },
      kt: { gongsi: 260000, storeDiscount: 59000, defaultPlan: "LTE 베이직 (월 3.3만)", planPrice: 33000 },
      lgu: { gongsi: 280000, storeDiscount: 39000, defaultPlan: "LTE 데이터33 (월 3.3만)", planPrice: 33000 },
    },
    tags: ["🎁 기기값 0원", "어르신/키즈 추천", "부담 없는 유지비"],
    colors: [
      { name: "블루 블랙", hex: "#1a1f2c" },
      { name: "라이트 블루", hex: "#add8e6" },
    ],
    isHot: false,
    stockCount: 15,
    rating: 4.7,
    reviewCount: 64,
  },
];

export const PLANS_DATA: PlanOption[] = [
  { id: "skt-1", carrier: "SKT", name: "5GX 프라임플러스", data: "무제한", voice: "집/이동전화 무제한", monthlyFee: 99000 },
  { id: "skt-2", carrier: "SKT", name: "5GX 프라임", data: "무제한", voice: "집/이동전화 무제한", monthlyFee: 89000 },
  { id: "skt-3", carrier: "SKT", name: "5GX 레귤러", data: "110GB (소진 시 5Mbps)", voice: "집/이동전화 무제한", monthlyFee: 69000 },
  { id: "skt-4", carrier: "SKT", name: "베이직플러스", data: "24GB (소진 시 1Mbps)", voice: "집/이동전화 무제한", monthlyFee: 59000 },
  
  { id: "kt-1", carrier: "KT", name: "초이스 스페셜", data: "무제한", voice: "완전무제한", monthlyFee: 110000 },
  { id: "kt-2", carrier: "KT", name: "5G 스페셜", data: "무제한", voice: "완전무제한", monthlyFee: 90000 },
  { id: "kt-3", carrier: "KT", name: "5G 심플", data: "110GB", voice: "완전무제한", monthlyFee: 69000 },
  { id: "kt-4", carrier: "KT", name: "5G 슬림 14GB", data: "14GB", voice: "완전무제한", monthlyFee: 55000 },

  { id: "lgu-1", carrier: "LGU+", name: "5G 시그니처", data: "무제한", voice: "기본제공", monthlyFee: 130000 },
  { id: "lgu-2", carrier: "LGU+", name: "5G 프리미어 에센셜", data: "무제한", voice: "기본제공", monthlyFee: 85000 },
  { id: "lgu-3", carrier: "LGU+", name: "5G 스탠다드", data: "150GB", voice: "기본제공", monthlyFee: 75000 },
  { id: "lgu-4", carrier: "LGU+", name: "5G 라이트+ 12GB", data: "12GB", voice: "기본제공", monthlyFee: 55000 },
];
