import { startGame, checkAnswer, giveHint } from "./game.js";

const board = document.getElementById("board");
const difficulty = document.getElementById("difficulty");
const hintUI = document.getElementById("hintCounter");

document.getElementById("newBtn")
  .addEventListener("click", () => startGame(board, difficulty, hintUI));

document.getElementById("checkBtn")
  .addEventListener("click", checkAnswer);

document.getElementById("hintBtn")
  .addEventListener("click", () => giveHint(hintUI));

// Start pertama kali
startGame(board, difficulty, hintUI);
