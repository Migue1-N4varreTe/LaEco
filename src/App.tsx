import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { CartProvider } from "@/contexts/CartContext";
import { SafeWebSocketProvider } from "@/contexts/SafeWebSocketContext";
import PermissionGuard from "@/components/PermissionGuard";
import AccessDenied from "@/components/AccessDenied";
import Index from "./pages/Index";
import Favorites from "./pages/Favorites";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import Offers from "./pages/Offers";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Inventory from "./pages/Inventory";
import POS from "./pages/POS";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Reports from "./pages/Reports";
import Employees from "./pages/Employees";
import Clients from "./pages/Clients";
import SystemConfig from "./pages/SystemConfig";
import NotFound from "./pages/NotFound";
import TutorialPrimerPedido from "./pages/TutorialPrimerPedido";
import GestionarPerfil from "./pages/GestionarPerfil";
import SeguimientoPedidos from "./pages/SeguimientoPedidos";
import ProgramaLealtad from "./pages/ProgramaLealtad";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>
              <SafeWebSocketProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route
                      path="/tutorial-primer-pedido"
                      element={<TutorialPrimerPedido />}
                    />
                    <Route
                      path="/gestionar-perfil"
                      element={<GestionarPerfil />}
                    />
                    <Route
                      path="/seguimiento-pedidos"
                      element={<SeguimientoPedidos />}
                    />
                    <Route
                      path="/programa-lealtad"
                      element={<ProgramaLealtad />}
                    />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route
                      path="/admin"
                      element={
                        <PermissionGuard
                          permission="staff:view"
                          fallback={
                            <AccessDenied requiredPermission="staff:view" />
                          }
                        >
                          <Admin />
                        </PermissionGuard>
                      }
                    />
                    <Route
                      path="/inventory"
                      element={
                        <PermissionGuard
                          permission="inventory:view"
                          fallback={
                            <AccessDenied requiredPermission="inventory:view" />
                          }
                        >
                          <Inventory />
                        </PermissionGuard>
                      }
                    />
                    <Route
                      path="/pos"
                      element={
                        <PermissionGuard
                          permission="sales:create"
                          fallback={
                            <AccessDenied requiredPermission="sales:create" />
                          }
                        >
                          <POS />
                        </PermissionGuard>
                      }
                    />
                    <Route
                      path="/reports"
                      element={
                        <PermissionGuard
                          permission="reports:view"
                          fallback={
                            <AccessDenied requiredPermission="reports:view" />
                          }
                        >
                          <Reports />
                        </PermissionGuard>
                      }
                    />
                    <Route
                      path="/employees"
                      element={
                        <PermissionGuard
                          permission="staff:view"
                          fallback={
                            <AccessDenied requiredPermission="staff:view" />
                          }
                        >
                          <Employees />
                        </PermissionGuard>
                      }
                    />
                    <Route
                      path="/clients"
                      element={
                        <PermissionGuard
                          permission="clients:view"
                          fallback={
                            <AccessDenied requiredPermission="clients:view" />
                          }
                        >
                          <Clients />
                        </PermissionGuard>
                      }
                    />
                    <Route
                      path="/system-config"
                      element={
                        <PermissionGuard
                          permission="system:config"
                          fallback={
                            <AccessDenied requiredPermission="system:config" />
                          }
                        >
                          <SystemConfig />
                        </PermissionGuard>
                      }
                    />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </SafeWebSocketProvider>
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
