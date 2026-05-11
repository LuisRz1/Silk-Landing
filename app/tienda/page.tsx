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
  DollarSign,
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
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedSection, { AnimatedItem } from "@/components/animated-section"
import { ThemeToggle } from "@/components/theme-toggle"

interface Product {
  id: number
  name: string
  description: string
  image: string
  category: "figuras" | "herramientas" | "decoracion"
  basePriceSoles: number // Precio base en soles
  maxEcoCoinsDiscount: number // Máximo eco-coins que se pueden usar
  ecoCoinsToSolesRatio: number // Cuántos eco-coins equivalen a 1 sol
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
    image: "/images/figure1.png",
    category: "figuras",
    basePriceSoles: 15,
    maxEcoCoinsDiscount: 20,
    ecoCoinsToSolesRatio: 2.5, // 2.5 eco-coins = 1 sol de descuento
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
    image: "/images/tool2.png",
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
    image: "/images/deco1.png",
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
    image: "/images/figure2.png",
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
    image: "/images/tool1.png",
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
    image: "/images/deco2.png",
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
]

export default function TiendaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const [userEcoCoins, setUserEcoCoins] = useState(45) // Eco-coins del usuario
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
        case "bottles-low":
          return a.basePriceSoles - b.basePriceSoles
        case "bottles-high":
          return b.basePriceSoles - a.basePriceSoles
        default:
          return b.featured ? 1 : -1
      }
    })

  const addToCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const cartItemsCount = Object.values(cart).reduce((sum, count) => sum + count, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5" />
              <Recycle className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold text-green-600">Silk</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Recycle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">{userEcoCoins} eco-coins</span>
            </div>

            <ThemeToggle />

            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-green-600">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Hero Section */}
        <AnimatedSection animation="fadeIn" className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Tienda <span className="text-green-600">Silk</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Intercambia tus botellas por objetos únicos impresos en 3D
          </p>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <Recycle className="h-5 w-5 text-green-600" />
              <span className="text-sm">
                Tienes <strong>{userEcoCoins} eco-coins</strong> para descuentos
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <span className="text-sm">
                <strong>1 eco-coin</strong> = descuento en productos
              </span>
            </div>
          </div>
        </AnimatedSection>

        {/* Categories Section */}
        <AnimatedSection animation="slideUp" className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Explora por Categorías</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                category: "figuras",
                title: "Figuras Decorativas",
                description: "Arte y decoración para tu hogar",
                icon: <Gift className="h-8 w-8" />,
                count: products.filter((p) => p.category === "figuras").length,
                color: "bg-purple-100 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
                iconColor: "text-purple-600",
              },
              {
                category: "herramientas",
                title: "Herramientas Útiles",
                description: "Objetos prácticos para el día a día",
                icon: <Wrench className="h-8 w-8" />,
                count: products.filter((p) => p.category === "herramientas").length,
                color: "bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
                iconColor: "text-blue-600",
              },
              {
                category: "decoracion",
                title: "Decoración",
                description: "Elementos decorativos únicos",
                icon: <Home className="h-8 w-8" />,
                count: products.filter((p) => p.category === "decoracion").length,
                color: "bg-orange-100 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
                iconColor: "text-orange-600",
              },
            ].map((cat, index) => (
              <AnimatedItem key={cat.category} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${cat.color} ${selectedCategory === cat.category ? "ring-2 ring-green-500" : ""}`}
                    onClick={() => setSelectedCategory(cat.category)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`mx-auto mb-4 ${cat.iconColor}`}>{cat.icon}</div>
                      <h3 className="font-bold text-lg mb-2">{cat.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{cat.description}</p>
                      <Badge variant="secondary">{cat.count} productos</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>

        {/* Search and Filters */}
        <AnimatedSection animation="slideUp" className="mb-8">
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

            <div className="flex gap-2 items-center">
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
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Destacados</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="bottles-low">Botellas: Menos a Más</SelectItem>
                  <SelectItem value="bottles-high">Botellas: Más a Menos</SelectItem>
                  <SelectItem value="rating">Mejor Valorados</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Products Grid */}
        <AnimatedSection animation="stagger">
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            }`}
          >
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <AnimatedItem key={product.id} delay={index * 0.1}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      className={`overflow-hidden ${!product.inStock ? "opacity-60" : ""} ${
                        viewMode === "list" ? "flex flex-row" : ""
                      }`}
                    >
                      <div className={`relative ${viewMode === "list" ? "w-48 h-48" : "h-64"}`}>
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        {product.featured && <Badge className="absolute top-2 left-2 bg-green-600">Destacado</Badge>}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-medium">Agotado</span>
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                          onClick={() => toggleFavorite(product.id)}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                            }`}
                          />
                        </Button>
                      </div>

                      <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-lg">{product.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-muted-foreground">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="space-y-3">
                          {/* Precio base */}
                          <div className="p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-lg font-bold">S/ {product.basePriceSoles}</span>
                              <span className="text-sm text-muted-foreground">Precio base</span>
                            </div>
                          </div>

                          {/* Opción con eco-coins */}
                          <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border-2 border-green-200 dark:border-green-800">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Recycle className="h-5 w-5 text-green-600" />
                                <span className="font-medium text-green-700 dark:text-green-300">Con Eco-Coins</span>
                              </div>
                              <Badge className="bg-green-600">¡Ahorra!</Badge>
                            </div>

                            {/* Calculadora de descuento */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Precio base:</span>
                                <span>S/ {product.basePriceSoles}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm text-green-600">
                                <span>Descuento eco-coins:</span>
                                <span>
                                  - S/{" "}
                                  {Math.min(
                                    product.maxEcoCoinsDiscount / product.ecoCoinsToSolesRatio,
                                    userEcoCoins / product.ecoCoinsToSolesRatio,
                                  ).toFixed(2)}
                                </span>
                              </div>
                              <hr className="border-green-200" />
                              <div className="flex items-center justify-between font-bold">
                                <span>Total a pagar:</span>
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
                              <div className="text-xs text-muted-foreground">
                                +{" "}
                                {Math.min(
                                  product.maxEcoCoinsDiscount,
                                  Math.floor(userEcoCoins / product.ecoCoinsToSolesRatio) *
                                    product.ecoCoinsToSolesRatio,
                                )}{" "}
                                eco-coins
                              </div>
                            </div>

                            <Button
                              size="sm"
                              disabled={!product.inStock}
                              onClick={() => addToCart(product.id)}
                              className="w-full mt-3 bg-green-600 hover:bg-green-700"
                            >
                              {userEcoCoins < product.ecoCoinsToSolesRatio
                                ? "Sin eco-coins suficientes"
                                : "Comprar con descuento"}
                            </Button>
                          </div>

                          {/* Botón precio completo */}
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!product.inStock}
                            onClick={() => addToCart(product.id)}
                            className="w-full"
                          >
                            Comprar a precio completo (S/ {product.basePriceSoles})
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
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No se encontraron productos que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection animation="fadeIn" className="mt-16 text-center">
          <div className="bg-green-50 dark:bg-green-950/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">¿Necesitas más botellas?</h2>
            <p className="text-muted-foreground mb-6">
              Trae más botellas recicladas a nuestros puntos de recolección y obtén más productos increíbles.
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/#contacto">Encontrar puntos de recolección</Link>
            </Button>
          </div>
        </AnimatedSection>

        {/* Publish Your Models Section */}
        <AnimatedSection animation="fadeIn" className="mt-16">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.7 }}
              >
                <Upload className="h-8 w-8 text-green-600" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">¿Te gustaría publicar tus modelos 3D?</h2>
              <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                Únete a nuestra comunidad de creadores y comparte tus diseños únicos. Gana eco-coins por cada venta de
                tus modelos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <FileImage className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Sube tus diseños</h3>
                    <p className="text-muted-foreground text-sm">
                      Comparte archivos STL, OBJ o otros formatos 3D compatibles con nuestra plataforma.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <Coins className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Gana eco-coins</h3>
                    <p className="text-muted-foreground text-sm">
                      Recibe eco-coins por cada venta de tus modelos. Mientras más popular sea tu diseño, más ganas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <Recycle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Impacto sostenible</h3>
                    <p className="text-muted-foreground text-sm">
                      Tus diseños se imprimen con plástico reciclado, contribuyendo a un futuro más verde.
                    </p>
                  </div>
                </div>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Comenzar a publicar</h3>
                <form className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="creator-name" className="text-sm font-medium">
                        Nombre del creador
                      </label>
                      <Input
                        id="creator-name"
                        placeholder="Tu nombre o marca"
                        className="transition-all focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="creator-email" className="text-sm font-medium">
                        Email de contacto
                      </label>
                      <Input
                        id="creator-email"
                        type="email"
                        placeholder="tu@email.com"
                        className="transition-all focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="model-category" className="text-sm font-medium">
                        Categoría principal
                      </label>
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
                      <label htmlFor="experience" className="text-sm font-medium">
                        Experiencia en diseño 3D
                      </label>
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
                      <label htmlFor="portfolio" className="text-sm font-medium">
                        Portfolio o sitio web (opcional)
                      </label>
                      <Input
                        id="portfolio"
                        placeholder="https://tu-portfolio.com"
                        className="transition-all focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                      <Send className="mr-2 h-4 w-4" />
                      Solicitar acceso como creador
                    </Button>
                  </motion.div>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Te contactaremos en 24-48 horas para revisar tu solicitud
                  </p>
                </div>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-white dark:bg-gray-900 rounded-full shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">+50 creadores activos</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Comisión: 15%</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Pago en eco-coins</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 3D Printer Services Section */}
        <AnimatedSection animation="fadeIn" className="mt-16">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.7 }}
              >
                <Printer className="h-8 w-8 text-blue-600" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">¿Tienes una impresora 3D?</h2>
              <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                Únete a nuestra red de impresores y gana eco-coins ofreciendo servicios de impresión 3D con plástico
                reciclado.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Printer className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Ofrece tus servicios</h3>
                    <p className="text-muted-foreground text-sm">
                      Registra tu impresora 3D y especifica tus capacidades, materiales y área de cobertura.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Coins className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Gana eco-coins</h3>
                    <p className="text-muted-foreground text-sm">
                      Recibe eco-coins por cada trabajo de impresión completado. Tarifas competitivas y pagos seguros.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Red local</h3>
                    <p className="text-muted-foreground text-sm">
                      Conecta con usuarios de tu zona para entregas rápidas y reducir la huella de carbono.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Recycle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Plástico reciclado</h3>
                    <p className="text-muted-foreground text-sm">
                      Trabajamos con filamentos hechos de plástico reciclado, contribuyendo a la economía circular.
                    </p>
                  </div>
                </div>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Registrar impresora</h3>
                <form className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="printer-name" className="text-sm font-medium">
                        Nombre del servicio
                      </label>
                      <Input
                        id="printer-name"
                        placeholder="Ej: Impresiones 3D Lima Norte"
                        className="transition-all focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="printer-email" className="text-sm font-medium">
                        Email de contacto
                      </label>
                      <Input
                        id="printer-email"
                        type="email"
                        placeholder="tu@email.com"
                        className="transition-all focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="printer-model" className="text-sm font-medium">
                        Modelo de impresora
                      </label>
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
                          <SelectItem value="other">Otra (especificar)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="print-volume" className="text-sm font-medium">
                        Volumen de impresión
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Tamaño máximo de impresión" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Pequeño (hasta 20x20x20 cm)</SelectItem>
                          <SelectItem value="medium">Mediano (hasta 30x30x30 cm)</SelectItem>
                          <SelectItem value="large">Grande (más de 30x30x30 cm)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="materials" className="text-sm font-medium">
                        Materiales disponibles
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {["PLA", "ABS", "PETG", "TPU", "Wood Fill", "Metal Fill"].map((material) => (
                          <label key={material} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span className="text-sm">{material}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="location" className="text-sm font-medium">
                        Ubicación (distrito/ciudad)
                      </label>
                      <Input
                        id="location"
                        placeholder="Ej: San Isidro, Lima"
                        className="transition-all focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="experience-printer" className="text-sm font-medium">
                        Experiencia en impresión 3D
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hobbyist">Hobbyist (menos de 1 año)</SelectItem>
                          <SelectItem value="experienced">Experimentado (1-3 años)</SelectItem>
                          <SelectItem value="professional">Profesional (3+ años)</SelectItem>
                          <SelectItem value="business">Negocio establecido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="delivery" className="text-sm font-medium">
                        Opciones de entrega
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="text-sm">Recojo en local</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="text-sm">Delivery local (radio de 10km)</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="text-sm">Envío por courier</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                      <Printer className="mr-2 h-4 w-4" />
                      Registrar como impresor
                    </Button>
                  </motion.div>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Verificaremos tu equipo y te contactaremos en 24-48 horas
                  </p>
                </div>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-white dark:bg-gray-900 rounded-full shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">+25 impresores activos</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Comisión: 10%</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Pago en eco-coins</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Tiempo promedio: 2-5 días</span>
                </div>
              </div>
            </div>

            {/* Printer Network Map Preview */}
            <div className="mt-8 p-6 bg-white dark:bg-gray-900 rounded-xl">
              <h3 className="text-lg font-bold mb-4 text-center">Red de Impresores Silk</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { zone: "Lima Norte", printers: 8, avgTime: "2-3 días", rating: 4.8 },
                  { zone: "Lima Centro", printers: 12, avgTime: "1-2 días", rating: 4.9 },
                  { zone: "Lima Sur", printers: 5, avgTime: "3-4 días", rating: 4.7 },
                ].map((zone, index) => (
                  <motion.div
                    key={zone.zone}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <h4 className="font-bold text-blue-600">{zone.zone}</h4>
                    <div className="text-sm text-muted-foreground mt-2 space-y-1">
                      <div>{zone.printers} impresores</div>
                      <div>{zone.avgTime}</div>
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{zone.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>
    </div>
  )
}
