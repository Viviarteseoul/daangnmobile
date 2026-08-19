"use client";

import React from "react";
import { ApplicationSubmission } from "@/types/application";
import {
  IconXmarkLine,
  IconCheckmarkShieldFill,
  IconCheckmarkBadgeFill,
  IconCheckmarkCircleFill,
  IconSparkle2Fill,
} from "@karrotmarket/react-monochrome-icon";

interface KarrotAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: ApplicationSubmission[];
  onUpdateStatus: (id: string, newStatus: ApplicationSubmission["status"]) => void;
}

export const KarrotAdminModal: React.FC<KarrotAdminModalProps> = ({
  isOpen,
  onClose,
  applications,
  onUpdateStatus,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] animate-scaleUp">
        {/* Header */}
        <div className="bg-[#212124] text-white px-4 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 text-[#FF6F0F] inline-flex items-center">
              <IconCheckmarkShieldFill />
            </span>
            <div>
              <div className="text-[10px] text-gray-400 font-bold">이통 3사 개통 전산 심사</div>
              <h3 className="text-sm font-black">대리점 개통 관리 콘솔</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full">
            <span className="w-5 h-5 inline-flex items-center justify-center">
              <IconXmarkLine />
            </span>
          </button>
        </div>

        {/* 4 Essential System Status Grid */}
        <div className="p-3 bg-[#F8F9FA] border-b border-[#EAEBEE] grid grid-cols-2 gap-2 text-[11px] shrink-0">
          <div className="p-2 bg-white rounded-xl border border-[#EAEBEE]">
            <div className="text-[10px] text-[#868B94]">3사 개통 전산</div>
            <div className="font-bold text-green-700 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span>SKT • KT • LGU+ 연결됨</span>
            </div>
          </div>
          <div className="p-2 bg-white rounded-xl border border-[#EAEBEE]">
            <div className="text-[10px] text-[#868B94]">KAIT 사전승낙</div>
            <div className="font-bold text-blue-600 mt-0.5">DG8920 (정상)</div>
          </div>
          <div className="p-2 bg-white rounded-xl border border-[#EAEBEE]">
            <div className="text-[10px] text-[#868B94]">SGI 보증보험 여신</div>
            <div className="font-bold text-[#212124] mt-0.5">₩ 50,000,000</div>
          </div>
          <div className="p-2 bg-white rounded-xl border border-[#EAEBEE]">
            <div className="text-[10px] text-[#868B94]">PASS 본인인증</div>
            <div className="font-bold text-[#FF6F0F] mt-0.5">모듈 가동 중</div>
          </div>
        </div>

        {/* Applications List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          <div className="flex justify-between items-center text-xs font-bold text-[#212124]">
            <span>실시간 접수 목록 ({applications.length}건)</span>
          </div>

          {applications.map((app) => (
            <div key={app.id} className="p-3 bg-white border border-[#EAEBEE] rounded-2xl shadow-2xs space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                    {app.id}
                  </span>
                  <div className="font-bold text-[#212124] mt-1">
                    {app.applicantName} ({app.phone})
                  </div>
                  <div className="text-[#868B94] text-[11px]">
                    {app.phoneModel} • {app.carrier} {app.joinType}
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-[#FFF2E8] text-[#FF6F0F] text-[10px] font-black rounded-md">
                  {app.status}
                </span>
              </div>

              {/* Status Transition Buttons */}
              <div className="pt-2 border-t border-[#F2F3F6] flex items-center justify-between gap-1 flex-wrap">
                <span className="text-[10px] text-[#868B94]">상태 변경:</span>
                <div className="flex gap-1 flex-wrap">
                  {(["접수완료", "전산심사중", "개통승인", "배송중", "개통완료"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => onUpdateStatus(app.id, st)}
                      className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all ${
                        app.status === st ? "bg-[#212124] text-white" : "bg-[#F2F3F6] text-[#4D5159] hover:bg-[#EAEBEE]"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
