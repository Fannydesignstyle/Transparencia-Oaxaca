"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  Calendar,
  Users,
  Target,
  Lightbulb,
  Award,
  FileText,
  Activity,
  Star,
  Eye,
  Download
} from "lucide-react";
import Image from "next/image";
import { DocumentViewer } from "@/components/document-viewer";

export default function FannyDesignStylePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [viewerDocument, setViewerDocument] = useState<{
    id: string;
    title: string;
    type: string;
    fileUrl: string;
    category: string;
    description: string;
    fileSize: string;
  } | null>(null);

  const institution = {
    id: "3",
    name: "Fanny Design Style",
    type: "Empresa de Diseño",
    description: "Empresa especializada en diseño gráfico, branding y soluciones creativas para empresas y particulares. Ofrecemos servicios de diseño integral con enfoque en la innovación y la creatividad.",
    address: "Oaxaca, México",
    phone: "9517439204",
    email: "fannydesignstyle@outlook.com",
    website: "https://fannydesignstyle.com",
    director: "Estefania Pérez Vázquez",
    directorInfo: {
      birthDate: "26 de julio de 1998",
      origin: "Puebla, México",
      currentLocation: "Oaxaca, México",
      position: "Fundadora y Directora General"
    },
    employees: 5,
    budget: "$500,000",
    foundationYear: 2020,
    status: "active",
    createdAt: "2024-07-26T00:00:00Z",
    updatedAt: "2024-07-26T00:00:00Z"
  };

  const objectives = [
    {
      title: "Innovación Creativa",
      description: "Desarrollar soluciones de diseño innovadoras que superen las expectativas de los clientes y establezcan nuevas tendencias en la industria.",
      icon: Lightbulb,
      status: "active"
    },
    {
      title: "Excelencia en Servicio",
      description: "Ofrecer un servicio excepcional con atención personalizada, asegurando la satisfacción total del cliente en cada proyecto.",
      icon: Star,
      status: "active"
    },
    {
      title: "Crecimiento Sostenible",
      description: "Expandir la presencia de la empresa en el mercado nacional e internacional, manteniendo la calidad y el compromiso con el diseño.",
      icon: Target,
      status: "in-progress"
    },
    {
      title: "Desarrollo Profesional",
      description: "Fomentar el crecimiento continuo del equipo a través de capacitación constante y participación en eventos de la industria.",
      icon: Award,
      status: "active"
    }
  ];

  const services = [
    {
      name: "Diseño Gráfico",
      description: "Creación de identidad visual, logotipos, banners y materiales publicitarios"
    },
    {
      name: "Branding Corporativo",
      description: "Desarrollo de marca completa con manual de identidad y estrategia de posicionamiento"
    },
    {
      name: "Diseño Web",
      description: "Diseño de interfaces web y experiencia de usuario (UX/UI)"
    },
    {
      name: "Marketing Digital",
      description: "Creación de contenido visual para redes sociales y campañas digitales"
    },
    {
      name: "Diseño Editorial",
      description: "Maquetación de libros, revistas y materiales impresos"
    },
    {
      name: "Consultoría Creativa",
      description: "Asesoramiento en estrategias de diseño y comunicación visual"
    }
  ];

  const documents = [
    {
      id: "1",
      title: "Portafolio de Servicios",
      type: "PDF",
      category: "Portafolio",
      description: "Catálogo completo de servicios de diseño gráfico, branding y soluciones creativas",
      fileSize: "5.2 MB",
      uploadDate: "2024-07-26T00:00:00Z",
      status: "published",
      fileUrl: "/documents/fannydesignstyle/portafolio-servicios.pdf"
    },
    {
      id: "2",
      title: "Manual de Identidad Corporativa",
      type: "PDF",
      category: "Branding",
      description: "Guía completa de identidad visual y estándares de marca",
      fileSize: "3.1 MB",
      uploadDate: "2024-07-26T00:00:00Z",
      status: "published",
      fileUrl: "/documents/fannydesignstyle/manual-identidad-corporativa.pdf"
    },
    {
      id: "3",
      title: "Catálogo de Trabajos",
      type: "PDF",
      category: "Portafolio",
      description: "Colección de proyectos realizados por Fanny Design Style",
      fileSize: "7.8 MB",
      uploadDate: "2024-07-26T00:00:00Z",
      status: "published",
      fileUrl: "/documents/fannydesignstyle/catalogo-trabajos.pdf"
    },
    {
      id: "4",
      title: "Presentación Corporativa",
      type: "PDF",
      category: "Corporativo",
      description: "Presentación institucional con información sobre la empresa",
      fileSize: "4.5 MB",
      uploadDate: "2024-07-26T00:00:00Z",
      status: "published",
      fileUrl: "/documents/fannydesignstyle/presentacion-corporativa.pdf"
    }
  ];

  const activities = [
    {
      id: "1",
      title: "Lanzamiento de Nueva Colección de Diseño",
      description: "Presentación de la nueva colección de diseños gráficos y branding para clientes corporativos",
      date: "2024-08-15T00:00:00Z",
      type: "Evento Corporativo",
      participants: 50,
      location: "Galería de Arte Oaxaca",
      status: "planned"
    },
    {
      id: "2",
      title: "Taller de Diseño Creativo",
      description: "Taller práctico sobre técnicas de diseño gráfico y creatividad aplicada",
      date: "2024-09-10T00:00:00Z",
      type: "Capacitación",
      participants: 25,
      location: "Estudios Fanny Design",
      status: "planned"
    },
    {
      id: "3",
      title: "Participación en Feria de Emprendedores",
      description: "Presentación de servicios y portafolio en feria de emprendedores locales",
      date: "2024-07-30T00:00:00Z",
      type: "Evento Comercial",
      participants: 200,
      location: "Centro de Convenciones Oaxaca",
      status: "completed"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "active": { className: "bg-green-100 text-green-800", text: "Activo" },
      "inactive": { className: "bg-red-100 text-red-800", text: "Inactivo" },
      "published": { className: "bg-green-100 text-green-800", text: "Publicado" },
      "draft": { className: "bg-yellow-100 text-yellow-800", text: "Borrador" },
      "planned": { className: "bg-blue-100 text-blue-800", text: "Planificado" },
      "in-progress": { className: "bg-orange-100 text-orange-800", text: "En Progreso" },
      "completed": { className: "bg-green-100 text-green-800", text: "Completado" },
      "cancelled": { className: "bg-red-100 text-red-800", text: "Cancelado" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.text}</Badge>;
  };

  const handleViewDocument = (doc: any) => {
    setViewerDocument({
      id: doc.id,
      title: doc.title,
      type: doc.type,
      fileUrl: doc.fileUrl,
      category: doc.category,
      description: doc.description,
      fileSize: doc.fileSize
    });
  };

  const handleDownloadDocument = (fileUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Admin */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.push("/admin/fichas")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div className="relative w-10 h-10">
                <Image
                  src="/logo-transparencia.png"
                  alt="Transparencia Conectada"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Fanny Design Style</h1>
                <p className="text-sm text-gray-600">Ficha Institucional Completa</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {getStatusBadge(institution.status)}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información Principal */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Resumen</TabsTrigger>
                <TabsTrigger value="objectives">Objetivos</TabsTrigger>
                <TabsTrigger value="services">Servicios</TabsTrigger>
                <TabsTrigger value="documents">Documentos</TabsTrigger>
                <TabsTrigger value="activities">Actividades</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building2 className="w-5 h-5" />
                      <span>Información de la Empresa</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{institution.name}</h3>
                        <p className="text-gray-600">{institution.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{institution.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{institution.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-blue-600">{institution.website}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">Fundada en {institution.foundationYear}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{institution.employees} empleados</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">Presupuesto: {institution.budget}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Información de la Fundadora</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">{institution.director}</h4>
                        <p className="text-sm text-gray-600 mb-3">{institution.directorInfo.position}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Fecha de Nacimiento</p>
                          <p className="text-sm text-gray-600">{institution.directorInfo.birthDate}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Originaria de</p>
                          <p className="text-sm text-gray-600">{institution.directorInfo.origin}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm font-medium text-gray-700">Residencia Actual</p>
                          <p className="text-sm text-gray-600">{institution.directorInfo.currentLocation}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="objectives" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Objetivos Empresariales</CardTitle>
                    <CardDescription>
                      Visión y metas estratégicas de Fanny Design Style
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {objectives.map((objective, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <objective.icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{objective.title}</h4>
                                {getStatusBadge(objective.status)}
                              </div>
                              <p className="text-sm text-gray-600">{objective.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Servicios Ofrecidos</CardTitle>
                    <CardDescription>
                      Soluciones creativas y profesionales de diseño
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <h4 className="font-semibold mb-2">{service.name}</h4>
                          <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Documentos Institucionales</CardTitle>
                    <CardDescription>
                      Documentos oficiales y materiales de Fanny Design Style
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {documents.map((doc) => (
                        <div key={doc.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <FileText className="w-5 h-5 text-blue-600" />
                              <h4 className="font-semibold">{doc.title}</h4>
                            </div>
                            {getStatusBadge(doc.status)}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <span>{doc.type}</span>
                            <span>{doc.fileSize}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewDocument(doc)}
                              className="flex-1"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Ver
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDownloadDocument(doc.fileUrl, doc.title)}
                              className="flex-1"
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Descargar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activities" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Actividades y Eventos</CardTitle>
                    <CardDescription>
                      Seguimiento de actividades institucionales
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div key={activity.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-medium">{activity.title}</h3>
                                {getStatusBadge(activity.status)}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                <span>{activity.type}</span>
                                <span>•</span>
                                <span>{activity.participants} participantes</span>
                                <span>•</span>
                                <span>{activity.location}</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                              <p className="text-xs text-gray-500">
                                Fecha: {new Date(activity.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Logo */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src="/fanny-design-logo.png"
                      alt="Fanny Design Style Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{institution.name}</h3>
                  <p className="text-sm text-gray-600">{institution.type}</p>
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estadísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Años de Experiencia</span>
                    <span className="font-semibold">{new Date().getFullYear() - institution.foundationYear}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Proyectos Completados</span>
                    <span className="font-semibold">150+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Clientes Satisfechos</span>
                    <span className="font-semibold">120+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Empleados</span>
                    <span className="font-semibold">{institution.employees}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documentos Recientes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Documentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center space-x-3 p-2 border rounded">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{doc.title}</p>
                        <p className="text-xs text-gray-500">{doc.fileSize}</p>
                      </div>
                      {getStatusBadge(doc.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {viewerDocument && (
        <DocumentViewer
          document={viewerDocument}
          isOpen={!!viewerDocument}
          onClose={() => setViewerDocument(null)}
        />
      )}
    </div>
  );
}