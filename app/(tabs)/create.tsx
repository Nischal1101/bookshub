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
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import InputBox from "@/components/input-box";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AuthBtn from "@/components/auth-btn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createBookSchema,
  CreateBookSchema,
} from "@/validators/createBookSchema";
import { useAuthStore } from "@/store/authStore";

export default function Create() {
  const router = useRouter();
  const { token } = useAuthStore();
  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<CreateBookSchema>({
    resolver: zodResolver(createBookSchema),
    defaultValues: { title: "", caption: "", rating: 0, image: "" },
  });
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  const handleInputChange = (
    name: keyof CreateBookSchema,
    value: string | number
  ) => {
    setValue(name, value as any, { shouldValidate: true });
  };
  const onSubmit = async (data: CreateBookSchema) => {
    try {
      const uriParts = image.split(".");
      const fileExtension = uriParts[uriParts.length - 1];
      const imageType = fileExtension
        ? `image/${fileExtension.toLowerCase()}`
        : "image/jpeg";
      const imageDataUrl = `data:${imageType};base64,${imageBase64}`;
      const response = await fetch(
        "https://bookshub-backend.onrender.com/api/books",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: data.title,
            caption: data.caption,
            rating: data.rating.toString(),
            image: imageDataUrl,
          }),
        }
      );
      const datas = await response.json();
      if (!response.ok) {
        console.log(datas.message);
        Alert.alert("Something went wrong" + datas.message);
        return;
      }
      setImage("");
      setImageBase64("");
      setValue("title", "", { shouldValidate: false });
      setValue("caption", "", { shouldValidate: false });
      Alert.alert("Success", "Book created successfully!");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setValue("rating", rating, { shouldValidate: true });
  }, [rating, setValue]);

  useEffect(() => {
    setValue("image", image, { shouldValidate: true });
  }, [image, setValue]);

  const renderRatingPicker = () => {
    const stars = [];
    const currentRating = watch("rating");
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => {
            setRating(i);
            setValue("rating", i, { shouldValidate: true });
          }}
        >
          <Ionicons
            name={i <= currentRating ? "star" : "star-outline"}
            size={32}
            color={i <= currentRating ? "#f4b400" : "#688f68"}
          />
        </TouchableOpacity>
      );
    }
    return <View className="flex-row justify-between">{stars}</View>;
  };
  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera roll permissions to make this work!"
        );
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
      if (result.assets?.[0]?.base64) {
        setImageBase64(result.assets[0].base64);
      } else {
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while picking the image.");
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
              value={watch("title")}
              error={errors.title?.message}
              onChangeText={(value) => handleInputChange("title", value)}
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
          <View className="mt-4 mb-8">
            <Text className="text-textSecondary mb-2">Caption</Text>
            <TextInput
              multiline
              placeholder="Write your review or thoughts about this book..."
              className="py-8 border border-gray-200 rounded-2xl px-5 "
              value={watch("caption")}
              onChangeText={(value) => handleInputChange("caption", value)}
            />
          </View>
          <AuthBtn
            title="Share"
            onPress={handleSubmit(onSubmit)}
            icon="cloud-upload-outline"
            disabled={isSubmitting}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
