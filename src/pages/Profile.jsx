import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import './Profile.css'

const allBadges = [
  { id: 'stack_master', emoji: '🍽️', name: 'Stack Master', desc: 'Completed Stack level' },
  { id: 'queue_pro', emoji: '🎟️', name: 'Queue Pro', desc: 'Completed Queue level' },
  { id: 'array_ace', emoji: '📦', name: 'Array Ace', desc: 'Completed Array level' },
  { id: 'tree_climber', emoji: '🌳', name: 'Tree Climber', desc: 'Completed Tree level' },
  { id: 'list_linker', emoji: '🔗', name: 'List Linker', desc: 'Completed Linked List level' },
  { id: 'graph_guru', emoji: '🕸️', name: 'Graph Guru', desc: 'Completed Graph level' },
  { id: 'dsa_champion', emoji: '🏆', name: 'DSA Champion', desc: 'Completed all levels' },
]

const levelNames = {
  stack: '🍽️ Stack', queue: '🎟️ Queue', array: '📦 Array',
  tree: '🌳 Tree', linkedlist: '🔗 Linked List', graph: '🕸️ Graph'
}

export default function Profile() {
  const { currentUser, userData } = useAuth()
  const completed = userData?.completedLevels || []
  const badges = userData?.badges || []
  const points = userData?.points || 0

  const level = points < 200 ? 'Beginner' : points < 500 ? 'Intermediate' : 'Advanced'
  const levelColor = { Beginner: '#43e97b', Intermediate: '#f9c74f', Advanced: '#f72585' }

  return (
    <div className="profile-page">
      {/* Profile card */}
      <motion.div className="profile-card card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="profile-avatar">
          {currentUser?.displayName?.[0]?.toUpperCase() || '?'}
        </div>
        <div className="profile-info">
          <h2>{currentUser?.displayName || 'Player'}</h2>
          <p>{currentUser?.email}</p>
          <span className="level-tag" style={{ background: levelColor[level] }}>
            {level}
          </span>
        </div>
        <div className="profile-stats">
          <div className="pstat">
            <span className="pstat-num">⭐ {points}</span>
            <span className="pstat-label">Total Points</span>
          </div>
          <div className="pstat">
            <span className="pstat-num">✅ {completed.length}/6</span>
            <span className="pstat-label">Levels Done</span>
          </div>
          <div className="pstat">
            <span className="pstat-num">🏅 {badges.length}</span>
            <span className="pstat-label">Badges</span>
          </div>
        </div>
      </motion.div>

      {/* Completed levels */}
      <div className="profile-section card">
        <h3>📚 Completed Levels</h3>
        {completed.length === 0 ? (
          <p className="empty-msg">No levels completed yet. Start playing!</p>
        ) : (
          <div className="completed-list">
            {completed.map(id => (
              <div key={id} className="completed-item">
                <span>{levelNames[id] || id}</span>
                <span className="done-check">✅</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="profile-section card">
        <h3>🏅 Badges</h3>
        <div className="badges-grid">
          {allBadges.map(badge => {
            const earned = badges.includes(badge.id) || completed.includes(badge.id.replace('_master','').replace('_pro','').replace('_ace','').replace('_climber','').replace('_linker','').replace('_guru',''))
            return (
              <motion.div
                key={badge.id}
                className={`badge-card ${earned ? 'earned' : 'locked'}`}
                whileHover={{ scale: 1.05 }}
              >
                <span className="badge-emoji">{earned ? badge.emoji : '🔒'}</span>
                <span className="badge-name">{badge.name}</span>
                <span className="badge-desc">{badge.desc}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
