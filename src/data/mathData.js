// CA Foundation Mathematics, Logical Reasoning & Statistics Complete Data Bank

import { INITIAL_QUESTIONS_BANK } from './questions/index';

export const CA_MATH_CHAPTERS = [
  // --- PART A: Business Mathematics (8 Chapters) ---
  {
    id: 'ratio_log',
    title: 'Ratio, Proportion, Indices & Logarithms',
    weightage: '4 - 6 Marks',
    category: 'Math',
    description: 'Properties of Ratios, Duplicate/Sub-duplicate Ratios, Laws of Indices, Logarithm Change of Base Rule.',
    questionCount: 220,
    subExercises: [
      { id: 'ex_1a', title: 'Exercise 1A: Ratio & Properties', description: 'Duplicate, Sub-duplicate, Triplicate ratios & Compounding', questionCount: 26, formulasCount: 2 },
      { id: 'ex_1b', title: 'Exercise 1B: Proportion & Rules', description: 'Mean proportion, Continued proportion, Componendo & Dividendo', questionCount: 30, formulasCount: 2 },
      { id: 'ex_1c', title: 'Exercise 1C: Laws of Indices', description: 'Integral & Fractional indices, Exponential simplification', questionCount: 30, formulasCount: 3 },
      { id: 'ex_1d', title: 'Exercise 1D: Logarithms & Change of Base', description: 'Log product, quotient, power rules & base change', questionCount: 25, formulasCount: 4 },
      { id: 'ex_1e', title: 'Exercise 1E: Additional Question Bank', description: 'Advanced & Combined practice questions from ICAI Question Bank', questionCount: 109, formulasCount: 5 }
    ],
    formulas: [
      { title: 'Duplicate & Sub-duplicate Ratio', formula: 'Duplicate of a:b = a²:b², Sub-duplicate = √a:√b', note: 'Triplicate = a³:b³' },
      { title: 'Componendo & Dividendo', formula: 'If a/b = c/d then (a+b)/(a-b) = (c+d)/(c-d)', note: 'Useful in equation simplification' },
      { title: 'Laws of Logarithms', formula: 'log(m × n) = log m + log n, log(m/n) = log m - log n', note: 'log(m^k) = k log m' },
      { title: 'Change of Base Rule', formula: 'log_b(a) = log_c(a) / log_c(b) = 1 / log_a(b)', note: 'log_a(1) = 0, log_a(a) = 1' }
    ]
  },
  {
    id: 'equations',
    title: 'Equations & Matrices',
    weightage: '4 - 6 Marks',
    category: 'Math',
    description: 'Linear Equations, Quadratic Equations, Sum & Product of Roots, Matrices & Determinants.',
    questionCount: 6,
    formulas: [
      { title: 'Roots of Quadratic Equation (ax² + bx + c = 0)', formula: 'x = [-b ± √(b² - 4ac)] / 2a', note: 'Discriminant D = b² - 4ac' },
      { title: 'Sum & Product of Roots', formula: 'α + β = -b/a , α · β = c/a', note: 'Equation: x² - (Sum)x + Product = 0' },
      { title: 'Determinant of 2x2 Matrix', formula: '|A| = ad - bc for Matrix [[a, b], [c, d]]', note: 'Inverse exists if |A| ≠ 0' }
    ]
  },
  {
    id: 'inequalities',
    title: 'Linear Inequalities',
    weightage: '3 - 5 Marks',
    category: 'Math',
    description: 'Linear Inequalities in one & two variables, Region representation, Objective functions & Feasible Region.',
    questionCount: 5,
    formulas: [
      { title: 'Inequality Sign Flip Rule', formula: 'Multiplying/Dividing by negative number flips sign: -x < -y ⟹ x > y', note: 'Careful with negative factors' },
      { title: 'Feasible Region', formula: 'Shaded common region satisfying all constraints in first quadrant (x ≥ 0, y ≥ 0)', note: 'Corner point method for Max/Min' }
    ]
  },
  {
    id: 'tvm',
    title: 'Time Value of Money (TVM)',
    weightage: '14 - 18 Marks (Highest)',
    category: 'Math',
    description: 'Simple & Compound Interest, Annuity Regular, Annuity Due, Present Value, Future Value, Perpetuity & Sinking Fund.',
    questionCount: 12,
    subExercises: [
      { id: 'ex_4a', title: 'Exercise 4A: Simple Interest (SI)', description: 'SI formula, Principal, Rate & Time calculations', questionCount: 5, formulasCount: 1 },
      { id: 'ex_4b', title: 'Exercise 4B: Compound Interest & Effective Rate', description: 'Compounding frequency (Quarterly/Monthly) & Effective Yield E', questionCount: 6, formulasCount: 2 },
      { id: 'ex_4c', title: 'Exercise 4C: Annuities (PV & FV)', description: 'Annuity Regular, Annuity Due, Present & Future Value', questionCount: 8, formulasCount: 2 },
      { id: 'ex_4d', title: 'Exercise 4D: Perpetuity & Sinking Fund', description: 'Infinite periodic payments, Capital valuation & Amortization', questionCount: 4, formulasCount: 2 }
    ],
    formulas: [
      { title: 'Simple Interest (SI)', formula: 'SI = (P × R × T) / 100', note: 'Amount A = P(1 + RT/100)' },
      { title: 'Compound Interest (CI)', formula: 'A = P(1 + i)^n', note: 'i = R / (100 × m), m = compounding periods/year' },
      { title: 'Effective Rate of Interest (E)', formula: 'E = (1 + i)^m - 1', note: 'Actual annual percentage yield' },
      { title: 'Future Value of Annuity Regular', formula: 'FV = A [((1 + i)^n - 1) / i]', note: 'Payments at END of period' },
      { title: 'Present Value of Annuity Regular', formula: 'PV = A / i [1 - 1/(1+i)^n]', note: 'Current discounted value' },
      { title: 'Perpetuity Present Value', formula: 'PV = A / i', note: 'Infinite periodic cash flow' }
    ]
  },
  {
    id: 'pandc',
    title: 'Permutations & Combinations (P&C)',
    weightage: '4 - 6 Marks',
    category: 'Math',
    description: 'Factorial notation, nPr arrangement, nCr selection, Circular permutations, Handshake problems.',
    questionCount: 6,
    formulas: [
      { title: 'Permutation Formula (Arrangement)', formula: 'nPr = n! / (n - r)!', note: 'Order matters' },
      { title: 'Combination Formula (Selection)', formula: 'nCr = n! / [r! (n - r)!]', note: 'Order does NOT matter' },
      { title: 'Circular Permutations', formula: '(n - 1)! for distinct objects', note: '(n - 1)! / 2 for necklaces' }
    ]
  },
  {
    id: 'ap_gp',
    title: 'Sequence & Series (AP & GP)',
    weightage: '4 - 6 Marks',
    category: 'Math',
    description: 'Arithmetic Progression (AP), Geometric Progression (GP), Sum to infinity of GP.',
    questionCount: 5,
    formulas: [
      { title: 'nth term of AP', formula: 'Tn = a + (n - 1)d', note: 'a = first term, d = common difference' },
      { title: 'Sum of n terms of AP', formula: 'Sn = (n / 2) [2a + (n - 1)d]', note: 'Or Sn = (n / 2) [a + l]' },
      { title: 'nth term & Sum of GP', formula: 'Tn = a r^(n-1), Sn = a(r^n - 1) / (r - 1)', note: 'r = common ratio' },
      { title: 'Sum to Infinity of GP (|r| < 1)', formula: 'S∞ = a / (1 - r)', note: 'Used in perpetuities' }
    ]
  },
  {
    id: 'sets_functions',
    title: 'Sets, Relations & Functions',
    weightage: '3 - 5 Marks',
    category: 'Math',
    description: 'Venn diagrams, Union & Intersection, Subset properties, Domain & Range of functions, Composite functions.',
    questionCount: 5,
    formulas: [
      { title: 'Cardinality of Sets', formula: 'n(A ∪ B) = n(A) + n(B) - n(A ∩ B)', note: 'For 3 sets: n(A∪B∪C)' },
      { title: 'Number of Subsets', formula: 'Total subsets = 2^n for a set of n elements', note: 'Proper subsets = 2^n - 1' }
    ]
  },
  {
    id: 'calculus',
    title: 'Differential & Integral Calculus',
    weightage: '3 - 5 Marks',
    category: 'Math',
    description: 'Basic derivatives, Marginal Cost & Revenue, Integration as inverse process, Definite integrals.',
    questionCount: 5,
    formulas: [
      { title: 'Power Rule Derivative', formula: 'd/dx (x^n) = n · x^(n-1)', note: 'd/dx (c) = 0 for constant c' },
      { title: 'Marginal Revenue & Cost', formula: 'MR = d(TR)/dq , MC = d(TC)/dq', note: 'Profit Max when MR = MC' },
      { title: 'Power Rule Integration', formula: '∫ x^n dx = (x^(n+1))/(n+1) + C', note: 'Valid for n ≠ -1' }
    ]
  },

  // --- PART B: Logical Reasoning (4 Chapters) ---
  {
    id: 'number_series',
    title: 'Number Series, Coding-Decoding & Odd Man Out',
    weightage: '5 Marks',
    category: 'Logical Reasoning',
    description: 'Alphabetical & numerical series patterns, letter coding, symbol coding, identifying odd items.',
    questionCount: 6,
    formulas: [
      { title: 'Alphabet Position Rule (EJOTY)', formula: 'E=5, J=10, O=15, T=20, Y=25', note: 'Reverse positions: 27 - Position' },
      { title: 'Common Series Patterns', formula: 'Squares (n²), Cubes (n³), Prime numbers, Double Differences', note: 'Check ratio or difference first' }
    ]
  },
  {
    id: 'direction_test',
    title: 'Direction Sense Test',
    weightage: '5 Marks',
    category: 'Logical Reasoning',
    description: 'Cardinal directions (N, S, E, W), sub-directions (NE, NW, SE, SW), Turns & Distance by Pythagoras theorem.',
    questionCount: 5,
    formulas: [
      { title: 'Clockwise Direction Order', formula: 'North ➔ East ➔ South ➔ West ➔ North', note: 'Right turn = 90° Clockwise' },
      { title: 'Shortest Distance Formula', formula: 'd = √(x² + y²)', note: 'Pythagoras theorem on N-S and E-W net movements' }
    ]
  },
  {
    id: 'seating_arrangement',
    title: 'Seating Arrangements',
    weightage: '5 Marks',
    category: 'Logical Reasoning',
    description: 'Linear arrangements, Circular facing center, Circular facing outwards, Row & Column seating.',
    questionCount: 5,
    formulas: [
      { title: 'Facing Center Rule', formula: 'Clockwise = LEFT , Counter-Clockwise = RIGHT', note: 'Opposite rule if facing outwards' },
      { title: 'Linear Left/Right', formula: 'Facing North: Left is West, Right is East', note: 'Facing South: Left is East, Right is West' }
    ]
  },
  {
    id: 'blood_relations',
    title: 'Blood Relations',
    weightage: '5 Marks',
    category: 'Logical Reasoning',
    description: 'Family tree diagrams, Generational gaps, Direct & indirect relations, Paternal vs Maternal relatives.',
    questionCount: 5,
    formulas: [
      { title: 'Generation Gap Notation', formula: 'Parents/Uncles = +1 Gen, Self/Cousins = 0 Gen, Children = -1 Gen', note: 'Use + for Male, - for Female' },
      { title: 'Key Terms', formula: 'Maternal = Mother side, Paternal = Father side', note: 'Spouse = Married couple' }
    ]
  },

  // --- PART C: Statistics (6 Chapters) ---
  {
    id: 'stats_description',
    title: 'Statistical Description of Data',
    weightage: '4 - 6 Marks',
    category: 'Statistics',
    description: 'Primary vs Secondary Data, Discrete & Continuous variables, Histogram, Ogives, Frequency Polygon.',
    questionCount: 6,
    formulas: [
      { title: 'Class Mid-Point / Mark', formula: 'Mid Point = (Upper Boundary + Lower Boundary) / 2', note: 'Class Width = Upper - Lower' },
      { title: 'Ogive Curves', formula: 'Less than Ogive & More than Ogive intersect at MEDIAN', note: 'Used for graphical median determination' }
    ]
  },
  {
    id: 'stats_central',
    title: 'Measures of Central Tendency & Dispersion',
    weightage: '12 - 16 Marks',
    category: 'Statistics',
    description: 'Mean, Median, Mode, Range, Quartile Deviation, Mean Deviation, Standard Deviation (SD) & Variance.',
    questionCount: 8,
    formulas: [
      { title: 'Empirical Relation for Mode', formula: 'Mode = 3 Median - 2 Mean', note: 'Moderately skewed distributions' },
      { title: 'Quartile Deviation (QD)', formula: 'QD = (Q3 - Q1) / 2', note: 'Coeff of QD = (Q3 - Q1) / (Q3 + Q1)' },
      { title: 'Coefficient of Variation (CV)', formula: 'CV = (Standard Deviation / Mean) × 100', note: 'Measures relative risk/dispersion' }
    ]
  },
  {
    id: 'probability',
    title: 'Probability',
    weightage: '4 - 6 Marks',
    category: 'Statistics',
    description: 'Classical & Axiomatic definition, Addition & Multiplication Theorem, Conditional Probability, Bayes Theorem.',
    questionCount: 6,
    formulas: [
      { title: 'Classical Probability', formula: 'P(A) = Favorable Outcomes / Total Outcomes', note: '0 ≤ P(A) ≤ 1' },
      { title: 'Addition Theorem', formula: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)', note: 'P(A ∩ B) = 0 for mutually exclusive' },
      { title: 'Conditional Probability', formula: 'P(A|B) = P(A ∩ B) / P(B)', note: 'P(A ∩ B) = P(A) × P(B) for independent' }
    ]
  },
  {
    id: 'theoretical_dist',
    title: 'Theoretical Distributions',
    weightage: '4 - 6 Marks',
    category: 'Statistics',
    description: 'Binomial Distribution, Poisson Distribution, Normal Distribution & Standard Normal Curves.',
    questionCount: 6,
    formulas: [
      { title: 'Binomial Mean & Variance', formula: 'Mean = n · p , Variance = n · p · q', note: 'Variance < Mean in Binomial' },
      { title: 'Poisson Mean & Variance', formula: 'Mean = λ , Variance = λ', note: 'Mean = Variance in Poisson' },
      { title: 'Standard Normal Variate (Z)', formula: 'Z = (X - μ) / σ', note: 'Mean = 0, Variance = 1 for Z' }
    ]
  },
  {
    id: 'correlation_regression',
    title: 'Correlation & Regression',
    weightage: '4 - 6 Marks',
    category: 'Statistics',
    description: 'Karl Pearson Coefficient of Correlation (r), Spearmans Rank Correlation, Lines of Regression (y on x & x on y).',
    questionCount: 6,
    formulas: [
      { title: 'Pearson Correlation (r)', formula: '-1 ≤ r ≤ +1', note: 'r = +1 perfect positive, r = -1 perfect negative' },
      { title: 'Regression Coefficients Relation', formula: 'r = ± √(byx × bxy)', note: 'r and both regression coeffs have same sign' },
      { title: 'Rank Correlation (Spearman)', formula: 'R = 1 - (6 Σ d²) / [n(n² - 1)]', note: 'Used for qualitative data' }
    ]
  },
  {
    id: 'sampling',
    title: 'Sampling Theory & Representation',
    weightage: '2 - 4 Marks',
    category: 'Statistics',
    description: 'Population vs Sample, Random Sampling, Stratified Sampling, Systematic & Cluster Sampling.',
    questionCount: 4,
    formulas: [
      { title: 'Sampling Error', formula: 'Sampling Error = Sample Statistic - Population Parameter', note: 'Decreases as sample size increases' },
      { title: 'Standard Error (SE)', formula: 'SE = σ / √n', note: 'Precision of sample mean estimate' }
    ]
  },
];

export const MATH_QUESTIONS = INITIAL_QUESTIONS_BANK;

export const FLASHCARDS = [
  {
    id: 'f1',
    chapterTitle: 'Time Value of Money',
    frontTitle: 'Effective Interest Rate Formula',
    frontFormula: 'E = (1 + i)^m - 1',
    backExplanation: 'where i = R / (100 × m), m = compounding periods per year (m=4 for quarterly, m=12 for monthly).',
    example: 'Nominal 12% monthly → i = 0.01, E = (1.01)¹² - 1 = 12.68%'
  },
  {
    id: 'f2',
    chapterTitle: 'Time Value of Money',
    frontTitle: 'Perpetuity Present Value',
    frontFormula: 'PV = A / i',
    backExplanation: 'Presents the capital value needed to receive an infinite periodic payment A at periodic rate i.',
    example: '₹1,000 per year forever at 10% → PV = 1000 / 0.10 = ₹10,000'
  },
  {
    id: 'f3',
    chapterTitle: 'Ratio & Logarithms',
    frontTitle: 'Change of Base Rule',
    frontFormula: 'log_b(a) = log(a) / log(b)',
    backExplanation: 'Allows changing logarithm base to 10 or e. Also log_b(a) = 1 / log_a(b).',
    example: 'log₄(64) = log(64) / log(4) = 3'
  },
  {
    id: 'f4',
    chapterTitle: 'Measures of Dispersion',
    frontTitle: 'Coefficient of Variation (CV)',
    frontFormula: 'CV = (SD / Mean) × 100',
    backExplanation: 'Measures relative consistency. Distribution with LOWER CV is MORE consistent and LESS variable.',
    example: 'Series A (CV=15%) is more stable than Series B (CV=25%)'
  }
];

export const BADGES_LIST = [
  { id: 'badge_welcome', title: 'First Step to CA', description: 'Created your profile and started studying Math.', icon: '🎯' },
  { id: 'badge_10min', title: 'Focus Scholar', description: 'Spent over 10 minutes continuously studying Math.', icon: '⏱️', reqWatchTimeMin: 10 },
  { id: 'badge_5questions', title: 'Problem Solver', description: 'Solved 5 or more questions correctly.', icon: '⚡', reqQuestions: 5 },
  { id: 'badge_level5', title: 'Formula Master', description: 'Reached Level 5 in CA Foundation Math.', icon: '🏆', reqXp: 1600 },
  { id: 'badge_rank_pro', title: 'CA TVM Specialist', description: 'Mastered Time Value of Money questions.', icon: '👑', reqXp: 4900 }
];
