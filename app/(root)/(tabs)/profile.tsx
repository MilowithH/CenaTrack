
import CustomButton from "@/components/CustomButton";
import { icons, images } from "@/constants";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  // 📌 Funciones para manejar acciones
  const handleGoToHome = () => {
    // Aquí irá la navegación al inicio
    router.push("/(root)/(tabs)/home")
  };

  // Obtener datos del usuario con Clerk
      const {user}= useUser();
      const { signOut } = useAuth();
 

   // Función para mostrar el nombre del usuario
    function displayName(user: any) {
  // Clerk puede exponer firstName, lastName, fullName o emailAddresses
  const first = user?.firstName?.trim();
  const last = user?.lastName?.trim();
  const full = user?.fullName?.trim?.();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  if (first || last) return `${first ?? ""} ${last ?? ""}`.trim();
  if (full) return full;
  if (email) return email;
  return "Usuario";
}
function displayEmail(user: any) {
 const email = user?.emailAddresses?.[0]?.emailAddress;
 if (email) return email;

}
 
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
             router.replace("/(auth)/sign-in");
           },
         },
       ]
     );
   };

  

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" backgroundColor="white" />

      <ScrollView className="flex-1 bg-white">
        {/* 🔸 Encabezado con el logo */}
        <View className="w-full h-14 justify-center items-center">
          <Image
            className="w-full h-full"
            source={images.CenaTrackLargeLogo}
            resizeMode="contain"
          />
        </View>

        {/* 🔹 Contenedor principal del perfil */}
        <View className="flex-1  px-6 py-8">
          {/* 🔸 Foto de perfil */}
          <View className=" flex-row items-center mb-8">
            <TouchableOpacity onPress={() => router.back()}>
                          <View className="w-10 h-10 bg-white items-center justify-center rounded-full">
                            <Image
                              source={icons.backArrow}
                              resizeMode="contain"
                              className="w-7 h-7"
                            />
                          </View>
                        </TouchableOpacity>
            <View className="w-40 h-40 rounded-b-[5500px] mx-20 rounded-t-full bg-[#4CAF50] justify-center items-center border-4 border-green-400 shadow-lg">
              {/* Placeholder para la foto de perfil - puedes agregar tu icono aquí */}
              <Image
              source={icons.chatBot}
              resizeMode="contain"
              className="w-full h-full mt-8 "
              />
            </View>
          </View>

          {/* 🔸 Información del usuario */}
          <View className="bg-gray-50 rounded-3xl p-6 mb-6 shadow-sm">
            {/* Nombre */}
            <View className="mb-4">
              <Text className="text-black text-2xl font-colombia-bold mb-1">
                NOMBRE
              </Text>
              <Text className="text-gray-800 text-2xl font-colombia-bold">
                {/* TODO:Hacer que dinamicamente se muestre nombre de cada usuario. */}
                {displayName(user)}
              </Text>
            </View>

            {/* Separador */}
            <View className="h-px bg-gray-200 my-2" />

            {/* Correo */}
            <View className="mt-4">
              <Text className="text-black text-2xl font-colombia-bold mb-1">
                CORREO ELECTRÓNICO
              </Text>
              <Text className="text-gray-800 text-2xl  font-colombia-bold">
                {displayEmail(user)}
              </Text>
            </View>
          </View>

          {/* 🔸 Botones de acción */}
          <View className="space-y-4">
            {/* Botón Ir a Inicio */}
            <CustomButton
              title="Ir a Inicio"
              onPress={handleGoToHome}
              bgVariant="primary"
              textVariant="default"
              className="w-full py-4 mb-4"
              IconLeft={() => (
                <Ionicons
                  name="home"
                  size={24}
                  color="white"
                  style={{ marginRight: 8 }}
                />
              )}
            />

            {/* Botón Cerrar Sesión */}
            <CustomButton
              title="Cerrar Sesión"
              onPress={handleSignOut}
              bgVariant="outline"
              textVariant="outline"
              className="w-full py-4"
              IconLeft={() => (
                <Ionicons
                  name="log-out-outline"
                  size={24}
                  color="#4CAF50"
                  style={{ marginRight: 8 }}
                />
              )}
            />
          </View>

          {/* 🔸 Información adicional (opcional) */}
          <View className="mt-8 items-center">
            <Text className="text-gray-400 text-xs">
              CenaTrack v1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;