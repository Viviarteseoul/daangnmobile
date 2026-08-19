"use client";

import React, { useState, useRef, useEffect } from "react";
import { Phone } from "@/data/phones";
import {
  IconXmarkLine,
  IconCheckmarkBadgeFill,
  IconCheckmarkShieldFill,
  IconSparkle2Fill,
  IconChevronRightLine,
  IconArrowLeftLine,
} from "@karrotmarket/react-monochrome-icon";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

interface KarrotChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone: Phone | null;
  onOpenApply: (phone: Phone) => void;
}

export const KarrotChatModal: React.FC<KarrotChatModalProps> = ({
  isOpen,
  onClose,
  phone,
  onOpenApply,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const initialPhoneName = phone ? phone.name : "최신 스마트폰";
      setMessages([
        {
          id: "1",
          sender: "bot",
          text: `안녕하세요 이웃님! 당근모바일 공식인증 판매점입니다 🥕\n\n문의주신 ${initialPhoneName} 모델은 현재 이통 3사 공시지원금 + 당근 단독 추가지원금이 적용되어 역대 최저가로 전국 무료배송(수도권 당일 퀵) 가능합니다!`,
          timestamp: "방금 전",
        },
        {
          id: "2",
          sender: "bot",
          text: `궁금하신 통신사(SKT/KT/LGU+) 혜택이나 가입 조건(번호이동/기기변경)이 있으시면 아래 질문을 누르시거나 편하게 채팅을 남겨주세요! 😊`,
          timestamp: "방금 전",
        },
      ]);
    }
  }, [isOpen, phone]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: "방금 전",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");

    // Simulate smart bot response
    setTimeout(() => {
      let replyText = "네, 이웃님! 친절히 안내해 드리겠습니다.";

      if (text.includes("퀵") || text.includes("배송")) {
        replyText =
          "🛵 당일 안심 퀵 서비스는 서울 및 수도권 전 지역 오후 4시 이전 접수 건에 한하여 100% 당일 무료로 도착합니다! 수령 후 즉시 개통 처리해 드립니다.";
      } else if (text.includes("사전승낙") || text.includes("보증") || text.includes("안전")) {
        replyText =
          "🛡️ 당근모바일은 한국정보통신진흥협회(KAIT) 공식 사전승낙번호(2026-KAIT-DG8920) 및 SGI 서울보증보험 5,000만 원 여신 담보에 100% 가입된 공식 인증점입니다. 안심하고 신청하셔도 됩니다!";
      } else if (text.includes("번호이동") || text.includes("기기변경")) {
        replyText =
          "💡 번호이동(통신사 변경) 시 당근 단독 추가지원금이 최대 38만~43만 원까지 지급되어 할부원금이 가장 저렴합니다! 기기변경 시에는 기존 결합 혜택을 그대로 유지하실 수 있습니다.";
      } else if (text.includes("반납") || text.includes("보상")) {
        replyText =
          "💰 쓰던 기존 휴대폰 반납 시 기종에 따라 최대 20만 원 추가 보상금을 계좌로 즉시 입금해 드리는 당근 제휴 프로모션이 진행 중입니다!";
      } else {
        replyText = `네, 이웃님! [${phone ? phone.name : "해당 단말기"}] 모델은 3분 간편 신청서를 작성해 주시면 전산에서 즉시 실시간 심사 후 전문 상담원이 1:1로 맞춤 진행해 드립니다.`;
      }

      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: replyText,
        timestamp: "방금 전",
      };

      setMessages((prev) => [...prev, botReply]);
    }, 600);
  };

  const quickQuestions = [
    "🛵 오늘 바로 퀵으로 받을 수 있나요?",
    "⚡️ 번호이동 vs 기기변경 혜택 차이가 어떻게 되나요?",
    "🛡️ KAIT 사전승낙서와 서울보증 가입점 맞나요?",
    "💰 쓰던 폰 반납 추가 보상금은 얼마인가요?",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#F2F3F6] h-full sm:h-[85vh] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scaleUp">
        {/* Chat Header */}
        <div className="bg-white px-4 py-3 border-b border-[#EAEBEE] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#FF6F0F] text-white flex items-center justify-center text-base font-bold shadow-2xs">
              🥕
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-[#212124]">당근모바일 공식상담원</span>
                <span className="w-3.5 h-3.5 text-blue-600 inline-flex items-center">
                  <IconCheckmarkBadgeFill />
                </span>
              </div>
              <div className="text-[11px] text-[#868B94]">
                전국 공식인증 판매점 • 보통 5분 내 응답 • 매너온도 99.0℃
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#868B94] hover:text-[#212124] rounded-full"
          >
            <span className="w-5 h-5 inline-flex items-center justify-center">
              <IconXmarkLine />
            </span>
          </button>
        </div>

        {/* Pinned Product Preview Bar */}
        {phone && (
          <div className="bg-white px-4 py-2.5 border-b border-[#EAEBEE] flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={phone.image}
                alt={phone.name}
                className="w-10 h-10 object-contain rounded-lg bg-[#F8F9FA] p-1 border border-[#F2F3F6] shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#212124] truncate">{phone.name}</div>
                <div className="text-[11px] font-black text-[#FF6F0F]">
                  할부원금 {Math.max(0, phone.releasePrice - phone.carrierDiscounts.skt.gongsi - phone.carrierDiscounts.skt.storeDiscount).toLocaleString()}원
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenApply(phone);
              }}
              className="px-3 py-1.5 bg-[#FF6F0F] hover:bg-[#e85b06] text-white text-[11px] font-black rounded-xl shrink-0 shadow-2xs"
            >
              바로 신청
            </button>
          </div>
        )}

        {/* Message Bubble List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div className="flex items-end gap-1.5 max-w-[85%]">
                {msg.sender === "user" && (
                  <span className="text-[10px] text-[#868B94] shrink-0">{msg.timestamp}</span>
                )}
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed break-words whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-[#FF6F0F] text-white rounded-br-xs shadow-xs"
                      : "bg-white text-[#212124] rounded-bl-xs border border-[#EAEBEE] shadow-2xs"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "bot" && (
                  <span className="text-[10px] text-[#868B94] shrink-0">{msg.timestamp}</span>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-white border-t border-[#EAEBEE] overflow-x-auto flex gap-1.5 shrink-0 scrollbar-none">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 bg-[#F2F3F6] hover:bg-[#FFF2E8] hover:text-[#FF6F0F] text-[#4D5159] text-[11px] font-semibold rounded-full shrink-0 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#EAEBEE] flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="당근 상담원에게 메시지 보내기..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            className="flex-1 px-3.5 py-2.5 bg-[#F2F3F6] rounded-2xl text-xs font-medium text-[#212124] focus:bg-white focus:ring-2 focus:ring-[#FF6F0F] focus:outline-none"
          />
          <button
            onClick={() => handleSendMessage()}
            className="px-4 py-2.5 bg-[#FF6F0F] hover:bg-[#e85b06] text-white text-xs font-black rounded-2xl transition-colors shrink-0 shadow-2xs"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};
