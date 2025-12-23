# Types Directory Documentation

## Overview

Esta carpeta contiene las definiciones de tipos TypeScript (`.d.ts`) utilizadas en toda la aplicación CenaTrack. Define interfaces, tipos y declaraciones que aseguran la tipo-seguridad del código.

## Estructura

```
types/
├── image.d.ts         # Definiciones de tipos para imágenes
├── type.d.ts          # Tipos principales de la aplicación
└── readme.md          # Esta documentación
```

## Archivos

### `type.d.ts`

Contiene los tipos principales de la aplicación:

```typescript
// Interfaces de Usuario y Autenticación
interface Usuario {
  usuario_id: string;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  car_image_url?: string;
  car_seats?: number;
  rating?: string;
}

// Interfaces de Ubicación
interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

// Props de Componentes
interface GoogleInputProps {
  icon?: ImageSourcePropType;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: (location: LocationData) => void;
}

// Tipos de Marcadores
interface MarkerData {
  id: string | number;
  latitude: number;
  longitude: number;
  title: string;
  // ... otros campos de marcadores
}
```

### `image.d.ts`

Contiene las declaraciones de módulos para archivos de imágenes:

```typescript
declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.jpg" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const value: any;
  export default value;
}
```

## Uso

### Importación de Tipos

```typescript
import { Usuario, LocationData, GoogleInputProps } from "@/types/type";

// Uso en componentes
const UserProfile: React.FC<{ user: Usuario }> = ({ user }) => {
  // ...
};

// Uso en funciones
const handleLocation = (location: LocationData) => {
  // ...
};
```

## Convenciones

### Nombrado

- Usar PascalCase para interfaces y tipos
- Sufijo `Props` para props de componentes
- Sufijo `Data` para estructuras de datos

### Organización

- Agrupar tipos relacionados
- Documentar interfaces complejas
- Mantener tipos específicos cerca de sus componentes

## Mejores Prácticas

1. **Tipo-Seguridad**
   - Evitar `any` cuando sea posible
   - Usar tipos específicos en lugar de genéricos
   - Documentar casos edge

2. **Mantenibilidad**
   - Mantener tipos actualizados
   - Remover tipos no utilizados
   - Documentar cambios importantes

3. **Reutilización**
   - Crear tipos compuestos cuando sea útil
   - Usar utilidades de TypeScript (Pick, Omit, etc.)
   - Compartir tipos comunes

## Testing

- Verificar que los tipos cubren todos los casos de uso
- Asegurar compatibilidad con librerías externas
- Validar tipos en build time
