import React from 'react';
import { useMathVerse } from '../context/MathVerseContext';
import { BADGES_DATA, LEVELS_DATA, getUserLevel, getNextLevel } from '../data/badgesData';
import { Award, Sparkles, Lock, CheckCircle2, TrendingUp, Star } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export const AchievementsView: React.FC = () => {
  const { user } = useMathVerse();
  if (!user) return null;

  const currentLevel = getUserLevel(user.xp);
  const nextLevel = getNextLevel(user.xp);

  let progressPercent = 100;
  let xpRemaining = 0;
  if (nextLevel) {
    const range = nextLevel.minXp - currentLevel.minXp;
    const gained = user.xp - currentLevel.minXp;
    progressPercent = Math.min(Math.max(Math.round((gained / range) * 100), 0), 100);
    xpRemaining = nextLevel.minXp - user.xp;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <Award className="w-7 h-7 text-amber-400" />
          <span>Hệ thống Cấp độ & Huy hiệu Danh dự</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Tích lũy XP từ bài học, bài luyện tập và thử thách để thăng cấp Bậc thầy Toán học!
        </p>
      </div>

      {/* Current Level Card */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-slate-700/80 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="text-5xl sm:text-6xl p-4 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-inner">
              {currentLevel.icon}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Cấp độ hiện tại • Cấp {currentLevel.level}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                {currentLevel.title}
              </h2>
              <div className="text-sm font-bold text-amber-400 font-mono mt-1">
                {user.xp} XP tổng cộng
              </div>
            </div>
          </div>

          {nextLevel ? (
            <div className="w-full sm:w-64 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs text-slate-300 font-semibold">
                <span>Lên cấp {nextLevel.title}:</span>
                <span className="text-cyan-400">{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-400 text-right">
                Cần thêm <strong>{xpRemaining} XP</strong>
              </div>
            </div>
          ) : (
            <div className="px-4 py-2 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold text-sm">
              👑 Đã đạt cấp độ tối cao!
            </div>
          )}
        </div>
      </div>

      {/* Levels Pathway Roadmap */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          <span>Lộ trình 5 cấp bậc trong Vũ trụ MathVerse</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {LEVELS_DATA.map((lvl) => {
            const isReached = user.xp >= lvl.minXp;
            const isCurrent = currentLevel.level === lvl.level;

            return (
              <div
                key={lvl.level}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-indigo-950/70 border-cyan-400 ring-2 ring-cyan-400/30 shadow-lg'
                    : isReached
                    ? 'bg-slate-900/60 border-slate-700 text-slate-200'
                    : 'bg-slate-950/40 border-slate-800/80 opacity-60 text-slate-500'
                }`}
              >
                <div className="text-3xl mb-1">{lvl.icon}</div>
                <div className="text-xs font-bold text-white">{lvl.title}</div>
                <div className="text-[11px] text-slate-400 font-mono mt-1">
                  {lvl.minXp}+ XP
                </div>
                {isReached && (
                  <span className="inline-block mt-2 text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    {isCurrent ? 'Hiện tại' : 'Đã đạt'}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 8 Badges Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span>Bộ sưu tập 8 Huy hiệu vinh danh ({user.unlockedBadges.length}/8)</span>
          </h3>
          <span className="text-xs text-slate-400">Tự động mở khóa khi đạt tiêu chí</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BADGES_DATA.map((b) => {
            const isUnlocked = user.unlockedBadges.includes(b.id) || b.checkUnlocked(user);
            const prog = b.progress(user);
            const pct = Math.round((prog.current / prog.max) * 100);

            return (
              <div
                key={b.id}
                className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-indigo-950/60 to-slate-900 border-amber-500/40 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-500'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-4xl filter drop-shadow">{b.icon}</span>
                    {isUnlocked ? (
                      <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="p-1 rounded-full bg-slate-800 text-slate-500">
                        <Lock className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <h4 className={`text-base font-bold mb-1 ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                    {b.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {b.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="pt-3 border-t border-slate-800/60 space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>{b.criteria}</span>
                    <span className={isUnlocked ? 'text-emerald-400 font-bold' : ''}>
                      {prog.current}/{prog.max}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isUnlocked
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500'
                          : 'bg-slate-700'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
