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
  Plus,
  ClipboardList,
  Activity
} from "lucide-react";

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

  const handleNavigate = (path: string) => {
    console.log(`Navegando a: ${path}`);
    router.push(path);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Bienvenido de nuevo, {adminUser?.username}</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notificaciones
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Building2 className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <CardTitle className="text-lg">Instituciones</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>Gestionar instituciones</CardDescription>
              <Button className="mt-4 w-full" onClick={() => handleNavigate("/admin/instituciones")}>
                <Plus className="w-4 h-4 mr-2" />
                Agregar
              </Button>
              <Button className="mt-2 w-full" variant="outline" onClick={() => handleNavigate("/admin/instituciones")}>
                <Search className="w-4 h-4 mr-2" />
                Explorar
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
              <Button className="mt-4 w-full" onClick={() => handleNavigate("/admin/qr")}>
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
              <Button className="mt-4 w-full" onClick={() => handleNavigate("/admin/consultas")}>
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
              <Button className="mt-4 w-full" onClick={() => handleNavigate("/admin/documentos")}>
                <Plus className="w-4 h-4 mr-2" />
                Subir
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New Section - Fichas Institucionales */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestión de Fichas Institucionales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <ClipboardList className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
              <CardTitle className="text-lg">Fichas Institucionales</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>Gestionar fichas completas de instituciones</CardDescription>
              <Button className="mt-4 w-full" onClick={() => handleNavigate("/admin/fichas")}>
                <Plus className="w-4 h-4 mr-2" />
                Gestionar
              </Button>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <BarChart3 className="w-8 h-8 mx-auto mb-2 text-teal-600" />
              <CardTitle className="text-lg">Actividades</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>Registrar actividades institucionales</CardDescription>
              <Button className="mt-4 w-full" onClick={() => handleNavigate("/admin/actividades")}>
                <Plus className="w-4 h-4 mr-2" />
                Registrar
              </Button>
              <Button className="mt-2 w-full" variant="outline" onClick={() => handleNavigate("/admin/actividades")}>
                <Activity className="w-4 h-4 mr-2" />
                Ver Últimas Actividades
              </Button>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Settings className="w-8 h-8 mx-auto mb-2 text-gray-600" />
              <CardTitle className="text-lg">Configuración</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>Configurar parámetros del sistema</CardDescription>
              <Button className="mt-4 w-full" onClick={() => handleNavigate("/admin/configuracion")}>
                <Settings className="w-4 h-4 mr-2" />
                Configurar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Featured Institution - Fanny Design Style */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Institución Destacada</h2>
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-xl text-purple-900">Fanny Design Style</CardTitle>
                <CardDescription className="text-purple-700">Empresa de Diseño Gráfico y Branding</CardDescription>
              </div>
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0">
                Socio Estratégico
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <p className="text-gray-700 mb-4">
                  Empresa especializada en diseño gráfico, branding y soluciones creativas para empresas y particulares. 
                  Ofrecemos servicios de diseño integral con enfoque en la innovación y la creatividad, transformando 
                  ideas en experiencias visuales impactantes.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-600">Director:</span>
                    <p className="font-medium">Estefania Pérez Vázquez</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Fundación:</span>
                    <p className="font-medium">2020</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Empleados:</span>
                    <p className="font-medium">5</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Ubicación:</span>
                    <p className="font-medium">Oaxaca, México</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button onClick={() => handleNavigate("/admin/fichas/fanny-design-style")}>
                    <FileText className="w-4 h-4 mr-2" />
                    Ver Ficha Completa
                  </Button>
                  <Button variant="outline" onClick={() => handleNavigate("/admin/fichas")}>
                    <Building2 className="w-4 h-4 mr-2" />
                    Gestionar
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Estadísticas Rápidas</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Documentos:</span>
                      <span className="font-medium">4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Actividades:</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Estado:</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Activa</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Contacto</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <p className="font-medium text-blue-600">fannydesignstyle@outlook.com</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Teléfono:</span>
                      <p className="font-medium">9517439204</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Web:</span>
                      <p className="font-medium text-blue-600">fannydesignstyle.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}