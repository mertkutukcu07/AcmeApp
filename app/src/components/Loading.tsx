import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";
import { height, width } from "@/utils/WindowSize";
import { colors } from "@/theme";

const Loading = () => {
  return (
    <View style={styles.background}>
      <ActivityIndicator size="large" color={colors.common.black} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    height: height,
    width: width,
  },
});
