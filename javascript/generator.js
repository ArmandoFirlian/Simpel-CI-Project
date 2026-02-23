// generator.js

export function buatSolusi() {
  const base = 3;
  const side = base * base;

  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  function pattern(r, c) {
    return (base * (r % base) + Math.floor(r / base) + c) % side;
  }

  const rBase = [0, 1, 2];
  const rows = shuffle(rBase.flatMap(g => shuffle(rBase).map(r => g * base + r)));
  const cols = shuffle(rBase.flatMap(g => shuffle(rBase).map(c => g * base + c)));
  const nums = shuffle([1,2,3,4,5,6,7,8,9]);

  return rows.map(r =>
    cols.map(c =>
      nums[pattern(r, c)]
    )
  );
}
