"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Building2, 
  FileText, 
  QrCode, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Bell,
  Search,
  Plus,
  ClipboardList,
  Activity,
  Users,
  Archive
} from "lucide-react";
import Image from "next/image";

interface AdminSidebarProps {
  className?: string;
}

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Instituciones",
    href: "/admin/instituciones",
    icon: Building2,
    children: [
      {
        title: "Gestionar Instituciones",
        href: "/admin/instituciones",
        icon: Building2,
      },
      {
        title: "Fichas Institucionales",
        href: "/admin/fichas",
        icon: ClipboardList,
      },
    ],
  },
  {
    title: "Documentos",
    href: "/admin/documentos",
    icon: FileText,
    badge: "4",
    badgeVariant: "secondary",
  },
  {
    title: "Códigos QR",
    href: "/admin/qr",
    icon: QrCode,
  },
  {
    title: "Consultas",
    href: "/admin/consultas",
    icon: MessageSquare,
    badge: "12",
    badgeVariant: "destructive",
  },
  {
    title: "Actividades",
    href: "/admin/actividades",
    icon: Activity,
  },
  {
    title: "Estadísticas",
    href: "/admin/estadisticas",
    icon: BarChart3,
  },
  {
    title: "Configuración",
    href: "/admin/configuracion",
    icon: Settings,
  },
];

export function AdminSidebar({ className }: AdminSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("adminUser");
    router.push("/");
  };

  const handleNavigate = (href: string) => {
    router.push(href);
    setIsMobileOpen(false); // Cerrar el menú móvil al navegar
  };

  // Sidebar para desktop
  const DesktopSidebar = () => (
    <div className={cn(
      "hidden md:flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="relative w-8 h-8">
              <Image
                src="/logo-transparencia.png"
                alt="Transparencia Conectada"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">Panel Admin</h1>
              <p className="text-xs text-gray-600">Transparencia</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapse}
          className="ml-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {sidebarItems.map((item) => (
          <div key={item.href}>
            <Button
              variant={isActive(item.href) ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                isCollapsed && "justify-center px-2",
                isActive(item.href) && "bg-blue-50 text-blue-700 hover:bg-blue-100"
              )}
              onClick={() => {
                if (item.children) {
                  toggleExpanded(item.href);
                } else {
                  handleNavigate(item.href);
                }
              }}
            >
              <item.icon className={cn(
                "h-4 w-4",
                !isCollapsed && "mr-3"
              )} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.badge && (
                    <Badge variant={item.badgeVariant as any} className="ml-2">
                      {item.badge}
                    </Badge>
                  )}
                  {item.children && (
                    <ChevronRight className={cn(
                      "h-3 w-3 transition-transform",
                      expandedItems.includes(item.href) && "rotate-90"
                    )} />
                  )}
                </>
              )}
            </Button>

            {/* Sub-items */}
            {item.children && expandedItems.includes(item.href) && !isCollapsed && (
              <div className="ml-4 mt-1 space-y-1">
                {item.children.map((child) => (
                  <Button
                    key={child.href}
                    variant={isActive(child.href) ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive(child.href) && "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    )}
                    onClick={() => handleNavigate(child.href)}
                  >
                    <child.icon className="h-3 w-3 mr-2" />
                    <span className="text-sm">{child.title}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed ? (
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => router.push("/admin/configuracion")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center"
              onClick={() => router.push("/admin/configuracion")}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  // Sidebar para móvil
  const MobileSidebar = () => (
    <div className={cn(
      "md:hidden fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300",
      isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <div className={cn(
        "fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="relative w-8 h-8">
              <Image
                src="/logo-transparencia.png"
                alt="Transparencia Conectada"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">Panel Admin</h1>
              <p className="text-xs text-gray-600">Transparencia</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobile}
            className="hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-120px)]">
          {sidebarItems.map((item) => (
            <div key={item.href}>
              <Button
                variant={isActive(item.href) ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive(item.href) && "bg-blue-50 text-blue-700 hover:bg-blue-100"
                )}
                onClick={() => {
                  if (item.children) {
                    toggleExpanded(item.href);
                  } else {
                    handleNavigate(item.href);
                  }
                }}
              >
                <item.icon className="h-4 w-4 mr-3" />
                <span className="flex-1 text-left">{item.title}</span>
                {item.badge && (
                  <Badge variant={item.badgeVariant as any} className="ml-2">
                    {item.badge}
                  </Badge>
                )}
                {item.children && (
                  <ChevronRight className={cn(
                    "h-3 w-3 transition-transform",
                    expandedItems.includes(item.href) && "rotate-90"
                  )} />
                )}
              </Button>

              {/* Sub-items */}
              {item.children && expandedItems.includes(item.href) && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Button
                      key={child.href}
                      variant={isActive(child.href) ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        isActive(child.href) && "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      )}
                      onClick={() => handleNavigate(child.href)}
                    >
                      <child.icon className="h-3 w-3 mr-2" />
                      <span className="text-sm">{child.title}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => router.push("/admin/configuracion")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMobile}
          className="bg-white shadow-md hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Abrir menú de navegación"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar />
    </>
  );
}