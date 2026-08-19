"use client";

import React, { useState } from "react";
import { ApplicationSubmission } from "@/types/application";
import {
  IconXmarkLine,
  IconMagnifyingglassLine,
  IconCheckmarkCircleFill,
  IconCheckmarkBadgeFill,
  IconClockFill,
} from "@karrotmarket/react-monochrome-icon";

interface KarrotStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: ApplicationSubmission[];
}

export const KarrotStatusModal: React.FC<KarrotStatusModalProps> = ({
  isOpen,
  onClose,
  applications,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const matched = applications.filter(
    (app) =>
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantName.includes(searchTerm) ||
      app.phone.includes(searchTerm)
  );

  const displayList = searchTerm ? matched : applications;

  const getStepIdx = (status: ApplicationSubmission["status"]) => {
    switch (status) {
      case "접수완료":
        return 1;
      case "전산심사중":
        return 2;
      case "개통승인":
        return 3;
      case "발송준비":
      case "배송중":
        return 4;
      case "개통완료":
        return 5;
      default:
        return 1;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scaleUp">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-[#F2F3F6] flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-base">📋</span>
            <h3 className="text-sm font-bold text-[#212124]">내 개통 신청 조회</h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#868B94] hover:text-[#212124] rounded-full">
            <span className="w-5 h-5 inline-flex items-center justify-center">
              <IconXmarkLine />
            </span>
          </button>
        </div>

        {/* Search */}
        <div className="p-3 bg-[#F8F9FA] border-b border-[#EAEBEE] shrink-0">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="신청자명, 연락처, 접수번호(DG-...) 입력"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-white border border-[#EAEBEE] rounded-xl text-xs font-medium text-[#212124] focus:outline-none focus:ring-2 focus:ring-[#FF6F0F]"
            />
            <span className="w-3.5 h-3.5 text-[#868B94] absolute left-2.5 pointer-events-none inline-flex items-center">
              <IconMagnifyingglassLine />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {displayList.length === 0 ? (
            <div className="text-center py-12 text-[#868B94] text-xs space-y-1">
              <div>조회된 신청 내역이 없습니다.</div>
              <div className="text-[11px]">홈에서 [3분 빠른 신청]을 진행해 보세요!</div>
            </div>
          ) : (
            displayList.map((app) => {
              const currentStep = getStepIdx(app.status);
              return (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl border border-[#EAEBEE] p-3.5 space-y-3 shadow-2xs"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                        {app.id}
                      </span>
                      <div className="font-bold text-[#212124] text-xs mt-1">
                        {app.phoneModel} ({app.phoneColor})
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-[#FFF2E8] text-[#FF6F0F] text-[10px] font-black rounded-md">
                      {app.status}
                    </span>
                  </div>

                  {/* 5-step dots */}
                  <div className="space-y-1 pt-1">
                    <div className="grid grid-cols-5 text-[9px] font-bold text-center">
                      <span className={currentStep >= 1 ? "text-[#FF6F0F]" : "text-[#868B94]"}>1. 접수</span>
                      <span className={currentStep >= 2 ? "text-[#FF6F0F]" : "text-[#868B94]"}>2. 심사</span>
                      <span className={currentStep >= 3 ? "text-[#FF6F0F]" : "text-[#868B94]"}>3. 승인</span>
                      <span className={currentStep >= 4 ? "text-[#FF6F0F]" : "text-[#868B94]"}>4. 배송</span>
                      <span className={currentStep >= 5 ? "text-[#FF6F0F]" : "text-[#868B94]"}>5. 개통</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div
                          key={s}
                          className={`h-1.5 rounded-full transition-all ${
                            currentStep >= s ? "bg-[#FF6F0F]" : "bg-[#EAEBEE]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 bg-[#F8F9FA] rounded-xl text-[11px] space-y-1 text-[#4D5159]">
                    <div className="flex justify-between">
                      <span>신청자</span>
                      <span className="font-bold text-[#212124]">{app.applicantName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>조건</span>
                      <span>
                        {app.carrier} / {app.joinType} ({app.discountType})
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-[#212124]">
                      <span>월 청구액</span>
                      <span className="text-[#FF6F0F]">{app.estimatedMonthly.toLocaleString()}원/월</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F8F9FA] border-t border-[#EAEBEE] flex justify-end shrink-0">
          <button onClick={onClose} className="w-full py-2.5 bg-[#212124] text-white font-bold rounded-xl text-xs">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
