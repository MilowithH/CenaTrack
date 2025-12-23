import CustomButton from "@/components/CustomButton";
import { icons, images } from "@/constants";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from "expo-status-bar";
import { Alert, Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { signOut } = useAuth();

  // Función para manejar la navegación
  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

   // Función para abrir URL externa
  const handleAboutCenaTrack = async () => {
    const url = "https://milowithh.github.io/LandingPage_CenaTrack/"; // Reemplaza con tu URL
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "No se pudo abrir el enlace");
    }
  };
  // Función para abrir URL externa
  const handleOpenTerms = async () => {
    const url = "https://milowithh.github.io/LandingPage_CenaTrack/"; // Reemplaza con tu URL
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "No se pudo abrir el enlace");
    }
  };

  // Función para cerrar sesión
  const handleSignOut = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar Sesión",
          style: "destructive",
          onPress: () => {

            signOut();
            // Limpiar token o usuario
            SecureStore.deleteItemAsync("token");
            router.replace("/(auth)/sign-in");
          },
        },
      ]
    );
  };

  // Función para salir de la app
  const handleExitApp = () => {
    Alert.alert(
      "Salir de la App",
      "¿Deseas salir de CenaTrack?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Salir",
          style: "destructive",
          onPress: () => {
            // En React Native no hay una forma estándar de cerrar la app
            // Esta funcionalidad debe implementarse nativamente
             signOut();
            // Limpiar token o usuario
            SecureStore.deleteItemAsync("token");
            router.replace("/(auth)/sign-in");
          },
        },
      ]
    );
  };

  // Opciones de configuración
  const settingsOptions = [
    {
      id: 1,
      title: "Mi Perfil",
      icon: icons.person,
      onPress: () => handleNavigation("/(root)/(tabs)/profile"),
    },
    {
      id: 3,
      title: "Emergencias",
      // icon: icons.emergency,
      onPress: () => handleNavigation("/(root)/safety"),
    },
     {
      id: 4,
      title: "Manual de usuario",
      // icon: icons.emergency,
      onPress: () => router.push("/(root)/manual"),
    },
    {
      id: 5,
      title: "Términos y Condiciones",
      // icon: icons.document,
      onPress: handleOpenTerms,
    },
    {
      id: 6,
      title: "Acerca de CenaTrack",
      // icon: icons.info,
      onPress: () => handleAboutCenaTrack,
    },
    {
      id: 7,
      title: "Cerrar Sesión",
     icon: 
                <Ionicons
                  name="log-out-outline"
                  size={24}
                  color="#4CAF50"
                  style={{ marginRight: 8 }}
                />,
              
      onPress: handleSignOut,
      variant: "danger",
    },
    // {
    //   id: 7,
    //   title: "Salir del App",
    //   // icon: icons.exit,
    //   onPress: handleExitApp,
    //   variant: "danger",
    // },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" backgroundColor="white" />

      <ScrollView className="flex-1 bg-white">
        {/* 📸 Encabezado con el logo */}
        <View className="w-full h-14 justify-center items-center">
          <Image
            className="w-full h-full"
            source={images.CenaTrackLargeLogo}
            resizeMode="contain"
          />
        </View>

        {/* 📹 Header con botón de regreso */}
        <View className="flex flex-row items-center justify-start my-5 mx-5">
          <TouchableOpacity
            onPress={() => router.back()}
            className="justify-center items-center bg-white rounded-full w-14 h-14"
          >
            <Image source={icons.backArrow} className="w-6 h-6" />
          </TouchableOpacity>
          <Text className="text-black text-4xl  font-colombia-bold">
            Configuración
          </Text>
        </View>

        {/* 📸 Lista de opciones */}
        <View className="px-2 py-4">
          <View className="bg-gray-50 rounded-3xl my-5 overflow-hidden shadow-sm">
            {settingsOptions.map((option, index) => (
              <View key={option.id}>
                <TouchableOpacity
                  onPress={option.onPress}
                  className="flex-row items-center justify-between px-6 py-5 active:bg-gray-100"
                >
                  <View className="flex-row items-center flex-1">
                    {/* Icono izquierdo (opcional, puedes descomentar si tienes iconos específicos) */}
                    {/* <Image
                      source={option.icon}
                      className="w-6 h-6 mr-4"
                      resizeMode="contain"
                    /> */}
                    <Text
                      className={`text-3xl font-colombia-bold ${
                        option.variant === "danger"
                          ? "text-red-500"
                          : "text-gray-800"
                      }`}
                    >
                      {option.title}
                    </Text>
                  </View>

                  {/* Flecha derecha */}
                  <Image
                    source={icons.rightArrow}
                    className="w-7 h-7"
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                {/* Separador (excepto en el último elemento) */}
                {index < settingsOptions.length - 1 && (
                  <View className="h-px bg-gray-200 mx-6" />
                )}
              </View>
              
            ))}
          </View>

          {/* 📸 Información adicional */}
          <View className="mt-4 items-center">
            <CustomButton
                title="Salir del app"
                // bgVariant="outline"
                // textVariant="outline"
                 IconLeft={() => (
                                <Ionicons
                                  name="log-out-outline"
                                  size={24}
                                  color="white"
                                  style={{ marginRight: 8 }}
                                />
                              )}
                              onPress={handleExitApp}
                className="my-5 text-3xl mt-20 w-full h-14"
                />
            <Text className="text-gray-800 text-base font-colombia-italic ">CenaTrack v1.0.0- Todos los derechos reservados</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;