"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, QrCode, MessageSquare, Monitor, ArrowRight, Search, FileText } from "lucide-react";
import Image from "next/image";
import InstitutionsSection from "@/components/InstitutionsSection";
import QRSection from "@/components/QRSection";
import ParticipationSection from "@/components/ParticipationSection";
import AccessibleDesignSection from "@/components/AccessibleDesignSection";
import Footer from "@/components/Footer";

// Datos de ejemplo
const sampleInstitutions = [
  {
    id: "1",
    name: "Ministerio de Educación",
    type: "Ministerio",
    description: "Institución encargada de la educación pública y privada en el país",
    address: "Av. Principal 123, Ciudad",
    phone: "+1 234 567 890",
    email: "info@educacion.gov",
    website: "https://educacion.gov"
  },
  {
    id: "2",
    name: "Secretaría de Salud",
    type: "Secretaría",
    description: "Entidad responsable de la salud pública y servicios médicos",
    address: "Calle Salud 456, Ciudad",
    phone: "+1 234 567 891",
    email: "info@salud.gov",
    website: "https://salud.gov"
  },
  {
    id: "3",
    name: "Municipalidad Central",
    type: "Municipalidad",
    description: "Gobierno local de la ciudad principal",
    address: "Plaza Central 789, Ciudad",
    phone: "+1 234 567 892",
    email: "info@municipalidad.gov",
    website: "https://municipalidad.gov"
  }
];

const sampleProfiles = [
  {
    id: "1",
    institutionId: "1",
    title: "Presupuesto Anual 2024",
    category: "Presupuesto",
    content: "Detalle completo del presupuesto asignado al Ministerio de Educación para el año 2024, incluyendo desglose por programas y proyectos...",
    publishDate: "2024-01-15T00:00:00Z"
  },
  {
    id: "2",
    institutionId: "1",
    title: "Informe de Actividades Primer Trimestre",
    category: "Informe",
    content: "Resumen de las actividades realizadas durante el primer trimestre del año 2024, incluyendo metas alcanzadas y estadísticas educativas...",
    publishDate: "2024-04-01T00:00:00Z"
  },
  {
    id: "3",
    institutionId: "2",
    title: "Plan de Salud Pública",
    category: "Planificación",
    content: "Plan estratégico para la mejora de la salud pública en el país, incluyendo programas de vacunación y prevención...",
    publishDate: "2024-02-20T00:00:00Z"
  }
];

const sampleQRCodes = [
  {
    id: "1",
    institutionId: "1",
    title: "QR Ministerio de Educación",
    description: "Código QR para acceder al perfil del Ministerio de Educación",
    code: "EDU-2024-001",
    isActive: true,
    createdAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "2",
    institutionId: "2",
    title: "QR Secretaría de Salud",
    description: "Código QR para acceder al perfil de la Secretaría de Salud",
    code: "SAL-2024-002",
    isActive: true,
    createdAt: "2024-02-01T00:00:00Z"
  },
  {
    id: "3",
    institutionId: "3",
    title: "QR Municipalidad Central",
    description: "Código QR para acceder al perfil de la Municipalidad Central",
    code: "MUN-2024-003",
    isActive: true,
    createdAt: "2024-03-01T00:00:00Z"
  }
];

const sampleInquiries = [
  {
    id: "1",
    institutionId: "1",
    subject: "Consulta sobre becas estudiantiles",
    content: "Me gustaría conocer más información sobre las becas disponibles para el próximo año escolar y los requisitos para aplicar.",
    status: "Respondida",
    createdAt: "2024-01-10T00:00:00Z",
    response: "Las becas estudiantiles para el próximo año estarán disponibles a partir de marzo. Los requisitos incluyen: ser estudiante regular, tener promedio mínimo de 8.5, y presentar documentación socioeconómica. Puede encontrar más información en nuestra web.",
    responseDate: "2024-01-12T00:00:00Z"
  },
  {
    id: "2",
    institutionId: "2",
    subject: "Sugerencia para mejorar horarios de atención",
    content: "Propongo extender los horarios de atención en los centros de salud hasta las 20:00 para facilitar el acceso a trabajadores.",
    status: "En Progreso",
    createdAt: "2024-02-05T00:00:00Z",
    response: "",
    responseDate: ""
  },
  {
    id: "3",
    institutionId: "3",
    subject: "Reclamo por alumbrado público",
    content: "En mi barrio hay varias calles sin alumbrado público funcional, lo que representa un riesgo para la seguridad de los vecinos.",
    status: "Pendiente",
    createdAt: "2024-03-01T00:00:00Z",
    response: "",
    responseDate: ""
  }
];

const sampleConsultations = [
  {
    id: "1",
    institutionId: "3",
    title: "Mejora del parque central",
    description: "Consulta pública para decidir las mejoras a realizar en el parque central de la ciudad. Proponemos diferentes opciones para su renovación.",
    startDate: "2024-03-15T00:00:00Z",
    endDate: "2024-04-30T00:00:00Z",
    status: "Activa",
    createdAt: "2024-03-15T00:00:00Z"
  },
  {
    id: "2",
    institutionId: "1",
    title: "Implementación de tecnología educativa",
    description: "Participa en la consulta sobre qué tecnologías educativas deberíamos priorizar para las escuelas públicas del país.",
    startDate: "2024-03-20T00:00:00Z",
    endDate: "2024-05-15T00:00:00Z",
    status: "Activa",
    createdAt: "2024-03-20T00:00:00Z"
  }
];

export default function Home() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showDetailedComponent, setShowDetailedComponent] = useState<string | null>(null);

  const features = [
    {
      id: "perfiles",
      title: "PERFILES INSTITUCIONALES",
      description: "Accede a los archivos de información pública de todas las instituciones gubernamentales",
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      id: "qr",
      title: "CÓDIGOS QR",
      description: "Escanea códigos QR para acceder rápidamente a la información de cualquier institución",
      icon: QrCode,
      color: "bg-green-500",
    },
    {
      id: "participacion",
      title: "PARTICIPACIÓN CIUDADANA",
      description: "Envía consultas, sugerencias y participa activamente en la toma de decisiones",
      icon: MessageSquare,
      color: "bg-purple-500",
    },
    {
      id: "accesible",
      title: "DISEÑO ACCESIBLE",
      description: "Interfaz clara y fácil de usar, optimizada para todos los dispositivos",
      icon: Monitor,
      color: "bg-orange-500",
    },
  ];

  const handleFeatureClick = (id: string) => {
    setActiveSection(activeSection === id ? null : id);
  };

  const handleShowDetailedComponent = (component: string) => {
    setShowDetailedComponent(component);
  };

  const handleBackToOverview = () => {
    setShowDetailedComponent(null);
  };

  const handleExplorePlatform = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo-transparencia.png"
                  alt="Transparencia Conectada"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TRANSPARENCIA CONECTADA</h1>
                <p className="text-sm text-gray-600">Plataforma digital de transparencia y participación ciudadana</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
              <Button size="sm" onClick={() => {
                console.log("Botón de inicio de sesión presionado");
                router.push("/admin/login");
              }}>
                Iniciar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Acercando la información pública a la ciudadanía
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Una plataforma innovadora e independiente que democratiza el acceso a la información y 
            fomenta la participación activa de los ciudadanos en la gestión pública.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button size="lg" className="px-8 py-3 text-lg" onClick={handleExplorePlatform}>
              Explorar Plataforma
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg" onClick={() => {
              router.push("/documentos");
            }}>
              Ver Documentos
              <FileText className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-sm text-gray-600">Documentos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-sm text-gray-600">Instituciones</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-sm text-gray-600">Consultas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Disponibilidad</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Características Principales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card 
                key={feature.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  activeSection === feature.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleFeatureClick(feature.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      {activeSection && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            {activeSection === "perfiles" && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Building2 className="w-8 h-8 mr-3 text-blue-500" />
                    Perfiles Institucionales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Información Centralizada</h4>
                      <p className="text-gray-600 mb-4">
                        Accede a todos los perfiles institucionales en un solo lugar. Desde presupuestos hasta informes de actividades, 
                        todo organizado y fácil de consultar.
                      </p>
                      <Button variant="outline" onClick={() => handleShowDetailedComponent("institutions")} className="w-full sm:w-auto">
                        Explorar Instituciones
                      </Button>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Información Actualizada</h4>
                      <p className="text-gray-600 mb-4">
                        Accede a datos en tiempo real sobre el funcionamiento de las instituciones, 
                        sus responsables, contactos y documentos oficiales actualizados constantemente.
                      </p>
                      <Button variant="outline" onClick={() => handleShowDetailedComponent("institutions")} className="w-full sm:w-auto">
                        Ver Últimas Actualizaciones
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "qr" && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <QrCode className="w-8 h-8 mr-3 text-green-500" />
                    Códigos QR
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Acceso Rápido</h4>
                      <p className="text-gray-600 mb-4">
                        Cada institución tiene su código QR único. Escanéalo con tu dispositivo móvil 
                        para acceder instantáneamente a su perfil institucional y toda su información pública.
                      </p>
                      <Button variant="outline" onClick={() => handleShowDetailedComponent("qr")} className="w-full sm:w-auto">
                        Escanear Código QR
                      </Button>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Compartir Información</h4>
                      <p className="text-gray-600 mb-4">
                        Comparte fácilmente los códigos QR para que otros ciudadanos puedan acceder 
                        a la información institucional. Promueve la transparencia en tu comunidad.
                      </p>
                      <Button variant="outline" onClick={() => handleShowDetailedComponent("qr")} className="w-full sm:w-auto">
                        Descargar Códigos
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "participacion" && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <MessageSquare className="w-8 h-8 mr-3 text-purple-500" />
                    Participación Ciudadana
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Comunicación Directa</h4>
                      <p className="text-gray-600 mb-4">
                        Envía tus consultas, sugerencias y reclamos directamente a las instituciones. 
                        Recibe respuestas oficiales y sigue el estado de tus solicitudes en tiempo real.
                      </p>
                      <Button variant="outline" onClick={() => handleShowDetailedComponent("participation")} className="w-full sm:w-auto">
                        Enviar Consulta
                      </Button>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Decisión Conjunta</h4>
                      <p className="text-gray-600 mb-4">
                        Participa en consultas públicas, vota en iniciativas y contribuye a la toma 
                        de decisiones que afectan a tu comunidad. Tu voz importa.
                      </p>
                      <Button variant="outline" onClick={() => handleShowDetailedComponent("participation")} className="w-full sm:w-auto">
                        Ver Consultas Activas
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "accesible" && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Monitor className="w-8 h-8 mr-3 text-orange-500" />
                    Diseño Accesible
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Interfaz Intuitiva</h4>
                      <p className="text-gray-600 mb-4">
                        Diseño pensado para todos los usuarios, con navegación clara, 
                        estructura lógica y presentación visual que facilita el acceso a la información.
                      </p>
                      <Button variant="outline" onClick={() => handleShowDetailedComponent("accessible")} className="w-full sm:w-auto">
                        Guía de Uso
                      </Button>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Multiplataforma</h4>
                      <p className="text-gray-600 mb-4">
                        Accede desde cualquier dispositivo: computadora, tablet o smartphone. 
                        La plataforma se adapta perfectamente a diferentes tamaños de pantalla.
                      </p>
                      <Button variant="outline" onClick={() => handleShowDetailedComponent("accessible")} className="w-full sm:w-auto">
                        Probar Versión Móvil
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Detailed Components Section */}
      {showDetailedComponent && (
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="mb-6">
              <Button variant="outline" onClick={handleBackToOverview} className="w-full sm:w-auto">
                ← Volver a la vista general
              </Button>
            </div>
            
            {showDetailedComponent === "institutions" && (
              <InstitutionsSection 
                institutions={sampleInstitutions} 
                profiles={sampleProfiles}
              />
            )}
            
            {showDetailedComponent === "qr" && (
              <QRSection 
                institutions={sampleInstitutions} 
                qrCodes={sampleQRCodes}
              />
            )}
            
            {showDetailedComponent === "participation" && (
              <ParticipationSection 
                institutions={sampleInstitutions} 
                inquiries={sampleInquiries}
                consultations={sampleConsultations}
              />
            )}
            
            {showDetailedComponent === "accessible" && (
              <AccessibleDesignSection />
            )}
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Lo que dicen los ciudadanos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👤</span>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Esta plataforma ha revolucionado cómo accedemos a la información pública. 
                  Es transparente, fácil de usar y muy completa."
                </p>
                <p className="font-semibold text-gray-900">María González</p>
                <p className="text-sm text-gray-500">Ciudadana</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👨‍💼</span>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Como periodista, esta herramienta me ha facilitado enormemente el acceso 
                  a documentos oficiales y información de interés público."
                </p>
                <p className="font-semibold text-gray-900">Carlos Rodríguez</p>
                <p className="text-sm text-gray-500">Periodista</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👩‍🎓</span>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Excelente iniciativa para promover la transparencia y la participación ciudadana. 
                  Es un ejemplo de cómo la tecnología puede servir a la democracia."
                </p>
                <p className="font-semibold text-gray-900">Ana Martínez</p>
                <p className="text-sm text-gray-500">Investigadora</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para explorar la plataforma?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de ciudadanos que ya están utilizando Transparencia Conectada 
            para acceder a información pública y participar en la gestión democrática.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg" onClick={() => {
              router.push("/documentos");
            }}>
              Explorar Documentos
              <FileText className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-blue-600" onClick={() => {
              router.push("/participacion");
            }}>
              Participar
              <MessageSquare className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}