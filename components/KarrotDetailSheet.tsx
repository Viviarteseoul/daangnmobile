"use client";

import React, { useState } from "react";
import { Phone, PLANS_DATA } from "@/data/phones";
import {
  IconXmarkLine,
  IconHeartLine,
  IconHeartFill,
  IconCheckmarkBadgeFill,
  IconCheckmarkShieldFill,
  IconSparkle2Fill,
  IconDot3HorizontalChatbubbleLeftFill,
  IconChevronRightLine,
} from "@karrotmarket/react-monochrome-icon";

interface KarrotDetailSheetProps {
  phone: Phone | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenApply: (phone: Phone, carrier: "SKT" | "KT" | "LGU+", discountType: "공시지원금" | "선택약정(25%)", planName: string, estimatedMonthly: number) => void;
  onOpenChat: (phone: Phone) => void;
  onOpenKait: () => void;
}

export const KarrotDetailSheet: React.FC<KarrotDetailSheetProps> = ({
  phone,
  isOpen,
  onClose,
  onOpenApply,
  onOpenChat,
  onOpenKait,
}) => {
  const [carrier, setCarrier] = useState<"SKT" | "KT" | "LGU+">("SKT");
  const [joinType, setJoinType] = useState<"번호이동" | "기기변경" | "신규가입">("번호이동");
  const [discountType, setDiscountType] = useState<"공시지원금" | "선택약정(25%)">("공시지원금");
  const [selectedPlanId, setSelectedPlanId] = useState("skt-2");
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!isOpen || !phone) return null;

  const carrierPlans = PLANS_DATA.filter((p) => p.carrier === carrier);
  const currentPlan = carrierPlans.find((p) => p.id === selectedPlanId) || carrierPlans[0] || PLANS_DATA[0];

  const discountKey = carrier.toLowerCase() as "skt" | "kt" | "lgu";
  const carrierData = phone.carrierDiscounts[discountKey] || phone.carrierDiscounts.skt;

  // Calculation
  const gongsiTotalDiscount = carrierData.gongsi + carrierData.storeDiscount;
  const gongsiPrincipal = Math.max(0, phone.releasePrice - gongsiTotalDiscount);
  const gongsiMonthlyDevice = Math.round(gongsiPrincipal / 24);
  const gongsiMonthlyTotal = gongsiMonthlyDevice + currentPlan.monthlyFee;

  const seonYakDeviceDiscount = Math.round(carrierData.storeDiscount * 0.7);
  const seonYakPlanDiscount = Math.round(currentPlan.monthlyFee * 0.25);
  const seonYakPrincipal = Math.max(0, phone.releasePrice - seonYakDeviceDiscount);
  const seonYakMonthlyDevice = Math.round(seonYakPrincipal / 24);
  const seonYakMonthlyPlan = currentPlan.monthlyFee - seonYakPlanDiscount;
  const seonYakMonthlyTotal = seonYakMonthlyDevice + seonYakMonthlyPlan;

  const currentMonthlyTotal = discountType === "공시지원금" ? gongsiMonthlyTotal : seonYakMonthlyTotal;
  const currentPrincipal = discountType === "공시지원금" ? gongsiPrincipal : seonYakPrincipal;

  const handleCarrierChange = (newCarrier: "SKT" | "KT" | "LGU+") => {
    setCarrier(newCarrier);
    const newPlans = PLANS_DATA.filter((p) => p.carrier === newCarrier);
    if (newPlans.length > 0) {
      setSelectedPlanId(newPlans[1]?.id || newPlans[0].id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-scaleUp">
        {/* Top Header Bar */}
        <div className="px-4 py-3 border-b border-[#F2F3F6] flex items-center justify-between shrink-0 bg-white">
          <span className="text-sm font-bold text-[#212124]">단말기 상세 및 요금 견적</span>
          <button
            onClick={onClose}
            className="p-1 text-[#868B94] hover:text-[#212124] rounded-full"
          >
            <span className="w-5 h-5 inline-flex items-center justify-center">
              <IconXmarkLine />
            </span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 space-y-5 flex-1">
          {/* Seller Profile Header (당근 비즈프로필 스타일) */}
          <div className="p-3 bg-[#F8F9FA] rounded-2xl border border-[#F2F3F6] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#FF6F0F] text-white flex items-center justify-center text-xl font-bold shadow-2xs">
                🥕
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-[#212124]">당근모바일 공식인증 판매점</span>
                  <span className="w-3.5 h-3.5 text-blue-600 inline-flex items-center">
                    <IconCheckmarkBadgeFill />
                  </span>
                </div>
                <div className="text-[11px] text-[#868B94] mt-0.5">
                  전국 공식인증 판매점 • 후기 142개
                </div>
              </div>
            </div>

            {/* Manner Temp */}
            <div className="text-right">
              <div className="text-xs font-black text-[#1565C0]">99.0℃</div>
              <div className="text-[10px] text-[#868B94]">매너온도 🥕</div>
            </div>
          </div>

          {/* Product Hero Image & Color Chips */}
          <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-[#F2F3F6] flex flex-col items-center justify-center relative">
            <img
              src={phone.image}
              alt={phone.name}
              className="w-40 h-40 object-contain drop-shadow-md"
            />

            {/* Color Selector */}
            <div className="mt-3 flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[#EAEBEE] shadow-2xs">
              {phone.colors.map((c, idx) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColorIdx(idx)}
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                    selectedColorIdx === idx
                      ? "bg-[#FFF2E8] text-[#FF6F0F]"
                      : "text-[#868B94] hover:text-[#212124]"
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Titles */}
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="px-2 py-0.5 bg-[#FFF2E8] text-[#FF6F0F] text-[10px] font-black rounded-md">
                🔥 당근 단독 특가
              </span>
              <span className="text-[11px] text-[#868B94]">실시간 재고 {phone.stockCount}대</span>
            </div>
            <h2 className="text-lg font-black text-[#212124]">{phone.name}</h2>
            <p className="text-xs text-[#868B94] mt-0.5">{phone.subName}</p>
          </div>

          {/* 1. Carrier Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#212124]">통신사 선택</label>
            <div className="grid grid-cols-3 gap-1.5 bg-[#F2F3F6] p-1 rounded-xl">
              {(["SKT", "KT", "LGU+"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => handleCarrierChange(c)}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    carrier === c ? "bg-white text-[#212124] shadow-xs" : "text-[#868B94]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Join Type Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#212124]">가입 유형</label>
            <div className="grid grid-cols-3 gap-1.5 bg-[#F2F3F6] p-1 rounded-xl">
              {(["번호이동", "기기변경", "신규가입"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setJoinType(t)}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    joinType === t ? "bg-white text-[#212124] shadow-xs" : "text-[#868B94]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Discount Type Toggle (공시지원금 vs 선택약정) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#212124]">할인 방식 비교 선택</label>
              <span className="text-[11px] font-bold text-[#FF6F0F]">
                {gongsiPrincipal < seonYakPrincipal ? "💡 공시지원금 추천" : "✨ 선택약정 추천"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDiscountType("공시지원금")}
                className={`p-3 rounded-2xl border text-left transition-all relative ${
                  discountType === "공시지원금"
                    ? "border-[#FF6F0F] bg-[#FFF2E8]/40 shadow-xs"
                    : "border-[#EAEBEE] bg-white hover:bg-[#FAFAFA]"
                }`}
              >
                <div className="text-xs font-black text-[#212124]">💡 공시지원금</div>
                <div className="text-[11px] text-[#868B94] mt-0.5">기기값 일시 할인</div>
                <div className="text-xs font-bold text-[#FF6F0F] mt-1.5">
                  -{(gongsiTotalDiscount / 10000).toFixed(0)}만 원 할인
                </div>
              </button>

              <button
                onClick={() => setDiscountType("선택약정(25%)")}
                className={`p-3 rounded-2xl border text-left transition-all relative ${
                  discountType === "선택약정(25%)"
                    ? "border-[#FF6F0F] bg-[#FFF2E8]/40 shadow-xs"
                    : "border-[#EAEBEE] bg-white hover:bg-[#FAFAFA]"
                }`}
              >
                <div className="text-xs font-black text-[#212124]">✨ 선택약정 25%</div>
                <div className="text-[11px] text-[#868B94] mt-0.5">매월 요금 25% 할인</div>
                <div className="text-xs font-bold text-emerald-600 mt-1.5">
                  매월 -{(seonYakPlanDiscount / 10000).toFixed(1)}만 원
                </div>
              </button>
            </div>
          </div>

          {/* 4. Plan Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#212124]">요금제 ({carrier})</label>
            <select
              value={selectedPlanId}
              onChange={(e) => setSelectedPlanId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-[#EAEBEE] rounded-xl text-xs font-bold text-[#212124] focus:outline-none focus:ring-2 focus:ring-[#FF6F0F]"
            >
              {carrierPlans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (데이터 {p.data} / 월 {p.monthlyFee.toLocaleString()}원)
                </option>
              ))}
            </select>
          </div>

          {/* Price Breakdown Box */}
          <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-[#EAEBEE] space-y-2 text-xs">
            <div className="flex justify-between text-[#868B94]">
              <span>출고가</span>
              <span className="line-through">{phone.releasePrice.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-blue-600 font-semibold">
              <span>지원금 할인 총액</span>
              <span>
                - {discountType === "공시지원금" ? gongsiTotalDiscount.toLocaleString() : seonYakDeviceDiscount.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-dashed border-[#EAEBEE] font-black text-[#212124]">
              <span>최종 할부원금 (24개월)</span>
              <span className="text-sm text-red-600">{currentPrincipal.toLocaleString()}원</span>
            </div>

            <div className="pt-2 border-t border-[#EAEBEE] flex justify-between items-end">
              <div>
                <div className="text-[10px] text-[#868B94]">기기값 + 통신요금 합산</div>
                <div className="text-xs font-bold text-[#212124]">월 청구 예상금액</div>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-[#FF6F0F]">
                  {currentMonthlyTotal.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-[#212124]">원/월</span>
              </div>
            </div>
          </div>

          {/* KAIT Certificate Notice Link */}
          <button
            type="button"
            onClick={onOpenKait}
            className="w-full p-3 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-center justify-between text-xs text-blue-900 font-bold hover:bg-blue-100/60 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 text-blue-600 inline-flex items-center">
                <IconCheckmarkShieldFill />
              </span>
              KAIT 온라인 사전승낙 인증점 (2026-KAIT-DG8920)
            </span>
            <span className="w-3.5 h-3.5 text-blue-500 inline-flex items-center">
              <IconChevronRightLine />
            </span>
          </button>
        </div>

        {/* Fixed Bottom Action Bar */}
        <div className="p-3.5 bg-white border-t border-[#F2F3F6] flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsLiked(!isLiked)}
            className="p-3 border border-[#EAEBEE] rounded-2xl text-[#868B94] hover:text-[#FF6F0F] transition-colors"
          >
            <span className={`w-5 h-5 inline-flex items-center ${isLiked ? "text-[#FF6F0F]" : ""}`}>
              {isLiked ? <IconHeartFill /> : <IconHeartLine />}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenChat(phone);
            }}
            className="py-3.5 px-4 bg-[#F2F3F6] hover:bg-[#EAEBEE] text-[#212124] text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="w-4 h-4 text-[#FF6F0F] inline-flex items-center">
              <IconDot3HorizontalChatbubbleLeftFill />
            </span>
            <span>1:1 상담</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenApply(phone, carrier, discountType, currentPlan.name, currentMonthlyTotal);
            }}
            className="flex-1 py-3.5 bg-[#FF6F0F] hover:bg-[#e85b06] text-white text-xs font-black rounded-2xl shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>🥕 3분 간편 신청하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
