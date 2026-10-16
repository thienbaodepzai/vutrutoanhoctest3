import React, { useState, useEffect, useRef } from 'react';
import { Grade } from '../types/mathverse';
import { useMathVerse } from '../context/MathVerseContext';
import { PROMOTION_EXAMS } from '../data/promotionExamsData';
import { formatMathNotation, compareMathAnswers } from '../utils/formatMath';
import { soundManager } from '../utils/soundEffects';
import {
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X,
  ShieldCheck,
} from 'lucide-react';

interface GradePromotionQuizProps {
  sourceGrade: Grade;
  onClose: () => void;
}

export const GradePromotionQuiz: React.FC<GradePromotionQuizProps> = ({
  sourceGrade,
  onClose,
}) => {
  const { unlockGrade, setActiveTab } = useMathVerse();
  const exam = PROMOTION_EXAMS.find((e) => e.sourceGrade === sourceGrade) || PROMOTION_EXAMS[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleFinish = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsFinished(true);

    // Compute score
    let correctCount = 0;
    exam.questions.forEach((q, idx) => {
      const studentAns = userAnswers[idx];
      let correct = false;
      if (q.type === 'multiple_choice') {
        correct = compareMathAnswers(studentAns, q.correctAnswer);
      } else if (q.type === 'fill_in') {
        correct = compareMathAnswers(studentAns, q.correctAnswer);
      } else if (q.type === 'true_false') {
        correct = compareMathAnswers(studentAns, q.correctAnswer);
      } else {
        correct = compareMathAnswers(studentAns, q.correctAnswer);
      }

      if (correct) correctCount++;
    });

    const isPassed = (correctCount / exam.questions.length) * 100 >= exam.passingScorePercent;

    if (isPassed) {
      soundManager.triggerBigCelebration();
      unlockGrade(exam.sourceGrade, exam.unlocksGrade, correctCount, exam.questions.length);
    } else {
      soundManager.playWrongSound();
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = exam.questions[currentIndex];

  // ================= RESULTS SCREEN =================
  if (isFinished) {
    let correctCount = 0;
    exam.questions.forEach((q, idx) => {
      const studentAns = userAnswers[idx];
      let correct = false;
      if (q.type === 'multiple_choice') {
        correct = studentAns === q.correctAnswer;
      } else if (q.type === 'fill_in') {
        const cleanA = (studentAns || '').trim().replace(',', '.');
        const cleanB = String(q.correctAnswer).trim().replace(',', '.');
        correct = cleanA === cleanB || (parseFloat(cleanA) === parseFloat(cleanB));
      } else if (q.type === 'true_false') {
        correct = (studentAns === 'true') === q.correctAnswer;
      }
      if (correct) correctCount++;
    });

    const percentage = Math.round((correctCount / exam.questions.length) * 100);
    const isPassed = percentage >= exam.passingScorePercent;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
        <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 text-center space-y-5 animate-in zoom-in-95">
          <div className="text-5xl">{isPassed ? '🎉' : '📖'}</div>

          <div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${
                isPassed
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}
            >
              {isPassed ? 'ĐẠT TIÊU CHUẨN LÊN LỚP' : 'CHƯA ĐẠT TIÊU CHUẨN'}
            </span>
            <h2 className="text-2xl font-black text-white mt-2">
              {isPassed
                ? `Mở khóa thành công Lớp ${exam.unlocksGrade}! 🚀`
                : 'Cần ôn tập thêm kiến thức'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">{exam.bookSeries}</p>
          </div>

          {/* Score Box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-around items-center">
            <div>
              <div className="text-xs text-slate-400">Số câu đúng</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {correctCount}/{exam.questions.length}
              </div>
            </div>
            <div className="border-r border-slate-800 h-10" />
            <div>
              <div className="text-xs text-slate-400">Tỉ lệ chính xác</div>
              <div className="text-2xl font-black text-cyan-400 font-mono">{percentage}%</div>
            </div>
            <div className="border-r border-slate-800 h-10" />
            <div>
              <div className="text-xs text-slate-400">Tiêu chuẩn</div>
              <div className="text-base font-bold text-amber-300 font-mono">≥ 70%</div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {isPassed
              ? `Xuất sắc! Em đã hoàn thành bài tập tổng hợp chuẩn bộ sách Kết nối tri thức. Lớp ${exam.unlocksGrade} đã chính thức được mở khóa và thêm +150 XP vào tài khoản!`
              : `Để lên Lớp ${exam.unlocksGrade}, em cần đạt ít nhất 70% (7/10 câu). Hãy ôn lại các bài học Lớp ${exam.sourceGrade} và thử sức lại nhé!`}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            {isPassed ? (
              <button
                onClick={() => {
                  onClose();
                  setActiveTab('lessons');
                }}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-500/25 transition-transform cursor-pointer"
              >
                Vào học ngay Lớp {exam.unlocksGrade}
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsFinished(false);
                    setUserAnswers({});
                    setCurrentIndex(0);
                    setTimeLeft(15 * 60);
                  }}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" /> Làm lại bài thi
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-transform cursor-pointer"
                >
                  Ôn tập lý thuyết
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ================= EXAM TAKING VIEW =================
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-5 sm:p-7 space-y-5 animate-in zoom-in-95 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold border border-indigo-500/30">
                Toán {exam.sourceGrade} → Lên Lớp {exam.unlocksGrade}
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">{exam.bookSeries}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">{exam.title}</h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 font-mono text-amber-300 text-xs font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTimer(timeLeft)}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Navigator Grid */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-slate-950 rounded-xl border border-slate-800 scrollbar-none">
          {exam.questions.map((_, i) => {
            const isAnswered = userAnswers[i] !== undefined;
            const isCurrent = i === currentIndex;
            return (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  isCurrent
                    ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-300'
                    : isAnswered
                    ? 'bg-indigo-600/40 text-cyan-300 border border-indigo-500/40'
                    : 'bg-slate-900 text-slate-500 hover:text-slate-300'
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {/* Question Details */}
        <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Câu {currentIndex + 1} / {exam.questions.length} • {currentQ.topic}
          </div>

          <h4 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
            {currentQ.question}
          </h4>

          {currentQ.mathExpression && (
            <div className="p-3 rounded-xl bg-slate-900 font-mono text-cyan-300 text-center font-bold tracking-wide border border-slate-800">
              {formatMathNotation(currentQ.mathExpression)}
            </div>
          )}

          {/* Question Formats */}
          {currentQ.type === 'multiple_choice' && currentQ.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = userAnswers[currentIndex] === opt;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setUserAnswers({ ...userAnswers, [currentIndex]: opt });
                      soundManager.playClickSound();
                    }}
                    className={`p-3.5 rounded-xl border text-left font-medium text-xs sm:text-sm transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-950/70 border-cyan-400 text-cyan-200 ring-2 ring-cyan-400/30'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          )}

          {currentQ.type === 'fill_in' && (
            <div className="pt-2">
              <input
                type="text"
                value={userAnswers[currentIndex] || ''}
                onChange={(e) =>
                  setUserAnswers({ ...userAnswers, [currentIndex]: e.target.value })
                }
                placeholder="Nhập đáp án số hoặc kết quả..."
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          )}

          {currentQ.type === 'true_false' && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  setUserAnswers({ ...userAnswers, [currentIndex]: 'true' });
                  soundManager.playClickSound();
                }}
                className={`p-4 rounded-xl border font-bold text-sm transition-all cursor-pointer ${
                  userAnswers[currentIndex] === 'true'
                    ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/30'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                Đúng
              </button>
              <button
                onClick={() => {
                  setUserAnswers({ ...userAnswers, [currentIndex]: 'false' });
                  soundManager.playClickSound();
                }}
                className={`p-4 rounded-xl border font-bold text-sm transition-all cursor-pointer ${
                  userAnswers[currentIndex] === 'false'
                    ? 'bg-rose-950/60 border-rose-400 text-rose-300 ring-2 ring-rose-500/30'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                Sai
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="pt-2 flex items-center justify-between">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Câu trước
          </button>

          {currentIndex < exam.questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-indigo-500/20 cursor-pointer"
            >
              <span>Câu sau</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              Nộp bài kiểm tra lên lớp
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
