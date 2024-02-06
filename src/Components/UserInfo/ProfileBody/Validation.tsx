import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ValidationSechemaProfile = () => {
  //  hooks
  const { t } = useTranslation();
  // return Yup.object({
  //   // name: Yup.string().matches(/^[a-zA-Z]+$/, t("name is not invalid.")),
  //   // mobile: Yup.string().required(t('phone number required')),
  // });
  return Yup.object({
    name: Yup.string().required(t("name is required")).min(3).max(25),
    mobile: Yup.string()
      .required(t("Please give a phone number"))
      .min(12, t("number must be 12 digits"))
      // .matches(
      //   /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$|^(009665|9665|9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
      //   t("The phone format is invalid.")
      // ),
  });
};

export default ValidationSechemaProfile;
