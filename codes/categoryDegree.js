//WHEN THE WHEEL CHOOSE RANDOM, CHOOSE A RANDOM CATEGORY

let randomQuestionCategory = [];
for (let num = 9; num <= 32; num++) {
  randomQuestionCategory.push(num);
}
// const randomQuestionType = Math.trunc(Math.random() * 40);

const randomQuestionType =
  randomQuestionCategory[
    Math.trunc(Math.random() * randomQuestionCategory.length)
  ];

export const spinWheelDegrees = [
  { degree: 25, questionType: "science", category: 17 },
  { degree: 75, questionType: "movie", category: 11 },
  { degree: 125, questionType: "geography", category: 22 },
  { degree: 175, questionType: "history", category: 23 },
  { degree: 225, questionType: "art", category: 25 },
  { degree: 280, questionType: "sports", category: 21 },
  { degree: 340, questionType: "random", category: randomQuestionType },
];
