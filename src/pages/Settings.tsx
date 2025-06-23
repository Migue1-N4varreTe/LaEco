import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette,
  Globe,
  Smartphone,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Upload,
  Save,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Zap,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  newProducts: boolean;
  lowStock: boolean;
  deliveryReminders: boolean;
}

interface PrivacySettings {
  profileVisibility: "public" | "friends" | "private";
  showOnlineStatus: boolean;
  allowDataCollection: boolean;
  shareAnalytics: boolean;
  allowMarketing: boolean;
  showPurchaseHistory: boolean;
}

interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  language: string;
  currency: string;
  timezone: string;
  dateFormat: string;
  soundEffects: boolean;
  animations: boolean;
}

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false,
    orderUpdates: true,
    promotions: true,
    newProducts: false,
    lowStock: true,
    deliveryReminders: true,
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: "private",
    showOnlineStatus: false,
    allowDataCollection: true,
    shareAnalytics: false,
    allowMarketing: false,
    showPurchaseHistory: false,
  });

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: "light",
    language: "es",
    currency: "MXN",
    timezone: "America/Mexico_City",
    dateFormat: "DD/MM/YYYY",
    soundEffects: true,
    animations: true,
  });

  const handleNotificationChange = (
    key: keyof NotificationSettings,
    value: boolean,
  ) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: keyof PrivacySettings, value: any) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }));
  };

  const handleAppearanceChange = (
    key: keyof AppearanceSettings,
    value: any,
  ) => {
    setAppearance((prev) => ({ ...prev, [key]: value }));
  };

  const handlePasswordChange = (
    field: keyof typeof passwordData,
    value: string,
  ) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSaving(false);
    // Show success message
    alert("Configuración guardada exitosamente");
  };

  const handleChangePassword = async () => {
    if (passwordData.new !== passwordData.confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (passwordData.new.length < 6) {
      alert("La nueva contraseña debe tener al menos 6 caracteres");
      return;
    }

    setIsSaving(true);

    // Simulate password change
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setPasswordData({ current: "", new: "", confirm: "" });
    setIsSaving(false);
    alert("Contraseña cambiada exitosamente");
  };

  const handleDeleteAccount = async () => {
    // Simulate account deletion
    await logout();
    navigate("/");
  };

  const handleExportData = () => {
    // Simulate data export
    const data = {
      user,
      settings: { notifications, privacy, appearance },
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quickgo-data-${user?.name?.replace(/\s+/g, "-")}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container px-4 py-16 text-center">
          <p className="text-gray-600">
            Inicia sesión para acceder a la configuración
          </p>
          <Button asChild className="mt-4">
            <Link to="/login">Iniciar sesión</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl md:text-3xl text-gray-900 mb-2 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-brand-500" />
            Configuración
          </h1>
          <p className="text-gray-600">
            Personaliza tu experiencia y gestiona tu cuenta
          </p>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="notifications" className="text-xs sm:text-sm">
              <Bell className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Notificaciones</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="text-xs sm:text-sm">
              <Shield className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Privacidad</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="text-xs sm:text-sm">
              <Palette className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Apariencia</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs sm:text-sm">
              <Lock className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Seguridad</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="text-xs sm:text-sm">
              <Database className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Cuenta</span>
            </TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-900">
                      Canales de notificación
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium">
                            Notificaciones por email
                          </Label>
                          <p className="text-sm text-gray-600">
                            Recibe notificaciones en tu correo
                          </p>
                        </div>
                        <Switch
                          checked={notifications.email}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("email", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium">
                            Notificaciones push
                          </Label>
                          <p className="text-sm text-gray-600">
                            Notificaciones en tu navegador
                          </p>
                        </div>
                        <Switch
                          checked={notifications.push}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("push", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium">Mensajes SMS</Label>
                          <p className="text-sm text-gray-600">
                            Notificaciones por mensaje de texto
                          </p>
                        </div>
                        <Switch
                          checked={notifications.sms}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("sms", checked)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3 text-gray-900">
                      Tipos de notificación
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium">
                            Actualizaciones de pedidos
                          </Label>
                          <p className="text-sm text-gray-600">
                            Estado de preparación y entrega
                          </p>
                        </div>
                        <Switch
                          checked={notifications.orderUpdates}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("orderUpdates", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium">
                            Promociones y ofertas
                          </Label>
                          <p className="text-sm text-gray-600">
                            Descuentos y ofertas especiales
                          </p>
                        </div>
                        <Switch
                          checked={notifications.promotions}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("promotions", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium">
                            Nuevos productos
                          </Label>
                          <p className="text-sm text-gray-600">
                            Cuando añadamos productos nuevos
                          </p>
                        </div>
                        <Switch
                          checked={notifications.newProducts}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("newProducts", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium">Stock bajo</Label>
                          <p className="text-sm text-gray-600">
                            Cuando tus favoritos tengan poco stock
                          </p>
                        </div>
                        <Switch
                          checked={notifications.lowStock}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("lowStock", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium">
                            Recordatorios de entrega
                          </Label>
                          <p className="text-sm text-gray-600">
                            15 minutos antes de la entrega
                          </p>
                        </div>
                        <Switch
                          checked={notifications.deliveryReminders}
                          onCheckedChange={(checked) =>
                            handleNotificationChange(
                              "deliveryReminders",
                              checked,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="w-full btn-gradient"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar configuración
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacidad y datos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="font-medium">
                      Visibilidad del perfil
                    </Label>
                    <p className="text-sm text-gray-600 mb-2">
                      Controla quién puede ver tu perfil
                    </p>
                    <Select
                      value={privacy.profileVisibility}
                      onValueChange={(value) =>
                        handlePrivacyChange("profileVisibility", value as any)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Público</SelectItem>
                        <SelectItem value="friends">Solo amigos</SelectItem>
                        <SelectItem value="private">Privado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">
                          Mostrar estado en línea
                        </Label>
                        <p className="text-sm text-gray-600">
                          Permite que otros vean si estás conectado
                        </p>
                      </div>
                      <Switch
                        checked={privacy.showOnlineStatus}
                        onCheckedChange={(checked) =>
                          handlePrivacyChange("showOnlineStatus", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">
                          Recopilación de datos
                        </Label>
                        <p className="text-sm text-gray-600">
                          Permitir recopilar datos para mejorar el servicio
                        </p>
                      </div>
                      <Switch
                        checked={privacy.allowDataCollection}
                        onCheckedChange={(checked) =>
                          handlePrivacyChange("allowDataCollection", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">
                          Compartir análisis de uso
                        </Label>
                        <p className="text-sm text-gray-600">
                          Ayuda a mejorar la app compartiendo estadísticas
                          anónimas
                        </p>
                      </div>
                      <Switch
                        checked={privacy.shareAnalytics}
                        onCheckedChange={(checked) =>
                          handlePrivacyChange("shareAnalytics", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">
                          Marketing personalizado
                        </Label>
                        <p className="text-sm text-gray-600">
                          Recibir ofertas basadas en tus compras
                        </p>
                      </div>
                      <Switch
                        checked={privacy.allowMarketing}
                        onCheckedChange={(checked) =>
                          handlePrivacyChange("allowMarketing", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">
                          Mostrar historial de compras
                        </Label>
                        <p className="text-sm text-gray-600">
                          Visible en tu perfil público
                        </p>
                      </div>
                      <Switch
                        checked={privacy.showPurchaseHistory}
                        onCheckedChange={(checked) =>
                          handlePrivacyChange("showPurchaseHistory", checked)
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="w-full btn-gradient"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar configuración
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Apariencia e idioma
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="font-medium">Tema</Label>
                      <p className="text-sm text-gray-600 mb-2">
                        Apariencia de la aplicación
                      </p>
                      <Select
                        value={appearance.theme}
                        onValueChange={(value) =>
                          handleAppearanceChange("theme", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">
                            <div className="flex items-center gap-2">
                              <Sun className="w-4 h-4" />
                              Claro
                            </div>
                          </SelectItem>
                          <SelectItem value="dark">
                            <div className="flex items-center gap-2">
                              <Moon className="w-4 h-4" />
                              Oscuro
                            </div>
                          </SelectItem>
                          <SelectItem value="system">
                            <div className="flex items-center gap-2">
                              <Smartphone className="w-4 h-4" />
                              Sistema
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-medium">Idioma</Label>
                      <p className="text-sm text-gray-600 mb-2">
                        Idioma de la interfaz
                      </p>
                      <Select
                        value={appearance.language}
                        onValueChange={(value) =>
                          handleAppearanceChange("language", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-medium">Moneda</Label>
                      <p className="text-sm text-gray-600 mb-2">
                        Moneda para mostrar precios
                      </p>
                      <Select
                        value={appearance.currency}
                        onValueChange={(value) =>
                          handleAppearanceChange("currency", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MXN">
                            Peso Mexicano (MXN)
                          </SelectItem>
                          <SelectItem value="USD">
                            Dólar Americano (USD)
                          </SelectItem>
                          <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="font-medium">Zona horaria</Label>
                      <p className="text-sm text-gray-600 mb-2">
                        Para horarios de entrega
                      </p>
                      <Select
                        value={appearance.timezone}
                        onValueChange={(value) =>
                          handleAppearanceChange("timezone", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/Mexico_City">
                            México (CDMX)
                          </SelectItem>
                          <SelectItem value="America/Cancun">
                            México (Cancún)
                          </SelectItem>
                          <SelectItem value="America/Tijuana">
                            México (Tijuana)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-medium">Formato de fecha</Label>
                      <p className="text-sm text-gray-600 mb-2">
                        Cómo mostrar las fechas
                      </p>
                      <Select
                        value={appearance.dateFormat}
                        onValueChange={(value) =>
                          handleAppearanceChange("dateFormat", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium">
                            Efectos de sonido
                          </Label>
                          <p className="text-sm text-gray-600">
                            Sonidos para acciones de la app
                          </p>
                        </div>
                        <Switch
                          checked={appearance.soundEffects}
                          onCheckedChange={(checked) =>
                            handleAppearanceChange("soundEffects", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium">Animaciones</Label>
                          <p className="text-sm text-gray-600">
                            Efectos visuales y transiciones
                          </p>
                        </div>
                        <Switch
                          checked={appearance.animations}
                          onCheckedChange={(checked) =>
                            handleAppearanceChange("animations", checked)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="w-full btn-gradient"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar configuración
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Seguridad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-900">
                      Cambiar contraseña
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="currentPassword">
                          Contraseña actual
                        </Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            value={passwordData.current}
                            onChange={(e) =>
                              handlePasswordChange("current", e.target.value)
                            }
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="newPassword">Nueva contraseña</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={passwordData.new}
                            onChange={(e) =>
                              handlePasswordChange("new", e.target.value)
                            }
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">
                          Confirmar nueva contraseña
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={passwordData.confirm}
                            onChange={(e) =>
                              handlePasswordChange("confirm", e.target.value)
                            }
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <Button
                        onClick={handleChangePassword}
                        disabled={
                          !passwordData.current ||
                          !passwordData.new ||
                          !passwordData.confirm ||
                          isSaving
                        }
                        className="w-full"
                      >
                        {isSaving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Cambiando...
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Cambiar contraseña
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Gestión de cuenta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-900">
                      Exportar datos
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Descarga una copia de todos tus datos personales, pedidos
                      y configuración.
                    </p>
                    <Button
                      onClick={handleExportData}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar mis datos
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3 text-red-700">
                      Zona peligrosa
                    </h3>
                    <div className="space-y-4 p-4 border border-red-200 rounded-lg bg-red-50">
                      <div>
                        <h4 className="font-medium text-red-900">
                          Eliminar cuenta
                        </h4>
                        <p className="text-sm text-red-700 mb-4">
                          Esta acción eliminará permanentemente tu cuenta y
                          todos tus datos. Esta acción no se puede deshacer.
                        </p>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Eliminar mi cuenta
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                ¿Estás seguro?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción eliminará permanentemente tu cuenta
                                y todos tus datos asociados. Esto incluye tu
                                historial de pedidos, favoritos, y toda la
                                información personal.
                                <br />
                                <br />
                                <strong>
                                  Esta acción no se puede deshacer.
                                </strong>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeleteAccount}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Sí, eliminar mi cuenta
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
