import AuthBtn from "@/components/auth-btn";
import InputBox from "@/components/input-box";
import { Link } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema, { RegisterSchema } from "@/validators/registerSchema";

export default function Signup() {
  const { register: registerUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  // Helper to handle custom InputBox
  const handleInputChange = (name: keyof RegisterSchema, value: string) => {
    setValue(name, value, { shouldValidate: true });
  };

  const onSubmit = async (data: RegisterSchema) => {
    console.log(data);
    const result = await registerUser(data);
    if (!result.success) {
      Alert.alert(result.message || "Something went wrong");
    }
    console.log(result);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 px-4 justify-center">
        <View className="bg-white rounded-2xl shadow-lg px-6 py-8 gap-3 border-[2px] border-border">
          <View className="gap-2">
            <View className="flex-row justify-center gap-1">
              <Text className="text-4xl text-primary  ">BooksHub</Text>
              <Ionicons size={34} name="glasses-outline" color="#4CAF50" />
            </View>
            <Text className="text-textSecondary mx-auto text-lg">
              Share your favourite reads
            </Text>
          </View>
          <InputBox
            title="Full Name"
            type="text"
            placeholder="John Doe"
            icon="person-outline"
            onChangeText={(value: string) =>
              handleInputChange("username", value)
            }
            error={errors.username?.message}
          />
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
            title={isSubmitting ? <ActivityIndicator /> : "Register"}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          />
          <View className="mt-3">
            <Text className="text-textSecondary  mx-auto">
              Already have an account?{" "}
              <Link href={"/(auth)"} className="text-primary">
                Login
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
