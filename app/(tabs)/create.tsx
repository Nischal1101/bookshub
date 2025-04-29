import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import InputBox from "@/components/input-box";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function Create() {
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");
  const renderRatingPicker = () => {
    const stars = [];
    let i: number;
    for (i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={32}
            color={i <= rating ? "#f4b400" : "#688f68"}
          ></Ionicons>
        </TouchableOpacity>
      );
    }
    return <View className="flex-row justify-between">{stars}</View>;
  };
  const pickImage = async () => {
    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }
    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <KeyboardAvoidingView
      className="flex-1 "
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View className="shadow-lg mx-4 px-4 py-5 rounded-2xl mt-8 bg-white">
          <View>
            <Text className="text-3xl font-bold text-textPrimary">
              Add Book Recommendation
            </Text>
            <Text className="text-textSecondary text-center">
              Share your favourite reads with others
            </Text>
          </View>
          <View className="mt-4">
            <InputBox
              type="text"
              title="Book Title"
              icon="book-outline"
              placeholder="Enter book title"
            />
          </View>
          <View className="mt-4">
            <Text className="mb-2 text-textSecondary">Your Rating</Text>
            <View className="px-8 py-4 border-2 border-gray-200 rounded-2xl">
              {renderRatingPicker()}
            </View>
            <View className="mt-4">
              <Text className="mb-2 text-textSecondary">Book Image</Text>
              <TouchableOpacity
                onPress={pickImage}
                className="bg-white h-[200px] border rounded-2xl border-gray-200 flex justify-center items-center"
              >
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: "100%",
                      height: 200,
                      borderRadius: 16,
                      resizeMode: "cover",
                    }}
                  />
                ) : (
                  <View className="">
                    <Ionicons
                      className="mx-auto"
                      name="image-outline"
                      size={40}
                      color={"#688f68"}
                    />
                    <Text className="text-textSecondary">
                      Tap to select image
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-4">
            <Text className="text-textSecondary mb-2">Caption</Text>
            <TextInput
              multiline
              numberOfLines={4}
              maxLength={40}
              placeholder="Write your review or thoughts about this book..."
              className="py-8 border border-gray-200 rounded-2xl px-5 "
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
