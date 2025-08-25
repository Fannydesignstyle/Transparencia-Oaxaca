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
  MessageSquare, 
  Search, 
  Send, 
  Eye, 
  Filter,
  ArrowLeft,
  Building2,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";
import Image from "next/image";

interface Inquiry {
  id: string;
  institutionId: string;
  institutionName: string;
  subject: string;
  content: string;
  status: "Pendiente" | "En Progreso" | "Respondida" | "Cerrada";
  priority: "Baja" | "Media" | "Alta" | "Urgente";
  createdAt: string;
  response?: string;
  responseDate?: string;
  userName?: string;
  userEmail?: string;
}

export default function AdminConsultasPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [priorityFilter, setPriorityFilter] = useState<string>("todos");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [responseText, setResponseText] = useState("");

  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: "1",
      institutionId: "1",
      institutionName: "Ministerio de Educación",
      subject: "Consulta sobre becas estudiantiles",
      content: "Me gustaría conocer más información sobre las becas disponibles para el próximo año escolar y los requisitos para aplicar. Soy estudiante de secundaria y necesito apoyo económico para continuar mis estudios.",
      status: "Pendiente",
      priority: "Media",
      createdAt: "2024-01-10T00:00:00Z",
      userName: "Juan Pérez",
      userEmail: "juan.perez@email.com"
    },
    {
      id: "2",
      institutionId: "2",
      institutionName: "Secretaría de Salud",
      subject: "Sugerencia para mejorar horarios de atención",
      content: "Propongo extender los horarios de atención en los centros de salud hasta las 20:00 para facilitar el acceso a trabajadores que terminan tarde. Muchas personas no pueden ir al médico por sus horarios laborales.",
      status: "En Progreso",
      priority: "Alta",
      createdAt: "2024-02-05T00:00:00Z",
      userName: "María García",
      userEmail: "maria.garcia@email.com"
    },
    {
      id: "3",
      institutionId: "3",
      institutionName: "Municipalidad Central",
      subject: "Reclamo por alumbrado público",
      content: "En mi barrio hay varias calles sin alumbrado público funcional, lo que representa un riesgo para la seguridad de los vecinos. Ya han ocurrido varios robos y la gente teme salir de noche. Solicito una solución urgente.",
      status: "Pendiente",
      priority: "Urgente",
      createdAt: "2024-03-01T00:00:00Z",
      userName: "Carlos Rodríguez",
      userEmail: "carlos.rodriguez@email.com"
    },
    {
      id: "4",
      institutionId: "1",
      institutionName: "Ministerio de Educación",
      subject: "Felicitación por programa educativo",
      content: "Quiero felicitar al Ministerio por el excelente programa de educación digital que han implementado. Mis hijos han mejorado mucho sus habilidades tecnológicas.",
      status: "Respondida",
      priority: "Baja",
      createdAt: "2024-01-15T00:00:00Z",
      response: "Gracias por sus palabras de aliento. Nos complace saber que el programa está teniendo un impacto positivo en la educación de sus hijos.",
      responseDate: "2024-01-16T00:00:00Z",
      userName: "Ana López",
      userEmail: "ana.lopez@email.com"
    }
  ]);

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.institutionName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || inquiry.status === statusFilter;
    const matchesPriority = priorityFilter === "todos" || inquiry.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleResponseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry || !responseText.trim()) return;

    const updatedInquiries = inquiries.map(inquiry =>
      inquiry.id === selectedInquiry.id
        ? {
            ...inquiry,
            status: "Respondida",
            response: responseText,
            responseDate: new Date().toISOString()
          }
        : inquiry
    );

    setInquiries(updatedInquiries);
    setResponseText("");
    setShowResponseForm(false);
    setSelectedInquiry(null);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "Pendiente": { className: "bg-yellow-100 text-yellow-800", icon: Clock },
      "En Progreso": { className: "bg-blue-100 text-blue-800", icon: AlertCircle },
      "Respondida": { className: "bg-green-100 text-green-800", icon: CheckCircle },
      "Cerrada": { className: "bg-gray-100 text-gray-800", icon: XCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <Badge className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      "Baja": { className: "bg-gray-100 text-gray-800" },
      "Media": { className: "bg-blue-100 text-blue-800" },
      "Alta": { className: "bg-orange-100 text-orange-800" },
      "Urgente": { className: "bg-red-100 text-red-800" }
    };
    
    return <Badge className={priorityConfig[priority as keyof typeof priorityConfig]}>{priority}</Badge>;
  };

  const stats = {
    total: inquiries.length,
    pendientes: inquiries.filter(i => i.status === "Pendiente").length,
    enProgreso: inquiries.filter(i => i.status === "En Progreso").length,
    respondidas: inquiries.filter(i => i.status === "Respondida").length,
    urgentes: inquiries.filter(i => i.priority === "Urgente").length
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
                <p className="text-sm text-gray-600">Gestión de Consultas Ciudadanas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Consultas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendientes}</div>
              <p className="text-xs text-muted-foreground">En espera</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Progreso</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.enProgreso}</div>
              <p className="text-xs text-muted-foreground">Atendiendo</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Respondidas</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.respondidas}</div>
              <p className="text-xs text-muted-foreground">Completadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Urgentes</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.urgentes}</div>
              <p className="text-xs text-muted-foreground">Atención inmediata</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar consultas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex space-x-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="En Progreso">En Progreso</SelectItem>
                <SelectItem value="Respondida">Respondida</SelectItem>
                <SelectItem value="Cerrada">Cerrada</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                <SelectItem value="Baja">Baja</SelectItem>
                <SelectItem value="Media">Media</SelectItem>
                <SelectItem value="Alta">Alta</SelectItem>
                <SelectItem value="Urgente">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Consultas</CardTitle>
                <CardDescription>
                  {filteredInquiries.length} consultas encontradas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${
                        selectedInquiry?.id === inquiry.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-sm flex-1">{inquiry.subject}</h3>
                        <div className="flex items-center space-x-2 ml-2">
                          {getStatusBadge(inquiry.status)}
                          {getPriorityBadge(inquiry.priority)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Building2 className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-600">{inquiry.institutionName}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-600">{inquiry.userName}</span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">{inquiry.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </span>
                        {inquiry.status === "Pendiente" && (
                          <Button size="sm" onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInquiry(inquiry);
                            setShowResponseForm(true);
                          }}>
                            <Send className="w-3 h-3 mr-1" />
                            Responder
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detail View */}
          <div>
            {selectedInquiry ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{selectedInquiry.subject}</CardTitle>
                      <CardDescription>Detalles de la consulta</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(selectedInquiry.status)}
                      {getPriorityBadge(selectedInquiry.priority)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Institución</Label>
                      <p className="text-sm text-gray-600">{selectedInquiry.institutionName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Usuario</Label>
                      <p className="text-sm text-gray-600">{selectedInquiry.userName}</p>
                      <p className="text-sm text-gray-500">{selectedInquiry.userEmail}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Fecha</Label>
                      <p className="text-sm text-gray-600">
                        {new Date(selectedInquiry.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Consulta</Label>
                      <p className="text-sm text-gray-700 mt-1">{selectedInquiry.content}</p>
                    </div>
                    
                    {selectedInquiry.response && (
                      <div>
                        <Label className="text-sm font-medium">Respuesta</Label>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-1">
                          <p className="text-sm text-green-800">{selectedInquiry.response}</p>
                          <p className="text-xs text-green-600 mt-2">
                            Respondido: {new Date(selectedInquiry.responseDate!).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}

                    {showResponseForm && (
                      <form onSubmit={handleResponseSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="response">Respuesta</Label>
                          <Textarea
                            id="response"
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            placeholder="Escriba su respuesta..."
                            rows={4}
                            required
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline" onClick={() => setShowResponseForm(false)}>
                            Cancelar
                          </Button>
                          <Button type="submit">
                            <Send className="w-4 h-4 mr-2" />
                            Enviar Respuesta
                          </Button>
                        </div>
                      </form>
                    )}

                    {!showResponseForm && selectedInquiry.status === "Pendiente" && (
                      <Button onClick={() => setShowResponseForm(true)} className="w-full">
                        <Send className="w-4 h-4 mr-2" />
                        Responder Consulta
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Seleccione una consulta para ver los detalles</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}