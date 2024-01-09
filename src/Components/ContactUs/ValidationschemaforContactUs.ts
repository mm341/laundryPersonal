import React from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ValidationSchemaForContact = () => {
  const { t } = useTranslation();
  return Yup.object({
    FullName: Yup.string().min(3).max(25).required(),
    Email: Yup.string().email().min(6).max(50).required(),
    PhoneNumber: Yup.string().min(10).max(15).required(),
    message: Yup.string().min(10).required(),
  });
};
export default ValidationSchemaForContact;
