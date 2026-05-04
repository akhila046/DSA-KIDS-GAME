import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch {
      setError('Invalid email or password. Please try again.')
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
          <span className="auth-emoji">🎮</span>
          <h2>Welcome Back!</h2>
          <p>Continue your DSA adventure</p>
        </div>

        {error && <div className="auth-error animate-shake">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? '⏳ Logging in...' : '🚀 Login'}
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </motion.div>
    </div>
  )
}
