"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-full">
        <div className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="rounded-full border-2 hover:border-green-300 dark:hover:border-green-600 transition-colors"
      >
        <motion.div
          initial={false}
          animate={{
            scale: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : 90,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Sun className="h-4 w-4 text-yellow-500" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : -90,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Moon className="h-4 w-4 text-blue-400" />
        </motion.div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
}
