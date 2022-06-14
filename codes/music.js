"using strict";

//MUSIC ELEMENTS
const musicButtonEl = document.querySelector(".music-button");
const musicImageSrc = document.querySelector(".music-image");
const musicImages = [
  "./assets/volume-xmark-solid.svg",
  "./assets/volume-high-solid.svg",
];

export let musicCounter = 0;

const gameAudio = new Audio();
export const correctAnswerAudio = new Audio();
export const wrongAnswerAudio = new Audio();

gameAudio.src = "./assets/sounds/menu.mp3";
correctAnswerAudio.src = "./assets/sounds/correct-answer-sound.wav";
wrongAnswerAudio.src = "./assets/sounds/wrong-answer-sound.mp3";

//TURN ON / OFF THE MUSIC
musicButtonEl.addEventListener("click", () => {
  if (musicCounter % 2 === 0) {
    musicImageSrc.src = musicImages[1];
    musicCounter++;
    gameAudio.play();
    gameAudio.currentTime = 0;
    gameAudio.loop = true;
    console.log("playing...");
  } else if (musicCounter % 2 !== 0) {
    musicImageSrc.src = musicImages[0];
    musicCounter++;
    gameAudio.pause();
    console.log("stopping...");
  }
});
