import { z } from "zod";

export const schemes = (t: any) => ({
  AuthSchema: z.object({
    email: z
      .string()
      .email(t("controller.emailInvalidError"))
      .nonempty(t("controller.emailRequiredError")),
    password: z
      .string()
      .min(6, t("controller.passwordLengthError"))
      .nonempty(t("controller.passwordRequiredError")),
  }),
  ProfileSchema: z.object({
    name: z
      .string()
      .min(2, t("controller.nameLengthError"))
      .nonempty(t("controller.nameRequiredError")),
    surname: z
      .string()
      .min(2, t("controller.surnameLengthError"))
      .nonempty(t("controller.surnameRequiredError")),
    profileImage: z
      .string()
      .url(t("controller.profileImageInvalidError"))
      .nonempty(t("controller.profileImageRequiredError")),
    phone: z
      .string()
      .min(10, t("controller.phoneLengthError"))
      .nonempty(t("controller.phoneRequiredError")),
    dateOfBirth: z
      .string()
      .min(2, t("controller.dateOfBirthLengthError"))
      .nonempty(t("controller.dateOfBirthRequiredError")),
    country: z
      .string()
      .min(2, t("controller.countryLengthError"))
      .nonempty(t("controller.countryRequiredError")),
    city: z
      .string()
      .min(2, t("controller.cityLengthError"))
      .nonempty(t("controller.cityRequiredError")),
    address: z
      .string()
      .min(2, t("controller.addressLengthError"))
      .nonempty(t("controller.addressRequiredError")),
  }),
});
