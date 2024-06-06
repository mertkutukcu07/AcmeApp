import { Header } from "@/components";
import { RouteNames } from "@/navigation/RouteNames";
import { useLanguage } from "@/providers/LanguageProvider";
import { LoginScreen, RegisterScreen } from "@/screens";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { goBack } from "../navigationUtilities";

export type AuthStackParamList = {
  [RouteNames.LOGIN]: undefined;
  [RouteNames.REGISTER]: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  const { t } = useLanguage();

  return (
    <Stack.Navigator initialRouteName={RouteNames.LOGIN}>
      <Stack.Screen
        options={{
          header: () => <Header title={t("header.login")} />,
        }}
        name={RouteNames.LOGIN}
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          header: () => (
            <Header
              title={t("header.register")}
              leftIcon="arrowLeft"
              onLeftPress={goBack}
            />
          ),
        }}
        name={RouteNames.REGISTER}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;
