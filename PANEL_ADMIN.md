# Panel Administrativo - Transparencia Conectada

## Descripción General

Se ha implementado un panel administrativo completo para la gestión de la plataforma Transparencia Conectada. El panel incluye sistema de autenticación, dashboard principal y módulos de gestión.

## Características Implementadas

### 1. Sistema de Autenticación
- **URL**: `/admin/login`
- **Credenciales de demostración**:
  - Usuario: `admin`
  - Contraseña: `admin123`
- **Características**:
  - Formulario de inicio de sesión con validación
  - Mostrar/ocultar contraseña
  - Almacenamiento de sesión en localStorage
  - Redirección automática si no está autenticado

### 2. Dashboard Principal
- **URL**: `/admin/dashboard`
- **Características**:
  - Estadísticas en tiempo real
  - Acciones rápidas para gestión
  - Actividad reciente del sistema
  - Consultas pendientes
  - Navegación intuitiva

### 3. Gestión de Instituciones
- **URL**: `/admin/instituciones`
- **Características**:
  - Listado completo de instituciones
  - Búsqueda y filtrado
  - Estados (Activa/Inactiva)
  - Acciones (Ver, Editar, Eliminar)
  - Exportar datos

### 4. Protección de Rutas
- Todas las rutas administrativas están protegidas
- Redirección automática al login si no está autenticado
- Verificación de estado de autenticación

## Estructura de Archivos

```
src/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx          # Página de login
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Dashboard principal
│   │   ├── instituciones/
│   │   │   └── page.tsx          # Gestión de instituciones
│   │   └── layout.tsx            # Layout con protección de rutas
├── components/
│   ├── AdminRoute.tsx            # Componente de protección de rutas
│   └── ui/                       # Componentes UI existentes
└── hooks/
    └── useAuth.ts                # Hook de autenticación
```

## Uso del Panel

### Acceso al Panel
1. Hacer clic en "Iniciar Sesión" en el header principal
2. Ingresar las credenciales:
   - Usuario: `admin`
   - Contraseña: `admin123`
3. Será redirigido al dashboard principal

### Navegación
- **Dashboard Principal**: Vista general con estadísticas y acciones rápidas
- **Gestión de Instituciones**: Administrar las instituciones del sistema
- **Cerrar Sesión**: Botón en la esquina superior derecha

### Funcionalidades del Dashboard
- **Estadísticas**: Mostrar métricas clave del sistema
- **Acciones Rápidas**: Acceso directo a funciones principales
- **Actividad Reciente**: Registro de las últimas acciones
- **Consultas Pendientes**: Gestión de solicitudes de usuarios

### Gestión de Instituciones
- **Buscar**: Filtrar instituciones por nombre o tipo
- **Agregar**: Crear nuevas instituciones (botón disponible)
- **Editar**: Modificar instituciones existentes
- **Eliminar**: Remover instituciones del sistema
- **Ver**: Consultar detalles completos
- **Exportar**: Descargar listado en formato externo

## Seguridad

### Consideraciones de Seguridad
- **Autenticación básica**: Sistema de login con credenciales
- **Protección de rutas**: Verificación en cada página administrativa
- **Almacenamiento local**: Sesión guardada en localStorage (para demostración)
- **Redirección automática**: Acceso no autorizado redirigido al login

### Mejoras Futuras Recomendadas
1. **Backend real**: Implementar autenticación con backend seguro
2. **JWT**: Usar tokens JWT para autenticación
3. **Roles y permisos**: Sistema de roles granular
4. **Encriptación**: Contraseñas encriptadas en base de datos
5. **Sesiones seguras**: HttpOnly cookies para sesiones

## URLs Importantes

- **Sitio principal**: `http://0.0.0.0:3000`
- **Login administrativo**: `http://0.0.0.0:3000/admin/login`
- **Dashboard**: `http://0.0.0.0:3000/admin/dashboard`
- **Gestión de instituciones**: `http://0.0.0.0:3000/admin/instituciones`

## Personalización

### Cambiar Credenciales
Para cambiar las credenciales de demostración, modificar en `src/app/admin/login/page.tsx`:
```typescript
if (username === "admin" && password === "admin123") {
```

### Agregar Nuevos Módulos
1. Crear nueva carpeta en `src/app/admin/`
2. Crear `page.tsx` con el contenido del módulo
3. Agregar enlace en el dashboard si es necesario

### Modificar Estilos
Los estilos usan Tailwind CSS y pueden ser modificados directamente en los archivos de las páginas.

## Soporte

Para cualquier problema o consulta sobre el panel administrativo, contactar a:
- **Email**: FannyDesignStyle@outlook.com
- **Teléfono**: 951 743 92 04