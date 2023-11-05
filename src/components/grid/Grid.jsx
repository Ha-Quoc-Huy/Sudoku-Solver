import "./Grid.css";

export const GRID_SIZE = 9;

const Grid = ({ grid, onChange, canEdit }) => {
  let tBodies = [];
  for (let i = 0; i < 3; i++) {
    let tBody = [];
    for (let j = 0; j < 3; j++) {
      let row = [];
      for (let k = 0; k < 9; k++)
        row.push(
          <td
            key={k}
            contentEditable={canEdit}
            onKeyUp={(e) => onChange(e.target, { i, j, k })}
          >
            {grid[3 * i + j][k] === 0 ? "" : grid[3 * i + j][k]}
          </td>
        );
      tBody.push(<tr key={j}>{row}</tr>);
    }
    tBodies.push(<tbody key={i}>{tBody}</tbody>);
  }
  return (
    <table>
      <colgroup>
        <col></col>
        <col></col>
        <col></col>
      </colgroup>
      <colgroup>
        <col></col>
        <col></col>
        <col></col>
      </colgroup>
      <colgroup>
        <col></col>
        <col></col>
        <col></col>
      </colgroup>
      {tBodies}
    </table>
  );
};
export default Grid;
