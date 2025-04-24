import AuthBtn from "@/components/auth-btn";
import InputBox from "@/components/input-box";
import { Link } from "expo-router";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";

export default function Login() {
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 px-4">
        <Image
          source={require("@/assets/images/flying-book.png")}
          className="mt-[100px] w-[400px] h-[300px] mx-auto"
          resizeMode="contain"
        />
        <View className="bg-white rounded-2xl shadow-lg px-6 py-8 gap-3 border-[2px] border-border">
          <InputBox
            title="Email"
            type="email"
            placeholder="Enter your email"
            icon="mail-outline"
          />
          <InputBox
            title="Password"
            type="password"
            placeholder="Enter your password"
            icon="lock-closed-outline"
          />
          <AuthBtn
            title="Login"
            onPress={() => {
              console.log("Pressed");
            }}
          />
          <View className="mt-3">
            <Text className="text-textSecondary  mx-auto">
              Don't have an account?{" "}
              <Link href={"/(auth)/signup"} className="text-primary">
                Signup
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
