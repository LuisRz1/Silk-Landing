"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type { ButtonProps } from "@/components/ui/button"

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode
  whileHover?: object
  whileTap?: object
}

export default function AnimatedButton({
  children,
  whileHover = { scale: 1.05 },
  whileTap = { scale: 0.95 },
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={whileHover}
      whileTap={whileTap}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  )
}
