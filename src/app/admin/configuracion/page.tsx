"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  ArrowLeft,
  Save,
  RefreshCw,
  Shield,
  Bell,
  Mail,
  Database,
  Users,
  Globe,
  CheckCircle
} from "lucide-react";
import Image from "next/image";

interface SystemConfig {
  siteName: string;
  siteDescription: string;
  adminEmail: string;
  contactPhone: string;
  maintenanceMode: boolean;
  allowRegistrations: boolean;
  emailNotifications: boolean;
  maxFileSize: number;
  supportedFileTypes: string[];
  sessionTimeout: number;
  theme: string;
}

export default function AdminConfiguracionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [config, setConfig] = useState<SystemConfig>({
    siteName: "Transparencia Conectada",
    siteDescription: "Plataforma digital de transparencia y participación ciudadana",
    adminEmail: "FannyDesignStyle@outlook.com",
    contactPhone: "951 743 92 04",
    maintenanceMode: false,
    allowRegistrations: true,
    emailNotifications: true,
    maxFileSize: 10,
    supportedFileTypes: ["PDF", "DOC", "DOCX", "XLS", "XLSX", "PPT", "PPTX"],
    sessionTimeout: 30,
    theme: "light"
  });

  const handleInputChange = (field: keyof SystemConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulación de guardado
    setTimeout(() => {
      setIsLoading(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const handleReset = () => {
    setConfig({
      siteName: "Transparencia Conectada",
      siteDescription: "Plataforma digital de transparencia y participación ciudadana",
      adminEmail: "FannyDesignStyle@outlook.com",
      contactPhone: "951 743 92 04",
      maintenanceMode: false,
      allowRegistrations: true,
      emailNotifications: true,
      maxFileSize: 10,
      supportedFileTypes: ["PDF", "DOC", "DOCX", "XLS", "XLSX", "PPT", "PPTX"],
      sessionTimeout: 30,
      theme: "light"
    });
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
                <p className="text-sm text-gray-600">Configuración del Sistema</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {saveSuccess && (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Guardado
                </Badge>
              )}
              <Button size="sm" onClick={handleReset} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Restablecer
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Configuración General
                </CardTitle>
                <CardDescription>
                  Configuración básica del sitio y sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Nombre del Sitio</Label>
                    <Input
                      id="siteName"
                      value={config.siteName}
                      onChange={(e) => handleInputChange("siteName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Email del Administrador</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={config.adminEmail}
                      onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Descripción del Sitio</Label>
                  <Textarea
                    id="siteDescription"
                    value={config.siteDescription}
                    onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Teléfono de Contacto</Label>
                  <Input
                    id="contactPhone"
                    value={config.contactPhone}
                    onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* System Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Configuración del Sistema
                </CardTitle>
                <CardDescription>
                  Opciones de seguridad y funcionamiento del sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Modo Mantenimiento</Label>
                    <p className="text-sm text-muted-foreground">
                      Desactiva el acceso público al sitio
                    </p>
                  </div>
                  <Switch
                    checked={config.maintenanceMode}
                    onCheckedChange={(checked) => handleInputChange("maintenanceMode", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Permitir Registros</Label>
                    <p className="text-sm text-muted-foreground">
                      Permite que nuevos usuarios se registren
                    </p>
                  </div>
                  <Switch
                    checked={config.allowRegistrations}
                    onCheckedChange={(checked) => handleInputChange("allowRegistrations", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notificaciones por Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Envía notificaciones por correo electrónico
                    </p>
                  </div>
                  <Switch
                    checked={config.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={config.sessionTimeout}
                      onChange={(e) => handleInputChange("sessionTimeout", parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="theme">Tema</Label>
                    <Select value={config.theme} onValueChange={(value) => handleInputChange("theme", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Oscuro</SelectItem>
                        <SelectItem value="auto">Automático</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Configuración de Archivos
                </CardTitle>
                <CardDescription>
                  Límites y tipos de archivos permitidos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Tamaño Máximo de Archivo (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={config.maxFileSize}
                    onChange={(e) => handleInputChange("maxFileSize", parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tipos de Archivos Soportados</Label>
                  <div className="flex flex-wrap gap-2">
                    {config.supportedFileTypes.map((type, index) => (
                      <Badge key={index} variant="secondary">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estado del Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Estado</span>
                  <Badge className={config.maintenanceMode ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                    {config.maintenanceMode ? "En Mantenimiento" : "Operativo"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Registros</span>
                  <Badge className={config.allowRegistrations ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {config.allowRegistrations ? "Habilitados" : "Deshabilitados"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notificaciones</span>
                  <Badge className={config.emailNotifications ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                    {config.emailNotifications ? "Activas" : "Inactivas"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Gestionar Usuarios
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Configurar Email
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Notificaciones
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="w-4 h-4 mr-2" />
                  SEO y Analytics
                </Button>
              </CardContent>
            </Card>

            {/* System Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Información del Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Versión</span>
                  <span>1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Última Actualización</span>
                  <span>Hace 2 días</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Base de Datos</span>
                  <span>SQLite</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Framework</span>
                  <span>Next.js 15</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}