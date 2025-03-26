import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserData {
  username: string
  token: string
}

interface UserDataStoreTypes {
  userData: UserData
  setUserData: (data: UserData) => void;
  clearUserData: () => void;
}
export const useUserDataStore = create<UserDataStoreTypes>()(
  persist(
    (set) => ({
      userData: { username: "", token: "" },

      setUserData: (data) => set({ userData: data }),

      clearUserData: () => set({ userData: { username: "", token: "" } }),
    }),
    {
      name: "user-data",
    },
  ),
);