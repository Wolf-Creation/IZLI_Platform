import { useState, useEffect } from 'react'
import './ScrollToTop.scss'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 300)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    isVisible && (
      <button
        className="scroll-to-top"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        ↑
      </button>
    )
  )
}
