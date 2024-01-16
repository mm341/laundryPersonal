import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ValidationSechemaProfile = () => {
  const { t } = useTranslation();
  return Yup.object({
    // name: Yup.string().matches(/^[a-zA-Z]+$/, t("name is not invalid.")),
    // mobile: Yup.string().required(t('phone number required')),
  });
};

export default ValidationSechemaProfile;
