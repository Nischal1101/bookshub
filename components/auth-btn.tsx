import { Text, TouchableOpacity, ActivityIndicator, View } from "react-native";
import React from "react";

export default function AuthBtn({
  title,
  onPress,
  disabled,
}: {
  title: string | React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity onPress={onPress} className="mt-3" disabled={disabled}>
      <View className=" justify-center items-center">
        <Text className=" w-full text-white text-center font-medium py-3 rounded-xl bg-primary flex items-center justify-center">
          {disabled ? <ActivityIndicator color="#ffffff" /> : title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
