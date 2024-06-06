import { TFunction } from "i18next";
import { z } from "zod";

export const schemes = (t: any) => ({
  AuthSchema: z.object({
    email: z.string().email(t("controller.emailError")),
    password: z.string().min(6, t("controller.passwordError")),
  }),
});
