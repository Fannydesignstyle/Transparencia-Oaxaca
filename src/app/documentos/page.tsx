"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DocumentViewer } from "@/components/document-viewer";
import { 
  FileText, 
  Download, 
  Eye,
  Search,
  Filter
} from "lucide-react";

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

export default function DocumentosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("todos");
  const [viewerDocument, setViewerDocument] = useState<{
    id: string;
    title: string;
    type: string;
    fileUrl: string;
    category: string;
    description: string;
    fileSize: string;
  } | null>(null);

  const [documents] = useState<Document[]>([
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
      title: "Informe de Actividades Primer Trimestre",
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
      title: "Reglamento de Transparencia",
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
      type: "HTML",
      category: "Portafolio",
      institution: "Fanny Design Style",
      description: "Catálogo completo de servicios de diseño gráfico, branding y soluciones creativas ofrecidos por Fanny Design Style",
      fileUrl: "/documents/fannydesignstyle/portafolio-servicios-v2.html",
      fileSize: "5.2 MB",
      uploadDate: "2024-07-26T00:00:00Z",
      status: "published"
    },
    {
      id: "5",
      title: "Manual de Identidad Corporativa - Fanny Design Style",
      type: "HTML",
      category: "Branding",
      institution: "Fanny Design Style",
      description: "Guía completa de identidad visual y estándares de marca para Fanny Design Style",
      fileUrl: "/documents/fannydesignstyle/manual-identidad-corporativa-v2.html",
      fileSize: "3.1 MB",
      uploadDate: "2024-07-26T00:00:00Z",
      status: "published"
    },
    {
      id: "6",
      title: "Catálogo de Trabajos - Fanny Design Style",
      type: "PDF",
      category: "Portafolio",
      institution: "Fanny Design Style",
      description: "Colección de proyectos realizados por Fanny Design Style incluyendo diseño gráfico, branding y diseño web",
      fileUrl: "/documents/fannydesignstyle/catalogo-trabajos.pdf",
      fileSize: "7.8 MB",
      uploadDate: "2024-07-26T00:00:00Z",
      status: "published"
    },
    {
      id: "7",
      title: "Presentación Corporativa - Fanny Design Style",
      type: "HTML",
      category: "Corporativo",
      institution: "Fanny Design Style",
      description: "Presentación institucional con información sobre la empresa, misión, visión y valores de Fanny Design Style",
      fileUrl: "/documents/fannydesignstyle/presentacion-corporativa-v2.html",
      fileSize: "4.5 MB",
      uploadDate: "2024-07-26T00:00:00Z",
      status: "published"
    }
  ]);

  const categories = [
    "Presupuesto", "Informe", "Legal", "Portafolio", "Branding", "Corporativo", "Otro"
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "todos" || doc.category === categoryFilter;
    
    return matchesSearch && matchesCategory && doc.status === "published";
  });

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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "published": { className: "bg-green-100 text-green-800", text: "Publicado" },
      "draft": { className: "bg-yellow-100 text-yellow-800", text: "Borrador" },
      "archived": { className: "bg-gray-100 text-gray-800", text: "Archivado" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.text}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Documentos Públicos</h1>
          <p className="text-gray-600">
            Accede a todos los documentos públicos de las instituciones gubernamentales.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="todos">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex items-start space-x-2 flex-1 min-w-0">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base md:text-lg line-clamp-2">{doc.title}</CardTitle>
                      <CardDescription className="text-xs md:text-sm">{doc.institution}</CardDescription>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusBadge(doc.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-xs md:text-sm mb-4 line-clamp-3">{doc.description}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">{doc.type}</span>
                    <span className="text-xs text-gray-500">{doc.fileSize}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(doc.uploadDate).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewDocument(doc)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDownloadDocument(doc.fileUrl, doc.title)}
                    className="flex-shrink-0"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron documentos</h3>
            <p className="text-gray-600">Intenta ajustar tus filtros de búsqueda.</p>
          </div>
        )}

        {/* Document Viewer Modal */}
        {viewerDocument && (
          <DocumentViewer
            isOpen={!!viewerDocument}
            onClose={() => setViewerDocument(null)}
            document={viewerDocument}
          />
        )}
      </div>
    </div>
  );
}