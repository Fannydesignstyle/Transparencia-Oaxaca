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
  QrCode, 
  Plus, 
  Search, 
  Download, 
  Copy, 
  Trash2, 
  Edit,
  ArrowLeft,
  Building2
} from "lucide-react";
import Image from "next/image";

interface QRCode {
  id: string;
  institutionId: string;
  institutionName: string;
  title: string;
  description: string;
  code: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminQRPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [qrCodes, setQrCodes] = useState<QRCode[]>([
    {
      id: "1",
      institutionId: "1",
      institutionName: "Ministerio de Educación",
      title: "QR Ministerio de Educación",
      description: "Código QR para acceder al perfil del Ministerio de Educación",
      code: "EDU-2024-001",
      isActive: true,
      createdAt: "2024-01-15T00:00:00Z"
    },
    {
      id: "2",
      institutionId: "2",
      institutionName: "Secretaría de Salud",
      title: "QR Secretaría de Salud",
      description: "Código QR para acceder al perfil de la Secretaría de Salud",
      code: "SAL-2024-002",
      isActive: true,
      createdAt: "2024-02-01T00:00:00Z"
    },
    {
      id: "3",
      institutionId: "3",
      institutionName: "Municipalidad Central",
      title: "QR Municipalidad Central",
      description: "Código QR para acceder al perfil de la Municipalidad Central",
      code: "MUN-2024-003",
      isActive: false,
      createdAt: "2024-03-01T00:00:00Z"
    }
  ]);

  const [formData, setFormData] = useState({
    institutionId: "",
    title: "",
    description: "",
    code: ""
  });

  const institutions = [
    { id: "1", name: "Ministerio de Educación" },
    { id: "2", name: "Secretaría de Salud" },
    { id: "3", name: "Municipalidad Central" }
  ];

  const filteredQRCodes = qrCodes.filter(qr =>
    qr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    qr.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    qr.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const institution = institutions.find(inst => inst.id === formData.institutionId);
    const newQR: QRCode = {
      id: Date.now().toString(),
      institutionId: formData.institutionId,
      institutionName: institution?.name || "",
      title: formData.title,
      description: formData.description,
      code: formData.code || `QR-${Date.now()}`,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    setQrCodes(prev => [...prev, newQR]);
    setFormData({ institutionId: "", title: "", description: "", code: "" });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setQrCodes(prev => prev.filter(qr => qr.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setQrCodes(prev => prev.map(qr => 
      qr.id === id ? { ...qr, isActive: !qr.isActive } : qr
    ));
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Código ${code} copiado al portapapeles`);
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive 
      ? <Badge className="bg-green-100 text-green-800">Activo</Badge>
      : <Badge className="bg-red-100 text-red-800">Inactivo</Badge>;
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
                <p className="text-sm text-gray-600">Gestión de Códigos QR</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button size="sm" onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Generar QR
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Formulario para generar QR */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Generar Nuevo Código QR</CardTitle>
              <CardDescription>Complete los datos para generar un nuevo código QR</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institución</Label>
                    <Select value={formData.institutionId} onValueChange={(value) => handleInputChange("institutionId", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una institución" />
                      </SelectTrigger>
                      <SelectContent>
                        {institutions.map((institution) => (
                          <SelectItem key={institution.id} value={institution.id}>
                            {institution.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Código (opcional)</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => handleInputChange("code", e.target.value)}
                      placeholder="Se generará automáticamente si se deja vacío"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Título del código QR"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Descripción del código QR"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    <QrCode className="w-4 h-4 mr-2" />
                    Generar QR
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Códigos</CardTitle>
              <QrCode className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{qrCodes.length}</div>
              <p className="text-xs text-muted-foreground">Códigos generados</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activos</CardTitle>
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {qrCodes.filter(qr => qr.isActive).length}
              </div>
              <p className="text-xs text-muted-foreground">Códigos activos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactivos</CardTitle>
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {qrCodes.filter(qr => !qr.isActive).length}
              </div>
              <p className="text-xs text-muted-foreground">Códigos inactivos</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar códigos QR..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* QR Codes List */}
        <Card>
          <CardHeader>
            <CardTitle>Códigos QR Generados</CardTitle>
            <CardDescription>
              {filteredQRCodes.length} códigos encontrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredQRCodes.map((qr) => (
                <div key={qr.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{qr.title}</h3>
                        {getStatusBadge(qr.isActive)}
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Building2 className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{qr.institutionName}</span>
                      </div>
                      <p className="text-gray-600 mb-3">{qr.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Código:</span>
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">{qr.code}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopyCode(qr.code)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="text-gray-500">
                          Creado: {new Date(qr.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleActive(qr.id)}
                      >
                        {qr.isActive ? "Desactivar" : "Activar"}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(qr.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}