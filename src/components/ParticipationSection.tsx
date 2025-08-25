"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Send, Search, Filter, Clock, CheckCircle, AlertCircle, Users } from "lucide-react";
import { Institution, Inquiry, Consultation } from "@/types";

interface ParticipationSectionProps {
  institutions: Institution[];
  inquiries: Inquiry[];
  consultations: Consultation[];
}

export default function ParticipationSection({ institutions, inquiries, consultations }: ParticipationSectionProps) {
  const [activeTab, setActiveTab] = useState("inquiries");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [newInquiry, setNewInquiry] = useState({
    subject: "",
    content: "",
    institutionId: ""
  });
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>(inquiries);
  const [filteredConsultations, setFilteredConsultations] = useState<Consultation[]>(consultations);

  // Obtener nombres de instituciones únicos
  const institutionNames = Array.from(new Set(institutions.map(inst => inst.name)));

  // Filtrar consultas basado en búsqueda, institución y estado
  useEffect(() => {
    let filtered = inquiries;

    if (searchTerm) {
      filtered = filtered.filter(inquiry =>
        inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedInstitution) {
      const institution = institutions.find(inst => inst.name === selectedInstitution);
      if (institution) {
        filtered = filtered.filter(inquiry => inquiry.institutionId === institution.id);
      }
    }

    if (selectedStatus) {
      filtered = filtered.filter(inquiry => inquiry.status === selectedStatus);
    }

    setFilteredInquiries(filtered);
  }, [searchTerm, selectedInstitution, selectedStatus, inquiries, institutions]);

  // Filtrar consultas públicas
  useEffect(() => {
    let filtered = consultations;

    if (searchTerm) {
      filtered = filtered.filter(consultation =>
        consultation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedInstitution) {
      const institution = institutions.find(inst => inst.name === selectedInstitution);
      if (institution) {
        filtered = filtered.filter(consultation => consultation.institutionId === institution.id);
      }
    }

    setFilteredConsultations(filtered);
  }, [searchTerm, selectedInstitution, consultations, institutions]);

  const handleSubmitInquiry = () => {
    if (newInquiry.subject && newInquiry.content && newInquiry.institutionId) {
      alert("Consulta enviada correctamente. Recibirás una respuesta pronto.");
      setNewInquiry({
        subject: "",
        content: "",
        institutionId: ""
      });
    } else {
      alert("Por favor completa todos los campos requeridos.");
    }
  };

  const handleVote = (consultationId: string) => {
    alert(`Participando en la consulta: ${consultationId}`);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Pendiente": "bg-yellow-100 text-yellow-800",
      "En Progreso": "bg-blue-100 text-blue-800",
      "Respondida": "bg-green-100 text-green-800",
      "Cerrada": "bg-gray-100 text-gray-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pendiente":
        return <Clock className="w-4 h-4" />;
      case "En Progreso":
        return <AlertCircle className="w-4 h-4" />;
      case "Respondida":
        return <CheckCircle className="w-4 h-4" />;
      case "Cerrada":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getInstitutionName = (institutionId: string) => {
    const institution = institutions.find(inst => inst.id === institutionId);
    return institution?.name || "Institución desconocida";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <MessageSquare className="w-8 h-8 mr-3 text-purple-500" />
          Participación Ciudadana
        </h2>
        <p className="text-gray-600 mb-6">
          Envía tus consultas, sugerencias y participa activamente en la toma de decisiones.
          Tu voz es importante para construir una comunidad más transparente y participativa.
        </p>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inquiries">Consultas y Sugerencias</TabsTrigger>
            <TabsTrigger value="consultations">Consultas Públicas</TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries" className="mt-6">
            {/* Nueva consulta */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Send className="w-5 h-5 mr-2 text-blue-500" />
                  Enviar Nueva Consulta
                </CardTitle>
                <CardDescription>
                  Envía tus preguntas, sugerencias o reclamos a las instituciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asunto *
                    </label>
                    <Input
                      placeholder="Asunto de tu consulta"
                      value={newInquiry.subject}
                      onChange={(e) => setNewInquiry({...newInquiry, subject: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institución *
                    </label>
                    <Select value={newInquiry.institutionId} onValueChange={(value) => setNewInquiry({...newInquiry, institutionId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una institución" />
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenido *
                    </label>
                    <Textarea
                      placeholder="Describe detalladamente tu consulta, sugerencia o reclamo..."
                      value={newInquiry.content}
                      onChange={(e) => setNewInquiry({...newInquiry, content: e.target.value})}
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleSubmitInquiry} className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Consulta
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar consultas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={selectedInstitution} onValueChange={setSelectedInstitution}>
                  <SelectTrigger>
                    <SelectValue placeholder="Institución" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    {institutionNames.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-40">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En Progreso">En Progreso</SelectItem>
                    <SelectItem value="Respondida">Respondida</SelectItem>
                    <SelectItem value="Cerrada">Cerrada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setSelectedInstitution("");
                setSelectedStatus("");
              }}>
                <Filter className="w-4 h-4 mr-2" />
                Limpiar
              </Button>
            </div>

            {/* Lista de consultas */}
            <div className="space-y-4">
              {filteredInquiries.map((inquiry) => (
                <Card key={inquiry.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{inquiry.subject}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <span>{getInstitutionName(inquiry.institutionId)}</span>
                          <span>•</span>
                          <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(inquiry.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(inquiry.status)}
                          {inquiry.status}
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{inquiry.content}</p>
                    {inquiry.response && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Respuesta:</h4>
                        <p className="text-gray-700">{inquiry.response}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Respondido el {new Date(inquiry.responseDate!).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="consultations" className="mt-6">
            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar consultas públicas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={selectedInstitution} onValueChange={setSelectedInstitution}>
                  <SelectTrigger>
                    <SelectValue placeholder="Institución" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    {institutionNames.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setSelectedInstitution("");
              }}>
                <Filter className="w-4 h-4 mr-2" />
                Limpiar
              </Button>
            </div>

            {/* Lista de consultas públicas */}
            <div className="space-y-6">
              {filteredConsultations.map((consultation) => (
                <Card key={consultation.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl">{consultation.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <span>{getInstitutionName(consultation.institutionId)}</span>
                          <span>•</span>
                          <span>Cierre: {new Date(consultation.endDate).toLocaleDateString()}</span>
                        </CardDescription>
                      </div>
                      <Badge variant={consultation.status === "Activa" ? "default" : "secondary"}>
                        {consultation.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">{consultation.description}</p>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Información de la Consulta</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-blue-700">Inicio:</span>
                          <p className="text-blue-600">{new Date(consultation.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="font-medium text-blue-700">Cierre:</span>
                          <p className="text-blue-600">{new Date(consultation.endDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Estado: {consultation.status}</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          disabled={consultation.status !== "Activa"}
                          onClick={() => handleVote(consultation.id)}
                        >
                          Participar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}