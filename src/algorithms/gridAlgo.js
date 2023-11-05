export const gridSize = 9;

export const puzzles = {
  EASY_PUZZLE:
    "1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--",
  MEDIUM_PUZZLE:
    "-3-5--8-45-42---1---8--9---79-8-61-3-----54---5------78-----7-2---7-46--61-3--5--",
  HARD_PUZZLE:
    "8----------36------7--9-2---5---7-------457-----1---3---1----68--85---1--9----4--",
};

export const getInitialGrid = () => {
  let grid = [];
  for (let i = 0; i < gridSize; i++) {
    let row = [];
    for (let j = 0; j < gridSize; j++) {
      row.push(0);
    }
    grid.push(row);
  }
  return grid;
};
