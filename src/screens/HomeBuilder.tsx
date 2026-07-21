import { useState } from 'react'
import type { Screen } from '../types'

const INDIGO = '#1E2F44'
const TEXT = '#2E2E2E'
const TEXT_SEC = '#506681'
const BORDER = '#D8D0C4'
const CLAY = '#8C6B52'

interface Props { onNavigate: (s: Screen) => void }

interface Block {
  id: string
  type: string
  label: string
  icon: string
  status: 'active' | 'hidden'
  summary: string
}

const BLOCKS: Block[] = [
  { id: 'b1', type: 'hero', label: 'Hero', icon: '◈', status: 'active', summary: '"Echoes of Stone" — Summer 2026 campaign image' },
  { id: 'b2', type: 'universes', label: 'Shop by Universe', icon: '⬡', status: 'active', summary: 'Heritage · Essentials · Studio · Community Lab' },
  { id: 'b3', type: 'collection', label: 'Featured Collection', icon: '◻', status: 'active', summary: 'Echoes of Stone — 14 products' },
  { id: 'b4', type: 'products', label: 'Featured Products', icon: '▦', status: 'active', summary: '4 products selected — Tifinagh Frame Tee, Atlas Symbol Tee...' },
  { id: 'b5', type: 'story', label: 'Featured Story', icon: '◫', status: 'active', summary: '"The Geometry of Tifinagh" — Editorial' },
  { id: 'b6', type: 'challenge', label: 'Challenge Spotlight', icon: '◇', status: 'hidden', summary: 'Tifinagh Type Challenge — Active · 142 entries' },
  { id: 'b7', type: 'community', label: 'Community Spotlight', icon: '◯', status: 'active', summary: '3 featured contributions' },
  { id: 'b8', type: 'manifesto', label: 'Manifesto Block', icon: '◫', status: 'active', summary: '"We carry the Atlas in the cut of every seam."' },
  { id: 'b9', type: 'newsletter', label: 'Newsletter / CTA', icon: '⊞', status: 'active', summary: 'Join the IZLI community · Email capture' },
]

function BlockRow({ block, selected, onSelect }: { block: Block; selected: boolean; onSelect: () => void }) {
  return (
    <div
      onClick={onSelect}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 18px',
        background: selected ? '#E8EDF3' : '#F5F1EA',
        border: `1px solid ${selected ? INDIGO : BORDER}`,
        borderRadius: 14,
        cursor: 'pointer',
        transition: 'all 0.12s',
        marginBottom: 8,
      }}
    >
      <span style={{ fontSize: 16, cursor: 'grab', color: '#B7AA91' }}>⠿</span>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: selected ? INDIGO : '#EFE8DD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, transition: 'background 0.12s' }}>
        <span style={{ color: selected ? '#E7DFD2' : TEXT_SEC }}>{block.icon}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{block.label}</div>
        <div style={{ fontSize: 11, color: TEXT_SEC, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{block.summary}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span style={{
          fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 999,
          background: block.status === 'active' ? '#E6EDE8' : '#EDE8DF',
          color: block.status === 'active' ? '#4A7A5A' : TEXT_SEC,
          letterSpacing: '0.05em', textTransform: 'uppercase',
        }}>{block.status}</span>
        <button style={{ fontSize: 12, color: TEXT_SEC, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: 6 }}>···</button>
      </div>
    </div>
  )
}

function EditPanel({ block }: { block: Block }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, height: '100%' }}>
      <div style={{ padding: '20px 24px 16px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: INDIGO }}>{block.label}</div>
        <div style={{ fontSize: 12, color: TEXT_SEC, marginTop: 2 }}>Block configuration</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        {block.type === 'hero' && (
          <>
            <Field label="Headline">
              <input style={inp} defaultValue="Echoes of Stone" />
            </Field>
            <Field label="Subtext">
              <textarea style={{ ...inp, height: 72, resize: 'vertical' }} defaultValue="A collection drawn from stone surface memory — weathered Atlas mountains." />
            </Field>
            <Field label="CTA Label">
              <input style={inp} defaultValue="Discover the Collection" />
            </Field>
            <Field label="Campaign Image">
              <div style={{ height: 100, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 10, overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=120&fit=crop&auto=format" alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <button style={{ marginTop: 8, fontSize: 12, color: TEXT_SEC, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Replace Image</button>
            </Field>
            <Field label="Linked Collection">
              <select style={{ ...inp, cursor: 'pointer' }}>
                <option>Echoes of Stone</option><option>Indigo Memory</option><option>Atlas Marks</option>
              </select>
            </Field>
          </>
        )}
        {block.type === 'story' && (
          <>
            <Field label="Linked Story">
              <div style={{ padding: '12px 14px', background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>The Geometry of Tifinagh</div>
                <div style={{ fontSize: 11, color: TEXT_SEC }}>Published · 4.2K reads</div>
              </div>
              <button style={{ marginTop: 8, fontSize: 12, color: TEXT_SEC, background: '#EDE8DF', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Change Story</button>
            </Field>
            <Field label="Block Headline">
              <input style={inp} defaultValue="From the Archive" />
            </Field>
          </>
        )}
        {block.type === 'manifesto' && (
          <>
            <Field label="Quote Text">
              <textarea style={{ ...inp, height: 100, resize: 'vertical' }} defaultValue='"We carry the Atlas in the cut of every seam. Culture is not a reference — it is a construction method."' />
            </Field>
            <Field label="Attribution">
              <input style={inp} defaultValue="IZLI Manifesto, 2024" />
            </Field>
          </>
        )}
        {(block.type !== 'hero' && block.type !== 'story' && block.type !== 'manifesto') && (
          <>
            <Field label="Block Title">
              <input style={inp} defaultValue={block.label} />
            </Field>
            <Field label="Display Mode">
              <select style={{ ...inp, cursor: 'pointer' }}>
                <option>Grid</option><option>Horizontal scroll</option><option>Featured row</option>
              </select>
            </Field>
            <Field label="Item Count">
              <input style={inp} defaultValue="4" type="number" />
            </Field>
          </>
        )}
      </div>
      <div style={{ padding: '16px 24px', borderTop: `1px solid ${BORDER}`, display: 'flex', gap: 10 }}>
        <button style={{ flex: 1, padding: '9px', background: INDIGO, color: '#E7DFD2', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Save Block</button>
        <button style={{ padding: '9px 14px', background: 'transparent', color: TEXT_SEC, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Hide</button>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  )
}

const inp: React.CSSProperties = { width: '100%', padding: '9px 13px', border: `1px solid ${BORDER}`, borderRadius: 10, background: '#EDE8DF', fontSize: 13, color: TEXT, outline: 'none', fontFamily: 'Inter, sans-serif' }

export default function HomeBuilder({ onNavigate: _ }: Props) {
  const [selected, setSelected] = useState<string>('b1')
  const selectedBlock = BLOCKS.find(b => b.id === selected)!

  return (
    <div style={{ padding: '40px 48px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: INDIGO }}>Home Builder</div>
          <div style={{ fontSize: 14, color: TEXT_SEC, marginTop: 4 }}>Manage and configure the IZLI homepage sections</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ padding: '9px 16px', border: `1px solid ${BORDER}`, borderRadius: 10, background: 'transparent', fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Preview →</button>
          <button style={{ padding: '9px 20px', border: 'none', borderRadius: 10, background: INDIGO, color: '#E7DFD2', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Publish Homepage</button>
        </div>
      </div>

      {/* Status bar */}
      <div style={{ background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 14, padding: '12px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontSize: 12, color: TEXT_SEC }}>Last published: <strong style={{ color: TEXT }}>Today at 09:14</strong></span>
        <span style={{ width: 1, height: 14, background: BORDER }} />
        <span style={{ fontSize: 12, color: TEXT_SEC }}>Active blocks: <strong style={{ color: TEXT }}>8 of 9</strong></span>
        <span style={{ width: 1, height: 14, background: BORDER }} />
        <span style={{ fontSize: 12, color: CLAY }}>● Unsaved changes</span>
        <div style={{ flex: 1 }} />
        <button style={{ fontSize: 12, color: TEXT_SEC, background: '#EFE8DD', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '5px 12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Discard</button>
      </div>

      {/* 3-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'start' }}>
        {/* Block list */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_SEC, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>Page Sections — drag to reorder</div>
          {BLOCKS.map(block => (
            <BlockRow key={block.id} block={block} selected={selected === block.id} onSelect={() => setSelected(block.id)} />
          ))}
          <button style={{ width: '100%', padding: '12px', marginTop: 4, background: 'transparent', border: `2px dashed ${BORDER}`, borderRadius: 14, fontSize: 13, color: TEXT_SEC, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            + Add Block
          </button>
        </div>

        {/* Edit panel */}
        <div style={{ position: 'sticky', top: 24, background: '#F5F1EA', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', maxHeight: '80vh' }}>
          <EditPanel block={selectedBlock} />
        </div>
      </div>
    </div>
  )
}
