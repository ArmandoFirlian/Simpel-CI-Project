import { startGame, checkAnswer, giveHint, showMistakes } from "./game.js";

const board = document.getElementById("board");
const difficulty = document.getElementById("difficulty");
const hintUI = document.getElementById("hintCounter");
const modal = document.getElementById("confirmModal");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");
const newBtn = document.getElementById("newBtn");

function showConfirm(callback) {
  modal.style.display = "flex";

  confirmBtn.onclick = () => {
    modal.style.display = "none";
    callback();
  };

  cancelBtn.onclick = () => {
    modal.style.display = "none";
  };
}

function hasProgress() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let input = document.getElementById(r + "-" + c);
      if (input && !input.disabled && input.value !== "") {
        return true;
      }
    }
  }
  return false;
}

newBtn.addEventListener("click", () => {
  if (hasProgress()) {
    showConfirm(() => {
      startGame(board, difficulty, hintUI);
    });
  } else {
    startGame(board, difficulty, hintUI);
  }
});

document.getElementById("checkBtn")
  .addEventListener("click", checkAnswer);

document.getElementById("hintBtn")
  .addEventListener("click", () => giveHint(hintUI));

document.getElementById("mistakeBtn")
  .addEventListener("click", showMistakes);
// Start pertama kali
startGame(board, difficulty, hintUI);
