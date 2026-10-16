export type Grade = 6 | 7 | 8 | 9;

export type QuestionType =
  | 'multiple_choice'
  | 'fill_in'
  | 'true_false'
  | 'step_solve'
  | 'find_error'
  | 'match_formula';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface ErrorStep {
  stepNumber: number;
  text: string;
  isError: boolean;
  correction?: string;
}

export interface Question {
  id: string;
  grade: Grade;
  topic: string;
  subtopic?: string;
  type: QuestionType;
  difficulty: Difficulty;
  xpReward: number;
  question: string;
  mathExpression?: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
  hint?: string;
  matchingPairs?: MatchingPair[];
  errorSteps?: ErrorStep[];
}

export interface LessonStep {
  title: string;
  description: string;
  mathSnippet?: string;
}

export interface LessonFormula {
  title: string;
  formula: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  grade: Grade;
  bookVolume?: 1 | 2; // Tập 1 hoặc Tập 2
  chapter?: string;   // Ví dụ: Chương I, Chương VI
  lessonNumber?: number; // Số bài trong SGK: Bài 1, Bài 2...
  topic: string;
  title: string;
  objective: string;
  theory: string[];
  formulas: LessonFormula[];
  steps: LessonStep[];
  visualType?: 'fractions' | 'geometry' | 'numberline' | 'equation';
  practiceQuestionIds: string[];
  xpReward: number;
}

export interface MistakeRecord {
  questionId: string;
  questionText: string;
  topic: string;
  subtopic?: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  timestamp: number;
  failCount: number; // Số lần sai
  isResolved?: boolean; // Đánh dấu đã hiểu
  resolvedAt?: number;
}

export interface UserProfile {
  name: string;
  grade: Grade;
  avatar: string;
  xp: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  completedLessons: string[];
  answeredQuestionsCount: number;
  correctAnswersCount: number;
  timeSpentSeconds: number;
  unlockedBadges: string[];
  topicStats: Record<string, { correct: number; total: number }>;
  recentMistakes: MistakeRecord[];
  soundEnabled: boolean;
  unlockedGrades: Grade[];
  completedGradeExams: Record<number, { passed: boolean; score: number; total: number; date: string }>;
}

export interface PromotionExam {
  id: string;
  sourceGrade: Grade;
  unlocksGrade: Grade;
  prerequisiteGrades: Grade[];
  title: string;
  subtitle: string;
  bookSeries: string;
  passingScorePercent: number;
  questions: Question[];
  xpReward: number;
}

export interface BadgeInfo {
  id: string;
  title: string;
  icon: string;
  description: string;
  criteria: string;
  checkUnlocked: (profile: UserProfile) => boolean;
  progress: (profile: UserProfile) => { current: number; max: number };
}

export interface Challenge {
  id: string;
  title: string;
  category: 'speed' | 'pattern' | 'logic' | 'geometry' | 'mystery' | 'time60' | 'streak';
  difficulty: Difficulty;
  description: string;
  xpReward: number;
  timeLimitSeconds?: number;
  questions: Question[];
}

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  icon: string;
  color: string;
}

export interface AIFeedbackRecord {
  id: string;
  messageId?: string;
  question: string;
  answer: string;
  timestamp: number;
  rating: 'helpful' | 'wrong';
  feedbackNote?: string;
}

export interface AIAccuracyStats {
  totalAnswers: number;
  wrongCount: number;
  helpfulCount: number;
  wrongRate: number; // Tỷ lệ báo sai tính theo phần trăm (%)
  records: AIFeedbackRecord[];
}

export interface RoadmapStep {
  stepNumber: number;
  title: string;
  description: string;
  actionType: 'lesson' | 'practice' | 'quiz';
  targetTopic?: string;
  targetLessonId?: string;
  isCompleted?: boolean;
}

export interface TopicCompetency {
  topic: string;
  total: number;
  correct: number;
  rate: number;
  status: 'strong' | 'weak' | 'moderate' | 'untested';
}

export interface StudentAIAnalysis {
  id: string;
  analyzedAt: number;
  totalAnswered: number;
  overallAccuracy: number;
  strengths: string[];
  weaknesses: string[];
  topicsToReview: string[];
  roadmap: RoadmapStep[];
  aiSummary: string;
}

export interface UserSurveyRecord {
  id: string;
  userName?: string;
  grade?: number;
  weekNumber: number;
  easeOfUseRating: number; // 1-5 sao
  helpfulnessRating: number; // 1-5 sao
  favoriteFeature: string;
  feedbackText?: string;
  timestamp: number;
}

export interface UserFeedbackStats {
  totalSurveys: number;
  averageSatisfaction: number; // Điểm hài lòng trung bình (thang điểm 5)
  averageEaseOfUse: number;
  averageHelpfulness: number;
  mostLikedFeature: string;
  featureBreakdown: { feature: string; count: number; percentage: number }[];
  ratingDistribution: { stars: number; count: number; percentage: number }[];
  weeklyTrends: { week: number; avgRating: number; count: number }[];
  records: UserSurveyRecord[];
}

