import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Language } from "@/mocks/language";
import { useLanguage } from "@/providers/LanguageProvider";
import { AntDesign } from "@expo/vector-icons";
import Icon from "./Icon";
import { Text } from ".";
import { scale } from "@/utils/WindowSize";
import { colors } from "@/theme";
interface LanguagesProps {
  lng: Language;
  index: number;
}

const Languages = ({ lng, index }: LanguagesProps) => {
  const { changeLanguage, language } = useLanguage();
  const currentLanguage = React.useMemo(() => {
    return lng.value === language;
  }, [language]);
  const icon = currentLanguage ? "checkcircle" : "checkcircleo";

  const handleChangeLanguage = () => {
    changeLanguage(lng.value || "");
  };

  return (
    <TouchableOpacity
      key={`${index}-lng`}
      onPress={handleChangeLanguage}
      style={styles.root}
    >
      <View style={styles.detail}>
        <Icon icon={lng.icon} size={24} />
        <Text text={lng.label} fontFamily="medium" size="sm" />
      </View>
      <AntDesign
        name={icon}
        size={24}
        color={currentLanguage ? colors.palette.primary : "#C4C4C4"}
        onPress={handleChangeLanguage}
      />
    </TouchableOpacity>
  );
};

export default Languages;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
});
