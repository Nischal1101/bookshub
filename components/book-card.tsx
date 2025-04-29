import { View, Text, Image } from "react-native";
import React from "react";

export default function BookCard() {
  return (
    <View className="bg-white rounded-2xl shadow-lg  p-4  my-4">
      <View className="flex-row items-center gap-2  mb-4">
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
          style={{
            width: 44,
            height: 44,
            borderRadius: 32,
          }}
        />
        <Text className="mt-2 text-lg font-semibold text-gray-800">
          John Doe
        </Text>
      </View>
      <View className="items-center mb-3">
        <Image
          source={{
            uri: "https://img.freepik.com/free-psd/back-school-composition-with-book-wooden-surface_23-2147679246.jpg?t=st=1745899494~exp=1745903094~hmac=eb1bbdef3a7ff8bd71e2aa366784418b70340aaee732d227a0f57e63d91135a8&w=2000",
          }}
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
          The Hunger Games
        </Text>
        <Text className="text-gray-600 mb-2">
          A dystopian tale of survival, rebellion and sacrifice.
        </Text>
        <Text className="text-xs text-gray-400 ">3/9/2025</Text>
      </View>
    </View>
  );
}
