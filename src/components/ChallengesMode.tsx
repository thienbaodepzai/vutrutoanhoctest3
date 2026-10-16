import React, { useState, useEffect, useRef } from 'react';
import { Challenge, Question, Difficulty } from '../types/mathverse';
import { useMathVerse } from '../context/MathVerseContext';
import { CHALLENGES_DATA } from '../data/challengesData';
import {
  Target,
  Zap,
  Clock,
  Sparkles,
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Flame,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export const ChallengesMode: React.FC = () => {
  const { addXp, recordQuestionResult } = useMathVerse();

  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);

  // Active Challenge Session State
  const [qIndex, setQIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [streakCount, setStreakCount] = useState<number>(0);

  const timerRef = useRef<any>(null);

  const filteredChallenges = filterDifficulty === 'all'
    ? CHALLENGES_DATA
    : CHALLENGES_DATA.filter((c) => c.difficulty === filterDifficulty);

  // Start Challenge
  const startChallenge = (challenge: Challenge) => {
    soundManager.playClickSound();
    setActiveChallenge(challenge);
    setQIndex(0);
    setUserAnswer('');
    setChallengeScore(0);
    setStreakCount(0);
    setIsGameOver(false);

    const initialTime = challenge.timeLimitSeconds || 60;
    setTimeLeft(initialTime);
  };

  // Timer loop for active challenge
  useEffect(() => {
    if (activeChallenge && !isGameOver) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            endChallenge();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [activeChallenge, isGameOver]);

  const endChallenge = () => {
    clearInterval(timerRef.current);
    setIsGameOver(true);
    soundManager.triggerConfetti();
    soundManager.playTriumphSound();
  };

  const handleAnswerSubmit = (ans: string) => {
    if (!activeChallenge || isGameOver) return;

    const currentQ = activeChallenge.questions[qIndex];
    let isCorrect = false;

    if (currentQ.type === 'multiple_choice') {
      isCorrect = ans === currentQ.correctAnswer;
    } else if (currentQ.type === 'fill_in') {
      const cleanA = ans.trim().replace(',', '.');
      const cleanB = String(currentQ.correctAnswer).trim().replace(',', '.');
      isCorrect = cleanA === cleanB || (parseFloat(cleanA) === parseFloat(cleanB));
    } else if (currentQ.type === 'true_false') {
      isCorrect = (ans === 'true') === currentQ.correctAnswer;
    }

    recordQuestionResult(
      currentQ.id,
      isCorrect,
      currentQ.topic,
      currentQ.question,
      ans,
      String(currentQ.correctAnswer),
      currentQ.explanation,
      currentQ.xpReward
    );

    if (isCorrect) {
      soundManager.playCorrectSound();
      setChallengeScore((prev) => prev + currentQ.xpReward);
      setStreakCount((prev) => prev + 1);

      // Next question or end
      if (qIndex < activeChallenge.questions.length - 1) {
        setQIndex((prev) => prev + 1);
        setUserAnswer('');
      } else {
        // Completed all questions in challenge
        addXp(activeChallenge.xpReward, `Chinh phục ${activeChallenge.title}`);
        endChallenge();
      }
    } else {
      soundManager.playWrongSound();
      // If it's a survival streak challenge, one mistake ends the game!
      if (activeChallenge.category === 'streak') {
        endChallenge();
      } else {
        if (qIndex < activeChallenge.questions.length - 1) {
          setQIndex((prev) => prev + 1);
          setUserAnswer('');
        } else {
          endChallenge();
        }
      }
    }
  };

  // If in active challenge session
  if (activeChallenge) {
    const currentQ = activeChallenge.questions[qIndex];

    if (isGameOver) {
      return (
        <div className="max-w-xl mx-auto space-y-6 pb-12 animate-in fade-in">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-700 text-center space-y-4 shadow-2xl">
            <div className="text-5xl animate-bounce">🏆</div>
            <h2 className="text-2xl font-extrabold text-white">Thử thách kết thúc!</h2>
            <p className="text-slate-300 text-sm">{activeChallenge.title}</p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-around text-center">
              <div>
                <div className="text-xs text-slate-400">Điểm thưởng kiếm được</div>
                <div className="text-2xl font-extrabold text-cyan-400 font-mono">+{challengeScore} XP</div>
              </div>
              <div className="border-r border-slate-800" />
              <div>
                <div className="text-xs text-slate-400">Chuỗi đúng liên tiếp</div>
                <div className="text-2xl font-extrabold text-orange-400 font-mono">{streakCount} 🔥</div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => startChallenge(activeChallenge)}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Thử lại
              </button>
              <button
                onClick={() => setActiveChallenge(null)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm cursor-pointer"
              >
                Chọn thử thách khác
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-12">
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div>
            <div className="text-xs font-bold text-cyan-400">{activeChallenge.title}</div>
            <div className="text-xs text-slate-400">
              Câu {qIndex + 1} / {activeChallenge.questions.length} • Chuỗi: {streakCount} 🔥
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 font-mono font-bold text-amber-300 text-sm">
            <Clock className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>

          <button
            onClick={() => setActiveChallenge(null)}
            className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
          >
            Thoát
          </button>
        </div>

        {/* Active Question */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              {currentQ.topic}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Formats */}
          {currentQ.type === 'multiple_choice' && currentQ.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSubmit(opt)}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-400 hover:bg-slate-900 text-left font-semibold text-white transition-all cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {currentQ.type === 'fill_in' && (
            <div className="flex gap-2">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && userAnswer.trim()) {
                    handleAnswerSubmit(userAnswer);
                  }
                }}
                placeholder="Nhập số và nhấn Enter..."
                className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => handleAnswerSubmit(userAnswer)}
                disabled={!userAnswer.trim()}
                className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded-xl disabled:opacity-40 cursor-pointer"
              >
                Trả lời
              </button>
            </div>
          )}

          {currentQ.type === 'true_false' && (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswerSubmit('true')}
                className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-300 font-bold text-base hover:bg-emerald-900/60 cursor-pointer"
              >
                Đúng
              </button>
              <button
                onClick={() => handleAnswerSubmit('false')}
                className="p-4 rounded-xl bg-rose-950/60 border border-rose-500 text-rose-300 font-bold text-base hover:bg-rose-900/60 cursor-pointer"
              >
                Sai
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Challenge Selection Board
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Target className="w-7 h-7 text-pink-400" />
            <span>Đấu trường Thử thách Toán</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Vượt qua 7 chế độ thử thách đặc biệt để rèn luyện phản xạ, tư duy logic và nhận thêm +100 XP!
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="inline-flex p-1 rounded-2xl bg-slate-900 border border-slate-800">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'easy', label: '🟢 Dễ' },
            { id: 'medium', label: '🟡 Trung bình' },
            { id: 'hard', label: '🔴 Khó' },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => {
                setFilterDifficulty(d.id);
                soundManager.playClickSound();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterDifficulty === d.id
                  ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredChallenges.map((ch) => {
          const diffBadge =
            ch.difficulty === 'easy'
              ? { text: '🟢 Dễ', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' }
              : ch.difficulty === 'medium'
              ? { text: '🟡 Trung bình', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' }
              : { text: '🔴 Khó', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };

          return (
            <div
              key={ch.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/40 hover:shadow-xl transition-all backdrop-blur-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${diffBadge.color}`}>
                    {diffBadge.text}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-cyan-400">
                    <Sparkles className="w-3 h-3" /> +{ch.xpReward} XP
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors mb-2">
                  {ch.title}
                </h3>
                <p className="text-xs text-slate-300/90 leading-relaxed mb-4 line-clamp-2">
                  {ch.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {ch.timeLimitSeconds}s • {ch.questions.length} câu
                </span>
                <button
                  onClick={() => startChallenge(ch)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white text-xs font-bold shadow-md shadow-pink-500/20 transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" /> Thử sức
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
