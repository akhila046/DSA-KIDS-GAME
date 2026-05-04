import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quizData } from './quizData'
import './Quiz.css'

export default function Quiz({ topic, onComplete }) {
  const questions = quizData[topic] || []
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [timeLeft, setTimeLeft] = useState(20)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (answered || done) return
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer)
          handleAnswer(null)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [current, answered, done])

  function handleAnswer(optionIdx) {
    if (answered) return
    setSelected(optionIdx)
    setAnswered(true)
    if (optionIdx === questions[current].answer) {
      setScore(s => s + 20)
    }
  }

  function next() {
    if (current + 1 >= questions.length) {
      setDone(true)
      return
    }
    setCurrent(c => c + 1)
    setSelected(null)
    setAnswered(false)
    setTimeLeft(20)
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <p>No quiz available for this topic yet.</p>
          <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => onComplete(0)}>Continue →</button>
        </div>
      </div>
    )
  }

  if (done) {
    return (
      <motion.div className="quiz-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="quiz-done card">
          <span className="quiz-done-emoji">{score >= 60 ? '🌟' : '📚'}</span>
          <h3>{score >= 60 ? 'Great job!' : 'Keep practicing!'}</h3>
          <p>Quiz Score: <strong>{score} / {questions.length * 20}</strong></p>
          <button className="btn-primary" onClick={() => onComplete(score)}>
            🏆 Finish Level
          </button>
        </div>
      </motion.div>
    )
  }

  const q = questions[current]

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <span className="quiz-progress">Question {current + 1} / {questions.length}</span>
        <div className={`quiz-timer ${timeLeft <= 5 ? 'urgent' : ''}`}>
          ⏱️ {timeLeft}s
        </div>
        <span className="quiz-score">⭐ {score} pts</span>
      </div>

      <div className="timer-bar">
        <motion.div
          className="timer-fill"
          animate={{ width: `${(timeLeft / 20) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="question-card card"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
        >
          <h3 className="question-text">{q.question}</h3>

          <div className="options-grid">
            {q.options.map((opt, i) => {
              let cls = 'option-btn'
              if (answered) {
                if (i === q.answer) cls += ' correct'
                else if (i === selected) cls += ' wrong'
                else cls += ' dimmed'
              }
              return (
                <button
                  key={i}
                  className={cls}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                >
                  <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                  {opt}
                </button>
              )
            })}
          </div>

          {answered && (
            <motion.div
              className={`quiz-feedback ${selected === q.answer ? 'correct' : 'wrong'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {selected === q.answer ? '✅ Correct! +20 points' : `❌ Wrong! Answer: ${q.options[q.answer]}`}
              {q.explanation && <p className="explanation">{q.explanation}</p>}
            </motion.div>
          )}

          {answered && (
            <button className="btn-primary next-btn" onClick={next}>
              {current + 1 >= questions.length ? '🏆 Finish Quiz' : 'Next Question →'}
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
