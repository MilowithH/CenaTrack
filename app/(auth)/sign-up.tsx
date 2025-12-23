
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link, useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ReactNativeModal } from "react-native-modal";
// Clerk
import { fetchAPI } from "@/lib/fetch";
import { useSignUp } from "@clerk/clerk-expo";
import ChatGreetingModal from "@/components/chatGreetingSign";
import ChatGreetingSign from "@/components/chatGreetingSign";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
   const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  // ✨ 1. Simplificamos el estado del flujo, ya no necesitamos el paso 'success'
  const [signUpStep, setSignUpStep] = useState<"form" | "verifying">("form");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

    const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });


  // (El objeto errorMessages se mantiene igual)
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

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
       setVerification({
        ...verification,
        state: "pending",
      });

    } catch (err: any) {
      const clerkError = err.errors?.[0]?.longMessage || "An unexpected error occurred";
      const translatedError = errorMessages[clerkError] || clerkError;
      Alert.alert("Error", translatedError);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
    

      if (signUpAttempt.status === "complete") {
        
        // Crear un usuario en la base de datos
        await fetchAPI('/(api)/user',
          {
            // Usar el ID del usuario creado por Clerk
            method: 'POST',
            // Asegurarse de enviar los datos en el cuerpo de la solicitud
            body: JSON.stringify({
              name: form.name,
              email: form.email,
              clerkId:  signUpAttempt.createdUserId,
            }),
          }

        )


          await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });

  
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err: any) {
      const clerkError = err.errors?.[0]?.longMessage || "An unexpected error occurred";
      const translatedError: any = errorMessages[clerkError] || clerkError;
      setVerification({
        ...verification,
        error: translatedError,
        code: ""
      });
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={20}
      contentContainerStyle={{ flexGrow: 1 }}
      className={"flex-1 bg-white"}
    >
      <View className="flex-1 bg-white">
        {/* ... (El JSX del header y el formulario se mantiene exactamente igual) ... */}
        <View className="relative w-full h-[25vh] ">
          <Image
            source={images.signUpLandScape}
            className=" z-0 w-full h-[22.5vh] mt-0 rounded-b-3xl"
          />
          <Text className=" text-white font-bold text-5xl font-colombia-bold absolute bottom-14 self-center">
            Crear cuenta
          </Text>
        </View>
        <View className="p-5 bottom-7 ">
          {/* <TouchableOpacity
                      onPress={() => router.back()}
                      className="justify-center items-center bg-white rounded-full w-14 h-14"
                    >
                      <Image source={icons.backArrow} className="w-6 h-6" />
                    </TouchableOpacity> */}
          <InputField
            label={"Nombre"}
            placeholder={"Ingresa tu nombre"}
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm(prev => ({ ...prev, name: value }))}
          />
          <InputField
            label={"Email"}
            placeholder={"Ingresa tu correo "}
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm(prev => ({ ...prev, email: value }))}
          />
          <View className="flex-row items-center">
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
                    <EyeOff size={22} color="#4B5563" className="ml-[-3]"/>
                  ) : (
                    <Eye size={22} color="#4B5563" />
                  )}
                </TouchableOpacity>
              }
            />
          </View>
          <CustomButton
            title={"Crear Cuenta"}
            className="w-[70%] h-[5vh] mt-3 self-center text-center justify-center"
            onPress={onSignUpPress}
          />
          <OAuth />
          <Link href="/(auth)/sign-in" className=" text-3xl mt-3 self-center justify-between ">
            <View className="flex flex-row justify-center items-center ">
              <Text className="text-black text-2xl font-colombia">¿Ya tienes una cuenta?</Text>
              <Text className="text-[#4CAF50] text-2xl font-colombia ml-1 ">Inicia Sesión</Text>
            </View>
          </Link>
        </View>

        {/* Modal de verificación (el único que queda) */}
        <ReactNativeModal
          isVisible={verification.state === 'pending'}
           onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[10vh]">
            <Text className="text-4xl font-colombia-bold mt-1 text-start">Verificación</Text>
            <Text className="text-2xl font-colombia mt-2 text-center">
              Hemos enviado un código de verificación a {form.email}
            </Text>
            <InputField
              label="Código"
              icon={icons.lock}
              placeholder="000000"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-700 text-lg mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verificar correo"
              onPress={ onVerifyPress   }
              className="w-[70%] h-[5vh] mt-5 self-center text-center justify-center bg-[#4CAF50]"
            />
          </View>
        </ReactNativeModal>

        {/* ✨ 3. Hemos eliminado el modal de éxito de aquí. */}
         <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[10vh]">
            <Image
              source={images.check}
              className="w-[20vh] h-[20vh] mx-auto my-5"
            />
            <Text className="text-3xl font-colombia text-center">
              Verificación exitosa!!
            </Text>
            <Text className="text-base text-gray-400 font-colombia text-center mt-2">
              Tu verificación ha sido exitosa.
            </Text>
            <CustomButton
              title="Continuar"
              onPress={() => {
                setShowSuccessModal(false);
               router.replace(`/(root)/(tabs)/home`)
              }}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>

      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;