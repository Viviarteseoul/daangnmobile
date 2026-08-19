"use client";

import React, { useState } from "react";
import { Phone } from "@/data/phones";
import {
  IconHeartLine,
  IconHeartFill,
  IconDot3HorizontalChatbubbleLeftLine,
  IconCheckmarkBadgeFill,
  IconSparkle2Fill,
  IconChevronRightLine,
} from "@karrotmarket/react-monochrome-icon";

interface KarrotProductListProps {
  phones: Phone[];
  currentModeTitle: string;
  onSelectPhone: (phone: Phone) => void;
  onOpenApply: (phone: Phone) => void;
}

export const KarrotProductList: React.FC<KarrotProductListProps> = ({
  phones,
  currentModeTitle,
  onSelectPhone,
  onOpenApply,
}) => {
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="divide-y divide-[#F2F3F6] bg-white">
      {phones.map((phone) => {
        const isLiked = likedMap[phone.id];
        const discountInfo = phone.carrierDiscounts.skt;
        const totalDiscount = discountInfo.gongsi + discountInfo.storeDiscount;
        const principal = Math.max(0, phone.releasePrice - totalDiscount);
        const monthlyDevice = Math.round(principal / 24);
        const monthlyTotal = monthlyDevice + discountInfo.planPrice;

        return (
          <div
            key={phone.id}
            onClick={() => onSelectPhone(phone)}
            className="p-4 flex gap-3.5 hover:bg-[#FAFAFA] active:bg-[#F2F3F6] transition-colors cursor-pointer group"
          >
            {/* Left: Product Thumbnail */}
            <div className="relative w-28 h-28 shrink-0 bg-[#F8F9FA] rounded-2xl border border-[#F2F3F6] overflow-hidden flex items-center justify-center p-2">
              {phone.isPreOrder ? (
                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-purple-600 text-white text-[9px] font-black rounded-md flex items-center gap-0.5 shadow-2xs">
                  <span>사전예약</span>
                </div>
              ) : phone.isHot ? (
                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-[#FF6F0F] text-white text-[9px] font-black rounded-md flex items-center gap-0.5 shadow-2xs">
                  <span className="w-2.5 h-2.5 inline-flex items-center">
                    <IconSparkle2Fill />
                  </span>
                  <span>특가</span>
                </div>
              ) : null}

              <img
                src={phone.image}
                alt={phone.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Right: Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              {/* Title & Subtitle */}
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="text-[15px] font-bold text-[#212124] leading-snug truncate">
                    {phone.name}
                  </h3>
                </div>
                <div className="text-xs text-[#868B94] mt-0.5 flex items-center gap-1.5">
                  <span>전국 공식판매</span>
                  <span>•</span>
                  <span>{phone.isPreOrder ? "사전예약 접수중" : `잔여 ${phone.stockCount}대`}</span>
                  <span>•</span>
                  <span className="text-[#0369a1] font-semibold flex items-center gap-0.5">
                    <span className="w-3 h-3 inline-flex items-center text-blue-600">
                      <IconCheckmarkBadgeFill />
                    </span>
                    {phone.isPreOrder ? "출시일 직배송" : "당일 퀵"}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-1 mt-1.5 overflow-hidden">
                  <span className="px-1.5 py-0.5 bg-[#FFF2E8] text-[#FF6F0F] text-[10px] font-bold rounded">
                    지원금 -{(totalDiscount / 10000).toFixed(0)}만
                  </span>
                  <span className="px-1.5 py-0.5 bg-[#F2F3F6] text-[#4D5159] text-[10px] font-semibold rounded">
                    {phone.subName.split("/")[0]?.trim()}
                  </span>
                </div>
              </div>

              {/* Pricing Line */}
              <div className="mt-2 flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] text-[#868B94]">
                    출고가 <span className="line-through">{phone.releasePrice.toLocaleString()}원</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[16px] font-black text-[#212124]">
                      {principal === 0 ? "기기값 0원" : `${principal.toLocaleString()}원`}
                    </span>
                    <span className="text-xs font-bold text-[#FF6F0F]">
                      (월 {monthlyTotal.toLocaleString()}원~)
                    </span>
                  </div>
                </div>

                {/* Likes & Chat Count */}
                <div className="flex items-center gap-2.5 text-xs text-[#868B94]">
                  <button
                    type="button"
                    onClick={(e) => toggleLike(e, phone.id)}
                    className="flex items-center gap-0.5 hover:text-[#FF6F0F]"
                  >
                    <span className={`w-3.5 h-3.5 inline-flex items-center ${isLiked ? "text-[#FF6F0F]" : ""}`}>
                      {isLiked ? <IconHeartFill /> : <IconHeartLine />}
                    </span>
                    <span className="text-[11px]">{phone.reviewCount + (isLiked ? 1 : 0)}</span>
                  </button>
                  <div className="flex items-center gap-0.5">
                    <span className="w-3.5 h-3.5 inline-flex items-center">
                      <IconDot3HorizontalChatbubbleLeftLine />
                    </span>
                    <span className="text-[11px]">{Math.floor(phone.reviewCount * 0.4)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
