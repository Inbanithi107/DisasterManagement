import { clsx } from "clsx"

export function cn(...inputs) {
  return clsx(inputs)
}

export function formatTime(date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function generateSeismicData() {
  const now = new Date()
  const data = []
  
  for (let i = 0; i < 50; i++) {
    const time = new Date(now.getTime() - (49 - i) * 1000)
    const pWave = Math.sin(i * 0.2) * 0.5 + Math.random() * 0.3
    const sWave = Math.sin(i * 0.15) * 0.3 + Math.random() * 0.2
    
    data.push({
      time: time.toISOString(),
      pWave: Math.max(0, pWave),
      sWave: Math.max(0, sWave),
    })
  }
  
  return data
}

export function generatePatientVitals() {
  return {
    heartRate: Math.floor(Math.random() * 20) + 70,
    bloodPressure: {
      systolic: Math.floor(Math.random() * 20) + 110,
      diastolic: Math.floor(Math.random() * 10) + 70,
    },
    spo2: Math.floor(Math.random() * 5) + 95,
    potassium: (Math.random() * 0.5 + 3.5).toFixed(1),
  }
}

export function getAlertLevel(pWave, sWave) {
  if (pWave > 0.7 || sWave > 0.5) {
    return 'critical'
  } else if (pWave > 0.4 || sWave > 0.3) {
    return 'warning'
  }
  return 'safe'
}
