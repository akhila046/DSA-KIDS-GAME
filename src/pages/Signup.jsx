import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    setError('')
    setLoading(true)
    try {
      await signup(email, password, username)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to create account.')
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <motion.div
        className="auth-card card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="auth-header">
          <span className="auth-emoji">🌟</span>
          <h2>Join the Adventure!</h2>
          <p>Create your free account</p>
        </div>

        {error && <div className="auth-error animate-shake">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="CoolCoder123"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Min 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? '⏳ Creating...' : '🎮 Start Playing!'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  )
}
