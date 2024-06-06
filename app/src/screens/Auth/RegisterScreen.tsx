import { StyleSheet } from "react-native";
import React from "react";
import { RouteNames } from "@/navigation/RouteNames";
import { AuthStackScreenProps } from "@/navigation/stacks/AuthStack";
import { AuthForm, Screen } from "@/components";

import { useLanguage } from "@/providers/LanguageProvider";
import { useRegister } from "@/api/services/auth";
import { useAuthStore } from "@/store/authStore";

interface RegisterScreenProps
  extends AuthStackScreenProps<RouteNames.REGISTER> {}

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const signIn = useAuthStore((state) => state.signIn);

  const { mutateAsync: register, isPending } = useRegister({
    onSuccess: (data) => {
      signIn(data?.accessToken, data?.refreshToken);
    },
  });
  const onSubmit = (data: any) => {
    register(data);
  };

  return (
    <Screen edges={["bottom"]} preset="scroll">
      <AuthForm isLogin={false} onSubmit={onSubmit} isPending={isPending} />
    </Screen>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
