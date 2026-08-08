// Logical Reasoning Questions Collection

export const LOGICAL_REASONING_QUESTIONS = [
  {
    id: 'q9',
    chapterId: 'number_series',
    chapterName: 'Logical Reasoning - Number Series',
    difficulty: 'Easy',
    questionText: 'Find the missing term in series: 4, 9, 25, 49, ?, 169.',
    options: ['121', '81', '100', '144'],
    correctIndex: 0,
    explanation: 'Squares of prime numbers: 2²=4, 3²=9, 5²=25, 7²=49, 11²=121, 13²=169.',
    formulaUsed: 'Pattern: Square of consecutive primes'
  },
  {
    id: 'q10',
    chapterId: 'direction_test',
    chapterName: 'Logical Reasoning - Direction Sense Test',
    difficulty: 'Medium',
    questionText: 'A person walks 10 km North, then 6 km South, and then 3 km East. How far and in which direction is he from starting point?',
    options: ['5 km North-East', '5 km South-East', '7 km East', '5 km North'],
    correctIndex: 0,
    explanation: 'Net movement North = 10 - 6 = 4 km. Net movement East = 3 km. Distance = √(4² + 3²) = √(16 + 9) = √25 = 5 km in North-East direction.',
    formulaUsed: 'Distance = √(North² + East²)'
  },
  {
    id: 'lr_3',
    chapterId: 'seating_arrangements',
    chapterName: 'Logical Reasoning - Seating Arrangements',
    difficulty: 'Medium',
    questionText: 'Five friends A, B, C, D, and E are sitting in a row facing North. A is to the immediate right of B, and E is to the immediate left of B but to the right of C. If D is at the extreme right end, who is sitting in the middle?',
    options: ['B', 'A', 'C', 'E'],
    correctIndex: 0,
    explanation: 'Arrangement from left to right: C, E, B, A, D. The middle person is B.',
    formulaUsed: 'Linear Seating Arrangement Order'
  },
  {
    id: 'lr_4',
    chapterId: 'blood_relations',
    chapterName: 'Logical Reasoning - Blood Relations',
    difficulty: 'Hard',
    questionText: 'Pointing to a photograph, a man said "I have no brother or sister, but that man\'s father is my father\'s son." Whose photograph was it?',
    options: ['His son\'s', 'His own', 'His father\'s', 'His nephew\'s'],
    correctIndex: 0,
    explanation: 'Since he has no brother or sister, "my father\'s son" means himself. So "that man\'s father is myself" → photograph is of his son.',
    formulaUsed: 'Blood Relation Deduction'
  }
];
