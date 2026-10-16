import React, { useState, useEffect, useRef } from 'react';
import { Question, Grade } from '../types/mathverse';
import { useMathVerse } from '../context/MathVerseContext';
import { QUESTIONS_DATA } from '../data/questionsData';
import { CURRICULUM_DATA } from '../data/curriculumData';
import {
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BarChart,
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { formatMathNotation, compareMathAnswers } from '../utils/formatMath';

export const QuizExamMode: React.FC = () => {
  const { user, addXp, setActiveTab, setSelectedLessonId, recordQuestionResult } = useMathVerse();
  const currentGrade = user?.grade || 6;

  // Setup state: null means choosing test options
  const [testStarted, setTestStarted] = useState<boolean>(false);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(10 * 60); // in seconds
  const [initialDuration, setInitialDuration] = useState<number>(10 * 60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Result state
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Start Quiz
  const startQuiz = (count: number) => {
    soundManager.playClickSound();
    setQuestionCount(count);

    // Pick questions matching grade or mixed
    let pool = QUESTIONS_DATA.filter((q) => q.grade === currentGrade);
    if (pool.length < count) {
      pool = [...pool, ...QUESTIONS_DATA.filter((q) => q.grade !== currentGrade)];
    }
    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, count);

    // Default duration: 10 Qs = 10 mins (600s), 20 Qs = 20 mins (1200s), 30 Qs = 30 mins (1800s)
    const duration = count * 60;
    setQuizQuestions(shuffled);
    setUserAnswers({});
    setCurrentIndex(0);
    setTimeLeft(duration);
    setInitialDuration(duration);
    setStartTime(Date.now());
    setIsFinished(false);
    setTestStarted(true);
  };

  // Timer tick
  useEffect(() => {
    if (testStarted && !isFinished) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            finishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testStarted, isFinished]);

  // Finish quiz
  const finishQuiz = () => {
    if (isFinished) return;
    if (timerRef.current) clearInterval(timerRef.current);
    const durationSpent = Math.round((Date.now() - startTime) / 1000);
    setElapsedTime(durationSpent);
    setIsFinished(true);

    // Calculate score
    let correctCount = 0;
    quizQuestions.forEach((q, idx) => {
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

      // Record question result
      recordQuestionResult(
        q.id,
        correct,
        q.topic,
        q.question,
        studentAns || 'Chưa trả lời',
        String(q.correctAnswer),
        q.explanation,
        q.xpReward
      );
    });

    // Reward XP bonus for completing exam
    const bonusXp = Math.round((correctCount / quizQuestions.length) * 100);
    addXp(bonusXp, 'Thưởng kết quả trắc nghiệm');

    if (correctCount / quizQuestions.length >= 0.7) {
      soundManager.triggerConfetti();
      soundManager.playTriumphSound();
    } else {
      soundManager.playCorrectSound();
    }
  };

  // Format mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Not yet started: Select question count
  if (!testStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-12">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-2">
            <Clock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Phòng thi Trắc nghiệm Toán THCS
          </h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Kiểm tra kiến thức với đề thi tính giờ. Sau khi nộp bài, hệ thống sẽ chẩn đoán những chủ đề em còn yếu và đề xuất ôn tập.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {[10, 20, 30].map((num) => (
            <div
              key={num}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-center space-y-4 hover:shadow-xl transition-all group"
            >
              <div className="text-3xl font-extrabold text-amber-400 font-mono">
                {num} câu
              </div>
              <div className="text-xs text-slate-400 space-y-1">
                <div>Thời gian: <strong>{num} phút</strong></div>
                <div>Độ khó: Đa dạng</div>
                <div className="text-cyan-400 font-semibold">+ Thưởng lên đến {num * 10} XP</div>
              </div>
              <button
                onClick={() => startQuiz(num)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-sm shadow-md shadow-amber-500/20 transition-transform active:scale-95 cursor-pointer"
              >
                Bắt đầu làm bài
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // FINISHED VIEW (DETAILED DIAGNOSTICS & WEAKNESS REPORT)
  if (isFinished) {
    const totalQ = quizQuestions.length;
    let correctCount = 0;
    const topicMistakes: Record<string, number> = {};

    quizQuestions.forEach((q, idx) => {
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
      } else {
        correct = studentAns === String(q.correctAnswer);
      }

      if (correct) {
        correctCount++;
      } else {
        topicMistakes[q.topic] = (topicMistakes[q.topic] || 0) + 1;
      }
    });

    const scoreOutOf10 = ((correctCount / totalQ) * 10).toFixed(1);
    const accuracyPercent = Math.round((correctCount / totalQ) * 100);
    const weakTopics = Object.entries(topicMistakes)
      .sort((a, b) => b[1] - a[1])
      .map(([topic]) => topic);

    // Recommended lessons based on weak topics
    const recommendedLessons = CURRICULUM_DATA.filter(
      (l) => l.grade === currentGrade && weakTopics.includes(l.topic)
    ).slice(0, 2);

    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in">
        {/* Score Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-indigo-950/70 to-slate-900 border border-slate-700/80 shadow-2xl text-center space-y-4">
          <div className="inline-flex p-4 rounded-3xl bg-slate-900 border border-slate-800 text-4xl shadow-inner">
            {accuracyPercent >= 80 ? '🌟' : accuracyPercent >= 50 ? '👍' : '💪'}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Kết quả bài thi Trắc nghiệm
          </h2>

          <div className="flex items-center justify-center gap-3">
            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-400 font-mono">
              {scoreOutOf10}
            </span>
            <span className="text-xl text-slate-400 font-bold">/ 10 điểm</span>
          </div>

          {/* 4 Metrics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs text-slate-400">Số câu đúng</div>
              <div className="text-lg font-bold text-emerald-400">{correctCount} câu</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs text-slate-400">Số câu sai</div>
              <div className="text-lg font-bold text-rose-400">{totalQ - correctCount} câu</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs text-slate-400">Thời gian</div>
              <div className="text-lg font-bold text-cyan-400 font-mono">{formatTime(elapsedTime)}</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs text-slate-400">Độ chính xác</div>
              <div className="text-lg font-bold text-purple-400 font-mono">{accuracyPercent}%</div>
            </div>
          </div>
        </div>

        {/* Weak topics diagnosis */}
        {weakTopics.length > 0 ? (
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Chẩn đoán chủ đề còn yếu:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Em gặp khó khăn nhiều nhất ở các chủ đề: <strong className="text-amber-200">{weakTopics.join(', ')}</strong>. Hãy dành thời gian ôn lại lý thuyết và làm thêm bài tập dạng này nhé!
            </p>

            {/* Recommended lessons */}
            {recommendedLessons.length > 0 && (
              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Đề xuất bài học cần ôn lại:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recommendedLessons.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => {
                        setSelectedLessonId(l.id);
                        setActiveTab('lessons');
                      }}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-amber-400 text-left transition-colors cursor-pointer group flex items-center justify-between"
                    >
                      <div className="truncate pr-2">
                        <div className="text-[11px] text-amber-300 font-semibold">{l.topic}</div>
                        <div className="text-xs font-bold text-white truncate">{l.title}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-sm font-semibold text-center flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Tuyệt hảo! Em đã làm chủ toàn bộ các chủ đề trong đề thi này!
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setTestStarted(false)}
            className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Làm đề thi khác
          </button>
          <button
            onClick={() => setActiveTab('smart_review')}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" /> Ôn tập thông minh câu sai
          </button>
        </div>
      </div>
    );
  }

  // ACTIVE TEST VIEW
  const currentQ = quizQuestions[currentIndex];
  const isTimeUrgent = timeLeft < 120; // under 2 mins

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Top Floating Timer Bar */}
      <div className="sticky top-20 z-30 flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-500/30">
            Câu {currentIndex + 1} / {quizQuestions.length}
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Đã làm: {Object.keys(userAnswers).length}/{quizQuestions.length}
          </span>
        </div>

        {/* Timer */}
        <div
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm transition-colors ${
            isTimeUrgent
              ? 'bg-rose-950/60 border-rose-500 text-rose-300 animate-pulse'
              : 'bg-slate-950 border-slate-700 text-amber-300'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{formatTime(timeLeft)}</span>
        </div>

        <button
          onClick={finishQuiz}
          className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-colors cursor-pointer"
        >
          Nộp bài sớm
        </button>
      </div>

      {/* Question Number Pills Navigation Grid */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-2 bg-slate-950/60 rounded-2xl border border-slate-800 scrollbar-none">
        {quizQuestions.map((_, i) => {
          const isAnswered = userAnswers[i] !== undefined;
          const isCurrent = i === currentIndex;

          return (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
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

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            {currentQ.topic} • Câu hỏi {currentIndex + 1}
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {currentQ.question}
          </h2>

          {currentQ.mathExpression && (
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-cyan-300 text-base border border-slate-800 text-center font-bold tracking-wide">
              {formatMathNotation(currentQ.mathExpression)}
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.type === 'multiple_choice' && currentQ.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = userAnswers[currentIndex] === opt;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setUserAnswers({ ...userAnswers, [currentIndex]: opt });
                      soundManager.playClickSound();
                    }}
                    className={`p-4 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-950/60 border-cyan-400 text-cyan-200 ring-2 ring-cyan-400/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          )}

          {currentQ.type === 'fill_in' && (
            <input
              type="text"
              value={userAnswers[currentIndex] || ''}
              onChange={(e) => setUserAnswers({ ...userAnswers, [currentIndex]: e.target.value })}
              placeholder="Nhập đáp án của em tại đây..."
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-white font-mono text-base focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          )}

          {currentQ.type === 'true_false' && (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setUserAnswers({ ...userAnswers, [currentIndex]: 'true' })}
                className={`p-4 rounded-2xl border font-bold text-sm transition-all cursor-pointer ${
                  userAnswers[currentIndex] === 'true'
                    ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/30'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                Đúng
              </button>
              <button
                onClick={() => setUserAnswers({ ...userAnswers, [currentIndex]: 'false' })}
                className={`p-4 rounded-2xl border font-bold text-sm transition-all cursor-pointer ${
                  userAnswers[currentIndex] === 'false'
                    ? 'bg-rose-950/60 border-rose-400 text-rose-300 ring-2 ring-rose-500/30'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                Sai
              </button>
            </div>
          )}
        </div>

        {/* Bottom Nav Prev / Next / Finish */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Câu trước
          </button>

          {currentIndex < quizQuestions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-500/20 cursor-pointer"
            >
              <span>Câu sau</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={finishQuiz}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              Hoàn thành & Nộp bài
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
