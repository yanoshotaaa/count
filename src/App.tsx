import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const increment = () => setCount((prev) => prev + 1)
  const decrement = () => setCount((prev) => prev - 1)
  const reset = () => setCount(0)

  return (
    <div className="container">
      <h1 className="title">Counter Application</h1>
      <div className="count-display">{count}</div>
      <div className="controls">
        <button onClick={decrement} className="btn-decrement" aria-label="Decrement">
          -1
        </button>
        <button onClick={increment} className="btn-increment" aria-label="Increment">
          +1
        </button>
      </div>
      <button onClick={reset} className="btn-reset" aria-label="Reset">
        Reset to 0
      </button>
    </div>
  )
}

export default App
