export interface ApplicationSubmission {
  id: string;
  applicantName: string;
  phone: string;
  birthDate: string;
  carrier: "SKT" | "KT" | "LGU+";
  joinType: "번호이동" | "기기변경" | "신규가입";
  phoneModel: string;
  phoneColor: string;
  planName: string;
  planFee: number;
  discountType: "공시지원금" | "선택약정(25%)";
  estimatedMonthly: number;
  address: string;
  shippingType: "당일 안심 퀵 (수도권)" | "우체국 무료택배" | "매장 직접수령";
  memo?: string;
  status: "접수완료" | "전산심사중" | "개통승인" | "발송준비" | "배송중" | "개통완료";
  submittedAt: string;
  verificationPassed: boolean;
}
