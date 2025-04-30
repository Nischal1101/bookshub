import { View, Text, Alert, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { Book } from "@/types";
import { useAuthStore } from "@/store/authStore";
import ProfileHeader from "@/components/profile-header";
import AuthBtn from "@/components/auth-btn";

export default function Profile() {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const { token, logout } = useAuthStore();
  const fetchBooks = async () => {
    setIsLoading(false);
    setRefreshing(false);
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/books`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return Alert.alert(
          "Error",
          "An error occurred while fetching books." + data.message
        );
      }

      setBooks(data.books);
    } catch (error) {
      return Alert.alert("Error", "An error occurred while fetching books.");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    <ActivityIndicator size="large" color="#4CAF50" />;
  }
  useEffect(() => {
    fetchBooks();
  }, []);
  function confirmLogout() {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => logout(), style: "destructive" },
    ]);
  }
  return (
    <View className="px-4 ">
      <ProfileHeader />
      <AuthBtn title="Logout" icon="log-out-outline" onPress={confirmLogout} />
    </View>
  );
}
