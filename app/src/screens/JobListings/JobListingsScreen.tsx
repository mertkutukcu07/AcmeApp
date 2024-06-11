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
import _ from "lodash";
interface JobListingsScreenProps
  extends JobStackScreenProps<RouteNames.JOBLISTINGS> {}
const JobListingsScreen: React.FC<JobListingsScreenProps> = () => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const loading = useAuthStore((state) => state.loading);
  const [searchText, setSearchText] = React.useState<string>("");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const debouncedSearchTerm = React.useCallback(
    _.debounce((searchText: string) => {
      setSearchQuery(searchText.toLocaleLowerCase());
    }, 750),
    []
  );
  const { t } = useLanguage();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetJobs({
      variables: {
        pageParam: 1,
        search: {
          field: "companyName",
          query: searchQuery,
        },
      },
      enabled: !loading,
    });

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const changeText = (text: string) => {
    setSearchText(text);
    debouncedSearchTerm(text);
  };

  if (loading || isLoading) {
    return <Loading />;
  }
  return (
    <Screen preset="scroll" edges={[]}>
      <Body>
        <View style={styles.userInfo}>
          <Text text={t("jobList.welcome")} fontFamily="regular" size="lg" />
          {userInfo?.name !== undefined && userInfo.surname !== undefined && (
            <Text
              text={`${userInfo.name} ${userInfo.surname}!`}
              fontFamily="medium"
              size="lg"
            />
          )}
        </View>
        <View style={styles.input}>
          <TextField
            value={searchText}
            onChangeText={(text) => changeText(text)}
            placeholder={t("jobList.search")}
            leftIcon="search"
          />
        </View>
        <View style={styles.listContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={!isFetchingNextPage && !isLoading}
            nestedScrollEnabled
            data={data?.pages.flatMap((page) => page.data) || []}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            contentContainerStyle={styles.jobsContainer}
            ListEmptyComponent={() => (
              <Text
                text={t("jobList.noJobs")}
                fontFamily="regular"
                size="lg"
                style={styles.notFound}
              />
            )}
            ListFooterComponent={() =>
              isFetchingNextPage ? (
                <View style={styles.footer}>
                  <ActivityIndicator size="large" color="#000" />
                </View>
              ) : null
            }
            keyExtractor={(item, index) => `${index}-jobs`}
            renderItem={({ item, index }) => {
              return <JobsCard job={item} index={index} />;
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
  listContainer: {
    height: height,
  },
  footer: {
    marginVertical: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  notFound: {
    textAlign: "center",
    marginTop: height / 5,
  },
});
