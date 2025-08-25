"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Building2, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  FileText,
  Upload,
  Calendar,
  Users,
  Activity,
  ArrowLeft,
  Download,
  CheckCircle,
  X,
  MapPin,
  Clock,
  Target
} from "lucide-react";
import Image from "next/image";

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

export default function AdminFichasPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState<InstitutionProfile | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("institutions");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showActivityDetail, setShowActivityDetail] = useState(false);
  const [showActivityEdit, setShowActivityEdit] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [showInstitutionEdit, setShowInstitutionEdit] = useState(false);
  const [editingInstitution, setEditingInstitution] = useState<InstitutionProfile | null>(null);

  const [institutions, setInstitutions] = useState<InstitutionProfile[]>([
    {
      id: "1",
      name: "Ministerio de Educación",
      type: "Ministerio",
      description: "Institución encargada de la educación pública y privada en el país, responsable de definir políticas educativas y supervisar el sistema educativo nacional.",
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
      description: "Entidad responsable de la salud pública y servicios médicos en todo el territorio nacional.",
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
      description: "Empresa especializada en diseño gráfico, branding y soluciones creativas para empresas y particulares. Ofrecemos servicios de diseño integral con enfoque en la innovación y la creatividad.",
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
  ]);

  const [documents, setDocuments] = useState<Document[]>([
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
      id: "4",
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
  ]);

  const [activities, setActivities] = useState<Activity[]>([
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
      id: "4",
      institutionId: "3",
      title: "Taller de Diseño Creativo",
      description: "Taller práctico sobre técnicas de diseño gráfico y creatividad aplicada",
      date: "2024-09-10T00:00:00Z",
      type: "Capacitación",
      participants: 25,
      location: "Estudios Fanny Design",
      status: "planned"
    },
    {
      id: "5",
      institutionId: "3",
      title: "Participación en Feria de Emprendedores",
      description: "Presentación de servicios y portafolio en feria de emprendedores locales",
      date: "2024-07-30T00:00:00Z",
      type: "Evento Comercial",
      participants: 200,
      location: "Centro de Convenciones Oaxaca",
      status: "completed"
    }
  ]);

  const filteredInstitutions = institutions.filter(institution =>
    institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    institution.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const getInstitutionDocuments = (institutionId: string) => {
    return documents.filter(doc => doc.institutionId === institutionId);
  };

  const getInstitutionActivities = (institutionId: string) => {
    return activities.filter(activity => activity.institutionId === institutionId);
  };

  const handleViewDocument = (fileUrl: string, title: string) => {
    // Simular la vista de documentos con un modal en lugar de abrir directamente
    toast({
      title: "Vista previa del documento",
      description: `Documento: "${title}"\nEn una implementación real, esto abriría el documento en una nueva pestaña o mostraría un visor de documentos integrado.`,
      duration: 4000,
    });
  };

  const handleDownloadDocument = (fileUrl: string, filename: string) => {
    // Simular la descarga de documentos
    toast({
      title: "Descarga de documento",
      description: `Descargando: "${filename}"\nEn una implementación real, esto iniciaría la descarga del archivo.`,
      duration: 4000,
    });
  };

  const handleCloseActivityDetail = () => {
    setShowActivityDetail(false);
    setSelectedActivity(null);
  };

  const handleViewActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowActivityDetail(true);
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setShowActivityEdit(true);
  };

  const handleCloseActivityEdit = () => {
    setShowActivityEdit(false);
    setEditingActivity(null);
  };

  const handleSaveActivity = (updatedActivity: Activity) => {
    setActivities(prev => prev.map(act => 
      act.id === updatedActivity.id ? updatedActivity : act
    ));
    setShowActivityEdit(false);
    setEditingActivity(null);
  };

  const handleEditInstitution = (institution: InstitutionProfile) => {
    setEditingInstitution(institution);
    setShowInstitutionEdit(true);
  };

  const handleCloseInstitutionEdit = () => {
    setShowInstitutionEdit(false);
    setEditingInstitution(null);
  };

  const handleSaveInstitution = (updatedInstitution: InstitutionProfile) => {
    setInstitutions(prev => prev.map(inst => 
      inst.id === updatedInstitution.id ? updatedInstitution : inst
    ));
    setSelectedInstitution(updatedInstitution);
    setShowInstitutionEdit(false);
    setEditingInstitution(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Admin */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.push("/admin/dashboard")}>
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
                <h1 className="text-xl font-bold text-gray-900">Panel Administrativo</h1>
                <p className="text-sm text-gray-600">Gestión de Fichas Institucionales</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button size="sm" onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Institución
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8">
            <TabsTrigger value="institutions" className="text-xs sm:text-sm">Instituciones</TabsTrigger>
            <TabsTrigger value="documents" className="text-xs sm:text-sm">Documentos</TabsTrigger>
            <TabsTrigger value="activities" className="text-xs sm:text-sm">Actividades</TabsTrigger>
          </TabsList>

          <TabsContent value="institutions" className="space-y-6">
            {/* Search and Stats */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="relative flex-1 w-full lg:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar instituciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full lg:w-auto">
                <Card className="flex-1 min-w-0">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold">{institutions.length}</div>
                    <p className="text-xs text-gray-600">Total</p>
                  </CardContent>
                </Card>
                <Card className="flex-1 min-w-0">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold">
                      {institutions.filter(i => i.status === "active").length}
                    </div>
                    <p className="text-xs text-gray-600">Activas</p>
                  </CardContent>
                </Card>
                <Card className="flex-1 min-w-0">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold">
                      {institutions.filter(i => i.status === "inactive").length}
                    </div>
                    <p className="text-xs text-gray-600">Inactivas</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Institutions Grid */}
            <div className="flex flex-col xl:flex-row gap-6">
              <div className="w-full xl:w-1/2 space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg sm:text-xl">Lista de Instituciones</CardTitle>
                    <CardDescription className="text-sm">
                      {filteredInstitutions.length} instituciones encontradas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {filteredInstitutions.map((institution) => (
                        <div
                          key={institution.id}
                          className={`border rounded-lg p-3 sm:p-4 cursor-pointer hover:shadow-md transition-shadow ${
                            selectedInstitution?.id === institution.id ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => setSelectedInstitution(institution)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-medium text-sm sm:text-base line-clamp-2">{institution.name}</h3>
                            {getStatusBadge(institution.status)}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">{institution.type}</p>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{institution.employees} empleados</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>Desde {institution.foundationYear}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Institution Detail */}
              <div className="w-full xl:w-1/2">
                {selectedInstitution ? (
                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <CardTitle className="text-lg sm:text-xl line-clamp-2">{selectedInstitution.name}</CardTitle>
                          <CardDescription className="text-sm">Ficha Institucional Completa</CardDescription>
                        </div>
                        {getStatusBadge(selectedInstitution.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium">Tipo</Label>
                            <p className="text-sm text-gray-600 break-words">{selectedInstitution.type}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Director</Label>
                            <p className="text-sm text-gray-600 break-words">{selectedInstitution.director}</p>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium">Descripción</Label>
                          <p className="text-sm text-gray-700 mt-1 leading-relaxed">{selectedInstitution.description}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium">Dirección</Label>
                            <p className="text-sm text-gray-600 break-words">{selectedInstitution.address}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Teléfono</Label>
                            <p className="text-sm text-gray-600 break-words">{selectedInstitution.phone}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium">Email</Label>
                            <p className="text-sm text-gray-600 break-words">{selectedInstitution.email}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Sitio Web</Label>
                            <p className="text-sm text-blue-600 break-words">{selectedInstitution.website}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <Label className="text-sm font-medium">Empleados</Label>
                            <p className="text-sm text-gray-600">{selectedInstitution.employees}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Presupuesto</Label>
                            <p className="text-sm text-gray-600 break-words">{selectedInstitution.budget}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Fundación</Label>
                            <p className="text-sm text-gray-600">{selectedInstitution.foundationYear}</p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 pt-4 border-t">
                          <Button size="sm" onClick={() => selectedInstitution && handleEditInstitution(selectedInstitution)} className="flex-1 sm:flex-none">
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => router.push(`/admin/fichas/${selectedInstitution.id}?id=${selectedInstitution.id}`)} className="flex-1 sm:flex-none">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Ficha Completa
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setActiveTab("documents")} className="flex-1 sm:flex-none">
                            <FileText className="w-4 h-4 mr-2" />
                            Ver Documentos ({getInstitutionDocuments(selectedInstitution.id).length})
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setActiveTab("activities")} className="flex-1 sm:flex-none">
                            <Activity className="w-4 h-4 mr-2" />
                            Ver Actividades ({getInstitutionActivities(selectedInstitution.id).length})
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center h-64">
                      <div className="text-center p-4">
                        <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-sm sm:text-base">Seleccione una institución para ver su ficha completa</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg sm:text-xl">Gestión de Documentos</CardTitle>
                    <CardDescription className="text-sm">Administra los documentos de todas las instituciones</CardDescription>
                  </div>
                  <Button onClick={() => alert('Función de subir documento próximamente')} className="w-full sm:w-auto">
                    <Upload className="w-4 h-4 mr-2" />
                    Subir Documento
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-3 sm:p-4">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <h3 className="font-medium text-sm sm:text-base line-clamp-2">{doc.title}</h3>
                            {getStatusBadge(doc.status)}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-2">
                            <span>{doc.type}</span>
                            <span>•</span>
                            <span>{doc.category}</span>
                            <span>•</span>
                            <span>{doc.fileSize}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-3">{doc.description}</p>
                          <p className="text-xs text-gray-500">
                            Subido: {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 lg:ml-4">
                          <Button size="sm" variant="outline" onClick={() => handleViewDocument(doc.fileUrl, doc.title)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDownloadDocument(doc.fileUrl, doc.title)}>
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => alert('Función de editar documento próximamente')}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg sm:text-xl">Gestión de Actividades</CardTitle>
                    <CardDescription className="text-sm">Administra las actividades institucionales</CardDescription>
                  </div>
                  <Button onClick={() => alert('Función de nueva actividad próximamente')} className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Actividad
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="border rounded-lg p-3 sm:p-4">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <h3 className="font-medium text-sm sm:text-base line-clamp-2">{activity.title}</h3>
                            {getStatusBadge(activity.status)}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-2">
                            <span>{activity.type}</span>
                            <span>•</span>
                            <span>{activity.participants} participantes</span>
                            <span>•</span>
                            <span className="line-clamp-1">{activity.location}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-3">{activity.description}</p>
                          <p className="text-xs text-gray-500">
                            Fecha: {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 lg:ml-4">
                          <Button size="sm" variant="outline" onClick={() => handleViewActivity(activity)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEditActivity(activity)}>
                            <Edit className="w-4 h-4" />
                          </Button>
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

      {/* Modal para detalle de actividad */}
      {showActivityDetail && selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl line-clamp-2">{selectedActivity.title}</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleCloseActivityDetail}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                {getStatusBadge(selectedActivity.status)}
                <span className="text-sm text-gray-600">{selectedActivity.type}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Descripción</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedActivity.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Fecha</p>
                      <p className="font-medium">{new Date(selectedActivity.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Hora</p>
                      <p className="font-medium">{new Date(selectedActivity.date).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Ubicación</p>
                      <p className="font-medium break-words">{selectedActivity.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Participantes</p>
                      <p className="font-medium">{selectedActivity.participants}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Estado</p>
                    {getStatusBadge(selectedActivity.status)}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-2 pt-4 border-t">
                  <Button size="sm" onClick={() => {
                    handleCloseActivityDetail();
                    handleEditActivity(selectedActivity);
                  }} className="w-full sm:w-auto">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Actividad
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCloseActivityDetail} className="w-full sm:w-auto">
                    Cerrar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal para editar actividad */}
      {showActivityEdit && editingActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Editar Actividad</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleCloseActivityEdit}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={editingActivity.title}
                    onChange={(e) => setEditingActivity(prev => prev ? {...prev, title: e.target.value} : null)}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={editingActivity.description}
                    onChange={(e) => setEditingActivity(prev => prev ? {...prev, description: e.target.value} : null)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Tipo</Label>
                    <Input
                      id="type"
                      value={editingActivity.type}
                      onChange={(e) => setEditingActivity(prev => prev ? {...prev, type: e.target.value} : null)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="status">Estado</Label>
                    <Select 
                      value={editingActivity.status} 
                      onValueChange={(value) => setEditingActivity(prev => prev ? {...prev, status: value as Activity['status']} : null)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planned">Planificado</SelectItem>
                        <SelectItem value="in-progress">En Progreso</SelectItem>
                        <SelectItem value="completed">Completado</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="participants">Participantes</Label>
                    <Input
                      id="participants"
                      type="number"
                      value={editingActivity.participants}
                      onChange={(e) => setEditingActivity(prev => prev ? {...prev, participants: parseInt(e.target.value)} : null)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Ubicación</Label>
                    <Input
                      id="location"
                      value={editingActivity.location}
                      onChange={(e) => setEditingActivity(prev => prev ? {...prev, location: e.target.value} : null)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="date">Fecha y Hora</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={new Date(editingActivity.date).toISOString().slice(0, 16)}
                    onChange={(e) => setEditingActivity(prev => prev ? {...prev, date: new Date(e.target.value).toISOString()} : null)}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-2 pt-4">
                  <Button onClick={() => editingActivity && handleSaveActivity(editingActivity)} className="w-full sm:w-auto">
                    Guardar Cambios
                  </Button>
                  <Button variant="outline" onClick={handleCloseActivityEdit} className="w-full sm:w-auto">
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal para editar institución */}
      {showInstitutionEdit && editingInstitution && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Editar Institución</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleCloseInstitutionEdit}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      value={editingInstitution.name}
                      onChange={(e) => setEditingInstitution(prev => prev ? {...prev, name: e.target.value} : null)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Tipo</Label>
                    <Input
                      id="type"
                      value={editingInstitution.type}
                      onChange={(e) => setEditingInstitution(prev => prev ? {...prev, type: e.target.value} : null)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={editingInstitution.description}
                    onChange={(e) => setEditingInstitution(prev => prev ? {...prev, description: e.target.value} : null)}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="director">Director</Label>
                    <Input
                      id="director"
                      value={editingInstitution.director}
                      onChange={(e) => setEditingInstitution(prev => prev ? {...prev, director: e.target.value} : null)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="status">Estado</Label>
                    <Select 
                      value={editingInstitution.status} 
                      onValueChange={(value) => setEditingInstitution(prev => prev ? {...prev, status: value as InstitutionProfile['status']} : null)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Activa</SelectItem>
                        <SelectItem value="inactive">Inactiva</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      value={editingInstitution.address}
                      onChange={(e) => setEditingInstitution(prev => prev ? {...prev, address: e.target.value} : null)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={editingInstitution.phone}
                      onChange={(e) => setEditingInstitution(prev => prev ? {...prev, phone: e.target.value} : null)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editingInstitution.email}
                      onChange={(e) => setEditingInstitution(prev => prev ? {...prev, email: e.target.value} : null)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">Sitio Web</Label>
                    <Input
                      id="website"
                      value={editingInstitution.website}
                      onChange={(e) => setEditingInstitution(prev => prev ? {...prev, website: e.target.value} : null)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="employees">Empleados</Label>
                    <Input
                      id="employees"
                      type="number"
                      value={editingInstitution.employees}
                      onChange={(e) => setEditingInstitution(prev => prev ? {...prev, employees: parseInt(e.target.value)} : null)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="budget">Presupuesto</Label>
                    <Input
                      id="budget"
                      value={editingInstitution.budget}
                      onChange={(e) => setEditingInstitution(prev => prev ? {...prev, budget: e.target.value} : null)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="foundationYear">Año de Fundación</Label>
                    <Input
                      id="foundationYear"
                      type="number"
                      value={editingInstitution.foundationYear}
                      onChange={(e) => setEditingInstitution(prev => prev ? {...prev, foundationYear: parseInt(e.target.value)} : null)}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-2 pt-4">
                  <Button onClick={() => editingInstitution && handleSaveInstitution(editingInstitution)} className="w-full sm:w-auto">
                    Guardar Cambios
                  </Button>
                  <Button variant="outline" onClick={handleCloseInstitutionEdit} className="w-full sm:w-auto">
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}