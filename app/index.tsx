import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

import "../global.css";


const  Home = () => {
  const { isSignedIn, isLoaded } = useAuth();
  
  //  if (!isLoaded) {
  // return null ;
  // }
   if (isSignedIn) return <Redirect href="/(root)/(tabs)/home" />;

  //redirigar a pantallas de bienvenido si no está ingresado
   return <Redirect href="/(auth)/welcome" />;
};

export default  Home;