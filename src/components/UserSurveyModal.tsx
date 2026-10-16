import React, { useState } from 'react';
import { useMathVerse } from '../context/MathVerseContext';
import {
  Star,
  Sparkles,
  Heart,
  MessageSquare,
  CheckCircle2,
  X,
  Send,
  HelpCircle,
  ThumbsUp,
  Award,
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { saveUserSurvey, snoozeWeeklySurvey, SURVEY_FEATURES } from '../utils/userSurvey';

interface UserSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWeek?: number;
}

export const UserSurveyModal: React.FC<UserSurveyModalProps> = ({
  isOpen,
  onClose,
  currentWeek = 1,
}) => {
  const { user } = useMathVerse();

  // Câu 1: AI có dễ sử dụng không? (1-5 sao)
  const [easeRating, setEaseRating] = useState<number>(5);
  const [easeHover, setEaseHover] = useState<number>(0);

  // Câu 2: AI có giúp em học Toán tốt hơn không? (1-5 sao)
  const [helpRating, setHelpRating] = useState<number>(5);
  const [helpHover, setHelpHover] = useState<number>(0);

  // Câu 3: Em thích tính năng nào nhất?
  const [selectedFeature, setSelectedFeature] = useState<string>(SURVEY_FEATURES[0].label);

  // Câu 4: Góp ý thêm
  const [feedbackText, setFeedbackText] = useState<string>('');

  // Trạng thái đã gửi thành công
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const easeLabels: Record<number, string> = {
    1: 'Rất khó sử dụng',
    2: 'Hơi phức tạp',
    3: 'Bình thường',
    4: 'Dễ sử dụng',
    5: 'Cực kỳ trực quan & dễ dùng ⭐',
  };

  const helpLabels: Record<number, string> = {
    1: 'Chưa thấy hiệu quả',
    2: 'Ít giúp ích',
    3: 'Tạm ổn',
    4: 'Hiểu bài nhanh hơn',
    5: 'Tiến bộ vượt bậc & tự tin học Toán ⭐',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClickSound();

    saveUserSurvey({
      userName: user?.name || 'Học sinh MathVerse',
      grade: user?.grade || 6,
      weekNumber: currentWeek,
      easeOfUseRating: easeRating,
      helpfulnessRating: helpRating,
      favoriteFeature: selectedFeature,
      feedbackText: feedbackText.trim() || undefined,
    });

    soundManager.playCorrectSound();
    soundManager.triggerConfetti();
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2400);
  };

  const handleSnooze = () => {
    soundManager.playClickSound();
    snoozeWeeklySurvey();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 border border-indigo-500/40 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-7 max-h-[92vh] overflow-y-auto">
        {/* Glow hiệu ứng nền */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Nút đóng */}
        <button
          onClick={handleSnooze}
          type="button"
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Để sau"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              Cảm ơn em đã gửi khảo sát! 🎉
            </h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              Ý kiến quý báu của em giúp Vũ trụ MathVerse và Gia sư MathBot AI ngày càng hoàn thiện và thông minh hơn mỗi ngày.
            </p>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Em được cộng thưởng +30 XP khảo sát tích cực!</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="space-y-1.5 pr-8">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>Khảo sát sau mỗi tuần học</span>
                </span>
                <span className="text-xs text-slate-400">• Tuần {currentWeek}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                <span>Đánh giá trải nghiệm học Toán cùng AI</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Hãy cho thầy cô biết cảm nhận của em để cùng xây dựng nền tảng học Toán tốt nhất nhé!
              </p>
            </div>

            {/* CÂU 1: AI có dễ sử dụng không? */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
              <label className="text-sm font-bold text-white flex items-center justify-between">
                <span>1. AI có dễ sử dụng không?</span>
                <span className="text-xs font-mono text-amber-400 font-semibold">
                  {easeRating}/5 ⭐
                </span>
              </label>

              {/* 5 Ngôi sao tương tác */}
              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (easeHover || easeRating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setEaseHover(star)}
                      onMouseLeave={() => setEaseHover(0)}
                      onClick={() => {
                        soundManager.playClickSound();
                        setEaseRating(star);
                      }}
                      className="p-1.5 rounded-xl hover:bg-slate-800/80 transition-transform active:scale-90 cursor-pointer focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                          isFilled
                            ? 'text-amber-400 fill-amber-400 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                            : 'text-slate-600 hover:text-slate-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-indigo-300 font-medium">
                {easeLabels[easeHover || easeRating]}
              </p>
            </div>

            {/* CÂU 2: AI có giúp em học Toán tốt hơn không? */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
              <label className="text-sm font-bold text-white flex items-center justify-between">
                <span>2. AI có giúp em học Toán tốt hơn không?</span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  {helpRating}/5 ⭐
                </span>
              </label>

              {/* 5 Ngôi sao tương tác */}
              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (helpHover || helpRating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHelpHover(star)}
                      onMouseLeave={() => setHelpHover(0)}
                      onClick={() => {
                        soundManager.playClickSound();
                        setHelpRating(star);
                      }}
                      className="p-1.5 rounded-xl hover:bg-slate-800/80 transition-transform active:scale-90 cursor-pointer focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                          isFilled
                            ? 'text-emerald-400 fill-emerald-400 filter drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                            : 'text-slate-600 hover:text-slate-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-emerald-300 font-medium">
                {helpLabels[helpHover || helpRating]}
              </p>
            </div>

            {/* CÂU 3: Em thích tính năng nào nhất? */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
              <label className="text-sm font-bold text-white flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>3. Em thích tính năng nào nhất?</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {SURVEY_FEATURES.map((feat) => {
                  const isSelected = selectedFeature === feat.label;
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => {
                        soundManager.playClickSound();
                        setSelectedFeature(feat.label);
                      }}
                      className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all cursor-pointer flex items-center gap-2 ${
                        isSelected
                          ? 'bg-indigo-600/40 border-indigo-400 text-white shadow-md shadow-indigo-600/20'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="text-base">{feat.icon}</span>
                      <span className="truncate">{feat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CÂU 4: Góp ý thêm */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <label className="text-sm font-bold text-white flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>4. Góp ý thêm cho MathVerse:</span>
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Chia sẻ thêm cảm nhận, tính năng em muốn có thêm hoặc bài toán em muốn AI hỗ trợ tốt hơn..."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              />
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={handleSnooze}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Nhắc em sau
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-400 hover:to-pink-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/25 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Gửi đánh giá (+30 XP)</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
