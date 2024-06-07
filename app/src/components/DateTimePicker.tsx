import { useLanguage } from "@/providers/LanguageProvider";
import React from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface DateTimePickerProps {
  isVisible: boolean;
  setDatePickerVisibility: (value: boolean) => void;
  onConfirm: (date: Date) => void;
  mode: "date" | "time";
  onConfirm: (date: Date) => void;
}

const DateTimePicker = ({
  isVisible,
  setDatePickerVisibility,
  onConfirm,
  mode,
}: DateTimePickerProps) => {
  const { language, t } = useLanguage();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <View>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isVisible}
        mode={mode}
        onConfirm={onConfirm}
        locale={language ?? undefined}
        confirmTextIOS={t("dateTimePicker.confirm")}
        cancelTextIOS={t("dateTimePicker.cancel")}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DateTimePicker;
