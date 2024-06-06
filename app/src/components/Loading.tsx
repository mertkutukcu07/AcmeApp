import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <View style={styles.background}>
      <ActivityIndicator size="large" color={"#fff"} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
