import React, { createContext, useContext, useEffect, useState } from 'react'
import { isFirebaseConfigured, auth, db } from '../firebase/config'

// ── Local (no-Firebase) helpers ───────────────────────────────────────────────
const LOCAL_USER_KEY = 'dsa_user'
const LOCAL_DATA_KEY = 'dsa_userdata'

const loadLocalUser = () => { try { return JSON.parse(localStorage.getItem(LOCAL_USER_KEY)) } catch { return null } }
const loadLocalData = () => { try { return JSON.parse(localStorage.getItem(LOCAL_DATA_KEY)) } catch { return null } }
const saveLocalUser = u => localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(u))
const saveLocalData = d => localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(d))

const defaultData = () => ({ points: 0, badges: [], completedLevels: [], createdAt: new Date().toISOString() })

// ── Context ───────────────────────────────────────────────────────────────────
const AuthContext = createContext()
export function useAuth() { return useContext(AuthContext) }

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  async function signup(email, password, username) {
    if (isFirebaseConfigured) {
      const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth')
      const { doc, setDoc } = await import('firebase/firestore')
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, { displayName: username })
      const data = { username, email, ...defaultData() }
      await setDoc(doc(db, 'users', result.user.uid), data)
      setUserData(data)
      return result
    }
    const user = { uid: `local_${Date.now()}`, displayName: username, email }
    const data = { username, email, ...defaultData() }
    saveLocalUser(user); saveLocalData(data)
    setCurrentUser(user); setUserData(data)
    return { user }
  }

  async function login(email, password) {
    if (isFirebaseConfigured) {
      const { signInWithEmailAndPassword } = await import('firebase/auth')
      return signInWithEmailAndPassword(auth, email, password)
    }
    const saved = loadLocalUser()
    if (saved && saved.email === email) {
      setCurrentUser(saved); setUserData(loadLocalData())
      return { user: saved }
    }
    throw new Error('No local account found. Please sign up first.')
  }

  async function logout() {
    if (isFirebaseConfigured) {
      const { signOut } = await import('firebase/auth')
      return signOut(auth)
    }
    setCurrentUser(null); setUserData(null)
  }

  async function fetchUserData(uid) {
    if (isFirebaseConfigured) {
      const { doc, getDoc } = await import('firebase/firestore')
      const snap = await getDoc(doc(db, 'users', uid))
      if (snap.exists()) setUserData(snap.data())
    } else {
      setUserData(loadLocalData())
    }
  }

  async function updateProgress(topic, points) {
    if (isFirebaseConfigured && auth?.currentUser) {
      const { doc, updateDoc, increment, arrayUnion } = await import('firebase/firestore')
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        points: increment(points),
        completedLevels: arrayUnion(topic),
      })
      await fetchUserData(auth.currentUser.uid)
    } else {
      const data = loadLocalData() || defaultData()
      data.points = (data.points || 0) + points
      if (!data.completedLevels.includes(topic)) data.completedLevels.push(topic)
      saveLocalData(data)
      setUserData({ ...data })
    }
  }

  useEffect(() => {
    if (isFirebaseConfigured) {
      let unsub
      import('firebase/auth').then(({ onAuthStateChanged }) => {
        unsub = onAuthStateChanged(auth, async (user) => {
          setCurrentUser(user)
          if (user) await fetchUserData(user.uid)
          setLoading(false)
        })
      })
      return () => unsub?.()
    } else {
      const saved = loadLocalUser()
      if (saved) { setCurrentUser(saved); setUserData(loadLocalData()) }
      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, userData, signup, login, logout, fetchUserData, updateProgress }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
