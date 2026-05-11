"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
}

export default function ParallaxSection({
  children,
  className = "",
  speed = 0.2,
  direction = "up",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const transformUp = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`])
  const transformDown = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
  const transformLeft = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`])
  const transformRight = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  const getTransformValue = () => {
    switch (direction) {
      case "up":
        return transformUp
      case "down":
        return transformDown
      case "left":
        return transformLeft
      case "right":
        return transformRight
      default:
        return transformUp
    }
  }

  const transformValue =
    direction === "left" || direction === "right" ? { x: getTransformValue() } : { y: getTransformValue() }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={transformValue} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  )
}
