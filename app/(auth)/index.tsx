import AuthBtn from "@/components/auth-btn";
import InputBox from "@/components/input-box";
import { useAuthStore } from "@/store/authStore";
import loginSchema, { LoginSchema } from "@/validators/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";

export default function Login() {
  const { login } = useAuthStore();
  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  // Helper to handle custom InputBox
  const handleInputChange = (name: keyof LoginSchema, value: string) => {
    setValue(name, value, { shouldValidate: true });
  };

  const onSubmit = async (data: LoginSchema) => {
    console.log(data);
    const result = await login(data);
    if (!result.success) {
      Alert.alert(result.message || "Something went wrong");
    }
  };
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
            onChangeText={(value: string) => handleInputChange("email", value)}
            error={errors.email?.message}
          />
          <InputBox
            title="Password"
            type="password"
            placeholder="Enter your password"
            icon="lock-closed-outline"
            onChangeText={(value: string) =>
              handleInputChange("password", value)
            }
            error={errors.password?.message}
          />
          <AuthBtn
            title="Login"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
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
