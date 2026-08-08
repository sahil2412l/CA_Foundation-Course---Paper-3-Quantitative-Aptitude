# 📘 CA Foundation Question Bank Management Guide

This project features a high-performance **Quantitative Aptitude Question Bank** built with **Vanilla HTML, CSS, and JavaScript** — zero backend or build tools required.

---

## 📁 Project Architecture

```text
/
├── index.html                    <-- Web App Entry Point
├── css/
│   └── styles.css                <-- Global Styling & Design System
├── js/
│   ├── data.js                   <-- Master Question Bank & Syllabus Data
│   ├── storage.js                <-- LocalStorage & User Progress Engine
│   └── app.js                    <-- UI Renderer & Application Logic
└── README_QUESTION_MANAGEMENT.md
```

---

## 📝 How to Add or Edit Questions

All questions are maintained directly inside `js/data.js` within the `MATH_QUESTIONS` array:

```javascript
{
  id: 'q_1a_101',
  chapterId: 'ratio_log',
  subExerciseId: 'ex_1a',
  chapterName: 'Ratio, Proportion, Indices & Logarithms',
  difficulty: 'Medium', // 'Easy' | 'Medium' | 'Hard'
  questionText: 'Your question text here...',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctIndex: 0, // 0 for Option A, 1 for Option B, etc.
  explanation: 'Detailed step-by-step solution here...',
  formulaUsed: 'SI = (P × R × T) / 100'
}
```

---

## ⚡ Key Highlights
* **Zero Build Step**: Edit `js/data.js` and refresh your browser.
* **Seamless Deployment**: Fully compatible with GitHub Pages hosting out-of-the-box.
