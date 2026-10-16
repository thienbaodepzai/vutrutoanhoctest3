import React, { useState, useMemo } from 'react';
import { useMathVerse } from '../context/MathVerseContext';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { QUESTIONS_DATA } from '../data/questionsData';
import { Question } from '../types/mathverse';
import {
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Flame,
  Check,
  CheckCheck,
  Filter,
  Trash2,
  TrendingDown,
  BarChart3,
  PenTool,
  Bot,
  RefreshCw,
  X,
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { formatMathNotation, compareMathAnswers } from '../utils/formatMath';
import { generateSimilarQuestion } from '../utils/mathQuestionGenerator';
import { MistakeRecord } from '../types/mathverse';

type ReviewViewTab = 'recent' | 'most_failed' | 'weakest_topics';
type StatusFilter = 'all' | 'unresolved' | 'resolved';

export const SmartReviewMode: React.FC = () => {
  const {
    user,
    setActiveTab,
    setSelectedLessonId,
    setSelectedPracticeTopic,
    recordQuestionResult,
    markMistakeUnderstood,
    removeMistakeRecord,
  } = useMathVerse();

  const mistakes = user?.recentMistakes || [];

  // View state: 'recent' (Gần đây) | 'most_failed' (Sai nhiều nhất) | 'weakest_topics' (Chuyên đề yếu nhất)
  const [activeViewTab, setActiveViewTab] = useState<ReviewViewTab>('recent');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  // Active retry state
  const [retryingQuestionId, setRetryingQuestionId] = useState<string | null>(null);
  const [retryInput, setRetryInput] = useState<string>('');
  const [retrySelectedOption, setRetrySelectedOption] = useState<string | null>(null);
  const [retryFeedback, setRetryFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // AI Similar Question State
  const [similarQuestions, setSimilarQuestions] = useState<Record<string, Question>>({});
  const [activeSimilarQuestionId, setActiveSimilarQuestionId] = useState<string | null>(null);
  const [similarSelectedOption, setSimilarSelectedOption] = useState<Record<string, string>>({});
  const [similarInput, setSimilarInput] = useState<Record<string, string>>({});
  const [similarFeedback, setSimilarFeedback] = useState<
    Record<string, { isCorrect: boolean; message: string }>
  >({});
  const [showSimilarHint, setShowSimilarHint] = useState<Record<string, boolean>>({});

  // Group mistakes by topic and calculate stats
  const topicStatsMap = useMemo(() => {
    const stats: Record<string, { totalMistakes: number; totalFailCounts: number; questionIds: string[] }> = {};
    mistakes.forEach((m) => {
      const topic = m.topic || 'Toán học';
      if (!stats[topic]) {
        stats[topic] = { totalMistakes: 0, totalFailCounts: 0, questionIds: [] };
      }
      stats[topic].totalMistakes += 1;
      stats[topic].totalFailCounts += (m.failCount || 1);
      stats[topic].questionIds.push(m.questionId);
    });
    return stats;
  }, [mistakes]);

  // Weakest topics sorted by total fail counts descending
  const weakestTopics = useMemo(() => {
    return Object.entries(topicStatsMap)
      .map(([topic, data]) => {
        const matchedLesson = CURRICULUM_DATA.find(
          (l) => l.grade === user?.grade && (l.topic === topic || l.title.includes(topic))
        ) || CURRICULUM_DATA.find((l) => l.topic === topic);

        return {
          topic,
          mistakeCount: data.totalMistakes,
          failCount: data.totalFailCounts,
          matchedLesson,
        };
      })
      .sort((a, b) => b.failCount - a.failCount);
  }, [topicStatsMap, user?.grade]);

  // Filtered and sorted mistakes list
  const displayedMistakes = useMemo(() => {
    let list = [...mistakes];

    // Filter by status (resolved vs unresolved)
    if (statusFilter === 'unresolved') {
      list = list.filter((m) => !m.isResolved);
    } else if (statusFilter === 'resolved') {
      list = list.filter((m) => m.isResolved);
    }

    // Sort by tab
    if (activeViewTab === 'most_failed') {
      // 2. Những câu sai nhiều nhất (failCount desc)
      list.sort((a, b) => (b.failCount || 1) - (a.failCount || 1));
    } else if (activeViewTab === 'recent') {
      // 1. Những câu sai gần đây (timestamp desc)
      list.sort((a, b) => b.timestamp - a.timestamp);
    }

    return list;
  }, [mistakes, activeViewTab, statusFilter]);

  // Statistics summaries
  const totalMistakesCount = mistakes.length;
  const unresolvedCount = mistakes.filter((m) => !m.isResolved).length;
  const resolvedCount = mistakes.filter((m) => m.isResolved).length;
  const criticalMistakesCount = mistakes.filter((m) => (m.failCount || 1) >= 2).length;

  const handleStartRetry = (qId: string) => {
    soundManager.playClickSound();
    setRetryingQuestionId(qId);
    setRetryInput('');
    setRetrySelectedOption(null);
    setRetryFeedback(null);
  };

  const handleRetrySubmit = (
    qId: string,
    correctAnswer: string,
    explanation: string,
    topic: string,
    qObj?: Question
  ) => {
    let isCorrect = false;

    if (qObj && qObj.type === 'multiple_choice') {
      isCorrect = compareMathAnswers(retrySelectedOption, qObj.correctAnswer);
    } else if (qObj && qObj.type === 'true_false') {
      isCorrect = compareMathAnswers(retryInput, qObj.correctAnswer);
    } else {
      isCorrect = compareMathAnswers(retryInput, correctAnswer);
    }

    if (isCorrect) {
      soundManager.playCorrectSound();
      soundManager.triggerConfetti();
      setRetryFeedback({
        isCorrect: true,
        message: 'Xuất sắc! Em đã khắc phục được câu hỏi này và nắm vững bản chất bài toán! 🎉 (+25 XP)',
      });

      // Record question result (marks as correct in context and updates competency)
      recordQuestionResult(
        qId,
        true,
        topic,
        qObj?.question || '',
        retrySelectedOption || retryInput,
        correctAnswer,
        explanation,
        25
      );
    } else {
      soundManager.playWrongSound();
      setRetryFeedback({
        isCorrect: false,
        message: 'Vẫn chưa chính xác! Em hãy đọc kỹ hướng dẫn giải chi tiết bên dưới và thử lại nhé.',
      });

      // Still wrong, record question result to increase fail count
      recordQuestionResult(
        qId,
        false,
        topic,
        qObj?.question || '',
        retrySelectedOption || retryInput,
        correctAnswer,
        explanation,
        0
      );
    }
  };

  const handleGenerateSimilar = (mistake: MistakeRecord) => {
    soundManager.playClickSound();

    // Lấy thông tin câu hỏi gốc từ bộ đề (nếu có) để nhận diện chính xác 100% chuyên đề con & dạng toán
    const origQ = QUESTIONS_DATA.find((q) => q.id === mistake.questionId);
    const subtopic = origQ?.subtopic || mistake.subtopic || '';
    const explanation = origQ?.explanation || mistake.explanation || '';
    const mathExpression = origQ?.mathExpression || '';
    const combinedContext = [
      mistake.questionText,
      origQ?.question,
      subtopic,
      mathExpression,
      explanation,
    ]
      .filter(Boolean)
      .join(' ');

    const topic = origQ?.topic || mistake.topic || 'Số học';
    const grade = origQ?.grade || user?.grade || 6;

    const newQ = generateSimilarQuestion(
      combinedContext,
      topic,
      subtopic,
      grade
    );

    setSimilarQuestions((prev) => ({ ...prev, [mistake.questionId]: newQ }));
    setActiveSimilarQuestionId(mistake.questionId);
    setSimilarSelectedOption((prev) => ({ ...prev, [mistake.questionId]: '' }));
    setSimilarInput((prev) => ({ ...prev, [mistake.questionId]: '' }));
    setSimilarFeedback((prev) => {
      const copy = { ...prev };
      delete copy[mistake.questionId];
      return copy;
    });
    setShowSimilarHint((prev) => ({ ...prev, [mistake.questionId]: false }));
  };

  const handleSubmitSimilar = (mistakeId: string, q: Question) => {
    const userAns =
      q.type === 'multiple_choice'
        ? (similarSelectedOption[mistakeId] || '')
        : (similarInput[mistakeId] || '').trim();

    if (!userAns) return;

    const isCorrect = compareMathAnswers(userAns, q.correctAnswer);

    if (isCorrect) {
      soundManager.playCorrectSound();
      soundManager.triggerConfetti();
      const xpEarned = q.xpReward || 20;
      setSimilarFeedback((prev) => ({
        ...prev,
        [mistakeId]: {
          isCorrect: true,
          message: `Tuyệt vời! Em đã giải chính xác bài tương tự này. Lỗ hổng ở dạng bài này đã được bù đắp thành công! 🎉 (+${xpEarned} XP)`,
        },
      }));
      // Record practice result
      recordQuestionResult(
        q.id,
        true,
        q.topic,
        q.question,
        userAns,
        String(q.correctAnswer),
        q.explanation,
        xpEarned
      );
      // Auto-mark the mistake as understood
      markMistakeUnderstood(mistakeId);
    } else {
      soundManager.playWrongSound();
      setSimilarFeedback((prev) => ({
        ...prev,
        [mistakeId]: {
          isCorrect: false,
          message: 'Vẫn chưa chính xác! Em hãy xem hướng dẫn giải chi tiết bên dưới và thử giải lại nhé.',
        },
      }));
      recordQuestionResult(
        q.id,
        false,
        q.topic,
        q.question,
        userAns,
        String(q.correctAnswer),
        q.explanation,
        0
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <RotateCcw className="w-7 h-7 text-violet-400" />
            <span>Ôn tập Lỗi sai (Smart Review)</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Hệ thống tự động ghi nhận câu sai, đếm số lần sai lặp lại và định hướng làm lại từng bước.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('analytics')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-violet-400 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <span>Báo cáo năng lực</span>
        </button>
      </div>

      {/* Hộp cảnh báo AI Disclaimer (Màu vàng nhạt, Responsive, Mobile friendly) */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-200 shadow-sm flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5 leading-relaxed text-xs sm:text-sm">
          <div className="font-bold text-amber-300">
            ⚠ Lưu ý:
          </div>
          <div className="text-amber-200/90 space-y-0.5">
            <p>AI chỉ là công cụ hỗ trợ học tập.</p>
            <p>AI có thể đưa ra lời giải chưa chính xác hoặc bỏ sót bước.</p>
            <p>Hãy tự kiểm tra kết quả hoặc hỏi giáo viên khi cần.</p>
          </div>
        </div>
      </div>

      {/* 4 Thống kê nhanh về lỗi sai */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Tổng câu đã sai</span>
            <AlertCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{totalMistakesCount}</div>
          <div className="text-[10px] text-slate-400">Đã lưu trong máy</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Cần khắc phục</span>
            <RotateCcw className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">{unresolvedCount}</div>
          <div className="text-[10px] text-slate-400">Chưa làm lại đúng</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Sai nhiều lần (≥2)</span>
            <Flame className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-400">{criticalMistakesCount}</div>
          <div className="text-[10px] text-slate-400">Cần ưu tiên ôn gấp</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Đã hiểu bài</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">{resolvedCount}</div>
          <div className="text-[10px] text-slate-400">Đã khắc phục thành công</div>
        </div>
      </div>

      {/* 3 TABS ĐIỀU HƯỚNG THEO YÊU CẦU:
          1. Những câu sai gần đây
          2. Những câu sai nhiều nhất
          3. Những chuyên đề yếu nhất
      */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => {
              soundManager.playClickSound();
              setActiveViewTab('recent');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeViewTab === 'recent'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>1. Câu sai gần đây</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClickSound();
              setActiveViewTab('most_failed');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeViewTab === 'most_failed'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span>2. Sai nhiều nhất ({criticalMistakesCount})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClickSound();
              setActiveViewTab('weakest_topics');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeViewTab === 'weakest_topics'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5 text-cyan-300" />
            <span>3. Chuyên đề yếu nhất</span>
          </button>
        </div>

        {/* Lọc trạng thái (khi đang ở tab câu hỏi) */}
        {activeViewTab !== 'weakest_topics' && (
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs self-start sm:self-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                statusFilter === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setStatusFilter('unresolved')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                statusFilter === 'unresolved' ? 'bg-amber-950/80 text-amber-300 font-bold border border-amber-500/40' : 'text-slate-400 hover:text-amber-300'
              }`}
            >
              Cần ôn ({unresolvedCount})
            </button>
            <button
              onClick={() => setStatusFilter('resolved')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                statusFilter === 'resolved' ? 'bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-500/40' : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              Đã hiểu ({resolvedCount})
            </button>
          </div>
        )}
      </div>

      {/* TAB 3: NHỮNG CHUYÊN ĐỀ YẾU NHẤT */}
      {activeViewTab === 'weakest_topics' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-rose-400" />
                  <span>Xếp hạng các chuyên đề sai sót nhiều nhất</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tổng hợp từ lịch sử làm bài để định hướng trọng tâm ôn tập.
                </p>
              </div>
            </div>

            {weakestTopics.length > 0 ? (
              <div className="space-y-3">
                {weakestTopics.map((item, idx) => (
                  <div
                    key={item.topic}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center font-mono font-bold text-xs">
                          #{idx + 1}
                        </span>
                        <h4 className="text-base font-bold text-white">{item.topic}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[11px] font-bold">
                          {item.failCount} lượt sai
                        </span>
                      </div>

                      <p className="text-xs text-slate-400">
                        Ghi nhận {item.mistakeCount} câu hỏi khác nhau bị sai trong chuyên đề này.
                      </p>

                      {item.matchedLesson && (
                        <div className="text-xs text-indigo-300 flex items-center gap-1.5 pt-1">
                          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Bài học SGK gợi ý: <strong>{item.matchedLesson.title}</strong></span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.matchedLesson && (
                        <button
                          type="button"
                          onClick={() => {
                            soundManager.playClickSound();
                            setSelectedLessonId(item.matchedLesson!.id);
                            setActiveTab('lessons');
                          }}
                          className="px-3.5 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-400/30 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Ôn bài học</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          soundManager.playClickSound();
                          setSelectedPracticeTopic(item.topic);
                          setActiveTab('practice');
                        }}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                      >
                        <PenTool className="w-3.5 h-3.5" />
                        <span>Luyện tập</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                Chưa có dữ liệu chuyên đề sai nào. Hãy tiếp tục duy trì kết quả tuyệt vời này!
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 1 & TAB 2: DANH SÁCH CÂU HỎI SAI (GẦN ĐÂY / SAI NHIỀU NHẤT) */}
      {activeViewTab !== 'weakest_topics' && (
        <div className="space-y-4">
          {displayedMistakes.length > 0 ? (
            <div className="space-y-3">
              {displayedMistakes.map((m, idx) => {
                const isRetrying = retryingQuestionId === m.questionId;
                const failTimes = m.failCount || 1;
                const isResolved = m.isResolved || false;
                const qObj = QUESTIONS_DATA.find((q) => q.id === m.questionId);

                return (
                  <div
                    key={m.questionId || idx}
                    className={`p-5 rounded-2xl border transition-all space-y-3 ${
                      isResolved
                        ? 'bg-slate-900/60 border-emerald-500/30'
                        : failTimes >= 2
                        ? 'bg-slate-900/90 border-rose-500/40 shadow-lg shadow-rose-950/20'
                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {m.topic}
                          </span>

                          {/* Huy hiệu số lần sai theo yêu cầu */}
                          {failTimes >= 2 ? (
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                              <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                              <span>Sai {failTimes} lần</span>
                            </span>
                          ) : (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                              Lần đầu làm sai
                            </span>
                          )}

                          {/* Huy hiệu trạng thái */}
                          {isResolved ? (
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Đã hiểu bài</span>
                            </span>
                          ) : (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              Cần khắc phục
                            </span>
                          )}

                          <span className="text-[11px] text-slate-400">
                            {new Date(m.timestamp).toLocaleDateString('vi-VN')}
                          </span>
                        </div>

                        {/* Nội dung câu hỏi */}
                        <h4 className="text-sm sm:text-base font-bold text-white leading-snug pt-0.5">
                          {formatMathNotation(m.questionText)}
                        </h4>
                      </div>

                      {/* Các nút hành động chính: Làm lại câu sai & Đánh dấu đã hiểu */}
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap shrink-0">
                        {/* Nút Đánh dấu đã hiểu theo yêu cầu */}
                        <button
                          type="button"
                          onClick={() => markMistakeUnderstood(m.questionId)}
                          className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                            isResolved
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                              : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-emerald-300 hover:border-emerald-500/40'
                          }`}
                          title={isResolved ? 'Đã đánh dấu hiểu bài' : 'Đánh dấu em đã hiểu rõ câu này'}
                        >
                          <CheckCheck className="w-4 h-4 text-emerald-400" />
                          <span className="hidden sm:inline">
                            {isResolved ? 'Đã hiểu' : 'Đánh dấu đã hiểu'}
                          </span>
                        </button>

                        {/* Nút Làm lại câu này */}
                        {!isRetrying && (
                          <button
                            type="button"
                            onClick={() => handleStartRetry(m.questionId)}
                            className="px-3 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-400/40 text-cyan-300 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Làm lại</span>
                          </button>
                        )}

                        {/* Nút Tạo bài tương tự do AI sinh theo yêu cầu */}
                        <button
                          type="button"
                          onClick={() => handleGenerateSimilar(m)}
                          className="px-3 py-2 rounded-xl bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 hover:from-violet-600 hover:to-fuchsia-600 border border-violet-400/40 text-violet-300 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                          title="AI tự động tạo bài toán tương tự để luyện tập củng cố"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Tạo bài tương tự</span>
                        </button>

                        {/* Nút xóa bản ghi */}
                        <button
                          type="button"
                          onClick={() => removeMistakeRecord(m.questionId)}
                          className="p-2 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Xóa câu này khỏi danh sách ôn tập"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* So sánh câu trả lời trước của học sinh & đáp án đúng */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/20 text-rose-300">
                        <strong>Câu trả lời trước của em: </strong>
                        <span className="font-mono">{m.userAnswer || 'Chưa trả lời'}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300">
                        <strong>Đáp án chính xác: </strong>
                        <span className="font-mono">{m.correctAnswer}</span>
                      </div>
                    </div>

                    {/* Hướng dẫn giải chi tiết */}
                    <div className="p-3 rounded-xl bg-slate-950 text-xs text-slate-300 leading-relaxed border border-slate-800 space-y-1">
                      <strong className="text-cyan-400 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Hướng dẫn giải chi tiết:</span>
                      </strong>
                      <div className="whitespace-pre-line text-slate-300/90 pl-5">
                        {formatMathNotation(m.explanation)}
                      </div>
                    </div>

                    {/* KHUNG LÀM LẠI CÂU SAI TƯƠNG TÁC (Interactive Retry) */}
                    {isRetrying && (
                      <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/40 space-y-3 animate-in fade-in duration-200">
                        <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                          <RotateCcw className="w-4 h-4" />
                          <span>Làm lại câu hỏi này ngay bây giờ:</span>
                        </div>

                        {/* Nếu câu hỏi có danh sách options trắc nghiệm */}
                        {qObj && qObj.type === 'multiple_choice' && qObj.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {qObj.options.map((opt, oIdx) => (
                              <button
                                key={oIdx}
                                type="button"
                                onClick={() => setRetrySelectedOption(opt)}
                                className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all cursor-pointer ${
                                  retrySelectedOption === opt
                                    ? 'bg-indigo-600 border-cyan-400 text-white shadow-md'
                                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Nếu là câu điền đáp án hoặc tự luận */}
                        {(!qObj || qObj.type !== 'multiple_choice') && (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={retryInput}
                              onChange={(e) => setRetryInput(e.target.value)}
                              placeholder="Nhập đáp án chuẩn sau khi đã đọc hướng dẫn..."
                              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                            />
                          </div>
                        )}

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() =>
                              handleRetrySubmit(
                                m.questionId,
                                m.correctAnswer,
                                m.explanation,
                                m.topic,
                                qObj
                              )
                            }
                            className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                          >
                            <Check className="w-4 h-4" />
                            <span>Xác nhận đáp án</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setRetryingQuestionId(null)}
                            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl cursor-pointer"
                          >
                            Đóng
                          </button>
                        </div>

                        {retryFeedback && (
                          <div
                            className={`p-3 rounded-xl text-xs font-semibold ${
                              retryFeedback.isCorrect
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/50'
                                : 'bg-rose-950/60 text-rose-300 border border-rose-500/50'
                            }`}
                          >
                            {retryFeedback.message}
                          </div>
                        )}
                      </div>
                    )}

                    {/* KHUNG BÀI TẬP TƯƠNG TỰ DO AI SINH (AI Similar Question) */}
                    {similarQuestions[m.questionId] && activeSimilarQuestionId === m.questionId && (() => {
                      const simQ = similarQuestions[m.questionId];
                      const currentSelected = similarSelectedOption[m.questionId] || '';
                      const currentInput = similarInput[m.questionId] || '';
                      const feedback = similarFeedback[m.questionId];
                      const isShowingHint = showSimilarHint[m.questionId] || false;

                      return (
                        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-purple-950/40 via-slate-900 to-indigo-950/30 border border-purple-500/40 space-y-4 animate-in fade-in duration-200">
                          {/* Header của bài toán tương tự */}
                          <div className="flex items-center justify-between gap-2 flex-wrap border-b border-purple-500/20 pb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300">
                                <Bot className="w-4 h-4 text-purple-300" />
                              </div>
                              <div>
                                <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 flex-wrap">
                                  <span>Bài toán tương tự do AI sinh</span>
                                  <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px]">
                                    {simQ.subtopic || simQ.topic}
                                  </span>
                                </div>
                                <span className="text-[11px] text-slate-400">
                                  Thuật toán đối xứng • Đảm bảo 100% chuẩn đáp án
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleGenerateSimilar(m)}
                                className="px-2.5 py-1.5 rounded-lg bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                                title="Đổi đề bài khác cùng dạng"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                                <span>Sinh đề khác</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setActiveSimilarQuestionId(null)}
                                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                title="Đóng bài tương tự"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Nội dung câu hỏi tương tự */}
                          <div className="space-y-1.5">
                            <h5 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                              {formatMathNotation(simQ.question)}
                            </h5>
                            {simQ.mathExpression && (
                              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-cyan-300 text-sm font-semibold inline-block">
                                {simQ.mathExpression}
                              </div>
                            )}
                          </div>

                          {/* Gợi ý nếu có */}
                          {simQ.hint && (
                            <div>
                              <button
                                type="button"
                                onClick={() =>
                                  setShowSimilarHint((prev) => ({
                                    ...prev,
                                    [m.questionId]: !isShowingHint,
                                  }))
                                }
                                className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer font-medium"
                              >
                                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                                <span>{isShowingHint ? 'Ẩn gợi ý' : 'Xem gợi ý giải nhanh'}</span>
                              </button>
                              {isShowingHint && (
                                <p className="mt-1.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
                                  💡 {simQ.hint}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Phương án trắc nghiệm hoặc ô nhập đáp án */}
                          {simQ.type === 'multiple_choice' && simQ.options && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {simQ.options.map((opt, oIdx) => {
                                const isSelected = currentSelected === opt;
                                return (
                                  <button
                                    key={oIdx}
                                    type="button"
                                    disabled={feedback?.isCorrect}
                                    onClick={() =>
                                      setSimilarSelectedOption((prev) => ({
                                        ...prev,
                                        [m.questionId]: opt,
                                      }))
                                    }
                                    className={`p-3 rounded-xl text-left text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                                      isSelected
                                        ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-purple-500/50 hover:bg-slate-900'
                                    }`}
                                  >
                                    <span className="font-mono font-bold mr-2 text-purple-300">
                                      {String.fromCharCode(65 + oIdx)}.
                                    </span>
                                    <span>{opt}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {simQ.type !== 'multiple_choice' && (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                disabled={feedback?.isCorrect}
                                value={currentInput}
                                onChange={(e) =>
                                  setSimilarInput((prev) => ({
                                    ...prev,
                                    [m.questionId]: e.target.value,
                                  }))
                                }
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleSubmitSimilar(m.questionId, simQ);
                                  }
                                }}
                                placeholder="Nhập đáp án của em (VD: 5/6, 12, ...)"
                                className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              />
                            </div>
                          )}

                          {/* Nút kiểm tra đáp án */}
                          <div className="flex items-center gap-2 pt-1">
                            {!feedback?.isCorrect && (
                              <button
                                type="button"
                                onClick={() => handleSubmitSimilar(m.questionId, simQ)}
                                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                              >
                                <Check className="w-4 h-4" />
                                <span>Kiểm tra đáp án</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => setActiveSimilarQuestionId(null)}
                              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl cursor-pointer"
                            >
                              Đóng
                            </button>
                          </div>

                          {/* Phản hồi và Lời giải chi tiết */}
                          {feedback && (
                            <div className="space-y-3 pt-1">
                              <div
                                className={`p-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                                  feedback.isCorrect
                                    ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/50'
                                    : 'bg-rose-950/70 text-rose-300 border border-rose-500/50'
                                }`}
                              >
                                {feedback.isCorrect ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                                )}
                                <span>{feedback.message}</span>
                              </div>

                              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5 leading-relaxed">
                                <strong className="text-purple-300 flex items-center gap-1.5">
                                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                                  <span>Hướng dẫn giải chi tiết bài tương tự:</span>
                                </strong>
                                <div className="whitespace-pre-line text-slate-300/90 pl-5">
                                  {formatMathNotation(simQ.explanation)}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <div className="text-5xl">🎉</div>
              <h3 className="text-xl font-bold text-white">
                {statusFilter === 'unresolved'
                  ? 'Em đã khắc phục toàn bộ các câu hỏi cần ôn!'
                  : 'Chưa có câu hỏi sai nào trong danh mục này.'}
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Em đang học tập rất tốt! Hãy tiếp tục luyện tập hoặc thử sức với các bài thi trắc nghiệm để rèn giũa kiến thức nhé.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('practice')}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-sm cursor-pointer shadow-md shadow-indigo-500/20"
              >
                Vào luyện tập ngay
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
