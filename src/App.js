import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const p1 = "X";
  const p2 = "O";
  const blankBoard = [["0", "1", "2"], ["3", "4", "5"], ["6", "7", "8"]];

  const [player1Turn, setPlayer1Turn] = useState(true);
  const [gameboard, setGameBoard] = useState(blankBoard);
  const [score, setScore] = useState({ "X": 0, "O": 0 });
  const [winner, setWinner] = useState({ "player": false, "locale": [[], [], []] });
  const [turnCount, setTurnCount] = useState(0);

  const rowstyle = ["top", "mid", "bot"]

  const updateGameboard = (y, x) => {
    if (!winner["player"] && gameboard[y][x] !== p1 && gameboard[y][x] !== p2) {
      var temp = [...gameboard];
      temp[y][x] = player1Turn ? p1 : p2;
      setGameBoard(temp);
      setPlayer1Turn(!player1Turn)
      setTurnCount(temp => temp + 1)
      checkWin(y, x);
    }
    console.log(winner["player"]);
  };

  const checkWin = (y, x) => {
    // check row
    if (gameboard[y][0] === gameboard[y][1] && gameboard[y][1] === gameboard[y][2]) {
      setWinner(temp => ({ "player": gameboard[y][0], "locale": [[y, 0], [y, 1], [y, 2]] }));
    }
    //check column
    else if (gameboard[0][x] === gameboard[1][x] && gameboard[1][x] === gameboard[2][x]) {
      setWinner({ "player": gameboard[0][x], "locale": [[0, x], [1, x], [2, x]] });
    }
    //else check diagonals
    else if ((gameboard[1][1] === gameboard[0][0] && gameboard[1][1] === gameboard[2][2])) {
      setWinner({ "player": gameboard[1][1], "locale": [[0, 0], [1, 1], [2, 2]] });
    }
    else if ((gameboard[1][1] === gameboard[2][0] && gameboard[1][1] === gameboard[0][2])) {
      setWinner({ "player": gameboard[1][1], "locale": [[0, 2], [1, 1], [2, 0]] });
    }

  };

  useEffect(() => {
    if (winner["player"]) {
      console.log(winner["player"])

      var newScore = { ...score };
      newScore[winner["player"]] += 1;

      setTimeout(() => {
        setScore(newScore);
      }, 750);
      setTimeout(() => {
        setGameBoard(blankBoard)
        setTurnCount(0);
        setWinner({ "player": false, "locale": [[], [], []] })
      }, 1250);
    }

    if (turnCount >= 9) {
      setTimeout(() => {
        setGameBoard(blankBoard)
        setWinner({ "player": false, "locale": [[], [], []] })
        setTurnCount(0);
      }, 750)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner, turnCount])

  return (
    <main className='App flex flex-column'>

      <section className='board'>
        <div className='d-flex flex-row justify-content-between w-100 mb-5 pb-4'>
          <h2 className={`score fw-bold ${player1Turn?"your-turn":""} ${winner["player"] === p1 ? "won" : ""}`}><span className='text-blue'>P1:</span> {score[p1]}</h2>
          <h2 className={`score fw-bold ${!player1Turn?"your-turn":""} ${winner["player"] === p2 ? "won" : ""}`}><span className='text-red'>P2:</span> {score[p2]}</h2>
        </div>
        {gameboard.map((row, rowindex) => {
          return (
            <div className={`row ${rowstyle[rowindex]}`}>
              {row.map((square, index) => {
                return (
                  <button
                    className={`square ${square} ${winner["player"] ? winner["locale"].some(arr => arr[0] === rowindex && arr[1] === index) ? "winner" : "" : ""} ${turnCount >= 9 && !winner["player"] ? "tie" : ""}`}
                    onClick={() => { updateGameboard(rowindex, index); }}
                  >{square}</button>)
              })}
            </div>
          )
        })}
      </section>
    </main>
  )
}


export default App;
