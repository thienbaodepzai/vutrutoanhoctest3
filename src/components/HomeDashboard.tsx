import React from 'react';
import { useMathVerse } from '../context/MathVerseContext';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { getUserLevel } from '../data/badgesData';
import { isGradeUnlocked, PROMOTION_EXAMS } from '../data/promotionExamsData';
import {
  BookOpen,
  PenTool,
  Clock,
  Target,
  Award,
  BarChart3,
  Bot,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  TrendingUp,
  Lock,
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export const HomeDashboard: React.FC = () => {
  const { user, setActiveTab, setSelectedLessonId, setActivePromotionExamGrade, setLockedGradeAttempt } = useMathVerse();

  if (!user) return null;

  // Grade-filtered lessons
  const gradeLessons = CURRICULUM_DATA.filter((l) => l.grade === user.grade);
  const completedInGrade = gradeLessons.filter((l) =>
    user.completedLessons.includes(l.id)
  ).length;
  const progressPercent = gradeLessons.length > 0
    ? Math.round((completedInGrade / gradeLessons.length) * 100)
    : 0;

  const currentLevel = getUserLevel(user.xp);

  // Recommendations: pick first uncompleted lesson in current grade
  const nextLesson = gradeLessons.find((l) => !user.completedLessons.includes(l.id)) || gradeLessons[0];
  const nextGrade = (user.grade < 9 ? (user.grade + 1) : 9) as 6 | 7 | 8 | 9;
  const isNextGradeUnlocked = isGradeUnlocked(user, nextGrade);

  const handleNav = (tab: string) => {
    soundManager.playClickSound();
    setActiveTab(tab);
  };

  const menuCards = [
    {
      id: 'lessons',
      title: 'Học bài',
      desc: 'Lý thuyết trực quan, công thức quan trọng và ví dụ từng bước',
      icon: BookOpen,
      color: 'from-blue-600/30 to-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:border-cyan-400',
      badge: `${completedInGrade}/${gradeLessons.length} bài xong`,
      glow: 'shadow-cyan-500/10',
    },
    {
      id: 'practice',
      title: 'Luyện tập',
      desc: 'Trắc nghiệm, điền đáp án, Đúng/Sai, tìm lỗi sai & ghép công thức',
      icon: PenTool,
      color: 'from-emerald-600/30 to-teal-500/20 text-emerald-400 border-emerald-500/30 hover:border-emerald-400',
      badge: '6 dạng bài tập',
      glow: 'shadow-emerald-500/10',
    },
    {
      id: 'quiz',
      title: 'Trắc nghiệm',
      desc: 'Đề thi 10, 20 hoặc 30 câu có đồng hồ đếm ngược và phân tích điểm yếu',
      icon: Clock,
      color: 'from-amber-600/30 to-orange-500/20 text-amber-400 border-amber-500/30 hover:border-amber-400',
      badge: 'Tính giờ & Chấm điểm',
      glow: 'shadow-amber-500/10',
    },
    {
      id: 'challenges',
      title: 'Thử thách',
      desc: 'Giải nhanh, tìm quy luật, toán logic, số bí ẩn và thử thách 60 giây',
      icon: Target,
      color: 'from-rose-600/30 to-pink-500/20 text-pink-400 border-rose-500/30 hover:border-rose-400',
      badge: '+100 XP / Thử thách',
      glow: 'shadow-rose-500/10',
    },
    {
      id: 'mathbot',
      title: 'MathBot AI',
      desc: 'Trợ lý gia sư AI giải đáp từng bước bài toán THCS bằng tiếng Việt',
      icon: Bot,
      color: 'from-indigo-600/30 to-purple-500/20 text-indigo-400 border-indigo-500/30 hover:border-indigo-400',
      badge: 'Hỏi đáp 24/7',
      glow: 'shadow-indigo-500/10',
    },
    {
      id: 'smart_review',
      title: 'Ôn tập thông minh',
      desc: 'Tự động phát hiện các dạng câu hỏi em hay sai và tạo bài ôn bù đắp',
      icon: RotateCcw,
      color: 'from-violet-600/30 to-purple-500/20 text-violet-400 border-violet-500/30 hover:border-violet-400',
      badge: `${user.recentMistakes.length} câu cần ôn`,
      glow: 'shadow-violet-500/10',
    },
    {
      id: 'achievements',
      title: 'Thành tích',
      desc: 'Khám phá 8 huy hiệu danh giá, xem lộ trình thăng cấp Bậc thầy Toán học',
      icon: Award,
      color: 'from-yellow-600/30 to-amber-500/20 text-yellow-400 border-yellow-500/30 hover:border-yellow-400',
      badge: `${user.unlockedBadges.length}/8 huy hiệu`,
      glow: 'shadow-yellow-500/10',
    },
    {
      id: 'analytics',
      title: 'Tiến độ',
      desc: 'Biểu đồ chi tiết tỉ lệ đúng, chủ đề mạnh và chủ đề cần cải thiện',
      icon: BarChart3,
      color: 'from-cyan-600/30 to-blue-500/20 text-cyan-400 border-cyan-500/30 hover:border-cyan-400',
      badge: 'Thống kê chi tiết',
      glow: 'shadow-cyan-500/10',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner with Cosmic styling */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/50 via-slate-900/70 to-purple-950/50 border border-indigo-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">{user.avatar}</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Chương trình Toán Lớp {user.grade}
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Xin chào, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-pink-300">{user.name}</span>! 🚀
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-1.5 max-w-xl">
              Hôm nay em đã sẵn sàng khám phá thêm những định lý và chinh phục đỉnh cao Toán học chưa?
            </p>
          </div>

          {/* Quick Action: Continue Next Lesson */}
          {nextLesson && (
            <button
              onClick={() => {
                setSelectedLessonId(nextLesson.id);
                setActiveTab('lessons');
                soundManager.playClickSound();
              }}
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-100 cursor-pointer text-sm shrink-0"
            >
              <div className="text-left">
                <div className="text-[11px] text-cyan-100 font-normal">Bài học tiếp theo:</div>
                <div className="font-extrabold text-sm max-w-[200px] truncate">{nextLesson.title}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          )}
        </div>

        {/* 4 Stats Cards */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Progress */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Tiến độ Lớp {user.grade}</span>
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono">{progressPercent}%</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* XP */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Tổng điểm thưởng</span>
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            </div>
            <div className="text-2xl font-extrabold text-yellow-300 font-mono">{user.xp} XP</div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <span>{currentLevel.icon} {currentLevel.title}</span>
            </div>
          </div>

          {/* Streak */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Chuỗi học liên tiếp</span>
              <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            </div>
            <div className="text-2xl font-extrabold text-orange-400 font-mono">{user.streak} ngày</div>
            <div className="text-[11px] text-slate-400 mt-1">Duy trì mỗi ngày</div>
          </div>

          {/* Completed Lessons */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Bài đã hoàn thành</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">
              {user.completedLessons.length} bài
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Lớp {user.grade}: {completedInGrade}/{gradeLessons.length}
            </div>
          </div>
        </div>
      </div>

      {/* Promotion Exam Milestone Card */}
      {user.grade < 9 && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/50 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  Mục tiêu mở khóa Lớp {nextGrade} (Bộ sách Kết nối tri thức)
                </span>
                {isNextGradeUnlocked ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    Đã mở khóa
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Đang khóa
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {isNextGradeUnlocked
                  ? `Lớp ${nextGrade} đã sẵn sàng! Em có thể chuyển sang học bất cứ lúc nào.`
                  : `Cần vượt qua Bài tập tổng hợp Toán ${user.grade} (KNTT) đạt từ 70% trở lên để lên Lớp ${nextGrade}.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            {!isNextGradeUnlocked ? (
              <button
                onClick={() => {
                  soundManager.playClickSound();
                  setActivePromotionExamGrade(user.grade);
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Thi vượt cấp lên Lớp {nextGrade}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  soundManager.playClickSound();
                  setActiveTab('lessons');
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer"
              >
                Vào học Lớp {nextGrade}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Navigation Grid (Large Interactive Cards) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Khu vực Học tập & Rèn luyện</span>
          </h2>
          <span className="text-xs text-slate-400">Chọn một mục để bắt đầu</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => handleNav(card.id)}
                className={`group relative p-5 rounded-2xl bg-gradient-to-b ${card.color} border backdrop-blur-md text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${card.glow} cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-950/70 border border-slate-800/80 text-slate-300">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-300/90 leading-relaxed line-clamp-2">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/50 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-cyan-300">
                  <span>Khám phá ngay</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MathBot AI Highlight Banner */}
      <div className="rounded-2xl p-5 bg-gradient-to-r from-indigo-950/80 via-purple-950/80 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/40 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shrink-0">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              MathBot – Gia sư Toán AI 24/7
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                MỚI
              </span>
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Gặp bài toán khó chưa hiểu? Đừng lo, MathBot sẽ giải thích từng bước rõ ràng bằng tiếng Việt!
            </p>
          </div>
        </div>
        <button
          onClick={() => handleNav('mathbot')}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all shrink-0 cursor-pointer"
        >
          Trò chuyện với MathBot
        </button>
      </div>
    </div>
  );
};
