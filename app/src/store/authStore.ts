import { axiosInstance } from "@/api/axios/api";
import { AuthStatus } from "@/constants/authStatus";

import { clear, loadString, saveString } from "@/utils/storage";
import { create } from "zustand";
type AuthStore = {
  accessToken: string;
  refreshToken: string;
  status: AuthStatus;
  signIn: (accessToken: string, refreshToken: string) => void;
  signOut: () => void;
  hydrate: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: "",
  refreshToken: "",
  status: AuthStatus.idle,

  signIn: async (accessToken: string, refreshToken: string) => {
    await saveString("accessToken", accessToken);
    await saveString("refreshToken", refreshToken);
    set({ accessToken, refreshToken, status: AuthStatus.signIn });
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  },
  signOut: async () => {
    await clear();
    axiosInstance.defaults.headers.common["Authorization"] = "";
  },
  hydrate: async () => {
    const [accessToken, refreshToken] = await Promise.all([
      loadString("accessToken"),
      loadString("refreshToken"),
    ]);
    if (accessToken && refreshToken) {
      set({ accessToken, refreshToken, status: AuthStatus.signIn });
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
      const { data } = await axiosInstance.get("customer/user");
    } else {
      set({ status: AuthStatus.signOut });
    }
  },
}));
