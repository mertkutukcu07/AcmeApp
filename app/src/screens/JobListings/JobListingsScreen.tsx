import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { JobStackScreenProps } from "@/navigation/stacks/JobStack";
import { RouteNames } from "@/navigation/RouteNames";
import { Body, JobsCard, Loading, Screen, Text } from "@/components";
import { useAuthStore } from "@/store/authStore";
import { height, scale, verticalScale } from "@/utils/WindowSize";
import TextField from "@/components/TextField";
import { useLanguage } from "@/providers/LanguageProvider";
import { useGetJobs } from "@/api/services/jobs";

interface JobListingsScreenProps
  extends JobStackScreenProps<RouteNames.JOBLISTINGS> {}

const JobListingsScreen: React.FC<JobListingsScreenProps> = () => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const appliedJobs = useAuthStore((state) => state.userInfo.appliedJobs);
  const loading = useAuthStore((state) => state.loading);
  const [searchText, setSearchText] = React.useState<string>("");
  const { t } = useLanguage();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetJobs({
    variables: {
      pageParam: 1,
    },
  });

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <Screen preset="scroll" edges={[]}>
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
        <View style={styles.flatList}>
          <FlatList
            scrollEnabled={!isFetchingNextPage}
            showsVerticalScrollIndicator={false}
            data={data?.pages.flatMap((page) => page.data) || []}
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            contentContainerStyle={styles.jobsContainer}
            ListFooterComponent={() => (
              <View style={styles.footer}>
                <ActivityIndicator
                  animating={isFetchingNextPage}
                  size="large"
                  color="#000"
                />
              </View>
            )}
            keyExtractor={(item, index) => `${index}-jobs`}
            renderItem={({ item, index }) => {
              return (
                <JobsCard job={item} index={index} appliedJobs={appliedJobs} />
              );
            }}
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
    marginVertical: verticalScale(10),
  },
  jobsContainer: {
    gap: verticalScale(10),
    marginVertical: verticalScale(10),
  },
  flatList: {
    height: height,
  },
  footer: {
    marginVertical: verticalScale(10),
    marginBottom: verticalScale(20),
  },
});
