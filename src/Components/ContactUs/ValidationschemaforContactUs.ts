import React from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ValidationSchemaForContact = () => {
  const { t } = useTranslation();
  return Yup.object({
    name: Yup.string().min(3).max(25).required(),
    email: Yup.string().email().min(6).max(50).required(),
    phone_number: Yup.string()
      .required(t("Please give a phone number"))
      .min(12, t("number must be 12 digits"))
      .max(15)
      .matches(
        /^(201|01|00201)[0-2,5]{1}[0-9]{8}$|^(009665|9665|9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
        t("The phone format is invalid.")
      ),
    message: Yup.string().min(10).required(),
  });
};
export default ValidationSchemaForContact;
