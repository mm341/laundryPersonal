import { Box, Typography, useTheme, Divider } from "@mui/material";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
const GlobalTypography = ({
  text,
  FirstSection,
  clearBg,
  homePage,
}: {
  text: string;
  FirstSection?: boolean;
  clearBg?: boolean;
  homePage?: boolean;
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Box
      data-aos="fade-up"
      sx={{
        display: "flex",
        flexDirection: !FirstSection ? "row" : "row-reverse",
        alignItems: "center",
        gap: "7px",
        justifyContent: !homePage ? "center" : "flex-end",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: {
            md: !FirstSection ? "36px" : "44px",
            sm: !FirstSection ? "26px" : "36px",
            xs: "18px",
          },
          fontWeight: "500",
          backgroundColor: !clearBg ? theme.palette.primary.light : "white",
          borderRadius: "50px",
          px: "15px",
          py: "7px",
        }}
      >
        {t(text)}
      </Typography>
      <Box
        sx={{
          width: "10px",
          height: "60px",
          backgroundColor: theme.palette.primary.main,
        }}
      ></Box>
    </Box>
  );
};

export default GlobalTypography;
