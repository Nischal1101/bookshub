import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

export default function AuthBtn({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} className="mt-3">
      <Text className="text-white text-center font-medium py-3 rounded-xl bg-primary">
        {/* <ActivityIndicator color="#ffffff" /> */}
        {title}
      </Text>
    </TouchableOpacity>
  );
}
