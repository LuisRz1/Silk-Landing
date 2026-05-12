"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Recycle,
  Star,
  Heart,
  Grid3X3,
  List,
  Wrench,
  Home,
  Upload,
  FileImage,
  Send,
  Gift,
  Coins,
  Printer,
  MapPin,
  Sparkles,
  CheckCircle,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedSection, { AnimatedItem } from "@/components/animated-section"
import AnimatedButton from "@/components/animated-button"
import HexBackground from "@/components/hex-background"
import ScrollProgress from "@/components/scroll-progress"
import { ThemeToggle } from "@/components/theme-toggle"

interface Product {
  id: number
  name: string
  description: string
  image: string
  category: "figuras" | "herramientas" | "decoracion"
  basePriceSoles: number
  maxEcoCoinsDiscount: number
  ecoCoinsToSolesRatio: number
  rating: number
  reviews: number
  inStock: boolean
  featured: boolean
  tags: string[]
}

const products: Product[] = [
  {
    id: 1,
    name: "Figura Decorativa Moderna",
    description: "Elegante figura decorativa impresa en 3D con plástico reciclado de alta calidad.",
    image: "/images/figure1.jpg",
    category: "figuras",
    basePriceSoles: 15,
    maxEcoCoinsDiscount: 20,
    ecoCoinsToSolesRatio: 2.5,
    rating: 4.8,
    reviews: 24,
    inStock: true,
    featured: true,
    tags: ["decorativo", "moderno", "hogar"],
  },
  {
    id: 2,
    name: "Herramienta Multiuso",
    description: "Herramienta versátil para múltiples tareas del hogar y jardín.",
    image: "/images/tool2.jpg",
    category: "herramientas",
    basePriceSoles: 25,
    maxEcoCoinsDiscount: 30,
    ecoCoinsToSolesRatio: 2,
    rating: 4.9,
    reviews: 18,
    inStock: true,
    featured: true,
    tags: ["útil", "jardín", "hogar"],
  },
  {
    id: 3,
    name: "Maceta Decorativa",
    description: "Hermosa maceta para plantas pequeñas, perfecta para interiores.",
    image: "/images/deco1.jpg",
    category: "decoracion",
    basePriceSoles: 20,
    maxEcoCoinsDiscount: 25,
    ecoCoinsToSolesRatio: 3,
    rating: 4.7,
    reviews: 31,
    inStock: true,
    featured: false,
    tags: ["plantas", "decorativo", "interior"],
  },
  {
    id: 4,
    name: "Figura Artística Abstracta",
    description: "Pieza de arte abstracto única, perfecta para coleccionistas.",
    image: "/images/figure2.jpg",
    category: "figuras",
    basePriceSoles: 30,
    maxEcoCoinsDiscount: 35,
    ecoCoinsToSolesRatio: 2.5,
    rating: 4.6,
    reviews: 12,
    inStock: true,
    featured: false,
    tags: ["arte", "abstracto", "colección"],
  },
  {
    id: 5,
    name: "Organizador de Escritorio",
    description: "Mantén tu espacio de trabajo ordenado con este práctico organizador.",
    image: "/images/tool1.jpg",
    category: "herramientas",
    basePriceSoles: 18,
    maxEcoCoinsDiscount: 22,
    ecoCoinsToSolesRatio: 2,
    rating: 4.8,
    reviews: 27,
    inStock: false,
    featured: false,
    tags: ["oficina", "organización", "escritorio"],
  },
  {
    id: 6,
    name: "Lámpara de Mesa Eco",
    description: "Lámpara de diseño sostenible con luz LED integrada.",
    image: "/images/deco2.jpg",
    category: "decoracion",
    basePriceSoles: 45,
    maxEcoCoinsDiscount: 50,
    ecoCoinsToSolesRatio: 3,
    rating: 4.9,
    reviews: 15,
    inStock: true,
    featured: true,
    tags: ["iluminación", "eco", "diseño"],
  },
  {
    id: 7,
    name: "Figura Geométrica Premium",
    description: "Figura geométrica de alta precisión, ideal para decoración minimalista.",
    image: "/images/figure3.jpg",
    category: "figuras",
    basePriceSoles: 22,
    maxEcoCoinsDiscount: 28,
    ecoCoinsToSolesRatio: 2.5,
    rating: 4.7,
    reviews: 19,
    inStock: true,
    featured: false,
    tags: ["geométrico", "minimalista", "premium"],
  },
  {
    id: 8,
    name: "Soporte Ajustable",
    description: "Soporte multiuso ajustable, perfecto para teléfonos, tabletas y más.",
    image: "/images/tool3.jpg",
    category: "herramientas",
    basePriceSoles: 20,
    maxEcoCoinsDiscount: 25,
    ecoCoinsToSolesRatio: 2,
    rating: 4.5,
    reviews: 22,
    inStock: true,
    featured: false,
    tags: ["soporte", "tecnología", "ajustable"],
  },
  {
    id: 9,
    name: "Jarrón Orgánico",
    description: "Jarrón de formas orgánicas inspirado en la naturaleza, impreso con filamento reciclado.",
    image: "/images/deco3.jpg",
    category: "decoracion",
    basePriceSoles: 35,
    maxEcoCoinsDiscount: 40,
    ecoCoinsToSolesRatio: 3,
    rating: 4.8,
    reviews: 9,
    inStock: true,
    featured: false,
    tags: ["jarrón", "orgánico", "naturaleza"],
  },
]

export default function TiendaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const [userEcoCoins] = useState(45)
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.basePriceSoles - b.basePriceSoles
        case "price-high":
          return b.basePriceSoles - a.basePriceSoles
        case "rating":
          return b.rating - a.rating
        default:
          return b.featured ? 1 : -1
      }
    })

  const addToCart = (productId: number) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }))
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const cartItemsCount = Object.values(cart).reduce((sum, count) => sum + count, 0)

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
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Recycle className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">Silk</span>
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.div
              className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Recycle className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">{userEcoCoins} eco-coins</span>
            </motion.div>
            <ThemeToggle />
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      <main className="flex-1">
        {/* Hero */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-accent to-background overflow-hidden">
          <div className="container px-4 md:px-6 text-center">
            <AnimatedSection animation="fadeIn" duration={0.7}>
              <motion.div
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="h-4 w-4" />
                Tienda Oficial Silk
              </motion.div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl/none mb-4">
                Tienda <span className="text-primary">3D Silk</span>
              </h1>
              <p className="mx-auto max-w-[600px] text-muted-foreground text-base leading-relaxed mb-8">
                Intercambia tus bonos verdes por objetos únicos impresos en 3D con plástico reciclado.
                Cada compra apoya la economía circular.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <motion.div
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 rounded-xl border border-primary/20"
                  whileHover={{ scale: 1.03 }}
                >
                  <Recycle className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">
                    Tienes <strong className="text-primary">{userEcoCoins} eco-coins</strong> disponibles
                  </span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 rounded-xl border border-primary/20"
                  whileHover={{ scale: 1.03 }}
                >
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Filamento 100% reciclado</span>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Categories */}
        <section className="w-full py-10 border-b">
          <div className="container px-4 md:px-6">
            <AnimatedSection animation="slideUp">
              <h2 className="text-2xl font-bold mb-6 text-center">Explora por Categorías</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    category: "figuras",
                    title: "Figuras Decorativas",
                    description: "Arte y decoración para tu hogar",
                    icon: <Gift className="h-8 w-8" />,
                    count: products.filter((p) => p.category === "figuras").length,
                  },
                  {
                    category: "herramientas",
                    title: "Herramientas Útiles",
                    description: "Objetos prácticos para el día a día",
                    icon: <Wrench className="h-8 w-8" />,
                    count: products.filter((p) => p.category === "herramientas").length,
                  },
                  {
                    category: "decoracion",
                    title: "Decoración",
                    description: "Elementos decorativos únicos",
                    icon: <Home className="h-8 w-8" />,
                    count: products.filter((p) => p.category === "decoracion").length,
                  },
                ].map((cat, index) => (
                  <AnimatedItem key={cat.category} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all bg-accent/50 hover:bg-accent border-primary/10 hover:border-primary/30 ${
                          selectedCategory === cat.category ? "ring-2 ring-primary border-primary/50" : ""
                        }`}
                        onClick={() =>
                          setSelectedCategory(selectedCategory === cat.category ? "all" : cat.category)
                        }
                      >
                        <CardContent className="p-6 text-center">
                          <div className="mx-auto mb-4 text-primary">{cat.icon}</div>
                          <h3 className="font-bold text-lg mb-2">{cat.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{cat.description}</p>
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                            {cat.count} productos
                          </Badge>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </AnimatedItem>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="w-full py-6 border-b bg-card/50">
          <div className="container px-4 md:px-6">
            <AnimatedSection animation="slideUp">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 items-center flex-wrap justify-center">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="figuras">Figuras</SelectItem>
                      <SelectItem value="herramientas">Herramientas</SelectItem>
                      <SelectItem value="decoracion">Decoración</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Destacados</SelectItem>
                      <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                      <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                      <SelectItem value="rating">Mejor Valorados</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex border rounded-md overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-none"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-none border-l"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Products Grid */}
        <section className="w-full py-10">
          <div className="container px-4 md:px-6">
            <AnimatedSection animation="stagger">
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                }`}
              >
                <AnimatePresence>
                  {filteredProducts.map((product, index) => (
                    <AnimatedItem key={product.id} delay={index * 0.08}>
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card
                          className={`overflow-hidden border-border/60 hover:border-primary/30 hover:shadow-lg transition-all ${
                            !product.inStock ? "opacity-60" : ""
                          } ${viewMode === "list" ? "flex flex-row" : ""}`}
                        >
                          <div className={`relative ${viewMode === "list" ? "w-48 shrink-0" : "h-56"}`}>
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                            {product.featured && (
                              <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                                Destacado
                              </Badge>
                            )}
                            {!product.inStock && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white font-medium">Agotado</span>
                              </div>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                              onClick={() => toggleFavorite(product.id)}
                            >
                              <Heart
                                className={`h-4 w-4 ${
                                  favorites.includes(product.id)
                                    ? "fill-red-500 text-red-500"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </Button>
                          </div>

                          <CardContent className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-bold text-base leading-snug">{product.name}</h3>
                              <div className="flex items-center gap-1 shrink-0 ml-2">
                                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-muted-foreground">
                                  {product.rating} ({product.reviews})
                                </span>
                              </div>
                            </div>
                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-4">
                              {product.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between px-3 py-2 bg-muted/50 rounded-lg">
                                <span className="text-sm text-muted-foreground">Precio base</span>
                                <span className="font-bold text-base">S/ {product.basePriceSoles}</span>
                              </div>
                              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-1.5">
                                    <Recycle className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium text-primary">Con Eco-Coins</span>
                                  </div>
                                  <Badge className="bg-primary text-primary-foreground text-xs">¡Ahorra!</Badge>
                                </div>
                                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                  <span>Descuento:</span>
                                  <span className="text-primary font-medium">
                                    - S/{" "}
                                    {Math.min(
                                      product.maxEcoCoinsDiscount / product.ecoCoinsToSolesRatio,
                                      userEcoCoins / product.ecoCoinsToSolesRatio,
                                    ).toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between font-bold text-sm">
                                  <span>Total:</span>
                                  <span>
                                    S/{" "}
                                    {(
                                      product.basePriceSoles -
                                      Math.min(
                                        product.maxEcoCoinsDiscount / product.ecoCoinsToSolesRatio,
                                        userEcoCoins / product.ecoCoinsToSolesRatio,
                                      )
                                    ).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                              <AnimatedButton
                                className="w-full bg-primary hover:bg-primary/90 silk-glow text-sm"
                                disabled={!product.inStock || userEcoCoins < product.ecoCoinsToSolesRatio}
                                onClick={() => addToCart(product.id)}
                                whileHover={{ scale: 1.02 }}
                              >
                                {userEcoCoins < product.ecoCoinsToSolesRatio
                                  ? "Sin eco-coins suficientes"
                                  : "Comprar con descuento"}
                              </AnimatedButton>
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={!product.inStock}
                                onClick={() => addToCart(product.id)}
                                className="w-full text-sm"
                              >
                                Precio completo "” S/ {product.basePriceSoles}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </AnimatedItem>
                  ))}
                </AnimatePresence>
              </div>
              {filteredProducts.length === 0 && (
                <motion.div className="text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="text-muted-foreground text-lg">
                    No se encontraron productos que coincidan con tu búsqueda.
                  </p>
                </motion.div>
              )}
            </AnimatedSection>
          </div>
        </section>

        {/* CTA "” Recicla más */}
        <section className="w-full py-12 md:py-16 bg-primary text-primary-foreground overflow-hidden relative z-10">
          <div className="container px-4 md:px-6 text-center">
            <AnimatedSection animation="fadeIn" duration={0.8}>
              <motion.h2
                className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                ¿Necesitas más eco-coins?
              </motion.h2>
              <motion.p
                className="mx-auto max-w-[600px] text-primary-foreground/80 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                Trae más botellas recicladas a nuestros puntos de recolección y acumula más bonos para canjear productos.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
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
                  <Link href="/#contacto">
                    <MapPin className="mr-2 h-5 w-5" />
                    Encontrar puntos de recolección
                  </Link>
                </AnimatedButton>
                <AnimatedButton
                  variant="outline"
                  className="border-background bg-background text-primary hover:bg-background/90 text-base px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  asChild
                >
                  <Link href="/#bonos-verdes">Como funcionan los bonos</Link>
                </AnimatedButton>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* Publica tus modelos */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <AnimatedSection animation="fadeIn">
              <div className="rounded-2xl border border-primary/20 bg-card p-8 md:p-10">
                <div className="text-center mb-10">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  >
                    <Upload className="h-8 w-8 text-primary" />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-3">¿Te gustaría publicar tus modelos 3D?</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Únete a nuestra comunidad de creadores y comparte tus diseños únicos. Gana eco-coins por cada venta.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-6">
                    {[
                      {
                        icon: <FileImage className="h-5 w-5 text-primary" />,
                        title: "Sube tus diseños",
                        desc: "Comparte archivos STL, OBJ u otros formatos compatibles con nuestra plataforma.",
                      },
                      {
                        icon: <Coins className="h-5 w-5 text-primary" />,
                        title: "Gana eco-coins",
                        desc: "Recibe eco-coins por cada venta. Mientras más popular sea tu diseño, más ganas.",
                      },
                      {
                        icon: <Recycle className="h-5 w-5 text-primary" />,
                        title: "Impacto sostenible",
                        desc: "Tus diseños se imprimen con plástico reciclado, contribuyendo a un futuro más verde.",
                      },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{item.title}</h3>
                          <p className="text-muted-foreground text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex flex-wrap gap-4 pt-2">
                      {["+50 creadores activos", "Comisión: 15%", "Pago en eco-coins"].map((stat) => (
                        <div key={stat} className="flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                          <span className="text-xs font-medium">{stat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-5">Comenzar a publicar</h3>
                    <form className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Nombre del creador</label>
                        <Input placeholder="Tu nombre o marca" />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Email de contacto</label>
                        <Input type="email" placeholder="tu@email.com" />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Categoría principal</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="figuras">Figuras Decorativas</SelectItem>
                            <SelectItem value="herramientas">Herramientas Útiles</SelectItem>
                            <SelectItem value="decoracion">Decoración</SelectItem>
                            <SelectItem value="juguetes">Juguetes</SelectItem>
                            <SelectItem value="accesorios">Accesorios</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Experiencia en diseño 3D</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu nivel" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="principiante">Principiante (menos de 1 año)</SelectItem>
                            <SelectItem value="intermedio">Intermedio (1-3 años)</SelectItem>
                            <SelectItem value="avanzado">Avanzado (3+ años)</SelectItem>
                            <SelectItem value="profesional">Profesional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Portfolio (opcional)</label>
                        <Input placeholder="https://tu-portfolio.com" />
                      </div>
                      <AnimatedButton className="w-full bg-primary hover:bg-primary/90 silk-glow" whileHover={{ scale: 1.02 }}>
                        <Send className="mr-2 h-4 w-4" />
                        Solicitar acceso como creador
                      </AnimatedButton>
                      <p className="text-xs text-muted-foreground text-center">
                        Te contactaremos en 24-48 horas para revisar tu solicitud
                      </p>
                    </form>
                  </Card>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Tienes impresora 3D */}
        <section className="w-full py-12 md:py-16 bg-accent/30">
          <div className="container px-4 md:px-6">
            <AnimatedSection animation="fadeIn">
              <div className="rounded-2xl border border-primary/20 bg-card p-8 md:p-10">
                <div className="text-center mb-10">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  >
                    <Printer className="h-8 w-8 text-primary" />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-3">¿Tienes una impresora 3D?</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Únete a nuestra red de impresores y gana eco-coins ofreciendo servicios de impresión con plástico reciclado.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-6">
                    {[
                      {
                        icon: <Printer className="h-5 w-5 text-primary" />,
                        title: "Ofrece tus servicios",
                        desc: "Registra tu impresora 3D y especifica tus capacidades, materiales y área de cobertura.",
                      },
                      {
                        icon: <Coins className="h-5 w-5 text-primary" />,
                        title: "Gana eco-coins",
                        desc: "Recibe eco-coins por cada trabajo completado. Tarifas competitivas y pagos seguros.",
                      },
                      {
                        icon: <MapPin className="h-5 w-5 text-primary" />,
                        title: "Red local",
                        desc: "Conecta con usuarios de tu zona para entregas rápidas y reducir la huella de carbono.",
                      },
                      {
                        icon: <Recycle className="h-5 w-5 text-primary" />,
                        title: "Plástico reciclado",
                        desc: "Trabajamos con filamentos de plástico reciclado, contribuyendo a la economía circular.",
                      },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{item.title}</h3>
                          <p className="text-muted-foreground text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { zone: "Lima Norte", printers: 8, time: "2-3 días", rating: 4.8 },
                        { zone: "Lima Centro", printers: 12, time: "1-2 días", rating: 4.9 },
                        { zone: "Lima Sur", printers: 5, time: "3-4 días", rating: 4.7 },
                      ].map((z, i) => (
                        <motion.div
                          key={z.zone}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="text-center p-3 bg-accent rounded-lg"
                        >
                          <h4 className="font-bold text-xs text-primary mb-1">{z.zone}</h4>
                          <div className="text-xs text-muted-foreground space-y-0.5">
                            <div>{z.printers} impresores</div>
                            <div>{z.time}</div>
                            <div className="flex items-center justify-center gap-0.5">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{z.rating}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {["+25 impresores activos", "Comisión: 10%", "Pago en eco-coins"].map((stat) => (
                        <div key={stat} className="flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                          <span className="text-xs font-medium">{stat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-5">Registrar impresora</h3>
                    <form className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Nombre del servicio</label>
                        <Input placeholder="Ej: Impresiones 3D Lima Norte" />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Email de contacto</label>
                        <Input type="email" placeholder="tu@email.com" />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Modelo de impresora</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu impresora" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ender3">Creality Ender 3</SelectItem>
                            <SelectItem value="prusa">Prusa i3 MK3S+</SelectItem>
                            <SelectItem value="bambu">Bambu Lab X1 Carbon</SelectItem>
                            <SelectItem value="ultimaker">Ultimaker S3/S5</SelectItem>
                            <SelectItem value="formlabs">Formlabs Form 3</SelectItem>
                            <SelectItem value="other">Otra</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Volumen de impresión</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Tamaño máximo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Pequeño (hasta 20×20×20 cm)</SelectItem>
                            <SelectItem value="medium">Mediano (hasta 30×30×30 cm)</SelectItem>
                            <SelectItem value="large">Grande (más de 30×30×30 cm)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Ubicación (distrito/ciudad)</label>
                        <Input placeholder="Ej: San Isidro, Lima" />
                      </div>
                      <AnimatedButton className="w-full bg-primary hover:bg-primary/90 silk-glow" whileHover={{ scale: 1.02 }}>
                        <Printer className="mr-2 h-4 w-4" />
                        Registrar como impresor
                      </AnimatedButton>
                      <p className="text-xs text-muted-foreground text-center">
                        Verificaremos tu equipo y te contactaremos en 24-48 horas
                      </p>
                    </form>
                  </Card>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-8 bg-card">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Recycle className="h-5 w-5 text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Silk. Todos los derechos reservados.
            </p>
          </div>
          <nav className="flex gap-6">
            {["Términos", "Privacidad", "Cookies"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
