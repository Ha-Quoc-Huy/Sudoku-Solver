import { gridSize } from "./gridAlgo";

export const solve = (grid) => {
  if (!isBoardValid(grid)) return false;
  let allMoves = [];
  solveSud(grid, 0, 0, allMoves);
  return allMoves;
};

function isBoardValid(grid) {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] && !isSafe(grid, i, j, grid[i][j])) return false;
    }
  }
  return true;
}

function isSafe(grid, i, j, x) {
  for (let k = 0; k < gridSize; k++) {
    if ((k != j && grid[i][k] === x) || (k != i && grid[k][j] === x))
      return false;
  }
  let s = Math.sqrt(gridSize);
  let rs = i - (i % s);
  let cs = j - (j % s);
  for (let r = 0; r < s; r++) {
    for (let c = 0; c < s; c++) {
      if (rs + r === i && cs + c === j) continue;
      if (grid[rs + r][cs + c] === x) return false;
    }
  }
  return true;
}

function solveSud(grid = [], i, j, allMoves = []) {
  if (j === gridSize) (i = i + 1), (j = 0);
  if (i === gridSize) return true;
  if (grid[i][j] != 0) return solveSud(grid, i, j + 1, allMoves);
  for (let x = 1; x <= gridSize; x++) {
    if (isSafe(grid, i, j, x)) {
      grid[i][j] = x;
      allMoves.push({ row: i, col: j, value: x });
      if (solveSud(grid, i, j + 1, allMoves)) return true;
      grid[i][j] = 0;
      allMoves.push({ row: i, col: j, value: 0 });
    }
  }
  return false;
}

// function solveSud(grid, i, j) {
//   if (j === gridSize) (i = i + 1), (j = 0);
//   if (i === gridSize) return true;
//   if (grid[i][j] != 0) return solveSud(grid, i, j + 1);
//   for (let x = 1; x <= gridSize; x++) {
//     if (isSafe(grid, i, j, x)) {
//       grid[i][j] = x;
//       if (solveSud(grid, i, j + 1, x)) return true;
//       grid[i][j] = 0;
//     }
//   }
//   return false;
// }
