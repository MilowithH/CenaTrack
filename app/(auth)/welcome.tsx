import { Image, Text, TouchableOpacity, View } from "react-native";
//import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
//import { Welcome } from "react";
import CustomButton from "@/components/CustomButton";
import { onboardingScreens } from "@/constants/index";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import Swiper from 'react-native-swiper';
//import { CustomButton } from "@/components/CustomButton";  

const Welcome=()=>{
  //Se crea una referencia al componente Swiper para poder controlarlo programáticamente
  const swiperRef = useRef<Swiper>(null);
  //State para rastrear el índice activo del Swiper(presentación de puntos),cada vez que el usuario desliza, se actualiza este estado
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboardingScreens.length - 1;

  return (
    //Vista segura que asegura que el contenido no se superponga con elementos del sistema como la barra de estado
  <SafeAreaView className="flex h-full items-center justify-between bg-white">
            <StatusBar style="dark" backgroundColor="white" />
    
    {/* Hace que todo lo que esté dentro de TouchableOpacity sea presionable */}
    <TouchableOpacity onPress={()=>{router.replace("../(auth)/sign ")}} className="w-full justify-end items-end p-2.5"> 
      <Text className="text-black text-4xl mt-5 font-colombia-bold">
        Saltar
      </Text>
    </TouchableOpacity>
    {/* Componente Swiper para crear una presentación de diapositivas o carrusel,loop false para que no reinicie carrusel al finalizar,

      dot y activeDot son vistas personalizadas para los indicadores de paginación
    */}
      <Swiper ref={swiperRef} loop={false}   paginationStyle={{ bottom: 20 }} // Ajusta este valor según necesites

      dot= {<View className="w-[15%] h-[1vh] mx-1  bg-[#ced3da] rounded-full" />}
      activeDot= {<View className="w-[15%] h-[1vh] mx-1  bg-[#4CAF50] rounded-full" />}
//      onIndexChanged es una función de devolución de llamada que se activa cada vez que el usuario cambia de diapositiva,actualiza el estado activeIndex
        onIndexChanged={(index)=>setActiveIndex(index)}
        >
          {/*Mapea cada pantalla de incorporación y la renderiza dentro del Swiper*/}
        {onboardingScreens.map((item)=>(
          <View key={item.id} className="flex  items-center justify-center p-2.5 ">

            <Image  
            source={item.image}
            className="w-full h-[60%] mt-1 "
            resizeMode="contain"           
            />

              <View className="  mt-9 " >
                  <View className="flex flex-row items-center justify-center w-full " >
                    <Text className="text-black text-5xl   font-colombia-bolditalic  text-center">{item.description}</Text>
                  </View> 
              </View>

            </View>
        ))}
        </Swiper>
        {/*Botón personalizado que cambia su texto y acción según si es la última diapositiva o no*/}
        <CustomButton  title={isLastSlide ? "Empezar" : "Siguiente"}   
        className="w-[70%] h-[5vh] mb-20 text-center justify-center " 
        onPress={()=>isLastSlide ? router.replace("../(auth)/sign") : swiperRef.current?.scrollBy(1)}
          />
    </SafeAreaView>
  );
};

export default Welcome;