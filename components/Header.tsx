"use client";

import React, { useState } from "react";
import {
  MapPin,
  Search,
  ShieldCheck,
  ClipboardList,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  PhoneCall,
} from "lucide-react";

interface HeaderProps {
  onOpenKait: () => void;
  onOpenStatus: () => void;
  onOpenAdmin: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenKait,
  onOpenStatus,
  onOpenAdmin,
  searchQuery,
  setSearchQuery,
}) => {
  const [selectedTown, setSelectedTown] = useState("역삼1동");
  const [isTownOpen, setIsTownOpen] = useState(false);

  const towns = ["역삼1동", "서초4동", "여의도동", "판교동", "해운대 우동"];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-2xs">
      {/* Top Banner Notice */}
      <div className="bg-orange-50 text-[#FF6F0F] text-[11px] font-bold px-4 py-1.5 flex items-center justify-between border-b border-orange-100">
        <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5" />
          <span>당근 회원 전용 혜택: 쓰던 폰 반납 시 최대 20만 원 추가 보상 & 당일 무료 퀵배송!</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-gray-500 font-normal">
          <button
            onClick={onOpenKait}
            className="hover:text-gray-900 flex items-center gap-1 font-semibold text-[#0369a1]"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> KAIT 사전승낙 확인
          </button>
          <span>•</span>
          <span className="flex items-center gap-1">
            <PhoneCall className="w-3 h-3" /> 안심 상담: 1544-0992
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: Logo & Location Dropdown */}
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[#FF6F0F] rounded-2xl flex items-center justify-center text-white text-xl shadow-xs group-hover:scale-105 transition-transform">
              🥕
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                당근<span className="text-[#FF6F0F]">모바일</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md">
                공식온라인점
              </span>
            </div>
          </a>

          {/* Location Selector */}
          <div className="relative">
            <button
              onClick={() => setIsTownOpen(!isTownOpen)}
              className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200/80 rounded-full text-xs font-bold text-gray-800 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#FF6F0F]" />
              <span>{selectedTown}</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>

            {isTownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-32 bg-white rounded-2xl shadow-xl border border-gray-200 py-1.5 z-50 animate-fadeIn">
                {towns.map((town) => (
                  <button
                    key={town}
                    onClick={() => {
                      setSelectedTown(town);
                      setIsTownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs font-medium hover:bg-orange-50 hover:text-[#FF6F0F] transition-colors ${
                      selectedTown === town ? "text-[#FF6F0F] font-bold bg-orange-50/50" : "text-gray-700"
                    }`}
                  >
                    {town}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="단말기 모델명 검색 (예: S24, 아이폰16, Z플립6)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100/90 hover:bg-gray-100 focus:bg-white border border-transparent focus:border-[#FF6F0F] rounded-2xl text-xs font-medium focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenStatus}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-colors shadow-2xs"
          >
            <ClipboardList className="w-4 h-4 text-[#FF6F0F]" />
            <span className="hidden sm:inline">내 신청 조회</span>
            <span className="sm:hidden">조회</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">대리점 전산</span>
            <span className="sm:hidden">전산</span>
          </button>
        </div>
      </div>
    </header>
  );
};
