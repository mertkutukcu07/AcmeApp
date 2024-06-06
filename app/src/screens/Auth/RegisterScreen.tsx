import { StyleSheet, View } from "react-native";
import React from "react";
import { RouteNames } from "@/navigation/RouteNames";
import { AuthStackScreenProps } from "@/navigation/stacks/AuthStack";
import { Body, Button, Screen, Text, TextInput } from "@/components";
import { verticalScale } from "@/utils/WindowSize";
import { colors } from "@/theme";
import { navigate } from "@/navigation/navigationUtilities";
import { useLanguage } from "@/providers/LanguageProvider";
import { useShowValue } from "@/hooks/useShowValue";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemes } from "@/schemes";
import AuthForm from "@/components/authForm";

interface RegisterScreenProps
  extends AuthStackScreenProps<RouteNames.REGISTER> {}

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const { t } = useLanguage();

  const onSubmit = (data: any) => {
    console.log(data, "data");
  };

  return (
    <Screen edges={["bottom"]} preset="scroll">
      <AuthForm isLogin onSubmit={onSubmit} />
    </Screen>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
