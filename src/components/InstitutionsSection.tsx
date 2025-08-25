"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Building2, Search, Filter, Calendar, FileText, Users } from "lucide-react";
import { Institution, InstitutionalProfile } from "@/types";

interface InstitutionsSectionProps {
  institutions: Institution[];
  profiles: InstitutionalProfile[];
}

export default function InstitutionsSection({ institutions, profiles }: InstitutionsSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [filteredInstitutions, setFilteredInstitutions] = useState<Institution[]>(institutions);
  const [institutionProfiles, setInstitutionProfiles] = useState<InstitutionalProfile[]>([]);

  // Obtener tipos de instituciones únicos
  const institutionTypes = Array.from(new Set(institutions.map(inst => inst.type)));

  // Filtrar instituciones basado en búsqueda y tipo
  useEffect(() => {
    let filtered = institutions;

    if (searchTerm) {
      filtered = filtered.filter(inst =>
        inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType && selectedType !== "all") {
      filtered = filtered.filter(inst => inst.type === selectedType);
    }

    setFilteredInstitutions(filtered);
  }, [searchTerm, selectedType, institutions]);

  // Cargar perfiles cuando se selecciona una institución
  useEffect(() => {
    if (selectedInstitution) {
      const institutionProfiles = profiles.filter(profile => 
        profile.institutionId === selectedInstitution.id
      );
      setInstitutionProfiles(institutionProfiles);
    } else {
      setInstitutionProfiles([]);
    }
  }, [selectedInstitution, profiles]);

  const handleInstitutionClick = (institution: Institution) => {
    setSelectedInstitution(institution);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Presupuesto": "bg-blue-100 text-blue-800",
      "Informe": "bg-green-100 text-green-800",
      "Actividades": "bg-purple-100 text-purple-800",
      "Planificación": "bg-orange-100 text-orange-800",
      "Transparencia": "bg-red-100 text-red-800",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getTypeColor = (type: string) => {
    const colors = {
      "Ministerio": "bg-indigo-100 text-indigo-800",
      "Secretaría": "bg-pink-100 text-pink-800",
      "Departamento": "bg-yellow-100 text-yellow-800",
      "Municipalidad": "bg-teal-100 text-teal-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <Building2 className="w-8 h-8 mr-3 text-blue-500" />
          Perfiles Institucionales
        </h2>
        <p className="text-gray-600 mb-6">
          Accede a los archivos de información pública de todas las instituciones gubernamentales.
          Explora presupuestos, informes, actividades y más.
        </p>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar instituciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                {institutionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={() => {
            setSearchTerm("");
            setSelectedType("all");
            setSelectedInstitution(null);
          }}>
            <Filter className="w-4 h-4 mr-2" />
            Limpiar filtros
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de instituciones */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Instituciones ({filteredInstitutions.length})</CardTitle>
              <CardDescription>
                Selecciona una institución para ver sus perfiles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredInstitutions.map((institution) => (
                  <div
                    key={institution.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedInstitution?.id === institution.id ? "border-blue-500 bg-blue-50" : ""
                    }`}
                    onClick={() => handleInstitutionClick(institution)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{institution.name}</h3>
                      <Badge className={getTypeColor(institution.type)}>
                        {institution.type}
                      </Badge>
                    </div>
                    {institution.description && (
                      <p className="text-sm text-gray-600 mb-2 overflow-hidden">
                        {institution.description}
                      </p>
                    )}
                    <div className="flex items-center text-xs text-gray-500">
                      <FileText className="w-3 h-3 mr-1" />
                      {profiles.filter(p => p.institutionId === institution.id).length} perfiles
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detalles de la institución y perfiles */}
        <div className="lg:col-span-2">
          {selectedInstitution ? (
            <div className="space-y-6">
              {/* Información de la institución */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Building2 className="w-6 h-6 mr-2 text-blue-500" />
                    {selectedInstitution.name}
                  </CardTitle>
                  <CardDescription>
                    <Badge className={getTypeColor(selectedInstitution.type)}>
                      {selectedInstitution.type}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedInstitution.description && (
                    <p className="text-gray-600 mb-4">{selectedInstitution.description}</p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {selectedInstitution.address && (
                      <div>
                        <span className="font-medium">Dirección:</span>
                        <p className="text-gray-600">{selectedInstitution.address}</p>
                      </div>
                    )}
                    {selectedInstitution.phone && (
                      <div>
                        <span className="font-medium">Teléfono:</span>
                        <p className="text-gray-600">{selectedInstitution.phone}</p>
                      </div>
                    )}
                    {selectedInstitution.email && (
                      <div>
                        <span className="font-medium">Email:</span>
                        <p className="text-gray-600">{selectedInstitution.email}</p>
                      </div>
                    )}
                    {selectedInstitution.website && (
                      <div>
                        <span className="font-medium">Sitio web:</span>
                        <a 
                          href={selectedInstitution.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {selectedInstitution.website}
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Perfiles institucionales */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <FileText className="w-6 h-6 mr-2 text-green-500" />
                    Perfiles Públicos
                  </CardTitle>
                  <CardDescription>
                    Documentos e información pública de la institución
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {institutionProfiles.length > 0 ? (
                    <div className="space-y-4">
                      {institutionProfiles.map((profile) => (
                        <div key={profile.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{profile.title}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={getCategoryColor(profile.category)}>
                                {profile.category}
                              </Badge>
                              <div className="flex items-center text-xs text-gray-500">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(profile.publishDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-3 overflow-hidden">
                            {profile.content}
                          </p>
                          <Button variant="outline" size="sm">
                            Ver completo
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No hay perfiles públicos disponibles para esta institución.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-16">
                <div className="text-center">
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Selecciona una institución
                  </h3>
                  <p className="text-gray-600">
                    Elige una institución de la lista para ver sus perfiles y detalles.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}