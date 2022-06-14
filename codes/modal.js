import { musicCounter, buttonAudio } from "../codes/music.js";

//MODAL ELEMENTS
const modalButtonEl = document.querySelector(".how-to-play-button");
const modalContainerEl = document.querySelector(".how-to-play-modal");
const closeModalButtonEl = document.querySelector(".close-modal");

//OPEN HOW TO PLAY MODAL
modalButtonEl.addEventListener("click", () => {
  modalContainerEl.classList.toggle("how-to-play-modal-active");
  if (musicCounter % 2 !== 0) buttonAudio.play();
});

// CLOSE HOW TO PLAY MODAL
closeModalButtonEl.addEventListener("click", () => {
  modalContainerEl.classList.remove("how-to-play-modal-active");
  if (musicCounter % 2 !== 0) buttonAudio.play();
});
