import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Silk - Red Colaborativa de Reciclaje e Impresion 3D",
  description:
    "Silk es la primera red colaborativa que conecta recicladores con impresion 3D. Recicla botellas, gana bonos verdes y accede a figuras, filamentos y plantillas 3D gratuitas.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning className="bg-background">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
