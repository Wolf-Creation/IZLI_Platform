import { useState, useEffect } from 'react'
import izliLogoText from '../../../../assets/logo/IZLI_logo_text.svg'
import './SplashScreen.scss'

interface Props {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: Props) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      const exitTimer = setTimeout(onComplete, 600)
      return () => clearTimeout(exitTimer)
    }, 500)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className={`splash-screen ${isExiting ? 'splash-screen--exit' : ''}`}>
      <div className="splash-screen__content">
        <img className="splash-screen__title" src={izliLogoText} alt="IZLI" />
      </div>
    </div>
  )
}
