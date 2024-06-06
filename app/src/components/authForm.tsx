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
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, onSubmit }) => {
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

  const typeSchema = useMemo(
    () => [
      {
        title: isLogin ? "login.title" : "register.title",
        subtitle: isLogin ? "login.subtitle" : "register.subtitle",
        email: "login.email",
        password: "login.password",
        login: isLogin ? "login.login" : "register.register",
        register: isLogin ? "login.register" : "register.login",
        doNotHaveAccount: isLogin
          ? "login.doNotHaveAccount"
          : "register.alreadyHaveAccount",
      },
    ],
    [isLogin]
  );

  return (
    <Body>
      <View style={styles.titleContainer}>
        <Text
          text={t(isLogin ? "login.title" : "register.title")}
          fontFamily="semiBold"
          color={colors.palette.primary}
          size="big"
        />
        <Text
          text={t(isLogin ? "login.subtitle" : "register.subtitle")}
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
              label={t("login.email")}
              placeholder={t("login.email")}
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
              label={t("login.password")}
              placeholder={t("login.password")}
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
        text={t(isLogin ? "login.login" : "register.register")}
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={Object.keys(errors).length > 0}
      />
      <View style={styles.bottomContainer}>
        <Text
          text={t(
            isLogin ? "login.doNotHaveAccount" : "register.alreadyHaveAccount"
          )}
          fontFamily="regular"
          size="md"
        />
        <Button
          text={t(isLogin ? "login.register" : "register.login")}
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
