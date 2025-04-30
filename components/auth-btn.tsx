import { Text, TouchableOpacity, ActivityIndicator, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function AuthBtn({
  title,
  onPress,
  disabled,
  icon,
}: {
  title: string | React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  icon?: "cloud-upload-outline" | "log-out-outline";
}) {
  return (
    <TouchableOpacity onPress={onPress} className="mt-3" disabled={disabled}>
      <View className="w-full bg-primary rounded-xl py-3 flex-row items-center justify-center">
        {icon && !disabled && (
          <Ionicons name={icon} size={24} className="mr-2" color="#fff" />
        )}
        {disabled ? (
          <View className="flex-row items-center">
            <ActivityIndicator color="#ffffff" />
            <Text className="text-white ml-2">{title}</Text>
          </View>
        ) : (
          <Text className="text-white text-center font-medium text-base">
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
