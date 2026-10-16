import React, { useState } from 'react';
import {
  Star,
  Sparkles,
  Heart,
  MessageSquare,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  RotateCcw,
  PlusCircle,
  Trash2,
  Filter,
  BarChart2,
  Calendar,
  ThumbsUp,
} from 'lucide-react';
import {
  useUserFeedbackStats,
  resetUserSurveys,
  deleteUserSurvey,
} from '../utils/userSurvey';
import { soundManager } from '../utils/soundEffects';

interface UserFeedbackAnalyticsViewProps {
  onOpenSurveyModal?: () => void;
}

export const UserFeedbackAnalyticsView: React.FC<UserFeedbackAnalyticsViewProps> = ({
  onOpenSurveyModal,
}) => {
  const stats = useUserFeedbackStats();
  const [filterStar, setFilterStar] = useState<number | 'all'>('all');
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  const filteredFeedbacks = stats.records.filter((r) => {
    if (filterStar === 'all') return true;
    const avg = Math.round((r.easeOfUseRating + r.helpfulnessRating) / 2);
    return avg === filterStar;
  });

  const handleReset = () => {
    soundManager.playClickSound();
    resetUserSurveys();
    setConfirmReset(false);
  };

  const handleDelete = (id: string) => {
    soundManager.playClickSound();
    deleteUserSurvey(id);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/70 border border-purple-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>User Feedback Analytics</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold">
              CSAT Chuẩn 2026
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Báo cáo Khảo sát & Độ hài lòng Người học
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Tổng hợp dữ liệu phản hồi định kỳ hàng tuần từ học sinh về độ dễ dùng của AI, hiệu quả cải thiện năng lực Toán và các tính năng được yêu thích nhất.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {onOpenSurveyModal && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClickSound();
                onOpenSurveyModal();
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Làm khảo sát ngay</span>
            </button>
          )}

          {confirmReset ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Xác nhận
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="px-2.5 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs cursor-pointer"
              >
                Hủy
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-colors cursor-pointer"
              title="Khôi phục dữ liệu khảo sát mẫu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 3 THẺ CHỈ SỐ KPI CHÍNH THEO ĐÚNG YÊU CẦU:
          1. Điểm hài lòng trung bình
          2. Số lượng khảo sát
          3. Tính năng được thích nhất
      */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 1. Điểm hài lòng trung bình */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">
              Điểm hài lòng trung bình
            </span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
              {stats.averageSatisfaction.toFixed(1)}
            </span>
            <span className="text-sm text-slate-400 font-medium">/ 5.0 ⭐</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80 text-[11px]">
            <div>
              <span className="text-slate-400 block">AI dễ dùng:</span>
              <strong className="text-indigo-300 font-mono">{stats.averageEaseOfUse.toFixed(1)}/5.0 ★</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Học tốt hơn:</span>
              <strong className="text-emerald-300 font-mono">{stats.averageHelpfulness.toFixed(1)}/5.0 ★</strong>
            </div>
          </div>
        </div>

        {/* 2. Số lượng khảo sát */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">
              Số lượng khảo sát
            </span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
              {stats.totalSurveys}
            </span>
            <span className="text-sm text-slate-400 font-medium">lượt gửi</span>
          </div>

          <div className="pt-1 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Định kỳ sau mỗi tuần học</span>
            <span className="text-cyan-400 font-semibold">100% tự nguyện</span>
          </div>
        </div>

        {/* 3. Tính năng được thích nhất */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">
              Tính năng được thích nhất
            </span>
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          </div>

          <div className="text-lg sm:text-xl font-bold text-rose-300 truncate" title={stats.mostLikedFeature}>
            {stats.mostLikedFeature}
          </div>

          <div className="pt-1 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Tỉ lệ bình chọn dẫn đầu:</span>
            <strong className="text-rose-400 font-mono font-bold">
              {stats.featureBreakdown[0]?.percentage || 0}%
            </strong>
          </div>
        </div>
      </div>

      {/* BIỂU ĐỒ TRỰC QUAN (VISUAL CHARTS SECTION) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* BIỂU ĐỒ 1: PHÂN BỔ ĐÁNH GIÁ SAO (RATING DISTRIBUTION) */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-amber-400" />
                <span>Biểu đồ phân bổ mức độ hài lòng (1 - 5 sao)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Tỷ lệ phần trăm đánh giá của học sinh qua các mức sao
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            {stats.ratingDistribution.map((item) => (
              <div key={item.stars} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 flex items-center gap-1 w-16">
                    <span>{item.stars}</span>
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">{item.count} lượt</span>
                    <span className="font-mono font-bold text-white w-10 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>

                {/* Progress bar trực quan */}
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.stars === 5
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                        : item.stars === 4
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                        : item.stars === 3
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-400'
                        : item.stars === 2
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.max(item.percentage > 0 ? 4 : 0, item.percentage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Tổng cộng: {stats.totalSurveys} phiếu khảo sát</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                {Math.round(
                  ((stats.ratingDistribution.find((r) => r.stars === 5)?.count || 0) +
                    (stats.ratingDistribution.find((r) => r.stars === 4)?.count || 0)) /
                    (stats.totalSurveys || 1) *
                    100
                )}
                % đánh giá Tốt & Xuất sắc
              </span>
            </span>
          </div>
        </div>

        {/* BIỂU ĐỒ 2: BẢNG XẾP HẠNG TÍNH NĂNG ĐƯỢC YÊU THÍCH NHẤT */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Biểu đồ tỷ lệ yêu thích các tính năng</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Bình chọn trực tiếp của học sinh sau mỗi tuần trải nghiệm
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {stats.featureBreakdown.map((item, idx) => (
              <div key={item.feature} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5 truncate max-w-[220px] sm:max-w-[280px]">
                    <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-bold">
                      #{idx + 1}
                    </span>
                    <span className="truncate">{item.feature}</span>
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-slate-400">{item.count} vote</span>
                    <span className="font-mono font-bold text-cyan-300 w-10 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>

                <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${Math.max(item.percentage > 0 ? 5 : 0, item.percentage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Dẫn đầu: {stats.mostLikedFeature}</span>
            <span className="text-purple-300 font-semibold">Cập nhật theo tuần</span>
          </div>
        </div>
      </div>

      {/* BIỂU ĐỒ 3: XU HƯỚNG ĐIỂM SỐ THEO CÁC TUẦN HỌC */}
      {stats.weeklyTrends.length > 0 && (
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Xu hướng điểm hài lòng qua các tuần học (Weekly Trend)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Theo dõi mức độ tiến bộ và cải thiện của hệ thống qua thời gian
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {stats.weeklyTrends.map((w) => (
              <div
                key={w.week}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-center space-y-1.5 hover:border-slate-700 transition-colors"
              >
                <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Tuần học {w.week}</span>
                </div>
                <div className="text-2xl font-extrabold text-amber-400 font-mono">
                  {w.avgRating.toFixed(1)} <span className="text-sm">★</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  {w.count} học sinh phản hồi
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DANH SÁCH CHI TIẾT Ý KIẾN ĐÓNG GÓP TỪ HỌC SINH */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Ý kiến phản hồi & Góp ý của học sinh ({filteredFeedbacks.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Những chia sẻ thực tế giúp định hướng nâng cấp tính năng MathVerse
            </p>
          </div>

          {/* Lọc theo số sao */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs self-start sm:self-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <button
              type="button"
              onClick={() => setFilterStar('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                filterStar === 'all'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tất cả
            </button>
            <button
              type="button"
              onClick={() => setFilterStar(5)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                filterStar === 5
                  ? 'bg-amber-950/80 text-amber-300 font-bold border border-amber-500/40'
                  : 'text-slate-400 hover:text-amber-300'
              }`}
            >
              5 ⭐
            </button>
            <button
              type="button"
              onClick={() => setFilterStar(4)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                filterStar === 4
                  ? 'bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-500/40'
                  : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              4 ⭐
            </button>
          </div>
        </div>

        {/* Grid các phản hồi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {filteredFeedbacks.map((fb) => (
            <div
              key={fb.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700/80 transition-all space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{fb.userName || 'Học sinh'}</span>
                      {fb.grade && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-semibold">
                          Lớp {fb.grade}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px]">
                        Tuần {fb.weekNumber || 1}
                      </span>
                    </h4>
                    <span className="text-[10px] text-slate-500">
                      {new Date(fb.timestamp).toLocaleDateString('vi-VN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 text-xs font-mono font-bold">
                    <span>{Math.round((fb.easeOfUseRating + fb.helpfulnessRating) / 2)}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap text-[11px]">
                  <span className="text-slate-400">Thích nhất:</span>
                  <span className="px-2 py-0.5 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/25 font-medium">
                    {fb.favoriteFeature}
                  </span>
                </div>

                {fb.feedbackText ? (
                  <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                    "{fb.feedbackText}"
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 italic">Không có góp ý thêm.</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span>Dễ dùng: <strong className="text-indigo-300">{fb.easeOfUseRating}★</strong></span>
                  <span>Hiệu quả: <strong className="text-emerald-300">{fb.helpfulnessRating}★</strong></span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(fb.id)}
                  className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Xóa phản hồi này"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
