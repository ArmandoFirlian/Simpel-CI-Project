const board = document.getElementById("board");
const difficultySelect = document.getElementById("difficulty");

let solusi = [];
let timer = 0;
let interval;
let hintLimit = 5;
let selectedCell = null;

/* ================= TIMER ================= */

function startTimer() {
  clearInterval(interval);
  timer = 0;
  document.getElementById("timer").innerText = "Time: 0";

  interval = setInterval(() => {
    timer++;
    document.getElementById("timer").innerText = "Time: " + timer;
  }, 1000);
}

/* ================= GENERATOR SOLUSI ================= */

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function buatSolusi() {
  let grid = Array(9).fill().map(() => Array(9).fill(0));

  function valid(r, c, n) {
    for (let i = 0; i < 9; i++)
      if (grid[r][i] === n || grid[i][c] === n) return false;

    let sr = Math.floor(r / 3) * 3;
    let sc = Math.floor(c / 3) * 3;

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (grid[sr + i][sc + j] === n) return false;

    return true;
  }

  function fill(pos = 0) {
    if (pos === 81) return true;

    let r = Math.floor(pos / 9);
    let c = pos % 9;

    let nums = shuffle([1,2,3,4,5,6,7,8,9]);

    for (let n of nums) {
      if (valid(r, c, n)) {
        grid[r][c] = n;
        if (fill(pos + 1)) return true;
        grid[r][c] = 0;
      }
    }
    return false;
  }

  fill();
  return grid;
}

/* ================= DIFFICULTY ================= */

function getDifficultyHoles() {
  const diff = difficultySelect.value;

  if (diff === "easy") return 35;
  if (diff === "medium") return 45;
  return 55; // hard
}

/* ================= BUAT PUZZLE ================= */

function generateSudoku() {
  hintLimit = 5;
  updateHintUI();
  board.innerHTML = "";
  startTimer();

  let grid = buatSolusi();
  solusi = grid.map(r => [...r]);

  let holes = getDifficultyHoles();

  while (holes > 0) {
    let r = Math.floor(Math.random() * 9);
    let c = Math.floor(Math.random() * 9);

    if (grid[r][c] !== 0) {
      grid[r][c] = 0;
      holes--;
    }
  }

  drawBoard(grid);
}

/* ================= INPUT VALIDATION ================= */

function validateInput(e) {
  let value = e.target.value;

  if (!/^[1-9]$/.test(value)) {
    e.target.value = "";
  }
}

/* ================= GAMBAR BOARD ================= */

function drawBoard(grid) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let input = document.createElement("input");

      input.id = r + "-" + c;
      input.maxLength = 1;

      if (grid[r][c] !== 0) {
        input.value = grid[r][c];
        input.disabled = true;
        input.classList.add("fixed");
      } else {
        input.addEventListener("input", validateInput);
      }

      // garis sudoku
      if (r % 3 === 0) input.style.borderTop = "3px solid black";
      if (c % 3 === 0) input.style.borderLeft = "3px solid black";
      if (r === 8) input.style.borderBottom = "3px solid black";
      if (c === 8) input.style.borderRight = "3px solid black";

      board.appendChild(input);
    }
  }
}

/* ================= CEK JAWABAN ================= */

function cekJawaban() {
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

/* ================= HINT ================= */

function hint() {
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
  updateHintUI();
}

function updateHintUI() {
  document.getElementById("hintCounter").innerText =
    "Hint tersisa: " + hintLimit;
}

/* ================= HIGHLIGHT ================= */

board.addEventListener("click", function (e) {
  if (e.target.tagName !== "INPUT") return;

  let cell = e.target;

  if (selectedCell === cell) {
    clearHighlight();
    selectedCell = null;
    return;
  }

  selectedCell = cell;
  highlight(cell);
});

function clearHighlight() {
  document.querySelectorAll("input").forEach(c => {
    c.classList.remove("selected", "highlight");
  });
}

function highlight(cell) {
  clearHighlight();

  cell.classList.add("selected");

  let [r, c] = cell.id.split("-").map(Number);

  for (let i = 0; i < 9; i++) {
    document.getElementById(r + "-" + i)?.classList.add("highlight");
    document.getElementById(i + "-" + c)?.classList.add("highlight");
  }
}

/* ================= START ================= */

generateSudoku();
