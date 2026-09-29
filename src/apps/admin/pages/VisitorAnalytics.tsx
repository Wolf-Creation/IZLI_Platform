import { useEffect, useState } from 'react'
import type { Screen } from '../../../types'
import { getVisitorAnalytics, type VisitorAnalytics as VisitorAnalyticsData } from '../../../shared/services/analytics'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const SURFACE = '#F5F1EA'

interface Props { onNavigate: (screen: Screen) => void }

export default function VisitorAnalytics({ onNavigate }: Props) {
  const [data, setData] = useState<VisitorAnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [days, setDays] = useState(30)

  const load = () => {
    setLoading(true)
    setError(null)
    getVisitorAnalytics(days).then(setData).catch(value => setError(value instanceof Error ? value.message : 'Unable to load visitor analytics')).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [days])

  return (
    <div style={{ padding: '40px 48px 80px', maxWidth: 1360, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, marginBottom: 32 }}>
        <div><div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Visitor Analytics</div><div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>Anonymous website traffic and page views.</div></div>
        <div style={{ display: 'flex', gap: 10 }}><select value={days} onChange={event => setDays(Number(event.target.value))} style={{ padding: '10px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: SURFACE, color: TEXT }}><option value={7}>Last 7 days</option><option value={30}>Last 30 days</option><option value={90}>Last 90 days</option></select><button type="button" onClick={() => onNavigate('dashboard')} style={{ padding: '10px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', color: TEXT_SEC, cursor: 'pointer' }}>Back</button></div>
      </div>

      {error && <div style={{ marginBottom: 20, padding: 14, borderRadius: 10, background: '#FDF3EC', border: '1px solid #E8CDBA', color: '#A06030' }}>{error}. Connect with an admin account to view analytics.</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[['Unique visitors', data?.visitors ?? 0], ['Sessions', data?.sessions ?? 0], ['Page views', data?.pageViews ?? 0]].map(([label, value]) => <div key={String(label)} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '22px 24px' }}><div style={{ fontSize: 11, color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{label}</div><div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: INDIGO }}>{loading ? '...' : value}</div></div>)}
      </div>
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', background: '#EFE8DD', borderBottom: `1px solid ${BORDER}`, fontFamily: "'Playfair Display', serif", fontSize: 18, color: INDIGO }}>Top pages</div>
        {loading ? <div style={{ padding: 24, color: TEXT_SEC }}>Loading analytics...</div> : data?.topPages.length ? data.topPages.map((item, index) => <div key={item.page} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 24px', borderBottom: `1px solid ${BORDER}`, color: TEXT, fontSize: 13 }}><span><strong style={{ display: 'inline-block', width: 28, color: TEXT_SEC }}>{index + 1}</strong>{item.page}</span><strong>{item.views} views</strong></div>) : <div style={{ padding: 24, color: TEXT_SEC }}>No page views recorded yet.</div>}
      </div>
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden', marginTop: 24 }}>
        <div style={{ padding: '18px 24px', background: '#EFE8DD', borderBottom: `1px solid ${BORDER}`, fontFamily: "'Playfair Display', serif", fontSize: 18, color: INDIGO }}>Top CTA clicks</div>
        {loading ? <div style={{ padding: 24, color: TEXT_SEC }}>Loading CTA analytics...</div> : data?.topCtas.length ? data.topCtas.map((item, index) => <div key={`${item.page}-${item.cta}`} style={{ display: 'flex', justifyContent: 'space-between', gap: 20, padding: '15px 24px', borderBottom: `1px solid ${BORDER}`, color: TEXT, fontSize: 13 }}><span><strong style={{ display: 'inline-block', width: 28, color: TEXT_SEC }}>{index + 1}</strong>{item.cta}<small style={{ display: 'block', marginLeft: 28, marginTop: 4, color: TEXT_SEC }}>{item.page}</small></span><strong>{item.clicks} clicks</strong></div>) : <div style={{ padding: 24, color: TEXT_SEC }}>No CTA clicks recorded yet.</div>}
      </div>
    </div>
  )
}
