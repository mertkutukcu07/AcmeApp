import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { RouteNames } from "@/navigation/RouteNames";
import { Body, Button, Screen, Text, TextInput } from "@/components";
import { useLanguage } from "@/providers/LanguageProvider";
import { colors } from "@/theme";
import { verticalScale } from "@/utils/WindowSize";
import { navigate } from "@/navigation/navigationUtilities";
import { useShowValue } from "@/hooks/useShowValue";
import { Controller, useForm } from "react-hook-form";
import { schemes } from "@/schemes";
import { zodResolver } from "@hookform/resolvers/zod";

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (data: any) => void;
  isPending?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isLogin,
  onSubmit,
  isPending,
}) => {
  const { t } = useLanguage();
  const { valueIcon, valueVisibility, toggleValueVisibility } = useShowValue();
  const schema = useMemo(() => schemes(t).AuthSchema, [t]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleNavigation = useCallback(() => {
    navigate(isLogin ? RouteNames.REGISTER : RouteNames.LOGIN);
  }, [isLogin]);

  const localizedScheme = useMemo(
    () => ({
      title: isLogin ? t("login.title") : t("register.title"),
      subtitle: isLogin ? t("login.subtitle") : t("register.subtitle"),
      email: t("login.email"),
      password: t("login.password"),
      login: isLogin ? t("login.login") : t("register.register"),
      register: isLogin ? t("login.register") : t("register.login"),
      doNotHaveAccount: isLogin
        ? t("login.doNotHaveAccount")
        : t("register.alreadyHaveAccount"),
    }),
    [isLogin, t]
  );

  return (
    <Body>
      <View style={styles.titleContainer}>
        <Text
          text={localizedScheme.title}
          fontFamily="semiBold"
          color={colors.palette.primary}
          size="big"
        />
        <Text
          text={localizedScheme.subtitle}
          color={colors.palette.primary}
          size="lg"
          fontFamily="regular"
        />
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label={localizedScheme.email}
              placeholder={localizedScheme.email}
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              error={errors && errors.email && errors.email.message}
            />
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label={localizedScheme.password}
              placeholder={localizedScheme.password}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={!valueVisibility}
              rightIcon={valueIcon}
              rightIconPress={toggleValueVisibility}
              error={errors && errors.password && errors.password.message}
            />
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />
      </View>
      <Button
        loading={isPending}
        text={localizedScheme.login}
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={Object.keys(errors).length > 0 || isPending}
      />
      <View style={styles.bottomContainer}>
        <Text
          text={localizedScheme.doNotHaveAccount}
          fontFamily="regular"
          size="md"
        />
        <Button
          text={localizedScheme.register}
          style={styles.secondaryButton}
          textStyle={styles.textStyle}
          onPress={handleNavigation}
        />
      </View>
    </Body>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  titleContainer: {
    gap: verticalScale(10),
    marginTop: verticalScale(30),
  },
  inputContainer: {
    marginTop: verticalScale(30),
    gap: verticalScale(20),
  },
  button: {
    marginTop: verticalScale(30),
  },
  bottomContainer: {
    marginTop: verticalScale(30),
    justifyContent: "center",
    alignItems: "center",
    gap: verticalScale(10),
  },
  secondaryButton: {
    backgroundColor: colors.common.white,
    borderWidth: 1,
    borderColor: colors.palette.primary,
  },
  textStyle: {
    color: colors.palette.primary,
  },
});
