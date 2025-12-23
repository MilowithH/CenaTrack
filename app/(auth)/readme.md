# Authentication Directory Documentation

## Overview

Esta carpeta contiene todos los componentes y lógica relacionada con la autenticación en CenaTrack. Utiliza Clerk como proveedor de autenticación y maneja flujos de registro, inicio de sesión y bienvenida.

## Estructura

```
(auth)/
├── _layout.tsx           # Layout y configuración de rutas de autenticación
├── welcome.tsx          # Pantalla de bienvenida con onboarding
├── sign.tsx            # Pantalla de decisión (registro/invitado)
├── sign-in.tsx         # Pantalla de inicio de sesión
├── sign-up.tsx         # Pantalla de registro
└── readme.md           # Esta documentación
```

## Componentes

### Layout (`_layout.tsx`)

- Configura Stack Navigator para las rutas de autenticación
- Gestiona la navegación entre pantallas de auth
- Oculta headers por defecto para diseño personalizado

### Welcome (`welcome.tsx`)

- Primera pantalla que ve el usuario
- Implementa carrusel de onboarding con Swiper
- Características:
  - Slides informativos con imágenes
  - Indicadores de navegación personalizados
  - Botón "Saltar" para acceso rápido
  - Botón dinámico "Siguiente/Empezar"

### Sign (`sign.tsx`)

- Pantalla de decisión post-onboarding
- Opciones:
  - Crear cuenta nueva
  - Autenticación OAuth
  - Acceso como invitado
- Diseño con logo y CTA buttons

### Sign In (`sign-in.tsx`)

- Pantalla de inicio de sesión
- Características:
  - Validación de campos
  - Manejo de errores en español
  - Integración con Clerk
  - Toggle de visibilidad de contraseña
  - Opción de OAuth

### Sign Up (`sign-up.tsx`)

- Pantalla de registro de usuario
- Características:
  - Formulario completo de registro
  - Verificación por email
  - Validaciones en tiempo real
  - Manejo de errores detallado
  - Modal de éxito

## Flujo de Autenticación

1. Welcome (Onboarding) → Usuario ve slides informativos
2. Sign (Decisión) → Usuario elige método de acceso
3. Sign Up/Sign In → Usuario completa autenticación
4. Redirección a app principal tras autenticación exitosa

## Convenciones de Desarrollo

### Estilos

- Uso de NativeWind (Tailwind) para estilos
- Clases consistentes para elementos similares
- Diseño responsive

### Manejo de Errores

- Traducción de errores de Clerk al español
- Feedback visual inmediato
- Mensajes de error amigables

### Componentes Compartidos

- CustomButton para botones
- InputField para campos de texto
- OAuth para autenticación social

## Seguridad

- Validación de inputs
- Verificación de email
- Integración segura con Clerk
- Manejo de sesiones

## Testing Recomendado

- Flujos de autenticación completos
- Validación de formularios
- Estados de error
- Navegación entre pantallas
- Persistencia de sesión
