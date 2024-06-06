import { Header } from "@/components";
import { RouteNames } from "@/navigation/RouteNames";
import { useLanguage } from "@/providers/LanguageProvider";
import {
  JobDetailScreen,
  JobListingsScreen,
  LoginScreen,
  RegisterScreen,
} from "@/screens";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { goBack } from "../navigationUtilities";
import { useAuthStore } from "@/store/authStore";

export type JobStackParamList = {
  [RouteNames.JOBLISTINGS]: undefined;
  [RouteNames.JOBDETAIL]: {
    jobId: string;
  };
};

const Stack = createNativeStackNavigator<JobStackParamList>();

const JobStack = () => {
  const { t } = useLanguage();
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <Stack.Navigator initialRouteName={RouteNames.JOBLISTINGS}>
      <Stack.Screen
        options={{
          header: () => (
            <Header
              title={t("header.jobList")}
              leftIcon="logout"
              onLeftPress={signOut}
            />
          ),
        }}
        name={RouteNames.JOBLISTINGS}
        component={JobListingsScreen}
      />
      <Stack.Screen
        options={{
          header: () => (
            <Header
              title={t("header.jobDetail")}
              leftIcon="arrowLeft"
              onLeftPress={goBack}
            />
          ),
        }}
        name={RouteNames.JOBDETAIL}
        component={JobDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default JobStack;

export type JobStackScreenProps<T extends keyof JobStackParamList> =
  NativeStackScreenProps<JobStackParamList, T>;
