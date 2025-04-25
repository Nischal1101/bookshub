import { create } from "zustand";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  // logout: () => void;
}

export const useAuthStore = create<UserState>()((set) => ({
  user: null,
  token:null,
  setUser: (user: User) => set({ user }),
}));
