//import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
//import { StatusBar } from 'expo-status-bar';
import { /*use*/ useEffect } from 'react';
import 'react-native-reanimated';
import "../global.css";

import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';




// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;


export default function RootLayout() {
const [loaded] = useFonts({
    "Colombia-Bold": require("../assets/fonts/Colombia-Bold.ttf"),
    "Colombia-Bold-Italic": require("../assets/fonts/Colombia-Bold-Italic.ttf"),
    "Colombia-Regular-Italic": require("../assets/fonts/Colombia-Regular-Italic.ttf"),
    "Colombia-Regular": require("../assets/fonts/Colombia-Regular.ttf"),

    // "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    // "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    // "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    // "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    // "Jakarta-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    // "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
});

useEffect(() => {
  if (loaded) {
    SplashScreen.hideAsync();
  }
}, [loaded]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ClerkProvider  tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        
        <Stack.Screen name="+not-found" />
      </Stack>
      {/*<Slot />*/}
      </ClerkLoaded>
    </ClerkProvider>
  );
};
