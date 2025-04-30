import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Book } from "@/types";

export default function BookCard({ book }: { book: Book }) {
  return (
    <View className="bg-white rounded-2xl shadow-lg  p-4  my-4">
      <View className="flex-row items-center gap-2  mb-4">
        <Image
          source={{ uri: book.user.profileImage }}
          style={{
            width: 44,
            height: 44,
            borderRadius: 32,
          }}
        />
        <Text className="mt-2 text-lg font-semibold text-gray-800">
          {book.user.username}
        </Text>
      </View>
      <View className="items-center mb-3">
        <Image
          source={{ uri: book.image }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 16,
            resizeMode: "cover",
          }}
          alt="Book Cover"
        />
      </View>
      <View className="">
        <Text className="text-xl font-bold text-gray-900 mb-1">
          {book.title}
        </Text>
        <Text className="text-gray-600 mb-2">{book.caption}</Text>
        <Text className="text-xs text-gray-400 ">
          {book.createdAt.toISOString()}
        </Text>
      </View>
    </View>
  );
}
