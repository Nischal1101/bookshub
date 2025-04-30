import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { formatMemberSince } from "@/lib/utils";
import { Book } from "@/types";
import { Image as ExpoImage } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileHeader() {
  const { user, token } = useAuthStore();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch user's books
  const fetchUserBooks = async () => {
    if (!user || !token) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/books?userId=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setBooks(data.books);
      } else {
        Alert.alert("Error", "Failed to fetch books: " + data.message);
      }
    } catch (err) {
      Alert.alert("Error", "Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBooks();
  }, [user, token]);

  // Delete book handler
  const handleDelete = async (bookId: string) => {
    if (!token) return;
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/books/${bookId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setBooks((prev) => prev.filter((b) => b._id !== bookId));
      } else {
        const data = await response.json();
        Alert.alert("Error", "Failed to delete book: " + data.message);
      }
    } catch (err) {
      Alert.alert("Error", "Failed to delete book.");
    }
  };

  if (!user) return null;

  const renderBook = ({ item }: { item: Book }) => (
    <View className="flex-row items-center bg-white rounded-xl p-3 mb-2 shadow">
      <Image
        source={{ uri: item.image }}
        className="w-16 h-20 rounded-lg mr-3"
        style={{ resizeMode: "cover" }}
      />
      <View className="flex-1">
        <Text className="font-semibold text-lg text-gray-800">
          {item.title}
        </Text>
        <Text className="text-gray-500 text-xs">{item.caption}</Text>
      </View>
      <TouchableOpacity
        className="ml-2 p-2 rounded-full bg-red-100"
        onPress={() =>
          Alert.alert(
            "Delete Book",
            "Are you sure you want to delete this book?",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: () => handleDelete(item._id),
              },
            ]
          )
        }
      >
        <Ionicons name="trash" size={20} color="#e53935" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="p-4 bg-white rounded-2xl shadow mb-4 pt-8 flex-1">
      <View className="items-center mb-4">
        <ExpoImage
          source={{ uri: user?.profileImage }}
          style={{
            width: 44,
            height: 44,
            borderRadius: 32,
          }}
        />
        <Text className="text-xl font-bold text-gray-900">
          {user?.username}
        </Text>
        <Text className="text-gray-500">{user?.email}</Text>
        <Text className="text-xs text-gray-400 mt-1">
          Joined {formatMemberSince(user?.createdAt!)}
        </Text>
      </View>
      <View className="mt-4">
        <Text className="text-lg font-semibold mb-2 text-gray-800">
          Your Books
        </Text>
        <FlatList
          data={books}
          renderItem={renderBook}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={
            <Text className="text-gray-400 text-center mt-4">
              {loading ? (
                <ActivityIndicator size={"small"} />
              ) : (
                <Text> "No books found."</Text>
              )}
            </Text>
          }
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}
