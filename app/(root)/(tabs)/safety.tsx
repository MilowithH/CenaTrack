import CustomButton from "@/components/CustomButton";
import RideLayout from "@/components/RideLayout";
import { useUser } from "@clerk/clerk-expo";
import {
  Image,
  ImageBackground,
  Linking,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// Nuevas importaciones para la cabecera
import { icons, images } from "@/constants";
import { router } from "expo-router";

const Safety = () => {
  const { user } = useUser();

  const callNumber = (phone:any) => {
  let phoneNumber = `tel:${phone}`;
  Linking.openURL(phoneNumber);
};

  // const {drivers, selectedDriver} = useDriverStore();

  return (
    // Ya no necesitamos 'bg-white' porque la cabecera tendrá la imagen
    // y el RideLayout tiene su propio fondo.
    <View className="flex-1">
      {/* ESTA ES LA NUEVA CABECERA
        Usamos ImageBackground para poner texto y botones encima.
        Esto reemplaza la cabecera de RideLayout.
      */}
      <ImageBackground
        source={images.safety} // La imagen que pediste
        resizeMode="cover"
        // Le damos una altura fija. Puedes ajustarla.
        className="h-full w-full"
      >
        {/* Este View nos permite posicionar el contenido (botón y texto)
          dentro de la imagen. 'pt-16' (padding-top) baja el contenido
          para evitar la barra de estado. 'justify-between' empuja
          el botón arriba y el texto abajo.
        */}
        <View className="flex-1 mx-1 justify-start p-0 pt-16">
          {/* Botón de retroceso y título alineados */}
          <View className="flex flex-row items-center mx-4 mt-2">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="w-10 h-10 bg-white items-center justify-center rounded-full">
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="w-7 h-7"
                />
              </View>
            </TouchableOpacity>

            {/* Título pegado al Touchable, con margen prudente */}
            <Text className="text-white text-3xl font-colombia-bold ml-3">
              Centro de emergencias
            </Text>
          </View>

          {/* Párrafo informativo bajado y con márgenes */}
          <View className="mx-4 mt-20">
          </View>
      <RideLayout
        title="" // El título ya no es necesario aquí
        snapPoints={["85%"]}
        showStaticHeader={false} // <-- CAMBIO CLAVE
        mapShow={false}
      >
        <>
          <View className="my-2  items-center justify-center">
            
            <Text className="text-black text-4xl  items-center text-center font-colombia-bold leading-10  ">
              Tu seguridad es nuestra prioridad. 
              </Text>
          </View>

          <View className="my-3 flex-col ">
            <CustomButton
              title="Llamar al 123"
               bgVariant="danger"
              textVariant="danger"
              IconLeft={() => (
                          <Image
                          source={icons.emergency}
                          resizeMode="contain"
                          className="w-8 h-8 "
                          />
                          )}
              onPress={() => callNumber("123")}
              className="my-2 text-3xl h-14"
            />
            <CustomButton
              title="CAI-Policía Nacional (156)"
              //  bgVariant="danger"
              // textVariant="danger"
              onPress={() => callNumber("156")}
              className="my-2 text-2xl h-14"
            />
             <CustomButton
              title="Bomberos (119)"
               bgVariant="danger"
              textVariant="danger"
              onPress={() => callNumber("119")}
              className="my-2 text-3xl h-14"
            />
            <CustomButton
              title="Atención de desastres(111)"
               bgVariant="success"
              // textVariant="danger"
              onPress={() => callNumber("111")}
              className="my-2 text-2xl h-14"
            />
            <CustomButton
              title="Antiterrorismo y Antiextorsión (165)"
               bgVariant="secondary"
              // textVariant="danger"
              onPress={() => callNumber("165")}
              className="my-2 text-lg h-16 "
            />
          </View>
        </>
      </RideLayout>
        </View>
      </ImageBackground>

      {/*
        RIDE LAYOUT
        Desactivamos 'showStaticHeader' para que no cree su propia
        cabecera y no entre en conflicto con la nuestra.
        Ahora RideLayout actúa solo como el BottomSheet.
      */}
    </View>
  );
};

export default Safety;