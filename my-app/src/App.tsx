import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [countdown, setCountdown] = useState(-1);
  const [remainingTime, setRemainingTime] = useState(5);

  useEffect(() => {
    let countdownInterval: NodeJS.Timer;
    if (!gameActive && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && !gameActive) {
      setGameActive(true);
      setRemainingTime(5);
    }
    return () => clearInterval(countdownInterval);
  }, [countdown, gameActive]);

  useEffect(() => {
    let gameTimer: NodeJS.Timer;
    if (gameActive && remainingTime > 0) {
      gameTimer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      if (highScore < score) {
        setHighScore(score);
      }
      setGameActive(false);
    }
    return () => clearInterval(gameTimer);
  }, [remainingTime, gameActive, score, highScore]);

  function startGame() {
    setScore(0);
    setCountdown(3);
  }

  return (
    <div className="wrapper">
      <h1>Click Speed Test</h1>
      <h2>Best Score: {highScore}</h2>
      <h3>Current Score: {score}</h3>
      <button onClick={startGame}>Start Game</button>
      <button 
        onClick={() => setScore(score + 1)} 
        disabled={!gameActive}
      >
        Click Me!
      </button>
      {!gameActive && countdown > 0 && <p>Starting in: {countdown}</p>}
      <p>Time Left: {remainingTime} sec</p>
    </div>
  );
}

export default App;
