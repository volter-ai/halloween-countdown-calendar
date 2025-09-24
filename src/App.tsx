import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const currentYear = now.getFullYear()
      const halloween = new Date(currentYear, 9, 31) // Month is 0-based, so 9 = October
      
      if (now > halloween) {
        halloween.setFullYear(currentYear + 1)
      }
      
      const difference = halloween.getTime() - now.getTime()
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
      
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="halloween-container">
      <h1>🎃 Halloween Countdown 👻</h1>
      <div className="countdown-display">
        <h2>{timeLeft}</h2>
        <p>until Halloween!</p>
      </div>
      <div className="decorations">
        <span className="decoration">🦇</span>
        <span className="decoration">🕸️</span>
        <span className="decoration">💀</span>
        <span className="decoration">🕷️</span>
      </div>
    </div>
  )
}

export default App