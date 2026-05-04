import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './Game.css'

const NODES = [
  { id: 'A', x: 200, y: 60 },
  { id: 'B', x: 80,  y: 160 },
  { id: 'C', x: 320, y: 160 },
  { id: 'D', x: 40,  y: 280 },
  { id: 'E', x: 160, y: 280 },
  { id: 'F', x: 280, y: 280 },
]

const EDGES = [
  ['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F'], ['E', 'F']
]

function bfs(start, edges) {
  const adj = {}
  NODES.forEach(n => { adj[n.id] = [] })
  edges.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a) })

  const visited = []
  const queue = [start]
  const seen = new Set([start])

  while (queue.length) {
    const node = queue.shift()
    visited.push(node)
    for (const neighbor of adj[node]) {
      if (!seen.has(neighbor)) {
        seen.add(neighbor)
        queue.push(neighbor)
      }
    }
  }
  return visited
}

function dfs(start, edges) {
  const adj = {}
  NODES.forEach(n => { adj[n.id] = [] })
  edges.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a) })

  const visited = []
  const seen = new Set()

  function visit(node) {
    seen.add(node)
    visited.push(node)
    for (const neighbor of adj[node]) {
      if (!seen.has(neighbor)) visit(neighbor)
    }
  }
  visit(start)
  return visited
}

export default function GraphGame({ onComplete }) {
  const [visited, setVisited] = useState([])
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [startNode, setStartNode] = useState('A')

  function nodePos(id) {
    return NODES.find(n => n.id === id)
  }

  function runBFS() {
    const result = bfs(startNode, EDGES)
    setVisited(result)
    setScore(s => s + 20)
    setFeedback({ msg: `BFS from ${startNode}: ${result.join(' → ')}`, type: 'success' })
  }

  function runDFS() {
    const result = dfs(startNode, EDGES)
    setVisited(result)
    setScore(s => s + 20)
    setFeedback({ msg: `DFS from ${startNode}: ${result.join(' → ')}`, type: 'success' })
  }

  function reset() {
    setVisited([])
    setFeedback(null)
  }

  return (
    <div className="game-container">
      <div className="game-info card">
        <h3>🕸️ Graph — Network Explorer</h3>
        <p>Graphs are networks of <strong>nodes</strong> connected by <strong>edges</strong>. Use BFS or DFS to explore all connected nodes!</p>
        <div className="score-display">⭐ Score: {score}</div>
      </div>

      <div className="game-area">
        <div className="graph-visual">
          <svg width="100%" height="320" viewBox="0 0 400 320">
            {EDGES.map(([a, b], i) => {
              const pa = nodePos(a), pb = nodePos(b)
              return <line key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke="var(--border)" strokeWidth="2.5" />
            })}
            {NODES.map((node, i) => {
              const visitIdx = visited.indexOf(node.id)
              const isVisited = visitIdx !== -1
              const isStart = node.id === startNode
              return (
                <g key={node.id} onClick={() => setStartNode(node.id)} style={{ cursor: 'pointer' }}>
                  <motion.circle
                    cx={node.x} cy={node.y} r={26}
                    fill={isVisited ? '#43e97b' : isStart ? 'var(--secondary)' : 'var(--primary)'}
                    initial={{ scale: 1 }}
                    animate={{ scale: isVisited ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.3, delay: visitIdx * 0.15 }}
                  />
                  <text x={node.x} y={node.y + 5} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">
                    {node.id}
                  </text>
                  {isVisited && (
                    <text x={node.x} y={node.y - 32} textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">
                      #{visitIdx + 1}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Click a node to set as start. Pink = start, Green = visited.
          </p>
        </div>

        <div className="controls-panel">
          <div className="start-node-display">
            Start Node: <strong>{startNode}</strong>
          </div>

          <div className="control-btns">
            <button className="btn-primary game-btn" onClick={runBFS}>🌊 BFS Traversal</button>
            <button className="btn-secondary game-btn" onClick={runDFS}>🔍 DFS Traversal</button>
            <button className="game-btn btn-outline-game" onClick={reset}>🔄 Reset</button>
          </div>

          {feedback && (
            <motion.div className={`feedback ${feedback.type}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {feedback.msg}
            </motion.div>
          )}

          <div className="concept-box">
            <strong>💡 Key Concept:</strong>
            <ul>
              <li>BFS — explores level by level (uses Queue)</li>
              <li>DFS — goes deep first (uses Stack/Recursion)</li>
              <li>Both: O(V + E) time complexity</li>
              <li>Used in: maps, social networks, routing</li>
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
