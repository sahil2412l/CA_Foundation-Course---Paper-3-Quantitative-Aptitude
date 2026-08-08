// Central Question Registry & Scalable Question Bank
// Designed to support 1,000+ to 5,000+ questions seamlessly across modular files.

import { BUSINESS_MATH_QUESTIONS } from './business_math';
import { LOGICAL_REASONING_QUESTIONS } from './logical_reasoning';
import { STATISTICS_QUESTIONS } from './statistics';

/**
 * Initial master array uniting all modular question collections
 */
export const INITIAL_QUESTIONS_BANK = [
  ...BUSINESS_MATH_QUESTIONS,
  ...LOGICAL_REASONING_QUESTIONS,
  ...STATISTICS_QUESTIONS
];

// Re-export individual category banks for selective usage
export { BUSINESS_MATH_QUESTIONS } from './business_math';
export { LOGICAL_REASONING_QUESTIONS } from './logical_reasoning';
export { STATISTICS_QUESTIONS } from './statistics';

/**
 * Helper function to validate a question object before adding
 */
export function validateQuestion(q) {
  if (!q.id) return 'Question ID is required.';
  if (!q.chapterId) return 'Chapter ID is required.';
  if (!q.questionText) return 'Question Text is required.';
  if (!q.options || q.options.length < 2) return 'At least 2 options are required.';
  if (q.correctIndex === undefined || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
    return 'Valid correctIndex matching options array is required.';
  }
  return null;
}
