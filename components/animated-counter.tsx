"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  className?: string
  formatter?: (value: number) => string
}

export default function AnimatedCounter({
  from,
  to,
  duration = 2,
  className = "",
  formatter = (value) => value.toLocaleString(),
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      let startTime: number
      let animationFrame: number

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        const currentCount = Math.floor(progress * (to - from) + from)

        setCount(currentCount)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step)
        } else {
          setCount(to)
          setHasAnimated(true)
        }
      }

      animationFrame = requestAnimationFrame(step)
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [from, to, duration, isInView, hasAnimated])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {formatter(count)}
    </motion.div>
  )
}
