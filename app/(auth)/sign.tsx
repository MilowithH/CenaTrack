
import ChatGreetingSign from "@/components/chatGreetingSign";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import { images } from "@/constants";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Sign=()=>{
return (
    <SafeAreaView className=" flex-1  bg-white  " >
        <StatusBar style="dark" backgroundColor="white" />


        <View className={" flex-1 bg-white justify-center items-center"}>
            {/* <TouchableOpacity
                        onPress={() => router.back()}
                        className="justify-center items-center bg-white rounded-full w-14 h-14"
                        >
                        <Image source={icons.backArrow} className="w-6 h-6" />
                      </TouchableOpacity> */}
                        {/* 
            <View className="  mb-36 w-full h-20  items-center justify-center " >
                <Image
                    className="w-full h-full"
                    source={images.CenaTrackLargeLogo}
                    resizeMode="contain"
                />
            </View> */}
            <View className="w-full h-[40vh] mt-[-12] items-center justify-center" >
                <ChatGreetingSign/>
                <Image
                    source={images.decitionImage} className="w-full h-full bottom-10 "
                    resizeMode="contain"
                />
               {/* <Text className=" text-[#4CAF50] text-4xl font-colombia-bold mt-5 self-center">
                    Crea tu cuenta
                </Text>*/}
            </View>
            <View className="w-full items-center mt-15 space-y-24">
                <CustomButton
                    title="Crear una cuenta"
                    textVariant="outline"
                    bgVariant="outline"
                    onPress={() => router.replace('/sign-up')}
                    className=" text-[#4CAF50] w-[90%] h-[5vh] bg-white focus:border-[#4CAF50] self-center text-center  justify-center mt-5"
                />
                 <CustomButton
                    title="Iniciar sesión"
                    textVariant="outline"
                    bgVariant="outline"
                    onPress={() => router.replace('/sign-in')}
                    className=" text-[#4CAF50] w-[90%] h-[5vh] bg-white focus:border-[#4CAF50] self-center text-center  justify-center mt-5"
                />
                <OAuth />
                <CustomButton
                    title="Ingresar como invitado"
                    textVariant="outline"
                    bgVariant="outline"
                    onPress={() => router.replace('/(root)/(tabs)/home')}
                    className=" text-[#4CAF50]  w-[90%] h-[5vh] bg-white focus:border-[#4CAF50] mt-5 self-center text-center justify-center"
                />
            </View>

        </View>
    </SafeAreaView>
    );}

    export default Sign;