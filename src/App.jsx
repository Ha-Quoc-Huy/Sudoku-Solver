import { useState } from "react";
import "./App.css";
import { getInitialGrid } from "./algorithms/gridAlgo";
import SudokuSolver from "./components/sudokuSolver/SudokuSolver";

function App() {
  return <SudokuSolver />;
}

export default App;
