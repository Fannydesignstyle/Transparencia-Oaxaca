"use client";

import { usePathname } from "next/navigation";
import { AdminRoute } from "@/components/AdminRoute";

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
      {children}
    </AdminRoute>
  );
}