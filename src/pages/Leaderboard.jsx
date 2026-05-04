import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { isFirebaseConfigured, db } from '../firebase/config'
import { useAuth } from '../context/AuthContext'
import './Leaderboard.css'

const medals = ['🥇', '🥈', '🥉']

export default function Leaderboard() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()

  useEffect(() => {
    async function fetchLeaderboard() {
      if (!isFirebaseConfigured) {
        // Show only local user in offline mode
        try {
          const u = JSON.parse(localStorage.getItem('dsa_user'))
          const d = JSON.parse(localStorage.getItem('dsa_userdata'))
          if (u && d) setPlayers([{ id: u.uid, username: u.displayName, ...d }])
        } catch {}
        setLoading(false)
        return
      }
      try {
        const { collection, getDocs, orderBy, query, limit } = await import('firebase/firestore')
        const q = query(collection(db, 'users'), orderBy('points', 'desc'), limit(20))
        const snap = await getDocs(q)
        setPlayers(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      } catch (e) {
        console.error(e)
      }
      setLoading(false)
    }
    fetchLeaderboard()
  }, [])

  return (
    <div className="leaderboard-page">
      <div className="lb-header">
        <h1>🏆 Leaderboard</h1>
        <p>Top DSA Champions worldwide</p>
      </div>

      {/* Top 3 podium */}
      {players.length >= 3 && (
        <div className="podium">
          {[players[1], players[0], players[2]].map((p, i) => {
            const rank = i === 1 ? 1 : i === 0 ? 2 : 3
            return (
              <motion.div
                key={p.id}
                className={`podium-place rank-${rank}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="podium-avatar">{p.username?.[0]?.toUpperCase() || '?'}</div>
                <div className="podium-name">{p.username || 'Player'}</div>
                <div className="podium-pts">⭐ {p.points}</div>
                <div className="podium-block">
                  <span className="podium-medal">{medals[rank - 1]}</span>
                  <span>#{rank}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Full list */}
      <div className="lb-list card">
        {loading ? (
          <div className="lb-loading">Loading rankings... ⏳</div>
        ) : players.length === 0 ? (
          <div className="lb-empty">No players yet. Be the first! 🚀</div>
        ) : (
          players.map((p, i) => (
            <motion.div
              key={p.id}
              className={`lb-row ${p.id === currentUser?.uid ? 'my-row' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="lb-rank">
                {i < 3 ? medals[i] : `#${i + 1}`}
              </span>
              <div className="lb-avatar">{p.username?.[0]?.toUpperCase() || '?'}</div>
              <div className="lb-info">
                <span className="lb-name">
                  {p.username || 'Player'}
                  {p.id === currentUser?.uid && <span className="you-tag">You</span>}
                </span>
                <span className="lb-levels">✅ {p.completedLevels?.length || 0} levels</span>
              </div>
              <div className="lb-points">
                <span className="lb-pts-num">⭐ {p.points || 0}</span>
                <span className="lb-pts-label">points</span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
