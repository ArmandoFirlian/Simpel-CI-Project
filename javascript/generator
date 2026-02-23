export function buatSolusi() {
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

  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
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
