import React, { useState } from 'react';
import { Grade } from '../types/mathverse';
import { useMathVerse } from '../context/MathVerseContext';
import { Sparkles, Compass, Rocket, BookOpen, ChevronRight } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

const AVATARS = [
  { icon: '👨‍🚀', label: 'Phi hành gia' },
  { icon: '👩‍🚀', label: 'Nhà thám hiểm' },
  { icon: '🦉', label: 'Cú thông thái' },
  { icon: '🤖', label: 'Robot MathBot' },
  { icon: '🦊', label: 'Cáo nhanh nhẹn' },
  { icon: '⭐', label: 'Ngôi sao nhỏ' },
];

const GRADES: { grade: Grade; title: string; subtitle: string; icon: string; bgGrad: string }[] = [
  { grade: 6, title: 'Lớp 6', subtitle: 'Số tự nhiên, Số nguyên, Phân số & Hình trực quan', icon: '🌱', bgGrad: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30' },
  { grade: 7, title: 'Lớp 7', subtitle: 'Số hữu tỉ, Tỉ lệ thức, Tam giác & Định lý Pythagore', icon: '📐', bgGrad: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30' },
  { grade: 8, title: 'Lớp 8', subtitle: 'Hằng đẳng thức, Phương trình & Định lý Thalès', icon: '⚡', bgGrad: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30' },
  { grade: 9, title: 'Lớp 9', subtitle: 'Căn bậc hai, Hệ phương trình, Vi-ét & Đường tròn', icon: '👑', bgGrad: 'from-purple-500/20 to-pink-500/10 border-purple-500/30' },
];

export const LoginScreen: React.FC = () => {
  const { login } = useMathVerse();
  const [name, setName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<Grade>(6);
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0].icon);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Vui lòng nhập tên của em để bắt đầu nhé!');
      soundManager.playWrongSound();
      return;
    }
    soundManager.playClickSound();
    login(name.trim(), selectedGrade, selectedAvatar);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center p-4">
      {/* Background Cosmic Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[128px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-600/15 rounded-full blur-[96px]" />
        
        {/* Floating math symbols in cosmic background */}
        <span className="absolute top-16 left-12 text-cyan-500/20 text-4xl select-none font-mono font-bold animate-bounce">π</span>
        <span className="absolute top-28 right-24 text-indigo-400/20 text-5xl select-none font-mono font-bold">∑</span>
        <span className="absolute bottom-24 left-20 text-purple-400/20 text-5xl select-none font-mono font-bold">√</span>
        <span className="absolute bottom-32 right-16 text-pink-400/20 text-4xl select-none font-mono font-bold">∞</span>
        <span className="absolute top-2/3 left-1/3 text-emerald-400/15 text-3xl select-none font-mono font-bold">Δ</span>
      </div>

      <div className="relative z-10 w-full max-w-xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 shadow-2xl shadow-indigo-950/50 rounded-3xl p-6 sm:p-8">
        {/* Header Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3.5 bg-gradient-to-tr from-indigo-600 to-cyan-400 rounded-2xl shadow-lg shadow-indigo-500/30 mb-3 transform hover:scale-105 transition-transform duration-300">
            <Rocket className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-400 tracking-tight">
            MathVerse
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1 flex items-center justify-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Vũ trụ Toán học THCS • Bộ sách Kết nối tri thức
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Tên học sinh
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Nhập họ và tên hoặc biệt danh của em..."
              className="w-full px-4 py-3.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-base"
              maxLength={30}
              autoFocus
            />
            {errorMessage && (
              <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                ⚠️ {errorMessage}
              </p>
            )}
          </div>

          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Chọn nhân vật đại diện
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((av) => (
                <button
                  type="button"
                  key={av.label}
                  onClick={() => {
                    setSelectedAvatar(av.icon);
                    soundManager.playClickSound();
                  }}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-2xl transition-all duration-200 ${
                    selectedAvatar === av.icon
                      ? 'bg-indigo-600/30 border-cyan-400 scale-105 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                  title={av.label}
                >
                  <span>{av.icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Grade Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Chọn lớp học của em
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {GRADES.map((g) => (
                <button
                  type="button"
                  key={g.grade}
                  onClick={() => {
                    setSelectedGrade(g.grade);
                    soundManager.playClickSound();
                  }}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    selectedGrade === g.grade
                      ? `bg-gradient-to-b ${g.bgGrad} ring-2 ring-cyan-400 shadow-md`
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-xl">{g.icon}</span>
                    {selectedGrade === g.grade && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                    )}
                  </div>
                  <div className="font-bold text-white text-sm">{g.title}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{g.subtitle}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer text-base"
          >
            <span>Bắt đầu học ngay</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Footer highlights */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-[12px] text-slate-400">
          <div className="flex flex-col items-center gap-1">
            <span className="text-cyan-400 font-semibold flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Chuẩn THCS
            </span>
            <span>Lớp 6, 7, 8, 9</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-indigo-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> MathBot AI
            </span>
            <span>Gia sư giải thích</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-purple-400 font-semibold flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" /> Ôn tập thông minh
            </span>
            <span>Tự chữa điểm yếu</span>
          </div>
        </div>
      </div>
    </div>
  );
};
