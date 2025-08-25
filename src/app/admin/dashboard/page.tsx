"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  QrCode, 
  MessageSquare, 
  Monitor, 
  Users, 
  FileText, 
  BarChart3, 
  Settings,
  LogOut,
  Bell,
  Search,
  Plus
} from "lucide-react";
import Image from "next/image";

interface AdminUser {
  username: string;
  role: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticación
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    const userStr = localStorage.getItem("adminUser");
    
    if (isAuthenticated !== "true" || !userStr) {
      router.push("/admin/login");
      return;
    }
    
    try {
      const user = JSON.parse(userStr);
      setAdminUser(user);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/admin/login");
    }
    
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("adminUser");
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

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
                <p className="text-sm text-gray-600">Transparencia Conectada</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notificaciones
              </Button>
              <div className="text-sm text-gray-600">
                Bienvenido, {adminUser?.username}
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Instituciones</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">150</div>
              <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,450</div>
              <p className="text-xs text-muted-foreground">+8% desde el mes pasado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consultas</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,200</div>
              <p className="text-xs text-muted-foreground">+15% desde el mes pasado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documentos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,890</div>
              <p className="text-xs text-muted-foreground">+20% desde el mes pasado</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Building2 className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <CardTitle className="text-lg">Instituciones</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>Gestionar instituciones</CardDescription>
                <Button className="mt-4 w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar
                </Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <QrCode className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <CardTitle className="text-lg">Códigos QR</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>Generar códigos QR</CardDescription>
                <Button className="mt-4 w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Generar
                </Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <CardTitle className="text-lg">Consultas</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>Revisar consultas</CardDescription>
                <Button className="mt-4 w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Revisar
                </Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <FileText className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <CardTitle className="text-lg">Documentos</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>Subir documentos</CardDescription>
                <Button className="mt-4 w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Subir
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>Últimas acciones en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nueva institución registrada</p>
                    <p className="text-xs text-gray-500">Ministerio de Tecnología - Hace 2 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Consulta respondida</p>
                    <p className="text-xs text-gray-500">Solicitud #1234 - Hace 4 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Documento subido</p>
                    <p className="text-xs text-gray-500">Presupuesto 2024 - Hace 6 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Código QR generado</p>
                    <p className="text-xs text-gray-500">Municipalidad Central - Hace 8 horas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Consultas Pendientes</CardTitle>
              <CardDescription>Consultas que requieren atención</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">Solicitud de becas</h4>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pendiente</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">Consulta sobre becas estudiantiles para el próximo año...</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Hace 3 horas</span>
                    <Button size="sm" variant="outline">Responder</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">Mejora de parques</h4>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pendiente</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">Sugerencia para mejorar los parques públicos...</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Hace 5 horas</span>
                    <Button size="sm" variant="outline">Responder</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">Alumbrado público</h4>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Urgente</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">Reclamo por falta de alumbrado en barrio...</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Hace 1 día</span>
                    <Button size="sm" variant="outline">Responder</Button>
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