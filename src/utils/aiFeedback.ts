import { useEffect, useState } from 'react';
import { AIFeedbackRecord, AIAccuracyStats } from '../types/mathverse';

const STORAGE_RECORDS_KEY = 'mathbot_feedback_records_v1';
const STORAGE_TOTAL_ANSWERS_KEY = 'mathbot_total_answers_v1';
const FEEDBACK_EVENT_NAME = 'mathbot_feedback_updated';

/**
 * Lấy danh sách toàn bộ phản hồi AI từ localStorage
 */
export function getAIFeedbackHistory(): AIFeedbackRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_RECORDS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Lỗi khi đọc lịch sử phản hồi MathBot:', error);
    return [];
  }
}

/**
 * Lấy tổng số câu trả lời MathBot đã tạo
 */
export function getAITotalAnswersCount(): number {
  try {
    const raw = localStorage.getItem(STORAGE_TOTAL_ANSWERS_KEY);
    if (raw) {
      const val = parseInt(raw, 10);
      if (!isNaN(val) && val >= 0) return val;
    }
  } catch (error) {
    console.error('Lỗi đọc tổng số câu trả lời AI:', error);
  }
  return 0;
}

/**
 * Tăng số lượng câu trả lời AI (gọi mỗi khi MathBot trả về lời giải)
 */
export function incrementAITotalAnswers(amount: number = 1): number {
  try {
    const current = getAITotalAnswersCount();
    const updated = current + amount;
    localStorage.setItem(STORAGE_TOTAL_ANSWERS_KEY, updated.toString());
    notifyFeedbackChange();
    return updated;
  } catch (error) {
    console.error('Lỗi khi cập nhật tổng số câu trả lời AI:', error);
    return 1;
  }
}

/**
 * Lưu phản hồi của người dùng vào localStorage:
 * - Nội dung câu hỏi
 * - Câu trả lời AI
 * - Thời gian (timestamp)
 * - Đánh giá: 'helpful' (Hữu ích) hoặc 'wrong' (AI sai rồi)
 */
export function recordAIFeedback(params: {
  question: string;
  answer: string;
  rating: 'helpful' | 'wrong';
  messageId?: string;
  feedbackNote?: string;
}): AIFeedbackRecord {
  const history = getAIFeedbackHistory();
  const existingIndex = params.messageId
    ? history.findIndex((item) => item.messageId === params.messageId)
    : -1;

  const newRecord: AIFeedbackRecord = {
    id: existingIndex >= 0 ? history[existingIndex].id : `fb-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    messageId: params.messageId,
    question: params.question || 'Câu hỏi Toán học',
    answer: params.answer || '',
    timestamp: Date.now(),
    rating: params.rating,
    feedbackNote: params.feedbackNote,
  };

  if (existingIndex >= 0) {
    history[existingIndex] = newRecord;
  } else {
    history.unshift(newRecord);
  }

  // Đảm bảo tổng số câu trả lời tối thiểu bằng số lượng phản hồi ghi nhận
  const currentTotal = getAITotalAnswersCount();
  if (currentTotal < history.length) {
    localStorage.setItem(STORAGE_TOTAL_ANSWERS_KEY, history.length.toString());
  }

  try {
    localStorage.setItem(STORAGE_RECORDS_KEY, JSON.stringify(history));
    notifyFeedbackChange();
  } catch (error) {
    console.error('Lỗi khi lưu phản hồi AI vào localStorage:', error);
  }

  return newRecord;
}

/**
 * Xóa một bản ghi phản hồi cụ thể
 */
export function deleteAIFeedbackRecord(id: string): void {
  try {
    const history = getAIFeedbackHistory().filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_RECORDS_KEY, JSON.stringify(history));
    notifyFeedbackChange();
  } catch (error) {
    console.error('Lỗi khi xóa bản ghi phản hồi AI:', error);
  }
}

/**
 * Đặt lại toàn bộ lịch sử phản hồi và bộ đếm (cho mục đích kiểm thử / quản trị)
 */
export function resetAIFeedbackData(): void {
  try {
    localStorage.removeItem(STORAGE_RECORDS_KEY);
    localStorage.setItem(STORAGE_TOTAL_ANSWERS_KEY, '0');
    notifyFeedbackChange();
  } catch (error) {
    console.error('Lỗi khi reset dữ liệu AI feedback:', error);
  }
}

/**
 * Tính toán số liệu thống kê phản biện MathBot AI:
 * - Tổng số câu trả lời AI
 * - Số lần AI bị báo sai
 * - Số lần đánh giá hữu ích
 * - Tỷ lệ báo sai (%)
 */
export function getAIFeedbackStats(): AIAccuracyStats {
  const records = getAIFeedbackHistory();
  const storedTotal = getAITotalAnswersCount();
  
  // Tổng số câu trả lời là số lần AI sinh câu trả lời (hoặc ít nhất bằng số lượng phản hồi đã nhận)
  const totalAnswers = Math.max(storedTotal, records.length);
  
  const wrongCount = records.filter((r) => r.rating === 'wrong').length;
  const helpfulCount = records.filter((r) => r.rating === 'helpful').length;
  
  // Tỷ lệ báo sai (%) làm tròn 1 chữ số thập phân
  const wrongRate = totalAnswers > 0
    ? Math.round((wrongCount / totalAnswers) * 1000) / 10
    : 0;

  return {
    totalAnswers,
    wrongCount,
    helpfulCount,
    wrongRate,
    records,
  };
}

/**
 * Phát sự kiện thông báo để các component cập nhật theo thời gian thực
 */
function notifyFeedbackChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(FEEDBACK_EVENT_NAME));
  }
}

/**
 * Custom React Hook theo dõi thống kê phản biện AI trong thời gian thực
 */
export function useAIFeedbackStats(): AIAccuracyStats & {
  refreshStats: () => void;
  resetStats: () => void;
} {
  const [stats, setStats] = useState<AIAccuracyStats>(() => getAIFeedbackStats());

  const refreshStats = () => {
    setStats(getAIFeedbackStats());
  };

  useEffect(() => {
    refreshStats();

    const handleUpdate = () => {
      refreshStats();
    };

    window.addEventListener(FEEDBACK_EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(FEEDBACK_EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    ...stats,
    refreshStats,
    resetStats: resetAIFeedbackData,
  };
}
