import { useState } from 'react'
import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'

interface Props { onNavigate: (s: Screen) => void }

const ASSETS = [
  { id: 'a1', name: 'tifinagh-tee-front-01.jpg', tags: ['product', 'heritage'], size: '2.4 MB', dim: '3000×4000', used: 3, img: 'photo-1521572163474-6864f9cf17ab' },
  { id: 'a2', name: 'echoes-of-stone-hero.jpg', tags: ['campaign', 'heritage'], size: '4.1 MB', dim: '4800×3200', used: 1, img: 'photo-1469334031218-e382a71b716b' },
  { id: 'a3', name: 'atlas-workshop-01.jpg', tags: ['editorial', 'process'], size: '3.2 MB', dim: '3600×2400', used: 2, img: 'photo-1490481651871-ab68de25d43d' },
  { id: 'a4', name: 'indigo-dye-detail.jpg', tags: ['process', 'material'], size: '1.8 MB', dim: '2400×3200', used: 4, img: 'photo-1516762689617-e1cffcef479d' },
  { id: 'a5', name: 'boxy-tee-lookbook-02.jpg', tags: ['product', 'lookbook'], size: '2.9 MB', dim: '3000×4000', used: 1, img: 'photo-1503341504253-dff4815485f1' },
  { id: 'a6', name: 'community-lab-session.jpg', tags: ['community', 'lab'], size: '2.1 MB', dim: '3200×2400', used: 2, img: 'photo-1523381210434-271e8be1f52b' },
  { id: 'a7', name: 'tifinagh-type-study.jpg', tags: ['editorial', 'type'], size: '1.4 MB', dim: '2400×2400', used: 3, img: 'photo-1618354691373-d851c5c3a990' },
  { id: 'a8', name: 'heritage-essentials-flat.jpg', tags: ['product', 'flat-lay'], size: '3.6 MB', dim: '4000×3000', used: 1, img: 'photo-1489987707025-afc232f7ea0f' },
  { id: 'a9', name: 'manifesto-texture-01.jpg', tags: ['editorial', 'texture'], size: '2.2 MB', dim: '3200×3200', used: 1, img: 'photo-1558618666-fcd25c85cd64' },
]

const FOLDERS = ['All Assets', 'Campaign', 'Products', 'Editorial', 'Community', 'Textures']
const ALL_TAGS = ['product', 'campaign', 'editorial', 'heritage', 'process', 'material', 'lookbook', 'community', 'lab', 'type', 'flat-lay', 'texture']

export default function MediaLibrary({ onNavigate: _ }: Props) {
  const [selected, setSelected] = useState<string | null>('a1')
  const selectedAsset = ASSETS.find(a => a.id === selected)

  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Media Library</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>Visual brand archive · 9 assets shown of 284</div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 12, padding: '10px 18px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
          ↑ Upload Assets
        </button>
      </div>

      {/* Filters bar */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 14, padding: '14px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {FOLDERS.map((f, i) => (
            <button key={f} style={{ padding: '5px 12px', borderRadius: 8, border: `1px solid ${i === 0 ? INDIGO : BORDER}`, background: i === 0 ? INDIGO : 'transparent', color: i === 0 ? '#E7DFD2' : TEXT_SEC, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{f}</button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 10, padding: '7px 12px', width: 200 }}>
          <span style={{ fontSize: 13, color: '#B7AA91' }}>⌕</span>
          <input placeholder="Search assets..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 12, color: TEXT, width: '100%', fontFamily: 'Inter, sans-serif' }} />
        </div>
        <select style={{ padding: '7px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 12, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif', outline: 'none' }}>
          <option>All types</option><option>Images</option><option>Video</option><option>Documents</option>
        </select>
      </div>

      {/* Tag filter row */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
        {ALL_TAGS.map(tag => (
          <span key={tag} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: '#EDE8DF', border: `1px solid ${BORDER}`, color: TEXT_SEC, cursor: 'pointer' }}>
            #{tag}
          </span>
        ))}
      </div>

      {/* Grid + detail */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
        {/* Image grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {ASSETS.map(a => (
            <div
              key={a.id}
              onClick={() => setSelected(a.id)}
              style={{
                borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
                border: `2px solid ${selected === a.id ? INDIGO : 'transparent'}`,
                background: '#EDE8DF',
                transition: 'border-color 0.12s',
                position: 'relative',
              }}
            >
              <div style={{ aspectRatio: '3/4' }}>
                <img src={`https://images.unsplash.com/${a.img}?w=200&h=267&fit=crop&auto=format`} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '8px 10px', background: '#F5F1EA', borderTop: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 11, fontWeight: 500, color: TEXT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name.split('.')[0]}</div>
                <div style={{ fontSize: 10, color: TEXT_SEC, marginTop: 1 }}>{a.size}</div>
              </div>
              {selected === a.id && (
                <div style={{ position: 'absolute', top: 8, right: 8, width: 20, height: 20, background: INDIGO, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#E7DFD2', fontSize: 11 }}>✓</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Asset detail */}
        {selectedAsset && (
          <div style={{ position: 'sticky', top: 24, background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#EDE8DF' }}>
              <img src={`https://images.unsplash.com/${selectedAsset.img}?w=400&h=300&fit=crop&auto=format`} alt={selectedAsset.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 16, wordBreak: 'break-word' }}>{selectedAsset.name}</div>
              {[
                { l: 'Dimensions', v: selectedAsset.dim },
                { l: 'File size', v: selectedAsset.size },
                { l: 'Used in', v: `${selectedAsset.used} places` },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 12, color: TEXT_SEC }}>{r.l}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>{r.v}</span>
                </div>
              ))}
              <div style={{ marginTop: 16, marginBottom: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Alt Text</div>
                <textarea style={{ width: '100%', padding: '9px 12px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 12, color: TEXT, outline: 'none', fontFamily: 'Inter, sans-serif', resize: 'none', height: 60 }}
                  defaultValue="Front view of Tifinagh Frame Tee on model, natural light." />
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Tags</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {selectedAsset.tags.map(t => (
                    <span key={t} style={{ fontSize: 11, padding: '2px 9px', borderRadius: 999, background: '#E8EDF3', color: INDIGO }}>#{t}</span>
                  ))}
                  <button style={{ fontSize: 11, padding: '2px 9px', borderRadius: 999, background: '#EDE8DF', border: `1px dashed ${BORDER}`, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>+ tag</button>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ flex: 1, padding: '9px', background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 10, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Save</button>
                <button style={{ padding: '9px 12px', background: 'transparent', color: TEXT_SEC, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>↓</button>
                <button style={{ padding: '9px 12px', background: 'transparent', color: '#C0392B', border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>✕</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
