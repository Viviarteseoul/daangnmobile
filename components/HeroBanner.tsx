"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Zap,
  Truck,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface HeroBannerProps {
  onOpenKait: () => void;
  onScrollToProducts: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenKait, onScrollToProducts }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-orange-50/70 via-white to-white py-8 sm:py-12 border-b border-gray-100">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline & Call To Actions */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Top Micro Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-orange-200 rounded-full shadow-2xs text-xs font-bold text-gray-800">
              <span className="w-2 h-2 rounded-full bg-[#FF6F0F] animate-pulse" />
              <span>실시간 번호이동·기기변경 특가 오픈</span>
              <span className="text-[#FF6F0F]">당일 즉시 개통 ⚡️</span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              우리 동네 가장 투명한 <br />
              <span className="text-[#FF6F0F]">당근모바일 온라인 공식점</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              복잡한 신도림 발품 없이, 이통 3사 <strong>공시지원금 + 당근 단독 지원금 최대 43만 원</strong>을 한눈에
              비교하세요. 투명한 월 납부금액 확인부터 3분 비대면 접수까지 한 번에 완료됩니다.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onScrollToProducts}
                className="px-6 sm:px-8 py-3.5 bg-[#FF6F0F] hover:bg-[#e85b06] text-white font-extrabold rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 flex items-center gap-2 text-sm sm:text-base transition-all scale-100 hover:scale-[1.02]"
              >
                <Zap className="w-5 h-5 fill-current" /> 오늘 마감 특가 단말기 보기
              </button>

              <button
                onClick={onOpenKait}
                className="px-5 py-3.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold rounded-2xl text-sm flex items-center gap-2 transition-colors shadow-2xs"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600" /> KAIT 사전승낙서 조회
              </button>
            </div>
          </div>

          {/* Right Column: Live Sale & Trust Showcase Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200/80 relative overflow-hidden">
              {/* Top Accent */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-extrabold text-gray-900">당근 단독 선착순 특가 마감</span>
                </div>
                {/* Live Countdown Timer */}
                <div className="flex items-center gap-1 font-mono font-bold text-xs bg-gray-900 text-white px-3 py-1 rounded-xl shadow-2xs">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  <span>{timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}</span>:
                  <span>{timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}</span>:
                  <span className="text-orange-400">
                    {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
                  </span>
                </div>
              </div>

              {/* 4 Trust Highlights */}
              <div className="divide-y divide-gray-100 mt-4 text-xs">
                <div className="py-3 flex items-start gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">한국정보통신진흥협회(KAIT) 사전승낙</div>
                    <div className="text-gray-500 mt-0.5">승낙번호 2026-KAIT-DG8920 정식 공식 인증점</div>
                  </div>
                </div>

                <div className="py-3 flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">SGI 서울보증보험 100% 안심 담보</div>
                    <div className="text-gray-500 mt-0.5">개통 및 배송 전까지 전액 보증 보호</div>
                  </div>
                </div>

                <div className="py-3 flex items-start gap-3">
                  <div className="p-2 bg-orange-50 text-[#FF6F0F] rounded-xl shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">SKT • KT • LG U+ 공식 전산 연동</div>
                    <div className="text-gray-500 mt-0.5">실시간 개통 전산 심사 및 다이렉트 재고 수급</div>
                  </div>
                </div>

                <div className="py-3 flex items-start gap-3">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-xl shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">수도권 당일 안심 퀵 & 전국 무료택배</div>
                    <div className="text-gray-500 mt-0.5">오후 3시 이전 접수 건 당일 즉시 발송</div>
                  </div>
                </div>
              </div>

              {/* Bottom Guarantee Badge */}
              <div className="mt-4 p-3 bg-gray-50 rounded-2xl flex items-center justify-between text-[11px] text-gray-600">
                <span className="flex items-center gap-1.5 font-bold text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-green-600" /> PASS / 휴대폰 본인인증
                </span>
                <span className="text-gray-500 font-medium">명의도용 안심 차단</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
