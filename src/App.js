import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import { useState } from 'react';

function App() {

  const [history, setHistory] = useState([{squares : Array(9).fill(null) }]);
  const [isValid, setIsValid] = useState(true)
  const [stepNumber , setStepNumber] = useState(0);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  const currnet = history[stepNumber];
  const winner = calculateWinner(currnet.squares)

  let status
  if(winner) {
    status = 'Winner' + winner
  }else{
    status = `Next Player : ${isValid ? 'X' : 'O'}`
  }
  function handleClick(i) {
    const newHistory = history.slice(0 , stepNumber + 1)
    const newCurrent = newHistory[newHistory.length - 1]
    const newSquares = newCurrent.squares.slice();

    if(calculateWinner(newSquares) || newSquares[i]) {
      return
    }
    newSquares[i] = isValid ? 'X' : 'O';
    setHistory([...newHistory , {squares : newSquares}]);
    setIsValid(prev => !prev)
    setStepNumber(newHistory.length)
  }

  const moves = history.map((step, move) => {
    const desc = move?
    `Go to move #${move}` :
    'Go to start';
    return (
      <li key={move}>
        <button className='move-button'onClick={()=> jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  const jumpTo = (step) => {
    setStepNumber(step)
    setIsValid((step % 2) === 0)
  }


  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={currnet.squares} onClick={(i) => handleClick(i)}/>
      </div>
      <div className='game-info'>
        <div className='status'>{status}</div>
        <ol style={{listStyle : 'none'}}>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
