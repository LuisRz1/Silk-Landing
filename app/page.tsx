"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Recycle,
  Gift,
  Leaf,
  TreePine,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  ShoppingCart,
  Coins,
  Store,
  Percent,
  Printer,
  Users,
  Network,
  Zap,
  Upload,
  Download,
  Box,
  Sparkles,
  Award,
  Heart,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import { motion } from "framer-motion"
import AnimatedSection, { AnimatedItem } from "@/components/animated-section"
import ParallaxSection from "@/components/parallax-section"
import ScrollProgress from "@/components/scroll-progress"
import AnimatedCounter from "@/components/animated-counter"
import AnimatedButton from "@/components/animated-button"
import HexBackground from "@/components/hex-background"
import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col relative">
      <HexBackground opacity={0.12} />
      <ScrollProgress />

      {/* Header */}
      <motion.header
        className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Recycle className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">Silk</span>
          </motion.div>
          <nav className="hidden md:flex gap-6">
            {["bonos-verdes", "tienda-3d", "plantillas", "red-colaborativa", "beneficios", "contacto"].map(
              (item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <Link href={`#${item}`} className="text-sm font-medium transition-colors hover:text-primary">
                    {item === "bonos-verdes"
                      ? "Bonos Verdes"
                      : item === "tienda-3d"
                        ? "Tienda 3D"
                        : item === "red-colaborativa"
                          ? "Red Colaborativa"
                          : item
                              .split("-")
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(" ")}
                  </Link>
                </motion.div>
              ),
            )}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <AnimatedButton className="bg-primary hover:bg-primary/90 silk-glow" asChild>
              <Link href="/tienda">Ir a la tienda</Link>
            </AnimatedButton>
          </div>
        </div>
      </motion.header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 lg:py-24 bg-gradient-to-b from-accent to-background overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <AnimatedSection animation="slideRight" duration={0.7}>
                <div className="space-y-6">
                  <motion.div
                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sparkles className="h-4 w-4" />
                    Red Colaborativa de Reciclaje
                  </motion.div>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl/none text-balance">
                    Recicla botellas, gana{" "}
                    <span className="text-primary">Bonos Verdes</span> y accede a{" "}
                    <span className="text-primary">impresion 3D</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-base leading-relaxed">
                    Silk es la primera red colaborativa que transforma tu reciclaje en descuentos reales. 
                    Deposita botellas de plastico en nuestras zonas, acumula bonos verdes y canjalos por 
                    filamentos, figuras impresas en 3D o descarga plantillas gratuitas de nuestra comunidad.
                  </p>
                  <div className="flex flex-col gap-3 min-[400px]:flex-row">
                    <AnimatedButton
                      className="bg-primary hover:bg-primary/90 silk-glow text-base px-6 py-3"
                      whileHover={{ scale: 1.05, boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.15)" }}
                      asChild
                    >
                      <Link href="/tienda">
                        Explorar tienda 3D
                        <Printer className="ml-2 h-5 w-5" />
                      </Link>
                    </AnimatedButton>
                    <AnimatedButton variant="outline" className="text-base px-6 py-3" whileHover={{ scale: 1.05 }} asChild>
                      <Link href="#bonos-verdes">
                        Como obtener bonos
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </AnimatedButton>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slideLeft" duration={0.7} delay={0.2}>
                <ParallaxSection
                  speed={0.1}
                  direction="up"
                  className="relative h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/images/hero-recycling.jpg"
                    alt="Red colaborativa de reciclaje e impresion 3D"
                    fill
                    className="object-cover"
                    priority
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                </ParallaxSection>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Por que Silk - Cualidades destacadas */}
        <section className="w-full py-10 md:py-14 border-b">
          <div className="container px-4 md:px-6">
            <AnimatedSection animation="stagger" className="grid gap-8 md:grid-cols-4">
              {[
                {
                  icon: <Recycle className="h-8 w-8" />,
                  title: "Economia Circular",
                  description: "Transformamos botellas en filamento para impresion 3D",
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Comunidad Activa",
                  description: "Disenadores comparten plantillas 3D gratuitas",
                },
                {
                  icon: <Gift className="h-8 w-8" />,
                  title: "Recompensas Reales",
                  description: "Bonos verdes canjeables por productos y descuentos",
                },
                {
                  icon: <Heart className="h-8 w-8" />,
                  title: "Regalo de Bienvenida",
                  description: "Figura de plastico gratis como agradecimiento",
                },
              ].map((item, index) => (
                <AnimatedItem key={index} delay={index * 0.1}>
                  <motion.div
                    className="flex flex-col items-center text-center p-6 rounded-xl bg-card border hover:border-primary/50 transition-all"
                    whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                </AnimatedItem>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* Bonos Verdes Section */}
        <section id="bonos-verdes" className="w-full py-12 md:py-16 lg:py-20 bg-accent">
          <div className="container px-4 md:px-6">
            <AnimatedSection
              animation="fadeIn"
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <div className="space-y-3">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Coins className="h-4 w-4" />
                  Sistema de Recompensas
                </motion.div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
                  Gana <span className="text-primary">Bonos Verdes</span> reciclando
                </h2>
                <p className="max-w-[800px] text-muted-foreground text-base leading-relaxed">
                  Cada botella de plastico que deposites en las zonas Silk te genera bonos verdes. 
                  Usalos para obtener descuentos en filamentos, figuras impresas en 3D y mas. 
                  Ademas, recibe una figura de plastico de regalo como agradecimiento por tu aporte al medio ambiente.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid gap-8 lg:grid-cols-2 items-start mb-12">
              <AnimatedSection animation="slideRight" duration={0.7}>
                <div className="space-y-6">
                  <Card className="p-6 border-primary/20 bg-card">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <Recycle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Deposita en Zonas Silk</h3>
                        <p className="text-muted-foreground">
                          Lleva tus botellas de plastico a cualquiera de nuestros puntos de recoleccion. 
                          Por cada botella recibes bonos verdes automaticamente en tu cuenta.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-primary/20 bg-card">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <Percent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Descuentos en Filamentos</h3>
                        <p className="text-muted-foreground">
                          Usa tus bonos verdes para obtener hasta 50% de descuento en filamentos de plastico 
                          para tu impresora 3D. Mas reciclas, mas ahorras.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-primary/20 bg-card">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <Gift className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Regalo de Agradecimiento</h3>
                        <p className="text-muted-foreground">
                          Como muestra de gratitud por tu compromiso ambiental, Silk te obsequia una figura 
                          de plastico impresa en 3D totalmente gratis. Un detalle unico hecho con material reciclado.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slideLeft" duration={0.7} delay={0.2}>
                <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <h3 className="text-2xl font-bold mb-6 text-center">Ejemplo de Descuento</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-primary/10">
                      <span className="font-medium">Filamento PLA 1kg</span>
                      <span className="font-bold text-lg">S/ 45.00</span>
                    </div>
                    <div className="flex justify-between items-center py-3 text-primary">
                      <span className="flex items-center gap-2">
                        <Coins className="h-4 w-4" />
                        Descuento con 30 bonos verdes:
                      </span>
                      <span className="font-bold text-lg">- S/ 18.00</span>
                    </div>
                    <hr className="border-primary/20" />
                    <div className="flex justify-between items-center py-3 text-xl font-bold">
                      <span>Total a pagar:</span>
                      <span className="text-primary">S/ 27.00</span>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <p className="text-primary font-semibold">Ahorraste 40% + figura de regalo</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 mt-6 bg-card border-2 border-primary/30">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0">
                      <Award className="h-8 w-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Figura de Bienvenida Gratis</h4>
                      <p className="text-muted-foreground text-sm">
                        Al registrarte y reciclar tu primera botella, recibe una figura decorativa 
                        impresa en 3D como obsequio de Silk.
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            </div>

            {/* Stats */}
            <AnimatedSection animation="stagger" className="grid gap-6 md:grid-cols-4">
              {[
                { icon: <Coins className="h-8 w-8 text-primary" />, title: "Bonos Generados", value: 50000, suffix: "+" },
                { icon: <Recycle className="h-8 w-8 text-primary" />, title: "Botellas Recicladas", value: 25000, suffix: "+" },
                { icon: <Percent className="h-8 w-8 text-primary" />, title: "Descuento Promedio", value: 40, suffix: "%" },
                { icon: <Gift className="h-8 w-8 text-primary" />, title: "Figuras Regaladas", value: 1500, suffix: "+" },
              ].map((stat, index) => (
                <AnimatedItem key={index} delay={index * 0.1}>
                  <Card className="text-center p-6">
                    <div className="flex justify-center mb-4">{stat.icon}</div>
                    <div className="text-3xl font-bold mb-2 text-primary">
                      <AnimatedCounter from={0} to={stat.value} duration={2} />
                      {stat.suffix}
                    </div>
                    <p className="text-muted-foreground font-medium">{stat.title}</p>
                  </Card>
                </AnimatedItem>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* Tienda 3D Section */}
        <section id="tienda-3d" className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <AnimatedSection
              animation="fadeIn"
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-3">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Printer className="h-4 w-4" />
                  Tienda Online
                </motion.div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
                  Productos de <span className="text-primary">Impresion 3D</span>
                </h2>
                <p className="max-w-[800px] text-muted-foreground text-base leading-relaxed">
                  Explora nuestra tienda con figuras de plastico impresas en 3D, filamentos de alta calidad 
                  para tu impresora y accesorios unicos. Todo con descuentos usando tus bonos verdes.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.3} className="mt-12 w-full max-w-5xl mx-auto">
              <Tabs defaultValue="figuras" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  {[
                    { value: "figuras", label: "Figuras 3D", icon: <Box className="h-4 w-4" /> },
                    { value: "filamentos", label: "Filamentos", icon: <Printer className="h-4 w-4" /> },
                    { value: "accesorios", label: "Accesorios", icon: <Sparkles className="h-4 w-4" /> },
                  ].map((tab, index) => (
                    <motion.div
                      key={tab.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index + 0.5, duration: 0.5 }}
                      className="w-full"
                    >
                      <TabsTrigger value={tab.value} className="w-full gap-2">
                        {tab.icon}
                        {tab.label}
                      </TabsTrigger>
                    </motion.div>
                  ))}
                </TabsList>

                {[
                  {
                    value: "figuras",
                    items: [
                      {
                        image: "/images/figure1.jpg",
                        title: "Dragon decorativo",
                        description: "Figura detallada impresa en PLA reciclado",
                        price: 25,
                        bonos: 15,
                        finalPrice: 15,
                      },
                      {
                        image: "/images/figure2.jpg",
                        title: "Maceta geometrica",
                        description: "Diseno moderno para plantas pequenas",
                        price: 18,
                        bonos: 10,
                        finalPrice: 12,
                      },
                      {
                        image: "/images/figure3.jpg",
                        title: "Figura articulada",
                        description: "Muneco movil con articulaciones flexibles",
                        price: 35,
                        bonos: 20,
                        finalPrice: 22,
                      },
                    ],
                  },
                  {
                    value: "filamentos",
                    items: [
                      {
                        image: "/images/tool1.jpg",
                        title: "PLA Reciclado 1kg",
                        description: "Filamento eco-friendly de alta calidad",
                        price: 45,
                        bonos: 30,
                        finalPrice: 27,
                      },
                      {
                        image: "/images/tool2.jpg",
                        title: "PETG Premium 1kg",
                        description: "Mayor resistencia y durabilidad",
                        price: 55,
                        bonos: 35,
                        finalPrice: 35,
                      },
                      {
                        image: "/images/tool3.jpg",
                        title: "Pack Multicolor 500g",
                        description: "5 colores variados para tus proyectos",
                        price: 40,
                        bonos: 25,
                        finalPrice: 25,
                      },
                    ],
                  },
                  {
                    value: "accesorios",
                    items: [
                      {
                        image: "/images/deco1.jpg",
                        title: "Organizador de cables",
                        description: "Mantiene tu escritorio ordenado",
                        price: 12,
                        bonos: 8,
                        finalPrice: 7,
                      },
                      {
                        image: "/images/deco2.jpg",
                        title: "Soporte para celular",
                        description: "Diseno ergonomico ajustable",
                        price: 15,
                        bonos: 10,
                        finalPrice: 9,
                      },
                      {
                        image: "/images/deco3.jpg",
                        title: "Llavero personalizable",
                        description: "Anade tu nombre o diseno",
                        price: 8,
                        bonos: 5,
                        finalPrice: 5,
                      },
                    ],
                  },
                ].map((category) => (
                  <TabsContent key={category.value} value={category.value} className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {category.items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          whileHover={{
                            y: -8,
                            boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <Card className="overflow-hidden h-full">
                            <div className="relative h-52">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                                -{Math.round((1 - item.finalPrice / item.price) * 100)}%
                              </div>
                            </div>
                            <CardContent className="p-5">
                              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                              <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-muted-foreground line-through">S/ {item.price}</span>
                                  <span className="text-primary font-bold text-xl">S/ {item.finalPrice}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Coins className="h-3 w-3" />
                                  Con {item.bonos} bonos verdes
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </AnimatedSection>

            <AnimatedSection animation="fadeIn" delay={0.5} className="text-center mt-10">
              <AnimatedButton
                className="bg-primary hover:bg-primary/90 silk-glow text-base px-8 py-3"
                whileHover={{ scale: 1.05 }}
                asChild
              >
                <Link href="/tienda">
                  Ver toda la tienda
                  <ShoppingCart className="ml-2 h-5 w-5" />
                </Link>
              </AnimatedButton>
            </AnimatedSection>
          </div>
        </section>

        {/* Plantillas Gratuitas Section */}
        <section id="plantillas" className="w-full py-12 md:py-16 lg:py-20 bg-accent">
          <div className="container px-4 md:px-6">
            <AnimatedSection
              animation="fadeIn"
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <div className="space-y-3">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Download className="h-4 w-4" />
                  Comunidad
                </motion.div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
                  Plantillas 3D <span className="text-primary">Gratuitas</span>
                </h2>
                <p className="max-w-[800px] text-muted-foreground text-base leading-relaxed">
                  Nuestra comunidad de disenadores comparte plantillas y planos de impresion 3D totalmente gratis. 
                  Descarga los archivos STL y crea tus propias figuras con tu impresora.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="stagger" className="grid gap-6 md:grid-cols-3 mb-12">
              {[
                {
                  icon: <Download className="h-10 w-10" />,
                  title: "Descarga Gratuita",
                  description: "Accede a cientos de modelos STL sin costo alguno",
                  count: "500+",
                  label: "modelos disponibles",
                },
                {
                  icon: <Upload className="h-10 w-10" />,
                  title: "Comparte tus Disenos",
                  description: "Sube tus creaciones y ayuda a la comunidad",
                  count: "150+",
                  label: "disenadores activos",
                },
                {
                  icon: <Users className="h-10 w-10" />,
                  title: "Comunidad Activa",
                  description: "Conecta con otros entusiastas de la impresion 3D",
                  count: "2000+",
                  label: "miembros",
                },
              ].map((item, index) => (
                <AnimatedItem key={index} delay={index * 0.15}>
                  <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="p-8 text-center h-full border-2 hover:border-primary/30 transition-colors">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto mb-6">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <div className="pt-4 border-t">
                        <span className="text-3xl font-bold text-primary">{item.count}</span>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                      </div>
                    </Card>
                  </motion.div>
                </AnimatedItem>
              ))}
            </AnimatedSection>

            <AnimatedSection animation="fadeIn" className="text-center">
              <AnimatedButton variant="outline" className="text-base px-8 py-3" whileHover={{ scale: 1.05 }}>
                <Link href="#" className="flex items-center gap-2">
                  Explorar plantillas
                  <Download className="h-5 w-5" />
                </Link>
              </AnimatedButton>
            </AnimatedSection>
          </div>
        </section>

        {/* Red Colaborativa Section */}
        <section id="red-colaborativa" className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <AnimatedSection
              animation="fadeIn"
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <div className="space-y-3">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Network className="h-4 w-4" />
                  Ecosistema Silk
                </motion.div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
                  Una <span className="text-primary">Red Colaborativa</span> Sostenible
                </h2>
                <p className="max-w-[800px] text-muted-foreground text-base leading-relaxed">
                  Silk conecta a recicladores, disenadores e impresores locales en un ecosistema donde todos ganan. 
                  Tu reciclaje se transforma en productos unicos mientras apoyas a la comunidad.
                </p>
              </div>
            </AnimatedSection>

            {/* Network Visualization */}
            <AnimatedSection animation="stagger" className="mb-16">
              <div className="relative max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  {/* Recicladores */}
                  <AnimatedItem delay={0}>
                    <motion.div whileHover={{ scale: 1.03 }} className="text-center">
                      <Card className="p-6 bg-gradient-to-br from-accent to-background border-primary/20">
                        <motion.div
                          className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.7 }}
                        >
                          <Recycle className="h-8 w-8 text-primary" />
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2">Recicladores</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          Depositan botellas y ganan bonos verdes
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span>Bonos por cada botella</span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span>Figura de regalo</span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </AnimatedItem>

                  {/* Conexion Central */}
                  <AnimatedItem delay={0.2}>
                    <div className="text-center relative">
                      <motion.div
                        className="inline-flex items-center justify-center w-24 h-24 bg-primary rounded-full mb-4 shadow-lg silk-glow"
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <Network className="h-12 w-12 text-primary-foreground" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-2">Plataforma Silk</h3>
                      <p className="text-muted-foreground text-sm">
                        Conecta reciclaje con impresion 3D local
                      </p>
                    </div>
                  </AnimatedItem>

                  {/* Impresores */}
                  <AnimatedItem delay={0.4}>
                    <motion.div whileHover={{ scale: 1.03 }} className="text-center">
                      <Card className="p-6 bg-gradient-to-br from-accent to-background border-primary/20">
                        <motion.div
                          className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.7 }}
                        >
                          <Printer className="h-8 w-8 text-primary" />
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2">Impresores</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          Crean productos con filamento reciclado
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span>+30 impresores locales</span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span>Entrega rapida</span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </AnimatedItem>
                </div>
              </div>
            </AnimatedSection>

            {/* Network Stats */}
            <AnimatedSection animation="stagger" className="grid gap-6 md:grid-cols-4">
              {[
                { icon: <Users className="h-8 w-8 text-primary" />, title: "Comunidad Activa", value: 2500, suffix: "+" },
                { icon: <Network className="h-8 w-8 text-primary" />, title: "Conexiones", value: 5000, suffix: "+" },
                { icon: <Zap className="h-8 w-8 text-primary" />, title: "Dias Promedio", value: 3, suffix: "" },
                { icon: <MapPin className="h-8 w-8 text-primary" />, title: "Zonas Silk", value: 20, suffix: "+" },
              ].map((stat, index) => (
                <AnimatedItem key={index} delay={index * 0.1}>
                  <Card className="text-center p-6">
                    <div className="flex justify-center mb-4">{stat.icon}</div>
                    <div className="text-3xl font-bold mb-2">
                      <AnimatedCounter from={0} to={stat.value} duration={2} />
                      {stat.suffix}
                    </div>
                    <p className="text-muted-foreground font-medium">{stat.title}</p>
                  </Card>
                </AnimatedItem>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* Beneficios */}
        <section id="beneficios" className="w-full py-12 md:py-16 lg:py-20 bg-accent">
          <div className="container px-4 md:px-6">
            <AnimatedSection
              animation="fadeIn"
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-3">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Leaf className="h-4 w-4" />
                  Impacto Positivo
                </motion.div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
                  Por que elegir <span className="text-primary">Silk</span>
                </h2>
                <p className="max-w-[800px] text-muted-foreground text-base leading-relaxed">
                  Al participar en Silk, contribuyes al medio ambiente mientras obtienes beneficios reales.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection
              animation="stagger"
              className="mx-auto grid max-w-5xl items-stretch gap-6 py-12 lg:grid-cols-3"
            >
              {[
                {
                  icon: <Leaf className="h-12 w-12 mx-auto mb-4 text-primary" />,
                  title: "Economia Circular",
                  description: "Transformamos las botellas que reciclas en filamento para impresion 3D, cerrando el ciclo de vida del plastico.",
                },
                {
                  icon: <Coins className="h-12 w-12 mx-auto mb-4 text-primary" />,
                  title: "Ahorro Real",
                  description: "Tus bonos verdes se convierten en descuentos de hasta 50% en filamentos, figuras y accesorios de impresion 3D.",
                },
                {
                  icon: <TreePine className="h-12 w-12 mx-auto mb-4 text-primary" />,
                  title: "Menor Huella de Carbono",
                  description: "Reducimos las emisiones de CO2 al reciclar plastico localmente y producir cerca de ti.",
                },
              ].map((benefit, index) => (
                <AnimatedItem key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="h-full"
                  >
                    <Card className="text-center p-8 border-2 hover:border-primary/30 transition-all h-full">
                      <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.7 }}>
                        {benefit.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </Card>
                  </motion.div>
                </AnimatedItem>
              ))}
            </AnimatedSection>

            <AnimatedSection animation="fadeIn" delay={0.5} className="text-center mt-8">
              <motion.div
                className="inline-flex items-center justify-center rounded-full bg-primary/10 px-6 py-2 text-primary font-medium"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span>+</span>
                <AnimatedCounter from={0} to={25000} duration={2.5} className="mx-1" />
                <span>botellas recicladas hasta ahora</span>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <AnimatedSection animation="slideRight" duration={0.7}>
                <div className="space-y-6">
                  <motion.div
                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <MapPin className="h-4 w-4" />
                    Zonas Silk
                  </motion.div>
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                    Encuentra tu zona de reciclaje
                  </h2>
                  <p className="text-muted-foreground text-base">
                    Visita cualquiera de nuestros puntos de recoleccion para depositar botellas y comenzar a ganar bonos verdes.
                  </p>

                  <div className="space-y-3">
                    {[
                      "Centro Comercial Real Plaza - Lima Centro",
                      "Mall del Sur - San Juan de Miraflores",
                      "Mega Plaza - Lima Norte",
                    ].map((address, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-accent"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <p className="font-medium">{address}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-6">
                    {[
                      { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                      { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
                      { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                    ].map((social, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.5, type: "spring" }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Button variant="outline" size="icon" className="rounded-full">
                          {social.icon}
                          <span className="sr-only">{social.label}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slideLeft" duration={0.7} delay={0.3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <Card className="p-8">
                    <h3 className="text-xl font-bold mb-6">Contactanos</h3>
                    <form className="space-y-5">
                      <div className="grid gap-5">
                        {[
                          { id: "name", label: "Nombre", type: "text", placeholder: "Tu nombre" },
                          { id: "email", label: "Email", type: "email", placeholder: "tu@email.com" },
                        ].map((field, index) => (
                          <motion.div
                            key={field.id}
                            className="grid gap-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                          >
                            <label htmlFor={field.id} className="text-sm font-medium">
                              {field.label}
                            </label>
                            <input
                              id={field.id}
                              type={field.type}
                              className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              placeholder={field.placeholder}
                            />
                          </motion.div>
                        ))}
                        <motion.div
                          className="grid gap-2"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                        >
                          <label htmlFor="message" className="text-sm font-medium">
                            Mensaje
                          </label>
                          <textarea
                            id="message"
                            className="flex min-h-[120px] w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="Tu mensaje"
                          />
                        </motion.div>
                      </div>
                      <AnimatedButton
                        className="w-full bg-primary hover:bg-primary/90 silk-glow py-3"
                        whileHover={{ scale: 1.02 }}
                      >
                        Enviar mensaje
                      </AnimatedButton>
                    </form>
                  </Card>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-primary text-primary-foreground overflow-hidden relative z-10">
          <ParallaxSection speed={0.1} direction="up" className="container px-4 md:px-6 text-center">
            <AnimatedSection animation="fadeIn" duration={0.8}>
              <motion.h2
                className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                Unete a la red Silk hoy
              </motion.h2>
              <motion.p
                className="mx-auto mt-4 max-w-[700px] text-primary-foreground/80 text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                Recicla botellas, gana bonos verdes, obtiene descuentos en filamentos y figuras 3D, 
                y recibe una figura de regalo. Cada botella cuenta.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                <AnimatedButton
                  className="bg-background text-primary hover:bg-background/90 text-base px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  asChild
                >
                  <Link href="/tienda">
                    Explorar tienda 3D
                    <Printer className="ml-2 h-5 w-5" />
                  </Link>
                </AnimatedButton>
                <AnimatedButton
                  variant="outline"
                  className="border-background bg-background text-primary hover:bg-background/90 text-base px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  asChild
                >
                  <Link href="#contacto">
                    Encontrar zonas Silk
                    <MapPin className="ml-2 h-5 w-5" />
                  </Link>
                </AnimatedButton>
              </motion.div>
            </AnimatedSection>
          </ParallaxSection>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-8 md:py-0 bg-card">
        <div className="container flex flex-col items-center justify-between gap-6 md:h-24 md:flex-row">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Recycle className="h-5 w-5 text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Silk. Todos los derechos reservados.
            </p>
          </motion.div>
          <motion.nav
            className="flex gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {["Terminos", "Privacidad", "Cookies"].map((item) => (
              <motion.div key={item} whileHover={{ scale: 1.05 }}>
                <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {item}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        </div>
      </footer>
    </div>
  )
}
