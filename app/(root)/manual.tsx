import { icons, images } from "@/constants";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from 'react';
import { Alert, Animated, Image, LayoutChangeEvent, Linking, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Manual = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(600));

  // 1. Referencia al ScrollView principal
  const scrollViewRef = useRef<ScrollView>(null);
  
  // 2. Referencia para guardar las coordenadas Y de cada sección
  const sectionPositions = useRef<{ [key: number]: number }>({});

  const toggleMenu = () => {
    if (!menuVisible) {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0, // Ajustado a 0 para que ocupe bien el lateral derecho
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 600,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    }
  };

  // 3. Función para capturar la posición de cada sección
  const handleLayout = (id: number, event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;
    sectionPositions.current[id] = layout.y;
  };

  // 4. Función de navegación (Landing Page Logic)
  const scrollToSection = (id: number) => {
    const yPosition = sectionPositions.current[id];
    
    if (yPosition !== undefined && scrollViewRef.current) {
      toggleMenu(); // Cerramos el menú primero
      // Pequeño delay para permitir que el modal cierre suavemente antes de scrollear
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: yPosition - 20, // -20 para dejar un poco de "aire" arriba
          animated: true,
        });
      }, 100);
    }
  };

  const menuItems = [
    { id: 1, title: 'Presentación' },
    { id: 2, title: 'Descripción' },
    { id: 3, title: 'Requisitos' },
    { id: 4, title: 'Instalación' },
    { id: 5, title: 'Pantallas' },
    { id: 6, title: 'Funciones' },
    { id: 7, title: 'FAQ' },
    { id: 8, title: 'Solución de problemas' },
    { id: 9, title: 'Técnico' },
    { id: 10, title: 'Créditos' }
  ];

  const handleLanding = async () => {
    const url = "https://milowithh.github.io/LandingPage_CenaTrack/";
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "No se pudo abrir el enlace");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" backgroundColor="transparent" />

      {/* Header Flotante y Limpio */}
      <View className="bg-white/90 px-5 py-2 flex-row items-center justify-between shadow-sm z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 bg-gray-50 rounded-full"
        >
          <Image source={icons.backArrow} className="w-6 h-6" resizeMode="contain" />
        </TouchableOpacity>

        <Image
          className="w-32 h-10"
          source={images.CenaTrackLargeLogo}
          resizeMode="contain"
        />

        <TouchableOpacity
          onPress={toggleMenu}
          className="p-2 bg-gray-50 rounded-full"
        >
          <Image source={icons.menu} className="w-6 h-6" resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* Menú Lateral (Slide-in) */}
      {menuVisible && (
        <Modal
          transparent
          visible={menuVisible}
          onRequestClose={toggleMenu}
          animationType="none"
        >
          <View className="flex-1 flex-row">
             {/* Overlay oscuro para cerrar al tocar fuera */}
            <TouchableOpacity 
              className="flex-1 bg-black/40 backdrop-blur-sm" 
              activeOpacity={1} 
              onPress={toggleMenu}
            />
            
            {/* Panel del menú */}
            <Animated.View 
              className="w-[80%] bg-white shadow-2xl h-full"
              style={{ transform: [{ translateX: slideAnim }] }}
            >
              <SafeAreaView className="flex-1">
                <View className="flex-row justify-between items-center p-6 border-b border-gray-100">
                  <Text className="text-3xl font-colombia-bold text-gray-800">Índice</Text>
                  <TouchableOpacity onPress={toggleMenu} className="p-2 bg-gray-50 rounded-full">
                    <Image source={icons.close} className="w-5 h-5 opacity-60" />
                  </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 px-2" showsVerticalScrollIndicator={false}>
                  {menuItems.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => scrollToSection(item.id)}
                      className="py-4 px-4 border-b border-gray-50 active:bg-blue-50 rounded-lg"
                    >
                      <Text className="text-2xl text-gray-700 font-colombia-bold">
                        <Text className="text-[#2196F3] font-colombia-bold mr-2">{item.id}. </Text>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  ))}

                  <View className="mt-6 mx-4 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                    <Text className="text-2xl font-colombia-bold text-blue-800 mb-1">Más información</Text>
                    <Text className="text-xl text-gray-600 font-colombia-bold mb-3">
                      Visita nuestra web oficial para detalles extendidos.
                    </Text>
                    <TouchableOpacity onPress={handleLanding}>
                      <Text className="text-[#2196F3] font-colombia-bold underline">
                        Ir a la Landing Page
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className="h-10"/> 
                </ScrollView>
              </SafeAreaView>
            </Animated.View>
          </View>
        </Modal>
      )}

      {/* Contenido Principal Scrollable */}
      <ScrollView 
        ref={scrollViewRef} // Conectamos el ref aquí
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 20 }}
      >
        
        {/* Título Principal */}
        <View className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-gray-100">
          <Text className="text-4xl font-colombia-bold text-gray-900 text-center mb-2">
            Manual de Usuario
          </Text>
          <Text className="text-3xl text-[#2196F3] text-center font-colombia-bold mb-4 uppercase tracking-widest">
            CenaTrack
          </Text>
          <Text className="text-2xl text-gray-500 text-center leading-relaxed font-colombia-bold">
            Tu guía paso a paso para dominar el sistema de navegación de la Central de Abastos.
          </Text>
        </View>

        {/* --- SECCIÓN 1: Presentación --- */}
        <View onLayout={(event) => handleLayout(1, event)} className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
          <Text className="text-3xl font-colombia-bold text-gray-800 mb-3">
            1. Presentación
          </Text>
          <Text className="text-2xl text-gray-600 leading-7 text-justify font-colombia-bold">
            ¡Bienvenido a <Text className="text-[#2196F3]">CenaTrack</Text>! Este documento te guiará para instalar, configurar y aprovechar al máximo la aplicación dentro de Cenabastos. Diseñado para compradores, transportadores y administrativos.
          </Text>
        </View>

        {/* --- SECCIÓN 2: Descripción --- */}
        <View onLayout={(event) => handleLayout(2, event)} className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
          <Text className="text-3xl font-colombia-bold text-gray-800 mb-3">
            2. Descripción General
          </Text>
          <Text className="text-2xl text-gray-600 leading-7  text-justify mb-4 font-colombia-bold">
            Una herramienta móvil para geolocalización en tiempo real. Facilitamos la localización de galpones y ofrecemos soporte mediante nuestro asistente <Text className="font-colombia-bolditalic text-2xl text-blue-500">Celeste</Text>.
          </Text>
          <View className="bg-gray-50 p-4 rounded-xl">
            {[
              'Mapa interactivo con rutas.',
              'Asistente virtual con IA.',
              'Geolocalización en vivo.',
              'Seguridad 2FA via Clerk.',
            ].map((item, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                <Text className="text-2xl text-gray-700 font-colombia-bold flex-1">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* --- SECCIÓN 3: Requisitos --- */}
        <View onLayout={(event) => handleLayout(3, event)} className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
          <Text className="text-3xl font-colombia-bold text-gray-800 mb-3">
            3. Requisitos
          </Text>
          <View className="space-y-3">
            {[
              'Android 9+.',
              'Internet estable (3 Mbps).',
              'GPS activado.',
              '200 MB de almacenamiento.',
            ].map((item, index) => (
              <View key={index} className="flex-row items-center bg-gray-50 p-3 rounded-lg">
                 <Text className="text-[#2196F3] font-colombia-bold mr-3">✓</Text>
                 <Text className="text-2xl text-gray-700 font-colombia-bold">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* --- SECCIÓN 4: Instalación --- */}
        <View onLayout={(event) => handleLayout(4, event)} className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
          <Text className="text-3xl font-colombia-bold text-gray-800 mb-4">
            4. Instalación y Acceso
          </Text>
          {[
            { title: 'Descarga', desc: 'Busca "CenaTrack" en tu tienda de aplicaciones o consigue el link de descarga.' },
            { title: 'Bienvenida', desc: 'Desliza el carrusel informativo inicial.' },
            { title: 'Login', desc: 'Crea una cuenta personal o usa el modo Invitado.' },
            { title: 'Verificación', desc: 'Confirma tu identidad (si aplica).' },
          ].map((step, i) => (
            <View key={i} className="flex-row mb-4 last:mb-0">
              <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center mr-4">
                <Text className="text-[#2196F3] font-colombia-bold">{i + 1}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-2xl text-gray-800 font-colombia-bold mb-1">{step.title}</Text>
                <Text className="text-xl text-justify text-gray-500 font-colombia-bold">{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* --- SECCIÓN 5: Pantallas --- */}
        <View onLayout={(event) => handleLayout(5, event)} className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
          <Text className="text-3xl font-colombia-bold text-gray-800 mb-4">
            5. Pantallas Principales
          </Text>
          <Text className="text-2xl text-gray-600 font-colombia-bold mb-2">
            <Text className="text-gray-900 text-justify text-3xl">Inicio:</Text> Mapa central y búsqueda rápida.
          </Text>
          <Text className="text-2xl text-gray-600 font-colombia-bold mb-2">
            <Text className="text-gray-900 text-justify text-3xl">Mapa:</Text> Gestos táctiles, filtros por categoría y trazado de rutas; Para buscar destino toca la barra de búsqueda y escribe el destino al cual quieres ir y cierra el teclado para seleccionar opción correcta.
          </Text>
          <Text className="text-2xl text-gray-600 font-colombia-bold mb-2">
            <Text className="text-gray-900 text-justify text-3xl">Asistente:</Text> Chatbot contextualizado; Escribe cualquier palabra clave o consulta en el campo de busqueda (Escribe un mensaje...).
          </Text>
          <Text className="text-2xl text-gray-600 font-colombia-bold mb-2">
            <Text className="text-gray-900 text-justify text-3xl">Panel de emergencias:</Text> Centro de emergencias el cual puedes usar en caso tal de alguna novedad o situación inesperada,toca el banner del servicio de emergencias que requieras contactar y serás redirigido a tu centro de llamadas! Ten en cuenta que este servicio debe ser usado de manera responsable,CenaTrack no se hace responsable por el mal uso del mismo.
          </Text>
          <Text className="text-2xl text-gray-600 font-colombia-bold">
            <Text className="text-gray-900 text-justify text-3xl">Perfil:</Text> Gestión de cuenta y ajustes.
          </Text>
        </View>

        {/* --- SECCIÓN 6: Funciones --- */}
        <View onLayout={(event) => handleLayout(6, event)} className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
          <Text className="text-3xl font-colombia-bold text-gray-800 mb-4">
            6. Funciones Destacadas
          </Text>
          <View className="bg-gray-50 rounded-xl overflow-hidden">
             {/* Simplificado para diseño más limpio */}
             <View className="p-4 border-b border-gray-200">
               <Text className="font-colombia-bold text-gray-800 text-2xl">Inicio con código de verificación</Text>
               <Text className="text-xl text-gray-500 mt-1 font-colombia-bold">Acceso rápido y seguro</Text>
             </View>
             <View className="p-4 border-b border-gray-200">
               <Text className="font-colombia-bold text-gray-800 text-2xl">Rutas Inteligentes</Text>
               <Text className="text-xl text-gray-500 mt-1 font-colombia-bold">Indicaciones paso a paso</Text>
             </View>
             <View className="p-4 border-b border-gray-200">
               <Text className="font-colombia-bold text-gray-800 text-2xl">Busqueda de tarifas y horarios</Text>
               <Text className="text-xl text-gray-500 mt-1 font-colombia-bold">Asistencia del chatbot para brindar información al usuario</Text>
             </View>
             <View className="p-4">
               <Text className="font-colombia-bold text-gray-800 text-2xl">Modo invitado</Text>
               <Text className="text-xl text-gray-500 mt-1 font-colombia-bold">Funciones básicas sin conexión de usuario</Text>
             </View>
          </View>
        </View>

        {/* Sección 'Roles' eliminada conforme a solicitud */}

        {/* --- SECCIÓN 7: FAQ --- */}
        <View onLayout={(event) => handleLayout(7, event)} className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
          <Text className="text-3xl font-colombia-bold text-gray-800 mb-4">
            7. FAQ
          </Text>
          {[
            { q: '¿Necesito internet?', a: 'Sí, para el mapa en vivo y el asistente.' },
            { q: '¿El mapa está blanco?', a: 'Limpia caché o verifica tu conexión.' },
            { q: '¿Funciona fuera de Cenabastos?', a: 'No, está geolocalizada al recinto.' },
          ].map((item, i) => (
            <View key={i} className="mb-4">
              <Text className="text-2xl font-colombia-bold text-gray-800 mb-1">¿{item.q}</Text>
              <Text className="text-xl text-gray-500 font-colombia-bold ml-2 border-l-2 border-blue-200 pl-3">{item.a}</Text>
            </View>
          ))}
        </View>

        {/* --- SECCIÓN 8: Soporte (Solución) --- */}
        <View onLayout={(event) => handleLayout(8, event)} className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
          <Text className="text-3xl font-colombia-bold text-gray-800 mb-4">
            8. Solución de Problemas
          </Text>
           <View className="space-y-3">
             <Text className="text-xl text-gray-600 font-colombia-bold">
               <Text className="text-red-500">● GPS Fallando:</Text> Revisa permisos de ubicación.
             </Text>
              <Text className="text-xl text-gray-600 font-colombia-bold">
               <Text className="text-red-500">● Emergencias sin respuesta:</Text> Problemas o inactividad del organismo encargado.
             </Text>
             <Text className="text-xl text-gray-600 font-colombia-bold">
               <Text className="text-yellow-500">● Asistente lento:</Text> Puede ser mantenimiento del servidor.
             </Text>
             <Text className="text-xl text-gray-600 font-colombia-bold">
               <Text className="text-green-500">● App no abre:</Text> Intenta reinstalar la versión más reciente.
             </Text>
           </View>
        </View>

        {/* --- SECCIÓN 9: Técnico --- */}
        <View onLayout={(event) => handleLayout(9, event)} className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
          <Text className="text-3xl font-colombia-bold text-gray-800 mb-3">
            9. Stack Técnico
          </Text>
          <Text className="text-xl text-gray-500 font-colombia-bold leading-6">
      Construido sobre <Text className="text-gray-800">TypeScript + React Native & Expo</Text>.
      Mapas y geolocalización con <Text className="text-gray-800">Google Maps SDK, Geoapify y React Native Maps</Text>.
      Backend en <Text className="text-gray-800">FastAPI (Python)</Text> expuesto mediante Ngrok y conectado en tiempo real.
      Chatbot e IA potenciados por <Text className="text-[#2196F3]">Google Gemini</Text> y <Text className="text-gray-800">ChromaDB</Text>.
      Autenticación demostrativa con <Text className="text-gray-800">Clerk + GoogleOAuth</Text>.
      Integración de rutas con <Text className="text-gray-800">Google Directions API</Text> y búsqueda con <Text className="text-gray-800">Google Places Autocomplete</Text>.
      UI/UX diseñada con <Text className="text-gray-800">NativeWind</Text>.    
            </Text>
        </View>

        {/* --- SECCIÓN 10: Créditos --- */}
        <View onLayout={(event) => handleLayout(10, event)} className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
          <Text className="text-3xl font-colombia-bold text-gray-800 mb-4">
            10. Créditos
          </Text>
          <Text className="text-2xl text-gray-600 mb-2 font-colombia-bold">
            <Text className="text-gray-900">Equipo:</Text> Camilo Durán, Jesús Perez, Juan Diego Monsalve, Jesús Antonio García.
          </Text>
          <Text className="text-2xl text-gray-600 mb-4 font-colombia-bold">
            <Text className="text-gray-900">Instructor:</Text> Mario Alexander Velasco Vera
          </Text>
          
          <TouchableOpacity 
            onPress={() => scrollViewRef.current?.scrollTo({ y: 0, animated: true })}
            className="bg-green-500 rounded-full py-3 items-center shadow-md active:bg-green-600 mt-2"
          >
            <Text className="text-white font-colombia-bold text-3xl">Volver arriba</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Simple */}
        <View className="items-center pb-6 pt-2">
          <Text className="text-gray-600 text-2xl font-colombia-bold text-center px-10">
            © 2025 CenaTrack. Hecho con ♥ por el equipo SENA.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Manual;
