import "./SudokuSolver.css";

import { getInitialGrid, gridSize, puzzles } from "../../algorithms/gridAlgo";
import Grid from "../grid/Grid";
import { useState, useEffect } from "react";
import { solve } from "../../algorithms/solve";

const validNum = /[1-9]/;

const SudokuSolver = () => {
  const [grid, setGrid] = useState(getInitialGrid);
  const [isSolved, setIsSolved] = useState(false);
  const [canEdit, setCanEdit] = useState(true);
  const [isSolving, setIsSolving] = useState(false);
  const [isPuzzle, setIsPuzzle] = useState(false);
  const [puzzNum, setPuzzNum] = useState(0);

  const onChange = (e, det) => {
    if (e.textContent.length > 0 && validNum.test(e.textContent[0])) {
      e.textContent = e.textContent[0];
      console.log(isPuzzle);
      if (!isPuzzle) e.style.backgroundColor = "#e3ad65";
    } else {
      e.textContent = "";
      e.style.backgroundColor = "#FCCD90";
    }
    let newGrid = [...grid];

    newGrid[3 * det.i + det.j][det.k] =
      e.textContent.length === 0 ? 0 : parseInt(e.textContent[0]);
  };

  const solveSudoku = () => {
    let solvedGrid = [];
    for (let i = 0; i < gridSize; i++) {
      let newRow = [];
      for (let j = 0; j < gridSize; j++) newRow.push(grid[i][j]);
      solvedGrid.push(newRow);
    }
    let allMoves = solve(solvedGrid);
    if (allMoves) {
      setCanEdit(false);
      setIsSolving(true);
      animateSudoku(allMoves);
    } else alert("Provided sudoku can't be solved!");
  };

  const animateSudoku = (allMoves = [{ row: 0, col: 0, value: 0 }]) => {
    let l = allMoves.length;
    console.log(l);
    for (let i = 0; i <= l; i++) {
      if (i == l) {
        setTimeout(() => {
          setIsSolved(true);
          setIsSolving(false);
        }, 20 * i);
      } else {
        setTimeout(() => {
          let newGrid = [...grid];
          newGrid[allMoves[i].row][allMoves[i].col] = allMoves[i].value;
          setGrid(newGrid);
        }, 20 * i);
      }
    }
  };

  const setBoard = (puzzle = []) => {
    let tds = document.getElementsByTagName("td");
    resetBoard();
    let puzzlerGrid = [];
    for (let i = 0; i < gridSize; i++) {
      let puzzlerRow = [];
      for (let j = 0; j < gridSize; j++) {
        if (puzzle[gridSize * i + j] === "-") puzzlerRow.push(0);
        else {
          puzzlerRow.push(parseInt(puzzle[gridSize * i + j]));
          tds[i * gridSize + j].style.backgroundColor = "#e3ad65";
        }
      }
      puzzlerGrid.push(puzzlerRow);
    }
    setGrid(puzzlerGrid);
    setIsPuzzle(true);
  };

  const getPuzzle = () => {
    let puzzDisp = puzzNum;
    if (puzzNum === 3) {
      setPuzzNum(0);
      puzzDisp = 0;
    }
    const dispPuzz =
      puzzDisp === 0
        ? puzzles.EASY_PUZZLE
        : puzzDisp === 1
        ? puzzles.MEDIUM_PUZZLE
        : puzzDisp === 2
        ? puzzles.HARD_PUZZLE
        : "";
    setBoard(dispPuzz);
    console.log(puzzDisp);
    setPuzzNum(puzzDisp + 1);
  };

  const resetBoard = () => {
    let emptyGrid = getInitialGrid();
    setGrid(emptyGrid);
    setCanEdit(true);
    let myTds = document.getElementsByTagName("td");
    for (let i = 0; i < myTds.length; i++)
      myTds[i].style.backgroundColor = "#FCCD90";
    setIsPuzzle(false);
    setIsSolved(false);
    setPuzzNum(0);
  };

  const handleClick = () => {
    // setBoard(puzzles.EASY_PUZZLE);
    if (isSolved || isSolving) resetBoard();
    else solveSudoku();
  };

  // code for Dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.body.classList.add("dark-mode");
      const table = document.querySelector("table");
      if (table) {
        table.classList.add("dark-mode");
      }
      const buttons = document.querySelectorAll(".button");
      buttons.forEach((button) => {
        button.classList.add("dark-mode");
      });
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.body.classList.toggle("dark-mode", newMode);
      const table = document.querySelector("table");
      if (table) {
        table.classList.toggle("dark-mode", newMode);
      }
      const buttons = document.querySelectorAll(".button");
      buttons.forEach((button) => {
        button.classList.toggle("dark-mode", newMode);
      });

      // Lưu trạng thái vào localStorage
      localStorage.setItem("darkMode", newMode);

      return newMode;
    });
  };

  return (
    <>
      <h1>
        <span style={{ color: "yellow" }}>Sudoku </span>
        <span style={{ color: "#AAFF00" }}>Solver</span>
      </h1>
      <div className="header">
        <div className="button " onClick={toggleDarkMode}>
          {isDarkMode ? "Light mode" : "Dark mode"}
        </div>
        <div className="button " onClick={handleClick}>
          {isSolved ? "Reset" : isSolving ? "Solving..." : "Solve"}
        </div>
      </div>
      <Grid grid={grid} onChange={onChange} canEdit={canEdit} />
      <div className="button puzzle " onClick={getPuzzle}>
        {isPuzzle ? "Change Puzzle" : "Get Puzzle"}
      </div>
    </>
  );
};

export default SudokuSolver;
