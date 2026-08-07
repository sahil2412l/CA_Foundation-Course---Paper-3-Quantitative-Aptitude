// CA Foundation Math - Type Definitions

export interface Question {
  id: string;
  chapterId: string;
  subExerciseId?: string;
  chapterName: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  formulaUsed?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface SubExercise {
  id: string;
  title: string;
  description?: string;
  formulasCount?: number;
  questionCount?: number;
}
export interface Chapter {
  id: string;
  title: string;
  weightage: string; // e.g., '12 - 16 Marks'
  category: 'Math' | 'Logical Reasoning' | 'Statistics';
  description: string;
  formulas: { title: string; formula: string; note?: string }[];
  questionCount: number;
  subExercises?: SubExercise[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  reqXp?: number;
  reqQuestions?: number;
  reqWatchTimeMin?: number;
}

export interface RankTier {
  tierName: string;
  minLevel: number;
  maxLevel: number;
  badge: string;
  color: string;
  description: string;
}

export interface QuizHistoryItem {
  id: string;
  date: string;
  chapterName: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  marksScored: number; // CA Marking: +1 correct, -0.25 wrong
  xpEarned: number;
  timeSpentSeconds: number;
}

export interface Flashcard {
  id: string;
  chapterTitle: string;
  frontTitle: string;
  frontFormula: string;
  backExplanation: string;
  example: string;
}

export interface UserProfile {
  name: string;
  targetExam: string;
  watchTimeSeconds: number;
  totalQuestionsAttempted: number;
  correctQuestionsCount: number;
  incorrectQuestionsCount: number;
  totalMarksScored: number;
  xp: number;
  level: number;
  rankTitle: string;
  unlockedBadgeIds: string[];
  quizHistory: QuizHistoryItem[];
  currentStreakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  dailyGoalMinutes: number;
  soundEnabled: boolean;
}
