import { axiosInstance } from "@/api/axios/api";
import { UserInfoResponse } from "@/api/services/auth/types";
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
  userInfo: UserInfoResponse;
  setUserInfo: (userInfo: UserInfoResponse) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: "",
  refreshToken: "",
  status: AuthStatus.idle,
  userInfo: {} as UserInfoResponse,
  setUserInfo: (userInfo: UserInfoResponse) => set({ userInfo }),
  signIn: async (accessToken: string, refreshToken: string) => {
    await saveString("accessToken", accessToken);
    await saveString("refreshToken", refreshToken);
    set({ accessToken, refreshToken, status: AuthStatus.signIn });
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
    const { data } = await axiosInstance.get<UserInfoResponse>("customer/user");
    set({ userInfo: data });
  },

  signOut: async () => {
    await clear();
    set({ accessToken: "", refreshToken: "", status: AuthStatus.signOut });
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
      const { data } = await axiosInstance.get<UserInfoResponse>("api/user");
      set({ userInfo: data });
    } else {
      set({ status: AuthStatus.signOut });
    }
  },
}));
