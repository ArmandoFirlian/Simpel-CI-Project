export function drawBoard(boardElement, grid, solusi, validateInput) {
  boardElement.innerHTML = "";

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

      if (r % 3 === 0) input.style.borderTop = "3px solid black";
      if (c % 3 === 0) input.style.borderLeft = "3px solid black";
      if (r === 8) input.style.borderBottom = "3px solid black";
      if (c === 8) input.style.borderRight = "3px solid black";

      boardElement.appendChild(input);
    }
  }
}
