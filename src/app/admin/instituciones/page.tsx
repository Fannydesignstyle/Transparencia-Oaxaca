"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  Download
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
  status: "active" | "inactive";
  createdAt: string;
}

export default function AdminInstitucionesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [institutions, setInstitutions] = useState<Institution[]>([
    {
      id: "1",
      name: "Ministerio de Educación",
      type: "Ministerio",
      description: "Institución encargada de la educación pública y privada en el país",
      address: "Av. Principal 123, Ciudad",
      phone: "+1 234 567 890",
      email: "info@educacion.gov",
      website: "https://educacion.gov",
      status: "active",
      createdAt: "2024-01-15T00:00:00Z"
    },
    {
      id: "2",
      name: "Secretaría de Salud",
      type: "Secretaría",
      description: "Entidad responsable de la salud pública y servicios médicos",
      address: "Calle Salud 456, Ciudad",
      phone: "+1 234 567 891",
      email: "info@salud.gov",
      website: "https://salud.gov",
      status: "active",
      createdAt: "2024-02-01T00:00:00Z"
    },
    {
      id: "3",
      name: "Municipalidad Central",
      type: "Municipalidad",
      description: "Gobierno local de la ciudad principal",
      address: "Plaza Central 789, Ciudad",
      phone: "+1 234 567 892",
      email: "info@municipalidad.gov",
      website: "https://municipalidad.gov",
      status: "active",
      createdAt: "2024-03-01T00:00:00Z"
    }
  ]);

  const filteredInstitutions = institutions.filter(institution =>
    institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    institution.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === "active" 
      ? <Badge className="bg-green-100 text-green-800">Activa</Badge>
      : <Badge className="bg-red-100 text-red-800">Inactiva</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Admin */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
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
                <p className="text-sm text-gray-600">Gestión de Instituciones</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button size="sm" onClick={() => window.location.href = "/admin/dashboard"}>
                Volver al Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Gestión de Instituciones</h2>
              <p className="text-gray-600 mt-2">Administra las instituciones gubernamentales registradas en el sistema</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Institución
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar instituciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Instituciones</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{institutions.length}</div>
              <p className="text-xs text-muted-foreground">Registradas en el sistema</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activas</CardTitle>
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {institutions.filter(i => i.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">Instituciones activas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactivas</CardTitle>
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {institutions.filter(i => i.status === "inactive").length}
              </div>
              <p className="text-xs text-muted-foreground">Instituciones inactivas</p>
            </CardContent>
          </Card>
        </div>

        {/* Institutions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Instituciones</CardTitle>
            <CardDescription>
              {filteredInstitutions.length} instituciones encontradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Nombre</th>
                    <th className="text-left p-4">Tipo</th>
                    <th className="text-left p-4">Contacto</th>
                    <th className="text-left p-4">Estado</th>
                    <th className="text-left p-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInstitutions.map((institution) => (
                    <tr key={institution.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{institution.name}</div>
                          <div className="text-sm text-gray-600">{institution.description}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{institution.type}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div>{institution.email}</div>
                          <div className="text-gray-600">{institution.phone}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(institution.status)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}