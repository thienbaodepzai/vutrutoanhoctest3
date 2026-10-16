import React, { useState } from 'react';
import { useMathVerse } from '../context/MathVerseContext';
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Target,
  Bot,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  RotateCcw,
  Trash2,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  BookOpen,
  PenTool,
  ArrowRight,
  BrainCircuit,
  Compass,
  Check,
  Flame,
  CheckCheck,
  Star,
  Heart,
} from 'lucide-react';
import { useAIFeedbackStats, deleteAIFeedbackRecord, resetAIFeedbackData } from '../utils/aiFeedback';
import { useAICompetencyAnalysis } from '../utils/aiCompetencyAnalytics';
import { soundManager } from '../utils/soundEffects';
import { UserFeedbackAnalyticsView } from './UserFeedbackAnalyticsView';

export const ProgressAnalyticsView: React.FC = () => {
  const {
    user,
    setActiveTab,
    setSelectedLessonId,
    setSelectedPracticeTopic,
    openSurveyModal,
  } = useMathVerse();
  const aiStats = useAIFeedbackStats();
  const { analysis, reAnalyze } = useAICompetencyAnalysis(user);
  
  const [analyticsTab, setAnalyticsTab] = useState<'all' | 'feedback' | 'competency' | 'audit'>('all');
  const [filterRating, setFilterRating] = useState<'all' | 'wrong' | 'helpful'>('all');
  const [confirmResetAI, setConfirmResetAI] = useState(false);
  const [completedRoadmapSteps, setCompletedRoadmapSteps] = useState<Record<number, boolean>>({});

  if (!user) return null;

  const totalAnswered = user.answeredQuestionsCount;
  const totalCorrect = user.correctAnswersCount;
  const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  // Approximate study time: each answered question ~ 1.5 mins, each lesson ~ 10 mins
  const estimatedMins = Math.round(
    user.answeredQuestionsCount * 1.5 + user.completedLessons.length * 10
  );
  const estimatedHours = (estimatedMins / 60).toFixed(1);

  // Analyze topics
  const topicsData = Object.entries(user.topicStats).map(([topic, stats]) => {
    const rate = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    return {
      topic,
      correct: stats.correct,
      total: stats.total,
      rate,
    };
  });

  // Filter feedback records
  const filteredRecords = aiStats.records.filter((r) => {
    if (filterRating === 'all') return true;
    return r.rating === filterRating;
  });

  const wrongRecords = aiStats.records.filter((r) => r.rating === 'wrong');

  // Thống kê lỗi sai tích hợp cho Smart Review
  const mistakes = user.recentMistakes || [];
  const unresolvedMistakesCount = mistakes.filter((m) => !m.isResolved).length;
  const resolvedMistakesCount = mistakes.filter((m) => m.isResolved).length;
  const criticalMistakesCount = mistakes.filter((m) => (m.failCount || 1) >= 2).length;

  const handleStepAction = (step: any) => {
    soundManager.playClickSound();
    if (step.actionType === 'lesson') {
      if (step.targetLessonId) {
        setSelectedLessonId(step.targetLessonId);
      }
      setActiveTab('lessons');
    } else if (step.actionType === 'practice') {
      if (step.targetTopic) {
        setSelectedPracticeTopic(step.targetTopic);
      }
      setActiveTab('practice');
    } else if (step.actionType === 'quiz') {
      setActiveTab('quiz');
    }
  };

  const toggleStep = (stepNumber: number) => {
    soundManager.playClickSound();
    setCompletedRoadmapSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-cyan-400" />
            <span>Tiến độ & Báo cáo Phân tích Toàn diện</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Hệ thống AI phân tích năng lực cá nhân hóa, kiểm định gia sư MathBot và khảo sát ý kiến học sinh định kỳ.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            soundManager.playClickSound();
            openSurveyModal();
          }}
          className="self-start sm:self-auto px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 flex items-center gap-2 cursor-pointer transition-all active:scale-95 shrink-0"
        >
          <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          <span>Làm khảo sát tuần (+30 XP)</span>
        </button>
      </div>

      {/* 4 Tabs Điều hướng Báo cáo */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => {
            soundManager.playClickSound();
            setAnalyticsTab('all');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            analyticsTab === 'all'
              ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <span>Tất cả báo cáo</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundManager.playClickSound();
            setAnalyticsTab('feedback');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            analyticsTab === 'feedback'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
          }`}
        >
          <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span>Khảo sát người dùng (User Feedback Analytics)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundManager.playClickSound();
            setAnalyticsTab('competency');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            analyticsTab === 'competency'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-cyan-300" />
          <span>Năng lực Toán & Lộ trình</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundManager.playClickSound();
            setAnalyticsTab('audit');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            analyticsTab === 'audit'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
          }`}
        >
          <Bot className="w-4 h-4 text-cyan-300" />
          <span>Kiểm định MathBot AI</span>
        </button>
      </div>

      {/* 4 Big Metrics Grid */}
      {(analyticsTab === 'all' || analyticsTab === 'competency') && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Tổng câu đã làm</span>
              <Target className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{totalAnswered}</div>
            <div className="text-[11px] text-slate-400">Đúng {totalCorrect} câu</div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Tỉ lệ chính xác</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">
              {overallAccuracy}%
            </div>
            <div className="text-[11px] text-slate-400">
              {overallAccuracy >= 80 ? 'Xuất sắc' : overallAccuracy >= 60 ? 'Khá tốt' : 'Cần cố gắng'}
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Tổng điểm XP</span>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="text-3xl font-extrabold text-yellow-300 font-mono">{user.xp}</div>
            <div className="text-[11px] text-slate-400">Điểm kinh nghiệm</div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Thời gian học</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-purple-400 font-mono">
              {estimatedHours}h
            </div>
            <div className="text-[11px] text-slate-400">Khoảng {estimatedMins} phút</div>
          </div>
        </div>
      )}

      {/* DASHBOARD KHẢO SÁT NGƯỜI DÙNG (USER FEEDBACK ANALYTICS) */}
      {(analyticsTab === 'all' || analyticsTab === 'feedback') && (
        <UserFeedbackAnalyticsView onOpenSurveyModal={openSurveyModal} />
      )}

      {/* SECTION: HỆ THỐNG AI PHÂN TÍCH NĂNG LỰC & ĐỀ XUẤT LỘ TRÌNH HỌC TẬP */}
      {(analyticsTab === 'all' || analyticsTab === 'competency') && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/40 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 text-indigo-300 shadow-md shadow-indigo-500/20">
              <BrainCircuit className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  AI Phân tích Năng lực & Lộ trình Cá nhân hóa
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
                  Tự động sau mỗi bài làm
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Thuật toán định vị chính xác điểm mạnh, điểm yếu và xây dựng lộ trình 3 bước khắc phục lỗ hổng kiến thức.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playClickSound();
              reAnalyze();
            }}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Phân tích lại</span>
          </button>
        </div>

        {/* AI Insight Box */}
        {analysis?.aiSummary && (
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-3">
            <Bot className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-indigo-300 block text-xs uppercase tracking-wider">
                Nhận định từ Gia sư AI:
              </span>
              <p>{analysis.aiSummary}</p>
            </div>
          </div>
        )}

        {/* 2 Cột: ĐIỂM MẠNH & ĐIỂM YẾU / CHUYÊN ĐỀ CẦN ÔN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* CỘT 1: ĐIỂM MẠNH */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Điểm mạnh của em</span>
              </h3>
              <span className="text-[11px] text-emerald-400 font-mono font-bold">
                {analysis?.strengths?.length || 0} chuyên đề
              </span>
            </div>

            {analysis?.strengths && analysis.strengths.length > 0 ? (
              <div className="space-y-2">
                {analysis.strengths.map((item, idx) => {
                  const stat = user.topicStats[item];
                  const rate = stat && stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 100;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/20 flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-white flex items-center gap-2">
                        <span className="text-emerald-400">✅</span>
                        <span>{item}</span>
                      </span>
                      {stat ? (
                        <span className="font-mono text-emerald-400 font-bold">
                          {rate}% đúng ({stat.correct}/{stat.total} câu)
                        </span>
                      ) : (
                        <span className="text-[11px] text-emerald-300 font-medium">Nắm vững</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
                Hãy làm thêm câu hỏi để AI xác định những chuyên đề mà em thành thạo nhất!
              </div>
            )}
          </div>

          {/* CỘT 2: ĐIỂM YẾU & CHUYÊN ĐỀ CẦN ÔN */}
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Điểm yếu & Chuyên đề cần ôn</span>
              </h3>
              <span className="text-[11px] text-rose-400 font-mono font-bold">
                {analysis?.weaknesses?.length || 0} chuyên đề
              </span>
            </div>

            {analysis?.weaknesses && analysis.weaknesses.length > 0 ? (
              <div className="space-y-2">
                {analysis.weaknesses.map((item, idx) => {
                  const stat = user.topicStats[item];
                  const rate = stat && stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/80 border border-rose-500/20 flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-white flex items-center gap-2">
                        <span className="text-rose-400">⚠</span>
                        <span>{item}</span>
                      </span>
                      {stat ? (
                        <span className="font-mono text-rose-400 font-bold">
                          {rate}% đúng ({stat.correct}/{stat.total} câu)
                        </span>
                      ) : (
                        <span className="text-[11px] text-rose-300 font-medium">Cần ôn lại</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
                Tuyệt vời! Hiện tại không có chuyên đề nào bị đánh giá yếu.
              </div>
            )}
          </div>
        </div>

        {/* ĐỀ XUẤT LỘ TRÌNH HỌC TẬP (AI LEARNING ROADMAP) */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Đề xuất Lộ trình Học tập Cá nhân hóa</span>
            </h3>
            <span className="text-xs text-cyan-300 font-medium">
              3 bước chinh phục kiến thức
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {analysis?.roadmap?.map((step) => {
              const isDone = completedRoadmapSteps[step.stepNumber] || step.isCompleted;

              return (
                <div
                  key={step.stepNumber}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    isDone
                      ? 'bg-slate-950/40 border-slate-800 opacity-80'
                      : 'bg-slate-950/80 border-indigo-500/30 hover:border-indigo-400/60 shadow-lg'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600/30 border border-indigo-400/40 text-cyan-300 text-xs font-mono font-bold">
                        Bước {step.stepNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleStep(step.stepNumber)}
                        className={`text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                          isDone ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                        }`}
                        title="Đánh dấu đã hoàn thành bước này"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{isDone ? 'Đã xong' : 'Chưa xong'}</span>
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">
                      {step.title}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-800/80 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleStepAction(step)}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-600/20 hover:from-cyan-500/30 hover:to-indigo-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    >
                      {step.actionType === 'lesson' && (
                        <>
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Học bài ngay</span>
                        </>
                      )}
                      {step.actionType === 'practice' && (
                        <>
                          <PenTool className="w-3.5 h-3.5" />
                          <span>Vào luyện tập</span>
                        </>
                      )}
                      {step.actionType === 'quiz' && (
                        <>
                          <Clock className="w-3.5 h-3.5" />
                          <span>Làm bài thi</span>
                        </>
                      )}
                      <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      )}

      {/* SECTION TÍCH HỢP: TRUNG TÂM ÔN TẬP LỖI SAI (SMART REVIEW INTEGRATION) */}
      {(analyticsTab === 'all' || analyticsTab === 'competency') && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-violet-600/30 border border-violet-400/40 text-violet-300 shadow-md shadow-violet-500/20">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-white">
                  Hồ sơ Ôn tập Lỗi sai (Smart Review)
                </h3>
                {unresolvedMistakesCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
                    {unresolvedMistakesCount} câu cần ôn
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Hệ thống lưu ID câu hỏi, chuyên đề và đếm số lần sai lặp lại để nhắc nhở học sinh làm lại và hiểu bài.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playClickSound();
              setActiveTab('smart_review');
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-violet-600/20 flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Vào ôn tập lỗi sai</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider text-[11px]">Cần khắc phục</div>
              <div className="text-2xl font-bold font-mono text-amber-400">{unresolvedMistakesCount} câu</div>
              <div className="text-[10px] text-slate-400">Chưa làm lại đúng</div>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <RotateCcw className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider text-[11px]">Sai nhiều lần (≥ 2)</div>
              <div className="text-2xl font-bold font-mono text-rose-400">{criticalMistakesCount} câu</div>
              <div className="text-[10px] text-slate-400">Ưu tiên ôn tập gấp</div>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Flame className="w-5 h-5 text-rose-400" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider text-[11px]">Đã hiểu bài</div>
              <div className="text-2xl font-bold font-mono text-emerald-400">{resolvedMistakesCount} câu</div>
              <div className="text-[10px] text-slate-400">Khắc phục thành công</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCheck className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Preview danh sách các câu sai */}
        {mistakes.length > 0 ? (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
              <span>Các câu hỏi sai gần đây nhất:</span>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClickSound();
                  setActiveTab('smart_review');
                }}
                className="text-violet-400 hover:text-violet-300 lowercase text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>xem tất cả ({mistakes.length} câu)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {mistakes.slice(0, 3).map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold shrink-0">
                      {m.topic}
                    </span>
                    {(m.failCount || 1) >= 2 && (
                      <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold shrink-0">
                        Sai {m.failCount} lần
                      </span>
                    )}
                    <span className="text-slate-300 truncate font-medium">{m.questionText}</span>
                  </div>
                  <span className={`text-[11px] font-bold shrink-0 ${m.isResolved ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {m.isResolved ? 'Đã hiểu bài' : 'Cần khắc phục'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-center text-xs text-slate-400">
            Học sinh chưa có câu sai nào trong hệ thống. Tuyệt vời!
          </div>
        )}
      </div>
      )}

      {/* SECTION: AI BENCHMARK & AUDIT 2026 (Độ tin cậy & Thống kê phản biện MathBot AI) */}
      {(analyticsTab === 'all' || analyticsTab === 'audit') && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/40 border border-indigo-500/30 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300">
                <Bot className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>Kiểm định & Phản biện MathBot AI</span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
                  Chuẩn AI 2026
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Hệ thống giám sát độ tin cậy và thu thập phản biện của học sinh để đánh giá và tối ưu hoá câu trả lời của gia sư AI.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('mathbot')}
              className="px-3 py-1.5 rounded-xl bg-indigo-600/40 hover:bg-indigo-600/60 border border-indigo-400/40 text-indigo-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Thử nghiệm MathBot</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Yêu cầu thống kê:
            1. Tổng số câu trả lời AI
            2. Số lần AI bị báo sai
            3. Tỷ lệ báo sai (%)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* 1. Tổng số câu trả lời AI */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Tổng câu trả lời AI</span>
              <MessageSquare className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {aiStats.totalAnswers}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <span className="text-emerald-400 flex items-center gap-0.5">
                <ThumbsUp className="w-3 h-3" /> {aiStats.helpfulCount} hữu ích
              </span>
            </div>
          </div>

          {/* 2. Số lần AI bị báo sai */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Số lần bị báo sai</span>
              <ThumbsDown className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono">
              {aiStats.wrongCount}
            </div>
            <div className="text-[11px] text-slate-400">
              {aiStats.wrongCount === 0 ? 'Chưa ghi nhận lỗi' : 'Đã đưa vào dữ liệu phản biện'}
            </div>
          </div>

          {/* 3. Tỷ lệ báo sai (%) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Tỷ lệ báo sai (%)</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div
              className={`text-2xl sm:text-3xl font-extrabold font-mono ${
                aiStats.wrongRate === 0
                  ? 'text-emerald-400'
                  : aiStats.wrongRate < 10
                  ? 'text-cyan-400'
                  : 'text-amber-400'
              }`}
            >
              {aiStats.wrongRate}%
            </div>
            <div className="text-[11px] text-slate-400">
              {aiStats.wrongRate === 0
                ? 'Độ chuẩn xác tuyệt đối (100%)'
                : `Độ tin cậy đạt ${(100 - aiStats.wrongRate).toFixed(1)}%`}
            </div>
          </div>
        </div>

        {/* Audit Log / History List */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                Nhật ký phản hồi & phản biện từ người học
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs font-mono">
                {filteredRecords.length}
              </span>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setFilterRating('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  filterRating === 'all'
                    ? 'bg-slate-800 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tất cả ({aiStats.records.length})
              </button>
              <button
                onClick={() => setFilterRating('wrong')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  filterRating === 'wrong'
                    ? 'bg-rose-950/80 text-rose-300 font-bold border border-rose-500/40'
                    : 'text-slate-400 hover:text-rose-300'
                }`}
              >
                <ThumbsDown className="w-3 h-3" />
                <span>Bị báo sai ({wrongRecords.length})</span>
              </button>
              <button
                onClick={() => setFilterRating('helpful')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  filterRating === 'helpful'
                    ? 'bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-500/40'
                    : 'text-slate-400 hover:text-emerald-300'
                }`}
              >
                <ThumbsUp className="w-3 h-3" />
                <span>Hữu ích ({aiStats.helpfulCount})</span>
              </button>
            </div>
          </div>

          {filteredRecords.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-950/50 border border-slate-800/80 text-center space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-slate-800/60 text-slate-400 flex items-center justify-center mx-auto text-xl">
                📝
              </div>
              <p className="text-sm font-semibold text-slate-300">
                {filterRating === 'wrong'
                  ? 'Chưa có câu trả lời nào bị báo sai!'
                  : 'Chưa có dữ liệu phản hồi nào được ghi nhận.'}
              </p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Khi học sinh trò chuyện với MathBot và bấm vào các nút "👍 Hữu ích" hoặc "👎 AI sai rồi", toàn bộ dữ liệu phản biện sẽ được cập nhật tại đây theo thời gian thực.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {filteredRecords.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    item.rating === 'wrong'
                      ? 'bg-rose-950/20 border-rose-500/30'
                      : 'bg-emerald-950/20 border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1 ${
                          item.rating === 'wrong'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        {item.rating === 'wrong' ? (
                          <>
                            <ThumbsDown className="w-3 h-3" /> AI sai rồi
                          </>
                        ) : (
                          <>
                            <ThumbsUp className="w-3 h-3" /> Hữu ích
                          </>
                        )}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(item.timestamp).toLocaleString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteAIFeedbackRecord(item.id)}
                      title="Xóa bản ghi này"
                      className="p-1 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Nội dung câu hỏi */}
                  <div className="space-y-1 text-xs">
                    <div className="text-slate-300">
                      <span className="font-bold text-cyan-300">Câu hỏi: </span>
                      <span className="italic">{item.question}</span>
                    </div>

                    {/* Câu trả lời AI */}
                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-slate-300 mt-1 max-h-32 overflow-y-auto font-sans leading-relaxed whitespace-pre-wrap">
                      <div className="text-[10px] uppercase font-bold text-indigo-400 mb-0.5">
                        Câu trả lời AI:
                      </div>
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reset feedback logs option */}
          {aiStats.records.length > 0 && (
            <div className="pt-2 flex justify-end">
              {!confirmResetAI ? (
                <button
                  type="button"
                  onClick={() => setConfirmResetAI(true)}
                  className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Đặt lại dữ liệu phản biện AI
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-rose-300">Xác nhận xóa toàn bộ nhật ký phản biện?</span>
                  <button
                    onClick={() => {
                      resetAIFeedbackData();
                      setConfirmResetAI(false);
                    }}
                    className="px-2 py-0.5 bg-rose-600 text-white rounded font-bold cursor-pointer"
                  >
                    Xóa
                  </button>
                  <button
                    onClick={() => setConfirmResetAI(false)}
                    className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded cursor-pointer"
                  >
                    Hủy
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      )}

      {/* Topic Accuracy Breakdown */}
      {(analyticsTab === 'all' || analyticsTab === 'competency') && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            <span>Tỉ lệ chính xác theo từng phân môn</span>
          </h3>
          <span className="text-xs text-slate-400">Cập nhật theo thời gian thực</span>
        </div>

        <div className="space-y-4">
          {topicsData.map((t) => (
            <div key={t.topic} className="space-y-1.5">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="font-semibold text-slate-200">{t.topic}</span>
                <span className="font-mono text-cyan-300">
                  {t.rate}% ({t.correct}/{t.total} câu)
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    t.rate >= 70
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : t.rate >= 50
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                      : 'bg-gradient-to-r from-rose-500 to-pink-500'
                  }`}
                  style={{ width: `${t.rate || (t.total === 0 ? 0 : 5)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
};
