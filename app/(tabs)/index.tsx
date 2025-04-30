import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import BookCard from "@/components/book-card";
import { useAuthStore } from "@/store/authStore";
import { Book } from "@/types";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const { token, logout } = useAuthStore();

  const fetchBooks = async (pageNum = 1, refresh = false) => {
    setLoading(false);
    setRefreshing(false);
    try {
      if (refresh) {
        setRefreshing(true);
      } else if (pageNum === 1) {
        setLoading(true);
      }
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/books?page=${pageNum}&limit=2`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return Alert.alert(
          "Error",
          "An error occurred while fetching books." + data.message
        );
      }
      const uniqueBooks =
        refresh || pageNum === 1
          ? data.books
          : Array.from(
              new Set([...books, ...data.books].map((book) => book._id))
            ).map((id) =>
              [...books, ...data.books].find((book) => book._id === id)
            );
      setBooks(uniqueBooks);
      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
    } catch (error) {
      return Alert.alert("Error", "An error occurred while fetching books.");
    } finally {
      if (refresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchBooks();
    }
  }, [token]);

  const renderItem = ({ item }: { item: Book }) => <BookCard book={item} />;

  const handleLoadMore = async () => {
    if (hasMore && !loading && !refreshing) {
      fetchBooks(page + 1);
    }
  };
  return (
    <View className="px-4 gap-2 mt-8 flex-1">
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        className="gap-2"
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={handleLoadMore}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchBooks(1, true)}
            className="text-primary"
            tintColor={"#4CAF50"}
          />
        }
        ListHeaderComponent={
          <View>
            <View className="flex-row justify-center gap-1">
              <Text className="text-4xl text-primary ">BooksHub</Text>
              <Ionicons size={34} name="glasses-outline" color="#4CAF50" />
            </View>
            <Text className="text-textSecondary mx-auto text-lg ">
              Discover great reads from the community.{" "}
            </Text>
            <TouchableOpacity onPress={logout}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center">
            <Text className="text-lg text-gray-500">No books found.</Text>
          </View>
        }
        ListFooterComponent={
          hasMore && books.length > 0 ? (
            <ActivityIndicator size="small" className="text-primary" />
          ) : null
        }
      />
    </View>
  );
}
