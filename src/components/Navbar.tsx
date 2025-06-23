import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCart } from "@/contexts/CartContext";
import { storeHours, isStoreOpen, getNextOpenTime } from "@/lib/data";
import {
  Search,
  ShoppingCart,
  Menu,
  MapPin,
  Clock,
  User,
  Heart,
  LogOut,
  Settings,
  Package,
  AlertCircle,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { favoriteCount } = useFavorites();
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [storeOpen, setStoreOpen] = useState(isStoreOpen());

  const isActive = (path: string) => location.pathname === path;

  // Update store status every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setStoreOpen(isStoreOpen());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAuthAction = (action: "login" | "register") => {
    navigate(`/${action}`, {
      state: { from: location },
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-red-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">LE</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl text-gray-900">
              La Economica
            </span>
            <span className="text-xs text-brand-600 font-medium -mt-1">
              ¡Todo lo que necesitas, al mejor precio!
            </span>
          </div>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="¿Qué necesitas hoy?"
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 w-full bg-gray-50 border-gray-200 focus:bg-white"
            />
            <button type="submit" className="sr-only">
              Buscar
            </button>
          </form>
        </div>

        {/* Location & User Actions - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Location */}
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-brand-500" />
            <span>Polanco, CDMX</span>
          </div>

          {/* Store Hours */}
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            {storeOpen ? (
              <>
                <Clock className="h-4 w-4 text-fresh-500" />
                <span className="text-fresh-600 font-medium">
                  Abierto hasta {storeHours.close}
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-red-600 font-medium">
                  Cerrado - {getNextOpenTime()}
                </span>
              </>
            )}
          </div>

          {/* Favorites */}
          <Button
            variant="ghost"
            size="sm"
            className="relative hover:bg-red-50"
            asChild
          >
            <Link to="/favorites">
              <Heart className="h-5 w-5" />
              {favoriteCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {favoriteCount}
                </Badge>
              )}
            </Link>
          </Button>

          {/* User Authentication */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-brand-100 text-brand-700">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="ml-2 hidden lg:inline text-sm">
                    {user?.name?.split(" ")[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="h-4 w-4 mr-2" />
                  Mi perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/orders")}>
                  <Package className="h-4 w-4 mr-2" />
                  Mis pedidos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/favorites")}>
                  <Heart className="h-4 w-4 mr-2" />
                  Favoritos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAuthAction("login")}
                className="hidden sm:inline-flex"
              >
                Iniciar sesión
              </Button>
              <Button
                size="sm"
                onClick={() => handleAuthAction("register")}
                className="btn-gradient text-white hidden sm:inline-flex"
              >
                Registro
              </Button>
              {/* Mobile auth button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAuthAction("login")}
                className="sm:hidden"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Cart */}
          <Button
            variant="ghost"
            size="sm"
            className="relative hover:bg-brand-50"
            asChild
          >
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Cart - Mobile */}
          <Button variant="ghost" size="sm" className="relative" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Button>

          {/* Mobile Menu Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="¿Qué necesitas hoy?"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-10 pr-4 w-full"
                  />
                  <button type="submit" className="sr-only">
                    Buscar
                  </button>
                </form>

                {/* Location */}
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-brand-500" />
                  <div>
                    <p className="font-medium text-sm">Ubicación actual</p>
                    <p className="text-xs text-gray-600">Polanco, CDMX</p>
                  </div>
                </div>

                {/* Store Hours */}
                <div
                  className={`flex items-center space-x-2 p-3 rounded-lg ${
                    storeOpen ? "bg-fresh-50" : "bg-red-50"
                  }`}
                >
                  {storeOpen ? (
                    <Clock className="h-5 w-5 text-fresh-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium text-sm">
                      {storeOpen ? "Tienda abierta" : "Tienda cerrada"}
                    </p>
                    <p className="text-xs text-gray-600">
                      {storeOpen
                        ? `Horario: ${storeHours.open} - ${storeHours.close}`
                        : getNextOpenTime()}
                    </p>
                  </div>
                </div>

                {/* User Info */}
                {isAuthenticated && (
                  <div className="flex items-center gap-3 p-3 bg-brand-50 rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-brand-500 text-white">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{user?.name}</p>
                      <p className="text-xs text-gray-600">{user?.email}</p>
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-2">
                  <Link
                    to="/"
                    className={`p-3 rounded-lg transition-colors ${
                      isActive("/")
                        ? "bg-brand-50 text-brand-600 font-medium"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Inicio
                  </Link>
                  <Link
                    to="/shop"
                    className={`p-3 rounded-lg transition-colors ${
                      isActive("/shop")
                        ? "bg-brand-50 text-brand-600 font-medium"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Tienda
                  </Link>

                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/favorites"
                        className={`p-3 rounded-lg transition-colors ${
                          isActive("/favorites")
                            ? "bg-brand-50 text-brand-600 font-medium"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        Favoritos
                      </Link>
                      <Link
                        to="/orders"
                        className={`p-3 rounded-lg transition-colors ${
                          isActive("/orders")
                            ? "bg-brand-50 text-brand-600 font-medium"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        Mis Pedidos
                      </Link>
                      <Link
                        to="/profile"
                        className={`p-3 rounded-lg transition-colors ${
                          isActive("/profile")
                            ? "bg-brand-50 text-brand-600 font-medium"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        Mi Perfil
                      </Link>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleAuthAction("login")}
                        className="p-3 rounded-lg transition-colors hover:bg-gray-50 text-left"
                      >
                        Iniciar sesión
                      </button>
                      <button
                        onClick={() => handleAuthAction("register")}
                        className="p-3 rounded-lg transition-colors bg-brand-500 text-white hover:bg-brand-600 text-left"
                      >
                        Crear cuenta
                      </button>
                    </>
                  )}
                </nav>

                {/* Logout button for authenticated users */}
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="w-full p-3 rounded-lg transition-colors text-red-600 hover:bg-red-50 text-left flex items-center gap-2 mt-4 border-t pt-4"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Secondary Navigation - Desktop */}
      <div className="hidden md:block border-t border-gray-100">
        <div className="container px-4">
          <nav className="flex items-center space-x-8 h-12">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-brand-600 ${
                isActive("/") ? "text-brand-600" : "text-gray-600"
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/shop"
              className={`text-sm font-medium transition-colors hover:text-brand-600 ${
                isActive("/shop") ? "text-brand-600" : "text-gray-600"
              }`}
            >
              Tienda
            </Link>
            <Link
              to="/categories"
              className={`text-sm font-medium transition-colors hover:text-brand-600 ${
                isActive("/categories") ? "text-brand-600" : "text-gray-600"
              }`}
            >
              Categorías
            </Link>
            <Link
              to="/offers"
              className={`text-sm font-medium transition-colors hover:text-brand-600 ${
                isActive("/offers") ? "text-brand-600" : "text-gray-600"
              }`}
            >
              Ofertas
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
