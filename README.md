# MediSaaS - Medical Appointment Management System

Plataforma SaaS multi-tenant diseñada para la gestión de citas médicas de alto rendimiento.

## 🚀 Arquitectura del Proyecto

Este monorepo se compone de dos aplicaciones principales:

### Backend
- **Tecnologías:** Spring Boot 3, Java 21, Spring Data JPA
- **Base de Datos:** PostgreSQL (Soporte multi-tenant vía `organization_id`, campos dinámicos vía `JSONB`)
- **Características:** Concurrencia optimizada, control de acceso basado en roles (RBAC), arquitectura orientada a eventos.
- **Ruta:** `/backend`
- **Ejecución:**
  ```bash
  cd backend
  ./mvnw spring-boot:run
  ```

### Frontend
- **Tecnologías:** React, TypeScript, Vite, Tailwind CSS (o Vanilla CSS según corresponda)
- **Características:** Dashboard intuitivo, componentes altamente reutilizables, experiencia de usuario fluida y reactiva.
- **Ruta:** `/frontend`
- **Ejecución:**
  ```bash
  cd frontend
  npm install
  npm run dev
  ```

## 📂 Estructura del Repositorio

```text
Citas_medicas/
├── backend/                  # API REST, Lógica de Negocio y Data Access
│   ├── src/main/java         # Código fuente Java
│   ├── src/main/resources    # Configuración de base de datos y migraciones (Flyway/Liquibase)
│   └── pom.xml               # Dependencias de Maven
└── frontend/                 # Aplicación Web SPA
    ├── src/                  # Componentes React y vistas
    └── package.json          # Dependencias de Node.js
```

## ⚙️ Requisitos Previos

- **Java 21 JDK** o superior
- **Node.js 20+**
- **Maven 3.9+**
- **PostgreSQL 15+**

## 🔧 Configuración Rápida

1. Instanciar una base de datos PostgreSQL local.
2. Configurar las credenciales en `backend/src/main/resources/application.yml` o `application.properties`.
3. Iniciar el servicio backend. Las migraciones de base de datos se ejecutarán automáticamente al iniciar la aplicación.
4. Instalar las dependencias del frontend con `npm install` e iniciar el servidor de desarrollo.
