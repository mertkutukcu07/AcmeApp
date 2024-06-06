import { IconTypes } from "@/components/Icon";
import React from "react";
export const useShowValue = () => {
  const [valueVisibility, setValueVisibility] = React.useState(false);
  const [valueIcon, setValueIcon] = React.useState<IconTypes>("eye");

  const toggleValueVisibility = () => {
    setValueVisibility((prev) => !prev);
    setValueIcon((prev) => (prev === "eye" ? "eye-off" : "eye"));
  };

  return { valueIcon, valueVisibility, toggleValueVisibility };
};
