import { useState, useEffect } from 'react';
import { UserSurveyRecord, UserFeedbackStats, UserProfile } from '../types/mathverse';

const STORAGE_SURVEYS_KEY = 'mathverse_user_surveys_v1';
const STORAGE_LAST_SURVEY_TIME_KEY = 'mathverse_last_survey_time_v1';
const SURVEY_UPDATED_EVENT = 'mathverse_survey_updated';

// Danh sách các tính năng chính của hệ thống để học sinh bình chọn
export const SURVEY_FEATURES = [
  { id: 'mathbot', label: 'MathBot AI giải đáp từng bước', icon: '🤖' },
  { id: 'smart_review', label: 'Ôn tập lỗi sai & Tạo bài tương tự', icon: '🔄' },
  { id: 'challenges', label: 'Thử thách Toán học tính giờ', icon: '🎯' },
  { id: 'analytics', label: 'AI phân tích năng lực & Lộ trình', icon: '📊' },
  { id: 'promotion', label: 'Bài thi thăng hạng lớp', icon: '🚀' },
  { id: 'music', label: 'Nghe nhạc Lofi tập trung khi học', icon: '🎵' },
];

// Dữ liệu khảo sát mẫu ban đầu để dashboard luôn có biểu đồ và số liệu trực quan
const INITIAL_SEED_SURVEYS: UserSurveyRecord[] = [
  {
    id: 'srv-1',
    userName: 'Nguyễn Minh Khôi',
    grade: 6,
    weekNumber: 1,
    easeOfUseRating: 5,
    helpfulnessRating: 5,
    favoriteFeature: 'MathBot AI giải đáp từng bước',
    feedbackText: 'MathBot trả lời rất ân cần, giải thích từng bước phép tính phân số giúp em hiểu sâu bản chất chứ không chỉ cho đáp số.',
    timestamp: Date.now() - 21 * 86400000,
  },
  {
    id: 'srv-2',
    userName: 'Trần Bảo Ngọc',
    grade: 7,
    weekNumber: 1,
    easeOfUseRating: 5,
    helpfulnessRating: 5,
    favoriteFeature: 'Ôn tập lỗi sai & Tạo bài tương tự',
    feedbackText: 'Tính năng tạo bài tương tự rất hay! Em làm sai câu tỉ số là AI tạo ngay câu khác cùng dạng để em luyện đến khi hiểu thì thôi.',
    timestamp: Date.now() - 19 * 86400000,
  },
  {
    id: 'srv-3',
    userName: 'Lê Hoàng Nam',
    grade: 8,
    weekNumber: 2,
    easeOfUseRating: 4,
    helpfulnessRating: 5,
    favoriteFeature: 'AI phân tích năng lực & Lộ trình',
    feedbackText: 'Báo cáo chỉ rõ em yếu phần định lý Pythagore và đưa ra lộ trình 3 bước rất thiết thực. Giao diện đẹp và mượt mà.',
    timestamp: Date.now() - 14 * 86400000,
  },
  {
    id: 'srv-4',
    userName: 'Phạm Quỳnh Chi',
    grade: 6,
    weekNumber: 2,
    easeOfUseRating: 5,
    helpfulnessRating: 4,
    favoriteFeature: 'MathBot AI giải đáp từng bước',
    feedbackText: 'Em thích nhất các nút gợi ý câu hỏi nhanh. Giao diện phi hành gia không gian tạo cảm hứng học bài mỗi tối.',
    timestamp: Date.now() - 12 * 86400000,
  },
  {
    id: 'srv-5',
    userName: 'Vũ Đức Duy',
    grade: 9,
    weekNumber: 3,
    easeOfUseRating: 5,
    helpfulnessRating: 5,
    favoriteFeature: 'Bài thi thăng hạng lớp',
    feedbackText: 'Bộ đề thi thăng hạng kiểm tra kiến thức rất chuẩn. Em vừa thi đỗ lên Lớp 9 thành công!',
    timestamp: Date.now() - 7 * 86400000,
  },
  {
    id: 'srv-6',
    userName: 'Đặng Tuấn Kiệt',
    grade: 7,
    weekNumber: 3,
    easeOfUseRating: 5,
    helpfulnessRating: 5,
    favoriteFeature: 'Ôn tập lỗi sai & Tạo bài tương tự',
    feedbackText: 'Phần Smart Review lưu lại đúng những câu em bấm nhầm, em đã ôn lại và hiểu 100% chuyên đề số hữu tỉ.',
    timestamp: Date.now() - 5 * 86400000,
  },
  {
    id: 'srv-7',
    userName: 'Hoàng Ánh Dương',
    grade: 8,
    weekNumber: 4,
    easeOfUseRating: 4,
    helpfulnessRating: 5,
    favoriteFeature: 'Thử thách Toán học tính giờ',
    feedbackText: 'Chế độ đấu trường 60 giây luyện phản xạ tính nhẩm cực tốt. Em thích nhạc nền Lofi khi giải toán.',
    timestamp: Date.now() - 2 * 86400000,
  },
  {
    id: 'srv-8',
    userName: 'Bùi Gia Huy',
    grade: 6,
    weekNumber: 4,
    easeOfUseRating: 5,
    helpfulnessRating: 5,
    favoriteFeature: 'MathBot AI giải đáp từng bước',
    feedbackText: 'Trợ lý AI trả lời đúng trọng tâm SGK mới. Có thêm nút báo sai rất văn minh để phản biện kết quả.',
    timestamp: Date.now() - 1 * 86400000,
  },
];

/**
 * Lấy toàn bộ danh sách khảo sát từ localStorage (nếu chưa có thì tự động khởi tạo dữ liệu mẫu)
 */
export function getUserSurveys(): UserSurveyRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_SURVEYS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_SURVEYS_KEY, JSON.stringify(INITIAL_SEED_SURVEYS));
      return INITIAL_SEED_SURVEYS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_SEED_SURVEYS;
  } catch (err) {
    console.error('Lỗi khi đọc danh sách khảo sát:', err);
    return INITIAL_SEED_SURVEYS;
  }
}

/**
 * Lưu khảo sát mới vào localStorage
 */
export function saveUserSurvey(
  survey: Omit<UserSurveyRecord, 'id' | 'timestamp'>
): UserSurveyRecord {
  const currentSurveys = getUserSurveys();
  const newRecord: UserSurveyRecord = {
    ...survey,
    id: `srv-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: Date.now(),
  };

  const updated = [newRecord, ...currentSurveys];
  localStorage.setItem(STORAGE_SURVEYS_KEY, JSON.stringify(updated));
  localStorage.setItem(STORAGE_LAST_SURVEY_TIME_KEY, String(Date.now()));

  // Bắn event để cập nhật ngay dashboard theo thời gian thực
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SURVEY_UPDATED_EVENT, { detail: newRecord }));
  }

  return newRecord;
}

/**
 * Xóa một bản ghi khảo sát
 */
export function deleteUserSurvey(id: string): void {
  const current = getUserSurveys();
  const filtered = current.filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_SURVEYS_KEY, JSON.stringify(filtered));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SURVEY_UPDATED_EVENT));
  }
}

/**
 * Đặt lại dữ liệu khảo sát về mặc định
 */
export function resetUserSurveys(): void {
  localStorage.setItem(STORAGE_SURVEYS_KEY, JSON.stringify(INITIAL_SEED_SURVEYS));
  localStorage.removeItem(STORAGE_LAST_SURVEY_TIME_KEY);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SURVEY_UPDATED_EVENT));
  }
}

/**
 * Tính toán số liệu thống kê & biểu đồ trực quan từ các bản ghi khảo sát
 */
export function calculateUserFeedbackStats(surveys: UserSurveyRecord[]): UserFeedbackStats {
  const total = surveys.length;
  if (total === 0) {
    return {
      totalSurveys: 0,
      averageSatisfaction: 0,
      averageEaseOfUse: 0,
      averageHelpfulness: 0,
      mostLikedFeature: 'Chưa có dữ liệu',
      featureBreakdown: [],
      ratingDistribution: [
        { stars: 5, count: 0, percentage: 0 },
        { stars: 4, count: 0, percentage: 0 },
        { stars: 3, count: 0, percentage: 0 },
        { stars: 2, count: 0, percentage: 0 },
        { stars: 1, count: 0, percentage: 0 },
      ],
      weeklyTrends: [],
      records: [],
    };
  }

  // 1. Tính điểm trung bình
  const sumEase = surveys.reduce((acc, s) => acc + (s.easeOfUseRating || 5), 0);
  const sumHelp = surveys.reduce((acc, s) => acc + (s.helpfulnessRating || 5), 0);
  const avgEase = Math.round((sumEase / total) * 10) / 10;
  const avgHelp = Math.round((sumHelp / total) * 10) / 10;
  const avgOverall = Math.round(((avgEase + avgHelp) / 2) * 10) / 10;

  // 2. Thống kê tính năng được yêu thích nhất
  const featureCountMap: Record<string, number> = {};
  surveys.forEach((s) => {
    const feat = s.favoriteFeature || 'Khác';
    featureCountMap[feat] = (featureCountMap[feat] || 0) + 1;
  });

  const featureBreakdown = Object.entries(featureCountMap)
    .map(([feature, count]) => ({
      feature,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  const mostLikedFeature = featureBreakdown.length > 0 ? featureBreakdown[0].feature : 'Chưa có dữ liệu';

  // 3. Phân bổ đánh giá sao (1-5 sao)
  // Tính trung bình mỗi bài làm = round((ease + helpful) / 2)
  const starCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  surveys.forEach((s) => {
    const star = Math.max(1, Math.min(5, Math.round((s.easeOfUseRating + s.helpfulnessRating) / 2)));
    starCounts[star] = (starCounts[star] || 0) + 1;
  });

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: starCounts[stars] || 0,
    percentage: Math.round(((starCounts[stars] || 0) / total) * 100),
  }));

  // 4. Xu hướng điểm số theo tuần
  const weeklyMap: Record<number, { sum: number; count: number }> = {};
  surveys.forEach((s) => {
    const w = s.weekNumber || 1;
    if (!weeklyMap[w]) {
      weeklyMap[w] = { sum: 0, count: 0 };
    }
    const score = (s.easeOfUseRating + s.helpfulnessRating) / 2;
    weeklyMap[w].sum += score;
    weeklyMap[w].count += 1;
  });

  const weeklyTrends = Object.entries(weeklyMap)
    .map(([wStr, data]) => ({
      week: Number(wStr),
      avgRating: Math.round((data.sum / data.count) * 10) / 10,
      count: data.count,
    }))
    .sort((a, b) => a.week - b.week);

  return {
    totalSurveys: total,
    averageSatisfaction: avgOverall,
    averageEaseOfUse: avgEase,
    averageHelpfulness: avgHelp,
    mostLikedFeature,
    featureBreakdown,
    ratingDistribution,
    weeklyTrends,
    records: surveys,
  };
}

/**
 * Hook lắng nghe và trả về dữ liệu khảo sát mới nhất theo thời gian thực
 */
export function useUserFeedbackStats(): UserFeedbackStats {
  const [stats, setStats] = useState<UserFeedbackStats>(() =>
    calculateUserFeedbackStats(getUserSurveys())
  );

  useEffect(() => {
    const handleUpdate = () => {
      setStats(calculateUserFeedbackStats(getUserSurveys()));
    };

    window.addEventListener(SURVEY_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(SURVEY_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return stats;
}

/**
 * Kiểm tra xem có nên hiển thị popup khảo sát hàng tuần cho học sinh không:
 * - Sau mỗi 7 ngày (hoặc học sinh chưa từng làm khảo sát và đã trả lời tối thiểu 3 câu)
 */
export function shouldPromptWeeklySurvey(user: UserProfile | null): boolean {
  if (!user) return false;

  try {
    const lastPromptStr = localStorage.getItem(STORAGE_LAST_SURVEY_TIME_KEY);
    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

    // Nếu đã từng làm/bỏ qua khảo sát, kiểm tra xem đã qua 7 ngày chưa
    if (lastPromptStr) {
      const lastTime = parseInt(lastPromptStr, 10);
      if (!isNaN(lastTime)) {
        return Date.now() - lastTime >= ONE_WEEK_MS;
      }
    }

    // Nếu chưa từng làm khảo sát, kiểm tra xem học sinh đã có trải nghiệm học tập nhất định chưa
    // (ví dụ đã trả lời >= 3 câu hoặc hoàn thành >= 1 bài học)
    if (user.answeredQuestionsCount >= 3 || user.completedLessons.length >= 1) {
      return true;
    }
  } catch {
    // Ignore error
  }

  return false;
}

/**
 * Ghi nhận việc tạm hoãn khảo sát (hẹn nhắc lại sau)
 */
export function snoozeWeeklySurvey(): void {
  // Hoãn khảo sát 2 ngày
  const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;
  localStorage.setItem(STORAGE_LAST_SURVEY_TIME_KEY, String(Date.now() - (7 * 24 * 60 * 60 * 1000 - TWO_DAYS_MS)));
}
