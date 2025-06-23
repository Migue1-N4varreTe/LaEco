import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import {
  Truck,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  MapPin,
  Star,
  Package,
} from "lucide-react";
import {
  categories,
  quickCategories,
  deliveryOptions,
  getTotalProducts,
} from "@/lib/data";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-500 via-brand-600 to-fresh-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/2564460/pexels-photo-2564460.jpeg)",
          }}
        />
        <div className="container relative px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Hero Content */}
            <div className="text-white space-y-6 animate-slide-in">
              <Badge className="bg-white/20 text-white border-white/20 w-fit mx-auto">
                🚀 Entrega en 15 minutos
              </Badge>

              <h1 className="font-display font-bold text-4xl lg:text-6xl leading-tight">
                Todo lo que necesitas,
                <span className="block text-yellow-300">
                  al alcance de tu mano
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
                Convenience store digital con entrega ultrarrápida. Miles de
                productos, inventario en tiempo real.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-yellow-500 text-gray-900 hover:bg-yellow-400 shadow-lg font-semibold"
                  asChild
                >
                  <Link to="/shop">
                    Explorar tienda
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Cambiar ubicación
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold">15min</div>
                  <div className="text-sm text-white/80">Entrega promedio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">2000+</div>
                  <div className="text-sm text-white/80">Productos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.8★</div>
                  <div className="text-sm text-white/80">Calificación</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-8 bg-white">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickCategories.map((cat, index) => (
              <Link
                key={cat.name}
                to="/shop"
                className={`flex items-center gap-3 p-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-md ${cat.color} text-white animate-slide-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="font-medium text-sm">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Options */}
      <section className="py-12">
        <div className="container px-4">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">
              ¿Cómo quieres recibir tu pedido?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Elige la opción que mejor se adapte a tus necesidades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {deliveryOptions.map((option, index) => (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg border-2 hover:border-brand-200 animate-scale-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{option.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{option.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {option.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-fresh-600">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">{option.time}</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {option.price === 0 ? "Gratis" : `$${option.price}`}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 bg-white">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-2">
                Explora por categorías
              </h2>
              <p className="text-gray-600">
                Encuentra exactamente lo que buscas
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/shop">
                Ver todas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                className={`animate-slide-in delay-${index * 100}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">
              ¿Por qué elegir La Economica?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              La experiencia de compra más rápida y confiable para tu día a día
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "Súper rápido",
                description: "Entrega en 15-20 minutos promedio",
                color: "text-yellow-500",
              },
              {
                icon: Package,
                title: "Inventario real",
                description: "Stock actualizado en tiempo real",
                color: "text-blue-500",
              },
              {
                icon: ShieldCheck,
                title: "100% seguro",
                description: "Pagos protegidos y productos de calidad",
                color: "text-green-500",
              },
              {
                icon: Star,
                title: "Mejor calidad",
                description: "Productos frescos y marcas reconocidas",
                color: "text-purple-500",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className={`text-center animate-slide-in delay-${index * 150}`}
              >
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 mb-4`}
                >
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Statistics */}
      <section className="py-12 bg-gradient-to-r from-brand-50 to-yellow-50">
        <div className="container px-4">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-2">
              Nuestro Inventario
            </h2>
            <p className="text-gray-600">
              Miles de productos disponibles para ti
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-brand-500 mb-2">
                {getTotalProducts().toLocaleString()}+
              </div>
              <div className="text-gray-600 font-medium">Productos Totales</div>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                {categories.length}
              </div>
              <div className="text-gray-600 font-medium">Categorías</div>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-red-500 mb-2">15</div>
              <div className="text-gray-600 font-medium">Pasillos</div>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-fresh-500 mb-2">9-21</div>
              <div className="text-gray-600 font-medium">Horario</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-500 to-fresh-500">
        <div className="container px-4 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mb-4">
            ¿Listo para tu primer pedido?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya disfrutan de la comodidad de La
            Economica
          </p>
          <Button
            size="lg"
            className="bg-white text-brand-600 hover:bg-gray-100 shadow-lg"
            asChild
          >
            <Link to="/shop">
              Empezar a comprar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-fresh-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">QG</span>
                </div>
                <span className="font-display font-bold text-xl">
                  La Economica
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Tu convenience store digital con entrega ultrarrápida. Todo lo
                que necesitas, cuando lo necesitas.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Comprar</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/shop"
                    className="hover:text-white transition-colors"
                  >
                    Todos los productos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="hover:text-white transition-colors"
                  >
                    Categorías
                  </Link>
                </li>
                <li>
                  <Link
                    to="/offers"
                    className="hover:text-white transition-colors"
                  >
                    Ofertas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/new"
                    className="hover:text-white transition-colors"
                  >
                    Nuevos productos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/help"
                    className="hover:text-white transition-colors"
                  >
                    Centro de ayuda
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Términos y condiciones
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacidad
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📍 CDMX, México</p>
                <p>🕒 Lun-Dom 9:00-21:00</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 QuickGo. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
