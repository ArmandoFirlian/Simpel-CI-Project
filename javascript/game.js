import { buatSolusi } from "./generator.js";
import { drawBoard } from "./ui.js";

let solusi = [];
let hintLimit = 5;
let timer = 0;
let interval;

export function startGame(boardElement, difficultySelect, hintUI) {
  hintLimit = 5;
  hintUI.innerText = "Hint tersisa: 5";

  clearInterval(interval);
  timer = 0;

  let grid = buatSolusi();
  solusi = grid.map(r => [...r]);

  let holes = getDifficulty(difficultySelect.value);

  while (holes > 0) {
    let r = Math.floor(Math.random() * 9);
    let c = Math.floor(Math.random() * 9);
    if (grid[r][c] !== 0) {
      grid[r][c] = 0;
      holes--;
    }
  }

  drawBoard(boardElement, grid, solusi, validateInput);
}

function getDifficulty(diff) {
  if (diff === "easy") return 35;
  if (diff === "medium") return 45;
  return 55;
}

function validateInput(e) {
  const input = e.target;
  const value = input.value;
  const [r, c] = input.id.split("-").map(Number);

  // hanya boleh 1-9
  if (!/^[1-9]$/.test(value)) {
    input.value = "";
    input.classList.remove("error", "correct");
    return;
  }

  // cek ke solusi
  if (parseInt(value) === solusi[r][c]) {
    input.classList.remove("error");
    input.classList.add("correct");
  } else {
    input.classList.remove("correct");
    input.classList.add("error");
  }
}

export function checkAnswer() {
  let benar = true;

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let input = document.getElementById(r + "-" + c);
      if (parseInt(input.value) !== solusi[r][c]) {
        benar = false;
      }
    }
  }

  alert(benar ? "🎉 BENAR!" : "❌ Masih ada yang salah!");
}

export function giveHint(hintUI) {
  if (hintLimit <= 0) {
    alert("Hint habis!");
    return;
  }

  let kosong = [];

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let cell = document.getElementById(r + "-" + c);
      if (!cell.disabled && parseInt(cell.value) !== solusi[r][c]) {
        kosong.push({ r, c });
      }
    }
  }

  if (kosong.length === 0) return;

  let pick = kosong[Math.floor(Math.random() * kosong.length)];
  let cell = document.getElementById(pick.r + "-" + pick.c);

  cell.value = solusi[pick.r][pick.c];
  cell.classList.add("hint");

  hintLimit--;
  hintUI.innerText = "Hint tersisa: " + hintLimit;
}
