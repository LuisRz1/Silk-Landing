"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface HexBackgroundProps {
  className?: string
  opacity?: number
}

export default function HexBackground({ className = "", opacity = 0.15 }: HexBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const hexagons: { x: number; y: number; size: number; speed: number; opacity: number; phase: number }[] = []
    const hexCount = 25

    for (let i = 0; i < hexCount; i++) {
      hexagons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 40 + 20,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        phase: Math.random() * Math.PI * 2,
      })
    }

    const drawHexagon = (x: number, y: number, size: number, hexOpacity: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        const hx = x + size * Math.cos(angle)
        const hy = y + size * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(hx, hy)
        } else {
          ctx.lineTo(hx, hy)
        }
      }
      ctx.closePath()
      ctx.strokeStyle = `rgba(34, 139, 87, ${hexOpacity * opacity})`
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      hexagons.forEach((hex) => {
        hex.y -= hex.speed
        const pulse = Math.sin(time * 2 + hex.phase) * 0.2 + 0.8
        
        if (hex.y + hex.size < 0) {
          hex.y = canvas.height + hex.size
          hex.x = Math.random() * canvas.width
        }

        drawHexagon(hex.x, hex.y, hex.size, hex.opacity * pulse)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [opacity])

  return (
    <motion.canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  )
}
