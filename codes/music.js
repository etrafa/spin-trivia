"using strict";

//MUSIC ELEMENTS
const musicButtonEl = document.querySelector(".music-button");
const musicImageSrc = document.querySelector(".music-image");
const musicImages = [
  "./assets/volume-xmark-solid.svg",
  "./assets/volume-high-solid.svg",
];
let musicCounter = 1;

const gameAudio = new Audio();
gameAudio.src = "./assets/sounds/menu.mp3";

//TURN ON / OFF THE MUSIC
musicButtonEl.addEventListener("click", () => {
  if (musicCounter % 2 === 0) {
    musicImageSrc.src = musicImages[1];
    musicCounter++;
    gameAudio.play();
    gameAudio.currentTime = 0;
  } else if (musicCounter % 2 !== 0) {
    musicImageSrc.src = musicImages[0];
    musicCounter++;
    gameAudio.pause();
  }
});
