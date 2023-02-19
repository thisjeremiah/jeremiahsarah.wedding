import { useEffect, useRef, useState } from 'react'

export function ProgressRing({
  radius,
  stroke,
}: {
  radius: number
  stroke: number
}) {
  const [progress, setProgress] = useState(0)
  const progressCountRef = useRef(0)

  useEffect(() => {
    let timeout: NodeJS.Timer

    let prevTime = new Date()

    const increment = () => {
      const currTime = new Date()
      const timeDiff = currTime.getTime() - prevTime.getTime()
      prevTime = currTime
      progressCountRef.current = Math.min(
        progressCountRef.current + timeDiff / 30.1 / 10,
        100,
      )
      setProgress(progressCountRef.current)
      if (progressCountRef.current < 100) {
        timeout = setTimeout(increment, 100)
      }
    }

    increment()

    return () => clearTimeout(timeout)
  }, [])

  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="white"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  )
}
