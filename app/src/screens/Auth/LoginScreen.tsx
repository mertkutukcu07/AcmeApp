import { StyleSheet } from "react-native";
import React from "react";
import { AuthStackScreenProps } from "@/navigation/stacks/AuthStack";
import { RouteNames } from "@/navigation/RouteNames";
import { AuthForm, Screen } from "@/components";

import { colors } from "@/theme";
import { verticalScale } from "@/utils/WindowSize";
import { useLogin } from "@/api/services/auth";
import { useAuthStore } from "@/store/authStore";
interface LoginScreenProps extends AuthStackScreenProps<RouteNames.LOGIN> {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const signIn = useAuthStore((state) => state.signIn);
  const { mutateAsync: login, isPending } = useLogin({
    onSuccess: (data) => {
      signIn(data?.accessToken, data?.refreshToken);
    },
  });
  const onSubmit = (data: any) => {
    login(data);
  };

  return (
    <Screen edges={["bottom"]} preset="scroll">
      <AuthForm isLogin onSubmit={onSubmit} isPending={isPending} />
    </Screen>
  );
};

export default LoginScreen;

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
  registerContainer: {
    marginTop: verticalScale(30),
    justifyContent: "center",
    alignItems: "center",
    gap: verticalScale(10),
  },
  registerButton: {
    backgroundColor: colors.common.white,
    borderWidth: 1,
    borderColor: colors.palette.primary,
  },
  textStyle: {
    color: colors.palette.primary,
  },
});
