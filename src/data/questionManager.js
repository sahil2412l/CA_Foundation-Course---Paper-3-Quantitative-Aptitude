// Advanced Scalable Question Manager for 1,000 - 5,000+ CA Foundation Questions
import { INITIAL_QUESTIONS_BANK, validateQuestion } from './questions/index';

// High-capacity in-memory question store
let questionBankStore = [...INITIAL_QUESTIONS_BANK];

/**
 * Returns all questions in the bank.
 */
export function getAllQuestions() {
  return questionBankStore;
}

/**
 * Get total count of questions currently in store.
 */
export function getTotalQuestionCount() {
  return questionBankStore.length;
}

/**
 * Find a specific question by ID.
 */
export function getQuestionById(id) {
  return questionBankStore.find(q => q.id === id);
}

/**
 * Get questions by chapter ID.
 */
export function getQuestionsByChapter(chapterId) {
  return questionBankStore.filter(q => q.chapterId === chapterId);
}

/**
 * Get questions by sub-exercise ID.
 */
export function getQuestionsBySubExercise(subExerciseId) {
  return questionBankStore.filter(q => q.subExerciseId === subExerciseId);
}

/**
 * Get questions filtered for Quiz mode.
 */
export function getQuestionsForQuiz(chapterId, subExerciseId) {
  if (subExerciseId) {
    const subExQs = getQuestionsBySubExercise(subExerciseId);
    if (subExQs.length > 0) return subExQs;
  }
  if (chapterId) {
    const chapQs = getQuestionsByChapter(chapterId);
    if (chapQs.length > 0) return chapQs;
  }
  return questionBankStore;
}

/**
 * Search questions by keyword query in questionText, explanation, or formulas.
 */
export function searchQuestions(query) {
  if (!query.trim()) return questionBankStore;
  const qLower = query.toLowerCase();
  return questionBankStore.filter(q =>
    q.questionText.toLowerCase().includes(qLower) ||
    q.chapterName.toLowerCase().includes(qLower) ||
    (q.explanation && q.explanation.toLowerCase().includes(qLower)) ||
    (q.formulaUsed && q.formulaUsed.toLowerCase().includes(qLower))
  );
}

/**
 * Paginated question getter for managing high volumes (1,000 - 5,000 questions).
 */
export function getPaginatedQuestions(page = 1, limit = 20, chapterId) {
  const filtered = chapterId ? getQuestionsByChapter(chapterId) : questionBankStore;
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const startIndex = (page - 1) * limit;
  const questions = filtered.slice(startIndex, startIndex + limit);

  return { questions, total, totalPages };
}

/**
 * ADD a single question to the store.
 */
export function addQuestion(newQuestion) {
  const error = validateQuestion(newQuestion);
  if (error) return { success: false, message: error };

  const existingIndex = questionBankStore.findIndex(q => q.id === newQuestion.id);
  if (existingIndex >= 0) {
    return { success: false, message: `Question with ID '${newQuestion.id}' already exists.` };
  }

  questionBankStore.push(newQuestion);
  return { success: true, message: `Question '${newQuestion.id}' added successfully.` };
}

/**
 * REMOVE a question by ID.
 */
export function removeQuestion(id) {
  const initialLength = questionBankStore.length;
  questionBankStore = questionBankStore.filter(q => q.id !== id);

  if (questionBankStore.length < initialLength) {
    return { success: true, message: `Question '${id}' removed successfully.` };
  }
  return { success: false, message: `Question '${id}' not found.` };
}

/**
 * UPDATE an existing question.
 */
export function updateQuestion(id, updatedFields) {
  const index = questionBankStore.findIndex(q => q.id === id);
  if (index === -1) return { success: false, message: `Question '${id}' not found.` };

  questionBankStore[index] = { ...questionBankStore[index], ...updatedFields };
  return { success: true, message: `Question '${id}' updated successfully.` };
}

/**
 * BULK ADD questions (e.g. adding batches of 100 - 1,000 questions from JSON).
 */
export function bulkAddQuestions(questions) {
  let addedCount = 0;
  const errors = [];

  questions.forEach(q => {
    const res = addQuestion(q);
    if (res.success) {
      addedCount++;
    } else {
      errors.push(res.message);
    }
  });

  return { addedCount, errors };
}

/**
 * Export current question bank as clean JSON string (for backup or bulk editing).
 */
export function exportQuestionsJSON() {
  return JSON.stringify(questionBankStore, null, 2);
}

/**
 * Import questions from JSON string.
 */
export function importQuestionsJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) return { success: false, addedCount: 0, error: 'JSON root must be an array of questions.' };
    
    const result = bulkAddQuestions(parsed);
    return { success: true, addedCount: result.addedCount };
  } catch (err) {
    return { success: false, addedCount: 0, error: err?.message || 'Invalid JSON format.' };
  }
}

/**
 * Reset bank to initial state.
 */
export function resetQuestionStore() {
  questionBankStore = [...INITIAL_QUESTIONS_BANK];
}
