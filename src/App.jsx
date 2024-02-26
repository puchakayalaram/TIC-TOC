import PlayersInfo from "./PlayersInfo"
import GameBoard from "./GameBoard"
import {useState} from 'react';
import Log from "./Log";
import { WINNING_COMBINATIONS } from "./WinningCombinations";
import GameOver from "./GameOver";

const PLAYER={
  X:'Player1',
  O:'Player2'
}
const INITIAL_GAME_BOARD=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

function DeriveWinner(gameBoard,playerWon){
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];

    if( firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner=playerWon[firstSquareSymbol];
    }
  }
  return winner;
}

function DeriveGameBoard(gameTurns){
  let  gameBoard=[...INITIAL_GAME_BOARD.map(array=>[...array])];
  for( const turn of gameTurns){
    const {square,player}=turn;
    const {row,col}=square;
    gameBoard[row][col]=player;
  }
  return gameBoard;
}

function DeriveActivePlayer(gameTurns){
   let currentPlayer='X';
   if(gameTurns.length > 0 && gameTurns[0].player ==='X'){
        currentPlayer='O';
   }
   return currentPlayer;
}
function App() {

  const [playerWon,setPlayerWon]=useState(PLAYER)
  const [gameTurns,setGameTurns]=useState([]);
  const gameBoard=DeriveGameBoard(gameTurns);
  const activePlayer=DeriveActivePlayer(gameTurns);
  const winner=DeriveWinner(gameBoard,playerWon);

  const hasDraw= gameTurns.length ===9 && !winner;

  function handleRestart(){
    setGameTurns([]);
  }
  function handleWonPlayer(symbol,newName){
    setPlayerWon((prev)=>{ return {...prev,
    [symbol]:newName
    }} )
  }

  function handleSelectSquare(rowIndex,colIndex){
     setGameTurns(prevTurn => {
       const currentPlayer=DeriveActivePlayer(prevTurn);
       const updatedTurn =[{square :{ row: rowIndex, col: colIndex}, player: currentPlayer }, ...prevTurn];
       return updatedTurn;
     })
  }

  return (<main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <PlayersInfo initialname={PLAYER.X} symbol="X" isActive={activePlayer ==='X'} onName={handleWonPlayer}/>
        <PlayersInfo initialname={PLAYER.O} symbol="O" isActive={activePlayer ==='O'} onName={handleWonPlayer}/>
      </ol>
      {(winner || hasDraw)&& <GameOver winner={winner} onRestart={handleRestart}/>}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
    </div>
    <Log turns={gameTurns}/>
  </main>
  )
}

export default App
