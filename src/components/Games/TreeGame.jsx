import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './Game.css'

// Simple BST visualization
const initialTree = {
  val: 50,
  left: { val: 30, left: { val: 20, left: null, right: null }, right: { val: 40, left: null, right: null } },
  right: { val: 70, left: { val: 60, left: null, right: null }, right: { val: 80, left: null, right: null } }
}

function TreeNode({ node, x, y, highlighted }) {
  if (!node) return null
  const isHighlighted = highlighted === node.val
  return (
    <g>
      {node.left && (
        <line x1={x} y1={y} x2={x - 60} y2={y + 70} stroke="var(--border)" strokeWidth="2" />
      )}
      {node.right && (
        <line x1={x} y1={y} x2={x + 60} y2={y + 70} stroke="var(--border)" strokeWidth="2" />
      )}
      <motion.circle
        cx={x} cy={y} r={24}
        fill={isHighlighted ? '#43e97b' : 'var(--primary)'}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring' }}
      />
      <text x={x} y={y + 5} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">
        {node.val}
      </text>
      <TreeNode node={node.left} x={x - 60} y={y + 70} highlighted={highlighted} />
      <TreeNode node={node.right} x={x + 60} y={y + 70} highlighted={highlighted} />
    </g>
  )
}

function insertBST(node, val) {
  if (!node) return { val, left: null, right: null }
  if (val < node.val) return { ...node, left: insertBST(node.left, val) }
  if (val > node.val) return { ...node, right: insertBST(node.right, val) }
  return node
}

function searchBST(node, val) {
  if (!node) return false
  if (node.val === val) return true
  if (val < node.val) return searchBST(node.left, val)
  return searchBST(node.right, val)
}

function inorder(node, result = []) {
  if (!node) return result
  inorder(node.left, result)
  result.push(node.val)
  inorder(node.right, result)
  return result
}

export default function TreeGame({ onComplete }) {
  const [tree, setTree] = useState(initialTree)
  const [inputVal, setInputVal] = useState('')
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [highlighted, setHighlighted] = useState(null)
  const [traversal, setTraversal] = useState([])

  function setFb(msg, type) {
    setFeedback({ msg, type })
    setTimeout(() => setFeedback(null), 2500)
  }

  function insert() {
    const val = parseInt(inputVal)
    if (isNaN(val)) return setFb('Enter a valid number!', 'error')
    setTree(t => insertBST(t, val))
    setHighlighted(val)
    setScore(s => s + 20)
    setFb(`✅ Inserted ${val} into BST!`, 'success')
    setTimeout(() => setHighlighted(null), 1500)
  }

  function search() {
    const val = parseInt(inputVal)
    if (isNaN(val)) return setFb('Enter a value to search!', 'error')
    const found = searchBST(tree, val)
    if (found) {
      setHighlighted(val)
      setScore(s => s + 15)
      setFb(`✅ Found ${val} in the tree!`, 'success')
      setTimeout(() => setHighlighted(null), 1500)
    } else {
      setFb(`❌ ${val} not found in tree`, 'error')
    }
  }

  function doInorder() {
    const result = inorder(tree)
    setTraversal(result)
    setScore(s => s + 10)
    setFb(`✅ Inorder traversal: ${result.join(' → ')}`, 'success')
  }

  return (
    <div className="game-container">
      <div className="game-info card">
        <h3>🌳 Binary Search Tree — Family Tree Game</h3>
        <p>In a BST, smaller values go <strong>left</strong> and larger values go <strong>right</strong>. This makes searching super fast!</p>
        <div className="score-display">⭐ Score: {score}</div>
      </div>

      <div className="game-area">
        <div className="tree-visual">
          <svg width="100%" height="280" viewBox="0 0 400 280">
            <TreeNode node={tree} x={200} y={40} highlighted={highlighted} />
          </svg>
          {traversal.length > 0 && (
            <div className="traversal-result">
              Inorder: {traversal.join(' → ')}
            </div>
          )}
        </div>

        <div className="controls-panel">
          <div className="form-group">
            <label>Value</label>
            <input type="number" placeholder="e.g. 45" value={inputVal} onChange={e => setInputVal(e.target.value)} />
          </div>

          <div className="control-btns">
            <button className="btn-primary game-btn" onClick={insert}>🌱 Insert Node</button>
            <button className="btn-secondary game-btn" onClick={search}>🔍 Search</button>
            <button className="game-btn btn-outline-game" onClick={doInorder}>📋 Inorder Traversal</button>
          </div>

          {feedback && (
            <motion.div className={`feedback ${feedback.type}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {feedback.msg}
            </motion.div>
          )}

          <div className="concept-box">
            <strong>💡 Key Concept:</strong>
            <ul>
              <li>Left child &lt; Parent &lt; Right child</li>
              <li>Search: O(log n) average</li>
              <li>Inorder traversal gives sorted order</li>
              <li>Used in: databases, file systems</li>
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
