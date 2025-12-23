# CenaTrack
<img width="1536" height="673" alt="20251223_0917_Banner Startup Innovador_simple_compose_01kd5s3m6gfgv9s7h4c26w1d931" src="https://github.com/user-attachments/assets/387b7e0e-c446-46ab-929b-bd6106f45b9b" />


Sistema de navegación e inteligencia geoespacial interactiva en la central de abastos de Cúcuta
El presente proyecto desarrolla CenaTrack, una aplicación móvil modular de navegación e inteligencia geoespacial con asistencia conversacional impulsada por IA, orientada a transformar la orientación, movilidad y acceso a información dentro de Cenabastos. Mediante una arquitectura Cliente-Servidor y un stack geoespacial integrado —Expo, React Native Maps (TypeScript), Google Maps SDK (Directions), Google Places Autocomplete— la aplicación ofrece localización precisa, rutas internas y búsqueda inteligente dentro del entorno operativo, resolviendo una necesidad que los mapas genéricos no cubren. El sistema se complementa con un backend en FastAPI, base de datos relacional en NeonDB y un módulo de IA construido con Gemini + ChromaDB + Ngrok, capaz de entregar respuestas semánticas y soporte contextualizado. En conjunto, CenaTrack emerge como una respuesta sociotécnica que cierra la brecha entre la dinámica física del mercado agrocomercial y la digitalización contemporánea, habilitando acceso geoespacial avanzado y asistencia informativa en tiempo real para fortalecer la competitividad del comercio tradicional.

# Stack Técnico

- Plataforma: Expo (SDK), React Native, React, TypeScript
- UI & estilos: NativeWind (Tailwind CSS), Tailwind, `react-native-reanimated`, `react-native-gesture-handler`
- Maps & geolocalización: `react-native-maps`, `react-native-maps-directions`, `expo-location`, Google Places API
- Datos & auth: Firebase (Auth / Realtime/Firestore), Clerk (client auth), `@react-native-async-storage/async-storage`
- Estado y lógica: `zustand`, servicios en `lib/` (fetch, map helpers)
- Integraciones opcionales: Stripe (pagos), chatbot (vector/IA backends)
- Tooling: EAS, Metro, Babel, TypeScript, ESLint, Prettier (prettier-plugin-tailwindcss)

# Modúlos principales
🔋 Features

👉 Onboarding Flow: flujo de registro y configuración inicial para nuevos usuarios.

👉 Email/Password Authentication con verificación: inicio de sesión seguro (Firebase/Clerk) con verificación de correo.

👉 OAuth (Google): inicio rápido usando cuenta de Google.

👉 Autorización: control de acceso y roles a nivel de pantalla/recursos.

👉 Home con ubicación en vivo y mapa: visualización de la posición del usuario y marcadores (`react-native-maps`, `expo-location`).

👉 Recent Rides: lista de viajes recientes con información resumida (uso de `RideCard`).

👉 Google Places Autocomplete: búsqueda de lugares con sugerencias al escribir.

👉 Panel de emergencias: canal directo con organismos de emergencia del estado.

👉 Confirmar Ride con detalles: vista de confirmación.

👉 Perfil: gestión de cuenta .

👉 Responsive en Android y iOS: optimizaciones y pruebas para ambas plataformas (Expo).

👉 Reutilización y arquitectura: componentes modulares en `components/`, lógica en `lib/`, estado en `store/` (`zustand`).
