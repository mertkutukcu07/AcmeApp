import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { RouteNames } from "./RouteNames";
import { AuthStack, TabStack } from "./stacks";
import { navigationRef } from "./navigationUtilities";
import { useAuthStore } from "@/store/authStore";
import { AuthStatus } from "@/constants/authStatus";

export type AppStackParamList = {
  [RouteNames.AUTHSTACK]: undefined;
  [RouteNames.TABSTACK]: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  const status = useAuthStore((state) => state.status);
  console.log(status, "status");
  return (
    <Stack.Navigator>
      {status === AuthStatus.signIn ? (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={RouteNames.TABSTACK}
          component={TabStack}
        />
      ) : (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={RouteNames.AUTHSTACK}
          component={AuthStack}
        />
      )}
    </Stack.Navigator>
  );
};

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

export const AppNavigator = function AppNavigator(props: NavigationProps) {
  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};
