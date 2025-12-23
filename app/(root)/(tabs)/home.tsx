import ChatGreetingModal from "@/components/chatGreeting";
import CustomButton from "@/components/CustomButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideLayout from "@/components/RideLayout";
import { icons, images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { useUser } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page (){
    const { userAddress, destinationAddress, setDestinationLocation, setUserLocation, isUserLocationManual } = useLocationStore();
    const { user } = useUser();
    const {data: recentRides, loading }= useFetch(`/(api)/ride/${user?.id}`)
    const [hasPermissions, setHasPermissions] = useState(false);

    const handleSettings = () => {
        router.push("/(root)/settings")
    };
    
   useEffect(() => {
    const requestLocation = async () => {
        // 🔥 FIX: Verificar si la ubicación es manual ANTES de reemplazarla
        if (isUserLocationManual) {
            console.log("DEBUG: No se reemplaza la ubicación porque es manual.");
            return;
        }

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setHasPermissions(false);
            return;
        }

        setHasPermissions(true);

        let location = await Location.getCurrentPositionAsync({});

        const address = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });

        // 🔥 FIX: Pasar false como segundo parámetro (booleano simple)
        setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            address: `${address[0].name}, ${address[0].region}`,
        }, false);
    };

    requestLocation();
}, [isUserLocationManual]); // 🔥 FIX: Agregar isUserLocationManual a las dependencias

    function displayName(user: any) {
        const first = user?.firstName?.trim();
        const last = user?.lastName?.trim();
        const full = user?.fullName?.trim?.();
        const email = user?.emailAddresses?.[0]?.emailAddress;
        if (first || last) return `${first ?? ""} ${last ?? ""}`.trim();
        if (full) return full;
        if (email) return email;
        return "Usuario";
    }

    // 🎯 CORRECCIÓN: handleDestinationPress ahora actualiza el destino sin navegar
    const handleDestinationPress = (location: {
        latitude: number; 
        longitude: number; 
        address: string; 
    }) => {
        setDestinationLocation(location);
        console.log("¡DEBUG! Destino actualizado desde búsqueda principal:", location.address);
    };

    
    return (
        <SafeAreaView className="flex-1 bg-white relative">
            <StatusBar style="dark" backgroundColor="white" />
            
            <View className="flex-1 px-5">
                {/* 📸 Encabezado con el logo */}
                      <View className="w-full h-14 justify-center items-center">
                        <Image
                          className="w-36 h-full"
                          source={images.CenaTrackLargeLogo}
                          resizeMode="contain"
                        />
                      </View>
                
                <View className="flex flex-row items-center justify-between my-5">
                    <Text className="text-black text-2xl font-colombia-bold">
                        Bienvenido {displayName(user).split("@")[0]}
                    </Text>
                    <TouchableOpacity
                        onPress={handleSettings}
                        className="justify-center items-center bg-white rounded-full w-10 h-10 ml-[-20]"
                        >
                        <Image
                            source={icons.settings}
                            className="w-6 h-6"
                            />
                    </TouchableOpacity>
                </View>

                <View className="z-50 my-2 "
                >
                    <GoogleTextInput
                    
                        icon={icons.search}
                        containerStyle="bg-white shadow-md shadow-neutral-300"
                        handlePress={setDestinationLocation}
                        />
                </View>

                <Text className="text-2xl font-colombia-bold my-1">
                    
                </Text>
                
                <View className="h-80 w-full rounded-2xl overflow-hidden mb-20">
                    <Map />
                </View>
            </View>
   <RideLayout title=" " snapPoints={["100%"]} showStaticHeader={false} >
    
    <View className=" my-0 mx-6 " 
    style={{ elevation: 90, zIndex: 9999999 }}
    >
        <Text className="text-3xl font-colombia-bold text-black mb-1">
            Desde:
        </Text>
        <GoogleTextInput
            icon={icons.target}
            initialLocation={userAddress!}
            
            containerStyle="bg-white"
            textInputBackgroundColor="white"
            handlePress={(location) => setUserLocation(location, true)}
            />
    </View>
    
                <View className="relative z-50 w-[90%] rounded-xl mb-5 bg-white flex flex-row items-center justify-start mx-6 py-6"
                    style={{
                        // sombra idéntica al contenedor premium
                        shadowColor: "#0f0",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.04,
                        shadowRadius: 8,
                        elevation: 6,
                    }}
                    
                    >
  <Image source={icons.point} className="w-7 h-7 ml-6" />

  <Text
    className="text-3xl font-colombia-bold ml-2"
    numberOfLines={1}
    >
    {destinationAddress}
  </Text>
</View>

    
        <ChatGreetingModal/>
    <View className="pb-16 items-center">
        <CustomButton  
            title="Ir ahora" 
            className="h-12 w-48" 
            onPress={() => router.push("/(root)/book-ride")}
            />
    </View>
</RideLayout>

        </SafeAreaView>
    );
}