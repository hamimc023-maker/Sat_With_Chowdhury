import React, { useState } from 'react';
import { 
  X, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  HelpCircle, 
  RotateCcw,
  ArrowLeft
} from 'lucide-react';
import { Topic } from '../types/sat';

interface TopicDetailModalProps {
  topic: Topic | null;
  onClose: () => void;
  isBookmarked?: boolean;
  isMastered?: boolean;
  onToggleBookmark?: (id: string) => void;
  onToggleMastered?: (id: string) => void;
  userAnswer?: 'A' | 'B' | 'C' | 'D';
  onRecordAnswer?: (questionId: string, answer: 'A' | 'B' | 'C' | 'D') => void;
  onOpenDesmos?: () => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  onClose,
  userAnswer,
  onRecordAnswer,
}) => {
  const [activeTab, setActiveTab] = useState<'tips' | 'traps' | 'example' | 'practice'>('tips');
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(userAnswer || null);
  const [showExplanation, setShowExplanation] = useState<boolean>(Boolean(userAnswer));

  if (!topic) return null;

  const handleSelectOption = (letter: 'A' | 'B' | 'C' | 'D') => {
    setSelectedOption(letter);
    setShowExplanation(true);
    if (onRecordAnswer) {
      onRecordAnswer(topic.practiceQuestion.id, letter);
    }
  };

  const handleResetPractice = () => {
    setSelectedOption(null);
    setShowExplanation(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Clean Header Bar */}
        <div className="p-6 border-b border-slate-200 bg-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 block mb-1">
                {topic.domainName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                {topic.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Big, Clean Navigation Tabs */}
        <div className="px-6 pt-2 border-b border-slate-200 bg-slate-50 flex items-center gap-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('tips')}
            className={`py-3 px-4 text-base font-bold transition-all cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'tips'
                ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Tips & Tricks
          </button>

          <button
            onClick={() => setActiveTab('traps')}
            className={`py-3 px-4 text-base font-bold transition-all cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'traps'
                ? 'border-rose-600 text-rose-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Traps to Avoid
          </button>

          <button
            onClick={() => setActiveTab('example')}
            className={`py-3 px-4 text-base font-bold transition-all cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'example'
                ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Worked Example
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`py-3 px-4 text-base font-bold transition-all cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'practice'
                ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Practice Question
          </button>
        </div>

        {/* Modal Scrollable Content with Bigger Words */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: TIPS & TRICKS */}
          {activeTab === 'tips' && (
            <div className="space-y-6">
              {/* Golden Rules */}
              <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100">
                <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-4">
                  Golden Rules to Remember
                </h3>
                <ul className="space-y-3.5 text-base sm:text-lg text-slate-800">
                  {topic.goldenRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed font-medium">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actionable Tips */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Key Shortcuts & Hacks
                </h3>
                <div className="space-y-4">
                  {topic.tipsAndTricks.map((tip, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-lg font-bold text-slate-900">
                          {tip.title}
                        </h4>
                        {tip.timeSavedEstimate && (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                            Saves {tip.timeSavedEstimate}
                          </span>
                        )}
                      </div>
                      <p className="text-base text-slate-700 leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMMON TRAPS */}
          {activeTab === 'traps' && (
            <div className="space-y-5">
              <p className="text-base text-slate-600">
                Be careful of these common traps that College Board creates to fool students:
              </p>

              <div className="space-y-4">
                {topic.commonTraps.map((trap, idx) => (
                  <div key={idx} className="p-6 rounded-2xl border border-rose-200 bg-rose-50/30 space-y-3">
                    <h4 className="text-lg font-bold text-rose-900 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-rose-600" />
                      <span>{trap.name}</span>
                    </h4>

                    <div className="text-base text-slate-800 leading-relaxed">
                      <strong className="text-slate-900">The Trap: </strong>
                      {trap.explanation}
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-emerald-300 text-base text-emerald-950">
                      <strong className="text-emerald-800">How to Avoid It: </strong>
                      <span>{trap.howToAvoid}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: WORKED EXAMPLE */}
          {activeTab === 'example' && (
            <div className="space-y-6">
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Sample Problem: {topic.workedExample.title}
                </h4>
                <div className="text-lg text-slate-900 font-semibold leading-relaxed">
                  {topic.workedExample.problem}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Step-by-Step Solution
                </h4>
                <div className="space-y-3">
                  {topic.workedExample.stepByStepSolution.map((step, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white text-base text-slate-800 leading-relaxed flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-base text-amber-950 flex items-start gap-3">
                <Zap className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-900">Fast Strategy: </strong>
                  <span>{topic.workedExample.fastTip}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRACTICE QUESTION */}
          {activeTab === 'practice' && (
            <div className="space-y-6">
              <div className="border border-slate-200 rounded-2xl p-6 bg-white space-y-4">
                {topic.practiceQuestion.passage && (
                  <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-base text-slate-900 leading-relaxed font-serif">
                    {topic.practiceQuestion.passage}
                  </div>
                )}

                {topic.practiceQuestion.dataSnippet && (
                  <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-sm font-mono text-indigo-950">
                    {topic.practiceQuestion.dataSnippet}
                  </div>
                )}

                <div className="text-lg sm:text-xl font-bold text-slate-900 pt-2">
                  {topic.practiceQuestion.question}
                </div>

                {/* Big Multiple Choice Options */}
                <div className="space-y-3 pt-2">
                  {topic.practiceQuestion.options.map((opt) => {
                    const isSelected = selectedOption === opt.letter;
                    const isCorrect = opt.letter === topic.practiceQuestion.correctAnswer;
                    
                    let style = 'border-slate-300 bg-white hover:border-indigo-400 hover:bg-slate-50 text-slate-900';
                    
                    if (showExplanation) {
                      if (isCorrect) {
                        style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500';
                      } else if (isSelected && !isCorrect) {
                        style = 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-400';
                      } else {
                        style = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={opt.letter}
                        onClick={() => handleSelectOption(opt.letter)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-4 ${style}`}
                      >
                        <span className={`w-8 h-8 rounded-lg text-base font-bold flex items-center justify-center shrink-0 border ${
                          showExplanation && isCorrect
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : showExplanation && isSelected && !isCorrect
                            ? 'bg-rose-500 border-rose-500 text-white'
                            : isSelected
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'border-slate-300 bg-slate-100 text-slate-800'
                        }`}>
                          {opt.letter}
                        </span>
                        <div className="flex-1 text-base sm:text-lg leading-relaxed">
                          <span>{opt.text}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Revealable Solution */}
              {showExplanation && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className={`p-6 rounded-2xl border-2 ${
                    selectedOption === topic.practiceQuestion.correctAnswer
                      ? 'border-emerald-400 bg-emerald-50 text-emerald-950'
                      : 'border-amber-400 bg-amber-50 text-amber-950'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 font-bold text-lg">
                        {selectedOption === topic.practiceQuestion.correctAnswer ? (
                          <>
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                            <span>Correct Answer! Well done.</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-6 h-6 text-amber-600" />
                            <span>Correct Answer is Choice {topic.practiceQuestion.correctAnswer}</span>
                          </>
                        )}
                      </div>
                      <button
                        onClick={handleResetPractice}
                        className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-slate-900 cursor-pointer underline"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Try Again</span>
                      </button>
                    </div>

                    <p className="text-base sm:text-lg leading-relaxed text-slate-800">
                      {topic.practiceQuestion.explanation}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-base text-indigo-950 flex items-start gap-3">
                    <Zap className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>The 20-Second Shortcut: </strong>
                      <span>{topic.practiceQuestion.fastShortcutTip}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Clean Footer Bar */}
        <div className="p-5 border-t border-slate-200 bg-white flex items-center justify-between">
          <span className="text-sm font-medium text-slate-500">
            SAT with Chowdhury
          </span>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close & Go Back
          </button>
        </div>
      </div>
    </div>
  );
};
