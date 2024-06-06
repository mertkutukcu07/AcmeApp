import {
  Text,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from "react-native";
import React from "react";
import { getFontSize } from "@/hooks/useResponsiveText";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";

export type Sizes = keyof typeof Sizes;
type FontFamily = keyof typeof FontFamily;

const Sizes = {
  big: { fontSize: getFontSize(46) } satisfies TextStyle,
  xxl: { fontSize: getFontSize(36) } satisfies TextStyle,
  xml: { fontSize: getFontSize(32) } satisfies TextStyle,
  xsml: { fontSize: getFontSize(30) } satisfies TextStyle,
  xl: { fontSize: getFontSize(24) } satisfies TextStyle,
  lg: { fontSize: getFontSize(20) } satisfies TextStyle,
  md: { fontSize: getFontSize(18) } satisfies TextStyle,
  sm: { fontSize: getFontSize(16) } satisfies TextStyle,
  xs: { fontSize: getFontSize(14) } satisfies TextStyle,
  xxs: { fontSize: getFontSize(12) } satisfies TextStyle,
};

const FontFamily = {
  thin: { fontFamily: typography.fonts.thin } satisfies TextStyle,
  thinItalic: { fontFamily: typography.fonts.thinItalic } satisfies TextStyle,
  extraLight: { fontFamily: typography.fonts.extraLight } satisfies TextStyle,
  extraLightItalic: {
    fontFamily: typography.fonts.extraLightItalic,
  } satisfies TextStyle,
  light: { fontFamily: typography.fonts.light } satisfies TextStyle,
  lightItalic: { fontFamily: typography.fonts.lightItalic } satisfies TextStyle,
  regular: { fontFamily: typography.fonts.regular } satisfies TextStyle,
  regularItalic: {
    fontFamily: typography.fonts.regularItalic,
  } satisfies TextStyle,
  medium: { fontFamily: typography.fonts.medium } satisfies TextStyle,
  mediumItalic: {
    fontFamily: typography.fonts.mediumItalic,
  } satisfies TextStyle,
  semiBold: { fontFamily: typography.fonts.semiBold } satisfies TextStyle,
  semiBoldItalic: {
    fontFamily: typography.fonts.semiBoldItalic,
  } satisfies TextStyle,
  bold: { fontFamily: typography.fonts.bold } satisfies TextStyle,
  boldItalic: { fontFamily: typography.fonts.boldItalic } satisfies TextStyle,
  extraBold: { fontFamily: typography.fonts.extraBold } satisfies TextStyle,
  extraBoldItalic: {
    fontFamily: typography.fonts.extraBoldItalic,
  } satisfies TextStyle,
  black: { fontFamily: typography.fonts.black } satisfies TextStyle,
  blackItalic: { fontFamily: typography.fonts.blackItalic } satisfies TextStyle,
};

export interface CustomTextProps extends RNTextProps {
  color?: string;
  text?: string;
  style?: StyleProp<TextStyle>;
  size?: Sizes;
  fontFamily?: FontFamily;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  lineHeight?: number;
  textDecoration?:
    | "none"
    | "underline"
    | "line-through"
    | "underline line-through";
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
  children?: React.ReactNode;
}

const CustomText = ({
  text,
  size,
  fontFamily,
  style,
  color,
  textAlign,
  lineHeight,
  textDecoration,
  numberOfLines,
  ellipsizeMode,
  ...props
}: CustomTextProps) => {
  return (
    <Text
      {...props}
      style={[
        {
          color: color || colors.black,
          ...Sizes[size || "md"],
          ...FontFamily[fontFamily || "regular"],
          textAlign,
          lineHeight,
          textDecorationLine: textDecoration,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {text}
      {props.children}
    </Text>
  );
};

export default CustomText;
