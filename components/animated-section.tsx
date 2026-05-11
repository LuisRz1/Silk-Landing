"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation, type Variant } from "framer-motion"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  animation?: "fadeIn" | "slideUp" | "slideRight" | "slideLeft" | "scale" | "stagger"
  threshold?: number
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
  animation = "fadeIn",
  threshold = 0.1,
}: AnimatedSectionProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const variants = {
    hidden: {
      opacity: 0,
      y: animation === "slideUp" ? 50 : 0,
      x: animation === "slideRight" ? -50 : animation === "slideLeft" ? 50 : 0,
      scale: animation === "scale" ? 0.9 : 1,
    } as Variant,
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0],
        staggerChildren: animation === "stagger" ? 0.1 : 0,
      },
    } as Variant,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          controls.start("visible")
        } else if (!entry.isIntersecting && !once && isVisible) {
          setIsVisible(false)
          controls.start("hidden")
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [controls, isVisible, once, threshold])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

export const AnimatedItem = ({
  children,
  delay = 0,
  className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay,
            ease: [0.25, 0.1, 0.25, 1.0],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
