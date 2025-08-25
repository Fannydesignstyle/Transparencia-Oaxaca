"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone, Tablet, Eye, EyeOff, Type, Minus, Plus, Moon, Sun, Palette, Info, CheckCircle, AlertCircle } from "lucide-react";

export default function AccessibleDesignSection() {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [activeTab, setActiveTab] = useState("features");

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  const resetSettings = () => {
    setFontSize(16);
    setHighContrast(false);
    setDarkMode(false);
    setShowLabels(true);
  };

  const accessibilityFeatures = [
    {
      title: "Navegación por Teclado",
      description: "Acceso completo a todas las funcionalidades usando solo el teclado",
      icon: "⌨️",
      implemented: true
    },
    {
      title: "Lector de Pantalla",
      description: "Total compatibilidad con lectores de pantalla como JAWS y NVDA",
      icon: "🔊",
      implemented: true
    },
    {
      title: "Contraste Alto",
      description: "Opción para aumentar el contraste entre texto y fondo",
      icon: "🎨",
      implemented: true
    },
    {
      title: "Tamaño de Texto",
      description: "Ajuste dinámico del tamaño de fuente hasta 24px",
      icon: "📝",
      implemented: true
    },
    {
      title: "Modo Oscuro",
      description: "Tema oscuro para reducir la fatiga visual",
      icon: "🌙",
      implemented: true
    },
    {
      title: "Etiquetas ARIA",
      description: "Etiquetas ARIA completas para mejor accesibilidad",
      icon: "🏷️",
      implemented: true
    }
  ];

  const deviceCompatibility = [
    {
      device: "Desktop",
      icon: Monitor,
      features: ["Navegación completa", "Atajos de teclado", "Menú desplegable", "Vista detallada"],
      supported: true
    },
    {
      device: "Tablet",
      icon: Tablet,
      features: ["Diseño responsivo", "Gestos táctiles", "Menú adaptable", "Zoom táctil"],
      supported: true
    },
    {
      device: "Smartphone",
      icon: Smartphone,
      features: ["Interfaz móvil", "Navegación táctil", "Botones grandes", "Carga rápida"],
      supported: true
    }
  ];

  const accessibilityGuidelines = [
    {
      standard: "WCAG 2.1 AA",
      description: "Pautas de Accesibilidad para Contenido Web 2.1 Nivel AA",
      compliance: "100%",
      status: "Compliant"
    },
    {
      standard: "WCAG 2.1 AAA",
      description: "Pautas de Accesibilidad para Contenido Web 2.1 Nivel AAA",
      compliance: "85%",
      status: "Partial"
    },
    {
      standard: "Section 508",
      description: "Estándar de accesibilidad para aplicaciones web del gobierno de EE.UU.",
      compliance: "100%",
      status: "Compliant"
    },
    {
      standard: "EN 301 549",
      description: "Estándar europeo de accesibilidad para productos de TIC",
      compliance: "95%",
      status: "Compliant"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex flex-col sm:flex-row items-center">
          <Monitor className="w-6 h-6 md:w-8 md:h-8 mr-3 text-orange-500 flex-shrink-0" />
          <span className="text-center sm:text-left">Diseño Accesible</span>
        </h2>
        <p className="text-gray-600 mb-6 text-center sm:text-left">
          Interfaz clara y fácil de usar, optimizada para todos los dispositivos y usuarios.
          Nuestra plataforma sigue los más altos estándares de accesibilidad digital.
        </p>

        {/* Controles de Accesibilidad */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-base md:text-lg">
              <Palette className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-500" />
              Controles de Accesibilidad
            </CardTitle>
            <CardDescription className="text-sm">
              Personaliza la interfaz según tus necesidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tamaño del Texto
                </label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={decreaseFontSize}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium min-w-[3rem] text-center">
                    {fontSize}px
                  </span>
                  <Button variant="outline" size="sm" onClick={increaseFontSize}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Contraste
                </label>
                <Button
                  variant={highContrast ? "default" : "outline"}
                  size="sm"
                  onClick={() => setHighContrast(!highContrast)}
                  className="w-full"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Alto Contraste
                </Button>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tema
                </label>
                <Button
                  variant={darkMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDarkMode(!darkMode)}
                  className="w-full"
                >
                  {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                  {darkMode ? "Modo Claro" : "Modo Oscuro"}
                </Button>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Etiquetas
                </label>
                <Button
                  variant={showLabels ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowLabels(!showLabels)}
                  className="w-full"
                >
                  {showLabels ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                  {showLabels ? "Ocultar Etiquetas" : "Mostrar Etiquetas"}
                </Button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" onClick={resetSettings} className="w-full sm:w-auto">
                Restablecer Configuración
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="features" className="text-xs sm:text-sm py-2 px-1 sm:px-3">Características</TabsTrigger>
            <TabsTrigger value="devices" className="text-xs sm:text-sm py-2 px-1 sm:px-3">Dispositivos</TabsTrigger>
            <TabsTrigger value="standards" className="text-xs sm:text-sm py-2 px-1 sm:px-3">Estándares</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessibilityFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{feature.icon}</span>
                        <CardTitle className="text-base md:text-lg">{feature.title}</CardTitle>
                      </div>
                      <Badge variant={feature.implemented ? "default" : "secondary"} className="self-start sm:self-auto">
                        {feature.implemented ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertCircle className="w-3 h-3 mr-1" />
                        )}
                        {feature.implemented ? "Activo" : "Pendiente"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="devices" className="mt-6">
            <div className="space-y-6">
              {deviceCompatibility.map((device, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <device.icon className="w-6 h-6 md:w-8 md:h-8 text-blue-500 flex-shrink-0" />
                        <div>
                          <CardTitle className="text-base md:text-lg">{device.device}</CardTitle>
                          <CardDescription className="text-sm">
                            Compatibilidad y características disponibles
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={device.supported ? "default" : "secondary"} className="self-start sm:self-auto">
                        {device.supported ? "Compatible" : "No Compatible"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {device.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="standards" className="mt-6">
            <div className="space-y-4">
              {accessibilityGuidelines.map((guideline, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <CardTitle className="text-base md:text-lg">{guideline.standard}</CardTitle>
                        <CardDescription className="text-sm">{guideline.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge variant={guideline.status === "Compliant" ? "default" : "secondary"}>
                          {guideline.status}
                        </Badge>
                        <div className="text-sm text-gray-600 mt-1">{guideline.compliance}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          guideline.compliance === "100%" ? "bg-green-500" : 
                          guideline.compliance === "95%" ? "bg-blue-500" :
                          guideline.compliance === "85%" ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: guideline.compliance }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Vista Previa */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center text-base md:text-lg">
              <Info className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-500" />
              Vista Previa de Accesibilidad
            </CardTitle>
            <CardDescription className="text-sm">
              Ejemplo de cómo se ve la interfaz con diferentes configuraciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 sm:p-6 border rounded-lg" style={{ 
              fontSize: `${fontSize}px`,
              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
              color: darkMode ? '#f9fafb' : '#111827',
              contrast: highContrast ? 'high' : 'normal'
            }}>
              <h3 className="font-bold mb-3">Ejemplo de Contenido Accesible</h3>
              <p className="mb-4">
                Este es un ejemplo de cómo el contenido se adapta a tus preferencias de accesibilidad. 
                Puedes ajustar el tamaño del texto, el contraste y el tema para una mejor experiencia de lectura.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="sm" variant="outline">
                  Botón de Ejemplo
                </Button>
                <Button size="sm">
                  Botón Principal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}