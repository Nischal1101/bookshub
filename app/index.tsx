import { useAuthStore } from "@/store/authStore";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
export default function Index() {
  const { user, token, checkAuth, logout } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);
  console.log("user", user);
  console.log("token", token);
  return (
    <View className="flex-1 justify-center items-center">
      {user && (
        <Text className="text-5xl text-primary">Hola {user.username}!</Text>
      )}
      <TouchableOpacity
        onPress={() => {
          logout();
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
      <Link href="/(auth)">Login</Link>
      <Link href="/(auth)/signup">Signup</Link>
    </View>
  );
}
