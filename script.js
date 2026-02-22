let solusi = [];
let puzzle = [];

const base = [
[1,2,3,4,5,6,7,8,9],
[4,5,6,7,8,9,1,2,3],
[7,8,9,1,2,3,4,5,6],
[2,3,4,5,6,7,8,9,1],
[5,6,7,8,9,1,2,3,4],
[8,9,1,2,3,4,5,6,7],
[3,4,5,6,7,8,9,1,2],
[6,7,8,9,1,2,3,4,5],
[9,1,2,3,4,5,6,7,8]
];

const board = document.getElementById("board");

function shuffle(arr){
  return arr.sort(()=>Math.random()-0.5);
}

function generateSudoku(){
  board.innerHTML="";

  let nums = shuffle([1,2,3,4,5,6,7,8,9]);

  // mapping angka random
  solusi = base.map(row =>
    row.map(n => nums[n-1])
  );

  // shuffle baris per blok
  for(let b=0;b<3;b++){
    let rows = shuffle([0,1,2]);
    for(let i=0;i<3;i++){
      [solusi[b*3+i], solusi[b*3+rows[i]]] =
      [solusi[b*3+rows[i]], solusi[b*3+i]];
    }
  }

  // shuffle kolom per blok
  for(let b=0;b<3;b++){
    let cols = shuffle([0,1,2]);
    for(let r=0;r<9;r++){
      for(let i=0;i<3;i++){
        let c1=b*3+i;
        let c2=b*3+cols[i];
        [solusi[r][c1], solusi[r][c2]] =
        [solusi[r][c2], solusi[r][c1]];
      }
    }
  }

  puzzle = solusi.map(r=>[...r]);

  // hapus random
  for(let i=0;i<45;i++){
    let r=Math.floor(Math.random()*9);
    let c=Math.floor(Math.random()*9);
    puzzle[r][c]=0;
  }

  buatBoard();
}

function buatBoard(){
  board.innerHTML="";

  for(let r=0;r<9;r++){
    for(let c=0;c<9;c++){
      let input=document.createElement("input");

      if(puzzle[r][c]!==0){
        input.value=puzzle[r][c];
        input.disabled=true;
        input.classList.add("fixed");
      }

      input.id=r+"-"+c;

      if(r%3===0) input.style.borderTop="3px solid black";
      if(c%3===0) input.style.borderLeft="3px solid black";
      if(r===8) input.style.borderBottom="3px solid black";
      if(c===8) input.style.borderRight="3px solid black";

      input.maxLength=1;
      board.appendChild(input);
    }
  }
}

function cekJawaban(){
  let benar=true;

  for(let r=0;r<9;r++){
    for(let c=0;c<9;c++){
      let val=parseInt(document.getElementById(r+"-"+c).value);
      if(val!==solusi[r][c]) benar=false;
    }
  }

  alert(benar?"🎉 BENAR!":"❌ Masih salah!");
}

generateSudoku();
