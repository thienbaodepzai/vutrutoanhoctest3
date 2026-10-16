import React from 'react';
import { MathVerseProvider, useMathVerse } from './context/MathVerseContext';
import { LoginScreen } from './components/LoginScreen';
import { Navbar } from './components/Navbar';
import { HomeDashboard } from './components/HomeDashboard';
import { CurriculumView } from './components/CurriculumView';
import { PracticeMode } from './components/PracticeMode';
import { QuizExamMode } from './components/QuizExamMode';
import { ChallengesMode } from './components/ChallengesMode';
import { MathBotChat } from './components/MathBotChat';
import { SmartReviewMode } from './components/SmartReviewMode';
import { AchievementsView } from './components/AchievementsView';
import { ProgressAnalyticsView } from './components/ProgressAnalyticsView';
import { SettingsModal } from './components/SettingsModal';
import { MusicPlayerWidget } from './components/MusicPlayerWidget';
import { GradePromotionModal } from './components/GradePromotionModal';
import { GradePromotionQuiz } from './components/GradePromotionQuiz';
import { UserSurveyModal } from './components/UserSurveyModal';
import {
  Home,
  BookOpen,
  PenTool,
  Clock,
  Target,
  Bot,
  RotateCcw,
  Award,
  BarChart3,
} from 'lucide-react';
import { soundManager } from './utils/soundEffects';

const MainAppContent: React.FC = () => {
  const {
    user,
    activeTab,
    setActiveTab,
    lockedGradeAttempt,
    setLockedGradeAttempt,
    activePromotionExamGrade,
    setActivePromotionExamGrade,
    isSurveyModalOpen,
    closeSurveyModal,
  } = useMathVerse();

  if (!user) {
    return <LoginScreen />;
  }

  const navItems = [
    { id: 'dashboard', label: 'Trang chủ', icon: Home },
    { id: 'lessons', label: 'Học bài', icon: BookOpen },
    { id: 'practice', label: 'Luyện tập', icon: PenTool },
    { id: 'quiz', label: 'Trắc nghiệm', icon: Clock },
    { id: 'challenges', label: 'Thử thách', icon: Target },
    { id: 'mathbot', label: 'MathBot AI', icon: Bot },
    { id: 'smart_review', label: 'Ôn tập', icon: RotateCcw },
    { id: 'achievements', label: 'Thành tích', icon: Award },
    { id: 'analytics', label: 'Tiến độ', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative selection:bg-indigo-500 selection:text-white">
      {/* Background Cosmic Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[160px]" />
      </div>

      {/* Top Navbar */}
      <Navbar />

      {/* Secondary Quick Nav Bar (Desktop & Tablet) */}
      <div className="relative z-10 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    soundManager.playClickSound();
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Page Content */}
      <main className="flex-1 relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 sm:pb-12">
        {activeTab === 'dashboard' && <HomeDashboard />}
        {activeTab === 'lessons' && <CurriculumView />}
        {activeTab === 'practice' && <PracticeMode />}
        {activeTab === 'quiz' && <QuizExamMode />}
        {activeTab === 'challenges' && <ChallengesMode />}
        {activeTab === 'mathbot' && <MathBotChat />}
        {activeTab === 'smart_review' && <SmartReviewMode />}
        {activeTab === 'achievements' && <AchievementsView />}
        {activeTab === 'analytics' && <ProgressAnalyticsView />}
        {activeTab === 'settings' && <SettingsModal />}
      </main>

      {/* Floating Background Study Music Player */}
      <MusicPlayerWidget />

      {/* Grade Promotion Modal when attempting to switch to a locked grade */}
      {lockedGradeAttempt && (
        <GradePromotionModal
          targetGrade={lockedGradeAttempt}
          onClose={() => setLockedGradeAttempt(null)}
          onStartExam={(gradeToTake) => {
            setLockedGradeAttempt(null);
            setActivePromotionExamGrade(gradeToTake);
          }}
        />
      )}

      {/* Active Promotion Exam Quiz */}
      {activePromotionExamGrade && (
        <GradePromotionQuiz
          sourceGrade={activePromotionExamGrade}
          onClose={() => setActivePromotionExamGrade(null)}
        />
      )}

      {/* Weekly User Feedback Survey Modal */}
      <UserSurveyModal
        isOpen={isSurveyModalOpen}
        onClose={closeSurveyModal}
        currentWeek={Math.min(4, Math.max(1, Math.ceil((user?.streak || 1) / 7)))}
      />

      {/* Mobile Bottom Navigation Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 px-2 py-1.5 flex items-center justify-around">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                soundManager.playClickSound();
              }}
              className={`flex flex-col items-center p-1.5 rounded-xl text-[10px] font-semibold transition-colors cursor-pointer ${
                isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
        {/* More button to toggle mathbot */}
        <button
          onClick={() => {
            setActiveTab('mathbot');
            soundManager.playClickSound();
          }}
          className={`flex flex-col items-center p-1.5 rounded-xl text-[10px] font-semibold transition-colors cursor-pointer ${
            activeTab === 'mathbot' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bot className="w-5 h-5 mb-0.5 text-indigo-400" />
          <span>MathBot</span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <MathVerseProvider>
      <MainAppContent />
    </MathVerseProvider>
  );
}
