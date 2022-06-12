export const backgroundType = (questionType, container, questionText) => {
  if (questionType === "science") {
    container.style.backgroundColor = "#5CB85C";
  } else if (questionType === "movie") {
    container.style.backgroundColor = "#B94AA2";
  } else if (questionType === "geography") {
    container.style.backgroundColor = "#3B9AC7";
  } else if (questionType === "history") {
    container.style.backgroundColor = "#F0AD4E";
  } else if (questionType === "art") {
    container.style.backgroundColor = "#D9534F";
  } else if (questionType === "sports") {
    container.style.backgroundColor = "#DF691A";
  } else if (questionType === "randomly") {
    container.style.backgroundColor = `#684399`;
  }
  questionText.textContent = questionType.toUpperCase();
};
