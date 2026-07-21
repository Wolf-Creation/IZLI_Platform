import { useState, type ReactNode } from 'react'
import { INDIGO, TEXT_SEC, SURFACE, BORDER, BG, FONT_SANS } from '../../theme/tokens'

interface Tab {
  id: string
  label: string
  count?: number
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  variant?: 'underline' | 'pill' | 'card'
  onChange?: (id: string) => void
}

export function Tabs({ tabs, defaultTab, variant = 'underline', onChange }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id)

  const handleChange = (id: string) => {
    setActive(id)
    onChange?.(id)
  }

  const activeTab = tabs.find(t => t.id === active)

  return (
    <div>
      {/* Tab bar */}
      {variant === 'underline' && (
        <div style={{ display: 'flex', borderBottom: `1px solid ${BORDER}`, marginBottom: 24 }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleChange(tab.id)}
              style={{
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: active === tab.id ? 500 : 400,
                color: active === tab.id ? INDIGO : TEXT_SEC,
                background: 'transparent',
                border: 'none',
                borderBottom: active === tab.id ? `2px solid ${INDIGO}` : '2px solid transparent',
                cursor: 'pointer',
                fontFamily: FONT_SANS,
                marginBottom: -1,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span style={{ fontSize: '11px', padding: '1px 6px', borderRadius: 999, background: active === tab.id ? `${INDIGO}18` : BG, color: active === tab.id ? INDIGO : TEXT_SEC }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {variant === 'pill' && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleChange(tab.id)}
              style={{
                padding: '7px 16px',
                fontSize: '13px',
                fontWeight: 500,
                color: active === tab.id ? '#FFFFFF' : TEXT_SEC,
                background: active === tab.id ? INDIGO : 'transparent',
                border: `1px solid ${active === tab.id ? INDIGO : BORDER}`,
                borderRadius: 999,
                cursor: 'pointer',
                fontFamily: FONT_SANS,
              }}
            >
              {tab.label}
              {tab.count !== undefined && ` (${tab.count})`}
            </button>
          ))}
        </div>
      )}

      {variant === 'card' && (
        <div style={{ display: 'flex', background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 4, gap: 2, marginBottom: 24 }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleChange(tab.id)}
              style={{
                flex: 1,
                padding: '7px 12px',
                fontSize: '13px',
                fontWeight: 500,
                color: active === tab.id ? '#FFFFFF' : TEXT_SEC,
                background: active === tab.id ? INDIGO : 'transparent',
                border: 'none',
                borderRadius: 9,
                cursor: 'pointer',
                fontFamily: FONT_SANS,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Tab content */}
      {activeTab && <div>{activeTab.content}</div>}
    </div>
  )
}

interface ControlledTabsProps {
  tabs: { id: string; label: string; count?: number }[]
  active: string
  onTabChange: (id: string) => void
  variant?: 'underline' | 'pill' | 'card'
}

export function TabBar({ tabs, active, onTabChange, variant = 'underline' }: ControlledTabsProps) {
  if (variant === 'pill') {
    return (
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              padding: '7px 16px', fontSize: '13px', fontWeight: 500,
              color: active === tab.id ? '#FFFFFF' : TEXT_SEC,
              background: active === tab.id ? INDIGO : 'transparent',
              border: `1px solid ${active === tab.id ? INDIGO : BORDER}`,
              borderRadius: 999, cursor: 'pointer', fontFamily: FONT_SANS,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div style={{ display: 'flex', background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 4, gap: 2 }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              flex: 1, padding: '7px 12px', fontSize: '13px', fontWeight: 500,
              color: active === tab.id ? '#FFFFFF' : TEXT_SEC,
              background: active === tab.id ? INDIGO : 'transparent',
              border: 'none', borderRadius: 9, cursor: 'pointer', fontFamily: FONT_SANS,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', borderBottom: `1px solid ${BORDER}` }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            padding: '10px 18px', fontSize: '13px',
            fontWeight: active === tab.id ? 500 : 400,
            color: active === tab.id ? INDIGO : TEXT_SEC,
            background: 'transparent', border: 'none',
            borderBottom: active === tab.id ? `2px solid ${INDIGO}` : '2px solid transparent',
            cursor: 'pointer', fontFamily: FONT_SANS, marginBottom: -1,
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span style={{ fontSize: '11px', padding: '1px 6px', borderRadius: 999, background: active === tab.id ? `${INDIGO}18` : BG, color: active === tab.id ? INDIGO : TEXT_SEC }}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
