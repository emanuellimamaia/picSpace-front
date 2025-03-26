import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserData {
  username: string
  token: string
  role: string

}

interface UserDataStoreTypes {
  userData: UserData
  setUserData: (data: UserData) => void;
  clearUserData: () => void;
}
export const useUserDataStore = create<UserDataStoreTypes>()(
  persist(
    (set) => ({
      userData: { username: "", token: "", role: "" },

      setUserData: (data) => set({ userData: data }),

      clearUserData: () => set({ userData: { username: "", token: "", role: "" } }),
    }),
    {
      name: "user-data",
    },
  ),
);