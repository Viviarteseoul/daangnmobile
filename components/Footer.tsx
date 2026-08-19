"use client";

import React from "react";
import { ShieldCheck, Award, Lock, ExternalLink, HelpCircle } from "lucide-react";

interface FooterProps {
  onOpenKait: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenKait }) => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-xs pt-12 pb-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Compliance Banner Grid (KAIT + SGI + Security) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-8 border-b border-gray-800">
          {/* 1. KAIT 사전승낙 인증 링크 배너 (필수 요건) */}
          <div
            onClick={onOpenKait}
            className="cursor-pointer bg-gray-800/80 hover:bg-gray-800 p-4 rounded-2xl border border-gray-700/70 transition-all group flex items-start gap-3.5"
          >
            <div className="p-2.5 bg-blue-900/60 text-blue-400 rounded-xl group-hover:scale-105 transition-transform shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                <span>KAIT 온라인 사전승낙서</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                승낙번호: 2026-KAIT-DG8920 (클릭 시 협회 공인 인증 팝업 연동)
              </p>
            </div>
          </div>

          {/* 2. SGI 서울보증보험 가입 */}
          <div className="bg-gray-800/80 p-4 rounded-2xl border border-gray-700/70 flex items-start gap-3.5">
            <div className="p-2.5 bg-emerald-900/60 text-emerald-400 rounded-xl shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">SGI 서울보증 안심 가입</div>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                단말기 선출고 여신 및 개통 대금 100% 안심 담보 설정 완료
              </p>
            </div>
          </div>

          {/* 3. 본인인증 및 개인정보보호 */}
          <div className="bg-gray-800/80 p-4 rounded-2xl border border-gray-700/70 flex items-start gap-3.5">
            <div className="p-2.5 bg-orange-900/60 text-orange-400 rounded-xl shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">PASS • 256bit 암호화</div>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                명의도용 방지 본인인증 및 신청서 데이터 구간 암호화 처리
              </p>
            </div>
          </div>
        </div>

        {/* Company Legal & Compliance Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs text-gray-400 leading-relaxed">
          <div className="lg:col-span-8 space-y-2.5">
            <div className="flex items-center gap-2 text-white font-extrabold text-base mb-3">
              <span>🥕 당근모바일 주식회사</span>
              <span className="px-2 py-0.5 bg-gray-800 text-gray-300 text-[10px] rounded-md font-medium">
                온라인 공식 이동통신 판매점
              </span>
            </div>
            <p>
              대표자: 김당근 | 사업자등록번호: 123-86-09920 | 통신판매업 신고번호: 제 2026-서울강남-0412호
            </p>
            <p>
              주소: 서울특별시 강남구 테헤란로 142 당근모바일 타워 8층 | 개인정보보호책임자: 이모바일 (privacy@daangnmobile.co.kr)
            </p>
            <p>
              통신사 공식 제휴 코드: SKT 대리점 코드 89201 | KT 대리점 코드 34102 | LGU+ 대리점 코드 59281
            </p>
            <p className="text-gray-500 pt-2 text-[11px]">
              ※ 당근모바일은 「단말기유통법」 및 방송통신위원회 가이드라인을 준수하며 불법 보조금 및 허위 과장 광고를 일절
              행하지 않습니다. 공시지원금 및 선택약정 할인 혜택은 이통 3사의 공시 기준에 따릅니다.
            </p>
          </div>

          {/* Customer Support Info */}
          <div className="lg:col-span-4 bg-gray-800/40 p-5 rounded-2xl border border-gray-800 space-y-2">
            <div className="text-xs font-bold text-gray-300">당근모바일 고객감동센터</div>
            <div className="text-xl font-black text-white">1544-0992</div>
            <div className="text-[11px] text-gray-400 space-y-0.5">
              <p>평일 09:30 ~ 18:30 (점심시간 12:30 ~ 13:30)</p>
              <p>주말 / 공휴일 카카오 1:1 채팅상담 운영</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-500">
          <div>© 2026 DaangnMobile Inc. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300">이용약관</a>
            <a href="#" className="hover:text-gray-300 font-bold text-gray-400">개인정보처리방침</a>
            <button onClick={onOpenKait} className="hover:text-gray-300 underline">
              사전승낙서 진위확인
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
