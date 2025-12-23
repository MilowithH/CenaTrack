import AsyncStorage from "@react-native-async-storage/async-storage";

const ENV_DEFAULT_URL = process.env.EXPO_PUBLIC_CHATBOT_API_URL;

export async function getBackendURL() {
  try {
    const manualURL = await AsyncStorage.getItem("backend_url");

    if (manualURL && manualURL.length > 0) {
      // Prioriza el URL manual si existe
      return manualURL;
    }

    // Si no existe manual, usa la del .env
    return ENV_DEFAULT_URL;
  } catch (err) {
    console.log("Error leyendo backend_url", err);
    return ENV_DEFAULT_URL;
  }
}

export async function setBackendURL(url: string) {
  await AsyncStorage.setItem("backend_url", url);
}

export async function clearBackendURL() {
  await AsyncStorage.removeItem("backend_url");
}
