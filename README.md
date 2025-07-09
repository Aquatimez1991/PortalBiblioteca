# 📚 Biblioteca Digital - Plataforma Institucional

Plataforma completa de Biblioteca Digital desarrollada con **Angular 17+** en el frontend y **NestJS** en el backend, con **PostgreSQL** como base de datos.

## 🚀 Inicio Rápido

### Opción 1: Scripts Automáticos (Recomendado)
```bash
# Iniciar Frontend
./start-frontend.bat

# Iniciar Backend (en otra terminal)
./start-backend.bat
```

### Opción 2: Comandos Manuales
```bash
# Frontend
cd frontend/biblioteca-digital
npm install
npm start

# Backend
cd backend/biblioteca-digital-backend
npm install
npm run start:dev
```

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000
- **Dashboard**: http://localhost:4200/dashboard
- **Catálogo**: http://localhost:4200/books

## 📁 Estructura del Proyecto

```
PortalBiblioteca/
├── frontend/
│   └── biblioteca-digital/          # Angular 17+ App
│       ├── src/app/
│       │   ├── modules/
│       │   │   ├── dashboard/       # ✅ Dashboard Component
│       │   │   ├── books/          # ✅ Books Component
│       │   │   ├── reader/         # 📋 Pendiente
│       │   │   ├── admin/          # 📋 Pendiente
│       │   │   └── stats/          # 📋 Pendiente
│       │   ├── shared/             # 📋 Servicios compartidos
│       │   ├── core/               # 📋 Servicios core
│       │   └── app.component.ts    # ✅ Layout principal
│       └── README.md               # ✅ Documentación
├── backend/
│   └── biblioteca-digital-backend/  # NestJS App
│       ├── src/
│       │   ├── auth/               # ✅ Autenticación
│       │   ├── users/              # ✅ Gestión usuarios
│       │   ├── books/              # ✅ CRUD libros
│       │   ├── catalog/            # ✅ Categorías
│       │   └── ...                 # ✅ Otros módulos
│       └── README.md               # ✅ Documentación
├── start-frontend.bat              # ✅ Script de inicio frontend
├── start-backend.bat               # ✅ Script de inicio backend
└── README.md                       # ✅ Este archivo
```

## ✅ Estado de Desarrollo

### Frontend (Angular 17+)
- ✅ **Layout principal** con sidenav responsive
- ✅ **Dashboard** con estadísticas y métricas
- ✅ **Catálogo de libros** con filtros avanzados
- ✅ **Angular Material** integrado
- ✅ **Diseño responsive** completo
- ✅ **Navegación por rutas** configurada

### Backend (NestJS)
- ✅ **Arquitectura modular** completa
- ✅ **Autenticación JWT** con múltiples estrategias
- ✅ **Gestión de usuarios** y roles
- ✅ **CRUD de libros** con TypeORM
- ✅ **Configuración PostgreSQL** lista
- ✅ **Documentación** completa

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular 17+** con componentes standalone
- **Angular Material** para UI components
- **SCSS** para estilos avanzados
- **TypeScript** para tipado fuerte

### Backend
- **NestJS** framework
- **TypeORM** para ORM
- **PostgreSQL** base de datos
- **JWT** para autenticación
- **Passport** para estrategias de auth

## 📋 Próximos Pasos

### Frontend
- [ ] Componente de lector online
- [ ] Panel de administración
- [ ] Estadísticas avanzadas
- [ ] Integración con backend
- [ ] Autenticación y autorización

### Backend
- [ ] Configuración de base de datos
- [ ] Migraciones iniciales
- [ ] Implementación de servicios
- [ ] Tests unitarios
- [ ] Documentación de API

## 🔧 Configuración de Base de Datos

1. **Instalar PostgreSQL**
2. **Crear base de datos**:
   ```sql
   CREATE DATABASE biblioteca_digital;
   ```
3. **Configurar variables de entorno**:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=tu_password
   DB_NAME=biblioteca_digital
   ```

## 🚨 Solución de Problemas

### Error: "Could not read package.json"
**Solución**: Asegúrate de estar en el directorio correcto:
```bash
# Para frontend
cd frontend/biblioteca-digital
npm start

# Para backend
cd backend/biblioteca-digital-backend
npm run start:dev
```

### Error: "Module not found"
**Solución**: Instalar dependencias:
```bash
npm install
```

### Error: "Port already in use"
**Solución**: Cambiar puerto o matar proceso:
```bash
# Cambiar puerto en angular.json
"serve": {
  "port": 4201
}
```

## 📞 Soporte

Si encuentras algún problema:
1. Verifica que estés en el directorio correcto
2. Asegúrate de que todas las dependencias estén instaladas
3. Revisa los logs de error
4. Consulta la documentación específica en cada carpeta

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. 