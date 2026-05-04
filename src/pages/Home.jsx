import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Home.css'

const features = [
  { icon: '🎮', title: 'Learn by Playing', desc: 'Interactive games for every DSA concept' },
  { icon: '🏆', title: 'Earn Badges', desc: 'Collect rewards as you master topics' },
  { icon: '📊', title: 'Track Progress', desc: 'See how far you\'ve come on your journey' },
  { icon: '⚡', title: 'Daily Challenges', desc: 'New puzzles every day to keep you sharp' },
]

const topics = [
  { emoji: '📦', name: 'Arrays', color: '#6c63ff', path: 'array' },
  { emoji: '🔗', name: 'Linked Lists', color: '#ff6584', path: 'linkedlist' },
  { emoji: '🍽️', name: 'Stacks', color: '#43e97b', path: 'stack' },
  { emoji: '🎟️', name: 'Queues', color: '#f9c74f', path: 'queue' },
  { emoji: '🌳', name: 'Trees', color: '#4cc9f0', path: 'tree' },
  { emoji: '🕸️', name: 'Graphs', color: '#f72585', path: 'graph' },
]

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero-tag">🚀 Learn DSA the Fun Way</span>
          <h1>Master Data Structures<br /><span>Through Games!</span></h1>
          <p>Turn boring algorithms into exciting adventures. Play, learn, and level up your coding skills.</p>
          <div className="hero-btns">
            <Link to="/signup"><button className="btn-primary">Start Playing Free 🎮</button></Link>
            <Link to="/dashboard"><button className="btn-outline">Explore Levels</button></Link>
          </div>
        </motion.div>
        <motion.div
          className="hero-visual"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="floating-cards">
            {['📦', '🍽️', '🌳', '🔗'].map((e, i) => (
              <div key={i} className="float-card" style={{ animationDelay: `${i * 0.3}s` }}>{e}</div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Why Kids Love DSA Kids?</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="feature-card card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section className="topics">
        <h2>Pick Your Adventure</h2>
        <div className="topics-grid">
          {topics.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link to={`/game/${t.path}`} className="topic-card" style={{ '--color': t.color }}>
                <span className="topic-emoji">{t.emoji}</span>
                <span className="topic-name">{t.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <motion.div
          className="cta-box card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Ready to become a DSA Champion? 🏆</h2>
          <p>Join thousands of kids already learning through play.</p>
          <Link to="/signup"><button className="btn-primary">Create Free Account</button></Link>
        </motion.div>
      </section>
    </div>
  )
}
