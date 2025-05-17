import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [isAutoCounting, setIsAutoCounting] = useState(false);
  const [isAutoDecreasing, setIsAutoDecreasing] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoCounting) {
      intervalId = setInterval(() => setCount(prev => prev + 1), 1000);
    } else if (isAutoDecreasing) {
      intervalId = setInterval(() => setCount(prev => prev - 1), 1000);
    }

    return () => intervalId && clearInterval(intervalId);
  }, [isAutoCounting, isAutoDecreasing]);

  const toggleAutoCount = () => {
    setIsAutoCounting(prev => !prev);
    setIsAutoDecreasing(false);
  };

  const toggleAutoDecrease = () => {
    setIsAutoDecreasing(prev => !prev);
    setIsAutoCounting(false);
  };

  return (
    <div className="App">
      <div className="counter-container">
        <h1>カウンター</h1>
        <div className="count">{count}</div>
        <div className="button-container">
          <button onClick={() => setCount(prev => prev - 1)} className="decrement-button">
            -
          </button>
          <button onClick={() => setCount(prev => prev + 1)} className="increment-button">
            +
          </button>
        </div>
        <div className="auto-button-container">
          <button 
            onClick={toggleAutoCount} 
            className={`auto-count-button ${isAutoCounting ? 'active' : ''}`}
          >
            {isAutoCounting ? '停止' : '自動+'}
          </button>
          <button 
            onClick={toggleAutoDecrease} 
            className={`auto-decrease-button ${isAutoDecreasing ? 'active' : ''}`}
          >
            {isAutoDecreasing ? '停止' : '自動-'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
