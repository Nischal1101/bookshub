import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "@/components/safe-screen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/store/authStore";
import { View } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, user, token } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    const isAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;
    if (isAuthScreen && isSignedIn) router.replace("/(tabs)");
    else if (!isAuthScreen && !isSignedIn) router.replace("/(auth)");
  }, [segments, user, token]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
