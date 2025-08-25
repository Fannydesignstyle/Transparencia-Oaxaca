# Transparencia Oaxaca

Plataforma digital innovadora e independiente que democratiza el acceso a la información pública y fomenta la participación activa de los ciudadanos en la gestión gubernamental.

## 🌟 Características Principales

### 🔍 Perfiles Institucionales
- Acceso centralizado a información de todas las instituciones gubernamentales
- Documentos actualizados en tiempo real
- Presupuestos, informes de actividades y datos oficiales

### 📱 Códigos QR
- Códigos QR únicos para cada institución
- Acceso móvil instantáneo a información institucional
- Compartible para promover la transparencia comunitaria

### 💬 Participación Ciudadana
- Envío directo de consultas, sugerencias y reclamos
- Seguimiento en tiempo real del estado de solicitudes
- Participación en consultas públicas y toma de decisiones

### ♿ Diseño Accesible
- Interfaz intuitiva y fácil de usar
- Optimizada para todos los dispositivos
- Navegación clara y estructura lógica

## 🚀 Tecnologías Utilizadas

- **Frontend**: Next.js 15 con TypeScript
- **Estilos**: Tailwind CSS y shadcn/ui
- **Base de Datos**: SQLite con Prisma ORM
- **Autenticación**: NextAuth.js
- **Estado**: Zustand y TanStack Query
- **AI**: Z-AI Web Dev SDK para generación de contenido
- **Comunicación**: Socket.io para tiempo real

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Configuración

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/transparencia-conectada.git
   cd transparencia-conectada
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   Editar el archivo `.env` con tus configuraciones:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   ZAI_API_KEY="your-zai-api-key-here"
   ```

4. **Inicializar la base de datos**
   ```bash
   npx prisma generate
   npm run db:push
   ```

5. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:3000`

## 🔧 Configuración de la API Key

Para usar las funcionalidades de IA (generación de imágenes, chat completions, búsqueda web), necesitas configurar tu API Key de Z-AI Web Dev SDK:

1. Obtén tu API Key de Z-AI Web Dev SDK
2. Añádela a tu archivo `.env`:
   ```env
   ZAI_API_KEY="tu-api-key-aqui"
   ```

### Uso de la API en el proyecto

El proyecto incluye utilidades en `src/lib/zai.ts` para usar la API de manera segura:

```typescript
import { generateChatCompletion, generateImage, webSearch } from '@/lib/zai';

// Generar chat completion
const response = await generateChatCompletion([
  { role: 'system', content: 'Eres un asistente útil' },
  { role: 'user', content: 'Hola, ¿cómo estás?' }
]);

// Generar imagen
const imageResponse = await generateImage('Un hermoso paisaje');

// Búsqueda web
const searchResults = await webSearch('Noticias de tecnología');
```

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── admin/             # Panel de administración
│   ├── documentos/        # Página de documentos
│   ├── instituciones/     # Página de instituciones
│   └── tutoriales/        # Página de tutoriales
├── components/            # Componentes React
│   ├── ui/               # Componentes UI de shadcn
│   ├── admin-sidebar.tsx
│   ├── document-viewer.tsx
│   └── Footer.tsx
├── lib/                  # Utilidades y configuración
│   ├── db.ts            # Cliente de base de datos
│   ├── socket.ts        # Configuración Socket.io
│   └── zai.ts           # Utilidades Z-AI SDK
└── hooks/               # Custom hooks
```

## 📊 Funcionalidades Administrativas

### Panel de Administración
- **Dashboard**: Vista general con estadísticas
- **Gestión de Documentos**: Subir y organizar documentos
- **Gestión de Instituciones**: Administrar perfiles institucionales
- **Consultas Ciudadanas**: Gestionar consultas y respuestas
- **Códigos QR**: Generar y administrar códigos QR
- **Estadísticas**: Análisis de uso y participación
- **Configuración**: Ajustes de la plataforma

### Credenciales de Acceso
- **Administrador**: `admin` / `Transparencia2024*`
- **Editor**: `fanny` / `DesignStyle2024!`
- **Operador**: `operator` / `Operador2024#`

## 🎨 Diseño y UX

- **Diseño Responsivo**: Optimizado para desktop, tablet y móvil
- **Tema**: Interfaz limpia y profesional con colores azul y blanco
- **Accesibilidad**: Cumple con estándares de accesibilidad web
- **Experiencia de Usuario**: Navegación intuitiva y flujo lógico

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conectar tu repositorio a Vercel
2. Configurar variables de entorno en Vercel
3. Desplegar automáticamente

### Otros Proveedores
El proyecto puede ser desplegado en cualquier plataforma que soporte Next.js:
- Netlify
- Railway
- Digital Ocean
- AWS

## 📄 Licencia

Este proyecto es una iniciativa independiente para la transparencia y participación ciudadana. Ver archivo LICENSE para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

Para consultas o sugerencias:
- Email: info@transparenciaconectada.org
- GitHub Issues: [Crear Issue](https://github.com/Fannydesignstyle/Transparencia-Oaxaca/issues)

## 🙏 Agradecimientos

- Al equipo de desarrollo por su dedicación
- A la comunidad por su apoyo y retroalimentación
- A las instituciones que colaboran con la transparencia

---

**Transparencia Oaxaca** - Democratizando el acceso a la información pública.