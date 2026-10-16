import React, { useState, useRef, useEffect } from 'react';
import { useMathVerse } from '../context/MathVerseContext';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Lightbulb,
  Trash2,
  ArrowUpRight,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  AlertCircle,
  BarChart2,
  AlertTriangle,
  X,
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { formatMathNotation } from '../utils/formatMath';
import {
  recordAIFeedback,
  getAIFeedbackHistory,
  incrementAITotalAnswers,
  getAIFeedbackStats,
} from '../utils/aiFeedback';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  userQuestion?: string;
}

const PRESET_QUESTIONS = [
  'Giải phương trình này giúp em: 2x + 5 = 15',
  'Vì sao hai số âm nhân với nhau lại ra số dương? [(-3) . (-4) = 12]',
  'Cách tính diện tích hình thang và mẹo ghi nhớ bằng thơ?',
  'Định lý Pythagore là gì và áp dụng trong tam giác vuông thế nào?',
  'Quy tắc quy đồng mẫu số nhiều phân số gồm những bước nào?',
  'Hệ thức Vi-ét dùng để làm gì trong phương trình bậc hai?',
];

export const MathBotChat: React.FC = () => {
  const { user, setActiveTab } = useMathVerse();
  const currentGrade = user?.grade || 6;

  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      role: 'assistant',
      content: `Chào ${user?.name || 'em'}! 🚀 Thầy là **MathBot** – Gia sư Trợ lý AI Toán học đồng hành cùng em trong chương trình Toán THCS (Lớp ${currentGrade}).\n\nEm đang gặp khó khăn ở bài toán hay công thức nào? Hãy gửi đề bài hoặc nhấn vào các gợi ý bên dưới để chúng mình cùng khám phá từng bước nhé!`,
      timestamp: Date.now(),
      userQuestion: 'Lời chào khởi động & Giới thiệu MathBot AI',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, 'helpful' | 'wrong'>>(() => {
    const history = getAIFeedbackHistory();
    const map: Record<string, 'helpful' | 'wrong'> = {};
    history.forEach((h) => {
      if (h.messageId) {
        map[h.messageId] = h.rating;
      }
    });
    return map;
  });
  const [feedbackToast, setFeedbackToast] = useState<{
    message: string;
    type: 'success' | 'warning';
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    soundManager.playClickSound();
    setInput('');

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Educational fallback generator when server/network is unavailable
    const generateClientFallback = (query: string, gradeNum: number): string => {
      const q = query.toLowerCase();
      if (q.includes('phương trình') || q.includes('tìm x') || q.includes('2x')) {
        return `✨ **Hướng dẫn giải phương trình cho em:**\n\n` +
          `**Nguyên tắc "Chuyển vế đổi dấu":**\n` +
          `• Khi chuyển một số hạng từ vế này sang vế kia, ta phải đổi dấu của số hạng đó (+ thành -, - thành +).\n` +
          `• Ví dụ tìm x: 2x + 5 = 15\n` +
          `  - **Bước 1:** Chuyển +5 sang vế phải thành -5:\n` +
          `    2x = 15 - 5 => 2x = 10\n` +
          `  - **Bước 2:** Chia cả hai vế cho 2:\n` +
          `    x = 10 : 2 = 5\n` +
          `  - **Kết luận:** Vậy nghiệm của phương trình là x = 5.\n\n` +
          `💡 *Mẹo của MathBot:* Luôn thử lại đáp án bằng cách thay x vào phương trình ban đầu nhé!`;
      }
      if (q.includes('phân số') || q.includes('quy đồng') || q.includes('mẫu số')) {
        return `✨ **Bí quyết với Phân số (Toán Lớp ${gradeNum}):**\n\n` +
          `**1. Quy đồng mẫu số 3 bước cực dễ:**\n` +
          `• **Bước 1:** Tìm Mẫu số chung (thường là BCNN của các mẫu số).\n` +
          `• **Bước 2:** Tìm thừa số phụ bằng cách lấy Mẫu chung chia cho từng mẫu.\n` +
          `• **Bước 3:** Nhân cả tử và mẫu với thừa số phụ tương ứng.\n\n` +
          `💡 *Ví dụ:* Cộng 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Em đã hiểu chưa nào?`;
      }
      if (q.includes('hình thang') || q.includes('diện tích hình thang')) {
        return `✨ **Công thức diện tích hình thang:**\n\n` +
          `📐 **Công thức:** S = [(a + b) · h] / 2\n` +
          `• a: đáy nhỏ, b: đáy lớn (cùng đơn vị đo)\n` +
          `• h: chiều cao tương ứng\n\n` +
          `🎵 *Bài thơ nhớ nhanh:* \n` +
          `"Muốn tính diện tích hình thang\n` +
          `Đáy lớn đáy nhỏ ta mang cộng vào\n` +
          `Thế rồi nhân với chiều cao\n` +
          `Chia đôi lấy nửa thế nào cũng ra!"`;
      }
      if (q.includes('tam giác') || q.includes('pythagore') || q.includes('pitago')) {
        return `✨ **Định lý Pythagore (Toán 7 & 8):**\n\n` +
          `📐 **Trong một tam giác vuông:**\n` +
          `Bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông: c² = a² + b².\n\n` +
          `• Bộ ba số quen thuộc: (3, 4, 5) vì 3² + 4² = 9 + 16 = 25 = 5².\n` +
          `• Bộ ba số khác: (6, 8, 10), (5, 12, 13).\n\n` +
          `💡 *Ứng dụng:* Khi biết độ dài 2 cạnh bất kì của tam giác vuông, ta luôn tính được cạnh còn lại!`;
      }
      if (q.includes('số âm') || q.includes('số nguyên') || q.includes('dấu')) {
        return `✨ **Quy tắc dấu khi nhân, chia số nguyên:**\n\n` +
          `• **Cùng dấu ra DƯƠNG:**\n` +
          `  (+) × (+) = (+)\n` +
          `  (-) × (-) = (+) (Ví dụ: (-3) × (-4) = +12)\n\n` +
          `• **Khác dấu ra ÂM:**\n` +
          `  (+) × (-) = (-)\n` +
          `  (-) × (+) = (-) (Ví dụ: (-3) × 4 = -12)\n\n` +
          `💡 *Cách hiểu dễ nhớ:* "Kẻ thù của kẻ thù là bạn" (âm nhân âm thành dương)!`;
      }
      return `✨ **Chào em! MathBot rất vui được hỗ trợ em môn Toán Lớp ${gradeNum}!**\n\n` +
        `Đối với câu hỏi "${query}":\n` +
        `1. Em hãy chia sẻ chi tiết số liệu hoặc công thức cần giải.\n` +
        `2. Em đã thực hiện được đến bước nào rồi?\n\n` +
        `MathBot sẵn sàng hướng dẫn từng bước để em nắm chắc bản chất bài toán nhé! 🚀`;
    };

    try {
      let botReply = '';
      let fetchSuccess = false;

      // API Endpoint selection: support standard /api/mathbot or environment-configured serverless URL
      const apiUrl = (import.meta as any).env?.VITE_MATHBOT_API_URL || '/api/mathbot';

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: textToSend,
            grade: currentGrade,
            topic: 'Toán THCS',
            history: messages.slice(-5).map((m) => ({
              role: m.role === 'user' ? 'user' : 'model',
              content: m.content,
            })),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.reply) {
            botReply = data.reply;
            fetchSuccess = true;
          }
        }
      } catch (networkErr) {
        console.warn('Network call to backend failed, using intelligent offline fallback:', networkErr);
      }

      if (!fetchSuccess) {
        botReply = generateClientFallback(textToSend, currentGrade);
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: formatMathNotation(botReply),
        timestamp: Date.now(),
        userQuestion: textToSend,
      };

      incrementAITotalAnswers(1);
      setMessages((prev) => [...prev, botMsg]);
      soundManager.playCorrectSound();
    } catch (err) {
      console.error('Lỗi MathBot:', err);
      const fallbackReply = generateClientFallback(textToSend, currentGrade);
      const fallbackMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'assistant',
        content: formatMathNotation(fallbackReply),
        timestamp: Date.now(),
        userQuestion: textToSend,
      };
      incrementAITotalAnswers(1);
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `w-${Date.now()}`,
        role: 'assistant',
        content: `Cuộc trò chuyện đã được làm mới. Em có câu hỏi Toán nào muốn hỏi MathBot không?`,
        timestamp: Date.now(),
        userQuestion: 'Làm mới cuộc hội thoại',
      },
    ]);
  };

  const handleFeedback = (
    messageId: string,
    rating: 'helpful' | 'wrong',
    questionText: string,
    answerText: string
  ) => {
    // Lưu lịch sử phản hồi vào localStorage (Nội dung câu hỏi, Câu trả lời AI, Thời gian)
    recordAIFeedback({
      messageId,
      question: questionText || 'Câu hỏi thảo luận với MathBot',
      answer: answerText,
      rating,
    });

    setFeedbackMap((prev) => ({ ...prev, [messageId]: rating }));

    if (rating === 'helpful') {
      soundManager.playCorrectSound();
      setFeedbackToast({
        message: 'Đã ghi nhận phản hồi "👍 Hữu ích". Cảm ơn em!',
        type: 'success',
      });
    } else {
      soundManager.playWrongSound();
      setFeedbackToast({
        message: 'Đã lưu phản hồi "👎 AI sai rồi" vào kho dữ liệu phản biện để cải thiện MathBot!',
        type: 'warning',
      });
    }

    setTimeout(() => {
      setFeedbackToast(null);
    }, 4000);
  };

  // Helper để lấy câu hỏi người dùng gần nhất với tin nhắn trợ lý
  const getPrecedingUserQuestion = (idx: number, fallback?: string): string => {
    if (fallback) return fallback;
    for (let i = idx - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        return messages[i].content;
      }
    }
    return 'Câu hỏi Toán THCS';
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] min-h-[500px] flex flex-col gap-2">
      {/* Hộp cảnh báo AI Disclaimer (Nằm HOÀN TOÀN NGOÀI khung chat, không che tin nhắn) */}
      {showDisclaimer && (
        <div className="px-3.5 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs shrink-0 flex items-start sm:items-center justify-between gap-3 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-start sm:items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
            <div className="text-[11px] sm:text-xs text-amber-200/90 leading-tight">
              <span className="font-bold text-amber-300 mr-1.5">⚠ Lưu ý:</span>
              <span>AI chỉ là công cụ hỗ trợ học tập. AI có thể đưa ra lời giải chưa chính xác hoặc bỏ sót bước. Hãy tự kiểm tra kết quả hoặc hỏi giáo viên khi cần.</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowDisclaimer(false)}
            className="p-1 rounded-lg hover:bg-amber-500/20 text-amber-400 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Đóng thông báo lưu ý"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Khung chat MathBot độc lập, 100% không gian cho cuộc hội thoại */}
      <div className="flex-1 flex flex-col bg-slate-900/90 border border-slate-700/80 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden relative">
        {/* Toast thông báo phản hồi */}
        {feedbackToast && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
            {feedbackToast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span className="text-xs text-slate-200 font-medium">{feedbackToast.message}</span>
          </div>
        )}

        {/* Chat Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/40 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-md shadow-indigo-600/20">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                  MathBot AI
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                  Online
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[10px] font-semibold">
                  Chuẩn phản biện AI 2026
                </span>
                {/* Nút xem lại Lưu ý AI */}
                {!showDisclaimer && (
                  <button
                    onClick={() => setShowDisclaimer(true)}
                    title="Mở lại lưu ý về AI"
                    className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    <span>Lưu ý AI</span>
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Gia sư giải thích từng bước • Phù hợp Toán Lớp {currentGrade}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('analytics')}
              title="Xem thống kê phản biện AI"
              className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700/60"
            >
              <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Thống kê phản biện</span>
            </button>
            <button
              onClick={handleClearChat}
              title="Xóa lịch sử trò chuyện"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preset Pills */}
        <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <span className="text-[11px] text-slate-400 font-semibold whitespace-nowrap flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Câu hỏi nhanh:
          </span>
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => handleSend(q)}
              className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-400 hover:bg-indigo-950/40 text-slate-300 hover:text-cyan-300 text-xs whitespace-nowrap transition-all cursor-pointer flex items-center gap-1"
            >
              <span>{q.length > 32 ? q.slice(0, 32) + '...' : q}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500" />
            </button>
          ))}
        </div>

        {/* Messages Scroll Area - Hoàn toàn thông thoáng không bị che khuất */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            const feedback = feedbackMap[m.id];
            const questionText = getPrecedingUserQuestion(idx, m.userQuestion);

            return (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 border ${
                    isUser
                      ? 'bg-cyan-600/30 border-cyan-400/40 text-cyan-200'
                      : 'bg-indigo-600/30 border-indigo-400/40 text-indigo-200'
                  }`}
                >
                  {isUser ? user?.avatar || '👤' : '🤖'}
                </div>

                {/* Message Bubble + Feedback Buttons */}
                <div className="max-w-[85%] sm:max-w-[75%] space-y-1.5">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/10'
                        : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                    }`}
                  >
                    {m.content}
                  </div>

                  {/* 2 Nút phản hồi sau mỗi câu trả lời của AI: 👍 Hữu ích và 👎 AI sai rồi */}
                  {!isUser && (
                    <div className="flex items-center gap-2 pt-0.5 px-1 flex-wrap">
                      <span className="text-[11px] text-slate-400 font-medium">Đánh giá câu trả lời:</span>
                      
                      {/* Nút 👍 Hữu ích */}
                      <button
                        type="button"
                        onClick={() => handleFeedback(m.id, 'helpful', questionText, m.content)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                          feedback === 'helpful'
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60 shadow-sm shadow-emerald-500/20'
                            : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border-slate-800 hover:border-emerald-500/40'
                        }`}
                        title="Đánh giá câu trả lời chính xác, dễ hiểu"
                      >
                        <span>👍</span>
                        <span>Hữu ích</span>
                      </button>

                      {/* Nút 👎 AI sai rồi */}
                      <button
                        type="button"
                        onClick={() => handleFeedback(m.id, 'wrong', questionText, m.content)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                          feedback === 'wrong'
                            ? 'bg-rose-950/80 text-rose-300 border-rose-500/60 shadow-sm shadow-rose-500/20'
                            : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-rose-300 border-slate-800 hover:border-rose-500/40'
                        }`}
                        title="Báo cáo câu trả lời chưa đúng hoặc sai bước giải"
                      >
                        <span>👎</span>
                        <span>AI sai rồi</span>
                      </button>

                      {feedback && (
                        <span className="text-[10px] text-slate-400 italic">
                          {feedback === 'helpful' ? '(Đã khen 👍)' : '(Đã báo sai 👎)'}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-sm shrink-0">
                🤖
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 rounded-tl-none text-slate-400 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>MathBot đang suy nghĩ và chuẩn bị từng bước giải...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 shrink-0 space-y-1.5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi bài tập, công thức hoặc cách giải bài toán..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 sm:py-3 bg-slate-900 border border-slate-700/80 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-40 text-white font-bold transition-all shadow-md shadow-indigo-500/20 cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          {/* Dòng ghi chú nhỏ gọn chân trang, thanh lịch như chuẩn Gemini/ChatGPT */}
          <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
            <span className="text-amber-400 font-semibold">⚠</span>
            <span>MathBot có thể mắc lỗi • Luôn kiểm tra lại lời giải và tham khảo giáo viên</span>
          </div>
        </div>
      </div>
    </div>
  );
};
