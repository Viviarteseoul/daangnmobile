"use client";

import React, { useState } from "react";
import {
  IconMagnifyingglassLine,
  IconBellLine,
  IconXmarkLine,
} from "@karrotmarket/react-monochrome-icon";
import { RotateCw, Zap } from "lucide-react";

export interface HeaderMode {
  id: string;
  title: string;
  badge: string;
  categoryFilter?: "all" | "hot" | "apple" | "samsung" | "budget";
}

interface KarrotHeaderProps {
  currentMode: HeaderMode;
  onSelectMode: (mode: HeaderMode) => void;
  onOpenKait: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

export const HEADER_MODES: HeaderMode[] = [
  { id: "pre-order", title: "아이폰 18 / 17 사전예약", badge: "단독혜택 🔥", categoryFilter: "apple" },
  { id: "hot-flash", title: "전국 실시간 특가 성지", badge: "최대지원 ⚡️", categoryFilter: "hot" },
  { id: "samsung-s26", title: "갤럭시 폴드8 / S26 즉시출고", badge: "당일퀵 🤖", categoryFilter: "samsung" },
  { id: "zero-phone", title: "기기값 0원 효도/키즈폰", badge: "월0원 🎁", categoryFilter: "budget" },
  { id: "all-nation", title: "전국 공식인증 판매점", badge: "수도권당일 🛵", categoryFilter: "all" },
];

export const KarrotHeader: React.FC<KarrotHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  isSearchOpen,
  setIsSearchOpen,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // 파워 새로고침 동작: 세션/캐시를 정리하고 즉시 최신 데이터로 새로고침
  const handlePowerRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setShowToast(true);

    try {
      if (typeof window !== "undefined") {
        sessionStorage.clear();
        localStorage.removeItem("daangn_cache_sync");
      }
    } catch {
      // ignore
    }

    setTimeout(() => {
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("t", Date.now().toString());
        window.location.href = url.toString();
      }
    }, 450);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#F2F3F6]">
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-full left-0 right-0 z-50 flex justify-center p-2 pointer-events-none animate-fadeIn">
          <div className="px-3.5 py-1.5 bg-[#212124] text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 inline-flex items-center justify-center animate-spin text-[#FF6F0F]">
              <RotateCw className="w-3.5 h-3.5" />
            </span>
            <span>⚡️ 최신 지원금 & 단말기 시세 파워 새로고침 중...</span>
          </div>
        </div>
      )}

      {/* Top Pre-notice Banner */}
      <div className="bg-[#FFF2E8] px-3.5 py-1.5 flex items-center justify-center text-[11px] font-semibold text-[#FF6F0F] whitespace-nowrap overflow-hidden">
        <span className="truncate">
          통신 3사 공시 지원금 + 🥕 당근 단독 추가 지원금 최대 즉시 할인
        </span>
      </div>

      {/* Main Header Bar */}
      <div className="px-4 h-14 flex items-center justify-between gap-2">
        {/* Left: 당근 모바일 로고 및 타이틀 */}
        <div
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-1.5 select-none cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 rounded-xl bg-[#FFF2E8] flex items-center justify-center text-[19px] shadow-2xs group-hover:scale-105 transition-transform duration-150">
            🥕
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[18px] font-black text-[#212124] tracking-tight group-hover:text-[#FF6F0F] transition-colors">
              당근
            </span>
            <span className="px-1.5 py-0.5 bg-[#FF6F0F] text-white text-[10px] font-black rounded-md tracking-tight shadow-2xs">
              모바일
            </span>
          </div>
        </div>

        {/* Right: 파워 새로고침 버튼 & 검색 & 알림 아이콘 */}
        <div className="flex items-center gap-1.5 text-[#212124]">
          {/* 파워 새로고침 버튼 */}
          <button
            type="button"
            onClick={handlePowerRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-[#FF6F0F] to-[#FF8A3D] text-white rounded-full text-[11px] font-black hover:opacity-95 active:scale-95 transition-all shadow-2xs shrink-0 cursor-pointer disabled:opacity-80"
            title="캐시 삭제 및 최신 데이터로 파워 새로고침"
          >
            <span className={`inline-flex items-center justify-center ${isRefreshing ? "animate-spin" : ""}`}>
              <RotateCw className="w-3.5 h-3.5" />
            </span>
            <span>{isRefreshing ? "새로고침..." : "파워 새로고침"}</span>
          </button>

          {/* 검색 버튼 */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-1.5 hover:bg-[#F2F3F6] rounded-full transition-colors"
            title="검색"
          >
            <span className="w-5 h-5 inline-flex items-center justify-center">
              <IconMagnifyingglassLine />
            </span>
          </button>

          {/* 알림 버튼 */}
          <button
            type="button"
            onClick={() => alert("새로운 당근 공식인증 판매점 특가 알림이 없습니다.")}
            className="p-1.5 hover:bg-[#F2F3F6] rounded-full transition-colors relative"
            title="알림"
          >
            <span className="w-5 h-5 inline-flex items-center justify-center">
              <IconBellLine />
            </span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF6F0F]" />
          </button>
        </div>
      </div>

      {/* Expandable Search Input */}
      {isSearchOpen && (
        <div className="px-4 pb-3 animate-fadeIn">
          <div className="relative flex items-center">
            <input
              type="text"
              autoFocus
              placeholder="단말기 검색 (예: 아이폰 18/17, 갤럭시 폴드8, S26, 0원)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-[#F2F3F6] rounded-xl text-xs font-medium text-[#212124] focus:bg-white focus:ring-2 focus:ring-[#FF6F0F] focus:outline-none"
            />
            <span className="w-4 h-4 text-[#868B94] absolute left-3 pointer-events-none inline-flex items-center justify-center">
              <IconMagnifyingglassLine />
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-[#868B94] hover:text-[#212124]"
              >
                <span className="w-3.5 h-3.5 inline-flex items-center justify-center">
                  <IconXmarkLine />
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
