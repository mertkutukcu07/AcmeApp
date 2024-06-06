import * as React from "react";
import {
  SafeAreaView,
  SafeAreaViewProps,
  Edge,
} from "react-native-safe-area-context";
import { ScrollView, StyleSheet, ViewStyle } from "react-native";
import { colors } from "@/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface ScreenProps extends SafeAreaViewProps {
  children: React.ReactNode;
  edges?: ReadonlyArray<Edge>;
  color?: string;
  style?: ViewStyle;
  preset?: "fixed" | "scroll";
}

const FixedScreen: React.FC<ScreenProps> = ({
  children,
  edges,
  style,
  ...rest
}) => (
  <SafeAreaView edges={edges} style={style} {...rest}>
    {children}
  </SafeAreaView>
);

const ScrollScreen: React.FC<ScreenProps> = ({
  children,
  edges,
  style,
  ...rest
}) => (
  <SafeAreaView edges={edges} style={style} {...rest}>
    <KeyboardAwareScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {children}
    </KeyboardAwareScrollView>
  </SafeAreaView>
);

const Screen: React.FC<ScreenProps> = ({
  children,
  edges = ["top", "bottom"],
  color,
  style,
  preset = "fixed",
  ...rest
}) => {
  const combinedStyle = [
    styles.container,
    { backgroundColor: colors.common.white },
    style,
  ] as ViewStyle;

  if (preset === "scroll") {
    return (
      <ScrollScreen edges={edges} style={combinedStyle} {...rest}>
        {children}
      </ScrollScreen>
    );
  }

  return (
    <FixedScreen edges={edges} style={combinedStyle} {...rest}>
      {children}
    </FixedScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default Screen;
