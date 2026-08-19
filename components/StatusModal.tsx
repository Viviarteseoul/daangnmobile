"use client";

import React, { useState } from "react";
import { ApplicationSubmission } from "@/types/application";
import {
  ClipboardList,
  Search,
  CheckCircle,
  Clock,
  Truck,
  Smartphone,
  X,
  FileText,
  ShieldCheck,
} from "lucide-react";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: ApplicationSubmission[];
}

export const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  applications,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const matched = applications.filter(
    (app) =>
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantName.includes(searchTerm) ||
      app.phone.includes(searchTerm)
  );

  const displayList = searchTerm ? matched : applications;

  const getStatusStepIndex = (status: ApplicationSubmission["status"]) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gray-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl">
              <ClipboardList className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400">비대면 개통 실시간 조회</div>
              <h3 className="text-base sm:text-lg font-bold">내 가입 신청 내역</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-100 shrink-0">
          <div className="relative">
            <input
              type="text"
              placeholder="신청자명, 연락처(뒷 4자리) 또는 접수번호(DG-...) 입력"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#FF6F0F] focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Content List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {displayList.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <FileText className="w-12 h-12 text-gray-300 mx-auto" />
              <div className="text-sm font-bold text-gray-700">조회된 신청 내역이 없습니다.</div>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                휴대폰 상품 목록에서 [3분 빠른 신청]을 완료하시면 실시간 개통 심사 상태를 확인하실 수 있습니다.
              </p>
            </div>
          ) : (
            displayList.map((app) => {
              const currentStep = getStatusStepIndex(app.status);
              return (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-4 hover:border-orange-200 transition-colors"
                >
                  {/* Top Info */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                      <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {app.id}
                      </span>
                      <div className="font-bold text-gray-900 text-sm mt-1">
                        {app.phoneModel} ({app.phoneColor})
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs px-2.5 py-1 bg-orange-100 text-[#FF6F0F] font-bold rounded-full">
                        {app.status}
                      </span>
                      <div className="text-[11px] text-gray-400 mt-1">{app.submittedAt}</div>
                    </div>
                  </div>

                  {/* 5-Step Progress Pipeline */}
                  <div className="space-y-1.5 pt-1">
                    <div className="grid grid-cols-5 text-[10px] sm:text-xs font-bold text-center">
                      <span className={currentStep >= 1 ? "text-[#FF6F0F]" : "text-gray-400"}>1. 접수완료</span>
                      <span className={currentStep >= 2 ? "text-[#FF6F0F]" : "text-gray-400"}>2. 전산심사</span>
                      <span className={currentStep >= 3 ? "text-[#FF6F0F]" : "text-gray-400"}>3. 개통승인</span>
                      <span className={currentStep >= 4 ? "text-[#FF6F0F]" : "text-gray-400"}>4. 안심배송</span>
                      <span className={currentStep >= 5 ? "text-[#FF6F0F]" : "text-gray-400"}>5. 개통완료</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div
                          key={s}
                          className={`h-2 rounded-full transition-all ${
                            currentStep >= s ? "bg-[#FF6F0F]" : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Detailed Specs */}
                  <div className="p-3 bg-gray-50 rounded-xl text-xs space-y-1.5 text-gray-600">
                    <div className="flex justify-between">
                      <span>신청자</span>
                      <span className="font-semibold text-gray-900">
                        {app.applicantName} ({app.phone.slice(0, 3)}-****-{app.phone.slice(-4)})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>가입조건</span>
                      <span className="font-semibold text-gray-900">
                        {app.carrier} / {app.joinType} ({app.discountType})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>월 청구금액</span>
                      <span className="font-bold text-[#FF6F0F]">{app.estimatedMonthly.toLocaleString()}원/월</span>
                    </div>
                    <div className="flex justify-between">
                      <span>수령지</span>
                      <span className="text-gray-900 font-medium truncate max-w-xs">{app.address}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3.5 border-t border-gray-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-xs transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
