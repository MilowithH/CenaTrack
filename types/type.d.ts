import React from "react";
import { TextInputProps, TouchableOpacityProps } from "react-native";

// Define la interfaz para un conductor (driver) con sus propiedades
declare interface Usuario {
    usuario_id: number;
    first_name: string;
    last_name: string;
    profile_image_url: string;
    car_image_url: string;
    car_seats: number;
    rating: number;
}
// Define la interfaz para los datos de un marcador (marker) en el mapa
declare interface MarkerData {
    latitude: number;
    longitude: number;
    id?: number;
    usuario_id?: number;
    title: string;
    profile_image_url: string;
    car_image_url: string;
    car_seats: number;
    rating: number;
    first_name: string;
    last_name: string;
    time?: number;
    price?: string;
}

// Define la interfaz para las propiedades del componente del mapa
declare interface MapProps {
    destinationLatitude?: number;
    destinationLongitude?: number;
    onDriverTimesCalculated?: (driversWithTimes: MarkerData[]) => void;
    selectedDriver?: number | null;
    onMapReady?: () => void;
}


// Define la interfaz para un viaje (ride) con sus propiedades
declare interface Ride {
    ride_id: number;
    origin_address: string;
    destination_address: string;
    origin_latitude: number;
    origin_longitude: number;
    destination_latitude: number;
    destination_longitude: number;
    ride_time: number;
    fare_price: number;
    payment_status: string;
    usuario_id: number;
    user_email: string;
    created_at: string;
    usuario: {
        first_name: string;
        last_name: string;
        car_seats: number;
    };
}

declare interface PlacesCenaBastos{
    id: string,
    nombre: string,
    tipo: string,
    categoria: string,
    color: string, 
    coordenadas: [
      { latitude:  number, longitude: number}
    ],
  }



// Define la interfaz para las propiedades del botón personalizado
declare interface ButtonProps extends TouchableOpacityProps {
    title: string;
    bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
    textVariant?: "primary" | "default" | "secondary" | "danger" | "success" | "outline";
    IconLeft?: React.ComponentType<any>;
    IconRight?: React.ComponentType<any>;
    className?: string;
}

// Define la interfaz para las propiedades del componente de entrada de Google
declare interface GoogleInputProps {
    icon?: string;
    initialLocation?: string;
    containerStyle?: string;
    textInputBackgroundColor?: string;
    handlePress: ({
                      latitude,
                      longitude,
                      address,
                  }: {
        latitude: number;
        longitude: number;
        address: string;
    }) => void;
}

// Define la interfaz para las propiedades del componente de entrada personalizada
declare interface InputFieldProps extends TextInputProps {
    label: string;
    icon?: any;
    secureTextEntry?: boolean;
    labelStyle?: string;
    containerStyle?: string;
    inputStyle?: string;
    iconStyle?: string;
    RightIcon?: React.ReactNode;
    className?: string;
}

declare interface PaymentProps {
    fullName: string;
    email: string;
    amount: string;
    driverId: number;
    rideTime: number;
}

declare interface LocationStore {
    userLatitude: number | null;
    userLongitude: number | null;
    userAddress: string | null;
    destinationLatitude: number | null;
    destinationLongitude: number | null;
    destinationAddress: string | null; 
  isUserLocationManual: boolean;
  setUserLocationManual: (value: boolean) => void;
  resetAll: () => void;
   setUserLocation: (
    location: { 
      latitude: number; 
      longitude: number; 
      address: string; 
    },
    manual?: boolean  // ✅ Segundo parámetro opcional
  ) => void;
  

    setDestinationLocation: ({
                                 latitude,
                                 longitude,
                                 address,
                             }: {
        latitude: number;
        longitude: number;
        address: string;
    }) => void;
}

declare interface DriverStore {
    drivers: MarkerData[];
    selectedDriver: number | null;
    setSelectedDriver: (driverId: number) => void;
    setDrivers: (drivers: MarkerData[]) => void;
    clearSelectedDriver: () => void;
}

declare interface DriverCardProps {
    item: MarkerData;
    selected: number;
    setSelected: () => void;
}