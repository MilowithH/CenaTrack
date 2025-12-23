import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Image, ImageSourcePropType, View } from "react-native";


const TabIcon = ({source, focused}:{
    source: ImageSourcePropType;
    focused: boolean;
}) => {
    const insets = useSafeAreaInsets();
    const translateY = focused ?  -6 : -2;
    return (
    <View 
    
    className={`flex flex-row w-24 h-16   justify-center items-center   rounded-full ${focused ? " bg-general-300 " : "" }`}
    
      >
        <View  
        className={` rounded-full w-24 h-14 items-center justify-center  ${focused ? "bg-[#4CAF50]" : "" }`}
        style={{
            transform: [{ translateY }],
        }}
        >
            <Image  
            source={source}
            tintColor="white"
            resizeMode="contain"
            className="w-7 h-7"
            />
        
        </View>
    </View>
    );
}

const Layout = () => {
    const insets = useSafeAreaInsets();
    return (
    <>
        <StatusBar style="dark" backgroundColor="white" />

    <Tabs 
    initialRouteName="home"
    screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "",
        tabBarShowLabel:false,
        tabBarStyle:{
            backgroundColor: "#2196F3",
            borderRadius: 30,
            overflow: "hidden",
            paddingHorizontal: 10,
            paddingVertical: 7,
            marginHorizontal: 10,
            bottom: 20 ,
            height: 60,
            paddingBottom: 15 ,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            position: "absolute"

        }
    }}
    >
        <Tabs.Screen
            name="home"
            options={{
                title: 'Inicio',
                headerShown: false,
                tabBarIcon:({focused}) => 
                <TabIcon 
                focused={focused}  
                source={icons.home}
                
                />
            }}
            />

                <Tabs.Screen
                name="chat"
                options={{
                title: 'Chat',
                headerShown: false,
                tabBarIcon:({focused}) => 
                <TabIcon 
                focused={focused}  
                source={icons.chatBot}
                />
                }}
                />
             <Tabs.Screen
            name="safety"
            options={{
                title: 'Seguridad',
                headerShown: false,
                tabBarIcon:({focused}) => 
                <TabIcon 
                focused={focused}  
                source={icons.list}
                
                />
            }}
            />


             <Tabs.Screen
            name="profile"
            options={{
                title: 'Perfil',
                headerShown: false,
                tabBarIcon:({focused}) => 
                <TabIcon 
                focused={focused}  
                source={icons.profile}
                
                />
            }}
            />

    </Tabs>
    </>
    );
};

export default Layout;