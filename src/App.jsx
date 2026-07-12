import React, { useState } from 'react'
import Landing from './pages/Landing.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'

export default function App() {
  const [view, setView] = useState('landing')
  const [user, setUser] = useState(null)
  const [chosenPlan, setChosenPlan] = useState('standard')

  if (view === 'landing') {
    return (
      <Landing
        onStartSignup={(plan) => { setChosenPlan(plan); setView('signup') }}
      />
    )
  }
  if (view === 'signup') {
    return (
      <Signup
        initialPlan={chosenPlan}
        onClose={() => setView('landing')}
        onVerify={(u) => { setUser(u); setView('dashboard') }}
      />
    )
  }
  return (
    <Dashboard
      user={user}
      onExit={() => { setUser(null); setView('landing') }}
    />
  )
}
