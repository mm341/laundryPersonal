import { useAppSelector } from "@/redux/store";
import { GlobalDisplayFlexColumnBox } from "@/styles/PublicStyles";
import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const SummarySection = () => {
  //  hooks
  const { t } = useTranslation();
  const theme = useTheme();
  //  master data
  const { master } = useAppSelector((state) => state.master);
  return (
    <GlobalDisplayFlexColumnBox width={"100%"} gap={"12px"} sx={{ px: "18px" }}>
      <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
        {t("Summary")}
      </Typography>
      <GlobalDisplayFlexColumnBox width={"100%"} gap={"8px"}>
        {/*  sub total value */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: theme.palette.secondary.contrastText,
            }}
          >
            {t("Subtotal")}
          </Typography>
          <Typography>323 {master?.currency}</Typography>
        </Box>
        {/* Delivery Charge */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: theme.palette.secondary.contrastText,
            }}
          >
            {t("Delivery Charge")}
          </Typography>
          <Typography>323 {master?.currency}</Typography>
        </Box>
        {/* Discount*/}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: theme.palette.secondary.contrastText,
            }}
          >
            {t("Discount")}
          </Typography>
          <Typography>323 {master?.currency}</Typography>
        </Box>
      </GlobalDisplayFlexColumnBox>
      {/* Total*/}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          {t("Total")}
        </Typography>
        <Typography>323 {master?.currency}</Typography>
      </Box>
    </GlobalDisplayFlexColumnBox>
  );
};

export default SummarySection;
