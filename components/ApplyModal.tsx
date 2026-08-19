"use client";

import React, { useState, useEffect } from "react";
import { Phone } from "@/data/phones";
import { ApplicationSubmission } from "@/types/application";
import {
  CheckCircle,
  ShieldCheck,
  Smartphone,
  Truck,
  UserCheck,
  X,
  Clock,
  ArrowRight,
  ArrowLeft,
  FileText,
  AlertCircle,
  Copy,
} from "lucide-react";

interface ApplyModalProps {
  phone: Phone | null;
  isOpen: boolean;
  onClose: () => void;
  initialCarrier?: "SKT" | "KT" | "LGU+";
  initialDiscountType?: "공시지원금" | "선택약정(25%)";
  initialPlanName?: string;
  initialMonthly?: number;
  onSaveApplication: (app: ApplicationSubmission) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
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

  // Verification state
  const [authMethod, setAuthMethod] = useState<"PASS" | "SMS">("PASS");
  const [authSent, setAuthSent] = useState(false);
  const [authTimer, setAuthTimer] = useState(180);
  const [authCode, setAuthCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Agreements
  const [agreeAll, setAgreeAll] = useState(true);

  // Completed Application Result
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

  // Auth Timer
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
      alert("성함, 연락처, 생년월일을 먼저 입력해 주세요.");
      return;
    }
    setAuthSent(true);
    setAuthTimer(180);
    // simulate SMS/PASS push
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#FF6F0F] text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-semibold text-orange-100">비대면 3분 온라인 간편 신청</div>
              <h3 className="text-base sm:text-lg font-bold">{phone.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator */}
        {step < 4 && (
          <div className="bg-orange-50/70 border-b border-orange-100 px-6 py-3 shrink-0">
            <div className="flex items-center justify-between text-xs font-bold text-gray-500">
              <span className={step >= 1 ? "text-[#FF6F0F] flex items-center gap-1" : ""}>
                1. 본인인증 {step > 1 && "✓"}
              </span>
              <span className={step >= 2 ? "text-[#FF6F0F] flex items-center gap-1" : ""}>
                2. 기기/요금 확인 {step > 2 && "✓"}
              </span>
              <span className={step >= 3 ? "text-[#FF6F0F] flex items-center gap-1" : ""}>
                3. 배송지 & 접수 {step > 3 && "✓"}
              </span>
            </div>
            <div className="w-full bg-orange-200/50 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#FF6F0F] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* STEP 1: 본인인증 */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-2.5 text-xs text-blue-900">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">통신판매 명의도용 방지 본인인증: </span>
                  이통 3사 개통 전산 심사를 위해 신청자 본인의 실명 확인 및 PASS/SMS 인증이 필수적으로 진행됩니다.
                </div>
              </div>

              {/* Auth Method Selector */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAuthMethod("PASS")}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                    authMethod === "PASS"
                      ? "border-[#FF6F0F] bg-orange-50/50 text-[#FF6F0F]"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <UserCheck className="w-4 h-4" /> PASS 앱 간편인증
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod("SMS")}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                    authMethod === "SMS"
                      ? "border-[#FF6F0F] bg-orange-50/50 text-[#FF6F0F]"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Smartphone className="w-4 h-4" /> 휴대폰 문자(SMS) 인증
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <label className="text-xs font-bold text-gray-700">신청자 성명</label>
                  <input
                    type="text"
                    placeholder="홍길동"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF6F0F] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700">생년월일 (6자리)</label>
                    <input
                      type="text"
                      placeholder="900101"
                      maxLength={6}
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full mt-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF6F0F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700">휴대폰 번호</label>
                    <input
                      type="text"
                      placeholder="01012345678"
                      maxLength={11}
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full mt-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF6F0F] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Send Auth Button */}
                {!isVerified && (
                  <div>
                    {!authSent ? (
                      <button
                        type="button"
                        onClick={handleSendAuth}
                        className="w-full py-2.5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-xs transition-colors"
                      >
                        {authMethod === "PASS" ? "PASS 인증 요청" : "SMS 인증번호 전송"}
                      </button>
                    ) : (
                      <div className="space-y-2 p-3 bg-gray-50 border border-gray-200 rounded-2xl">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">
                            {authMethod === "PASS"
                              ? "스마트폰 PASS 앱에서 인증을 승인해주세요."
                              : "문자로 발송된 4자리 번호를 입력하세요."}
                          </span>
                          <span className="text-red-500 font-mono font-bold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {Math.floor(authTimer / 60)}:
                            {authTimer % 60 < 10 ? `0${authTimer % 60}` : authTimer % 60}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="인증번호 4자리 (8920)"
                            value={authCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                            className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm"
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
                          className="text-[11px] text-gray-500 hover:underline"
                        >
                          ⚡️ 테스트용 원클릭 인증완료 (클릭)
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Verified Success Stamp */}
                {isVerified && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between text-xs text-green-800 font-bold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      본인인증 완료 ({applicantName} / {userPhone})
                    </span>
                    <span className="text-green-600 font-normal">안심인증 통과</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: 기기 및 요금 확인 */}
          {step === 2 && (
            <div className="space-y-4 text-sm">
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">선택 단말기</div>
                  <div className="font-bold text-gray-900">{phone.name}</div>
                  <div className="text-xs text-gray-600">{phone.subName}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs px-2 py-0.5 bg-orange-100 text-[#FF6F0F] font-bold rounded-full">
                    {carrier} {joinType}
                  </span>
                </div>
              </div>

              {/* Color Choice */}
              <div>
                <label className="text-xs font-bold text-gray-700">단말기 색상 선택</label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {phone.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        selectedColor === c.name
                          ? "border-[#FF6F0F] bg-orange-50/40 text-gray-900"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="truncate">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Carrier & Join Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700">통신사</label>
                  <select
                    value={carrier}
                    onChange={(e) => setCarrier(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="SKT">SKT (SK텔레콤)</option>
                    <option value="KT">KT (케이티)</option>
                    <option value="LGU+">LG U+ (엘지유플러스)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">가입 유형</label>
                  <select
                    value={joinType}
                    onChange={(e) => setJoinType(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="번호이동">번호이동 (쓰던 번호 그대로 통신사 변경)</option>
                    <option value="기기변경">기기변경 (현재 통신사 유지)</option>
                    <option value="신규가입">신규가입 (새 번호 발급)</option>
                  </select>
                </div>
              </div>

              {/* Discount & Plan Summary */}
              <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-200 space-y-2 text-xs">
                <div className="flex justify-between text-gray-700">
                  <span>할인 유형</span>
                  <span className="font-bold text-gray-900">{discountType}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>선택 요금제</span>
                  <span className="font-bold text-gray-900">{planName}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-orange-200 font-extrabold text-sm text-gray-900">
                  <span>월 예상 청구금액</span>
                  <span className="text-[#FF6F0F] text-base">{estimatedMonthly.toLocaleString()}원/월</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: 배송지 & 최종 접수 */}
          {step === 3 && (
            <div className="space-y-4 text-sm">
              <div>
                <label className="text-xs font-bold text-gray-700">수령 방식 선택</label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {(["당일 안심 퀵 (수도권)", "우체국 무료택배", "매장 직접수령"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setShippingType(s)}
                      className={`p-2.5 rounded-xl border text-[11px] font-bold text-center transition-all ${
                        shippingType === s
                          ? "border-[#FF6F0F] bg-orange-50/50 text-[#FF6F0F]"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700">배송지 기본 주소</label>
                <input
                  type="text"
                  placeholder="예: 서울특별시 강남구 테헤란로 142"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700">상세 주소 및 동/호수</label>
                <input
                  type="text"
                  placeholder="예: 8층 당근모바일 안심수령처"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700">배송 및 개통 요청사항 (선택)</label>
                <input
                  type="text"
                  placeholder="예: 배송 전 연락 부탁드립니다 / 유심 미개통 상태로 동봉 요청"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>

              {/* Agreements */}
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 text-xs">
                <label className="flex items-center gap-2 font-bold text-gray-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeAll}
                    onChange={(e) => setAgreeAll(e.target.checked)}
                    className="w-4 h-4 accent-[#FF6F0F] rounded"
                  />
                  <span>[필수] 온라인 이동통신 가입 신청 및 위임 약관 전체 동의</span>
                </label>
                <p className="text-[11px] text-gray-500 pl-6 leading-relaxed">
                  본 신청서는 통신사 개통 전산 접속을 위한 사전 접수용이며, 정식 개통 승인 전 전문 상담원이 해피콜 또는
                  카카오 알림톡을 통해 최종 안내를 드립니다.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: 신청 완료증 */}
          {step === 4 && completedApp && (
            <div className="space-y-5 text-center py-2">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-scaleUp">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <div className="text-xs font-bold text-green-600">이통 3사 전산 사전접수 완료</div>
                <h3 className="text-xl font-extrabold text-gray-900 mt-1">온라인 가입 신청이 접수되었습니다!</h3>
                <p className="text-xs text-gray-500 mt-1.5">
                  안심 배송 및 개통 심사가 시작되며, 잠시 후 담당자가 알림톡을 전송합니다.
                </p>
              </div>

              {/* Receipt Card */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-left text-xs space-y-2.5">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-500 font-medium">접수 번호</span>
                  <span className="font-mono font-bold text-blue-600 flex items-center gap-1">
                    {completedApp.id}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(completedApp.id);
                        alert("접수번호가 복사되었습니다!");
                      }}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">신청자명</span>
                  <span className="font-bold text-gray-800">{completedApp.applicantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">기종 / 색상</span>
                  <span className="font-bold text-gray-800">
                    {completedApp.phoneModel} ({completedApp.phoneColor})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">통신사 / 유형</span>
                  <span className="font-bold text-gray-800">
                    {completedApp.carrier} / {completedApp.joinType} ({completedApp.discountType})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">월 예상 납부액</span>
                  <span className="font-extrabold text-[#FF6F0F]">
                    {completedApp.estimatedMonthly.toLocaleString()}원/월
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">수령 방식</span>
                  <span className="text-gray-800">{completedApp.shippingType}</span>
                </div>
              </div>

              {/* Guarantee Notice */}
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-left text-xs text-blue-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">SGI 서울보증보험 안심 거래: </span>
                  단말기 수령 전까지 결제 대금과 개통 상태가 안전하게 보호되며, 미개통 시 즉시 취소 처리됩니다.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="bg-gray-50 px-5 sm:px-6 py-4 border-t border-gray-100 flex items-center justify-between shrink-0">
          {step === 1 && (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-gray-600 hover:text-gray-900 text-xs font-bold"
              >
                취소
              </button>
              <button
                type="button"
                disabled={!isVerified}
                onClick={() => setStep(2)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  isVerified
                    ? "bg-[#FF6F0F] hover:bg-[#e85b06] text-white shadow-md"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                다음 단계 (기기 확인) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-gray-600 hover:text-gray-900 text-xs font-bold flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> 이전
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-[#FF6F0F] hover:bg-[#e85b06] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
              >
                다음 단계 (배송지 입력) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 text-gray-600 hover:text-gray-900 text-xs font-bold flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> 이전
              </button>
              <button
                type="button"
                disabled={!agreeAll}
                onClick={handleSubmitFinal}
                className="px-7 py-2.5 bg-[#FF6F0F] hover:bg-[#e85b06] text-white text-xs font-bold rounded-xl shadow-md"
              >
                가입 신청서 접수하기 (완료)
              </button>
            </>
          )}

          {step === 4 && (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-xs"
            >
              확인 및 메인으로 이동
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
