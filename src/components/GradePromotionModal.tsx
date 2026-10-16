import React from 'react';
import { Grade } from '../types/mathverse';
import { useMathVerse } from '../context/MathVerseContext';
import { getGradeLockInfo } from '../data/promotionExamsData';
import { Lock, CheckCircle2, XCircle, ArrowRight, X, Sparkles, BookOpen, ShieldAlert } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface GradePromotionModalProps {
  targetGrade: Grade;
  onClose: () => void;
  onStartExam: (gradeToTake: Grade) => void;
}

export const GradePromotionModal: React.FC<GradePromotionModalProps> = ({
  targetGrade,
  onClose,
  onStartExam,
}) => {
  const { user } = useMathVerse();
  const lockInfo = getGradeLockInfo(user, targetGrade);

  const handleStartExam = () => {
    soundManager.playClickSound();
    onClose();
    if (lockInfo.nextActionExamGrade) {
      onStartExam(lockInfo.nextActionExamGrade);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30">
                Khóa cấp độ
              </span>
              <h3 className="text-xl font-extrabold text-white mt-0.5">
                Lớp {targetGrade} hiện đang bị khóa 🔒
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explain Rule */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Quy định chuyển lớp & vượt cấp (Bộ sách Kết nối tri thức)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {lockInfo.message}
          </p>
        </div>

        {/* Prerequisite checklist */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Tiến trình điều kiện mở khóa:
          </div>
          <div className="space-y-2">
            {lockInfo.requiredExams.map((req) => (
              <div
                key={req.grade}
                className={`p-3.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                  req.isPassed
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {req.isPassed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                  <div>
                    <span className="font-bold text-white block">{req.title}</span>
                    <span className="text-[11px] text-slate-400">
                      {req.isPassed ? 'Đã vượt qua bài kiểm tra năng lực' : 'Chưa hoàn thành bài tập tổng hợp'}
                    </span>
                  </div>
                </div>

                {!req.isPassed && (
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 text-[10px] font-bold border border-rose-500/20">
                    Bắt buộc
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
          >
            Để sau
          </button>

          {lockInfo.nextActionExamGrade && (
            <button
              onClick={handleStartExam}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white font-bold text-xs shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Làm bài tổng hợp Toán {lockInfo.nextActionExamGrade} ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
