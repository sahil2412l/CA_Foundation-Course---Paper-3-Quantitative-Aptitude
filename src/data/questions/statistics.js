// Statistics Questions Collection

export const STATISTICS_QUESTIONS = [
  {
    id: 'q8',
    chapterId: 'stats_central',
    chapterName: 'Measures of Central Tendency',
    difficulty: 'Medium',
    questionText: 'If Mean = 45 and Median = 48, find the Mode using empirical relation.',
    options: ['54', '51', '52', '42'],
    correctIndex: 0,
    explanation: 'Mode = 3 Median - 2 Mean = 3(48) - 2(45) = 144 - 90 = 54.',
    formulaUsed: 'Mode = 3 Median - 2 Mean'
  },
  {
    id: 'stat_2',
    chapterId: 'dispersion',
    chapterName: 'Measures of Dispersion',
    difficulty: 'Medium',
    questionText: 'If the Standard Deviation of a set of observations is 6, what is the Variance?',
    options: ['36', '12', '3', '√6'],
    correctIndex: 0,
    explanation: 'Variance = (Standard Deviation)² = 6² = 36.',
    formulaUsed: 'Variance = σ²'
  },
  {
    id: 'stat_3',
    chapterId: 'probability',
    chapterName: 'Probability',
    difficulty: 'Easy',
    questionText: 'What is the probability of getting a sum of 7 when two fair dice are thrown simultaneously?',
    options: ['1/6', '1/12', '5/36', '1/4'],
    correctIndex: 0,
    explanation: 'Favorable outcomes for sum of 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 outcomes out of 36. P = 6/36 = 1/6.',
    formulaUsed: 'Probability P = Favorable / Total Outcomes'
  },
  {
    id: 'stat_4',
    chapterId: 'correlation_reg',
    chapterName: 'Correlation & Regression',
    difficulty: 'Hard',
    questionText: 'If the two regression coefficients are bxy = 0.8 and byx = 0.45, find the correlation coefficient r.',
    options: ['0.6', '0.36', '0.625', '0.75'],
    correctIndex: 0,
    explanation: 'Correlation coefficient r = √(bxy × byx) = √(0.8 × 0.45) = √0.36 = 0.6.',
    formulaUsed: 'r = √(bxy × byx)'
  }
];
