import React from "react";
import PropTypes from "prop-types";
// import Image from "next/image";
import nofood from "../../assets/gif/no-food.gif";
import { Stack, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomStackFullWidth, CustomTypography } from "@/styles/PublicStyles";

interface EmptyResult {
  label: string;
  image: {
    src: string;
  };
}
const CustomEmptyResult = ({ label, image }: EmptyResult) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <CustomStackFullWidth alignItems="center" justifyContent="center">
      <img
        src={image ? image.src : nofood.src}
        alt="my gif"
        height={150}
        width={150}
      />
      <Stack alignItems="center" justifyContent="center">
        <CustomTypography sx={{ color: theme.palette.primary.main }}>
          {label ? t(label) : t("Not found")}
        </CustomTypography>
      </Stack>
    </CustomStackFullWidth>
  );
};

CustomEmptyResult.propTypes = {};

export default CustomEmptyResult;
