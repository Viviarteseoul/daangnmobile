"use client";

import React from "react";
import { ApplicationSubmission } from "@/types/application";
import {
  SlidersHorizontal,
  ShieldCheck,
  Zap,
  RotateCcw,
  CheckCircle2,
  X,
  Server,
  Building,
  Award,
} from "lucide-react";

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  applications: ApplicationSubmission[];
  onUpdateStatus: (id: string, newStatus: ApplicationSubmission["status"]) => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  applications,
  onUpdateStatus,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl">
              <SlidersHorizontal className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400">판매점 대리점 개통 관리 전산</div>
              <h3 className="text-base sm:text-lg font-bold">당근모바일 온라인 개통 심사 콘솔</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Essential System Status Bar */}
        <div className="bg-gray-100 px-5 sm:px-6 py-3 border-b border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-gray-200">
            <Server className="w-4 h-4 text-green-600 shrink-0" />
            <div>
              <div className="text-[10px] text-gray-500 font-medium">3사 개통 전산 API</div>
              <div className="font-bold text-gray-900 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> 정상 연동 (3사)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-gray-200">
            <Award className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <div className="text-[10px] text-gray-500 font-medium">KAIT 사전승낙서</div>
              <div className="font-bold text-blue-600">공식 승낙 (유효)</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-gray-200">
            <Building className="w-4 h-4 text-purple-600 shrink-0" />
            <div>
              <div className="text-[10px] text-gray-500 font-medium">SGI 서울보증 여신</div>
              <div className="font-bold text-gray-900">₩ 50,000,000</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-gray-200">
            <ShieldCheck className="w-4 h-4 text-[#FF6F0F] shrink-0" />
            <div>
              <div className="text-[10px] text-gray-500 font-medium">PASS 본인인증 모듈</div>
              <div className="font-bold text-gray-900">정상 가동 중</div>
            </div>
          </div>
        </div>

        {/* Real-time Order Pipeline Table */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <span>실시간 접수 신청건 관리</span>
              <span className="px-2 py-0.5 bg-orange-100 text-[#FF6F0F] text-xs rounded-full font-extrabold">
                {applications.length}건
              </span>
            </h4>
            <span className="text-xs text-gray-500">
              버튼을 클릭하여 전산 심사 및 개통 상태를 실시간 변경할 수 있습니다.
            </span>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-500 text-xs">
              현재 접수된 신청 건이 없습니다.
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                          {app.id}
                        </span>
                        <span className="text-xs font-bold text-gray-800">{app.applicantName} 고객님</span>
                        <span className="text-xs text-gray-500">({app.phone})</span>
                      </div>
                      <div className="text-xs font-bold text-gray-900 mt-1">
                        {app.phoneModel} ({app.phoneColor}) • {app.carrier} {app.joinType} ({app.discountType})
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className="text-xs font-bold text-gray-500">현재 상태:</span>
                      <span className="text-xs px-2.5 py-1 bg-orange-100 text-[#FF6F0F] font-extrabold rounded-lg">
                        {app.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-gray-50 p-2.5 rounded-xl">
                    <div>
                      <span className="font-medium text-gray-500">수령방식/주소: </span>
                      <span className="text-gray-900 font-semibold">{app.shippingType}</span> - {app.address}
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">접수일시: </span>
                      <span className="text-gray-900">{app.submittedAt}</span>
                    </div>
                  </div>

                  {/* Status Transition Button Toolbar */}
                  <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
                    <span className="text-[11px] text-gray-500 font-medium">전산 파이프라인 단계 변경:</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {(["접수완료", "전산심사중", "개통승인", "배송중", "개통완료"] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => onUpdateStatus(app.id, st)}
                          className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                            app.status === st
                              ? "bg-gray-900 text-white shadow-xs"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
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
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3.5 border-t border-gray-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-xs transition-colors"
          >
            전산 콘솔 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
