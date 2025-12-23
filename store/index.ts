import { LocationStore } from "@/types/type";
import { create } from "zustand";

export const useLocationStore = create<LocationStore>((set) => ({
  userAddress: null,
  userLatitude: null,
  userLongitude: null,

  destinationLongitude: null,
  destinationLatitude: null,
  destinationAddress: null,
  isUserLocationManual: false,
  setUserLocationManual: (value) => set({ isUserLocationManual: value }),

  // 🔥 FIX: El segundo parámetro ahora es un booleano simple, no un objeto
  setUserLocation: (
    { latitude, longitude, address }:
    { latitude: number; longitude: number; address: string; },
    manual: boolean = false  // ✅ Booleano directo con valor por defecto
  ) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
      isUserLocationManual: manual
    }));
  },

  setDestinationLocation: (
    { latitude, longitude, address }:
    { latitude: number; longitude: number; address: string; }
) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));
  },
  //función para limpiar store de ubicación
resetAll: () => set({
        userAddress: "",
        destinationAddress: "",
        userLatitude: null,
        userLongitude: null,
        destinationLatitude: null,
        destinationLongitude: null,
    }),
}));