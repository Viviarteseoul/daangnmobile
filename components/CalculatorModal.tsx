"use client";

import React, { useState } from "react";
import { Phone, PLANS_DATA } from "@/data/phones";
import { Calculator, X, Sparkles, Check, ArrowRight, ShieldAlert, Zap } from "lucide-react";

interface CalculatorModalProps {
  phone: Phone | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (phone: Phone, carrier: "SKT" | "KT" | "LGU+", discountType: "공시지원금" | "선택약정(25%)", planName: string, estimatedMonthly: number) => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({
  phone,
  isOpen,
  onClose,
  onApply,
}) => {
  const [carrier, setCarrier] = useState<"SKT" | "KT" | "LGU+">("SKT");
  const [joinType, setJoinType] = useState<"번호이동" | "기기변경" | "신규가입">("번호이동");
  const [installmentMonths, setInstallmentMonths] = useState<24 | 36>(24);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("skt-2");

  if (!isOpen || !phone) return null;

  // Filter plans for chosen carrier
  const carrierPlans = PLANS_DATA.filter((p) => p.carrier === carrier);
  const currentPlan = carrierPlans.find((p) => p.id === selectedPlanId) || carrierPlans[0] || PLANS_DATA[0];

  // Carrier discount data
  const discountKey = carrier.toLowerCase() as "skt" | "kt" | "lgu";
  const carrierData = phone.carrierDiscounts[discountKey] || phone.carrierDiscounts.skt;

  // 1. 공시지원금 계산
  const gongsiSupport = carrierData.gongsi;
  const storeExtraDiscount = carrierData.storeDiscount;
  const gongsiPrincipal = Math.max(0, phone.releasePrice - gongsiSupport - storeExtraDiscount);
  const monthlyDeviceGongsi = Math.round(gongsiPrincipal / installmentMonths);
  const monthlyPlanGongsi = currentPlan.monthlyFee;
  const totalMonthlyGongsi = monthlyDeviceGongsi + monthlyPlanGongsi;
  const total24MonthsGongsi = (totalMonthlyGongsi * 24);

  // 2. 선택약정 (25% 요금할인) 계산
  const seonYakPlanDiscount = Math.round(currentPlan.monthlyFee * 0.25);
  const seonYakDeviceDiscount = Math.round(storeExtraDiscount * 0.7); // 선약 시 당근 지원금
  const seonYakPrincipal = Math.max(0, phone.releasePrice - seonYakDeviceDiscount);
  const monthlyDeviceSeonYak = Math.round(seonYakPrincipal / installmentMonths);
  const monthlyPlanSeonYak = currentPlan.monthlyFee - seonYakPlanDiscount;
  const totalMonthlySeonYak = monthlyDeviceSeonYak + monthlyPlanSeonYak;
  const total24MonthsSeonYak = (totalMonthlySeonYak * 24);

  // Best recommendation
  const isGongsiBetter = total24MonthsGongsi < total24MonthsSeonYak;
  const difference24 = Math.abs(total24MonthsGongsi - total24MonthsSeonYak);

  const handleCarrierChange = (newCarrier: "SKT" | "KT" | "LGU+") => {
    setCarrier(newCarrier);
    const newPlans = PLANS_DATA.filter((p) => p.carrier === newCarrier);
    if (newPlans.length > 0) {
      setSelectedPlanId(newPlans[1]?.id || newPlans[0].id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#FF6F0F] text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-semibold text-orange-100">당근모바일 실시간 요금 견적기</div>
              <h3 className="text-base sm:text-lg font-bold">{phone.name} 견적 비교</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Top Info Banner */}
          <div className="flex items-center justify-between p-3.5 bg-orange-50/70 rounded-2xl border border-orange-200 text-sm">
            <div className="flex items-center gap-3">
              <img
                src={phone.image}
                alt={phone.name}
                className="w-12 h-12 object-cover rounded-xl border border-orange-100"
              />
              <div>
                <div className="font-bold text-gray-900">{phone.name}</div>
                <div className="text-xs text-gray-500">{phone.subName}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">출고가</div>
              <div className="font-extrabold text-gray-900">{phone.releasePrice.toLocaleString()}원</div>
            </div>
          </div>

          {/* Option Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            {/* 1. 통신사 선택 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600">1. 통신사 선택</label>
              <div className="grid grid-cols-3 gap-1.5 bg-gray-100 p-1 rounded-xl">
                {(["SKT", "KT", "LGU+"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCarrierChange(c)}
                    className={`py-2 text-xs font-bold rounded-lg transition-all ${
                      carrier === c
                        ? "bg-white text-gray-900 shadow-xs"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. 가입 유형 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600">2. 가입 유형</label>
              <div className="grid grid-cols-3 gap-1.5 bg-gray-100 p-1 rounded-xl">
                {(["번호이동", "기기변경", "신규가입"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setJoinType(t)}
                    className={`py-2 text-xs font-bold rounded-lg transition-all ${
                      joinType === t
                        ? "bg-white text-gray-900 shadow-xs"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. 할부 개월 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600">3. 할부 개월</label>
              <div className="grid grid-cols-2 gap-1.5 bg-gray-100 p-1 rounded-xl">
                {([24, 36] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setInstallmentMonths(m)}
                    className={`py-2 text-xs font-bold rounded-lg transition-all ${
                      installmentMonths === m
                        ? "bg-white text-gray-900 shadow-xs"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {m}개월
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Plan Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-700">4. 통신 요금제 선택 ({carrier})</label>
              <span className="text-xs text-[#FF6F0F] font-semibold">6개월 후 자유롭게 요금제 하향 가능</span>
            </div>
            <select
              value={selectedPlanId}
              onChange={(e) => setSelectedPlanId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#FF6F0F] focus:outline-none"
            >
              {carrierPlans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} | 데이터: {p.data} | 월 {p.monthlyFee.toLocaleString()}원
                </option>
              ))}
            </select>
          </div>

          {/* AI Recommendation Alert */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs sm:text-sm text-emerald-950">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-emerald-500 text-white rounded-lg shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold">당근 AI 최적 혜택 분석: </span>
                <span className="font-extrabold text-emerald-700">
                  {isGongsiBetter ? "공시지원금" : "선택약정(25% 할인)"}
                </span>
                이 24개월간 총{" "}
                <span className="font-bold underline">{difference24.toLocaleString()}원 더 저렴</span>합니다!
              </div>
            </div>
          </div>

          {/* Two Plan Comparison Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: 공시지원금 */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all relative ${
                isGongsiBetter
                  ? "border-[#FF6F0F] bg-orange-50/30 shadow-md"
                  : "border-gray-200 bg-white"
              }`}
            >
              {isGongsiBetter && (
                <div className="absolute -top-3 left-4 px-2.5 py-0.5 bg-[#FF6F0F] text-white text-xs font-bold rounded-full shadow-xs flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current" /> 최저가 추천
                </div>
              )}
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-900 text-sm">💡 공시지원금 (기기값 일시할인)</h4>
              </div>

              <div className="space-y-2 text-xs text-gray-600 border-b border-gray-100 pb-3">
                <div className="flex justify-between">
                  <span>출고가</span>
                  <span className="text-gray-900">{phone.releasePrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-blue-600 font-medium">
                  <span>통신사 공시지원금</span>
                  <span>- {gongsiSupport.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-[#FF6F0F] font-bold">
                  <span>당근 단독 추가지원금</span>
                  <span>- {storeExtraDiscount.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-dashed border-gray-200 font-bold text-gray-900">
                  <span>최종 할부원금</span>
                  <span className="text-sm text-red-600">{gongsiPrincipal.toLocaleString()}원</span>
                </div>
              </div>

              {/* Monthly Breakdown */}
              <div className="mt-3 space-y-1.5 text-xs text-gray-700">
                <div className="flex justify-between">
                  <span>월 기기값 ({installmentMonths}개월)</span>
                  <span>{monthlyDeviceGongsi.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>월 통신요금</span>
                  <span>{monthlyPlanGongsi.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 text-sm font-extrabold text-gray-900">
                  <span>월 예상 납부액</span>
                  <span className="text-base text-[#FF6F0F]">{totalMonthlyGongsi.toLocaleString()}원/월</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onApply(phone, carrier, "공시지원금", currentPlan.name, totalMonthlyGongsi);
                  onClose();
                }}
                className="mt-4 w-full py-2.5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                공시지원금으로 신청 <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: 선택약정 25% */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all relative ${
                !isGongsiBetter
                  ? "border-[#FF6F0F] bg-orange-50/30 shadow-md"
                  : "border-gray-200 bg-white"
              }`}
            >
              {!isGongsiBetter && (
                <div className="absolute -top-3 left-4 px-2.5 py-0.5 bg-[#FF6F0F] text-white text-xs font-bold rounded-full shadow-xs flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current" /> 최저가 추천
                </div>
              )}
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-900 text-sm">✨ 선택약정 (매월 요금 25% 할인)</h4>
              </div>

              <div className="space-y-2 text-xs text-gray-600 border-b border-gray-100 pb-3">
                <div className="flex justify-between">
                  <span>출고가</span>
                  <span className="text-gray-900">{phone.releasePrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-[#FF6F0F] font-bold">
                  <span>당근 단독 선약지원금</span>
                  <span>- {seonYakDeviceDiscount.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>매월 통신요금 25% 할인</span>
                  <span>- {seonYakPlanDiscount.toLocaleString()}원/월</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-dashed border-gray-200 font-bold text-gray-900">
                  <span>최종 할부원금</span>
                  <span className="text-sm">{seonYakPrincipal.toLocaleString()}원</span>
                </div>
              </div>

              {/* Monthly Breakdown */}
              <div className="mt-3 space-y-1.5 text-xs text-gray-700">
                <div className="flex justify-between">
                  <span>월 기기값 ({installmentMonths}개월)</span>
                  <span>{monthlyDeviceSeonYak.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>할인 후 통신요금</span>
                  <span>{monthlyPlanSeonYak.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 text-sm font-extrabold text-gray-900">
                  <span>월 예상 납부액</span>
                  <span className="text-base text-[#FF6F0F]">{totalMonthlySeonYak.toLocaleString()}원/월</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onApply(phone, carrier, "선택약정(25%)", currentPlan.name, totalMonthlySeonYak);
                  onClose();
                }}
                className="mt-4 w-full py-2.5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                선택약정으로 신청 <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
