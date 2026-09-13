import { useState, useEffect } from 'react'
import './SplashScreen.scss'

interface Props {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: Props) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      const exitTimer = setTimeout(onComplete, 800)
      return () => clearTimeout(exitTimer)
    }, 1000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className={`splash-screen ${isExiting ? 'splash-screen--exit' : ''}`}>
      <div className="splash-screen__content">
        <h1 className="splash-screen__title">IZLI</h1>
      </div>
    </div>
  )
}
