# Assets Directory Documentation

## Overview

Esta carpeta contiene todos los recursos estáticos utilizados en la aplicación CenaTrack, incluyendo fuentes personalizadas, iconos y imágenes.

## Estructura

```
assets/
├── fonts/              # Fuentes personalizadas
│   ├── Colombia-Regular.ttf
│   ├── Colombia-Bold.ttf
│   ├── Colombia-Bold-Italic.ttf
│   └── Colombia-Regular-Italic.ttf
│
├── icons/              # Iconos de la aplicación
│   ├── home.png       # Icono de inicio
│   ├── chat.png       # Icono de chat
│   ├── list.png       # Icono de recorridos
│   ├── profile.png    # Icono de perfil
│   ├── search.png     # Icono de búsqueda
│   ├── email.png      # Icono de email
│   ├── lock.png       # Icono de contraseña
│   ├── out.png        # Icono de salida
│   └── ...
│
└── images/            # Imágenes de la aplicación
    ├── CenaTrackLargeLogo.png    # Logo principal
    ├── decitionImage.png         # Imagen de pantalla de decisión
    ├── signInLandscape.png       # Fondo de inicio de sesión
    ├── noResult.png              # Imagen para estado vacío
    └── onboarding/              # Imágenes del onboarding
        ├── slide1.png
        ├── slide2.png
        └── slide3.png
```

## Uso

### Fuentes

- Familia tipográfica Colombia personalizada
- Importación en componentes:

```typescript
import { useFonts } from "expo-font";

const [fontsLoaded] = useFonts({
  "Colombia-Regular": require("@/assets/fonts/Colombia-Regular.ttf"),
  "Colombia-Bold": require("@/assets/fonts/Colombia-Bold.ttf"),
});
```

### Iconos

- Formato PNG para máxima compatibilidad
- Importación mediante constantes:

```typescript
import { icons } from "@/constants";
// Uso: icons.home, icons.search, etc.
```

### Imágenes

- Optimizadas para rendimiento
- Importación mediante constantes:

```typescript
import { images } from "@/constants";
// Uso: images.CenaTrackLargeLogo, images.decitionImage, etc.
```

## Convenciones

### Nombres de Archivo

- Usar camelCase para iconos: `homeFilled.png`
- PascalCase para logos: `CenaTrackLogo.png`
- Descriptivos y en inglés

### Optimización

- Comprimir imágenes antes de incluir
- Usar PNG para iconos (transparencia)
- JPG para fotos grandes
- Mantener resolución apropiada

### Organización

- Mantener subcarpetas limpias y organizadas
- Documentar nuevas adiciones
- Remover recursos no utilizados

## Mantenimiento

1. Regular limpieza de assets no utilizados
2. Optimización periódica de imágenes
3. Actualización de documentación al añadir recursos
4. Verificación de compatibilidad multiplataforma
