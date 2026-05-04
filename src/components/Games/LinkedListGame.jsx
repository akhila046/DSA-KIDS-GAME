import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Game.css'

export default function LinkedListGame({ onComplete }) {
  const [list, setList] = useState([10, 20, 30])
  const [inputVal, setInputVal] = useState('')
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  function setFb(msg, type) {
    setFeedback({ msg, type })
    setTimeout(() => setFeedback(null), 2500)
  }

  function addHead() {
    const val = parseInt(inputVal)
    if (isNaN(val)) return setFb('Enter a valid number!', 'error')
    setList(l => [val, ...l])
    setScore(s => s + 15)
    setFb(`✅ Added ${val} at head!`, 'success')
  }

  function addTail() {
    const val = parseInt(inputVal)
    if (isNaN(val)) return setFb('Enter a valid number!', 'error')
    setList(l => [...l, val])
    setScore(s => s + 15)
    setFb(`✅ Added ${val} at tail!`, 'success')
  }

  function removeHead() {
    if (list.length === 0) return setFb('List is empty!', 'error')
    const val = list[0]
    setList(l => l.slice(1))
    setScore(s => s + 10)
    setFb(`✅ Removed head: ${val}`, 'success')
  }

  function removeTail() {
    if (list.length === 0) return setFb('List is empty!', 'error')
    const val = list[list.length - 1]
    setList(l => l.slice(0, -1))
    setScore(s => s + 10)
    setFb(`✅ Removed tail: ${val}`, 'success')
  }

  return (
    <div className="game-container">
      <div className="game-info card">
        <h3>🔗 Linked List — Chain of Nodes</h3>
        <p>A Linked List is a chain of <strong>nodes</strong>. Each node holds a value and a pointer to the <strong>next node</strong>. No random access — you traverse from head!</p>
        <div className="score-display">⭐ Score: {score}</div>
      </div>

      <div className="game-area">
        <div className="ll-visual">
          <div className="ll-label">Linked List</div>
          <div className="ll-chain">
            <div className="ll-null">NULL</div>
            <div className="ll-arrow">←</div>
            <AnimatePresence>
              {[...list].reverse().map((val, i) => (
                <motion.div
                  key={`${val}-${i}`}
                  className="ll-node"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: 'spring' }}
                >
                  <div className="node-val">{val}</div>
                  <div className="node-ptr">→</div>
                  {i < list.length - 1 && <div className="ll-arrow-between">←</div>}
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="ll-head-label">HEAD</div>
          </div>
          {/* Forward view */}
          <div className="ll-forward">
            {list.map((val, i) => (
              <React.Fragment key={i}>
                <div className={`ll-node-fwd ${i === 0 ? 'head-node' : ''} ${i === list.length - 1 ? 'tail-node' : ''}`}>
                  <div className="node-val">{val}</div>
                  <div className="node-label">{i === 0 ? 'HEAD' : i === list.length - 1 ? 'TAIL' : `[${i}]`}</div>
                </div>
                {i < list.length - 1 && <div className="ll-fwd-arrow">→</div>}
              </React.Fragment>
            ))}
            {list.length > 0 && <><div className="ll-fwd-arrow">→</div><div className="ll-null-fwd">NULL</div></>}
          </div>
        </div>

        <div className="controls-panel">
          <div className="form-group">
            <label>Value</label>
            <input type="number" placeholder="e.g. 99" value={inputVal} onChange={e => setInputVal(e.target.value)} />
          </div>

          <div className="control-btns">
            <button className="btn-primary game-btn" onClick={addHead}>⬅️ Add at Head</button>
            <button className="btn-primary game-btn" onClick={addTail}>➡️ Add at Tail</button>
            <button className="btn-secondary game-btn" onClick={removeHead}>🗑️ Remove Head</button>
            <button className="btn-secondary game-btn" onClick={removeTail}>🗑️ Remove Tail</button>
          </div>

          {feedback && (
            <motion.div className={`feedback ${feedback.type}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {feedback.msg}
            </motion.div>
          )}

          <div className="concept-box">
            <strong>💡 Key Concept:</strong>
            <ul>
              <li>Head insertion/deletion: O(1)</li>
              <li>Tail insertion/deletion: O(n) or O(1) with tail pointer</li>
              <li>Search: O(n) — must traverse</li>
              <li>Dynamic size, no wasted memory</li>
            </ul>
          </div>

          <button className="btn-primary complete-btn" onClick={() => onComplete(score)} disabled={score < 30}>
            {score < 30 ? `Need ${30 - score} more points` : '✅ Complete Level → Take Quiz'}
          </button>
        </div>
      </div>
    </div>
  )
}
