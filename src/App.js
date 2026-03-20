import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Start guessing!");
  const [attempts, setAttempts] = useState(0);
  const [best, setBest] = useState(localStorage.getItem("bestScore") || "-");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    newGame();
  }, []);

  function newGame() {
    const random = Math.floor(Math.random() * 100) + 1;
    setTarget(random);
    setGuess("");
    setMessage("Start guessing!");
    setAttempts(0);
    setGameOver(false);
  }

  function checkGuess() {
    const num = parseInt(guess);

    if (!num || num < 1 || num > 100) {
      setMessage("⚠️ Enter a number between 1 and 100");
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    const diff = Math.abs(target - num);

    if (num === target) {
      setMessage(`🎉 You won in ${newAttempts} attempts!`);
      setGameOver(true);

      if (best === "-" || newAttempts < best) {
        localStorage.setItem("bestScore", newAttempts);
        setBest(newAttempts);
      }

    } else if (num < target) {
      if (diff <= 5) setMessage("🔥 Too low! Very close!");
      else if (diff <= 15) setMessage("📈 Too low! Getting warm...");
      else setMessage("❄️ Too low! Far away");

    } else {
      if (diff <= 5) setMessage("🔥 Too high! Very close!");
      else if (diff <= 15) setMessage("📉 Too high! Getting warm...");
      else setMessage("❄️ Too high! Far away");
    }

    setGuess("");
  }

  function handleKey(e) {
    if (e.key === "Enter" && !gameOver) {
      checkGuess();
    }
  }

  return (
    <div className="container">
      <h1>🎯 Guess The Number</h1>
      <p className="subtitle">
        I'm thinking of a number between 1 and 100
      </p>

      <div className="card">

        {/* Stats */}
        <div className="stats">
          <div className="box">
            <p>Attempts</p>
            <h2>{attempts}</h2>
          </div>
          <div className="box">
            <p>Best Score</p>
            <h2>{best}</h2>
          </div>
        </div>

        {/* Message */}
        <div className={`message ${gameOver ? "win" : ""}`}>
          {message}
        </div>

        {/* Input */}
        <input
          type="number"
          placeholder="Enter your guess..."
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={handleKey}
          disabled={gameOver}
        />

        {/* Buttons */}
        <button onClick={checkGuess} disabled={gameOver}>
          Guess
        </button>

        <button className="reset" onClick={newGame}>
          🔄 New Game
        </button>
      </div>
    </div>
  );
}