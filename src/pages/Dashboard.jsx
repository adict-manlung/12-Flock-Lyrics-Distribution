import React, { useState, useEffect } from 'react'
import {
  Feather, Upload, BarChart3, User, Check, X,
  Image as ImageIcon, Search, Wallet, LogOut, Lock, Unlock,
  Mail, Info, Music, TrendingUp, AlertCircle, CheckCircle,
  RefreshCw, Clock, DollarSign,
} from 'lucide-react'
import { T, FONTS, PLANS, SEED_RELEASES, UNCLAIMED, STATUS_STYLES, inputStyle } from '../tokens.js'
import { Pill, FieldRow, PricingCards, Toast } from '../components/Shared.jsx'

/* ── Sidebar nav items ── */
const NAV = [
  { key: 'releases',  label: 'Releases',      icon: Feather },
  { key: 'upload',    label: 'New release',    icon: Upload },
  { key: 'claim',     label: 'Claim catalog',  icon: Search },
  { key: 'analytics', label: 'Analytics',      icon: BarChart3 },
  { key: 'plan',      label: 'Plan & billing', icon: Wallet },
  { key: 'profile',   label: 'Profile',        icon: User },
]

/* ── Cover thumbnail ── */
function Cover({ label, status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.Draft
  return (
    <div style={{ width: 42, height: 42, borderRadius: 6, background: s.bg, color: s.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
      {label}
    </div>
  )
}

/* ── Releases view ── */
function ReleasesView({ releases }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, margin: '0 0 6px' }}>Releases</h2>
      <p style={{ fontSize: 12.5, color: T.paperDim, margin: '0 0 24px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Info size={13} /> Live = on platforms · Sending = in transit · Blocked = needs attention · Draft = not sent
      </p>
      <div style={{ background: T.ink2, border: `1px solid ${T.line}`, borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '54px 1fr 120px 80px 130px', padding: '12px 20px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: T.paperDim, borderBottom: `1px solid ${T.line}`, fontFamily: "'JetBrains Mono', monospace" }}>
          <span /><span>Release</span><span>Status</span><span>Platforms</span><span>Date</span>
        </div>
        {releases.map((r) => (
          <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '54px 1fr 120px 80px 130px', padding: '15px 20px', borderBottom: `1px solid ${T.line}`, alignItems: 'center' }}>
            <Cover label={r.cover} status={r.status} />
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>{r.title}</div>
              <div style={{ fontSize: 12.5, color: T.paperDim, marginTop: 2 }}>{r.artist}</div>
            </div>
            <Pill status={r.status} />
            <span style={{ fontSize: 13, color: T.paperDim, fontFamily: "'JetBrains Mono', monospace" }}>{r.platforms}/8</span>
            <span style={{ fontSize: 13, color: T.paperDim, fontFamily: "'JetBrains Mono', monospace" }}>{r.date}</span>
          </div>
        ))}
        {releases.length === 0 && (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: T.paperDim, fontSize: 13.5 }}>
            No releases yet — click "New release" to send your first track.
          </div>
        )}
      </div>
      {releases.length > 0 && (
        <p style={{ fontSize: 11.5, color: T.paperDim, marginTop: 12, fontStyle: 'italic' }}>
          Seed releases (Low Tide, Halogen, Paper Moths) are examples. Your own releases appear here after submitting.
        </p>
      )}
    </div>
  )
}

/* ── Upload / New release view ── */
function UploadView({ onFile, freeUsed, plan, email, onToast }) {
  const [form, setForm] = useState({ title: '', artist: '', genre: '', lyrics: '', cover: false })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const blocked = freeUsed && plan === 'free'

  const submit = () => {
    if (!form.title.trim() || !form.artist.trim() || blocked) return
    onFile({
      id: 'r' + Math.random().toString(36).slice(2, 7),
      title: form.title, artist: form.artist, status: 'Draft',
      platforms: 0, date: '—', cover: form.title.slice(0, 2).toUpperCase(),
    })
    setForm({ title: '', artist: '', genre: '', lyrics: '', cover: false })
    onToast('Release queued! Confirmation will be emailed once platforms clear it.')
  }

  return (
    <div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>Send a new release</h2>
      <p style={{ fontSize: 13.5, color: T.paperDim, margin: '0 0 28px' }}>
        {plan === 'free' && !freeUsed && '✦ This one is on the house — your free release.'}
        {plan === 'free' && freeUsed && '⚠ Your free release has been used. Upgrade under Plan & billing to send more.'}
        {plan !== 'free' && '✓ Covered by your current plan — send as many as you like.'}
      </p>

      {blocked && (
        <div style={{ background: 'rgba(193,88,63,0.12)', border: `1px solid ${T.rose}`, borderRadius: 8, padding: '14px 18px', marginBottom: 24, fontSize: 13.5, color: T.rose, display: 'flex', alignItems: 'center', gap: 10 }}>
          <AlertCircle size={16} /> Free release used. Go to <strong>Plan &amp; billing</strong> to upgrade and unlock unlimited releases.
        </div>
      )}

      <FieldRow label="Album / Single cover">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => setForm({ ...form, cover: true })} style={{ width: 100, height: 100, border: `2px dashed ${form.cover ? T.moss : T.line2}`, borderRadius: 8, background: form.cover ? 'rgba(92,138,98,0.08)' : 'transparent', color: form.cover ? T.moss : T.paperDim, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', fontSize: 11.5, fontFamily: 'Inter, sans-serif' }}>
            <ImageIcon size={22} />
            {form.cover ? '✓ Added' : 'Add cover'}
          </button>
          <p style={{ fontSize: 12, color: T.paperDim, maxWidth: 220 }}>Min 3000×3000px, JPG or PNG. Square format required by all platforms.</p>
        </div>
      </FieldRow>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
        <FieldRow label="Track title"><input style={inputStyle} value={form.title} onChange={set('title')} placeholder="Low Tide" /></FieldRow>
        <FieldRow label="Artist name"><input style={inputStyle} value={form.artist} onChange={set('artist')} placeholder="Coastal Static" /></FieldRow>
        <FieldRow label="Genre"><input style={inputStyle} value={form.genre} onChange={set('genre')} placeholder="Dream pop" /></FieldRow>
        <FieldRow label="Release date" hint="leave blank = ASAP"><input style={inputStyle} type="date" /></FieldRow>
      </div>

      <FieldRow label="Lyrics" hint="LRC timed format also accepted">
        <textarea
          style={{ ...inputStyle, minHeight: 160, resize: 'vertical', lineHeight: 1.6 }}
          value={form.lyrics}
          onChange={set('lyrics')}
          placeholder={"[Verse 1]\nPaste or write the lyrics here\n\n[Chorus]\nAll synced automatically..."}
        />
      </FieldRow>

      <button
        onClick={submit}
        disabled={blocked}
        style={{ background: blocked ? T.line : T.gold, color: blocked ? T.paperDim : T.ink, border: 'none', borderRadius: 6, padding: '13px 24px', fontSize: 14.5, fontWeight: 700, cursor: blocked ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif', marginTop: 8 }}
      >
        {blocked ? <><Lock size={15} /> Upgrade to send</> : <><Unlock size={15} /> Send to the flock</>}
      </button>
    </div>
  )
}

/* ── Claim catalog view ── */
function ClaimView({ onToast }) {
  const [claimed, setClaimed] = useState([])
  const [query, setQuery] = useState('')
  const filtered = UNCLAIMED.filter((u) => u.title.toLowerCase().includes(query.toLowerCase()) || u.platform.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>Claim your catalog</h2>
      <p style={{ fontSize: 13.5, color: T.paperDim, margin: '0 0 24px', maxWidth: 540, lineHeight: 1.65 }}>
        Tracks and lyrics that appeared on a platform without being linked to your profile.
        Claim what's yours to start collecting the royalties already earned.
      </p>

      <div style={{ position: 'relative', marginBottom: 20, maxWidth: 380 }}>
        <Search size={14} color={T.paperDim} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
        <input
          style={{ ...inputStyle, paddingLeft: 38 }}
          placeholder="Search by title or platform…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div style={{ background: T.ink2, border: `1px solid ${T.line}`, borderRadius: 10, overflow: 'hidden' }}>
        {filtered.map((u) => {
          const isClaimed = claimed.includes(u.id)
          return (
            <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', borderBottom: `1px solid ${T.line}`, gap: 16 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{u.title}</div>
                <div style={{ fontSize: 12.5, color: T.paperDim, marginTop: 3 }}>{u.platform} · {u.plays} plays · uploaded by {u.artist}</div>
              </div>
              <button
                onClick={() => { setClaimed([...claimed, u.id]); onToast(`"${u.title}" claimed! Royalties routing to your account.`) }}
                disabled={isClaimed}
                style={{ flexShrink: 0, background: isClaimed ? 'transparent' : T.gold, color: isClaimed ? T.moss : T.ink, border: isClaimed ? `1px solid ${T.moss}` : 'none', borderRadius: 6, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: isClaimed ? 'default' : 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                {isClaimed ? <><CheckCircle size={14} /> Claimed</> : 'Claim'}
              </button>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div style={{ padding: '32px 22px', color: T.paperDim, fontSize: 13.5, textAlign: 'center' }}>
            No unclaimed tracks found matching "{query}".
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Analytics view ── */
function AnalyticsView() {
  const rows = [
    { platform: 'TikTok',        streams: 61030, color: '#69C9D0' },
    { platform: 'Spotify',       streams: 48210, color: '#1DB954' },
    { platform: 'Instagram',     streams: 30450, color: '#E1306C' },
    { platform: 'Apple Music',   streams: 22140, color: '#FC3C44' },
    { platform: 'YouTube Music', streams: 15870, color: '#FF0000' },
    { platform: 'WhatsApp',      streams: 8100,  color: '#25D366' },
  ]
  const max = Math.max(...rows.map((r) => r.streams))
  const total = rows.reduce((a, b) => a + b.streams, 0)

  return (
    <div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, margin: '0 0 24px' }}>Analytics</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total plays (30d)', value: total.toLocaleString(), icon: TrendingUp },
          { label: 'Active releases',   value: '3',    icon: Music },
          { label: 'Platforms live',    value: '8',    icon: CheckCircle },
        ].map((m) => {
          const Icon = m.icon
          return (
            <div key={m.label} style={{ background: T.ink2, border: `1px solid ${T.line}`, borderRadius: 10, padding: '20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: T.paperDim, marginBottom: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase' }}>
                <Icon size={13} color={T.moss} />{m.label}
              </div>
              <div style={{ fontSize: 30, fontWeight: 700, fontFamily: "'Fraunces', serif" }}>{m.value}</div>
            </div>
          )
        })}
      </div>

      <div style={{ background: T.ink2, border: `1px solid ${T.line}`, borderRadius: 10, padding: '24px 22px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.paperDim, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20 }}>Platform breakdown — last 30 days</div>
        {rows.map((r) => (
          <div key={r.platform} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, marginBottom: 7 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.color, display: 'inline-block' }} />
                {r.platform}
              </span>
              <span style={{ color: T.paperDim, fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5 }}>
                {r.streams.toLocaleString()} · {Math.round((r.streams / total) * 100)}%
              </span>
            </div>
            <div style={{ background: T.ink, borderRadius: 4, height: 7 }}>
              <div style={{ width: `${(r.streams / max) * 100}%`, background: r.color, height: 7, borderRadius: 4, transition: 'width 0.6s ease' }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, padding: '14px 18px', background: T.ink2, border: `1px solid ${T.line}`, borderRadius: 10, fontSize: 12.5, color: T.paperDim, display: 'flex', alignItems: 'center', gap: 8 }}>
        <DollarSign size={13} color={T.moss} />
        Estimated royalties this month: <strong style={{ color: T.paper }}>$24.80</strong> — payout on the 1st.
      </div>
    </div>
  )
}

/* ── Plan view ── */
function PlanView({ plan, setPlan }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>Plan &amp; billing</h2>
      <p style={{ fontSize: 13.5, color: T.paperDim, margin: '0 0 28px' }}>
        Current plan: <strong style={{ color: T.paper }}>{PLANS.find((p) => p.key === plan)?.name}</strong>.
        All paid plans billed once a year.
      </p>
      <PricingCards />
      <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {PLANS.map((p) => (
          <button key={p.key} onClick={() => setPlan(p.key)} style={{ background: plan === p.key ? T.gold : 'transparent', color: plan === p.key ? T.ink : T.paperDim, border: `1px solid ${plan === p.key ? T.gold : T.line2}`, borderRadius: 6, padding: '9px 16px', fontSize: 12.5, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: plan === p.key ? 700 : 400 }}>
            {plan === p.key ? '✓ Current: ' : 'Switch to '}{p.name}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Profile view ── */
function ProfileView({ user, onToast }) {
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', country: user?.country || '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  return (
    <div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, margin: '0 0 24px' }}>Profile</h2>
      <div style={{ background: T.ink2, border: `1px solid ${T.line}`, borderRadius: 10, padding: 28, maxWidth: 500 }}>
        <FieldRow label="Artist / Full name"><input style={inputStyle} value={form.name} onChange={set('name')} /></FieldRow>
        <FieldRow label="Email"><input style={inputStyle} value={form.email} onChange={set('email')} /></FieldRow>
        <FieldRow label="Phone number"><input style={inputStyle} value={form.phone} onChange={set('phone')} /></FieldRow>
        <FieldRow label="Country"><input style={inputStyle} value={form.country} onChange={set('country')} /></FieldRow>
        <button onClick={() => onToast('Profile saved!')} style={{ background: T.gold, color: T.ink, border: 'none', borderRadius: 6, padding: '11px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginTop: 8 }}>Save changes</button>
      </div>
    </div>
  )
}

/* ── Dashboard shell ── */
export default function Dashboard({ user, onExit }) {
  const [tab, setTab] = useState('releases')
  const [releases, setReleases] = useState(SEED_RELEASES)
  const [plan, setPlan] = useState(user?.plan || 'free')
  const [freeUsed, setFreeUsed] = useState(false)
  const [toast, setToast] = useState(null)

  /* Persist state to localStorage */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('12flock_state')
      if (saved) {
        const p = JSON.parse(saved)
        if (p.releases) setReleases(p.releases)
        if (p.plan) setPlan(p.plan)
        if (typeof p.freeUsed === 'boolean') setFreeUsed(p.freeUsed)
      }
    } catch (_) {}
  }, [])

  const persist = (next) => {
    try { localStorage.setItem('12flock_state', JSON.stringify(next)) } catch (_) {}
  }

  const addRelease = (r) => {
    const nextReleases = [r, ...releases]
    const nextFreeUsed = plan === 'free' ? true : freeUsed
    setReleases(nextReleases)
    setFreeUsed(nextFreeUsed)
    persist({ releases: nextReleases, plan, freeUsed: nextFreeUsed })
    setTab('releases')
  }

  const changePlan = (p) => {
    setPlan(p)
    persist({ releases, plan: p, freeUsed })
    setToast(`Switched to ${PLANS.find((x) => x.key === p)?.name}!`)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: T.ink, color: T.paper, fontFamily: 'Inter, sans-serif' }}>
      <style>{FONTS}</style>

      {/* Sidebar */}
      <aside style={{ width: 228, borderRight: `1px solid ${T.line}`, padding: '24px 14px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 10px 28px' }}>
          <Feather size={18} color={T.gold} />
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 17 }}>12Flock</span>
        </div>
        <div style={{ padding: '0 10px', marginBottom: 18 }}>
          <div style={{ fontSize: 12, color: T.paperDim }}>Signed in as</div>
          <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'Artist'}</div>
          <div style={{ fontSize: 11.5, color: T.paperDim, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
        </div>

        <div style={{ height: 1, background: T.line, margin: '0 10px 14px' }} />

        {NAV.map(({ key, label, icon: Icon }) => {
          const active = tab === key
          return (
            <button key={key} onClick={() => setTab(key)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', marginBottom: 3, background: active ? T.ink2 : 'transparent', border: active ? `1px solid ${T.line}` : '1px solid transparent', borderRadius: 7, color: active ? T.paper : T.paperDim, fontSize: 13.5, cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif', fontWeight: active ? 600 : 400 }}>
              <Icon size={15} />{label}
            </button>
          )
        })}

        <div style={{ flex: 1 }} />
        <div style={{ height: 1, background: T.line, margin: '14px 10px' }} />
        <button onClick={onExit} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'transparent', border: 'none', color: T.paperDim, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
          <LogOut size={14} />Sign out
        </button>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '36px 44px', overflowY: 'auto', maxWidth: 940 }}>
        {tab === 'releases'  && <ReleasesView releases={releases} />}
        {tab === 'upload'    && <UploadView onFile={addRelease} freeUsed={freeUsed} plan={plan} email={user?.email} onToast={(m) => setToast(m)} />}
        {tab === 'claim'     && <ClaimView onToast={(m) => setToast(m)} />}
        {tab === 'analytics' && <AnalyticsView />}
        {tab === 'plan'      && <PlanView plan={plan} setPlan={changePlan} />}
        {tab === 'profile'   && <ProfileView user={user} onToast={(m) => setToast(m)} />}
      </main>

      {toast && <Toast message={toast} type="success" onDone={() => setToast(null)} />}
    </div>
  )
}
