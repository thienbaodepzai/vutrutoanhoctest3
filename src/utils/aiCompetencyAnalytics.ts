import { useEffect, useState } from 'react';
import { UserProfile, StudentAIAnalysis, RoadmapStep, TopicCompetency } from '../types/mathverse';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { QUESTIONS_DATA } from '../data/questionsData';

const STORAGE_ANALYSIS_KEY = 'mathverse_ai_competency_analysis_v1';
const ANALYSIS_EVENT_NAME = 'mathverse_ai_analysis_updated';

/**
 * Lấy kết quả phân tích năng lực đã lưu từ localStorage
 */
export function getStoredAIAnalysis(): StudentAIAnalysis | null {
  try {
    const raw = localStorage.getItem(STORAGE_ANALYSIS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    console.error('Lỗi khi đọc phân tích năng lực AI từ localStorage:', error);
    return null;
  }
}

/**
 * Thuật toán AI phân tích năng lực học sinh theo chuyên đề (100% Client-side Heuristic & Pedagogical Analysis)
 * - Tự động phát hiện điểm mạnh (tỷ lệ đúng cao, ổn định)
 * - Tự động phát hiện điểm yếu (tỷ lệ đúng thấp hoặc sai lặp lại)
 * - Chỉ định chuyên đề cần ôn tập cấp thiết
 * - Sinh lộ trình học tập cá nhân hóa 3 bước hành động cụ thể
 */
export function analyzeStudentCompetency(user: UserProfile): StudentAIAnalysis {
  const currentGrade = user.grade || 6;
  const topicStats = user.topicStats || {};
  const mistakes = user.recentMistakes || [];

  // Tính toán số liệu từng chuyên đề
  const topicCompetencies: TopicCompetency[] = Object.entries(topicStats).map(([topic, stats]) => {
    const total = stats.total || 0;
    const correct = stats.correct || 0;
    const rate = total > 0 ? Math.round((correct / total) * 100) : 0;
    
    let status: 'strong' | 'weak' | 'moderate' | 'untested' = 'untested';
    if (total >= 2) {
      if (rate >= 70) status = 'strong';
      else if (rate < 60) status = 'weak';
      else status = 'moderate';
    } else if (total === 1) {
      status = rate === 100 ? 'strong' : 'weak';
    }

    return { topic, total, correct, rate, status };
  });

  // 1. Xác định ĐIỂM MẠNH (Strengths)
  const strongList = topicCompetencies
    .filter((t) => t.status === 'strong')
    .sort((a, b) => b.rate - a.rate)
    .map((t) => t.topic);

  // 2. Xác định ĐIỂM YẾU (Weaknesses)
  // Kết hợp cả thống kê chủ đề và số lần sai gần đây trong recentMistakes
  const mistakeCountsByTopic: Record<string, number> = {};
  mistakes.forEach((m) => {
    mistakeCountsByTopic[m.topic] = (mistakeCountsByTopic[m.topic] || 0) + 1;
  });

  const weakList = topicCompetencies
    .filter((t) => t.status === 'weak' || (mistakeCountsByTopic[t.topic] || 0) >= 2)
    .sort((a, b) => {
      const aMistakes = mistakeCountsByTopic[a.topic] || 0;
      const bMistakes = mistakeCountsByTopic[b.topic] || 0;
      return bMistakes - aMistakes || a.rate - b.rate;
    })
    .map((t) => t.topic);

  // Nếu chưa có thống kê cụ thể nhưng có câu sai gần đây
  Object.keys(mistakeCountsByTopic).forEach((topic) => {
    if (!weakList.includes(topic)) {
      weakList.push(topic);
    }
  });

  // 3. CHUYÊN ĐỀ CẦN ÔN (Topics to review)
  // Ưu tiên chuyên đề yếu nhất hoặc có nhiều lỗi sai nhất
  const topicsToReview = weakList.slice(0, 3);

  // 4. ĐỀ XUẤT LỘ TRÌNH HỌC TẬP (Personalized Roadmap)
  const roadmap: RoadmapStep[] = [];
  const primaryWeakTopic = topicsToReview[0] || (weakList.length > 0 ? weakList[0] : null);

  if (primaryWeakTopic) {
    // Tìm bài học tương ứng trong chương trình của lớp hiện tại
    const matchedLesson = CURRICULUM_DATA.find(
      (l) => l.grade === currentGrade && (l.topic === primaryWeakTopic || l.title.includes(primaryWeakTopic))
    ) || CURRICULUM_DATA.find((l) => l.topic === primaryWeakTopic);

    roadmap.push({
      stepNumber: 1,
      title: `Ôn tập lý thuyết ${matchedLesson ? matchedLesson.title : primaryWeakTopic}`,
      description: `Đọc lại định nghĩa, công thức và ví dụ minh họa về ${primaryWeakTopic} để củng cố nền tảng kiến thức.`,
      actionType: 'lesson',
      targetTopic: primaryWeakTopic,
      targetLessonId: matchedLesson?.id,
      isCompleted: matchedLesson ? user.completedLessons.includes(matchedLesson.id) : false,
    });

    roadmap.push({
      stepNumber: 2,
      title: `Luyện tập 10 bài tập chuyên đề ${primaryWeakTopic}`,
      description: `Làm các dạng bài từ cơ bản đến vận dụng trong mục Luyện tập để khắc phục lỗi chuyển vế, quy đồng hoặc tính toán.`,
      actionType: 'practice',
      targetTopic: primaryWeakTopic,
      isCompleted: false,
    });

    roadmap.push({
      stepNumber: 3,
      title: `Thi trắc nghiệm đánh giá lại chuyên đề ${primaryWeakTopic}`,
      description: `Làm bài thi trắc nghiệm bấm giờ 10-15 phút để kiểm định độ tiến bộ và mở khóa các huy hiệu năng lực mới.`,
      actionType: 'quiz',
      targetTopic: primaryWeakTopic,
      isCompleted: false,
    });
  } else if (strongList.length > 0) {
    // Học sinh đang làm rất tốt mọi chủ đề!
    roadmap.push({
      stepNumber: 1,
      title: `Duy trì phong độ với chuyên đề nâng cao: ${strongList[0]}`,
      description: `Em đã nắm rất chắc kiến thức cơ bản! Hãy thử sức với các bài tập vận dụng cao trong mục Thử thách vũ trụ.`,
      actionType: 'practice',
      targetTopic: strongList[0],
      isCompleted: false,
    });

    roadmap.push({
      stepNumber: 2,
      title: `Tham gia Thử thách Trí tuệ 60 giây`,
      description: `Rèn luyện tốc độ phản xạ và tư duy logic dưới áp lực thời gian với các bài toán trắc nghiệm nhanh.`,
      actionType: 'quiz',
      isCompleted: false,
    });

    roadmap.push({
      stepNumber: 3,
      title: `Thi vượt cấp / Nâng hạng trình độ Toán Lớp ${currentGrade + 1 <= 9 ? currentGrade + 1 : 9}`,
      description: `Làm bài thi đánh giá tổng hợp để mở khóa chương trình học nâng cao tiếp theo.`,
      actionType: 'quiz',
      isCompleted: false,
    });
  } else {
    // Người dùng mới bắt đầu
    roadmap.push({
      stepNumber: 1,
      title: `Bắt đầu với bài học đầu tiên môn Toán Lớp ${currentGrade}`,
      description: `Khám phá các bài học tương tác theo sách Kết nối tri thức để làm quen với phương pháp học mới.`,
      actionType: 'lesson',
      isCompleted: false,
    });

    roadmap.push({
      stepNumber: 2,
      title: `Làm 5 bài luyện tập khởi động`,
      description: `Trả lời các câu hỏi trắc nghiệm và điền số đơn giản để hệ thống AI thu thập dữ liệu năng lực đầu tiên.`,
      actionType: 'practice',
      isCompleted: false,
    });

    roadmap.push({
      stepNumber: 3,
      title: `Trò chuyện cùng MathBot AI`,
      description: `Hỏi MathBot về những công thức em chưa rõ hoặc nhờ hướng dẫn giải chi tiết từng bước.`,
      actionType: 'practice',
      isCompleted: false,
    });
  }

  // Tạo nhận xét tổng quan của AI
  const overallAccuracy = user.answeredQuestionsCount > 0
    ? Math.round((user.correctAnswersCount / user.answeredQuestionsCount) * 100)
    : 0;

  let aiSummary = '';
  if (user.answeredQuestionsCount === 0) {
    aiSummary = `Chào ${user.name || 'em'}! Hệ thống AI đang sẵn sàng phân tích năng lực. Hãy bắt đầu làm từ 3-5 câu hỏi trong mục Học bài hoặc Luyện tập để AI xây dựng biểu đồ chính xác nhé.`;
  } else if (weakList.length > 0) {
    aiSummary = `Dựa trên ${user.answeredQuestionsCount} câu hỏi em đã làm, AI nhận thấy em đang có thế mạnh ở ${strongList.length > 0 ? strongList.join(', ') : 'tinh thần học tập chủ động'}, nhưng cần chú ý củng cố kỹ hơn ở phần ${weakList.join(', ')}. Lộ trình 3 bước dưới đây sẽ giúp em cải thiện nhanh nhất!`;
  } else if (overallAccuracy >= 80) {
    aiSummary = `Năng lực Toán học của em rất xuất sắc với độ chính xác đạt ${overallAccuracy}%. Em duy trì phong độ rất đều ở tất cả các chủ đề đã học. Hãy tiếp tục thử thách bản thân với các bài toán vận dụng cao!`;
  } else {
    aiSummary = `Em đã hoàn thành ${user.answeredQuestionsCount} câu với tỉ lệ chính xác ${overallAccuracy}%. Hãy tiếp tục luyện tập đều đặn mỗi ngày để củng cố các kỹ năng giải toán.`;
  }

  const analysis: StudentAIAnalysis = {
    id: `analysis-${Date.now()}`,
    analyzedAt: Date.now(),
    totalAnswered: user.answeredQuestionsCount,
    overallAccuracy,
    strengths: strongList.length > 0 ? strongList : (user.answeredQuestionsCount > 0 ? ['Chăm chỉ rèn luyện'] : []),
    weaknesses: weakList,
    topicsToReview,
    roadmap,
    aiSummary,
  };

  try {
    localStorage.setItem(STORAGE_ANALYSIS_KEY, JSON.stringify(analysis));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(ANALYSIS_EVENT_NAME));
    }
  } catch (error) {
    console.error('Lỗi khi lưu phân tích năng lực vào localStorage:', error);
  }

  return analysis;
}

/**
 * Custom React Hook theo dõi kết quả phân tích năng lực AI theo thời gian thực
 */
export function useAICompetencyAnalysis(user: UserProfile | null) {
  const [analysis, setAnalysis] = useState<StudentAIAnalysis | null>(() => {
    const cached = getStoredAIAnalysis();
    if (cached) return cached;
    if (user) return analyzeStudentCompetency(user);
    return null;
  });

  const reAnalyze = () => {
    if (user) {
      const fresh = analyzeStudentCompetency(user);
      setAnalysis(fresh);
    }
  };

  useEffect(() => {
    if (user) {
      // Tự động phân tích khi user thay đổi hoặc khởi động
      const updated = analyzeStudentCompetency(user);
      setAnalysis(updated);
    }

    const handleEvent = () => {
      const stored = getStoredAIAnalysis();
      if (stored) setAnalysis(stored);
    };

    window.addEventListener(ANALYSIS_EVENT_NAME, handleEvent);
    window.addEventListener('storage', handleEvent);

    return () => {
      window.removeEventListener(ANALYSIS_EVENT_NAME, handleEvent);
      window.removeEventListener('storage', handleEvent);
    };
  }, [user?.answeredQuestionsCount, user?.correctAnswersCount, user?.recentMistakes?.length]);

  return {
    analysis,
    reAnalyze,
  };
}
