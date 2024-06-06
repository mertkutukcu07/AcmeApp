import { StyleSheet, View } from "react-native";
import React from "react";
import { AuthStackScreenProps } from "@/navigation/stacks/AuthStack";
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
import AuthForm from "@/components/authForm";
interface LoginScreenProps extends AuthStackScreenProps<RouteNames.LOGIN> {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = (data: any) => {
    console.log(data, "data");
  };

  return (
    <Screen edges={["bottom"]} preset="scroll">
      <AuthForm isLogin onSubmit={onSubmit} />
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
