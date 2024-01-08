import React from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ValidationSchemaForAddAddress = () => {
  const { t } = useTranslation();
  return Yup.object({
    address_type: Yup.string().required(t("Addresse Type is required")),
    Building: Yup.string().min(1).max(3),
    floor: Yup.string().min(1).max(3),
    apartment: Yup.string().min(1).max(3),
    area:Yup.string().required(t("area is required"))
    // house:Yup.string().required(t('Building is required')),
  });
};
export default ValidationSchemaForAddAddress;
