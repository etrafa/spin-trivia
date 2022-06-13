"using strict";
import { spinWheelDegrees } from "./codes/categoryDegree.js";
import { backgroundType } from "./codes/backgroundType.js";

//SECTIONS && CONTAINERS
const homeSection = document.getElementById("home");
const spinWheelSection = document.getElementById("spinner");
const questionSection = document.getElementById("question");
const questionTypeContainer = document.querySelector(".question-type");

//BUTTONS && ELEMENTS
const playButtonEl = document.querySelector(".play-button");
const spinButtonEl = document.querySelector(".spinner");
const spinWheelEl = document.querySelector(".wheel");
const optionOne = document.querySelector(".option-one");
const optionTwo = document.querySelector(".option-two");
const optionThree = document.querySelector(".option-three");
const optionFour = document.querySelector(".option-four");

//LABELS & TEXTS
const spinWheelTextEl = document.querySelector(".spin-wheel-text");
const questionTypeEl = document.querySelector(".question-type-text");
const questionTextEl = document.querySelector(".question-text");
const correctWrongTextEl = document.querySelector(".correct-wrong-text");

//HIDE HOME MENU SHOW WHEEL SECTION
playButtonEl.addEventListener("click", () => {
  homeSection.style.display = "none";
  spinWheelSection.style.display = "block";
});

//WHEEL THE SPINNER WHEN PRESS THE BUTTON
spinButtonEl.addEventListener("click", () => {
  //CREATE RANDOM NUMBER FOR QUESTION CATEGORY
  let randomNumberForCategory;
  randomNumberForCategory = Math.trunc(Math.random() * 7);
  spinWheelTextEl.textContent = "We're choosing a question for you...";
  spinWheelEl.classList.add("spinner-wheel-active");

  //DISABLE THE BUTTON SO USER CANNOT PRESS MORE THAN ONCE
  spinButtonEl.style.pointerEvents = "none";

  //START SPINNING THE WHEEL
  setTimeout(() => {
    spinWheelEl.classList.remove("spinner-wheel-active");
    spinWheelEl.classList.add("spinner-wheel-active-fast");
  }, 1000);

  //SPIN THE WHEEL FASTER AND STOP AT RANDOM CATEGORY 5S LATER
  setTimeout(() => {
    spinWheelEl.classList.remove("spinner-wheel-active-fast");
    spinWheelEl.style.transform = `rotate(${spinWheelDegrees[randomNumberForCategory].degree}deg)`;
    spinWheelTextEl.textContent = `You will be asked ${spinWheelDegrees[
      randomNumberForCategory
    ].questionType.toUpperCase()} question.`;
  }, 2000);

  //CHANGE THE MESSAGE AND FETCH THE QUESTION FROM THE API
  setTimeout(() => {
    spinWheelTextEl.textContent = "Get Ready...";
    fetchQuestion(spinWheelDegrees[randomNumberForCategory].category);
  }, 3000);

  //CHANGE THE UI TO QUESTION SECTION
  setTimeout(() => {
    spinWheelSection.style.display = "none";
    questionSection.style.display = "block";

    //CHANGE QUESTION TYPE BACKGROUND AND TEXT
    backgroundType(
      spinWheelDegrees[randomNumberForCategory].questionType,
      questionTypeContainer,
      questionTypeEl
    );
  }, 4000);
});

let questionCorrectAnswer;

//FETCH QUESTION FROM API
const fetchQuestion = async (category) => {
  const data = await fetch(
    `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
  );
  const res = await data.json();
  //CHOSE A RANDOM QUESTION FROM API
  let randomQuestion = await res.results[Math.trunc(Math.random() * 9 + 1)];

  console.log(randomQuestion);
  //SHOW THE QUESTION ON UI
  questionTextEl.textContent = randomQuestion.question;

  // STORE ALL THE ANSWERS AND SHUFFLE THEM
  const allAnswers = [
    randomQuestion.correct_answer,
    ...randomQuestion.incorrect_answers,
  ].sort(() => Math.random() - 0.5);

  questionCorrectAnswer = randomQuestion.correct_answer;

  console.log(questionCorrectAnswer);

  //SHOW ANSWERS ON UI
  optionOne.textContent = allAnswers[0];
  optionTwo.textContent = allAnswers[1];
  optionThree.textContent = allAnswers[2];
  optionFour.textContent = allAnswers[3];
};

//CHECK ANSWER WHEN USER SELECT AN OPTION
const checkAnswer = (targetButton) => {
  if (targetButton.textContent === questionCorrectAnswer) {
    questionTextEl.style.display = "none";
    correctWrongTextEl.style.display = "block";
    correctWrongTextEl.textContent = "CORRECT";
    correctWrongTextEl.classList.add("correct-wrong-text-true");
    targetButton.style.backgroundColor = "#00ff00";
    disableClickEvent();
  } else {
    questionTextEl.style.display = "none";
    correctWrongTextEl.style.display = "block";
    correctWrongTextEl.textContent = "WRONG";
    correctWrongTextEl.classList.add("correct-wrong-text-false");
    disableClickEvent();
  }
};

optionOne.addEventListener("click", () => {
  checkAnswer(optionOne);
  showCorrectAnswer();
});

optionTwo.addEventListener("click", () => {
  checkAnswer(optionTwo);
  showCorrectAnswer();
});

optionThree.addEventListener("click", () => {
  checkAnswer(optionThree);
  showCorrectAnswer();
});

optionFour.addEventListener("click", () => {
  checkAnswer(optionFour);
  showCorrectAnswer();
});

//DISABLE CLICK EVENT
const disableClickEvent = () => {
  optionOne.style.pointerEvents = "none";
  optionTwo.style.pointerEvents = "none";
  optionThree.style.pointerEvents = "none";
  optionFour.style.pointerEvents = "none";
};

//IF USER'S ANSWER IS CORRECT SHOW CORRECT ANIMATION
const showCorrectAnswer = () => {
  if (optionOne.textContent === questionCorrectAnswer) {
    optionOne.classList.add("correct-answer-animation");
    optionOne.style.backgroundColor = "#00ff00";
  } else if (optionTwo.textContent === correctAnswer) {
    optionTwo.classList.add("correct-answer-animation");
    optionTwo.style.backgroundColor = "#00ff00";
  } else if (optionThree.textContent === correctAnswer) {
    optionThree.classList.add("correct-answer-animation");
    optionThree.style.backgroundColor = "#00ff00";
  } else if (optionFour.textContent === correctAnswer) {
    optionFour.classList.add("correct-answer-animation");
    optionFour.style.backgroundColor = "#00ff00";
  }
};
