import { useState, useEffect } from 'react'
import AnimatedLogoSvg from '../../../assets/logo/icon_logo_animated.svg'
import './AnimatedLogoBg.scss'

export function AnimatedLogoBg() {
  const [canAnimate, setCanAnimate] = useState(false)

  useEffect(() => {
    // Wait 1s before allowing animation to start
    const timer = setTimeout(() => {
      setCanAnimate(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`animated-logo-bg ${canAnimate ? 'animated-logo-bg--active' : ''}`}>
      <img
        src={AnimatedLogoSvg}
        alt=""
        className="animated-logo-bg__svg"
        aria-hidden="true"
      />
    </div>
  )
}
