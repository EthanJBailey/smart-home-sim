// OUTER _layout.tsx file
// ----------------------
// This file is the foundation for the entire app. Every element used in the app is wrapped here and 
// the route and each context (used to maintain states between screens) are defined here.

// Import essential libraries, components, and context providers used throughout the app.
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { DeviceProvider } from "@/context/DeviceContext";
import { SliderProvider } from "@/context/SliderContext";

// This function controls which screens are part of the navigation stack and handles navigation based on user login state.
function RootNavigator() {
  // Get the current logged-in user from the authentication context in the @/context folder.
  const { user } = useAuth(); 
  // Access the navigation router to control screen transitions.
  const router = useRouter(); 

  // If the user is not logged in, redirect them to the login screen. This runs any time the 'user' value changes.
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  // Define the different screens in the app and disable the default header for all of them.
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="setup-new-home" />
      <Stack.Screen name="setup-new-room" />
      <Stack.Screen name="setup-new-device" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

// This is the main layout component that wraps the app in various context providers, loads fonts, and handles the splash screen.
export default function RootLayout() {
  // Detect whether the device is in dark mode or light mode.
  const colorScheme = useColorScheme(); 
  // Load a custom font used in the app. 'loaded' becomes true when the font is fully loaded.
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  // Prevent the splash screen from disappearing automatically until the app is ready.
  useEffect(() => {
    SplashScreen.preventAutoHideAsync().catch(() => {});
  }, []);
  // Once the fonts have loaded, hide the splash screen manually.
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded]);
  // While the font is still loading, show a loading screen with an activity spinner.
  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#211D1D",
        }}
      >
        <ActivityIndicator size="large" color="#FFB267" />
      </View>
    );
  }

  // When the app is ready, wrap it in context providers (Auth, Device, Slider) and theme provider. These manage user data, device data, slider states, and visual themes.
  return (
    <AuthProvider>
      <DeviceProvider>
        <SliderProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <RootNavigator />
            <StatusBar style="auto" />
          </ThemeProvider>
        </SliderProvider>
      </DeviceProvider>
    </AuthProvider>
  );
}
