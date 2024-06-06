import { useState, useEffect, useRef } from "react";
import { BackHandler, Platform } from "react-native";
import {
  NavigationState,
  PartialState,
  createNavigationContainerRef,
} from "@react-navigation/native";

import * as storage from "../utils/storage";
import { AppStackParamList } from "./AppNavigator";

type Storage = typeof storage;

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>
): string {
  const route = state.routes[state.index ?? 0];

  if (!route.state) return route.name as keyof AppStackParamList;

  return getActiveRouteName(route.state as NavigationState<AppStackParamList>);
}

export function useBackButtonHandler(canExit: (routeName: string) => boolean) {
  if (Platform.OS === "ios") return;

  const canExitRef = useRef(canExit);

  useEffect(() => {
    canExitRef.current = canExit;
  }, [canExit]);

  useEffect(() => {
    const onBackPress = () => {
      if (!navigationRef.isReady()) {
        return false;
      }

      const routeName = getActiveRouteName(navigationRef.getRootState());

      if (canExitRef.current(routeName)) {
        BackHandler.exitApp();
        return true;
      }

      if (navigationRef.canGoBack()) {
        navigationRef.goBack();
        return true;
      }

      return false;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, []);
}

export function navigate(name: unknown, params?: unknown) {
  if (navigationRef.isReady()) {
    // @ts-expect-error
    navigationRef.navigate(name as never, params as never);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetRoot(
  state: Parameters<typeof navigationRef.resetRoot>[0] = {
    index: 0,
    routes: [],
  }
) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(state);
  }
}
