import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Jobs } from "@/api/services/jobs/types";
import { Images } from "@/constants/Images";
import { Text } from ".";
import { moderateScale, scale, verticalScale } from "@/utils/WindowSize";
import { colors } from "@/theme";
import { useLanguage } from "@/providers/LanguageProvider";
import { navigate } from "@/navigation/navigationUtilities";
import { RouteNames } from "@/navigation/RouteNames";
import { useAuthStore } from "@/store/authStore";

interface JobsCardProps {
  job: Jobs;
  index: number;
}

const JobsCard = ({ job, index }: JobsCardProps) => {
  const appliedJobs = useAuthStore((state) => state.userInfo.appliedJobs);
  const { t } = useLanguage();
  const isApplied = React.useMemo(() => {
    if (appliedJobs) {
      return appliedJobs.includes(job.id);
    }
    return false;
  }, [appliedJobs, job.id]);

  const handleDetail = React.useCallback(() => {
    if (job && job.id)
      navigate(RouteNames.JOBDETAIL, {
        jobId: job.id,
      });
  }, [job, job?.id]);

  return (
    <TouchableOpacity onPress={handleDetail} key={`${index}-job`}>
      <Image source={Images.jobsCard} style={styles.cardImg} />
      <View style={styles.card}>
        <View style={styles.detail}>
          <Text
            text={job?.name}
            fontFamily="semiBold"
            size="sm"
            color={colors.common.white}
          />
          <Text
            text={`${t("jobCard.company")} ${job?.companyName}`}
            fontFamily="regular"
            size="sm"
            color={colors.common.white}
          />
          <Text
            text={`${t("jobCard.salary")} ${job?.salary}`}
            fontFamily="light"
            size="xs"
            color={colors.common.white}
          />
        </View>
        {isApplied && (
          <View style={styles.applied}>
            <Text
              text={t("jobCard.applied")}
              fontFamily="regular"
              size="xs"
              color={colors.common.white}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default JobsCard;

const styles = StyleSheet.create({
  cardImg: {
    width: scale(310),
    height: verticalScale(150),
    borderRadius: 10,
    position: "relative",
    overflow: "hidden",
  },
  detail: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: scale(310),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: moderateScale(10),
  },
  card: {
    position: "absolute",
    bottom: 0,
    width: scale(310),
    height: verticalScale(150),
    borderRadius: 10,
  },
  applied: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: colors.state.warning,
    padding: moderateScale(5),
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
