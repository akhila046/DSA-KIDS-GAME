import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

const levels = [
  {
    id: 'array',
    emoji: '📦',
    name: 'Arrays',
    desc: 'Store and access items in order',
    color: '#6c63ff',
    difficulty: 'Beginner',
    xp: 100,
  },
  {
    id: 'linkedlist',
    emoji: '🔗',
    name: 'Linked Lists',
    desc: 'Chain nodes together like a treasure hunt',
    color: '#ff6584',
    difficulty: 'Beginner',
    xp: 150,
  },
  {
    id: 'stack',
    emoji: '🍽️',
    name: 'Stacks',
    desc: 'Stack plates — Last In, First Out!',
    color: '#43e97b',
    difficulty: 'Beginner',
    xp: 120,
  },
  {
    id: 'queue',
    emoji: '🎟️',
    name: 'Queues',
    desc: 'Join the line — First In, First Out!',
    color: '#f9c74f',
    difficulty: 'Intermediate',
    xp: 150,
  },
  {
    id: 'tree',
    emoji: '🌳',
    name: 'Trees',
    desc: 'Explore family trees and hierarchies',
    color: '#4cc9f0',
    difficulty: 'Intermediate',
    xp: 200,
  },
  {
    id: 'graph',
    emoji: '🕸️',
    name: 'Graphs',
    desc: 'Navigate networks and connections',
    color: '#f72585',
    difficulty: 'Advanced',
    xp: 250,
  },
]

const difficultyColor = { Beginner: 'badge-green', Intermediate: 'badge-yellow', Advanced: 'badge-purple' }

export default function Dashboard() {
  const { currentUser, userData } = useAuth()
  const completed = userData?.completedLevels || []

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dash-header">
        <div>
          <h1>Hey, {currentUser?.displayName || 'Explorer'} 👋</h1>
          <p>Pick a topic and start your adventure!</p>
        </div>
        <div className="dash-stats">
          <div className="stat-box">
            <span className="stat-num">⭐ {userData?.points || 0}</span>
            <span className="stat-label">Points</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">🏅 {userData?.badges?.length || 0}</span>
            <span className="stat-label">Badges</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">✅ {completed.length}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-section card">
        <div className="progress-label">
          <span>Overall Progress</span>
          <span>{completed.length}/{levels.length} levels</span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${(completed.length / levels.length) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* Level cards */}
      <div className="levels-grid">
        {levels.map((level, i) => {
          const done = completed.includes(level.id)
          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
            >
              <Link to={`/game/${level.id}`} className={`level-card card ${done ? 'done' : ''}`} style={{ '--color': level.color }}>
                <div className="level-top">
                  <span className="level-emoji">{level.emoji}</span>
                  {done && <span className="done-badge">✅ Done</span>}
                </div>
                <h3>{level.name}</h3>
                <p>{level.desc}</p>
                <div className="level-footer">
                  <span className={`badge ${difficultyColor[level.difficulty]}`}>{level.difficulty}</span>
                  <span className="xp-badge">+{level.xp} XP</span>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
