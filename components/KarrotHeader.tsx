"use client";

import React, { useState } from "react";
import {
  IconMagnifyingglassLine,
  IconBellLine,
  IconXmarkLine,
} from "@karrotmarket/react-monochrome-icon";

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
  { id: "pre-order", title: "아이폰 18 사전예약", badge: "단독혜택 🔥", categoryFilter: "apple" },
  { id: "hot-flash", title: "전국 실시간 특가 성지", badge: "최대지원 ⚡️", categoryFilter: "hot" },
  { id: "samsung-s24", title: "갤럭시 S24 울트라 즉시출고", badge: "당일퀵 🤖", categoryFilter: "samsung" },
  { id: "zero-phone", title: "기기값 0원 효도/키즈폰", badge: "월0원 🎁", categoryFilter: "budget" },
  { id: "all-nation", title: "전국 공식인증 판매점", badge: "수도권당일 🛵", categoryFilter: "all" },
];

export const KarrotHeader: React.FC<KarrotHeaderProps> = ({
  currentMode,
  onSelectMode,
  onOpenKait,
  searchQuery,
  setSearchQuery,
  isSearchOpen,
  setIsSearchOpen,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#F2F3F6]">
      {/* Top Pre-notice Banner */}
      <div className="bg-[#FFF2E8] px-3.5 py-1.5 flex items-center justify-center text-[11px] font-semibold text-[#FF6F0F] whitespace-nowrap overflow-hidden">
        <span className="truncate">
          통신 3사 공시 지원금 + 🥕 당근 단독 추가 지원금 최대 즉시 할인
        </span>
      </div>

      {/* Main Header Bar */}
      <div className="px-4 h-14 flex items-center justify-between">
        {/* Left: Dynamic Campaign Selector (아이폰 18 사전예약 / 전국 특가 성지 등) */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-1.5 text-[16px] font-black text-[#212124] hover:text-[#FF6F0F] transition-colors"
          >
            <span className="truncate max-w-[210px]">{currentMode.title}</span>
            <span className="px-1.5 py-0.5 bg-[#FFF2E8] text-[#FF6F0F] text-[10px] font-extrabold rounded-md shrink-0">
              {currentMode.badge}
            </span>
          </button>

          {/* Campaign / Mode Menu Modal */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-[#EAEBEE] py-1.5 z-50 animate-fadeIn">
              <div className="px-3.5 py-1.5 text-[10px] font-bold text-[#868B94] border-b border-[#F2F3F6] flex items-center justify-between">
                <span>실시간 기획전 & 사전예약</span>
                <span className="text-[#FF6F0F]">전국 공식판매</span>
              </div>
              <div className="divide-y divide-[#F8F9FA]">
                {HEADER_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      onSelectMode(mode);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold hover:bg-[#FFF2E8] hover:text-[#FF6F0F] transition-colors flex items-center justify-between ${
                      currentMode.id === mode.id ? "text-[#FF6F0F] font-black bg-[#FFF2E8]/40" : "text-[#212124]"
                    }`}
                  >
                    <div>
                      <div className="font-bold">{mode.title}</div>
                      <div className="text-[10px] text-[#868B94] mt-0.5">{mode.badge}</div>
                    </div>
                    {currentMode.id === mode.id && <span className="text-xs">🥕</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Icons (Search, Bell) */}
        <div className="flex items-center gap-1.5 text-[#212124]">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 hover:bg-[#F2F3F6] rounded-full transition-colors"
            title="검색"
          >
            <span className="w-5 h-5 inline-flex items-center justify-center">
              <IconMagnifyingglassLine />
            </span>
          </button>
          <button
            onClick={() => alert("새로운 당근 공식인증 판매점 특가 알림이 없습니다.")}
            className="p-2 hover:bg-[#F2F3F6] rounded-full transition-colors relative"
            title="알림"
          >
            <span className="w-5 h-5 inline-flex items-center justify-center">
              <IconBellLine />
            </span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF6F0F]" />
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
              placeholder="단말기 검색 (예: 아이폰18 사전예약, S24, Z플립6, 0원)"
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
