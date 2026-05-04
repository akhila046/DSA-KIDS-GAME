import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import StackGame from '../components/Games/StackGame'
import QueueGame from '../components/Games/QueueGame'
import ArrayGame from '../components/Games/ArrayGame'
import TreeGame from '../components/Games/TreeGame'
import LinkedListGame from '../components/Games/LinkedListGame'
import GraphGame from '../components/Games/GraphGame'
import Quiz from '../components/Quiz/Quiz'
import Confetti from 'react-confetti'
import './GameLevel.css'

const gameMap = {
  stack: { component: StackGame, name: 'Stack', emoji: '🍽️', xp: 120 },
  queue: { component: QueueGame, name: 'Queue', emoji: '🎟️', xp: 150 },
  array: { component: ArrayGame, name: 'Array', emoji: '📦', xp: 100 },
  tree: { component: TreeGame, name: 'Tree', emoji: '🌳', xp: 200 },
  linkedlist: { component: LinkedListGame, name: 'Linked List', emoji: '🔗', xp: 150 },
  graph: { component: GraphGame, name: 'Graph', emoji: '🕸️', xp: 250 },
}

export default function GameLevel() {
  const { topic } = useParams()
  const navigate = useNavigate()
  const { currentUser, updateProgress } = useAuth()
  const [phase, setPhase] = useState('game') // game | quiz | complete
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const config = gameMap[topic]
  if (!config) return <div className="not-found">Topic not found 😕</div>

  const GameComponent = config.component

  async function handleGameComplete(gameScore) {
    setScore(gameScore)
    setPhase('quiz')
  }

  async function handleQuizComplete(quizScore) {
    const total = score + quizScore
    setScore(total)
    setShowConfetti(true)
    setPhase('complete')

    if (currentUser) {
      try {
        await updateProgress(topic, total)
      } catch (e) {
        console.error('Error saving progress:', e)
      }
    }
  }

  return (
    <div className="game-level">
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}

      {/* Header */}
      <div className="game-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
        <div className="game-title">
          <span>{config.emoji}</span>
          <h2>{config.name}</h2>
        </div>
        <div className="phase-indicator">
          <span className={phase === 'game' ? 'active' : ''}>🎮 Game</span>
          <span className="divider">→</span>
          <span className={phase === 'quiz' ? 'active' : ''}>📝 Quiz</span>
          <span className="divider">→</span>
          <span className={phase === 'complete' ? 'active' : ''}>🏆 Done</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'game' && (
          <motion.div key="game" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <GameComponent onComplete={handleGameComplete} />
          </motion.div>
        )}

        {phase === 'quiz' && (
          <motion.div key="quiz" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <Quiz topic={topic} onComplete={handleQuizComplete} />
          </motion.div>
        )}

        {phase === 'complete' && (
          <motion.div
            key="complete"
            className="complete-screen"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="complete-card card">
              <span className="complete-emoji">🏆</span>
              <h2>Level Complete!</h2>
              <p>You earned <strong>{score} points</strong> on {config.name}!</p>
              <div className="complete-badges">
                <span className="badge badge-purple">+{config.xp} XP</span>
                <span className="badge badge-yellow">🌟 Star Learner</span>
              </div>
              <div className="complete-btns">
                <button className="btn-primary" onClick={() => navigate('/dashboard')}>🗺️ More Levels</button>
                <button className="btn-secondary" onClick={() => navigate('/leaderboard')}>🏆 Leaderboard</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
