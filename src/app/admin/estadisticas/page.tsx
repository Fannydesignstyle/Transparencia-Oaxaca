"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  Building2,
  Activity,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";
import Image from "next/image";

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

export default function AdminEstadisticasPage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<string>("30d");
  const [isLoading, setIsLoading] = useState(false);

  const stats: StatCard[] = [
    {
      title: "Instituciones",
      value: 150,
      change: "+12%",
      changeType: "positive",
      icon: Building2,
      description: "Total de instituciones registradas"
    },
    {
      title: "Documentos",
      value: 2450,
      change: "+8%",
      changeType: "positive",
      icon: FileText,
      description: "Documentos publicados"
    },
    {
      title: "Consultas",
      value: 1200,
      change: "+15%",
      changeType: "positive",
      icon: Users,
      description: "Consultas recibidas"
    },
    {
      title: "Actividades",
      value: 89,
      change: "+5%",
      changeType: "positive",
      icon: Activity,
      description: "Actividades registradas"
    }
  ];

  const performanceData: ChartData[] = [
    { name: "Ene", value: 400, color: "#3B82F6" },
    { name: "Feb", value: 300, color: "#10B981" },
    { name: "Mar", value: 200, color: "#F59E0B" },
    { name: "Abr", value: 278, color: "#EF4444" },
    { name: "May", value: 189, color: "#8B5CF6" },
    { name: "Jun", value: 239, color: "#06B6D4" }
  ];

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case "positive": return "text-green-600";
      case "negative": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case "positive": return "↗";
      case "negative": return "↘";
      default: return "→";
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
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
                <p className="text-sm text-gray-600">Estadísticas y Analíticas</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Últimos 7 días</SelectItem>
                  <SelectItem value="30d">Últimos 30 días</SelectItem>
                  <SelectItem value="90d">Últimos 90 días</SelectItem>
                  <SelectItem value="1y">Último año</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline" onClick={handleRefresh} disabled={isLoading}>
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
              </Button>
              <Button size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <div className="text-2xl font-bold text-gray-900">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </div>
                  <Badge 
                    variant={stat.changeType === "positive" ? "default" : stat.changeType === "negative" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {getChangeIcon(stat.changeType)} {stat.change}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Actividad de la Plataforma</span>
              </CardTitle>
              <CardDescription>
                Interacción de usuarios en los últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Simple Bar Chart Representation */}
                <div className="flex items-end justify-between h-32 px-4">
                  {performanceData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full max-w-[3rem] rounded-t transition-all duration-300 hover:opacity-80"
                        style={{ 
                          height: `${(item.value / 400) * 100}%`,
                          backgroundColor: item.color 
                        }}
                      />
                      <span className="text-xs text-gray-600 mt-2">{item.name}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center space-x-6 text-sm">
                  {performanceData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-600">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Engagement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Participación Ciudadana</span>
              </CardTitle>
              <CardDescription>
                Métricas de engagement y participación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">89%</div>
                    <div className="text-sm text-gray-600">Tasa de Respuesta</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">4.2</div>
                    <div className="text-sm text-gray-600">Satisfacción</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Consultas Resueltas</span>
                    <span className="font-medium">1,068 / 1,200</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "89%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Documentos Accedidos</span>
                    <span className="font-medium">18,450</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Institutions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Instituciones Más Activas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Ministerio de Educación", documents: 450, change: "+12%" },
                  { name: "Secretaría de Salud", documents: 380, change: "+8%" },
                  { name: "Municipalidad Central", documents: 320, change: "+15%" },
                  { name: "Tribunal de Cuentas", documents: 280, change: "+5%" },
                  { name: "Policía Nacional", documents: 240, change: "+3%" }
                ].map((institution, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{institution.name}</div>
                      <div className="text-xs text-gray-500">{institution.documents} documentos</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {institution.change}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Actividad Reciente</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: "Nuevo documento", institution: "Ministerio de Educación", time: "hace 2 horas" },
                  { action: "Consulta respondida", institution: "Secretaría de Salud", time: "hace 3 horas" },
                  { action: "Actividad completada", institution: "Municipalidad Central", time: "hace 5 horas" },
                  { action: "Institución registrada", institution: "Tribunal de Cuentas", time: "hace 1 día" },
                  { action: "Documento actualizado", institution: "Policía Nacional", time: "hace 1 día" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{activity.action}</div>
                      <div className="text-xs text-gray-500">{activity.institution}</div>
                      <div className="text-xs text-gray-400">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Estado del Sistema</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Uso del Servidor</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Base de Datos</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tiempo de Actividad</span>
                  <span className="text-sm font-medium">99.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "99.9%" }}></div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Estado General</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Saludable
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}