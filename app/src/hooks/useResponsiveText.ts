import { PixelRatio } from "react-native";

export const getFontSize = (baseFontSize: number) => {
  const fontScale = PixelRatio.getFontScale();
  return baseFontSize / fontScale;
};
