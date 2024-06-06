import { StyleSheet, View } from "react-native";
import React from "react";
import { JobStackScreenProps } from "@/navigation/stacks/JobStack";
import { RouteNames } from "@/navigation/RouteNames";
import { Body, Screen, Text } from "@/components";
import { useAuthStore } from "@/store/authStore";
import { scale, verticalScale } from "@/utils/WindowSize";
import TextField from "@/components/TextField";
import { useLanguage } from "@/providers/LanguageProvider";

interface JobListingsScreenProps
  extends JobStackScreenProps<RouteNames.JOBLISTINGS> {}

const JobListingsScreen: React.FC<JobListingsScreenProps> = () => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const [searchText, setSearchText] = React.useState<string>("");
  const { t } = useLanguage();
  return (
    <Screen preset="scroll" edges={["bottom"]}>
      <Body>
        <View style={styles.userInfo}>
          <Text text={t("jobList.welcome")} fontFamily="regular" size="lg" />
          <Text
            text={`${userInfo.name} ${userInfo.surname}!`}
            fontFamily="medium"
            size="lg"
          />
        </View>
        <View style={styles.input}>
          <TextField
            value={searchText}
            onChangeText={setSearchText}
            placeholder={t("jobList.search")}
            leftIcon="search"
          />
        </View>
      </Body>
    </Screen>
  );
};

export default JobListingsScreen;

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
    marginTop: verticalScale(20),
  },
  input: {
    marginTop: verticalScale(10),
  },
});
