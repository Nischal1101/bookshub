import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Book } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { formatPublishDate } from "@/lib/utils";

export default function BookCard({ book }: { book: Book }) {
  const renderRatingPicker = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={24}
          color={i <= rating ? "#f4b400" : "#688f68"}
        />
      );
    }
    return <View className="flex-row gap-2">{stars}</View>;
  };
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
      <View>
        <Text className="text-xl font-bold text-gray-900 mb-1">
          {book.title}
        </Text>
        <View className="my-2 border-gray-200 rounded-2xl">
          {renderRatingPicker(book.rating)}
        </View>

        <Text className="text-gray-600 mb-2">{book.caption}</Text>
        <Text className="text-xs text-gray-400 ">
          {formatPublishDate(book.createdAt)}
        </Text>
      </View>
    </View>
  );
}
