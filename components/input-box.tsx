import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function InputBox({
  title,
  type,
  placeholder,
  icon,
  value,
  onChangeText,
  error,
}: {
  title: string;
  type: string;
  placeholder: string;
  icon: any;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
}) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <View className="relative py-2">
      <Text className="text-gray-600 font-medium mb-2">{title}</Text>
      <Ionicons
        name={icon}
        size={20}
        color="#4CAF50"
        className="absolute mt-[52px] left-3"
      />
      {type === "password" && (
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          className="absolute mt-[52px] right-3 z-10"
        >
          <Ionicons
            name={!passwordVisible ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#4CAF50"
          />
        </TouchableOpacity>
      )}

      <TextInput
        secureTextEntry={type === "password" && !passwordVisible}
        autoCapitalize="none"
        keyboardType={type === "email" ? "email-address" : "default"}
        placeholder={placeholder}
        className="py-3 pl-10  pr-4 rounded-xl  border border-gray-200 text-placeholderText h-[48px]"
        value={value}
        onChangeText={onChangeText}
      />
      {error && (
        <Text className="text-red-500 text-xs mt-1 ml-2">{error}</Text>
      )}
    </View>
  );
}
