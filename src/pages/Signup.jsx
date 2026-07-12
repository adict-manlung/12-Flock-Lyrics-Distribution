import React, { useState } from 'react'
import { Feather, X, Mail, Eye, EyeOff } from 'lucide-react'
import { T, FONTS, COUNTRIES, PLANS, inputStyle } from '../tokens.js'
import { FieldRow } from '../components/Shared.jsx'

export default function Signup({ onVerify, initialPlan, onClose }) {
  const [step, setStep] = useState('details')
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: COUNTRIES[0], claim: '' })
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const DEMO_CODE = '123456'

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const fieldStyle = (key) => ({
    ...inputStyle,
    border: fieldErrors[key] ? `1px solid ${T.rose}` : `1px solid ${T.line2}`,
  })

  const submitDetails = () => {
    const errs = {}
    ;['name', 'email', 'phone', 'country'].forEach((k) => {
      if (!form[k]?.trim()) errs[k] = true
    })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true
    if (Object.keys(errs).length) {
      setFieldErrors(errs)
      setError('Please fill in the highlighted fields correctly.')
      return
    }
    setFieldErrors({})
    setError('')
    setStep('otp')
  }

  const verify = () => {
    if (otp !== DEMO_CODE) {
      setError(`That code doesn't match. (Demo mode — use: ${DEMO_CODE})`)
      return
    }
    onVerify({ ...form, plan: initialPlan })
  }

  const planName = PLANS.find((p) => p.key === initialPlan)?.name || 'Free flight'

  return (
    <div style={{ background: T.ink, color: T.paper, minHeight: '100vh', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: 24 }}>
      <style>{FONTS}</style>
      <button
        onClick={onClose}
        aria-label="Close and return to home"
        style={{ position: 'absolute', top: 24, right: 28, background: 'transparent', border: `1px solid ${T.line2}`, borderRadius: 6, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.paperDim, cursor: 'pointer' }}
      ><X size={16} /></button>

      <div style={{ width: '100%', maxWidth: 460, background: T.ink2, border: `1px solid ${T.line}`, borderRadius: 12, padding: 36 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <Feather size={18} color={T.gold} />
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 17 }}>12Flock</span>
        </div>

        {step === 'details' && (
          <>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, margin: '0 0 6px' }}>Create your account</h2>
            <p style={{ fontSize: 12.5, color: T.paperDim, margin: '0 0 6px' }}>Enter your details, then confirm your email with a code.</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(224,165,38,0.14)', color: T.gold, fontSize: 12, padding: '4px 10px', borderRadius: 4, marginBottom: 22, fontFamily: "'JetBrains Mono', monospace" }}>
              Plan: {planName}
            </div>

            <FieldRow label="Artist / Full name">
              <input style={fieldStyle('name')} value={form.name} onChange={set('name')} placeholder="Your name or artist name" />
            </FieldRow>
            <FieldRow label="Email">
              <input style={fieldStyle('email')} type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />
            </FieldRow>
            <FieldRow label="Phone number">
              <input style={fieldStyle('phone')} value={form.phone} onChange={set('phone')} placeholder="+254 7XX XXX XXX" />
            </FieldRow>
            <FieldRow label="Country">
              <select style={fieldStyle('country')} value={form.country} onChange={set('country')}>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </FieldRow>
            <FieldRow label="Claim an existing artist name" hint="optional">
              <input style={inputStyle} value={form.claim} onChange={set('claim')} placeholder="Search if your music is already on a platform" />
            </FieldRow>

            {error && <div style={{ color: T.rose, fontSize: 12.5, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>{error}</div>}

            <button onClick={submitDetails} style={{ width: '100%', background: T.gold, color: T.ink, border: 'none', borderRadius: 6, padding: '13px 0', fontSize: 14.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: 10 }}>
              Continue
            </button>
            <button onClick={onClose} style={{ width: '100%', background: 'transparent', color: T.paperDim, border: 'none', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: '8px 0' }}>
              ← Back to home
            </button>
          </>
        )}

        {step === 'otp' && (
          <>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>Confirm your email</h2>
            <p style={{ fontSize: 13, color: T.paperDim, margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 7 }}>
              <Mail size={13} /> Code sent to <strong style={{ color: T.paper }}>{form.email}</strong>
            </p>

            {/* Demo banner */}
            <div style={{ background: T.ink, border: `1px dashed ${T.line2}`, borderRadius: 6, padding: '10px 14px', fontSize: 12, color: T.paperDim, marginBottom: 20, fontFamily: "'JetBrains Mono', monospace" }}>
              Demo mode — real email delivery needs a backend.<br />
              <span style={{ color: T.gold }}>Use code: {DEMO_CODE}</span>
            </div>

            <FieldRow label="6-digit verification code">
              <input
                style={{ ...inputStyle, letterSpacing: '0.2em', fontSize: 20, textAlign: 'center' }}
                value={otp}
                onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setError('') }}
                placeholder="· · · · · ·"
                maxLength={6}
                inputMode="numeric"
                autoFocus
              />
            </FieldRow>

            {error && <div style={{ color: T.rose, fontSize: 12.5, marginBottom: 14 }}>{error}</div>}

            <button onClick={verify} style={{ width: '100%', background: T.gold, color: T.ink, border: 'none', borderRadius: 6, padding: '13px 0', fontSize: 14.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: 10 }}>
              Verify &amp; enter dashboard
            </button>
            <button onClick={() => { setStep('details'); setError('') }} style={{ width: '100%', background: 'transparent', color: T.paperDim, border: 'none', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: '8px 0' }}>
              ← Back to details
            </button>
          </>
        )}
      </div>
    </div>
  )
}
