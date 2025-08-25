"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  BookOpen, 
  Users, 
  Smartphone, 
  FileText,
  CheckCircle,
  Clock,
  Star
} from "lucide-react";

export default function TutorialesPage() {
  const [activeTutorial, setActiveTutorial] = useState<string | null>(null);

  const tutorials = [
    {
      id: "navegacion",
      title: "Tutorial: Navegación Básica",
      description: "Aprende a moverte por la plataforma y encontrar lo que necesitas.",
      icon: BookOpen,
      color: "bg-blue-500",
      duration: "5 min",
      difficulty: "Fácil",
      content: {
        overview: "Este tutorial te guiará a través de los conceptos básicos de navegación en la plataforma Transparencia Conectada.",
        steps: [
          "Conoce la estructura principal del sitio",
          "Aprende a usar el menú de navegación",
          "Descubre cómo buscar información",
          "Entiende la organización de secciones"
        ],
        tips: [
          "Usa el botón de búsqueda para encontrar contenido específico",
          "Los enlaces rápidos te llevan a las secciones más importantes",
          "Puedes volver al inicio desde cualquier página usando el logo"
        ]
      }
    },
    {
      id: "participacion",
      title: "Tutorial: Participación Ciudadana",
      description: "Cómo enviar consultas y participar en las decisiones.",
      icon: Users,
      color: "bg-purple-500",
      duration: "8 min",
      difficulty: "Intermedio",
      content: {
        overview: "Aprende a utilizar las herramientas de participación ciudadana para interactuar con las instituciones gubernamentales.",
        steps: [
          "Accede a la sección de participación ciudadana",
          "Selecciona la institución relevante",
          "Redacta tu consulta o sugerencia",
          "Envía y haz seguimiento a tu solicitud"
        ],
        tips: [
          "Sé específico y claro en tus consultas",
          "Proporciona información de contacto para recibir respuestas",
          "Revisa el estado de tus solicitudes regularmente"
        ]
      }
    },
    {
      id: "qr",
      title: "Tutorial: Uso de Códigos QR",
      description: "Escanea y usa los códigos QR para acceder rápidamente.",
      icon: Smartphone,
      color: "bg-green-500",
      duration: "3 min",
      difficulty: "Fácil",
      content: {
        overview: "Descubre cómo utilizar los códigos QR para acceder instantáneamente a la información institucional.",
        steps: [
          "Ubica el código QR de la institución",
          "Usa la cámara de tu dispositivo para escanear",
          "Accede directamente al perfil institucional",
          "Comparte el código con otros ciudadanos"
        ],
        tips: [
          "Asegúrate de tener buena iluminación al escanear",
          "Puedes guardar los códigos para acceso futuro",
          "Comparte los códigos para promover la transparencia"
        ]
      }
    },
    {
      id: "documentos",
      title: "Tutorial: Acceso a Documentos",
      description: "Encuentra y descarga documentos institucionales.",
      icon: FileText,
      color: "bg-orange-500",
      duration: "6 min",
      difficulty: "Intermedio",
      content: {
        overview: "Aprende a buscar, visualizar y descargar documentos oficiales de las instituciones.",
        steps: [
          "Navega a la sección de documentos",
          "Filtra por institución o tipo de documento",
          "Vista previa del documento antes de descargar",
          "Descarga en el formato que prefieras"
        ],
        tips: [
          "Usa los filtros para encontrar documentos específicos",
          "Puedes ver una vista previa antes de descargar",
          "Los documentos están organizados por fecha de publicación"
        ]
      }
    }
  ];

  const handleTutorialClick = (tutorialId: string) => {
    setActiveTutorial(activeTutorial === tutorialId ? null : tutorialId);
  };

  const getDifficultyBadge = (difficulty: string) => {
    const config = {
      "Fácil": { className: "bg-green-100 text-green-800", icon: CheckCircle },
      "Intermedio": { className: "bg-yellow-100 text-yellow-800", icon: Clock },
      "Avanzado": { className: "bg-red-100 text-red-800", icon: Star }
    };
    
    const { className, icon: Icon } = config[difficulty as keyof typeof config];
    return (
      <Badge className={className}>
        <Icon className="w-3 h-3 mr-1" />
        {difficulty}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tutoriales</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprende a usar todas las características de la plataforma con nuestros tutoriales paso a paso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {tutorials.map((tutorial) => (
            <Card 
              key={tutorial.id}
              className={`border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                activeTutorial === tutorial.id ? 'border-blue-500 shadow-lg' : 'border-gray-200'
              }`}
              onClick={() => handleTutorialClick(tutorial.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${tutorial.color} rounded-full flex items-center justify-center`}>
                      <tutorial.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                        {tutorial.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {tutorial.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {getDifficultyBadge(tutorial.difficulty)}
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {tutorial.duration}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  className={`w-full ${tutorial.color.replace('bg-', 'bg-').replace('500', '600')} hover:${tutorial.color.replace('bg-', 'bg-').replace('500', '700')} text-white`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTutorialClick(tutorial.id);
                  }}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {activeTutorial === tutorial.id ? 'Ocultar Tutorial' : 'Ver Tutorial'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tutorial Details */}
        {activeTutorial && (
          <div className="space-y-6">
            {tutorials.map((tutorial) => {
              if (tutorial.id === activeTutorial) {
                return (
                  <Card key={`detail-${tutorial.id}`} className="border-2 border-blue-200 bg-blue-50">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className={`w-16 h-16 ${tutorial.color} rounded-full flex items-center justify-center`}>
                          <tutorial.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold text-gray-900">
                            {tutorial.title}
                          </CardTitle>
                          <CardDescription className="text-lg text-gray-600">
                            {tutorial.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Overview */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                            Resumen del Tutorial
                          </h3>
                          <p className="text-gray-700 bg-white p-4 rounded-lg border">
                            {tutorial.content.overview}
                          </p>
                        </div>

                        {/* Steps */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                            Pasos a Seguir
                          </h3>
                          <div className="space-y-3">
                            {tutorial.content.steps.map((step, index) => (
                              <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg border">
                                <div className={`w-8 h-8 ${tutorial.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                                  <span className="text-white font-bold text-sm">{index + 1}</span>
                                </div>
                                <p className="text-gray-700">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tips */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <Star className="w-5 h-5 mr-2 text-yellow-600" />
                            Consejos Útiles
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {tutorial.content.tips.map((tip, index) => (
                              <div key={index} className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                                <div className="flex items-start space-x-2">
                                  <Star className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                  <p className="text-gray-700 text-sm">{tip}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          <Button 
                            className={`${tutorial.color} hover:${tutorial.color.replace('500', '600')} text-white`}
                            onClick={() => {
                              // Simulate starting tutorial
                              alert(`¡Tutorial "${tutorial.title}" iniciado! Sigue los pasos indicados arriba.`);
                            }}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Iniciar Tutorial
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => {
                              // Simulate downloading tutorial guide
                              alert(`Guía del tutorial "${tutorial.title}" descargada.`);
                            }}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Descargar Guía
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}