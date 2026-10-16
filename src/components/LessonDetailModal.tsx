import React, { useState } from 'react';
import { Lesson } from '../types/mathverse';
import { useMathVerse } from '../context/MathVerseContext';
import { X, CheckCircle2, Play, Sparkles, BookOpen, Calculator, Lightbulb } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface LessonDetailModalProps {
  lesson: Lesson;
  onClose: () => void;
  onStartPractice: (lessonId: string) => void;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  onClose,
  onStartPractice,
}) => {
  const { user, completeLesson } = useMathVerse();
  const isCompleted = user?.completedLessons.includes(lesson.id);

  // State for interactive widgets
  const [fractionNum, setFractionNum] = useState<number>(3);
  const [fractionDen, setFractionDen] = useState<number>(8);
  const [balanceX, setBalanceX] = useState<number>(4);
  const [triangleA, setTriangleA] = useState<number>(3);
  const [triangleB, setTriangleB] = useState<number>(4);

  const handleUnderstand = () => {
    soundManager.playClickSound();
    completeLesson(lesson.id);
  };

  const handlePractice = () => {
    soundManager.playClickSound();
    onStartPractice(lesson.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl shadow-slate-950/80 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-b border-slate-800 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                Toán Lớp {lesson.grade} • {lesson.topic}
              </span>
              {isCompleted && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Đã hoàn thành
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {lesson.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* Objective Banner */}
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1">
                Mục tiêu bài học
              </h4>
              <p className="text-sm text-cyan-100/90 leading-relaxed font-medium">
                {lesson.objective}
              </p>
            </div>
          </div>

          {/* Theory Section (Lý thuyết dễ hiểu) */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>1. Lý thuyết dễ hiểu</span>
            </h3>
            <div className="space-y-2.5">
              {lesson.theory.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-sm text-slate-200 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Formulas Section (Công thức quan trọng) */}
          {lesson.formulas.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calculator className="w-4 h-4 text-pink-400" />
                <span>2. Công thức quan trọng</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lesson.formulas.map((f, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/50 to-slate-950/70 border border-indigo-500/30 shadow-md"
                  >
                    <div className="text-xs font-bold text-indigo-300 mb-1.5">{f.title}</div>
                    <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono font-bold text-cyan-300 text-base mb-2">
                      {f.formula}
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">{f.explanation}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Simulation Widget */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Mô hình trực quan tương tác
              </h4>
              <span className="text-[11px] text-slate-400">Trực quan hóa khái niệm</span>
            </div>

            {/* Fraction visualizer */}
            {lesson.visualType === 'fractions' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-300">
                  Xem trực quan phân số: <strong className="text-cyan-300">{fractionNum} / {fractionDen}</strong>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-1">
                    <label className="text-[11px] text-slate-400">Tử số (phần được chọn): {fractionNum}</label>
                    <input
                      type="range"
                      min={1}
                      max={fractionDen}
                      value={fractionNum}
                      onChange={(e) => setFractionNum(Number(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-[11px] text-slate-400">Mẫu số (tổng số phần): {fractionDen}</label>
                    <input
                      type="range"
                      min={2}
                      max={12}
                      value={fractionDen}
                      onChange={(e) => {
                        const newDen = Number(e.target.value);
                        setFractionDen(newDen);
                        if (fractionNum > newDen) setFractionNum(newDen);
                      }}
                      className="w-full accent-indigo-400"
                    />
                  </div>
                </div>
                {/* Visual bar slices */}
                <div className="w-full h-8 rounded-xl bg-slate-800 overflow-hidden flex border border-slate-700">
                  {Array.from({ length: fractionDen }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-full border-r border-slate-900 last:border-0 transition-colors ${
                        i < fractionNum
                          ? 'bg-gradient-to-r from-cyan-500 to-indigo-500'
                          : 'bg-slate-800'
                      }`}
                      style={{ width: `${100 / fractionDen}%` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Geometry visualizer (Pythagoras right triangle) */}
            {lesson.visualType === 'geometry' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-300">
                  Thử nghiệm tam giác vuông & Định lý Pythagore: <span className="text-cyan-300">c² = a² + b²</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400">Cạnh góc vuông a: {triangleA} cm</label>
                    <input
                      type="range"
                      min={2}
                      max={8}
                      value={triangleA}
                      onChange={(e) => setTriangleA(Number(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400">Cạnh góc vuông b: {triangleB} cm</label>
                    <input
                      type="range"
                      min={2}
                      max={8}
                      value={triangleB}
                      onChange={(e) => setTriangleB(Number(e.target.value))}
                      className="w-full accent-purple-400"
                    />
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 text-center font-mono text-xs sm:text-sm text-cyan-300 border border-slate-800">
                  c² = {triangleA}² + {triangleB}² = {triangleA ** 2} + {triangleB ** 2} = {triangleA ** 2 + triangleB ** 2}
                  <span className="block mt-1 font-bold text-amber-300">
                    ⇒ Cạnh huyền c = √{triangleA ** 2 + triangleB ** 2} ≈ {Math.sqrt(triangleA ** 2 + triangleB ** 2).toFixed(2)} cm
                  </span>
                </div>
              </div>
            )}

            {/* Equation balance visualizer */}
            {(lesson.visualType === 'equation' || lesson.visualType === 'numberline') && (
              <div className="space-y-3">
                <div className="text-xs text-slate-300">
                  Cân bằng phương trình: <span className="text-cyan-300">2x + 3 = {2 * balanceX + 3}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Thử thay giá trị của x:</span>
                    <strong className="text-indigo-300">x = {balanceX}</strong>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={balanceX}
                    onChange={(e) => setBalanceX(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-around text-xs font-mono">
                  <div className="text-cyan-300 font-bold">Vế trái: 2·({balanceX}) + 3 = {2 * balanceX + 3}</div>
                  <span className="text-slate-500 font-bold">=</span>
                  <div className="text-emerald-400 font-bold">Vế phải: {2 * balanceX + 3} (Cân bằng!)</div>
                </div>
              </div>
            )}
          </div>

          {/* Worked Steps Section (Ví dụ minh họa từng bước) */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>3. Ví dụ minh họa từng bước</span>
            </h3>
            <div className="space-y-3">
              {lesson.steps.map((st, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5"
                >
                  <div className="text-xs font-bold text-amber-300">{st.title}</div>
                  <div className="text-sm text-slate-200">{st.description}</div>
                  {st.mathSnippet && (
                    <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-cyan-300 text-xs inline-block">
                      {st.mathSnippet}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={handleUnderstand}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-900 border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Đã hiểu bài học' : 'Đã hiểu (+50 XP)'}</span>
          </button>

          <button
            onClick={handlePractice}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 transition-transform cursor-pointer"
          >
            <Play className="w-4 h-4" />
            <span>Luyện tập ngay bài này</span>
          </button>
        </div>
      </div>
    </div>
  );
};
