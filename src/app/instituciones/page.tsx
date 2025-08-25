"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DocumentViewer } from "@/components/document-viewer";
import { 
  Building2, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Users,
  Calendar,
  ArrowRight,
  Star,
  FileText,
  Activity,
  Eye
} from "lucide-react";
import Image from "next/image";

interface Institution {
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
  isFeatured?: boolean;
  category: string;
}

interface Document {
  id: string;
  title: string;
  type: string;
  category: string;
  institution: string;
  description: string;
  fileUrl: string;
  fileSize: string;
  uploadDate: string;
  status: "published" | "draft" | "archived";
}

const sampleInstitutions: Institution[] = [
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
    category: "gobierno"
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
    category: "gobierno"
  },
  {
    id: "3",
    name: "Municipalidad Central",
    type: "Municipalidad",
    description: "Gobierno local de la ciudad principal, encargado de la administración municipal y servicios públicos.",
    address: "Plaza Central 789, Ciudad",
    phone: "+1 234 567 892",
    email: "info@municipalidad.gov",
    website: "https://municipalidad.gov",
    director: "Ing. María González",
    employees: 800,
    budget: "$15,000,000",
    foundationYear: 1995,
    status: "active",
    category: "gobierno"
  },
  {
    id: "4",
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
    isFeatured: true,
    category: "privada"
  }
];

const sampleDocuments: Document[] = [
  {
    id: "1",
    title: "Presupuesto Anual 2024 - Ministerio de Educación",
    type: "PDF",
    category: "Presupuesto",
    institution: "Ministerio de Educación",
    description: "Presupuesto detallado para el año fiscal 2024 del Ministerio de Educación",
    fileUrl: "/documents/presupuesto-educacion-2024.pdf",
    fileSize: "2.5 MB",
    uploadDate: "2024-01-15T00:00:00Z",
    status: "published"
  },
  {
    id: "2",
    title: "Informe de Actividades Primer Trimestre - Secretaría de Salud",
    type: "PDF",
    category: "Informe",
    institution: "Secretaría de Salud",
    description: "Resumen de actividades realizadas en el primer trimestre del año 2024",
    fileUrl: "/documents/informe-q1-2024.pdf",
    fileSize: "1.8 MB",
    uploadDate: "2024-04-01T00:00:00Z",
    status: "published"
  },
  {
    id: "3",
    title: "Reglamento de Transparencia - Municipalidad Central",
    type: "HTML",
    category: "Legal",
    institution: "Municipalidad Central",
    description: "Reglamento de transparencia y acceso a la información pública",
    fileUrl: "/documents/reglamento-transparencia.html",
    fileSize: "856 KB",
    uploadDate: "2024-01-10T00:00:00Z",
    status: "published"
  },
  {
    id: "4",
    title: "Portafolio de Servicios - Fanny Design Style",
    type: "PDF",
    category: "Portafolio",
    institution: "Fanny Design Style",
    description: "Catálogo completo de servicios de diseño gráfico, branding y soluciones creativas ofrecidos por Fanny Design Style",
    fileUrl: "/documents/fannydesignstyle/portafolio-servicios.pdf",
    fileSize: "5.2 MB",
    uploadDate: "2024-07-26T00:00:00Z",
    status: "published"
  },
  {
    id: "5",
    title: "Manual de Identidad Corporativa - Fanny Design Style",
    type: "PDF",
    category: "Branding",
    institution: "Fanny Design Style",
    description: "Guía completa de identidad visual y estándares de marca para Fanny Design Style",
    fileUrl: "/documents/fannydesignstyle/manual-identidad-corporativa.pdf",
    fileSize: "3.1 MB",
    uploadDate: "2024-07-26T00:00:00Z",
    status: "published"
  }
];

const categories = [
  { id: "todos", name: "Todas", count: sampleInstitutions.length },
  { id: "gobierno", name: "Gobierno", count: sampleInstitutions.filter(i => i.category === "gobierno").length },
  { id: "privada", name: "Privada", count: sampleInstitutions.filter(i => i.category === "privada").length }
];

export default function InstitucionesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewerDocument, setViewerDocument] = useState<{
    id: string;
    title: string;
    type: string;
    fileUrl: string;
    category: string;
    description: string;
    fileSize: string;
  } | null>(null);

  const filteredInstitutions = sampleInstitutions.filter(institution => {
    const matchesCategory = selectedCategory === "todos" || institution.category === selectedCategory;
    const matchesSearch = institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institution.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institution.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredInstitution = sampleInstitutions.find(inst => inst.isFeatured);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "active": { className: "bg-green-100 text-green-800", text: "Activa" },
      "inactive": { className: "bg-red-100 text-red-800", text: "Inactiva" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.text}</Badge>;
  };

  const getDocumentsForInstitution = (institutionName: string) => {
    return sampleDocuments.filter(doc => doc.institution === institutionName);
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
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                <p className="text-sm text-gray-600">Directorio Institucional</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
              <Button size="sm" onClick={() => router.push("/admin/login")}>
                Iniciar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explora Instituciones
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Accede a información completa y actualizada de todas las instituciones gubernamentales 
            y privadas participantes en la plataforma de transparencia.
          </p>
        </div>

        {/* Featured Institution - Fanny Design Style */}
        {featuredInstitution && (
          <Card className="mb-12 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 overflow-hidden">
            <div className="absolute top-4 right-4">
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Star className="w-4 h-4 mr-1" />
                Institución Destacada
              </div>
            </div>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl text-purple-900 mb-2">
                    {featuredInstitution.name}
                  </CardTitle>
                  <CardDescription className="text-purple-700 text-lg">
                    {featuredInstitution.type}
                  </CardDescription>
                </div>
                <div className="ml-4">
                  {getStatusBadge(featuredInstitution.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {featuredInstitution.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Director</p>
                        <p className="font-medium">{featuredInstitution.director}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Fundación</p>
                        <p className="font-medium">{featuredInstitution.foundationYear}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Ubicación</p>
                        <p className="font-medium">{featuredInstitution.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Teléfono</p>
                        <p className="font-medium">{featuredInstitution.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button 
                      size="lg"
                      onClick={() => router.push("/admin/fichas/fanny-design-style")}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      Ver Ficha Completa
                    </Button>
                    <Button variant="outline" size="lg">
                      <Mail className="w-5 h-5 mr-2" />
                      Contactar
                    </Button>
                    <Button variant="outline" size="lg">
                      <Globe className="w-5 h-5 mr-2" />
                      Sitio Web
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-4">Información Rápida</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Empleados</span>
                        <span className="font-medium">{featuredInstitution.employees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Presupuesto</span>
                        <span className="font-medium">{featuredInstitution.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Categoría</span>
                        <Badge variant="secondary">{featuredInstitution.category === "privada" ? "Privada" : "Gobierno"}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estado</span>
                        {getStatusBadge(featuredInstitution.status)}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-4">Contacto Directo</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <a 
                          href={`mailto:${featuredInstitution.email}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {featuredInstitution.email}
                        </a>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Sitio Web</p>
                        <a 
                          href={featuredInstitution.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {featuredInstitution.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar instituciones..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Institutions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredInstitutions.map((institution) => {
            const institutionDocuments = getDocumentsForInstitution(institution.name);
            return (
              <Card 
                key={institution.id} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => {
                  if (institution.id === "4") {
                    router.push("/admin/fichas/fanny-design-style");
                  }
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {institution.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {institution.type}
                      </CardDescription>
                    </div>
                    {institution.isFeatured && (
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {institution.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {institution.address}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {institution.employees} empleados
                    </div>
                  </div>

                  {/* Documents Section */}
                  {institutionDocuments.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-700 flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          Documentos ({institutionDocuments.length})
                        </h4>
                      </div>
                      <div className="space-y-1">
                        {institutionDocuments.slice(0, 2).map((doc) => (
                          <div 
                            key={doc.id} 
                            className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs hover:bg-gray-100 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDocument(doc);
                            }}
                          >
                            <div className="flex items-center space-x-2 flex-1 min-w-0">
                              <FileText className="w-3 h-3 text-blue-500 flex-shrink-0" />
                              <span className="truncate">{doc.title}</span>
                            </div>
                            <div className="flex items-center space-x-1 flex-shrink-0">
                              <span className="text-gray-500">{doc.fileSize}</span>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-5 w-5 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewDocument(doc);
                                }}
                              >
                                <Eye className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        {institutionDocuments.length > 2 && (
                          <div className="text-xs text-gray-500 text-center pt-1">
                            +{institutionDocuments.length - 2} más documentos
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    {getStatusBadge(institution.status)}
                    <div className="flex items-center text-blue-600 group-hover:translate-x-1 transition-transform">
                      <span className="text-sm font-medium mr-1">
                        {institution.id === "4" ? "Ver ficha" : "Explorar"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredInstitutions.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No se encontraron instituciones
            </h3>
            <p className="text-gray-600">
              Intenta ajustar tus filtros o términos de búsqueda.
            </p>
          </div>
        )}

        {/* Categories Overview */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Explora por Categorías
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h4 className="font-semibold text-lg mb-2">Gobierno</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Ministerios, secretarías y municipalidades
                </p>
                <div className="text-2xl font-bold text-blue-600">
                  {sampleInstitutions.filter(i => i.category === "gobierno").length}
                </div>
                <p className="text-sm text-gray-500">instituciones</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h4 className="font-semibold text-lg mb-2">Privada</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Empresas y organizaciones privadas
                </p>
                <div className="text-2xl font-bold text-purple-600">
                  {sampleInstitutions.filter(i => i.category === "privada").length}
                </div>
                <p className="text-sm text-gray-500">instituciones</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h4 className="font-semibold text-lg mb-2">Todas</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Directorio completo de instituciones
                </p>
                <div className="text-2xl font-bold text-green-600">
                  {sampleInstitutions.length}
                </div>
                <p className="text-sm text-gray-500">instituciones</p>
              </CardContent>
            </Card>
          </div>
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