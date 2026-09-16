interface Props {
  onReturnHome: () => void
  homeLabel?: string
}

export default function NotFoundPage({ onReturnHome, homeLabel = 'Return to the home page' }: Props) {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '48px 24px',
        background: '#F5F1EA',
        color: '#2E2E2E',
        textAlign: 'center',
      }}
    >
      <section style={{ maxWidth: 560 }}>
        <p style={{ margin: 0, color: '#8C6B52', fontSize: 13, fontWeight: 600, letterSpacing: '0.14em' }}>404</p>
        <h1 style={{ margin: '18px 0 12px', fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1, fontWeight: 500 }}>Sorry, this page doesn&apos;t exist</h1>
        <p style={{ margin: '0 auto 28px', maxWidth: 420, color: '#506681', fontSize: 16, lineHeight: 1.6 }}>
          The page you are looking for may have moved or the address may be incorrect.
        </p>
        <button
          type="button"
          onClick={onReturnHome}
          style={{
            border: 0,
            borderRadius: 4,
            padding: '13px 20px',
            background: '#1E2F44',
            color: '#fff',
            cursor: 'pointer',
            font: '600 13px Inter, sans-serif',
          }}
        >
          {homeLabel}
        </button>
      </section>
    </main>
  )
}
