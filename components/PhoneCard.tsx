"use client";

import React, { useState } from "react";
import { Phone } from "@/data/phones";
import { Calculator, Zap, ShieldCheck, Flame, Star, Package } from "lucide-react";

interface PhoneCardProps {
  phone: Phone;
  onOpenCalculator: (phone: Phone) => void;
  onOpenApply: (phone: Phone, carrier: "SKT" | "KT" | "LGU+") => void;
}

export const PhoneCard: React.FC<PhoneCardProps> = ({
  phone,
  onOpenCalculator,
  onOpenApply,
}) => {
  const [selectedCarrier, setSelectedCarrier] = useState<"SKT" | "KT" | "LGU+">("SKT");
  const [activeColorIdx, setActiveColorIdx] = useState(0);

  const discountKey = selectedCarrier.toLowerCase() as "skt" | "kt" | "lgu";
  const carrierInfo = phone.carrierDiscounts[discountKey] || phone.carrierDiscounts.skt;

  const totalDiscount = carrierInfo.gongsi + carrierInfo.storeDiscount;
  const principalPrice = Math.max(0, phone.releasePrice - totalDiscount);
  const monthlyDevice = Math.round(principalPrice / 24);
  const monthlyTotal = monthlyDevice + carrierInfo.planPrice;

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Top Media Area */}
      <div className="relative bg-gray-50/70 p-5 flex items-center justify-center border-b border-gray-100 overflow-hidden aspect-4/3">
        {phone.isHot && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[11px] font-extrabold rounded-full shadow-xs flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-current" /> 당근 특가
          </div>
        )}

        <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/90 backdrop-blur-xs text-gray-600 text-[11px] font-bold rounded-lg border border-gray-200 flex items-center gap-1 shadow-2xs">
          <Package className="w-3 h-3 text-[#FF6F0F]" /> 잔여 {phone.stockCount}대
        </div>

        <img
          src={phone.image}
          alt={phone.name}
          className="w-44 h-44 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
        />

        {/* Color Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-gray-200 shadow-2xs">
          {phone.colors.map((c, idx) => (
            <button
              key={c.name}
              onClick={() => setActiveColorIdx(idx)}
              title={c.name}
              className={`w-3.5 h-3.5 rounded-full border transition-all ${
                activeColorIdx === idx ? "scale-125 ring-2 ring-[#FF6F0F] border-white" : "border-gray-300"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <span className="text-[10px] font-bold text-gray-600 ml-1">
            {phone.colors[activeColorIdx]?.name}
          </span>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Name & Tags */}
        <div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {phone.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-orange-50 text-[#FF6F0F] text-[10px] font-extrabold rounded-md border border-orange-100"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-base font-bold text-gray-900 group-hover:text-[#FF6F0F] transition-colors">
            {phone.name}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{phone.subName}</p>

          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <span className="flex items-center text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current mr-0.5" /> {phone.rating}
            </span>
            <span>•</span>
            <span>후기 {phone.reviewCount}개</span>
            <span>•</span>
            <span className="text-green-600 font-semibold flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3" /> 당일 출고
            </span>
          </div>
        </div>

        {/* Carrier Tab Selector */}
        <div className="bg-gray-100 p-1 rounded-xl grid grid-cols-3 gap-1 text-xs font-bold">
          {(["SKT", "KT", "LGU+"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCarrier(c)}
              className={`py-1.5 rounded-lg transition-all ${
                selectedCarrier === c
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100 space-y-2 text-xs">
          <div className="flex justify-between text-gray-500">
            <span>출고가</span>
            <span className="line-through">{phone.releasePrice.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between text-blue-600 font-medium">
            <span>공시지원 + 당근지원</span>
            <span>- {totalDiscount.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-dashed border-gray-200 font-extrabold text-gray-900">
            <span>체감 할부원금 (24개월)</span>
            <span className="text-sm text-red-600 font-black">{principalPrice.toLocaleString()}원</span>
          </div>

          <div className="pt-2 border-t border-gray-200 flex justify-between items-end">
            <div>
              <div className="text-[10px] text-gray-500 font-medium">기기값 + 기본요금제 합산</div>
              <div className="text-xs text-gray-700 font-bold">월 예상 청구액</div>
            </div>
            <div className="text-right">
              <span className="text-base sm:text-lg font-black text-[#FF6F0F]">
                {monthlyTotal.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-gray-700">원/월</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onOpenCalculator(phone)}
            className="py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <Calculator className="w-3.5 h-3.5 text-gray-600" /> 요금 계산기
          </button>
          <button
            onClick={() => onOpenApply(phone, selectedCarrier)}
            className="py-2.5 px-3 bg-[#FF6F0F] hover:bg-[#e85b06] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 fill-current" /> 3분 빠른신청
          </button>
        </div>
      </div>
    </div>
  );
};
