import * as React from "react";
import { ComponentType } from "react";
import {
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
  StyleSheet,
  Image,
} from "react-native";

export type IconTypes = keyof typeof iconRegistry;

export const iconRegistry = {
  arrowLeft: require("assets/icons/arrowLeft.png"),
  eye: require("assets/icons/eye.png"),
  "eye-off": require("assets/icons/eyeOff.png"),
};

export interface IconProps {
  icon: IconTypes;
  color?: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: TouchableOpacityProps["onPress"];
}

const Icon = ({
  icon,
  color,
  size,
  style,
  containerStyle,
  ...WrapperProps
}: IconProps) => {
  const Wrapper = (
    WrapperProps.onPress ? TouchableOpacity : View
  ) as ComponentType<ViewProps | TouchableOpacityProps>;

  const iconStyle = {
    ...styles.icon,
    width: size,
    height: size,
    tintColor: color,
  };

  return (
    <Wrapper {...WrapperProps} style={containerStyle}>
      <Image source={iconRegistry[icon]} style={[iconStyle, style]} />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: "contain",
  },
});

export default Icon;
