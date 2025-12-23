# API Directory Documentation

## Overview

Esta carpeta contiene los endpoints y servicios de API de la aplicación CenaTrack. Los archivos con el sufijo `+api` son rutas de API que manejan peticiones HTTP específicas.

## Estructura

```
(api)/
├── api.readme.md        # Este archivo de documentación
└── user+api.ts         # API endpoints relacionados con usuarios
```

## Endpoints

### User API (`user+api.ts`)

Maneja las operaciones relacionadas con usuarios:

- **GET** - Obtiene información de usuarios
  - Retorna lista de conductores disponibles
  - Incluye detalles como:
    - ID de usuario
    - Nombre y apellido
    - URL de imagen de perfil
    - URL de imagen del vehículo
    - Asientos disponibles
    - Calificación
    - Ubicación (latitud/longitud)

### Nomenclatura

- Los archivos con sufijo `+api.ts` son reconocidos por el enrutador como endpoints de API
- El prefijo `(api)` en el nombre de la carpeta indica que es una carpeta de agrupación de rutas de API

### Uso

Para hacer peticiones a estos endpoints:

```typescript
// Ejemplo de fetch a user+api
const response = await fetch("/api/user");
const data = await response.json();
```

## Convenciones de Desarrollo

1. Usar TypeScript para tipo-seguridad
2. Implementar manejo de errores consistente
3. Documentar los tipos de respuesta
4. Mantener las rutas RESTful
5. Incluir validación de datos

## Seguridad

- Implementar autenticación cuando sea necesario
- Validar inputs
- Sanitizar outputs
- Manejar errores de forma segura

## Testing

Pruebas recomendadas para cada endpoint:

- Validación de inputs
- Casos de éxito
- Manejo de errores
- Casos límite
