import { StyleSheet, View } from "react-native";
import React from "react";
import { colors } from "@/theme/colors";
import { scale, verticalScale } from "@/utils/WindowSize";
import Icon, { IconTypes } from "./Icon";
import { Text } from ".";

export interface HeaderProps {
  leftIcon?: IconTypes;
  rightIcon?: IconTypes;
  title: string;
  onRightPress?: () => void;
  onLeftPress?: () => void;
}

const Header = ({
  leftIcon,
  rightIcon,
  title,
  onRightPress,
  onLeftPress,
}: HeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftIcon}>
        {leftIcon && (
          <Icon
            icon={leftIcon}
            size={25}
            onPress={onLeftPress}
            color={colors.common.white}
          />
        )}
      </View>
      <View style={styles.title}>
        <Text
          text={title}
          size="md"
          color={colors.common.white}
          fontFamily="semiBold"
          style={{ textAlign: "center" }}
        />
      </View>
      <View style={styles.rightIcon}>
        {rightIcon && <Icon icon={rightIcon} onPress={onRightPress} />}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.palette.primary,
    height: verticalScale(100),
    flexDirection: "row",
    alignItems: "center",
    paddingTop: verticalScale(50),
    justifyContent: "space-between",
    paddingHorizontal: scale(20),
  },
  leftIcon: {
    flex: 1,
    alignItems: "flex-start",
  },
  title: {
    flex: 3,
    alignItems: "center",
  },
  rightIcon: {
    flex: 1,
    alignItems: "flex-end",
  },
});
