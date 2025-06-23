import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  Building,
  Users,
  Briefcase,
  Heart,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  category: string;
  message: string;
  priority: string;
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
    priority: "medium",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const contactReasons = [
    { value: "order-issue", label: "Problema con mi pedido" },
    { value: "payment-issue", label: "Problema de pago" },
    { value: "delivery-issue", label: "Problema de entrega" },
    { value: "product-feedback", label: "Comentarios sobre productos" },
    { value: "technical-support", label: "Soporte técnico" },
    { value: "partnership", label: "Alianzas comerciales" },
    { value: "press", label: "Prensa y medios" },
    { value: "other", label: "Otro" },
  ];

  const priorityLevels = [
    { value: "low", label: "Baja", color: "bg-green-100 text-green-700" },
    { value: "medium", label: "Media", color: "bg-yellow-100 text-yellow-700" },
    { value: "high", label: "Alta", color: "bg-red-100 text-red-700" },
    {
      value: "urgent",
      label: "Urgente",
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const officeLocations = [
    {
      name: "Oficina Principal",
      address: "Av. Presidente Masaryk 111, Polanco, CDMX 11560",
      phone: "Disponible en horario de oficina",
      email: "Formulario de contacto disponible",
      hours: "Lunes a Viernes: 9:00 AM - 6:00 PM",
      type: "Corporativo",
    },
    {
      name: "Centro de Distribución Norte",
      address:
        "Av. Instituto Politécnico Nacional 1936, Gustavo A. Madero, CDMX",
      phone: "Centro de distribución",
      email: "Solo operaciones logísticas",
      hours: "Lunes a Domingo: 9:00 AM - 9:00 PM",
      type: "Logística",
    },
    {
      name: "Centro de Distribución Sur",
      address: "Calz. de Tlalpan 4620, Tlalpan, CDMX",
      phone: "Centro de distribución",
      email: "Solo operaciones logísticas",
      hours: "Lunes a Domingo: 9:00 AM - 9:00 PM",
      type: "Logística",
    },
  ];

  const teamContacts = [
    {
      department: "Atención al Cliente",
      email: "Formulario de contacto",
      phone: "Chat en línea disponible",
      hours: "9:00 AM - 9:00 PM",
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      department: "Ventas Corporativas",
      email: "Formulario específico",
      phone: "Citas programadas",
      hours: "9:00 AM - 6:00 PM",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      department: "Prensa y Medios",
      email: "Contacto por formulario",
      phone: "Solicitud de entrevista",
      hours: "9:00 AM - 6:00 PM",
      icon: <Users className="w-5 h-5" />,
    },
    {
      department: "Recursos Humanos",
      email: "Portal de empleo",
      phone: "Consultas por formulario",
      hours: "9:00 AM - 5:00 PM",
      icon: <Heart className="w-5 h-5" />,
    },
  ];

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "El asunto es requerido";
    }

    if (!formData.category) {
      newErrors.category = "Selecciona una categoría";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="container px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-display font-bold text-3xl text-gray-900 mb-4">
              ¡Mensaje enviado con éxito!
            </h1>
            <p className="text-gray-600 mb-8">
              Hemos recibido tu mensaje y te responderemos lo antes posible.
              Generalmente respondemos dentro de las próximas 2-4 horas durante
              horario hábil.
            </p>

            <div className="bg-white p-6 rounded-lg border mb-8">
              <h3 className="font-semibold mb-2">Número de referencia</h3>
              <p className="text-2xl font-mono text-brand-600 mb-4">
                #REF-{Date.now().toString().slice(-6)}
              </p>
              <p className="text-sm text-gray-600">
                Guarda este número para futuras referencias
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    category: "",
                    message: "",
                    priority: "medium",
                  });
                }}
                variant="outline"
              >
                Enviar otro mensaje
              </Button>

              <Button className="btn-gradient" asChild>
                <a href="/">Volver al inicio</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-500 to-fresh-500 text-white py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display font-bold text-4xl lg:text-5xl mb-4">
              Contáctanos
            </h1>
            <p className="text-lg text-white/90">
              Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos
              pronto.
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Envíanos un mensaje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Tu nombre completo"
                        className={cn(errors.name && "border-red-500")}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="tu@email.com"
                        className={cn(errors.email && "border-red-500")}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono (opcional)</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+52 55 1234 5678"
                    />
                  </div>

                  {/* Subject and Category */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Asunto *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                      placeholder="Describe brevemente tu consulta"
                      className={cn(errors.subject && "border-red-500")}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm">{errors.subject}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Categoría *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                      >
                        <SelectTrigger
                          className={cn(errors.category && "border-red-500")}
                        >
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {contactReasons.map((reason) => (
                            <SelectItem key={reason.value} value={reason.value}>
                              {reason.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-red-500 text-sm">
                          {errors.category}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Prioridad</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) =>
                          handleInputChange("priority", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorityLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              <div className="flex items-center gap-2">
                                <Badge className={cn("text-xs", level.color)}>
                                  {level.label}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder="Describe tu consulta con el mayor detalle posible..."
                      rows={6}
                      className={cn(errors.message && "border-red-500")}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm">{errors.message}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      {formData.message.length}/500 caracteres
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-gradient shadow-glow"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Enviando mensaje...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar mensaje
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contacto rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-100 p-2 rounded-lg">
                      <Phone className="w-4 h-4 text-brand-600" />
                    </div>
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <p className="text-sm text-gray-600">
                        Disponible por chat
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-fresh-100 p-2 rounded-lg">
                      <MessageCircle className="w-4 h-4 text-fresh-600" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-gray-600">
                        Respuesta inmediata
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Mail className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-600">
                        Formulario de contacto
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <Clock className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">Horario</p>
                      <p className="text-sm text-gray-600">
                        9:00 AM - 11:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full btn-gradient">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Iniciar chat
                </Button>
              </CardContent>
            </Card>

            {/* Office Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Nuestras oficinas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {officeLocations.map((location, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{location.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {location.type}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>{location.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 flex-shrink-0" />
                        <span>{location.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span>{location.hours}</span>
                      </div>
                    </div>
                    {index < officeLocations.length - 1 && (
                      <div className="border-b border-gray-100 mt-4" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Team Contacts */}
            <Card>
              <CardHeader>
                <CardTitle>Contactos por departamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamContacts.map((contact, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      {contact.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {contact.department}
                      </p>
                      <p className="text-xs text-gray-600">{contact.email}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
