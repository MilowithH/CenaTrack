import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Platform, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import RideLayout from "@/components/RideLayout";
import { icons, images } from "@/constants";
import { useLocationStore } from "@/store";

const BookRide = () => {
    const { user } = useUser();

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showSummary, setShowSummary] = useState(true);

    // nuevo estado: si ya se confirmó el recorrido
    const [rideConfirmed, setRideConfirmed] = useState(false);

    const {
        userAddress,
        destinationAddress,
        resetAll
    } = useLocationStore();

    // Cuando sale el modal, volver al home
    useEffect(() => {
        if (showSuccessModal) {
            const timer = setTimeout(() => {
                setShowSuccessModal(false);
                router.replace("/(root)/(tabs)/home");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showSuccessModal]);

    const handlePress = () => {
        if (!rideConfirmed) {
            // Primera acción → Confirmar viaje
            setRideConfirmed(true);
            setShowSummary(false);
            return;
        }
        
        // Segunda acción → Finalizar viaje y volver al home
        // función para limpiar mapa en home al finalizar recorrido
        resetAll();
        setShowSuccessModal(true);
    };

    if (Platform.OS === "web") {
        return (
            <div style={{ padding: 20, color: "red" }}>
                Mapa no disponible en Web
            </div>
        );
    }

    return (
        <RideLayout 
            title="Recorrido" 
            snapPoints={showSummary ? ["65%"] : ["25%"]}
        >
            <>
                <View className="my-1 items-center justify-center">
                    <Text className="text-4xl font-colombia-bold text-black mb-3">
                        Información del recorrido
                    </Text>
                </View>

                <View className="my-3 ">
                    {showSummary && (
                        <>
                            <View className="flex flex-row bg-white items-center justify-start mt-1 rounded-full w-full h-42 px-6 py-6">
                                <Image source={icons.to} className="w-7 h-7 ml-6" />
                                <Text className="text-3xl font-colombia-bold mx-2" numberOfLines={4}>
                                    {userAddress}
                                </Text>
                            </View>

                            <View className="flex flex-row bg-white items-center justify-start mt-1 rounded-full w-full h-42 px-6 py-6">
                                <Image source={icons.point} className="w-7 h-7 ml-6" />
                                <Text className="text-3xl font-colombia-bold ml-2" numberOfLines={4}>
                                    {destinationAddress}
                                </Text>
                            </View>
                        </>
                    )}

                    <CustomButton
                        title={showSummary ? "Confirmar" : "Finalizar recorrido"}
                        onPress={handlePress}
                        className="my-6  text-3xl h-14"
                    />
                </View>

                <ReactNativeModal isVisible={showSuccessModal}>
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[10vh]">
                        <Image
                            source={images.check}
                            className="w-[20vh] h-[20vh] mx-auto my-5"
                        />
                        <Text className="text-3xl text-black font-colombia text-center">
                            Recorrido finalizado
                        </Text>
                        <Text className="text-xl text-gray-800 font-colombia text-center mt-2">
                            Gracias por usar CenaTrack.
                        </Text>
                    </View>
                </ReactNativeModal>
            </>
        </RideLayout>
    );
};

export default BookRide;