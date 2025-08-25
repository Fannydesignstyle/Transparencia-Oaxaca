"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  Calendar, 
  Mail, 
  Phone, 
  Globe,
  MapPin,
  DollarSign,
  Edit,
  FileText,
  Activity,
  Download,
  Eye
} from "lucide-react";
import { DocumentViewer } from "@/components/document-viewer";

interface InstitutionProfile {
  id: string;
  name: string;
  type: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  director: string;
  employees: number;
  budget: string;
  foundationYear: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

interface Document {
  id: string;
  institutionId: string;
  title: string;
  type: string;
  category: string;
  description: string;
  fileUrl: string;
  fileSize: string;
  uploadDate: string;
  status: "published" | "draft";
}

interface Activity {
  id: string;
  institutionId: string;
  title: string;
  description: string;
  date: string;
  type: string;
  participants: number;
  location: string;
  status: "planned" | "in-progress" | "completed" | "cancelled";
}

export default function InstitutionProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const [institution, setInstitution] = useState<InstitutionProfile | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewerDocument, setViewerDocument] = useState<{
    id: string;
    title: string;
    type: string;
    fileUrl: string;
    category: string;
    description: string;
    fileSize: string;
  } | null>(null);

  // Mock data - en una aplicación real esto vendría de una API
  const mockInstitutions: InstitutionProfile[] = [
    {
      id: "1",
      name: "Ministerio de Educación",
      type: "Ministerio",
      description: "Institución encargada de la educación pública y privada en el país, responsable de definir políticas educativas y supervisar el sistema educativo nacional. Trabajamos para garantizar el acceso equitativo a la educación de calidad para todos los ciudadanos.",
      address: "Av. Principal 123, Ciudad",
      phone: "+1 234 567 890",
      email: "info@educacion.gov",
      website: "https://educacion.gov",
      director: "Dr. Carlos Méndez",
      employees: 2500,
      budget: "$50,000,000",
      foundationYear: 1990,
      status: "active",
      createdAt: "2024-01-15T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z"
    },
    {
      id: "2",
      name: "Secretaría de Salud",
      type: "Secretaría",
      description: "Entidad responsable de la salud pública y servicios médicos en todo el territorio nacional. Nos dedicamos a promover, proteger y restaurar la salud de todos los habitantes del país.",
      address: "Calle Salud 456, Ciudad",
      phone: "+1 234 567 891",
      email: "info@salud.gov",
      website: "https://salud.gov",
      director: "Dra. Ana Rodríguez",
      employees: 1800,
      budget: "$75,000,000",
      foundationYear: 1985,
      status: "active",
      createdAt: "2024-02-01T00:00:00Z",
      updatedAt: "2024-02-01T00:00:00Z"
    },
    {
      id: "3",
      name: "Fanny Design Style",
      type: "Empresa de Diseño",
      description: "Empresa especializada en diseño gráfico, branding y soluciones creativas para empresas y particulares. Ofrecemos servicios de diseño integral con enfoque en la innovación y la creatividad. Nuestra misión es transformar ideas en experiencias visuales impactantes que comuniquen eficazmente el mensaje de nuestros clientes.",
      address: "Oaxaca, México",
      phone: "9517439204",
      email: "fannydesignstyle@outlook.com",
      website: "https://fannydesignstyle.com",
      director: "Estefania Pérez Vázquez",
      employees: 5,
      budget: "$500,000",
      foundationYear: 2020,
      status: "active",
      createdAt: "2024-07-26T00:00:00Z",
      updatedAt: "2024-07-26T00:00:00Z"
    }
  ];

  const mockDocuments: Document[] = [
    {
      id: "1",
      institutionId: "1",
      title: "Presupuesto Anual 2024",
      type: "PDF",
      category: "Presupuesto",
      description: "Presupuesto detallado para el año fiscal 2024",
      fileUrl: "/documents/presupuesto-2024.pdf",
      fileSize: "2.5 MB",
      uploadDate: "2024-01-15T00:00:00Z",
      status: "published"
    },
    {
      id: "2",
      institutionId: "1",
      title: "Informe de Actividades Primer Trimestre",
      type: "PDF",
      category: "Informe",
      description: "Resumen de actividades realizadas en el primer trimestre del año",
      fileUrl: "/documents/informe-q1-2024.pdf",
      fileSize: "1.8 MB",
      uploadDate: "2024-04-01T00:00:00Z",
      status: "published"
    },
    {
      id: "3",
      institutionId: "2",
      title: "Plan de Salud 2024",
      type: "PDF",
      category: "Planificación",
      description: "Plan estratégico de salud para el año 2024",
      fileUrl: "/documents/plan-salud-2024.pdf",
      fileSize: "3.2 MB",
      uploadDate: "2024-01-20T00:00:00Z",
      status: "published"
    },
    {
      id: "4",
      institutionId: "3",
      title: "Portafolio de Servicios Fanny Design Style",
      type: "PDF",
      category: "Portafolio",
      description: "Catálogo completo de servicios de diseño gráfico, branding y soluciones creativas",
      fileUrl: "/documents/portafolio-fanny-design.pdf",
      fileSize: "5.2 MB",
      uploadDate: "2024-07-26T00:00:00Z",
      status: "published"
    },
    {
      id: "5",
      institutionId: "3",
      title: "Manual de Identidad Corporativa",
      type: "PDF",
      category: "Branding",
      description: "Guía completa de identidad visual y estándares de marca",
      fileUrl: "/documents/manual-identidad.pdf",
      fileSize: "3.1 MB",
      uploadDate: "2024-07-26T00:00:00Z",
      status: "published"
    }
  ];

  const mockActivities: Activity[] = [
    {
      id: "1",
      institutionId: "1",
      title: "Jornada de Capacitación Docente",
      description: "Capacitación para docentes sobre nuevas metodologías educativas",
      date: "2024-03-15T00:00:00Z",
      type: "Capacitación",
      participants: 150,
      location: "Auditorio Principal",
      status: "completed"
    },
    {
      id: "2",
      institutionId: "1",
      title: "Entrega de Útiles Escolares",
      description: "Distribución de útiles escolares a estudiantes de bajos recursos",
      date: "2024-04-20T00:00:00Z",
      type: "Evento Social",
      participants: 500,
      location: "Escuelas Públicas",
      status: "planned"
    },
    {
      id: "3",
      institutionId: "2",
      title: "Campaña de Vacunación",
      description: "Campaña nacional de vacunación contra la influenza",
      date: "2024-05-10T00:00:00Z",
      type: "Campaña de Salud",
      participants: 10000,
      location: "Centros de Salud",
      status: "completed"
    },
    {
      id: "4",
      institutionId: "3",
      title: "Lanzamiento de Nueva Colección de Diseño",
      description: "Presentación de la nueva colección de diseños gráficos y branding para clientes corporativos",
      date: "2024-08-15T00:00:00Z",
      type: "Evento Corporativo",
      participants: 50,
      location: "Galería de Arte Oaxaca",
      status: "planned"
    },
    {
      id: "5",
      institutionId: "3",
      title: "Taller de Diseño Creativo",
      description: "Taller práctico sobre técnicas de diseño gráfico y creatividad aplicada",
      date: "2024-09-10T00:00:00Z",
      type: "Capacitación",
      participants: 25,
      location: "Estudios Fanny Design",
      status: "planned"
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const foundInstitution = mockInstitutions.find(inst => inst.id === id);
      const institutionDocuments = mockDocuments.filter(doc => doc.institutionId === id);
      const institutionActivities = mockActivities.filter(act => act.institutionId === id);
      
      setInstitution(foundInstitution || null);
      setDocuments(institutionDocuments);
      setActivities(institutionActivities);
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "active": { className: "bg-green-100 text-green-800", text: "Activa" },
      "inactive": { className: "bg-red-100 text-red-800", text: "Inactiva" },
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

  const handleViewDocument = (doc: Document) => {
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
    // Crear un enlace temporal para la descarga
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando ficha institucional...</p>
        </div>
      </div>
    );
  }

  if (!institution) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Institución no encontrada</h3>
              <p className="text-gray-600 mb-4">La institución que buscas no existe o no está disponible.</p>
              <Button onClick={() => router.push("/admin/fichas")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Fichas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ficha Institucional</h1>
            <p className="text-gray-600 mt-1">{institution.name}</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-2">
            {getStatusBadge(institution.status)}
            <Button size="sm" onClick={() => alert('Función de editar institución próximamente')}>
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información Principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{institution.name}</CardTitle>
              <CardDescription>{institution.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Descripción</h3>
                  <p className="text-gray-700 leading-relaxed">{institution.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Dirección</p>
                        <p className="font-medium">{institution.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Teléfono</p>
                        <p className="font-medium">{institution.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{institution.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Sitio Web</p>
                        <a 
                          href={institution.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          {institution.website}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Director</p>
                        <p className="font-medium">{institution.director}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Fundación</p>
                        <p className="font-medium">{institution.foundationYear}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Documentos</span>
              </CardTitle>
              <CardDescription>
                Documentos asociados a la institución
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.length > 0 ? (
                  documents.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-4 sm:space-y-0">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h4 className="font-medium">{doc.title}</h4>
                            {getStatusBadge(doc.status)}
                            <Badge variant="outline">{doc.type}</Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-2">
                            <span>{doc.category}</span>
                            <span>•</span>
                            <span>{doc.fileSize}</span>
                          </div>
                          <p className="text-sm text-gray-600">{doc.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewDocument(doc)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Ver
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDownloadDocument(doc.fileUrl, doc.title)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Descargar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No hay documentos disponibles</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actividades */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Actividades</span>
              </CardTitle>
              <CardDescription>
                Actividades y eventos de la institución
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <div key={activity.id} className="border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-4 sm:space-y-0">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h4 className="font-medium">{activity.title}</h4>
                            {getStatusBadge(activity.status)}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-2">
                            <span>{activity.type}</span>
                            <span>•</span>
                            <span>{activity.participants} participantes</span>
                            <span>•</span>
                            <span>{activity.location}</span>
                          </div>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No hay actividades registradas</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Información Adicional */}
          <Card>
            <CardHeader>
              <CardTitle>Información Adicional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Empleados</span>
                  <span className="font-medium">{institution.employees}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Presupuesto</span>
                  <span className="font-medium">{institution.budget}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Fundación</span>
                  <span className="font-medium">{institution.foundationYear}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Estado</span>
                  {getStatusBadge(institution.status)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Documentos</span>
                  <span className="font-medium">{documents.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Actividades</span>
                  <span className="font-medium">{activities.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Documentos Publicados</span>
                  <span className="font-medium">{documents.filter(d => d.status === "published").length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Actividades Completadas</span>
                  <span className="font-medium">{activities.filter(a => a.status === "completed").length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acciones Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Institución
                </Button>
                <Button className="w-full" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Agregar Documento
                </Button>
                <Button className="w-full" variant="outline">
                  <Activity className="w-4 h-4 mr-2" />
                  Registrar Actividad
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {viewerDocument && (
        <DocumentViewer
          isOpen={!!viewerDocument}
          onClose={() => setViewerDocument(null)}
          document={viewerDocument}
        />
      )}
    </div>
  );
}