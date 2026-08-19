"use client";

import React, { useState, useEffect } from "react";
import { Phone } from "@/data/phones";
import { ApplicationSubmission } from "@/types/application";
import {
  IconXmarkLine,
  IconCheckmarkBadgeFill,
  IconCheckmarkShieldFill,
  IconCheckmarkCircleFill,
  IconArrowLeftLine,
  IconArrowRightLine,
  IconSparkle2Fill,
  IconClockFill,
  IconPaperclipLine,
} from "@karrotmarket/react-monochrome-icon";

interface KarrotApplyModalProps {
  phone: Phone | null;
  isOpen: boolean;
  onClose: () => void;
  initialCarrier?: "SKT" | "KT" | "LGU+";
  initialDiscountType?: "공시지원금" | "선택약정(25%)";
  initialPlanName?: string;
  initialMonthly?: number;
  onSaveApplication: (app: ApplicationSubmission) => void;
}

export const KarrotApplyModal: React.FC<KarrotApplyModalProps> = ({
  phone,
  isOpen,
  onClose,
  initialCarrier = "SKT",
  initialDiscountType = "공시지원금",
  initialPlanName = "5GX 프라임",
  initialMonthly = 89000,
  onSaveApplication,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [applicantName, setApplicantName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [carrier, setCarrier] = useState<"SKT" | "KT" | "LGU+">(initialCarrier);
  const [joinType, setJoinType] = useState<"번호이동" | "기기변경" | "신규가입">("번호이동");
  const [selectedColor, setSelectedColor] = useState(phone?.colors[0]?.name || "기본");
  const [discountType, setDiscountType] = useState<"공시지원금" | "선택약정(25%)">(initialDiscountType);
  const [planName, setPlanName] = useState(initialPlanName);
  const [estimatedMonthly, setEstimatedMonthly] = useState(initialMonthly);

  // Shipping
  const [shippingType, setShippingType] = useState<"당일 안심 퀵 (수도권)" | "우체국 무료택배" | "매장 직접수령">(
    "당일 안심 퀵 (수도권)"
  );
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [memo, setMemo] = useState("");

  // Verification
  const [authMethod, setAuthMethod] = useState<"PASS" | "SMS">("PASS");
  const [authSent, setAuthSent] = useState(false);
  const [authTimer, setAuthTimer] = useState(180);
  const [authCode, setAuthCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [agreeAll, setAgreeAll] = useState(true);

  const [completedApp, setCompletedApp] = useState<ApplicationSubmission | null>(null);

  useEffect(() => {
    if (isOpen && phone) {
      setCarrier(initialCarrier);
      setDiscountType(initialDiscountType);
      setPlanName(initialPlanName);
      setEstimatedMonthly(initialMonthly);
      setSelectedColor(phone.colors[0]?.name || "기본");
      setStep(1);
      setAuthSent(false);
      setIsVerified(false);
      setAuthCode("");
    }
  }, [isOpen, phone, initialCarrier, initialDiscountType, initialPlanName, initialMonthly]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (authSent && authTimer > 0 && !isVerified) {
      timer = setInterval(() => setAuthTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [authSent, authTimer, isVerified]);

  if (!isOpen || !phone) return null;

  const handleSendAuth = () => {
    if (!applicantName || !userPhone || !birthDate) {
      alert("성함, 연락처, 생년월일을 모두 입력해 주세요.");
      return;
    }
    setAuthSent(true);
    setAuthTimer(180);
  };

  const handleVerifyCode = () => {
    if (authCode === "8920" || authCode.length === 4 || authMethod === "PASS") {
      setIsVerified(true);
    } else {
      alert("인증번호가 일치하지 않습니다. (테스트용 간편인증: 8920)");
    }
  };

  const handleSubmitFinal = () => {
    if (!address) {
      alert("배송지 주소를 입력해 주세요.");
      return;
    }

    const newApp: ApplicationSubmission = {
      id: `DG-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`,
      applicantName,
      phone: userPhone,
      birthDate,
      carrier,
      joinType,
      phoneModel: phone.name,
      phoneColor: selectedColor,
      planName,
      planFee: estimatedMonthly,
      discountType,
      estimatedMonthly,
      address: `${address} ${detailAddress}`.trim(),
      shippingType,
      memo,
      status: "접수완료",
      submittedAt: new Date().toLocaleString("ko-KR"),
      verificationPassed: true,
    };

    setCompletedApp(newApp);
    onSaveApplication(newApp);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-scaleUp">
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#F2F3F6] flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-1.5">
            <span className="text-base">🥕</span>
            <span className="text-sm font-bold text-[#212124]">비대면 3분 간편 개통 신청</span>
          </div>
          <button onClick={onClose} className="p-1 text-[#868B94] hover:text-[#212124] rounded-full">
            <span className="w-5 h-5 inline-flex items-center justify-center">
              <IconXmarkLine />
            </span>
          </button>
        </div>

        {/* Step Progress Bar */}
        {step < 4 && (
          <div className="px-4 py-2.5 bg-[#FFF2E8]/60 border-b border-[#FFE0CC] shrink-0">
            <div className="flex items-center justify-between text-[11px] font-black text-[#868B94]">
              <span className={step >= 1 ? "text-[#FF6F0F]" : ""}>1. 본인인증 {step > 1 && "✓"}</span>
              <span className={step >= 2 ? "text-[#FF6F0F]" : ""}>2. 기기/조건 {step > 2 && "✓"}</span>
              <span className={step >= 3 ? "text-[#FF6F0F]" : ""}>3. 배송지 {step > 3 && "✓"}</span>
            </div>
            <div className="w-full bg-[#FFD3B3] h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-[#FF6F0F] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* STEP 1: 본인인증 */}
          {step === 1 && (
            <div className="space-y-3.5">
              <div className="p-3 bg-[#F8F9FA] rounded-2xl border border-[#EAEBEE] flex items-start gap-2.5 text-xs text-[#4D5159]">
                <span className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 inline-flex items-center">
                  <IconCheckmarkShieldFill />
                </span>
                <div>
                  <span className="font-bold text-[#212124]">통신사 명의도용 방지 실명확인: </span>
                  개통 전산 심사를 위해 신청자 본인의 PASS 또는 휴대폰 문자 인증이 필수적으로 진행됩니다.
                </div>
              </div>

              {/* Auth Method Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAuthMethod("PASS")}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    authMethod === "PASS"
                      ? "border-[#FF6F0F] bg-[#FFF2E8] text-[#FF6F0F]"
                      : "border-[#EAEBEE] text-[#4D5159]"
                  }`}
                >
                  PASS 앱 간편인증
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod("SMS")}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    authMethod === "SMS"
                      ? "border-[#FF6F0F] bg-[#FFF2E8] text-[#FF6F0F]"
                      : "border-[#EAEBEE] text-[#4D5159]"
                  }`}
                >
                  휴대폰 SMS 인증
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="font-bold text-[#212124]">신청자 성명</label>
                  <input
                    type="text"
                    placeholder="홍길동"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-[#F8F9FA] border border-[#EAEBEE] rounded-xl font-medium focus:ring-2 focus:ring-[#FF6F0F] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-[#212124]">생년월일 (6자리)</label>
                    <input
                      type="text"
                      placeholder="900101"
                      maxLength={6}
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-[#F8F9FA] border border-[#EAEBEE] rounded-xl font-medium focus:ring-2 focus:ring-[#FF6F0F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#212124]">휴대폰 번호</label>
                    <input
                      type="text"
                      placeholder="01012345678"
                      maxLength={11}
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-[#F8F9FA] border border-[#EAEBEE] rounded-xl font-medium focus:ring-2 focus:ring-[#FF6F0F] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Auth Trigger */}
                {!isVerified ? (
                  !authSent ? (
                    <button
                      type="button"
                      onClick={handleSendAuth}
                      className="w-full py-2.5 bg-[#212124] hover:bg-black text-white font-bold rounded-xl text-xs transition-colors"
                    >
                      {authMethod === "PASS" ? "PASS 인증 요청" : "SMS 인증번호 발송"}
                    </button>
                  ) : (
                    <div className="p-3 bg-[#F8F9FA] border border-[#EAEBEE] rounded-2xl space-y-2">
                      <div className="flex justify-between text-[11px] text-[#868B94]">
                        <span>인증번호 4자리를 입력해주세요.</span>
                        <span className="text-[#FF6F0F] font-bold font-mono">
                          {Math.floor(authTimer / 60)}:{authTimer % 60 < 10 ? `0${authTimer % 60}` : authTimer % 60}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="인증번호 4자리 (8920)"
                          value={authCode}
                          onChange={(e) => setAuthCode(e.target.value)}
                          className="flex-1 px-3 py-2 bg-white border border-[#EAEBEE] rounded-xl text-xs"
                        />
                        <button
                          type="button"
                          onClick={handleVerifyCode}
                          className="px-4 py-2 bg-[#FF6F0F] text-white text-xs font-bold rounded-xl"
                        >
                          확인
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthCode("8920");
                          setIsVerified(true);
                        }}
                        className="text-[11px] text-[#868B94] hover:underline"
                      >
                        ⚡️ 테스트용 원클릭 인증완료 (클릭)
                      </button>
                    </div>
                  )
                ) : (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between text-xs text-green-800 font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-4 h-4 text-green-600 inline-flex items-center">
                        <IconCheckmarkCircleFill />
                      </span>
                      본인인증 완료 ({applicantName} / {userPhone})
                    </span>
                    <span className="text-[11px] text-green-600 font-normal">통과</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: 기기 및 요금 확인 */}
          {step === 2 && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#F8F9FA] rounded-2xl border border-[#EAEBEE] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#868B94]">선택 모델</div>
                  <div className="font-bold text-[#212124] text-sm">{phone.name}</div>
                  <div className="text-[#868B94]">{phone.subName}</div>
                </div>
                <span className="px-2 py-0.5 bg-[#FFF2E8] text-[#FF6F0F] font-bold rounded-md">
                  {carrier} {joinType}
                </span>
              </div>

              <div>
                <label className="font-bold text-[#212124]">단말기 색상</label>
                <div className="grid grid-cols-3 gap-1.5 mt-1">
                  {phone.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`p-2 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                        selectedColor === c.name
                          ? "border-[#FF6F0F] bg-[#FFF2E8] text-[#FF6F0F]"
                          : "border-[#EAEBEE] text-[#868B94]"
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="truncate">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-[#212124]">통신사</label>
                  <select
                    value={carrier}
                    onChange={(e) => setCarrier(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 bg-[#F8F9FA] border border-[#EAEBEE] rounded-xl font-semibold text-[#212124]"
                  >
                    <option value="SKT">SKT</option>
                    <option value="KT">KT</option>
                    <option value="LGU+">LG U+</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#212124]">가입 유형</label>
                  <select
                    value={joinType}
                    onChange={(e) => setJoinType(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 bg-[#F8F9FA] border border-[#EAEBEE] rounded-xl font-semibold text-[#212124]"
                  >
                    <option value="번호이동">번호이동</option>
                    <option value="기기변경">기기변경</option>
                    <option value="신규가입">신규가입</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-[#FFF2E8]/40 border border-[#FFE0CC] rounded-2xl space-y-1.5">
                <div className="flex justify-between text-[#868B94]">
                  <span>할인 방식</span>
                  <span className="font-bold text-[#212124]">{discountType}</span>
                </div>
                <div className="flex justify-between text-[#868B94]">
                  <span>선택 요금제</span>
                  <span className="font-bold text-[#212124]">{planName}</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-[#FFE0CC] font-black text-sm text-[#212124]">
                  <span>월 청구 예상액</span>
                  <span className="text-[#FF6F0F] text-base">{estimatedMonthly.toLocaleString()}원/월</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: 배송지 입력 */}
          {step === 3 && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#212124]">수령 방식</label>
                <div className="grid grid-cols-3 gap-1.5 mt-1">
                  {(["당일 안심 퀵 (수도권)", "우체국 무료택배", "매장 직접수령"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setShippingType(s)}
                      className={`p-2 rounded-xl border text-[11px] font-bold text-center transition-all ${
                        shippingType === s
                          ? "border-[#FF6F0F] bg-[#FFF2E8] text-[#FF6F0F]"
                          : "border-[#EAEBEE] text-[#868B94]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-[#212124]">배송지 주소</label>
                <input
                  type="text"
                  placeholder="예: 서울특별시 강남구 테헤란로 142"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-[#F8F9FA] border border-[#EAEBEE] rounded-xl font-medium focus:ring-2 focus:ring-[#FF6F0F] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#212124]">상세 주소 (동/호수)</label>
                <input
                  type="text"
                  placeholder="예: 8층 801호"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-[#F8F9FA] border border-[#EAEBEE] rounded-xl font-medium focus:ring-2 focus:ring-[#FF6F0F] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#212124]">배송/개통 요청사항 (선택)</label>
                <input
                  type="text"
                  placeholder="예: 부재 시 문 앞 보관 / 유심 미개통 상태로 동봉 요청"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-[#F8F9FA] border border-[#EAEBEE] rounded-xl font-medium focus:ring-2 focus:ring-[#FF6F0F] focus:outline-none"
                />
              </div>

              <div className="p-3 bg-[#F8F9FA] rounded-2xl border border-[#EAEBEE] space-y-1.5">
                <label className="flex items-center gap-2 font-bold text-[#212124] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeAll}
                    onChange={(e) => setAgreeAll(e.target.checked)}
                    className="w-4 h-4 accent-[#FF6F0F] rounded"
                  />
                  <span>[필수] 온라인 이동통신 가입 및 개통 위임 전체 동의</span>
                </label>
                <p className="text-[10px] text-[#868B94] pl-6 leading-relaxed">
                  본 신청은 통신 3사 개통 전산 심사를 위한 사전 접수이며, 개통 승인 전 전문 상담원이 카카오 알림톡을 통해
                  최종 안내를 드립니다.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: 완료증 */}
          {step === 4 && completedApp && (
            <div className="space-y-4 text-center py-3">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <span className="w-8 h-8 inline-flex items-center justify-center">
                  <IconCheckmarkCircleFill />
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-green-600">3사 개통 전산 사전접수 완료</div>
                <h3 className="text-lg font-black text-[#212124] mt-0.5">가입 신청이 접수되었습니다!</h3>
                <p className="text-xs text-[#868B94] mt-1">
                  안심 퀵/택배 출고 및 전산 심사가 시작됩니다.
                </p>
              </div>

              <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-[#EAEBEE] text-left text-xs space-y-2">
                <div className="flex justify-between pb-2 border-b border-[#EAEBEE]">
                  <span className="text-[#868B94]">접수 번호</span>
                  <span className="font-mono font-bold text-blue-600">{completedApp.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#868B94]">신청자</span>
                  <span className="font-bold text-[#212124]">{completedApp.applicantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#868B94]">모델 / 색상</span>
                  <span className="font-bold text-[#212124]">
                    {completedApp.phoneModel} ({completedApp.phoneColor})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#868B94]">월 예상 청구액</span>
                  <span className="font-black text-[#FF6F0F]">
                    {completedApp.estimatedMonthly.toLocaleString()}원/월
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-3.5 bg-white border-t border-[#F2F3F6] flex items-center justify-between shrink-0">
          {step === 1 && (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-[#868B94] text-xs font-bold"
              >
                취소
              </button>
              <button
                type="button"
                disabled={!isVerified}
                onClick={() => setStep(2)}
                className={`px-6 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isVerified
                    ? "bg-[#FF6F0F] text-white shadow-md"
                    : "bg-[#EAEBEE] text-[#868B94] cursor-not-allowed"
                }`}
              >
                다음 (기기 확인)
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-[#868B94] text-xs font-bold"
              >
                이전
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-[#FF6F0F] text-white text-xs font-bold rounded-2xl shadow-md"
              >
                다음 (배송지 입력)
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 text-[#868B94] text-xs font-bold"
              >
                이전
              </button>
              <button
                type="button"
                disabled={!agreeAll}
                onClick={handleSubmitFinal}
                className="px-7 py-2.5 bg-[#FF6F0F] text-white text-xs font-black rounded-2xl shadow-md"
              >
                가입 신청서 접수 완료
              </button>
            </>
          )}

          {step === 4 && (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-[#212124] text-white text-xs font-bold rounded-2xl shadow-xs"
            >
              확인 및 닫기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
