"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, X, ExternalLink, Award } from "lucide-react";

interface KaitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KaitModal: React.FC<KaitModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-scaleUp">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/15 rounded-xl backdrop-blur-md">
              <Award className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="text-xs font-semibold text-blue-200 tracking-wider">한국정보통신진흥협회 (KAIT)</div>
              <h3 className="text-lg font-bold">이동통신서비스 온라인 사전승낙서</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Certificate Badge Banner */}
          <div className="p-4 bg-blue-50/80 rounded-xl border border-blue-200 flex items-start gap-3">
            <ShieldCheck className="w-7 h-7 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold text-blue-950">공식 이동통신 판매 사전승낙 인증 판매점</p>
              <p className="text-blue-800 text-xs mt-1 leading-relaxed">
                본 판매점은 「이동통신단말장치 유통구조 개선에 관한 법률」 제8조(판매점 선임에 대한 승낙)에 의거하여
                협회로부터 공식 승낙을 받은 정식 온라인 판매점입니다.
              </p>
            </div>
          </div>

          {/* Certificate Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden text-sm">
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 font-medium text-gray-700 text-xs py-2.5 px-4">
              <span>항목</span>
              <span className="col-span-2">인증 승낙 상세 정보</span>
            </div>

            <div className="divide-y divide-gray-100 text-xs sm:text-sm">
              <div className="grid grid-cols-3 py-3 px-4 items-center">
                <span className="text-gray-500 font-medium">상호명 (상점명)</span>
                <span className="col-span-2 font-bold text-gray-900">당근모바일 공식 온라인 판매점</span>
              </div>
              <div className="grid grid-cols-3 py-3 px-4 items-center">
                <span className="text-gray-500 font-medium">사전승낙 번호</span>
                <span className="col-span-2 font-mono font-bold text-blue-600">2026-KAIT-DG8920</span>
              </div>
              <div className="grid grid-cols-3 py-3 px-4 items-center">
                <span className="text-gray-500 font-medium">대표자명</span>
                <span className="col-span-2 text-gray-900 font-semibold">김당근</span>
              </div>
              <div className="grid grid-cols-3 py-3 px-4 items-center">
                <span className="text-gray-500 font-medium">사업자등록번호</span>
                <span className="col-span-2 font-mono text-gray-800">123-86-09920</span>
              </div>
              <div className="grid grid-cols-3 py-3 px-4 items-center">
                <span className="text-gray-500 font-medium">통신판매업 신고</span>
                <span className="col-span-2 text-gray-800">제 2026-서울강남-0412호</span>
              </div>
              <div className="grid grid-cols-3 py-3 px-4 items-center">
                <span className="text-gray-500 font-medium">취급 통신사</span>
                <span className="col-span-2 flex items-center gap-1.5 font-bold">
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">SKT</span>
                  <span className="px-2 py-0.5 bg-cyan-100 text-cyan-800 rounded text-xs">KT</span>
                  <span className="px-2 py-0.5 bg-pink-100 text-pink-700 rounded text-xs">LG U+</span>
                </span>
              </div>
              <div className="grid grid-cols-3 py-3 px-4 items-center">
                <span className="text-gray-500 font-medium">승낙 유효기간</span>
                <span className="col-span-2 text-gray-700 font-mono">2026. 01. 01 ~ 2028. 12. 31 (유효)</span>
              </div>
            </div>
          </div>

          {/* Verification Stamp & Notice */}
          <div className="p-3.5 bg-gray-50 rounded-xl flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>KAIT 사전승낙시스템 실시간 유효성 검증 완료</span>
            </div>
            <a
              href="https://www.ictmarket.or.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:underline"
            >
              협회 진위확인 <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-100 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl text-sm transition-colors shadow-xs"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
