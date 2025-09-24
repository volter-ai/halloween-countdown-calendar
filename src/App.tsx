import { useEffect, useState } from 'react'
import './App.css'

type Holiday = 'halloween' | 'christmas'

function App() {
  const [timeLeft, setTimeLeft] = useState('')
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday>('halloween')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const currentYear = now.getFullYear()
      let targetDate: Date

      if (selectedHoliday === 'halloween') {
        targetDate = new Date(currentYear, 9, 31) // Month is 0-based, so 9 = October
      } else {
        targetDate = new Date(currentYear, 11, 25) // 11 = December
      }
      
      if (now > targetDate) {
        targetDate.setFullYear(currentYear + 1)
      }
      
      const difference = targetDate.getTime() - now.getTime()
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
      
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [selectedHoliday])

  const getHolidayEmojis = () => {
    return selectedHoliday === 'halloween' 
      ? ['🦇', '🕸️', '💀', '🕷️']
      : ['🎄', '⛄', '🎁', '🦌']
  }

  return (
    <div className="holiday-container">
      <select 
        value={selectedHoliday}
        onChange={(e) => setSelectedHoliday(e.target.value as Holiday)}
        className="holiday-select"
      >
        <option value="halloween">Halloween</option>
        <option value="christmas">Christmas</option>
      </select>
      <h1>
        {selectedHoliday === 'halloween' ? '🎃 Halloween Countdown 👻' : '🎄 Christmas Countdown 🎅'}
      </h1>
      <div className="countdown-display">
        <h2>{timeLeft}</h2>
        <p>until {selectedHoliday === 'halloween' ? 'Halloween' : 'Christmas'}!</p>
      </div>
      <div className="decorations">
        {getHolidayEmojis().map((emoji, index) => (
          <span key={index} className="decoration">{emoji}</span>
        ))}
      </div>
    </div>
  )
}

export default App