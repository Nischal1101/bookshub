import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
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
      <Text className="text-white text-center font-medium py-3 rounded-xl bg-primary">
        {/* <ActivityIndicator color="#ffffff" /> */}
        {title}
      </Text>
    </TouchableOpacity>
  );
}
