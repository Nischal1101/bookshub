import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import BookCard from "@/components/book-card";

export default function Home() {
  return (
    <View className="gap-2 mt-8 ">
      <View className="flex-row justify-center gap-1">
        <Text className="text-4xl text-primary ">BooksHub</Text>
        <Ionicons size={34} name="glasses-outline" color="#4CAF50" />
      </View>
      <Text className="text-textSecondary mx-auto text-lg ">
        Discover great reads from the community.{" "}
      </Text>
      <BookCard />
    </View>
  );
}
