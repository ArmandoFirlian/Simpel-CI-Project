const solusi = [
[5,3,4,6,7,8,9,1,2],
[6,7,2,1,9,5,3,4,8],
[1,9,8,3,4,2,5,6,7],
[8,5,9,7,6,1,4,2,3],
[4,2,6,8,5,3,7,9,1],
[7,1,3,9,2,4,8,5,6],
[9,6,1,5,3,7,2,8,4],
[2,8,7,4,1,9,6,3,5],
[3,4,5,2,8,6,1,7,9]
];

let puzzle = [];

const board = document.getElementById("board");

function generatePuzzle() {
  board.innerHTML = "";

  puzzle = solusi.map(row => [...row]);

  for (let i = 0; i < 40; i++) {
    let r = Math.floor(Math.random() * 9);
    let c = Math.floor(Math.random() * 9);
    puzzle[r][c] = 0;
  }

  buatBoard();
}

function buatBoard() {
  board.innerHTML = "";

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const input = document.createElement("input");

      if (puzzle[r][c] !== 0) {
        input.value = puzzle[r][c];
        input.disabled = true;
        input.classList.add("fixed");
      }

      input.id = r + "-" + c;

      if (r % 3 === 0) input.style.borderTop = "3px solid black";
      if (c % 3 === 0) input.style.borderLeft = "3px solid black";
      if (r === 8) input.style.borderBottom = "3px solid black";
      if (c === 8) input.style.borderRight = "3px solid black";

      input.maxLength = 1;
      board.appendChild(input);
    }
  }
}

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

  if (benar) alert("🎉 BENAR!");
  else alert("❌ Masih ada yang salah!");
}

generatePuzzle();
