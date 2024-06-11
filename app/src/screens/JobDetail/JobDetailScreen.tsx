import { FlatList, Image, StyleSheet, View } from "react-native";
import React from "react";
import { JobStackScreenProps } from "@/navigation/stacks/JobStack";
import { RouteNames } from "@/navigation/RouteNames";
import {
  useApplyJob,
  useGetJobDetails,
  useWithdrawJob,
} from "@/api/services/jobs";
import { Body, Button, Loading, Message, Screen, Text } from "@/components";
import { Images } from "@/constants/Images";
import { moderateScale, scale, verticalScale } from "@/utils/WindowSize";
import { colors } from "@/theme";
import { useAuthStore } from "@/store/authStore";
import { queryKeys } from "@/api/keys";
import { useQueryClient } from "@tanstack/react-query";
import { goBack } from "@/navigation/navigationUtilities";
import { useUserInfo } from "@/api/services/auth";

interface JobDetailScreenProps
  extends JobStackScreenProps<RouteNames.JOBDETAIL> {}

const JobDetailScreen: React.FC<JobDetailScreenProps> = ({ route }) => {
  const appliedJobs = useAuthStore((state) => state.userInfo.appliedJobs);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const queryClient = useQueryClient();
  const { mutateAsync: userInfo, isPending: userInfoPending } = useUserInfo({
    onSuccess: (data) => {
      setUserInfo(data);
    },
  });
  const { mutateAsync: applyJob, isPending } = useApplyJob({
    onSuccess: async (data) => {
      Message({
        type: "success",
        message: data.message,
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.JOBS],
      });
      await userInfo();
      goBack();
    },
  });
  const { mutateAsync: withdrawJob, isPending: isWithdrawPending } =
    useWithdrawJob({
      onSuccess: async (data) => {
        Message({
          type: "success",
          message: data.message,
        });
        queryClient.invalidateQueries({
          queryKey: [queryKeys.JOBS],
        });
        await userInfo();
        goBack();
      },
    });
  const { jobId } = route.params || {};
  const { data, isLoading } = useGetJobDetails({
    variables: {
      id: jobId,
    },
  });

  const disabled = isPending || isWithdrawPending || userInfoPending;

  const handleApply = async (type: "apply" | "withdraw") => {
    if (type === "apply") {
      applyJob({ id: jobId });
    } else {
      withdrawJob({ id: jobId });
    }
  };

  const isApplied = React.useMemo(() => {
    if (appliedJobs) {
      return appliedJobs.includes(jobId);
    }
    return false;
  }, [appliedJobs, jobId]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Screen edges={["bottom"]} preset="scroll">
      <Body>
        <View style={styles.detail}>
          <View style={styles.textAndImg}>
            <Image source={Images.jobsCard} style={styles.img} />
            <View>
              <Text
                text={data?.name}
                size="sm"
                style={styles.name}
                fontFamily="semiBold"
              />
              <Text text={data?.companyName} size="sm" fontFamily="light" />
              <Text text={data?.location} size="xs" fontFamily="light" />
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text text="Description" fontFamily="semiBold" size="sm" />
            <Text text={data?.description} size="sm" fontFamily="light" />
          </View>
          <View style={styles.keywords}>
            <Text text="Keywords" fontFamily="semiBold" size="sm" />
            <FlatList
              data={data?.keywords}
              contentContainerStyle={styles.keywordsContainer}
              keyExtractor={(item, index) => `keyword-${index}`}
              renderItem={({ item }) => (
                <Text
                  text={item}
                  size="xs"
                  fontFamily="bold"
                  color={colors.palette.state.success}
                />
              )}
            />
          </View>
          <View style={styles.salary}>
            <Text text="Salary" fontFamily="semiBold" size="sm" />
            <Text
              text={`${data?.salary} $`}
              size="sm"
              fontFamily="lightItalic"
            />
          </View>
          <Button
            text={isApplied ? "Withdraw" : "Apply"}
            onPress={() => handleApply(isApplied ? "withdraw" : "apply")}
            style={[styles.button, isApplied && styles.withdrawButton]}
            disabled={disabled}
            loading={disabled}
          />
        </View>
      </Body>
    </Screen>
  );
};

export default JobDetailScreen;

const styles = StyleSheet.create({
  detail: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 8,
    padding: moderateScale(16),
    marginTop: verticalScale(30),
  },
  textAndImg: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  img: {
    width: 72,
    height: 72,
    borderRadius: 8,
  },
  descriptionContainer: {
    marginTop: verticalScale(16),
    gap: verticalScale(3),
  },
  keywords: {
    marginTop: verticalScale(10),
    gap: verticalScale(3),
  },
  keywordsContainer: {
    alignItems: "center",
    gap: scale(8),
    flexDirection: "row",
    flexWrap: "wrap",
  },
  salary: {
    marginTop: verticalScale(10),
    gap: verticalScale(3),
  },
  button: {
    marginVertical: verticalScale(16),
  },
  withdrawButton: {
    backgroundColor: colors.palette.state.warning,
  },
  name: {
    width: scale(200),
  },
});
