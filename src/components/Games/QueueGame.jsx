import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Game.css'

const PEOPLE = ['👦', '👧', '🧑', '👩', '🧒', '👴', '👵']
const MAX = 6

export default function QueueGame({ onComplete }) {
  const [queue, setQueue] = useState([])
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [log, setLog] = useState([])
  const [personIdx, setPersonIdx] = useState(0)

  function addLog(msg, type = 'info') {
    setLog(l => [{ msg, type, id: Date.now() }, ...l.slice(0, 4)])
  }

  function enqueue() {
    if (queue.length >= MAX) {
      setFeedback({ msg: '🚫 Queue is full!', type: 'error' })
      return
    }
    const person = PEOPLE[personIdx % PEOPLE.length]
    setPersonIdx(i => i + 1)
    setQueue(q => [...q, person])
    setScore(s => s + 10)
    setFeedback({ msg: `✅ ${person} joined the queue!`, type: 'success' })
    addLog(`ENQUEUE ${person}`, 'push')
  }

  function dequeue() {
    if (queue.length === 0) {
      setFeedback({ msg: '🚫 Queue is empty!', type: 'error' })
      return
    }
    const front = queue[0]
    setQueue(q => q.slice(1))
    setScore(s => s + 10)
    setFeedback({ msg: `✅ ${front} got their ticket and left!`, type: 'success' })
    addLog(`DEQUEUE ${front}`, 'pop')
  }

  function front() {
    if (queue.length === 0) {
      setFeedback({ msg: '🚫 Queue is empty!', type: 'error' })
      return
    }
    setFeedback({ msg: `👀 Front of queue: ${queue[0]}`, type: 'info' })
    addLog(`FRONT → ${queue[0]}`, 'info')
  }

  return (
    <div className="game-container">
      <div className="game-info card">
        <h3>🎟️ Queue — Ticket Line Simulation</h3>
        <p>A Queue is like a ticket line. People join at the <strong>back</strong> and leave from the <strong>front</strong>. This is <strong>FIFO</strong> (First In, First Out).</p>
        <div className="score-display">⭐ Score: {score}</div>
      </div>

      <div className="game-area">
        {/* Queue visual */}
        <div className="queue-visual">
          <div className="queue-label">🎪 Ticket Counter</div>
          <div className="queue-track">
            <div className="queue-front-label">FRONT (served first)</div>
            <div className="queue-line">
              <AnimatePresence>
                {queue.map((person, i) => (
                  <motion.div
                    key={`${person}-${i}`}
                    className={`queue-person ${i === 0 ? 'front-person' : ''}`}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    {person}
                    {i === 0 && <div className="front-tag">FRONT</div>}
                    {i === queue.length - 1 && queue.length > 1 && <div className="back-tag">BACK</div>}
                  </motion.div>
                ))}
              </AnimatePresence>
              {queue.length === 0 && <div className="empty-queue">No one in line</div>}
            </div>
            <div className="queue-back-label">BACK (join here)</div>
          </div>
          <div className="queue-counter">{queue.length}/{MAX} people</div>
        </div>

        {/* Controls */}
        <div className="controls-panel">
          <div className="control-btns">
            <button className="btn-primary game-btn" onClick={enqueue}>
              ➕ Enqueue (Join Line)
            </button>
            <button className="btn-secondary game-btn" onClick={dequeue}>
              🎟️ Dequeue (Serve Front)
            </button>
            <button className="game-btn btn-outline-game" onClick={front}>
              👀 Front (View First)
            </button>
          </div>

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

          <div className="op-log">
            <div className="op-log-title">📋 Operation Log</div>
            {log.map(l => (
              <div key={l.id} className={`log-entry ${l.type}`}>{l.msg}</div>
            ))}
            {log.length === 0 && <div className="log-empty">No operations yet...</div>}
          </div>

          <div className="concept-box">
            <strong>💡 Key Concept:</strong>
            <ul>
              <li><code>enqueue()</code> — Add to back</li>
              <li><code>dequeue()</code> — Remove from front</li>
              <li><code>front()</code> — View front element</li>
              <li>Used in: CPU scheduling, print queues</li>
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
