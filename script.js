"using strict";
import { spinWheelDegrees } from "./codes/categoryDegree.js";
import { backgroundType } from "./codes/backgroundType.js";
import {
  musicCounter,
  correctAnswerAudio,
  wrongAnswerAudio,
  spinnerAudio,
  buttonAudio,
} from "./codes/music.js";

//SECTIONS && CONTAINERS
const homeSection = document.getElementById("home");
const spinWheelSection = document.getElementById("spinner");
const questionSection = document.getElementById("question");
const questionTypeContainer = document.querySelector(".question-type");
const scoreBoardContainer = document.querySelector(".score-board");
const optionsContainer = document.querySelector(".question-options");

//BUTTONS && ELEMENTS
const playButtonEl = document.querySelector(".play-button");
const spinButtonEl = document.querySelector(".spinner");
const spinWheelEl = document.querySelector(".wheel");
const optionOne = document.querySelector(".option-one");
const optionTwo = document.querySelector(".option-two");
const optionThree = document.querySelector(".option-three");
const optionFour = document.querySelector(".option-four");
const nextButtonEl = document.querySelector(".next-button");

//LABELS & TEXTS
const spinWheelTextEl = document.querySelector(".spin-wheel-text");
const questionTypeEl = document.querySelector(".question-type-text");
const questionTextEl = document.querySelector(".question-text");
const correctWrongTextContainer = document.querySelector(".correct-wrong-text");
const correctTextEl = document.querySelector(".correct-text");
const incorrectTextEl = document.querySelector(".incorrect-text");
const questionLeftTextEl = document.querySelector(".question-left-text");

//VARIABLES
let questionCorrectAnswer;
let userRightAnswerCounter = 0;
let userWrongAnswerCounter = 0;
let userLivesLeft = 1;

//HIDE HOME MENU SHOW WHEEL SECTION
playButtonEl.addEventListener("click", () => {
  homeSection.style.display = "none";
  spinWheelSection.style.display = "block";
  if (musicCounter % 2 !== 0) buttonAudio.play();
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
  if (musicCounter % 2 !== 0) spinnerAudio.play();

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
    spinnerAudio.pause();
  }, 2000);

  //CHANGE THE MESSAGE AND FETCH THE QUESTION FROM THE API
  setTimeout(() => {
    spinWheelTextEl.textContent = "Get Ready...";
    fetchQuestion(spinWheelDegrees[randomNumberForCategory].category);
  }, 3000);

  //CHANGE THE UI TO QUESTION SECTION
  setTimeout(() => {
    spinWheelSection.style.display = "none";
    questionTypeContainer.style.display = "block";
    questionSection.style.display = "block";
    //CHANGE QUESTION TYPE BACKGROUND AND TEXT
    backgroundType(
      spinWheelDegrees[randomNumberForCategory].questionType,
      questionTypeContainer,
      questionTypeEl
    );
  }, 4000);
});

//FETCH QUESTION FROM API
const fetchQuestion = async (category) => {
  const data = await fetch(
    `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
  );
  const res = await data.json();
  //CHOSE A RANDOM QUESTION FROM API
  let randomQuestion = await res.results[Math.trunc(Math.random() * 9 + 1)];

  //CHANGE QUESTION TO HUMAN READABLE FORMAT
  let randomQuestionReadable = randomQuestion.question
    .replaceAll("&quot;", `"`)
    .replaceAll("&#039;", "'")
    .replaceAll("&shy;", "-")
    .replaceAll("&ldquo;", "“")
    .replaceAll("&rdquo;", "”");

  //SHOW THE QUESTION ON UI
  questionTextEl.textContent = randomQuestionReadable;

  // STORE ALL THE ANSWERS AND SHUFFLE THEM
  const allAnswers = [
    randomQuestion.correct_answer,
    ...randomQuestion.incorrect_answers,
  ].sort(() => Math.random() - 0.5);

  questionCorrectAnswer = randomQuestion.correct_answer;

  //SHOW ANSWERS ON UI
  optionOne.textContent = allAnswers[0]
    .replaceAll("&quot;", `"`)
    .replaceAll("&#039;", "'")
    .replaceAll("&shy;", "-")
    .replaceAll("&ldquo;", "“")
    .replaceAll("&rdquo;", "”");
  optionTwo.textContent = allAnswers[1]
    .replaceAll("&quot;", `"`)
    .replaceAll("&#039;", "'")
    .replaceAll("&shy;", "-")
    .replaceAll("&ldquo;", "“")
    .replaceAll("&rdquo;", "”");
  optionThree.textContent = allAnswers[2]
    .replaceAll("&quot;", `"`)
    .replaceAll("&#039;", "'")
    .replaceAll("&shy;", "-")
    .replaceAll("&ldquo;", "“")
    .replaceAll("&rdquo;", "”");
  optionFour.textContent = allAnswers[3]
    .replaceAll("&quot;", `"`)
    .replaceAll("&#039;", "'")
    .replaceAll("&shy;", "-")
    .replaceAll("&ldquo;", "“")
    .replaceAll("&rdquo;", "”");
};

//CHECK ANSWER WHEN USER SELECT AN OPTION
const checkAnswer = (targetButton) => {
  //IF ANSWER IS CORRECT
  if (targetButton.textContent === questionCorrectAnswer) {
    userRightAnswerCounter = userRightAnswerCounter + 1;
    userLivesLeft = userLivesLeft - 1;
    questionTextEl.style.display = "none";
    correctWrongTextContainer.style.display = "block";
    correctWrongTextContainer.textContent = "CORRECT";
    correctWrongTextContainer.classList.add("correct-wrong-text-true");
    targetButton.classList.add("question-options-correct");
    if (musicCounter % 2 !== 0) correctAnswerAudio.play();
    disableClickEvent();
    setTimeout(() => {
      correctWrongTextContainer.classList.remove("correct-wrong-text-true");
      showResult();
      gameOver();
    }, 2000);
  }
  //! IF ANSWER IS NOT CORRECT
  else {
    userWrongAnswerCounter = userWrongAnswerCounter + 1;
    userLivesLeft = userLivesLeft - 1;
    questionTextEl.style.display = "none";
    correctWrongTextContainer.style.display = "block";
    correctWrongTextContainer.textContent = "WRONG";
    correctWrongTextContainer.classList.add("correct-wrong-text-false");
    targetButton.classList.add("question-options-wrong");
    targetButton.style.boxShadow = "none";
    if (musicCounter % 2 !== 0) wrongAnswerAudio.play();
    disableClickEvent();
    setTimeout(() => {
      targetButton.classList.remove("question-options-wrong");
      correctWrongTextContainer.classList.remove("correct-wrong-text-false");
      showResult();
      gameOver();
    }, 2000);
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
  } else if (optionTwo.textContent === questionCorrectAnswer) {
    optionTwo.classList.add("correct-answer-animation");
  } else if (optionThree.textContent === questionCorrectAnswer) {
    optionThree.classList.add("correct-answer-animation");
  } else if (optionFour.textContent === questionCorrectAnswer) {
    optionFour.classList.add("correct-answer-animation");
  }
};

//SHOW RESULT
const showResult = () => {
  questionTypeEl.textContent = "RESULTS";
  correctWrongTextContainer.style.display = "none";
  correctTextEl.textContent = userRightAnswerCounter;
  incorrectTextEl.textContent = userWrongAnswerCounter;
  questionLeftTextEl.textContent = userLivesLeft;
  scoreBoardContainer.style.display = "block";
  optionsContainer.style.display = "none";
  nextButtonEl.style.display = "block";
};

nextButtonEl.addEventListener("click", () => {
  if (userLivesLeft !== 0) {
    resetSettings();
  } else {
    resetSettings();
    directMainMenu();
  }
});

//NEXT QUESTION SET ALL THE SETTINGS TO DEFAULT
const resetSettings = () => {
  questionSection.style.display = "none";
  spinWheelSection.style.display = "block";
  spinWheelTextEl.textContent = "SPIN THE WHEEL TO SEE QUESTION TYPE";
  spinButtonEl.style.pointerEvents = "auto";
  scoreBoardContainer.style.display = "none";
  questionTextEl.style.display = "block";
  nextButtonEl.style.display = "none";
  optionsContainer.style.display = "grid";
  optionOne.style.pointerEvents = "auto";
  optionTwo.style.pointerEvents = "auto";
  optionThree.style.pointerEvents = "auto";
  optionFour.style.pointerEvents = "auto";
  optionOne.classList.remove(
    "correct-answer-animation",
    "question-options-correct"
  );
  optionTwo.classList.remove(
    "correct-answer-animation",
    "question-options-correct"
  );
  optionThree.classList.remove(
    "correct-answer-animation",
    "question-options-correct"
  );
  optionFour.classList.remove(
    "correct-answer-animation",
    "question-options-correct"
  );
};

//WHEN USER ANSWERS ALL THE QUESTION SHOW FINAL RESULT AND GO TO MAIN MENU
const gameOver = () => {
  if (userLivesLeft === 0) {
    questionTypeEl.textContent = "GAME OVER";
    nextButtonEl.textContent = "MAIN MENU";
    nextButtonEl.style.backgroundColor = "#000";
    nextButtonEl.style.color = "#fff";
  }
};

//WHEN GAME IS OVER GO TO MAIN MENU AND RESET GAME SETTINGS
const directMainMenu = () => {
  userLivesLeft = 10;
  userRightAnswerCounter = 0;
  userWrongAnswerCounter = 0;
  questionSection.style.display = "none";
  spinWheelSection.style.display = "none";
  homeSection.style.display = "block";
  nextButtonEl.style.display = "block";
  nextButtonEl.textContent = "Next";
  nextButtonEl.style.backgroundColor = "#fff";
  nextButtonEl.style.color = "#000";
  nextButtonEl.style.display = "none";
};
