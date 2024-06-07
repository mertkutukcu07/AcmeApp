import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { Body, JobsCard, Loading, Screen, Text } from "@/components";
import { TabStackScreenProps } from "@/navigation/stacks/TabStack";
import { RouteNames } from "@/navigation/RouteNames";
import { useAuthStore } from "@/store/authStore";
import { useAppliedJobs } from "@/api/services/jobs";
import { height, verticalScale } from "@/utils/WindowSize";
import { useLanguage } from "@/providers/LanguageProvider";

interface AppliedJobsScreenProps
  extends TabStackScreenProps<RouteNames.APPLIEDJOBS> {}

const AppliedJobsScreen: React.FC<AppliedJobsScreenProps> = () => {
  const { t } = useLanguage();
  const appliedJobs = useAuthStore((state) => state.userInfo.appliedJobs);
  const { data, isLoading } = useAppliedJobs({
    variables: {
      appliedJobs,
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Screen preset="scroll" edges={[]}>
      <Body>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={(item, index) => `${index}-applied-jobs`}
          ListEmptyComponent={() => (
            <View style={styles.noApplied}>
              <Text
                text={t("appliedJobs.noJobs")}
                fontFamily="regular"
                size="lg"
              />
            </View>
          )}
          renderItem={({ item, index }) => {
            return (
              <JobsCard job={item} index={index} appliedJobs={appliedJobs} />
            );
          }}
        />
      </Body>
    </Screen>
  );
};

export default AppliedJobsScreen;

const styles = StyleSheet.create({
  flatListContainer: {
    gap: verticalScale(20),
    marginTop: verticalScale(20),
  },
  noApplied: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height / 3,
  },
});
