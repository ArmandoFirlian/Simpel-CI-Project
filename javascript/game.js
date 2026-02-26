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

  document.getElementById("timer").innerText = "Time: 0s";

  interval = setInterval(() => {
    timer++;
    document.getElementById("timer").innerText = "Time: " + timer + "s";
  }, 1000);

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
  const [row, col] = input.id.split("-").map(Number);

  if (!/^[1-9]$/.test(value)) {
    input.value = "";
    input.classList.remove("error", "correct");
    return;
  }

  if (parseInt(value) === solusi[row][col]) {
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

  if (benar) {
    clearInterval(interval);
    alert("🎉 BENAR! Waktu: " + timer + " detik");
  } else {
    alert("❌ Masih ada yang salah!");
  }
}

export function giveHint(hintUI) {
  if (hintLimit <= 0) {
    alert("Hint habis!");
    return;
  }

  let kandidat = [];

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let cell = document.getElementById(r + "-" + c);

      if (!cell.disabled && parseInt(cell.value) !== solusi[r][c]) {
        kandidat.push({ r, c });
      }
    }
  }

  if (kandidat.length === 0) return;

  let pick = kandidat[Math.floor(Math.random() * kandidat.length)];
  let cell = document.getElementById(pick.r + "-" + pick.c);

  cell.value = solusi[pick.r][pick.c];

  cell.classList.remove("error", "correct");
  cell.classList.add("hint");

  hintLimit--;
  hintUI.innerText = "Hint tersisa: " + hintLimit;
}

function clearAllConflicts() {
  document.querySelectorAll(".conflict")
    .forEach(cell => cell.classList.remove("conflict"));
}

function checkConflicts(row, col) {
  clearAllConflicts();

  const value = parseInt(document.getElementById(row + "-" + col).value);
  if (!value) return;

  // cek row & col
  for (let i = 0; i < 9; i++) {
    if (i !== col) {
      let cell = document.getElementById(row + "-" + i);
      if (parseInt(cell.value) === value) {
        cell.classList.add("conflict");
        document.getElementById(row + "-" + col).classList.add("conflict");
      }
    }

    if (i !== row) {
      let cell = document.getElementById(i + "-" + col);
      if (parseInt(cell.value) === value) {
        cell.classList.add("conflict");
        document.getElementById(row + "-" + col).classList.add("conflict");
      }
    }
  }

  // cek box 3x3
  let boxRow = Math.floor(row / 3) * 3;
  let boxCol = Math.floor(col / 3) * 3;

  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (r !== row || c !== col) {
        let cell = document.getElementById(r + "-" + c);
        if (parseInt(cell.value) === value) {
          cell.classList.add("conflict");
          document.getElementById(row + "-" + col).classList.add("conflict");
        }
      }
    }
  }
}
