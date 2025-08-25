# Guía de Despliegue - Transparencia Oaxaca

## 📋 Requisitos Previos

- Cuenta en Vercel, Netlify, Railway o plataforma de despliegue preferida
- Repositorio de GitHub: https://github.com/Fannydesignstyle/Transparencia-Oaxaca
- API Keys configuradas (Z-AI y Google AI)

## 🚀 Opciones de Despliegue

### Opción 1: Vercel (Recomendado)

#### Paso 1: Conectar con GitHub
1. Ve a [Vercel](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "New Project"
4. Selecciona tu repositorio `Fannydesignstyle/Transparencia-Oaxaca`

#### Paso 2: Configurar Variables de Entorno
En la sección "Environment Variables", añade:

```env
# Database
DATABASE_URL=postgresql://usuario:password@host:puerto/database

# NextAuth
NEXTAUTH_SECRET=tu-segredo-aqui-generado-aleatoriamente
NEXTAUTH_URL=https://tu-dominio.vercel.app

# Z-AI Web Dev SDK
ZAI_API_KEY=7f309bf5fd524c89a6823aa30c4ac66f.Vn3Yh9usmxWSFaCX
ZAI_BASE_URL=https://u0x5m74yfkc1-deploy.space.z.ai

# Google AI (Gemini)
GOOGLE_AI_API_KEY=AIzaSyD51XE_X_JTMS5rTYgU1cJC243nAkvxnME
```

#### Paso 3: Configurar Build Command
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

#### Paso 4: Desplegar
Haz clic en "Deploy" y espera a que se complete el proceso.

### Opción 2: Netlify

#### Paso 1: Conectar con GitHub
1. Ve a [Netlify](https://netlify.com)
2. Haz clic en "New site from Git"
3. Conecta tu cuenta de GitHub
4. Selecciona el repositorio `Transparencia-Oaxaca`

#### Paso 2: Configurar Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18 o superior

#### Paso 3: Configurar Variables de Entorno
En "Site settings" → "Build & deploy" → "Environment":

```env
DATABASE_URL=postgresql://usuario:password@host:puerto/database
NEXTAUTH_SECRET=tu-segredo-aqui
NEXTAUTH_URL=https://tu-dominio.netlify.app
ZAI_API_KEY=7f309bf5fd524c89a6823aa30c4ac66f.Vn3Yh9usmxWSFaCX
ZAI_BASE_URL=https://u0x5m74yfkc1-deploy.space.z.ai
GOOGLE_AI_API_KEY=AIzaSyD51XE_X_JTMS5rTYgU1cJC243nAkvxnME
```

#### Paso 4: Desplegar
Haz clic en "Deploy site"

### Opción 3: Railway

#### Paso 1: Crear Cuenta y Proyecto
1. Ve a [Railway](https://railway.app)
2. Crea una cuenta y conecta tu GitHub
3. Haz clic en "New Project"
4. Selecciona "Deploy from GitHub repo"

#### Paso 2: Seleccionar Repositorio
Selecciona `Fannydesignstyle/Transparencia-Oaxaca`

#### Paso 3: Configurar Variables
Railway detectará automáticamente que es un proyecto Next.js. Añade las variables de entorno necesarias.

#### Paso 4: Desplegar
Railway desplegará automáticamente tu proyecto.

## 🔧 Configuración de Base de Datos

### Opción A: PostgreSQL (Recomendado para producción)

#### En Vercel:
1. Ve a "Storage" → "Create Database"
2. Selecciona "PostgreSQL"
3. Una vez creada, copia la URL de conexión
4. Añádela a las variables de entorno como `DATABASE_URL`

#### En Railway:
1. Ve a "Variables" → "Add Variable"
2. Añade `DATABASE_URL` con tu URL de PostgreSQL

#### En Netlify:
Netlify no incluye bases de datos, necesitarás un servicio externo como:
- Supabase
- PlanetScale
- Heroku PostgreSQL

### Opción B: SQLite (Para desarrollo o proyectos pequeños)

Para producción, SQLite no es recomendado para aplicaciones con muchos usuarios concurrentes.

## 🌐 Configuración de Dominio

### En Vercel:
1. Ve a "Settings" → "Domains"
2. Añade tu dominio personalizado
3. Sigue las instrucciones para configurar DNS

### En Netlify:
1. Ve a "Site settings" → "Domain management"
2. Añade tu dominio personalizado
3. Configura los registros DNS según las instrucciones

## 🔒 Configuración de Seguridad

### Variables de Entorno Críticas:
- `NEXTAUTH_SECRET`: Genera uno nuevo con: `openssl rand -base64 32`
- `DATABASE_URL**: Nunca exponer en el código
- `ZAI_API_KEY` y `GOOGLE_AI_API_KEY`: Mantener privadas

### HTTPS:
- Todas las plataformas mencionadas incluyen HTTPS automático
- Asegúrate de que todas las URLs usen `https://`

## 📊 Monitoreo y Analytics

### En Vercel:
- Analytics incluido
- Monitoreo de rendimiento
- Logs de errores

### En Netlify:
- Analytics incluido
- Monitoreo de funciones serverless
- Form handling

### En Railway:
- Métricas básicas
- Logs de despliegue
- Monitoreo de recursos

## 🔄 Configuración de CI/CD

### GitHub Actions (Opcional)
Crea un archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Vercel
      uses: vercel/action@v1
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 🚨 Posibles Problemas y Soluciones

### Problema 1: Build falla
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Problema 2: Variables de entorno no funcionan
- Verifica que los nombres sean exactamente iguales
- Asegúrate de que no haya espacios en blanco
- Reinicia el despliegue después de cambiar variables

### Problema 3: API Keys no funcionan
- Verifica que las API Keys sean correctas
- Algunas APIs tienen restricciones geográficas
- Revisa los límites de uso de las APIs

### Problema 4: Base de datos no se conecta
- Verifica la URL de conexión
- Asegúrate de que la base de datos permita conexiones externas
- Revisa las credenciales

## 📈 Post-Despliegue

### 1. Verificar Funcionalidades
- [ ] Página principal carga correctamente
- [ ] Sistema de login funciona
- [ ] Panel de administración accesible
- [ ] API endpoints responden
- [ ] Documentos se muestran correctamente
- [ ] Formularios funcionan

### 2. Optimización
- [ ] Imágenes optimizadas
- [ ] Caching configurado
- [ ] CDN activado
- [ ] Compresión GZIP habilitada

### 3. SEO
- [ ] Meta tags configurados
- [ ] Sitemap.xml generado
- [ ] Robots.txt configurado
- [ ] Open Graph tags implementados

### 4. Seguridad
- [ ] HTTPS funcionando
- [ ] Headers de seguridad configurados
- [ ] Variables de entorno protegidas
- [ ] Dependencias actualizadas

## 🎉 ¡Listo para Producción!

Una vez completados estos pasos, tu plataforma "Transparencia Oaxaca" estará:

- ✅ Desplegada en producción
- ✅ Accesible globalmente
- ✅ Segura y optimizada
- ✅ Monitoreada y lista para usar

¡Felicidades por llevar tu proyecto a producción! 🚀