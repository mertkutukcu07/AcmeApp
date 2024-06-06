if (__DEV__) {
  //@ts-ignore
  import("@/devtools/ReactotronConfig");
}
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { AppNavigator } from "./app/src/navigation/AppNavigator";
import { APIProvider, LanguageProvider } from "@/providers";
import { customFontstoLoad } from "@/theme/typography";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import i18n from "@/locale";
import Toast from "react-native-toast-message";
import { useAuthStore } from "@/store/authStore";

export default function App() {
  const [loaded, error] = useFonts(customFontstoLoad);
  const hydrate = useAuthStore((state) => state.hydrate);

  React.useEffect(() => {
    if (error) throw error;
  }, [error]);

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  React.useEffect(() => {
    hydrate();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <I18nextProvider i18n={i18n}>
        <StatusBar style="auto" />
        <LanguageProvider>
          <APIProvider>
            <AppNavigator />
          </APIProvider>
        </LanguageProvider>
      </I18nextProvider>
      <Toast />
    </SafeAreaProvider>
  );
}
