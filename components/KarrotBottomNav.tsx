"use client";

import React from "react";
import {
  IconDaangnHouseFill,
  IconDaangnHouseLine,
  IconSparkle2Fill,
  IconSparkle2Line,
  IconDot3HorizontalChatbubbleLeftFill,
  IconDot3HorizontalChatbubbleLeftLine,
  IconCheckmarkShieldFill,
  IconCheckmarkShieldLine,
  IconDocumentMagnifyingglassFill,
  IconDocumentMagnifyingglassLine,
} from "@karrotmarket/react-monochrome-icon";

export type NavTab = "home" | "hot" | "chat" | "status" | "admin";

interface KarrotBottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  chatUnreadCount?: number;
}

export const KarrotBottomNav: React.FC<KarrotBottomNavProps> = ({
  activeTab,
  onSelectTab,
  chatUnreadCount = 1,
}) => {
  const tabs = [
    {
      id: "home" as NavTab,
      label: "홈",
      ActiveIcon: IconDaangnHouseFill,
      InactiveIcon: IconDaangnHouseLine,
    },
    {
      id: "hot" as NavTab,
      label: "당근특가",
      ActiveIcon: IconSparkle2Fill,
      InactiveIcon: IconSparkle2Line,
    },
    {
      id: "chat" as NavTab,
      label: "1:1 상담",
      ActiveIcon: IconDot3HorizontalChatbubbleLeftFill,
      InactiveIcon: IconDot3HorizontalChatbubbleLeftLine,
      badge: chatUnreadCount,
    },
    {
      id: "status" as NavTab,
      label: "내 신청",
      ActiveIcon: IconDocumentMagnifyingglassFill,
      InactiveIcon: IconDocumentMagnifyingglassLine,
    },
    {
      id: "admin" as NavTab,
      label: "대리점전산",
      ActiveIcon: IconCheckmarkShieldFill,
      InactiveIcon: IconCheckmarkShieldLine,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAEBEE] max-w-md mx-auto">
      <div className="grid grid-cols-5 h-14 items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComponent = isActive ? tab.ActiveIcon : tab.InactiveIcon;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 transition-all relative ${
                isActive ? "text-[#212124]" : "text-[#868B94] hover:text-[#212124]"
              }`}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span className={`w-5 h-5 inline-flex items-center justify-center ${isActive ? "text-[#212124]" : "text-[#868B94]"}`}>
                  <IconComponent />
                </span>
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-[#FF6F0F] text-white text-[9px] font-black rounded-full min-w-3.5 text-center leading-tight">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? "font-black text-[#212124]" : "font-semibold text-[#868B94]"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
