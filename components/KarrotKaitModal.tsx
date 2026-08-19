"use client";

import React from "react";
import {
  IconXmarkLine,
  IconCheckmarkBadgeFill,
  IconCheckmarkShieldFill,
  IconCheckmarkCircleFill,
  IconSparkle2Fill,
} from "@karrotmarket/react-monochrome-icon";

interface KarrotKaitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KarrotKaitModal: React.FC<KarrotKaitModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scaleUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-5 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 text-blue-200 inline-flex items-center">
              <IconCheckmarkShieldFill />
            </span>
            <div>
              <div className="text-[10px] text-blue-200 font-bold">한국정보통신진흥협회 (KAIT)</div>
              <h3 className="text-sm font-black">이동통신 온라인 사전승낙서</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white rounded-full"
          >
            <span className="w-5 h-5 inline-flex items-center justify-center">
              <IconXmarkLine />
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs flex-1">
          {/* Certificate Banner */}
          <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200 flex items-start gap-2.5">
            <span className="w-5 h-5 text-blue-600 shrink-0 mt-0.5 inline-flex items-center">
              <IconCheckmarkBadgeFill />
            </span>
            <div className="text-[#212124]">
              <div className="font-bold text-blue-950">공식 이동통신 판매 사전승낙점</div>
              <p className="text-blue-900 text-[11px] mt-0.5 leading-relaxed">
                「단말기유통법」 제8조에 의거 협회로부터 정식 승낙을 획득한 공식 온라인 판매점입니다.
              </p>
            </div>
          </div>

          {/* Certificate Spec Table */}
          <div className="border border-[#EAEBEE] rounded-2xl overflow-hidden">
            <div className="divide-y divide-[#F2F3F6]">
              <div className="grid grid-cols-3 p-2.5 items-center bg-[#FAFAFA]">
                <span className="text-[#868B94] font-medium">상호명</span>
                <span className="col-span-2 font-bold text-[#212124]">당근모바일 공식온라인점</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 items-center">
                <span className="text-[#868B94] font-medium">사전승낙번호</span>
                <span className="col-span-2 font-mono font-bold text-blue-600">2026-KAIT-DG8920</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 items-center bg-[#FAFAFA]">
                <span className="text-[#868B94] font-medium">대표자명</span>
                <span className="col-span-2 font-bold text-[#212124]">김당근</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 items-center">
                <span className="text-[#868B94] font-medium">사업자등록번호</span>
                <span className="col-span-2 font-mono text-[#212124]">123-86-09920</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 items-center bg-[#FAFAFA]">
                <span className="text-[#868B94] font-medium">통신판매업신고</span>
                <span className="col-span-2 text-[#212124]">제 2026-서울강남-0412호</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 items-center">
                <span className="text-[#868B94] font-medium">유효기간</span>
                <span className="col-span-2 font-mono text-green-700 font-bold">2026.01.01 ~ 2028.12.31 (유효)</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-[11px] text-[#4D5159]">
            <span className="flex items-center gap-1">
              <span className="w-3.5 h-3.5 text-green-600 inline-flex items-center">
                <IconCheckmarkCircleFill />
              </span>
              KAIT 시스템 실시간 검증 완료
            </span>
            <a
              href="https://www.ictmarket.or.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-bold hover:underline"
            >
              협회 진위확인 ↗
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#F8F9FA] border-t border-[#EAEBEE] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#212124] text-white font-bold rounded-xl text-xs"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
