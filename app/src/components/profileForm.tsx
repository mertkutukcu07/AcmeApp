import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Body, Button, Text, TextInput } from "@/components";
import { useLanguage } from "@/providers/LanguageProvider";
import { verticalScale } from "@/utils/WindowSize";
import { Controller, useForm } from "react-hook-form";
import { schemes } from "@/schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { UserInfoResponse } from "@/api/services/auth/types";

interface ProfileFormProps {
  onSubmit: (data: any) => void;
  isPending?: boolean;
  onDateOfBirthPress: () => void;
  dateOfBirth: Date;
  userInfo: UserInfoResponse;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  onSubmit,
  isPending,
  onDateOfBirthPress,
  dateOfBirth,
  userInfo,
}) => {
  const { t } = useLanguage();
  const schema = useMemo(() => schemes(t).ProfileSchema, [t]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  React.useEffect(() => {
    setValue("dateOfBirth", moment(dateOfBirth).format("YYYY-MM-DD"));
    setValue("name", userInfo.name);
    setValue("surname", userInfo.surname);
    setValue("profileImage", userInfo?.profileImage);
    setValue("phone", userInfo.phone);
    setValue("country", userInfo.address?.country);
    setValue("city", userInfo.address?.city);
    setValue("address", userInfo.address?.details);
  }, [userInfo]);

  return (
    <Body>
      <View style={styles.sectionHeader}>
        <Text text={t("profile.personalInfo")} fontFamily="medium" size="lg" />
      </View>
      <View style={styles.inputC}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t("profile.name")}
              placeholder={t("profile.name")}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              onChangeText={onChange}
              error={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="surname"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t("profile.surname")}
              placeholder={t("profile.surname")}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              onChangeText={onChange}
              error={errors.surname?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="profileImage"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t("profile.profileImage")}
              placeholder={t("profile.profileImage")}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              onChangeText={onChange}
              error={errors.profileImage?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t("profile.phone")}
              placeholder={t("profile.phone")}
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              onChangeText={onChange}
              error={errors.phone?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field: { onChange, value } }) => (
            <TouchableOpacity
              style={styles.inputC}
              onPress={onDateOfBirthPress}
            >
              <TextInput
                label={t("profile.dateOfBirth")}
                placeholder={t("profile.dateOfBirth")}
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onChangeText={onChange}
                error={errors.dateOfBirth?.message}
                editable={false}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.sectionHeader}>
        <Text text={t("profile.address")} fontFamily="medium" size="lg" />
      </View>
      <View style={styles.inputC}>
        <Controller
          control={control}
          name="country"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t("profile.country")}
              placeholder={t("profile.country")}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              onChangeText={onChange}
              error={errors.country?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="city"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t("profile.city")}
              placeholder={t("profile.city")}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              onChangeText={onChange}
              error={errors.city?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t("profile.address")}
              placeholder={t("profile.address")}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              onChangeText={onChange}
              error={errors.address?.message}
            />
          )}
        />
      </View>
      <Button
        text={t("profile.profileUpdate")}
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
        disabled={isPending}
      />
    </Body>
  );
};

export default ProfileForm;

const styles = StyleSheet.create({
  sectionHeader: {
    marginVertical: verticalScale(20),
  },
  inputC: {
    gap: verticalScale(10),
  },
  button: {
    marginVertical: verticalScale(20),
  },
});
