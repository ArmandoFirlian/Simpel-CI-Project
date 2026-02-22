const board = document.getElementById("board");
let solusi = [];
let timer = 0;
let interval;

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

/* ================= GENERATOR ================= */

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function buatSolusi() {
  let grid = Array(9).fill().map(() => Array(9).fill(0));

  function valid(r, c, n) {
    for (let i = 0; i < 9; i++)
      if (grid[r][i] === n || grid[i][c] === n) return false;

    let sr = Math.floor(r/3)*3;
    let sc = Math.floor(c/3)*3;

    for (let i=0;i<3;i++)
      for (let j=0;j<3;j++)
        if(grid[sr+i][sc+j]===n) return false;

    return true;
  }

  function fill(pos=0){
    if(pos===81) return true;
    let r=Math.floor(pos/9);
    let c=pos%9;

    let nums = shuffle([1,2,3,4,5,6,7,8,9]);

    for(let n of nums){
      if(valid(r,c,n)){
        grid[r][c]=n;
        if(fill(pos+1)) return true;
        grid[r][c]=0;
      }
    }
    return false;
  }

  fill();
  return grid;
}

/* ================= BOARD ================= */

function tampilkanBoard(puzzle) {
  board.innerHTML = "";

  for (let r=0;r<9;r++){
    for (let c=0;c<9;c++){

      let input = document.createElement("input");
      input.id = r+"-"+c;
      input.maxLength = 1;

      if(puzzle[r][c]!==0){
        input.value = puzzle[r][c];
        input.disabled = true;
        input.classList.add("fixed");
      }

      // garis tebal
      if (r % 3 === 0) input.style.borderTop = "3px solid black";
      if (c % 3 === 0) input.style.borderLeft = "3px solid black";
      if (r === 8) input.style.borderBottom = "3px solid black";
      if (c === 8) input.style.borderRight = "3px solid black";

      input.addEventListener("focus", () => highlight(r,c));

      board.appendChild(input);
    }
  }
}

/* ================= HIGHLIGHT ================= */

function highlight(r,c){
  document.querySelectorAll("input").forEach(el=>el.classList.remove("highlight"));

  for(let i=0;i<9;i++){
    document.getElementById(r+"-"+i).classList.add("highlight");
    document.getElementById(i+"-"+c).classList.add("highlight");
  }
}

/* ================= GENERATE PUZZLE ================= */

function generateSudoku(){

  solusi = buatSolusi();

  let puzzle = solusi.map(row => [...row]);

  let diff = document.getElementById("difficulty").value;
  let remove = diff==="easy" ? 35 : diff==="medium" ? 45 : 55;

  while(remove>0){
    let r=Math.floor(Math.random()*9);
    let c=Math.floor(Math.random()*9);
    if(puzzle[r][c]!==0){
      puzzle[r][c]=0;
      remove--;
    }
  }

  tampilkanBoard(puzzle);
  startTimer();
}

/* ================= CHECK ================= */

function cekJawaban(){
  for(let r=0;r<9;r++){
    for(let c=0;c<9;c++){
      let val = document.getElementById(r+"-"+c).value;
      if(parseInt(val)!==solusi[r][c]){
        alert("❌ Masih ada yang salah!");
        return;
      }
    }
  }

  clearInterval(interval);
  alert("🎉 BENAR! Waktu: "+timer+" detik");
}

/* ================= START ================= */

generateSudoku();
