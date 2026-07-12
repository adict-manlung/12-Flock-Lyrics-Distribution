import React, { useState } from 'react'
import {
  Feather, ArrowRight, Check, Globe2, Sparkles, Search,
  Upload, FileText, TrendingUp, Shield, DollarSign, Music,
  ChevronDown, Users, Star,
} from 'lucide-react'
import { T, FONTS, PLATFORMS, PLANS } from '../tokens.js'
import { PricingCards, FAQ } from '../components/Shared.jsx'

function StatsStrip() {
  const stats = [
    { icon: Users,       value: '12,400+', label: 'Artists on 12Flock' },
    { icon: Music,       value: '94,000+', label: 'Releases distributed' },
    { icon: Globe2,      value: '8',        label: 'Platforms supported' },
    { icon: DollarSign,  value: '$2.1M+',  label: 'Royalties paid out' },
  ]
  return (
    <div style={{ borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, padding: '40px 48px' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <Icon size={20} color={T.gold} style={{ marginBottom: 10 }} />
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12.5, color: T.paperDim }}>{s.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function FeaturesSection() {
  const features = [
    { icon: Upload,      title: 'One upload, everywhere',     desc: 'Submit once and we send your lyrics and audio to all 8 platforms simultaneously — no separate logins, no format juggling.' },
    { icon: FileText,    title: 'Lyrics-first distribution',  desc: 'Unlike other distributors, 12Flock specialises in lyric delivery — synced lyrics, LRC files, and timed captions handled automatically.' },
    { icon: TrendingUp,  title: 'Real-time analytics',        desc: 'Stream counts, platform breakdowns, and audience geography updated daily. Know which platforms are moving your music.' },
    { icon: Search,      title: 'Catalog claiming',            desc: "If your music is already out under a different profile, we help you reclaim it and start routing royalties directly to you." },
    { icon: Shield,      title: 'Rights protection',           desc: 'We register your lyrics and metadata with content ID systems so you can dispute any unlicensed use across platforms.' },
    { icon: DollarSign,  title: 'Transparent royalties',      desc: 'Monthly payouts via M-Pesa, PayPal, or bank transfer. No hidden fees, no minimum thresholds over $5.' },
  ]
  return (
    <section id="features-section" style={{ padding: '80px 48px', maxWidth: 1160, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: T.moss, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>What makes 12Flock different</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 700, margin: '0 auto', maxWidth: 520, lineHeight: 1.15 }}>Built for lyrics.<br />Ready for music.</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {features.map((f) => {
          const Icon = f.icon
          return (
            <div key={f.title} style={{ background: T.ink2, border: `1px solid ${T.line}`, borderRadius: 10, padding: '24px 22px' }}>
              <div style={{ background: 'rgba(92,138,98,0.16)', borderRadius: 8, padding: 10, display: 'inline-flex', marginBottom: 14 }}>
                <Icon size={18} color={T.moss} />
              </div>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: T.paperDim, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function Testimonials() {
  const items = [
    { name: 'Amara O.', location: 'Lagos', quote: 'I uploaded my debut EP on Monday. By Wednesday it was on Spotify with synced lyrics. I've tried three other distributors and none came close.', plan: 'Standard' },
    { name: 'Kevin M.', location: 'Nairobi', quote: 'The catalog claim feature recovered two old tracks I'd lost access to. The royalties had been sitting unattributed for over a year.', plan: 'Flock Unlimited' },
    { name: 'Stella N.', location: 'Accra', quote: 'As a poet distributing spoken word, the lyrics-first approach finally made sense for what I do. Other platforms treat lyrics as an afterthought.', plan: 'Standard' },
  ]
  return (
    <section style={{ background: T.ink2, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, padding: '72px 48px' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: T.gold, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 32 }}>From the flock</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 20 }}>
          {items.map((t) => (
            <div key={t.name} style={{ background: T.ink, border: `1px solid ${T.line}`, borderRadius: 10, padding: '24px 22px' }}>
              <div style={{ fontSize: 28, color: T.gold, fontFamily: "'Fraunces', serif", marginBottom: 12, lineHeight: 1 }}>"</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.75, color: T.paperMid, margin: '0 0 20px' }}>{t.quote}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: T.paperDim }}>{t.location} · {t.plan}</div>
                </div>
                <Star size={14} color={T.gold} fill={T.gold} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Landing({ onStartSignup }) {
  const [selectedPlan, setSelectedPlan] = useState('standard')
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const navLinks = [
    { label: 'Platforms', id: 'platforms-section' },
    { label: 'Features',  id: 'features-section' },
    { label: 'Pricing',   id: 'pricing-section' },
    { label: 'Claim',     id: 'claim-section' },
  ]

  return (
    <div style={{ background: T.ink, color: T.paper, minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <style>{FONTS}</style>

      {/* ── Nav ── */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 48px', borderBottom: `1px solid ${T.line}`,
        position: 'sticky', top: 0, background: 'rgba(24,21,17,0.95)',
        backdropFilter: 'blur(12px)', zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Feather size={20} color={T.gold} />
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 20, letterSpacing: '-0.01em' }}>12Flock</span>
        </div>
        <div style={{ display: 'flex', gap: 28, fontSize: 13.5, color: T.paperDim }}>
          {navLinks.map((l) => (
            <span
              key={l.id}
              onClick={() => scrollTo(l.id)}
              style={{ cursor: 'pointer', transition: 'color 0.15s' }}
              onMouseEnter={e => e.target.style.color = T.paper}
              onMouseLeave={e => e.target.style.color = T.paperDim}
            >{l.label}</span>
          ))}
        </div>
        <button
          onClick={() => onStartSignup(selectedPlan)}
          style={{ background: T.gold, color: T.ink, border: 'none', borderRadius: 6, padding: '10px 20px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
        >Get started free</button>
      </nav>

      {/* ── Hero ── */}
      <header style={{ padding: '100px 48px 80px', maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 72, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: T.moss, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 24, background: 'rgba(92,138,98,0.16)', padding: '5px 14px', borderRadius: 20 }}>
              <Sparkles size={13} /> Your first release is free
            </div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 58, lineHeight: 1.04, margin: '0 0 28px', letterSpacing: '-0.02em' }}>
              Send your words<br />
              <em style={{ color: T.gold, fontStyle: 'italic' }}>out with the flock.</em>
            </h1>
            <p style={{ fontSize: 17, color: T.paperDim, lineHeight: 1.7, maxWidth: 480, margin: '0 0 36px' }}>
              Distribute your lyrics and tracks to Spotify, Apple Music, TikTok, WhatsApp,
              and Instagram from one upload — lyrics-first, artist-owned, with royalties that actually reach you.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => onStartSignup(selectedPlan)}
                style={{ background: T.gold, color: T.ink, border: 'none', borderRadius: 6, padding: '14px 26px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >Create your account <ArrowRight size={17} /></button>
              <button
                onClick={() => scrollTo('features-section')}
                style={{ background: 'transparent', color: T.paperDim, border: `1px solid ${T.line2}`, borderRadius: 6, padding: '14px 22px', fontSize: 14, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
              >See how it works</button>
            </div>
            <div style={{ marginTop: 22, display: 'flex', gap: 20, fontSize: 12.5, color: T.paperDim, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Check size={12} color={T.moss} />No credit card for free tier</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Check size={12} color={T.moss} />Cancel anytime</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Check size={12} color={T.moss} />Keep your masters</span>
            </div>
          </div>

          {/* Platform grid */}
          <div id="platforms-section" style={{ background: T.ink2, border: `1px solid ${T.line}`, borderRadius: 12, padding: 22 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.paperDim, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Where your words land</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {PLATFORMS.map((p) => (
                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 13px', background: T.ink, borderRadius: 7, border: `1px solid ${T.line}` }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: p.color, flexShrink: 0, boxShadow: `0 0 6px ${p.color}55` }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                    <div style={{ fontSize: 10.5, color: T.paperDim }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: '12px 14px', background: T.ink, borderRadius: 7, border: `1px solid ${T.line}`, fontSize: 12.5, color: T.paperDim, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Globe2 size={13} color={T.moss} />
              <span>More platforms added regularly — Amazon Music &amp; Deezer included</span>
            </div>
          </div>
        </div>
      </header>

      <StatsStrip />
      <FeaturesSection />
      <Testimonials />

      {/* ── Pricing ── */}
      <section id="pricing-section" style={{ padding: '80px 48px', borderTop: `1px solid ${T.line}`, maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: T.paperDim, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Pricing</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 700, marginBottom: 10 }}>Simple, honest pricing</h2>
        <p style={{ fontSize: 13.5, color: T.paperDim, marginBottom: 36, maxWidth: 540, lineHeight: 1.65 }}>
          Billed once a year — no monthly charges to track. The per-month price is just for comparison.
          Pick a plan, create your account, and switch any time.
        </p>
        <PricingCards selectable selectedKey={selectedPlan} onSelect={setSelectedPlan} />
        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <button
            onClick={() => onStartSignup(selectedPlan)}
            style={{ background: T.gold, color: T.ink, border: 'none', borderRadius: 6, padding: '13px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            Continue with {PLANS.find((p) => p.key === selectedPlan)?.name} <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Claim banner ── */}
      <section id="claim-section" style={{ padding: '0 48px 80px', maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ background: T.ink2, border: `1px solid ${T.line}`, borderRadius: 12, padding: '40px 44px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: T.paperDim, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Already out there?</div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, margin: '0 0 12px' }}>Claim music that's already live</h3>
            <p style={{ fontSize: 14, color: T.paperDim, lineHeight: 1.65, margin: 0, maxWidth: 520 }}>
              Create your account, then search your name under Claim catalog.
              Royalties start flowing to your profile once verified — even for releases you didn't upload yourself.
            </p>
          </div>
          <button
            onClick={() => onStartSignup(selectedPlan)}
            style={{ whiteSpace: 'nowrap', background: 'transparent', color: T.gold, border: `1px solid ${T.gold}`, borderRadius: 6, padding: '13px 22px', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif' }}
          ><Search size={15} />Create account to claim</button>
        </div>
      </section>

      <FAQ />

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${T.line}`, padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: T.paperDim, fontSize: 12.5, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Feather size={14} color={T.gold} />
          <span>12Flock — lyric &amp; music distribution</span>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <span style={{ cursor: 'pointer' }}>Terms</span>
          <span style={{ cursor: 'pointer' }}>Privacy</span>
          <span style={{ cursor: 'pointer' }}>Copyright complaints</span>
          <span style={{ cursor: 'pointer' }}>Contact</span>
        </div>
      </footer>
    </div>
  )
}
