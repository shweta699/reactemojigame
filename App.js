import React, { useState, useEffect } from 'react';
import './App.css';

const emojis = ['😀', '😎', '🚀', '🌈', '🎉', '🐱', '🐶', '🍔', '🍕', '🍦', '🎈', '🎁'];

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function getEmojisForDifficulty(difficulty) {
  if (difficulty === 'easy') {
    return emojis.slice(0, 6);
  } else if (difficulty === 'medium') {
    return emojis.slice(0, 9);
  } else if (difficulty === 'hard') {
    return emojis.slice(0, 11);
  }
}

function App() {
  const [gridSize, setGridSize] = useState(4); // Default grid size
  const [difficulty, setDifficulty] = useState('easy'); // Default difficulty
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60); // 60-second timer
  const [darkMode, setDarkMode] = useState(false); // Dark Mode
  const [shuffleUsed, setShuffleUsed] = useState(false); // Shuffle used indicator

  useEffect(() => {
    const symbols = shuffleArray(getEmojisForDifficulty(difficulty));
    const duplicatedSymbols = [...symbols, ...symbols];
    const shuffledCards = shuffleArray(duplicatedSymbols);

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setScore(0);
    setTimer(60); // Reset the timer
    setShuffleUsed(false); // Reset shuffle usage
  }, [difficulty]);

  useEffect(() => {
    if (timer <= 0) {
      // Game over when the timer reaches 0
      alert('Game Over! Your score: ' + score);
      setDifficulty('easy'); // Reset the difficulty
    }
    function App() {
    useEffect(() => {
      if (solved.length === cards.length / 2) {
        // Player wins the game
        setTimeout(() => {
          // Show fireworks animation for a few seconds
          const fireworks = document.createElement('div');
          fireworks.className = 'fireworks';
          document.body.appendChild(fireworks);
          setTimeout(() => {
            document.body.removeChild(fireworks);
            alert(`Congratulations! You won! Your score: ${score}`);
            setDifficulty('easy'); // Reset the difficulty
          }, 3000); // Display fireworks for 3 seconds
        }, 1000); // Wait 1 second before showing fireworks
      }
    }, [solved, cards, score]);
    
  }
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval); // Clean up the timer interval
    };
  }, [timer, score]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [firstCard, secondCard] = flipped;
      setMoves(moves + 1);

      if (cards[firstCard] === cards[secondCard]) {
        setSolved([...solved, cards[firstCard]]);
        setScore(score + 1);
      }

      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped, cards, solved, moves, score]);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || solved.includes(cards[index])) {
      return;
    }
    setFlipped([...flipped, index]);
  };

  const handleDifficultyChange = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleShuffleClick = () => {
    if (!shuffleUsed) {
      const shuffledCards = shuffleArray(cards);
      setCards(shuffledCards);
      setShuffleUsed(true);
    }
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Emoji Memory Game</h1>
      <div className="controls">
        <label>
          Select Difficulty:{' '}
          <select value={difficulty} onChange={(e) => handleDifficultyChange(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
        <button onClick={handleShuffleClick} disabled={shuffleUsed}>
          Shuffle Cards {shuffleUsed ? '(Used)' : ''}
        </button>
        <div className="score">Score: {score}</div>
        <div className="moves">Moves: {moves}</div>
        <div className="timer">Time: {timer} seconds</div>
      </div>
      <div className={`memory-grid size-${gridSize}`}>
        {cards.map((symbol, index) => (
          <div
            key={index}
            className={`card ${flipped.includes(index) || solved.includes(symbol) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">{symbol}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
