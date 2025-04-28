import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginSchema } from "@/validators/loginSchema";

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
  checkAuth: () => {};
  logout: () => Promise<{ success: boolean; message?: string }>;
  login: (user: LoginSchema) => Promise<{ success: boolean; message?: string }>;
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
  checkAuth: async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      let userObj;
      if (user) {
        userObj = JSON.parse(user);
      }
      const token = await AsyncStorage.getItem("token");
      set({ user: userObj, token });
    } catch (err) {
      console.log("Auth check failed");
    }
  },
  logout: async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
      set({ user: null, token: null });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrongs " + String(error),
      };
    }
  },
  login: async (users: LoginSchema) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        "http://bookshub-backend.onrender.com/api/auth/login",
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
}));
