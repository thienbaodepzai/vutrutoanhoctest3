import React, { useState, useEffect } from 'react';
import { useMathVerse } from '../context/MathVerseContext';
import { getUserLevel, getNextLevel } from '../data/badgesData';
import { Volume2, VolumeX, Flame, Award, ChevronDown, Rocket, Sparkles, Settings as SettingsIcon, Music, Pause, Lock } from 'lucide-react';
import { Grade } from '../types/mathverse';
import { soundManager } from '../utils/soundEffects';
import { musicPlayer } from '../utils/musicPlayer';
import { isGradeUnlocked } from '../data/promotionExamsData';

export const Navbar: React.FC = () => {
  const {
    user,
    activeTab,
    setActiveTab,
    toggleSound,
    updateGrade,
    recentXpGained,
    newBadgeUnlocked,
    clearNewBadge,
  } = useMathVerse();

  const [gradeDropdownOpen, setGradeDropdownOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    const unsub = musicPlayer.subscribe((state) => {
      setIsMusicPlaying(state.isPlaying);
    });
    setIsMusicPlaying(musicPlayer.getState().isPlaying);
    return () => unsub();
  }, []);

  if (!user) return null;

  const currentLevel = getUserLevel(user.xp);
  const nextLevel = getNextLevel(user.xp);

  // Calculate level progress %
  let levelProgress = 100;
  if (nextLevel) {
    const range = nextLevel.minXp - currentLevel.minXp;
    const gained = user.xp - currentLevel.minXp;
    levelProgress = Math.min(Math.max(Math.round((gained / range) * 100), 0), 100);
  }

  const handleGradeSelect = (g: Grade) => {
    updateGrade(g);
    setGradeDropdownOpen(false);
    soundManager.playClickSound();
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Grade Selector */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                soundManager.playClickSound();
              }}
              className="flex items-center gap-2 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-300 leading-tight">
                  MathVerse
                </div>
                <div className="text-[10px] text-slate-400 font-medium tracking-wide">
                  Vũ trụ Toán học
                </div>
              </div>
            </button>

            {/* Grade Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setGradeDropdownOpen(!gradeDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-cyan-300 text-xs font-bold hover:bg-indigo-900/60 transition-colors cursor-pointer"
              >
                <span>Lớp {user.grade}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${gradeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {gradeDropdownOpen && (
                <div className="absolute left-0 mt-2 w-36 bg-slate-900 border border-slate-700/80 rounded-xl shadow-xl shadow-slate-950/80 p-1.5 z-50 animate-in fade-in zoom-in-95">
                  {([6, 7, 8, 9] as Grade[]).map((g) => {
                    const unlocked = isGradeUnlocked(user, g);
                    return (
                      <button
                        key={g}
                        onClick={() => handleGradeSelect(g)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                          user.grade === g
                            ? 'bg-indigo-600/30 text-cyan-300'
                            : unlocked
                            ? 'text-slate-300 hover:bg-slate-800'
                            : 'text-slate-500 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span>Lớp {g}</span>
                          {!unlocked && <Lock className="w-3 h-3 text-amber-400" />}
                        </div>
                        {user.grade === g && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Gamification Stats: Streak, XP & Level */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Streak */}
            <div
              title={`Chuỗi học tập liên tiếp: ${user.streak} ngày`}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold"
            >
              <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              <span>{user.streak} ngày</span>
            </div>

            {/* Level & XP */}
            <div
              onClick={() => {
                setActiveTab('achievements');
                soundManager.playClickSound();
              }}
              title={`Cấp độ: ${currentLevel.title} (${user.xp} XP)`}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 hover:border-slate-600 transition-colors cursor-pointer"
            >
              <span className="text-sm">{currentLevel.icon}</span>
              <div className="hidden md:flex flex-col">
                <div className="text-[11px] font-bold text-slate-200 leading-none">
                  {currentLevel.title}
                </div>
                <div className="w-16 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
              </div>
              <span className="text-xs font-extrabold text-cyan-400 font-mono">
                {user.xp} XP
              </span>
            </div>

            {/* Background Study Music Toggle */}
            <button
              onClick={() => {
                soundManager.playClickSound();
                musicPlayer.togglePlay();
              }}
              title={isMusicPlaying ? 'Tạm dừng nhạc nền tập trung' : 'Phát nhạc nền thư giãn tập trung'}
              className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                isMusicPlaying
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <Music className={`w-4 h-4 ${isMusicPlaying ? 'animate-pulse text-cyan-300' : ''}`} />
              {isMusicPlaying && (
                <span className="hidden md:inline text-[11px] font-bold text-cyan-300">
                  Nhạc
                </span>
              )}
            </button>

            {/* Sound Effects Toggle */}
            <button
              onClick={toggleSound}
              title={user.soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {user.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Settings Quick Link */}
            <button
              onClick={() => {
                setActiveTab('settings');
                soundManager.playClickSound();
              }}
              title="Cài đặt"
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-indigo-600/30 border-cyan-400 text-cyan-300'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
            </button>

            {/* User Profile Avatar */}
            <button
              onClick={() => {
                setActiveTab('settings');
                soundManager.playClickSound();
              }}
              className="flex items-center gap-1.5 pl-1.5 pr-2 py-1 rounded-xl bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/20 hover:border-indigo-400/40 cursor-pointer"
            >
              <span className="text-lg">{user.avatar}</span>
              <span className="hidden lg:inline text-xs font-semibold text-slate-200 max-w-[90px] truncate">
                {user.name}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Real-time Floating XP Gain Toast */}
      {recentXpGained && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce pointer-events-none">
          <div className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-xl shadow-xl shadow-cyan-500/20 flex items-center gap-2 border border-cyan-300/40 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>+{recentXpGained.amount} XP!</span>
            {recentXpGained.reason && (
              <span className="text-xs text-cyan-100 font-normal">({recentXpGained.reason})</span>
            )}
          </div>
        </div>
      )}

      {/* New Badge Unlocked Modal / Toast */}
      {newBadgeUnlocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-gradient-to-b from-indigo-950 to-slate-900 border border-cyan-500/40 rounded-3xl p-6 text-center shadow-2xl shadow-cyan-500/30">
            <div className="text-5xl mb-3 animate-bounce">🏆</div>
            <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">
              Huy hiệu mới mở khóa!
            </h3>
            <p className="text-white font-bold text-lg mt-2">{newBadgeUnlocked}</p>
            <p className="text-slate-300 text-xs mt-1">
              Tuyệt vời lắm! Em đã nhận thêm điểm thưởng và ghi danh trong vũ trụ MathVerse.
            </p>
            <button
              onClick={clearNewBadge}
              className="mt-5 w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl text-sm transition-transform cursor-pointer"
            >
              Nhận phần thưởng
            </button>
          </div>
        </div>
      )}
    </>
  );
};
