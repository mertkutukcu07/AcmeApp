import { IconTypes } from "@/components/Icon";

export interface Language {
  value?: string;
  label?: string;
  id: number;
  icon: IconTypes;
}

export const language = (t: any): Language[] => [
  {
    id: 1,
    icon: "enFlag",
    label: t("language.english"),
    value: "en",
  },
  {
    id: 2,
    icon: "trFlag",
    label: t("language.turkish"),
    value: "tr",
  },
];
