"use client";

import { usePathname } from "next/navigation";
import { AdminRoute } from "@/components/AdminRoute";
import { AdminSidebar } from "@/components/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // No aplicar protección a la página de login
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }
  
  return (
    <AdminRoute>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <div className="min-h-full">
            {children}
          </div>
        </main>
      </div>
    </AdminRoute>
  );
}