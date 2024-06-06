import { Header, Icon } from "@/components";
import { RouteNames } from "@/navigation/RouteNames";
import { getFontSize } from "@/hooks/useResponsiveText";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { verticalScale } from "@/utils/WindowSize";
import { isAndroid, isIOS } from "@/utils/platform";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { AppliedJobsScreen, ProfileScreen } from "@/screens";
import { useLanguage } from "@/providers/LanguageProvider";
import JobStack from "./JobStack";

export type TabStackParamList = {
  [RouteNames.JOBSTACK]: undefined;
  [RouteNames.APPLIEDJOBS]: undefined;
  [RouteNames.PROFILE]: undefined;
};

export type TabStackScreenProps<T extends keyof TabStackParamList> =
  NativeStackScreenProps<TabStackParamList, T>;

const Tab = createBottomTabNavigator<TabStackParamList>();

export default function TabStack() {
  const { t } = useLanguage();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.common.white,
        tabBarInactiveTintColor: colors.common.white,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      }}
    >
      <Tab.Screen
        name={RouteNames.JOBSTACK}
        component={JobStack}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon icon="list" color={color} size={20} />
          ),
          tabBarLabel: t("tab.jobList"),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={RouteNames.APPLIEDJOBS}
        component={AppliedJobsScreen}
        options={{
          header: () => <Header title={t("header.appliedJobs")} />,
          tabBarIcon: ({ color, focused }) => (
            <Icon icon="checkList" color={color} size={20} />
          ),
          tabBarLabel: t("tab.appliedJobs"),
        }}
      />
      <Tab.Screen
        name={RouteNames.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon icon="profile" color={color} size={20} />
          ),
          header: () => <Header title={t("header.profile")} />,

          tabBarLabel: t("tab.profile"),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.palette.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: verticalScale(10),
    height: isIOS ? verticalScale(65) : verticalScale(50),
  },
  tabBarLabelStyle: {
    fontSize: getFontSize(10),
    fontFamily: typography.fonts.semiBold,
    color: colors.common.white,
    paddingTop: verticalScale(5),
    bottom: isAndroid ? verticalScale(5) : 0,
  },
});
