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
import { 
  FileText, 
  Plus, 
  Search, 
  Upload, 
  Download, 
  Eye,
  Edit,
  Trash2,
  Calendar,
  HardDrive,
  CheckCircle,
  Clock
} from "lucide-react";
import { DocumentViewer } from "@/components/document-viewer";

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
  uploadedBy: string;
}

export default function AdminDocumentosPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("todos");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [viewerDocument, setViewerDocument] = useState<{
    id: string;
    title: string;
    type: string;
    fileUrl: string;
    category: string;
    description: string;
    fileSize: string;
  } | null>(null);

  const [documents, setDocuments] = useState<Document[]>([
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
      status: "published",
      uploadedBy: "Admin"
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
      status: "published",
      uploadedBy: "Admin"
    },
    {
      id: "3",
      title: "Plan Estratégico de Salud Pública",
      type: "DOCX",
      category: "Planificación",
      institution: "Secretaría de Salud",
      description: "Plan estratégico quinquenal para la mejora de la salud pública",
      fileUrl: "/documents/plan-salud-2024-2028.docx",
      fileSize: "3.2 MB",
      uploadDate: "2024-02-20T00:00:00Z",
      status: "draft",
      uploadedBy: "Admin"
    },
    {
      id: "4",
      title: "Reglamento de Transparencia",
      type: "HTML",
      category: "Legal",
      institution: "Municipalidad Central",
      description: "Reglamento de transparencia y acceso a la información pública",
      fileUrl: "/documents/reglamento-transparencia.html",
      fileSize: "856 KB",
      uploadDate: "2024-01-10T00:00:00Z",
      status: "published",
      uploadedBy: "Admin"
    },
    // Documentos reales de Fanny Design Style
    {
      id: "5",
      title: "Portafolio de Servicios - Fanny Design Style",
      type: "PDF",
      category: "Portafolio",
      institution: "Fanny Design Style",
      description: "Catálogo completo de servicios de diseño gráfico, branding y soluciones creativas ofrecidos por Fanny Design Style",
      fileUrl: "/documents/fannydesignstyle/portafolio-servicios.pdf",
      fileSize: "5.2 MB",
      uploadDate: "2024-07-26T00:00:00Z",
      status: "published",
      uploadedBy: "Admin"
    },
    {
      id: "6",
      title: "Manual de Identidad Corporativa - Fanny Design Style",
      type: "PDF",
      category: "Branding",
      institution: "Fanny Design Style",
      description: "Guía completa de identidad visual y estándares de marca para Fanny Design Style",
      fileUrl: "/documents/fannydesignstyle/manual-identidad-corporativa.pdf",
      fileSize: "3.1 MB",
      uploadDate: "2024-07-26T00:00:00Z",
      status: "published",
      uploadedBy: "Admin"
    },
    {
      id: "7",
      title: "Catálogo de Trabajos - Fanny Design Style",
      type: "PDF",
      category: "Portafolio",
      institution: "Fanny Design Style",
      description: "Colección de proyectos realizados por Fanny Design Style incluyendo diseño gráfico, branding y diseño web",
      fileUrl: "/documents/fannydesignstyle/catalogo-trabajos.pdf",
      fileSize: "7.8 MB",
      uploadDate: "2024-07-26T00:00:00Z",
      status: "published",
      uploadedBy: "Admin"
    },
    {
      id: "8",
      title: "Presentación Corporativa - Fanny Design Style",
      type: "PDF",
      category: "Corporativo",
      institution: "Fanny Design Style",
      description: "Presentación institucional con información sobre la empresa, misión, visión y valores de Fanny Design Style",
      fileUrl: "/documents/fannydesignstyle/presentacion-corporativa.pdf",
      fileSize: "4.5 MB",
      uploadDate: "2024-07-26T00:00:00Z",
      status: "published",
      uploadedBy: "Admin"
    }
  ]);

  const categories = [
    "Presupuesto", "Informe", "Planificación", "Legal", "Política", 
    "Procedimiento", "Manual", "Portafolio", "Branding", "Corporativo", "Otro"
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "todos" || doc.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    // Simulación de subida de archivo
    const newDocument: Document = {
      id: Date.now().toString(),
      title: (e.target as any).title.value,
      type: selectedFile.type.split('/')[1].toUpperCase() || selectedFile.name.split('.').pop()?.toUpperCase() || "FILE",
      category: (e.target as any).category.value,
      institution: (e.target as any).institution.value,
      description: (e.target as any).description.value,
      fileUrl: `/documents/${selectedFile.name}`,
      fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
      uploadDate: new Date().toISOString(),
      status: "draft",
      uploadedBy: "Admin"
    };

    setDocuments(prev => [newDocument, ...prev]);
    setShowUploadForm(false);
    setSelectedFile(null);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "published": { className: "bg-green-100 text-green-800", text: "Publicado", icon: CheckCircle },
      "draft": { className: "bg-yellow-100 text-yellow-800", text: "Borrador", icon: Clock },
      "archived": { className: "bg-gray-100 text-gray-800", text: "Archivado", icon: HardDrive }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <Badge className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>
    );
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

  const stats = {
    total: documents.length,
    published: documents.filter(d => d.status === "published").length,
    draft: documents.filter(d => d.status === "draft").length,
    archived: documents.filter(d => d.status === "archived").length
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Documentos</h1>
            <p className="text-gray-600 mt-1">Administra y organiza todos los documentos del sistema</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button onClick={() => setShowUploadForm(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Subir Documento
            </Button>
          </div>
        </div>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Subir Nuevo Documento</CardTitle>
            <CardDescription>Complete los datos y seleccione el archivo a subir</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título del Documento</Label>
                  <Input
                    id="title"
                    placeholder="Ingrese el título del documento"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="institution">Institución</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una institución" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ministerio de Educación">Ministerio de Educación</SelectItem>
                    <SelectItem value="Secretaría de Salud">Secretaría de Salud</SelectItem>
                    <SelectItem value="Municipalidad Central">Municipalidad Central</SelectItem>
                    <SelectItem value="Fanny Design Style">Fanny Design Style</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Descripción del documento"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Seleccionar Archivo</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  required
                />
                {selectedFile && (
                  <p className="text-sm text-gray-600">
                    Archivo seleccionado: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => setShowUploadForm(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  <Upload className="w-4 h-4 mr-2" />
                  Subir Documento
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Documentos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publicados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.published}</div>
            <p className="text-xs text-muted-foreground">Disponibles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Borradores</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draft}</div>
            <p className="text-xs text-muted-foreground">En revisión</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Archivados</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.archived}</div>
            <p className="text-xs text-muted-foreground">Guardados</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar documentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filtrar por categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas las categorías</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos Subidos</CardTitle>
          <CardDescription>
            {filteredDocuments.length} documentos encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-4 sm:space-y-0">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-medium text-lg">{doc.title}</h3>
                      {getStatusBadge(doc.status)}
                      <Badge variant="outline">{doc.type}</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>{doc.institution}</span>
                      <span>•</span>
                      <span>{doc.category}</span>
                      <span>•</span>
                      <span>{doc.fileSize}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Subido: {new Date(doc.uploadDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>Por: {doc.uploadedBy}</span>
                      </div>
                    </div>
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
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-1" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-4 h-4 mr-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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