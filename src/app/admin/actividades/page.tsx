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
  Activity, 
  Plus, 
  Search, 
  Calendar,
  MapPin,
  Users,
  Edit,
  Trash2,
  Eye,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle
} from "lucide-react";
import Image from "next/image";

interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: string;
  institution: string;
  location: string;
  participants: number;
  expectedParticipants: number;
  budget: string;
  status: "planned" | "in-progress" | "completed" | "cancelled";
  organizer: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminActividadesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [typeFilter, setTypeFilter] = useState<string>("todos");
  const [showForm, setShowForm] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      title: "Jornada de Capacitación Docente",
      description: "Capacitación intensiva para docentes sobre nuevas metodologías educativas y uso de tecnología en el aula",
      date: "2024-03-15",
      time: "09:00",
      type: "Capacitación",
      institution: "Ministerio de Educación",
      location: "Auditorio Principal - Centro de Convenciones",
      participants: 150,
      expectedParticipants: 200,
      budget: "$15,000",
      status: "completed",
      organizer: "Dr. Carlos Méndez",
      createdAt: "2024-02-15T00:00:00Z",
      updatedAt: "2024-03-15T00:00:00Z"
    },
    {
      id: "2",
      title: "Campaña de Vacunación Gratuita",
      description: "Campaña masiva de vacunación contra influenza para población de riesgo",
      date: "2024-04-20",
      time: "08:00",
      type: "Campaña de Salud",
      institution: "Secretaría de Salud",
      location: "Centros de Salud - Todas las comunas",
      participants: 1200,
      expectedParticipants: 1500,
      budget: "$25,000",
      status: "in-progress",
      organizer: "Dra. Ana Rodríguez",
      createdAt: "2024-03-01T00:00:00Z",
      updatedAt: "2024-04-20T00:00:00Z"
    },
    {
      id: "3",
      title: "Feria de Empleo Juvenil",
      description: "Feria de empleo dirigida a jóvenes de 18 a 30 años con empresas locales y nacionales",
      date: "2024-05-10",
      time: "10:00",
      type: "Evento Social",
      institution: "Municipalidad Central",
      location: "Plaza Cívica - Centro de la Ciudad",
      participants: 0,
      expectedParticipants: 800,
      budget: "$8,000",
      status: "planned",
      organizer: "Lic. María González",
      createdAt: "2024-04-01T00:00:00Z",
      updatedAt: "2024-04-01T00:00:00Z"
    },
    {
      id: "4",
      title: "Mantenimiento de Alumbrado Público",
      description: "Programa de mantenimiento y reparación de alumbrado público en barrios prioritarios",
      date: "2024-03-01",
      time: "07:00",
      type: "Mantenimiento",
      institution: "Municipalidad Central",
      location: "Barrios Norte y Sur",
      participants: 25,
      expectedParticipants: 30,
      budget: "$12,000",
      status: "cancelled",
      organizer: "Ing. Luis Fernández",
      createdAt: "2024-02-20T00:00:00Z",
      updatedAt: "2024-02-28T00:00:00Z"
    }
  ]);

  const activityTypes = [
    "Capacitación", "Campaña de Salud", "Evento Social", "Mantenimiento", 
    "Reunión", "Conferencia", "Taller", "Otro"
  ];

  const institutions = [
    "Ministerio de Educación", "Secretaría de Salud", "Municipalidad Central"
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || activity.status === statusFilter;
    const matchesType = typeFilter === "todos" || activity.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "planned": { className: "bg-blue-100 text-blue-800", text: "Planificado", icon: Calendar },
      "in-progress": { className: "bg-orange-100 text-orange-800", text: "En Progreso", icon: Clock },
      "completed": { className: "bg-green-100 text-green-800", text: "Completado", icon: CheckCircle },
      "cancelled": { className: "bg-red-100 text-red-800", text: "Cancelado", icon: XCircle }
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

  const getProgressPercentage = (activity: Activity) => {
    if (activity.status === "completed") return 100;
    if (activity.status === "cancelled") return 0;
    if (activity.status === "in-progress") {
      return Math.min(Math.round((activity.participants / activity.expectedParticipants) * 100), 99);
    }
    return 0;
  };

  const stats = {
    total: activities.length,
    planned: activities.filter(a => a.status === "planned").length,
    inProgress: activities.filter(a => a.status === "in-progress").length,
    completed: activities.filter(a => a.status === "completed").length,
    cancelled: activities.filter(a => a.status === "cancelled").length,
    totalParticipants: activities.reduce((sum, a) => sum + a.participants, 0),
    totalBudget: activities.reduce((sum, a) => sum + parseInt(a.budget.replace(/[$,]/g, '')), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Admin */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
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
                <p className="text-sm text-gray-600">Gestión de Actividades Institucionales</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button size="sm" onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Actividad
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Actividades</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Registradas</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Planificadas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.planned}</div>
              <p className="text-xs text-muted-foreground">Por realizar</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">En Progreso</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.inProgress}</div>
              <p className="text-xs text-muted-foreground">Activas</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completadas</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">Finalizadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Participación Total</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalParticipants.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Participantes</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Presupuesto Total</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${stats.totalBudget.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Presupuesto asignado</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar actividades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="planned">Planificado</SelectItem>
                <SelectItem value="in-progress">En Progreso</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                {activityTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Activities List */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Actividades Registradas</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {filteredActivities.length} actividades encontradas
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-gray-300">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-4 sm:space-y-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                        <h3 className="font-medium text-gray-900 text-base sm:text-lg break-words">{activity.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          {getStatusBadge(activity.status)}
                          <Badge variant="outline" className="text-xs">{activity.type}</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-2 min-w-0">
                          <Calendar className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{new Date(activity.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 min-w-0">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{activity.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 min-w-0">
                          <Users className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{activity.participants}/{activity.expectedParticipants}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{activity.description}</p>
                      
                      {/* Progress Bar */}
                      {activity.status !== "cancelled" && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progreso</span>
                            <span>{getProgressPercentage(activity)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                activity.status === "completed" ? "bg-green-600" : "bg-blue-600"
                              }`}
                              style={{ width: `${getProgressPercentage(activity)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 space-y-2 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                          <span className="font-medium">Institución:</span>
                          <span className="truncate">{activity.institution}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="font-medium sm:inline">Organizador:</span>
                          <span className="truncate">{activity.organizer}</span>
                        </div>
                        <div className="font-medium">
                          <span>Presupuesto: {activity.budget}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 sm:ml-4">
                      <Button size="sm" variant="outline" onClick={() => setSelectedActivity(activity)} className="p-2">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="p-2">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="p-2">
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