import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  username: string;
  email: string;
  password: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  register: (user: User) => Promise<{ success: boolean; message?: string }>;
  getUser: () => {};
}

export const useAuthStore = create<UserState>()((set) => ({
  user: null,
  token: null,
  isLoading: false,
  register: async (users: User) => {
    set({ isLoading: true });
    try {
      console.log("Users is", users);
      const response = await fetch(
        "http://bookshub-backend.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(users),
        }
      );
      const data: any = await response.json();
      if (!response.ok) {
        throw new Error("Something went wrong" + data.message);
      }
      const { user, token } = data;
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("token", token);
      set({ user, token, isLoading: false });
      return { success: true };
    } catch (err) {
      set({ isLoading: false });
      console.log(err);
      return {
        success: false,
        message: "Something went wrongs " + String(err),
      };
    }
  },

  getUser: async () => {
    const user = await AsyncStorage.getItem("user");
    let userObj;
    if (user) {
      userObj = JSON.parse(user);
    }
    const token = await AsyncStorage.getItem("token");
    set({ user: userObj, token });
  },
}));
