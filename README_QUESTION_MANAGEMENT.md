# 📘 CA Foundation Question Bank Management Guide (1,000 – 5,000 Questions)

This project features a scalable, high-capacity Question Architecture specifically engineered to support **1,000 to 5,000+ questions** without performance degradation or large Git diff issues.

---

## 📁 File Structure Overview

All questions are organized inside `src/data/questions/`:

```text
src/data/
├── questionManager.ts            <-- Query engine (add, remove, update, bulk import/export JSON, pagination)
└── questions/
    ├── index.ts                  <-- Central aggregator uniting all collections
    ├── business_math.ts          <-- Business Mathematics questions
    ├── logical_reasoning.ts      <-- Logical Reasoning questions
    └── statistics.ts             <-- Statistics questions
```

---

## 📝 How to Add New Questions

### Method 1: Add directly to a category file (e.g. `src/data/questions/business_math.ts`)
Open the appropriate TS file and add question objects into the array:

```typescript
{
  id: 'q_tvm_101',
  chapterId: 'tvm',
  subExerciseId: 'ex_4a',
  chapterName: 'Time Value of Money',
  difficulty: 'Medium', // 'Easy' | 'Medium' | 'Hard'
  questionText: 'Your question text here...',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctIndex: 0, // 0 for Option A, 1 for Option B, etc.
  explanation: 'Detailed step-by-step solution here...',
  formulaUsed: 'SI = (P × R × T) / 100'
}
```

---

### Method 2: Programmatically Add or Bulk Import JSON
Use the functions exported by `src/data/questionManager.ts`:

```typescript
import { addQuestion, bulkAddQuestions, importQuestionsJSON } from './src/data/questionManager';

// 1. Single Question
addQuestion({
  id: 'q_new_1',
  chapterId: 'ratio_log',
  chapterName: 'Ratio & Logarithms',
  difficulty: 'Easy',
  questionText: 'What is log10(100)?',
  options: ['1', '2', '3', '4'],
  correctIndex: 1,
  explanation: '10^2 = 100 so log10(100) = 2'
});

// 2. Bulk Add 1,000+ Questions from JSON string
importQuestionsJSON(jsonString);
```

---

## 🗑️ How to Remove or Edit Questions

* **To Remove**: Call `removeQuestion('q_id')` or remove the question object from its file in `src/data/questions/`.
* **To Edit**: Modify the question object in its file or call `updateQuestion('q_id', { questionText: 'New text' })`.

---

## ⚡ High Performance Features
* **Zero Lag**: Questions are broken down by domain files so IDE loading remains fast even with 5,000+ entries.
* **Pagination Support**: `getPaginatedQuestions(page, limit)` lets UI render large batches smoothly.
* **Full Text Search**: `searchQuestions('keyword')` searches across question text, formulas, and explanations.
