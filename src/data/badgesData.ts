import { BadgeInfo, LevelInfo, UserProfile } from '../types/mathverse';

export const LEVELS_DATA: LevelInfo[] = [
  {
    level: 1,
    title: 'Người mới',
    minXp: 0,
    maxXp: 99,
    icon: '🌱',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    level: 2,
    title: 'Học viên',
    minXp: 100,
    maxXp: 299,
    icon: '📘',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    level: 3,
    title: 'Nhà khám phá',
    minXp: 300,
    maxXp: 699,
    icon: '🚀',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    level: 4,
    title: 'Cao thủ Toán',
    minXp: 700,
    maxXp: 1499,
    icon: '⭐',
    color: 'from-amber-500 to-orange-600',
  },
  {
    level: 5,
    title: 'Bậc thầy Toán học',
    minXp: 1500,
    maxXp: 999999,
    icon: '👑',
    color: 'from-rose-500 to-purple-700',
  },
];

export const BADGES_DATA: BadgeInfo[] = [
  {
    id: 'badge-first-lesson',
    title: 'Bài học đầu tiên',
    icon: '🏆',
    description: 'Hoàn thành bài học lý thuyết và ví dụ đầu tiên.',
    criteria: 'Hoàn thành 1 bài học',
    checkUnlocked: (profile: UserProfile) => profile.completedLessons.length >= 1,
    progress: (profile: UserProfile) => ({
      current: Math.min(profile.completedLessons.length, 1),
      max: 1,
    }),
  },
  {
    id: 'badge-7-day-streak',
    title: 'Học 7 ngày liên tiếp',
    icon: '🔥',
    description: 'Duy trì chuỗi học tập đều đặn trong 7 ngày.',
    criteria: 'Chuỗi học đạt 7 ngày',
    checkUnlocked: (profile: UserProfile) => profile.streak >= 7,
    progress: (profile: UserProfile) => ({
      current: Math.min(profile.streak, 7),
      max: 7,
    }),
  },
  {
    id: 'badge-10-streak-correct',
    title: '10 câu đúng liên tiếp',
    icon: '⚡',
    description: 'Trả lời đúng 10 câu hỏi liên tiếp mà không sai câu nào.',
    criteria: 'Chuỗi đúng 10 câu',
    checkUnlocked: (profile: UserProfile) =>
      profile.unlockedBadges.includes('badge-10-streak-correct'),
    progress: (profile: UserProfile) => ({
      current: profile.unlockedBadges.includes('badge-10-streak-correct') ? 10 : 0,
      max: 10,
    }),
  },
  {
    id: 'badge-100-correct',
    title: '100 câu đúng',
    icon: '🧠',
    description: 'Vượt qua và trả lời chính xác tổng cộng 100 câu hỏi Toán học.',
    criteria: '100 câu hỏi đúng',
    checkUnlocked: (profile: UserProfile) => profile.correctAnswersCount >= 100,
    progress: (profile: UserProfile) => ({
      current: Math.min(profile.correctAnswersCount, 100),
      max: 100,
    }),
  },
  {
    id: 'badge-geometry-master',
    title: 'Bậc thầy hình học',
    icon: '📐',
    description: 'Luyện tập xuất sắc và hoàn thành các bài toán chủ đề Hình học.',
    criteria: 'Đúng 5 câu hỏi Hình học',
    checkUnlocked: (profile: UserProfile) =>
      (profile.topicStats['Hình học']?.correct || 0) >= 5,
    progress: (profile: UserProfile) => ({
      current: Math.min(profile.topicStats['Hình học']?.correct || 0, 5),
      max: 5,
    }),
  },
  {
    id: 'badge-fraction-expert',
    title: 'Chuyên gia phân số',
    icon: '➗',
    description: 'Làm chủ phép tính phân số, quy đồng và số thập phân.',
    criteria: 'Đúng 5 câu hỏi Phân số/Số học',
    checkUnlocked: (profile: UserProfile) =>
      (profile.topicStats['Phân số']?.correct || 0) + (profile.topicStats['Số học']?.correct || 0) >= 5,
    progress: (profile: UserProfile) => ({
      current: Math.min(
        (profile.topicStats['Phân số']?.correct || 0) + (profile.topicStats['Số học']?.correct || 0),
        5
      ),
      max: 5,
    }),
  },
  {
    id: 'badge-stats-wizard',
    title: 'Nhà thống kê',
    icon: '📊',
    description: 'Thành thạo xác suất thực nghiệm và phân tích dữ liệu bảng biểu.',
    criteria: 'Đúng 3 câu hỏi Thống kê hoặc Đại số',
    checkUnlocked: (profile: UserProfile) =>
      (profile.topicStats['Đại số']?.correct || 0) >= 5,
    progress: (profile: UserProfile) => ({
      current: Math.min(profile.topicStats['Đại số']?.correct || 0, 5),
      max: 5,
    }),
  },
  {
    id: 'badge-math-master',
    title: 'Bậc thầy Toán học',
    icon: '👑',
    description: 'Chinh phục cột mốc đỉnh cao của vũ trụ MathVerse (Cấp 5).',
    criteria: 'Đạt từ 1500 XP trở lên',
    checkUnlocked: (profile: UserProfile) => profile.xp >= 1500,
    progress: (profile: UserProfile) => ({
      current: Math.min(profile.xp, 1500),
      max: 1500,
    }),
  },
];

export function getUserLevel(xp: number): LevelInfo {
  for (let i = LEVELS_DATA.length - 1; i >= 0; i--) {
    if (xp >= LEVELS_DATA[i].minXp) {
      return LEVELS_DATA[i];
    }
  }
  return LEVELS_DATA[0];
}

export function getNextLevel(xp: number): LevelInfo | null {
  const current = getUserLevel(xp);
  const next = LEVELS_DATA.find((l) => l.level === current.level + 1);
  return next || null;
}
