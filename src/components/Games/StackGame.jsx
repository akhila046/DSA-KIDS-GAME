import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Game.css'

const PLATES = ['🔴', '🟠', '🟡', '🟢', '🔵']
const MAX = 5

export default function StackGame({ onComplete }) {
  const [stack, setStack] = useState([])
  const [input, setInput] = useState('')
  const [log, setLog] = useState([])
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  function addLog(msg, type = 'info') {
    setLog(l => [{ msg, type, id: Date.now() }, ...l.slice(0, 4)])
  }

  function push() {
    if (stack.length >= MAX) {
      setFeedback({ msg: '🚫 Stack is full! (Overflow)', type: 'error' })
      return
    }
    const plate = PLATES[stack.length % PLATES.length]
    setStack(s => [...s, plate])
    setScore(s => s + 10)
    setFeedback({ msg: `✅ Pushed ${plate} onto the stack!`, type: 'success' })
    addLog(`PUSH ${plate}`, 'push')
  }

  function pop() {
    if (stack.length === 0) {
      setFeedback({ msg: '🚫 Stack is empty! (Underflow)', type: 'error' })
      return
    }
    const top = stack[stack.length - 1]
    setStack(s => s.slice(0, -1))
    setScore(s => s + 10)
    setFeedback({ msg: `✅ Popped ${top} from the stack!`, type: 'success' })
    addLog(`POP ${top}`, 'pop')
  }

  function peek() {
    if (stack.length === 0) {
      setFeedback({ msg: '🚫 Stack is empty!', type: 'error' })
      return
    }
    setFeedback({ msg: `👀 Top element: ${stack[stack.length - 1]}`, type: 'info' })
    addLog(`PEEK → ${stack[stack.length - 1]}`, 'info')
  }

  return (
    <div className="game-container">
      <div className="game-info card">
        <h3>🍽️ Stack — Plate Stacking Game</h3>
        <p>A Stack works like a pile of plates. You can only add or remove from the <strong>top</strong>. This is called <strong>LIFO</strong> (Last In, First Out).</p>
        <div className="score-display">⭐ Score: {score}</div>
      </div>

      <div className="game-area">
        {/* Stack visual */}
        <div className="stack-visual">
          <div className="stack-label">Stack (top → bottom)</div>
          <div className="stack-tower">
            <AnimatePresence>
              {[...stack].reverse().map((plate, i) => (
                <motion.div
                  key={`${plate}-${stack.length - i}`}
                  className={`plate ${i === 0 ? 'top-plate' : ''}`}
                  initial={{ opacity: 0, y: -30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {plate} {i === 0 && <span className="top-tag">TOP</span>}
                </motion.div>
              ))}
            </AnimatePresence>
            {stack.length === 0 && <div className="empty-stack">Empty Stack</div>}
          </div>
          <div className="stack-base">📦 Base</div>
          <div className="stack-counter">{stack.length}/{MAX} plates</div>
        </div>

        {/* Controls */}
        <div className="controls-panel">
          <div className="control-btns">
            <button className="btn-primary game-btn" onClick={push}>
              ⬆️ Push (Add Plate)
            </button>
            <button className="btn-secondary game-btn" onClick={pop}>
              ⬇️ Pop (Remove Top)
            </button>
            <button className="game-btn btn-outline-game" onClick={peek}>
              👀 Peek (View Top)
            </button>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                className={`feedback ${feedback.type}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                key={feedback.msg}
              >
                {feedback.msg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Operation log */}
          <div className="op-log">
            <div className="op-log-title">📋 Operation Log</div>
            {log.map(l => (
              <div key={l.id} className={`log-entry ${l.type}`}>{l.msg}</div>
            ))}
            {log.length === 0 && <div className="log-empty">No operations yet...</div>}
          </div>

          {/* Concept box */}
          <div className="concept-box">
            <strong>💡 Key Concept:</strong>
            <ul>
              <li><code>push()</code> — Add to top</li>
              <li><code>pop()</code> — Remove from top</li>
              <li><code>peek()</code> — View top without removing</li>
              <li>Time complexity: O(1) for all operations</li>
            </ul>
          </div>

          <button
            className="btn-primary complete-btn"
            onClick={() => onComplete(score)}
            disabled={score < 30}
          >
            {score < 30 ? `Need ${30 - score} more points to continue` : '✅ Complete Level → Take Quiz'}
          </button>
        </div>
      </div>
    </div>
  )
}
