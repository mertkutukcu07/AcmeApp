import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from "react-native";
import { CustomTextProps, Sizes } from "./Text";
import { Text } from ".";
import { moderateScale, scale, verticalScale } from "@/utils/WindowSize";
import { colors } from "@/theme";

interface ButtonProps {
  text?: CustomTextProps["text"];
  style?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  textStyle?: CustomTextProps["style"];
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  children?: React.ReactNode;
  loading?: boolean;
  onPress?: () => void;
  disabled?: boolean;
}

const Button = ({
  text,
  style,
  pressedStyle,
  textStyle,
  rightIcon,
  leftIcon,
  children,
  loading,
  onPress,
  disabled,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.baseStyle,
        style,
        pressedStyle,
        disabled && styles.disabledStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.common.white} />
      ) : (
        <React.Fragment>
          {leftIcon && !loading && <View>{leftIcon}</View>}
          <Text
            text={text}
            style={[styles.textStyle, textStyle]}
            color={colors.common.white}
            fontFamily="medium"
            size="md"
          />
          {rightIcon && !loading && <View>{rightIcon}</View>}
          {children}
        </React.Fragment>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseStyle: {
    backgroundColor: colors.palette.primary,
    borderRadius: moderateScale(7),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textStyle: {
    flex: 1,
    color: colors.common.white,
    textAlign: "center",
  },
  disabledStyle: {
    opacity: 0.5,
  },
});
export default Button;
