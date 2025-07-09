# Biblioteca Digital - Backend

Backend de la plataforma de Biblioteca Digital institucional desarrollado con NestJS, TypeORM y PostgreSQL.

## 🏗️ Arquitectura Modular

### Módulos Principales

#### 🔐 Autenticación (`auth/`)
- **JWT Strategy**: Autenticación por token
- **IP Strategy**: Autenticación por rango de IP institucional
- **Referer Strategy**: Autenticación por URL referida
- **EZProxy**: Integración con sistemas de proxy institucional
- **Guards**: Protección de rutas y control de acceso

#### 👥 Usuarios (`users/`)
- Gestión de usuarios y roles (Admin, Bibliotecario, Lector)
- CRUD de usuarios
- Control de sesiones y actividad
- Métodos de autenticación flexibles

#### 📚 Libros (`books/`)
- CRUD del catálogo de libros electrónicos
- Gestión de archivos y metadatos
- Contadores de descargas y lecturas
- Integración con categorías

#### 📂 Catálogo (`catalog/`)
- Categorías y subcategorías
- Organización jerárquica del catálogo
- Colores y personalización visual

#### ⭐ Recomendados (`recommended/`)
- Libros recomendados personalizados
- Algoritmos de recomendación
- Gestión de destacados

#### 📋 MARC (`marc/`)
- Importación de registros MARC
- Procesamiento por lotes
- Conversión de metadatos

#### 📖 Lector (`reader/`)
- Notas personales
- Subrayados y marcadores
- Área de trabajo personal
- Herramientas de citado

#### 📊 Estadísticas (`stats/`)
- Métricas de uso y acceso
- Reportes de actividad
- Exportación de datos
- Filtros por fecha y categoría

#### 📥 Descargas (`downloads/`)
- Gestión de descargas
- DRM simulado (Adobe Content Server)
- Control de derechos digitales
- Integración con Adobe Digital Editions

#### 🏛️ Institución (`institution/`)
- Configuración visual del portal
- Logo, colores y personalización
- Configuración de autenticación
- Datos institucionales

#### 🎓 LMS (`lms/`)
- Integración con sistemas de gestión de aprendizaje
- LTI (Learning Tools Interoperability)
- APIs para integración externa

#### 🤖 Asistente (`assistant/`)
- Chat de ayuda
- Soporte con IA
- Navegación asistida
- Sugerencias de búsqueda

## 🛠️ Tecnologías

- **Framework**: NestJS
- **ORM**: TypeORM
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT + Passport
- **Validación**: class-validator
- **Configuración**: @nestjs/config

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar migraciones
npm run migration:run

# Iniciar en desarrollo
npm run start:dev
```

## 🔧 Variables de Entorno

```env
# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=biblioteca_digital

# JWT
JWT_SECRET=your-secret-key

# Autenticación
ALLOWED_IPS=192.168.1.0/24,10.0.0.0/8
ALLOWED_REFERERS=https://institution.edu,https://lms.institution.edu
EZPROXY_ENABLED=true

# Servidor
PORT=3000
NODE_ENV=development
```

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod

# Build
npm run build

# Tests
npm run test
npm run test:e2e

# Migraciones
npm run migration:generate
npm run migration:run
npm run migration:revert
```

## 📁 Estructura de Archivos

```
src/
├── auth/                 # Autenticación y autorización
│   ├── dto/             # Data Transfer Objects
│   ├── guards/          # Guards de protección
│   ├── strategies/      # Estrategias de autenticación
│   └── decorators/      # Decoradores personalizados
├── users/               # Gestión de usuarios
│   ├── entities/        # Entidades TypeORM
│   └── dto/            # DTOs de usuarios
├── books/               # Catálogo de libros
│   └── entities/        # Entidad Book
├── catalog/             # Categorías y organización
│   └── entities/        # Entidad Category
├── reader/              # Herramientas del lector
│   ├── notes/          # Notas personales
│   ├── highlights/     # Subrayados
│   └── bookmarks/      # Marcadores
├── stats/               # Estadísticas y métricas
├── downloads/           # Descargas y DRM
├── institution/         # Configuración institucional
├── lms/                 # Integración LMS
└── assistant/           # Asistente virtual
```

## 🔒 Seguridad

- Autenticación JWT con refresh tokens
- Validación de IP para acceso institucional
- Control de acceso basado en roles (RBAC)
- Encriptación de contraseñas con bcrypt
- Validación de entrada con class-validator
- Protección CSRF y rate limiting

## 📈 Escalabilidad

- Arquitectura modular y desacoplada
- Patrón Repository para acceso a datos
- Inyección de dependencias
- Configuración por entorno
- Logging estructurado
- Manejo de errores centralizado

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
