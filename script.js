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

//LABELS & TEXTS
const spinWheelTextEl = document.querySelector(".spin-wheel-text");
const questionTypeEl = document.querySelector(".question-type-text");

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
