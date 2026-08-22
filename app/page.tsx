"use client";

import React, { useState } from "react";
import { KarrotHeader, HEADER_MODES, HeaderMode } from "@/components/KarrotHeader";
import { KarrotBottomNav, NavTab } from "@/components/KarrotBottomNav";
import { KarrotProductList } from "@/components/KarrotProductList";
import { KarrotDetailSheet } from "@/components/KarrotDetailSheet";
import { KarrotApplyModal } from "@/components/KarrotApplyModal";
import { KarrotChatModal } from "@/components/KarrotChatModal";
import { KarrotKaitModal } from "@/components/KarrotKaitModal";
import { KarrotStatusModal } from "@/components/KarrotStatusModal";
import { KarrotAdminModal } from "@/components/KarrotAdminModal";
import { CategoryCarousel, CategoryType } from "@/components/CategoryCarousel";
import { PHONES_DATA, Phone } from "@/data/phones";
import { ApplicationSubmission } from "@/types/application";
import {
  IconCheckmarkShieldFill,
  IconCheckmarkBadgeFill,
  IconSparkle2Fill,
  IconDot3HorizontalChatbubbleLeftFill,
  IconChevronRightLine,
} from "@karrotmarket/react-monochrome-icon";

export default function Home() {
  // Navigation & Dynamic Campaign Header Mode
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [currentMode, setCurrentMode] = useState<HeaderMode>(HEADER_MODES[0]); // default: 아이폰 18 사전예약

  // Search & Category Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  // Modals
  const [isKaitOpen, setIsKaitOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Selected Phone & Form Context
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(PHONES_DATA[0]);
  const [applyCarrier, setApplyCarrier] = useState<"SKT" | "KT" | "LGU+">("SKT");
  const [applyDiscountType, setApplyDiscountType] = useState<"공시지원금" | "선택약정(25%)">("공시지원금");
  const [applyPlanName, setApplyPlanName] = useState("5GX 프라임");
  const [applyMonthly, setApplyMonthly] = useState(124260);

  // Applications Store
  const [applications, setApplications] = useState<ApplicationSubmission[]>([
    {
      id: "DG-260819-1092",
      applicantName: "이민우",
      phone: "01099283412",
      birthDate: "890514",
      carrier: "SKT",
      joinType: "번호이동",
      phoneModel: "아이폰 18 Pro (사전예약)",
      phoneColor: "티타늄 코스믹",
      planName: "5GX 프라임",
      planFee: 89000,
      discountType: "공시지원금",
      estimatedMonthly: 119580,
      address: "서울특별시 강남구 테헤란로 152 4층",
      shippingType: "당일 안심 퀵 (수도권)",
      status: "전산심사중",
      submittedAt: "2026. 08. 19. 14:15",
      verificationPassed: true,
    },
    {
      id: "DG-260819-3891",
      applicantName: "박지수",
      phone: "01038472910",
      birthDate: "941120",
      carrier: "LGU+",
      joinType: "기기변경",
      phoneModel: "아이폰 16 Pro",
      phoneColor: "데저트 티타늄",
      planName: "5G 프리미어 에센셜",
      planFee: 85000,
      discountType: "선택약정(25%)",
      estimatedMonthly: 114500,
      address: "경기도 성남시 분당구 판교역로 235",
      shippingType: "우체국 무료택배",
      status: "개통승인",
      submittedAt: "2026. 08. 19. 13:40",
      verificationPassed: true,
    },
  ]);

  const handleSelectHeaderMode = (mode: HeaderMode) => {
    setCurrentMode(mode);
    if (mode.categoryFilter) {
      setSelectedCategory(mode.categoryFilter);
    }
  };

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === "chat") {
      setIsChatOpen(true);
    } else if (tab === "status") {
      setIsStatusOpen(true);
    } else if (tab === "admin") {
      setIsAdminOpen(true);
    } else if (tab === "hot") {
      setSelectedCategory("hot");
    } else if (tab === "home") {
      setSelectedCategory("all");
    }
  };

  const handleSelectPhone = (phone: Phone) => {
    setSelectedPhone(phone);
    setIsDetailOpen(true);
  };

  const handleOpenApply = (
    phone: Phone,
    carrier: "SKT" | "KT" | "LGU+" = "SKT",
    discountType: "공시지원금" | "선택약정(25%)" = "공시지원금",
    planName: string = "5GX 프라임",
    monthly: number = 124260
  ) => {
    setSelectedPhone(phone);
    setApplyCarrier(carrier);
    setApplyDiscountType(discountType);
    setApplyPlanName(planName);
    setApplyMonthly(monthly);
    setIsApplyOpen(true);
  };

  const handleOpenChatWithPhone = (phone: Phone) => {
    setSelectedPhone(phone);
    setIsChatOpen(true);
  };

  const handleSaveApplication = (newApp: ApplicationSubmission) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  const handleUpdateStatus = (id: string, newStatus: ApplicationSubmission["status"]) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  // Filter phones
  const filteredPhones = PHONES_DATA.filter((phone) => {
    const matchSearch =
      phone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.subName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchSearch) return false;
    if (selectedCategory === "hot" && !phone.isHot) return false;
    if (selectedCategory === "apple" && phone.brand !== "Apple") return false;
    if (selectedCategory === "samsung" && phone.brand !== "Samsung") return false;
    if (selectedCategory === "budget" && phone.releasePrice > 500000) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-[#F2F3F6] flex justify-center selection:bg-orange-100 selection:text-[#FF6F0F]">
      {/* Centered Mobile App Container */}
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col border-x border-[#EAEBEE] shadow-2xl relative pb-20">
        {/* Karrot Header with Campaign Mode Selector */}
        <KarrotHeader
          currentMode={currentMode}
          onSelectMode={handleSelectHeaderMode}
          onOpenKait={() => setIsKaitOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />

        {/* Category Carousel (Hover Animated & Scrollable) */}
        <CategoryCarousel
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Hero Promo Banner */}
        <div className="p-4 bg-gradient-to-br from-[#FFF2E8] via-[#FFF8F3] to-white border-b border-[#F2F3F6]">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#FF6F0F] text-white text-[10px] font-black rounded-md">
                <span>당근 공식인증 판매점</span>
              </div>
              <h2 className="text-xl font-black text-[#212124] tracking-tight leading-snug">
                우리 동네 휴대폰 성지 <br />
                <span className="text-[#FF6F0F]">당근 모바일 🥕</span>
              </h2>
              <p className="text-xs text-[#4D5159] leading-snug">
                통신 3사 지원금 + 단독 추가지원금 최대 43만 원 할인!
              </p>
            </div>
            <div className="text-3xl">📱</div>
          </div>

          {/* Trust Link */}
          <div className="mt-3 pt-2.5 border-t border-[#FFE0CC] flex items-center justify-between text-[11px]">
            <button
              onClick={() => setIsKaitOpen(true)}
              className="flex items-center gap-1 text-[#0369a1] font-bold hover:underline"
            >
              <span className="w-3.5 h-3.5 text-blue-600 inline-flex items-center">
                <IconCheckmarkShieldFill />
              </span>
              <span>KAIT 사전승낙서 (DG8920) 확인</span>
            </button>
            <span className="text-[#868B94]">SGI 서울보증 100% 안심</span>
          </div>
        </div>

        {/* Feed List of Phones */}
        <div className="flex-1">
          {filteredPhones.length === 0 ? (
            <div className="text-center py-20 text-[#868B94] space-y-2">
              <div className="text-3xl">🔍</div>
              <div className="text-sm font-bold text-[#212124]">검색된 단말기가 없습니다.</div>
              <div className="text-xs">다른 검색어를 입력해 보세요.</div>
            </div>
          ) : (
            <KarrotProductList
              phones={filteredPhones}
              currentModeTitle={currentMode.title}
              onSelectPhone={handleSelectPhone}
              onOpenApply={handleOpenApply}
            />
          )}
        </div>

        {/* Business & Legal Footer in Mobile Feed */}
        <div className="p-4 bg-[#F8F9FA] border-t border-[#F2F3F6] text-[11px] text-[#868B94] space-y-2 mb-2">
          <div className="flex items-center justify-between font-bold text-[#4D5159]">
            <span>🥕 당근모바일 공식인증 판매점</span>
            <button onClick={() => setIsKaitOpen(true)} className="text-blue-600 hover:underline">
              사전승낙서 확인 ↗
            </button>
          </div>
          <p className="leading-relaxed">
            대표: 김당근 | 사업자등록번호: 123-86-09920 <br />
            통신판매업 신고: 제 2026-서울강남-0412호 <br />
            주소: 서울시 강남구 테헤란로 142 8층 | 고객센터: 1544-0992 <br />
            SGI 서울보증보험 5,000만 원 여신 안심 담보 가입점
          </p>
          <div className="text-[10px] text-[#B0B3B9] pt-1">
            © 2026 DaangnMobile. All rights reserved.
          </div>
        </div>

        {/* Karrot Bottom Navigation Bar */}
        <KarrotBottomNav activeTab={activeTab} onSelectTab={handleSelectTab} />
      </div>

      {/* Modals & BottomSheets */}
      <KarrotDetailSheet
        phone={selectedPhone}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onOpenApply={handleOpenApply}
        onOpenChat={handleOpenChatWithPhone}
        onOpenKait={() => setIsKaitOpen(true)}
      />

      <KarrotApplyModal
        phone={selectedPhone}
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        initialCarrier={applyCarrier}
        initialDiscountType={applyDiscountType}
        initialPlanName={applyPlanName}
        initialMonthly={applyMonthly}
        onSaveApplication={handleSaveApplication}
      />

      <KarrotChatModal
        phone={selectedPhone}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenApply={handleOpenApply}
      />

      <KarrotKaitModal
        isOpen={isKaitOpen}
        onClose={() => setIsKaitOpen(false)}
      />

      <KarrotStatusModal
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        applications={applications}
      />

      <KarrotAdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        applications={applications}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
