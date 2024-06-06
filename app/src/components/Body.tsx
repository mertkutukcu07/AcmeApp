import { StyleSheet, View } from "react-native";
import React from "react";
import { scale } from "@/utils/WindowSize";

interface BodyProps {
  children: React.ReactNode;
}

const Body = ({ children }: BodyProps) => {
  return <View style={styles.body}>{children}</View>;
};

export default Body;

const styles = StyleSheet.create({
  body: {
    marginHorizontal: scale(20),
  },
});
