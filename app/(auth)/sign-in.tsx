import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Componente de registro de usuario
const SignIn=()=>{

 const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
      const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = React.useState('')


// Estado para manejar el formulario
  const [form, setForm] = useState ({
    email: '',
    password: '',
  });
  //El objeto errorMessages se mantiene igual
  const errorMessages: Record<string, string> = {
      "Enter email address.": "El correo es obligatorio",
      "Email address not valid.": "El correo no es válido",
      "Email address must be a valid email address.": "La dirección de correo no es válida",
      "Form identifier not found.": "Correo inválido",
      "Identifier already exists.": "Este correo ya está registrado",
      "Couldn't find your account.": "No encontramos ninguna cuenta con este correo",
      "This email address is not allowed.": "Este correo no está permitido",
      "Enter password.": "La contraseña es obligatoria",
      "Password is too short.": "La contraseña es demasiado corta",
      "Password is too weak.": "La contraseña es muy débil",
      "Passwords must be 8 characters or more.": "La contraseña debería tener al menos 8 caracteres",
      "Password has been found in an online data breach. For account safety, please usea a different password.":
        "La contraseña no es segura (apareció en una filtración)",
      "Incorrect password.": "La contraseña es incorrecta",
      "Enter the verification code.": "Ingresa el código de verificación",
      "Verification code expired.": "El código de verificación ha expirado",
      "Verification code is incorrect": "El código de verificación es incorrecto",
      "Verification failed": "La verificación ha fallado",
      "Session not found": "Sesión no encontrada",
      "Session expired": "Tu sesión ha expirado",
      "Invalid or expired token": "El token no es válido o ha expirado",
      "Something went wrong": "Algo salió mal",
      "An unexpected error occurred": "Ocurrió un error inesperado",
      "Resource not found": "Recurso no encontrado",
      "Access denied": "Acceso denegado",
      "Too many requests": "Demasiados intentos, inténtalo más tarde",
      "Internal server error": "Error interno del servidor",
      "You're already signed in.": "Ya iniciaste sesión!!  Ingresa de nuevo a la app!!",
    };

  

// // Función para manejar el evento de registro
//   const onSignInPress = async () => {};
const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
          const clerkError = err.errors?.[0]?.longMessage || "An unexpected error occurred";
          const translatedError = errorMessages[clerkError] || clerkError;
          Alert.alert("Error", translatedError);
        }
  }

  return (

    
//
    <KeyboardAwareScrollView 
    enableOnAndroid={true} //Para que funcione en Android
    keyboardShouldPersistTaps="handled" //- Para poder tocar fuera y cerrar el teclado
    extraScrollHeight={20} //Espacio extra opcional
    contentContainerStyle={{ flexGrow: 1 }}// Asegura que el contenido ocupe todo el espacio disponible
    className={"flex-1 bg-white"}>  
              <StatusBar style="dark" backgroundColor="white" />

      <View className="flex-1 bg-white  ">
        
        <View className="relative w-full h-[25vh] " >
          <Image
            source={images.signInLandScape} className=" z-0 w-full h-[22.5vh] mt-0 rounded-b-3xl"
            
          />
          <Text className=" text-white font-bold text-6xl   font-colombia-bold absolute bottom-16  self-center">
 
            Bienvenido 
          </Text>
        </View>

        <View className="p-5 bottom-7 " >
          {/* <TouchableOpacity
                      onPress={() => router.back()}
                      className="justify-center items-center bg-white rounded-full w-10 h-10"
                    >
                      <Image source={icons.backArrow} className="w-6 h-6" />
                    </TouchableOpacity> */}
               
                <InputField 
                  label={"Email"} 
                  placeholder={"Ingresa tu correo "}
                  icon={icons.email}
                  value={form.email}
                  onChangeText={(value)=>setForm({...form, email: value})}
                />
                <InputField 
                  label={"Contraseña"} 
                  placeholder={"Ingresa tu contraseña"}
                  icon={icons.lock}
                  secureTextEntry={!showPassword}
                  value={form.password}
                  onChangeText={(value) => setForm(prev => ({ ...prev, password: value }))}
                  RightIcon={
                                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                      <EyeOff size={22} color="#4B5563" />
                                    ) : (
                                      <Eye size={22} color="#4B5563" />
                                    )}
                                  </TouchableOpacity>
                                }
                />
                <CustomButton  title={"Iniciar Sesión"}   
                className="w-[70%] h-[5vh] mt-10  self-center text-center justify-center " 
                onPress={onSignInPress}
              />

              {/* OAuth */}

              <OAuth />

              <Link 
              href="/(auth)/sign-up" 
              className=" text-3xl mt-3 self-center justify-between " >
                  <View className="flex flex-row justify-center items-center " >
                      <Text className="text-black text-2xl font-colombia">
                        ¿Aún no tienes una cuenta?  
                      </Text>
                      <Text className="text-[#4CAF50] text-2xl font-colombia ml-1 ">
                        Registrate
                      </Text>
                  </View>
              </Link>
        </View>
    {/*  Modal de verificación*/}

      </View>
    </KeyboardAwareScrollView>
    
    
  );
};

export default SignIn;