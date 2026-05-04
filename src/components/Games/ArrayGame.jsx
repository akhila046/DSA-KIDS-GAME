import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Game.css'

export default function ArrayGame({ onComplete }) {
  const [arr, setArr] = useState([10, 20, 30, 40, 50])
  const [inputVal, setInputVal] = useState('')
  const [inputIdx, setInputIdx] = useState('')
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [highlighted, setHighlighted] = useState(null)

  function setFb(msg, type) {
    setFeedback({ msg, type })
    setTimeout(() => setFeedback(null), 2500)
  }

  function insert() {
    const val = parseInt(inputVal)
    const idx = parseInt(inputIdx)
    if (isNaN(val)) return setFb('Enter a valid number!', 'error')
    if (arr.length >= 8) return setFb('Array is full (max 8)!', 'error')
    const pos = isNaN(idx) ? arr.length : Math.max(0, Math.min(idx, arr.length))
    const newArr = [...arr.slice(0, pos), val, ...arr.slice(pos)]
    setArr(newArr)
    setHighlighted(pos)
    setScore(s => s + 15)
    setFb(`✅ Inserted ${val} at index ${pos}`, 'success')
    setTimeout(() => setHighlighted(null), 1000)
  }

  function remove() {
    const idx = parseInt(inputIdx)
    if (isNaN(idx) || idx < 0 || idx >= arr.length) return setFb('Invalid index!', 'error')
    const val = arr[idx]
    setArr(a => a.filter((_, i) => i !== idx))
    setScore(s => s + 15)
    setFb(`✅ Removed ${val} from index ${idx}`, 'success')
  }

  function search() {
    const val = parseInt(inputVal)
    if (isNaN(val)) return setFb('Enter a value to search!', 'error')
    const idx = arr.indexOf(val)
    if (idx === -1) {
      setFb(`❌ ${val} not found in array`, 'error')
    } else {
      setHighlighted(idx)
      setScore(s => s + 10)
      setFb(`✅ Found ${val} at index ${idx}!`, 'success')
      setTimeout(() => setHighlighted(null), 1500)
    }
  }

  return (
    <div className="game-container">
      <div className="game-info card">
        <h3>📦 Array — The Storage Box Game</h3>
        <p>Arrays store elements in <strong>indexed positions</strong>. Access any element instantly using its index (starting from 0).</p>
        <div className="score-display">⭐ Score: {score}</div>
      </div>

      <div className="game-area">
        <div className="array-visual">
          <div className="array-label">Array (click index to highlight)</div>
          <div className="array-boxes">
            {arr.map((val, i) => (
              <motion.div
                key={i}
                className={`array-box ${highlighted === i ? 'highlighted' : ''}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => { setHighlighted(i); setInputIdx(String(i)) }}
              >
                <div className="array-val">{val}</div>
                <div className="array-idx">[{i}]</div>
              </motion.div>
            ))}
          </div>
          <div className="array-info">Length: {arr.length}</div>
        </div>

        <div className="controls-panel">
          <div className="input-row">
            <div className="form-group">
              <label>Value</label>
              <input type="number" placeholder="e.g. 42" value={inputVal} onChange={e => setInputVal(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Index (optional)</label>
              <input type="number" placeholder="e.g. 2" value={inputIdx} onChange={e => setInputIdx(e.target.value)} />
            </div>
          </div>

          <div className="control-btns">
            <button className="btn-primary game-btn" onClick={insert}>➕ Insert</button>
            <button className="btn-secondary game-btn" onClick={remove}>🗑️ Remove at Index</button>
            <button className="game-btn btn-outline-game" onClick={search}>🔍 Search Value</button>
          </div>

          <AnimatePresence>
            {feedback && (
              <motion.div className={`feedback ${feedback.type}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {feedback.msg}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="concept-box">
            <strong>💡 Key Concept:</strong>
            <ul>
              <li>Access by index: O(1)</li>
              <li>Search: O(n) linear scan</li>
              <li>Insert/Delete: O(n) — shifts elements</li>
              <li>Fixed size in most languages</li>
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
