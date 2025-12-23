import { icons, images } from "@/constants";
import { useNgrokURL } from "@/lib/useNgrokURL";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const Chat = () => {
  const { url: NGROK_URL, loading: urlLoading, error: urlError } = useNgrokURL();

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! Soy Celeste, El asistente de Cenatrack. ¿En qué puedo ayudarte hoy?. \n Ten en cuenta que al finalizar un recorrido este chat será reiniciado! ",
      sender: "bot",
    },
  ]);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // 🔥 Log cuando cambie la URL
  useEffect(() => {
    console.log('📡 Estado de conexión:');
    console.log('  - Loading:', urlLoading);
    console.log('  - URL:', NGROK_URL);
    console.log('  - Error:', urlError);
  }, [NGROK_URL, urlLoading, urlError]);

  const handleAsk = async () => {
    if (!question.trim()) {
      Alert.alert("Advertencia", "Por favor, escribe una pregunta.");
      return;
    }

    // ✅ VALIDACIÓN TEMPRANA
    if (urlLoading) {
      Alert.alert("Conectando", "Espera un momento, conectando con el servidor...");
      return;
    }

    if (!NGROK_URL) {
      console.error("❌ No hay URL disponible");
      Alert.alert(
        "Error de Conexión", 
        `La app aún no se ha conectado al servidor.\n\nDetalles: ${urlError || 'URL no configurada en Firebase'}`
      );
      return;
    }

    if (loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentQuestion = question;
    setQuestion("");
    setLoading(true);
    Keyboard.dismiss();

    try {
      const requestBody = {
        user: "MobileApp",
        text: currentQuestion,
        use_context: true,
        k_context: 3,
      };

      console.log("🛰️ Enviando a:", NGROK_URL);
      console.log("📦 Payload:", requestBody);

      const res = await fetch(NGROK_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true" // 🔥 Importante para ngrok
        },
        body: JSON.stringify(requestBody),
      });

      console.log("📥 Status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Error del servidor:", errorText);
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      console.log("✅ Respuesta:", data);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || "No se encontró información. Intenta otra pregunta. 😥",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("💥 Error de API/Red:", error);
      const msg = error instanceof Error ? error.message : "Error desconocido";
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "⚠ Error: " + msg,
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      className={`flex-row px-4 my-2 ${
        item.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {item.sender === "bot" && (
        <View className="flex-row space-x-2 max-w-[85%] mt-2 items-start">
          <View className="w-14 h-14 rounded-b-[5500px] rounded-t-full bg-[#4CAF50] justify-center items-center">
            <Image
              source={icons.chatBot}
              resizeMode="contain"
              className="w-12 h-12 mt-3"
            />
          </View>
          <View className="bg-[#4CAF50] justify-center w-80 items-center p-3 mx-1 rounded-2xl">
            <Text className="text-white text-2xl font-colombia-bold">{item.text}</Text>
          </View>
        </View>
      )}

      {item.sender === "user" && (
        <View className="bg-[#2196f3] p-3 rounded-t-2xl rounded-bl-2xl max-w-[85%] shadow">
          <Text className="text-white text-2xl font-colombia-bold">{item.text}</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <StatusBar style="dark" backgroundColor="white" />

      <View className="w-full h-14 justify-center items-center">
        <Image
          className="w-36 h-full"
          source={images.CenaTrackLargeLogo}
          resizeMode="contain"
        />
      </View>

      {/* 🔥 Indicador de conexión */}
      {urlLoading && (
        <View className="flex-row items-center justify-center py-2 bg-yellow-100">
          <ActivityIndicator size="small" color="#f59e0b" />
          <Text className="ml-2 text-yellow-800 font-colombia-bold">
            Conectando con servidor...
          </Text>
        </View>
      )}

      {urlError && !NGROK_URL && (
        <View className="py-2 bg-red-100">
          <Text className="text-red-800 font-colombia-bold text-center">
            ⚠️ Error: {urlError}
          </Text>
        </View>
      )}

      <View className="flex-1">
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          className="flex-1 px-2 pt-2"
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
        >
          <View 
            className="flex-row items-center bg-white px-3 py-6 space-x-2 border-t border-gray-100"
            style={{ paddingBottom: Platform.OS === "android" ? 100 : 40 }}
          >
            <TextInput
              placeholder="Escribe un mensaje..."
              value={question}
              onChangeText={setQuestion}
              className="flex-1 bg-gray-100 rounded-full px-4 py-3 font-colombia-bold text-3xl text-black"
              placeholderTextColor="#64748b"
              editable={!loading && !urlLoading}
              onSubmitEditing={handleAsk}
              returnKeyType="send"
              blurOnSubmit={false}
              multiline
              textAlignVertical="top"
              style={{ maxHeight: 120 }}
            />

            <TouchableOpacity
              onPress={handleAsk}
              className={`w-12 h-12 justify-center items-center rounded-full ${
                loading || urlLoading ? "bg-gray-400" : "bg-[#4CAF50]"
              }`}
              disabled={loading || urlLoading}
            >
              <Ionicons name="send" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Chat;