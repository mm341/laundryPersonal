import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import cashImg from "../../../public/CheckOut/cash.svg";
import onlineImg from "../../../public/CheckOut/online.svg";
import { GlobalDisplayFlexBox } from "@/styles/PublicStyles";
const PaymentMethods = ({
  setPayment,
  payment,
}: {
  setPayment: (e: string) => void;
  payment: string;
}) => {
  //  hooks

  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <GlobalDisplayFlexBox sx={{ justifyContent: "flex-start", gap: "30px" }}>
      {/*  cash */}

      <Box
        onClick={() => setPayment("cash")}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: `1px solid ${theme.palette.primary.main}`,
          backgroundColor:
            payment === "cash" ? theme.palette.primary.main : "white",
          color: payment === "cash" ? "white" : "black",
          width: "196px",
          height: "48px",
          borderRadius: "4px",
          gap: "5px",
          cursor: "pointer",
        }}
      >
        <img
          style={{
            filter:
              payment === "cash"
                ? "invert(100%) sepia(0%) saturate(0%) hue-rotate(136deg) brightness(190%) contrast(104%)"
                : "invert(55%) sepia(93%) saturate(971%) hue-rotate(172deg) brightness(87%) contrast(93%)",
          }}
          src={cashImg?.src}
          alt="cashImg"
          loading="lazy"
        />
        <Typography>{t("Cash On Delivery")}</Typography>
      </Box>

      {/*  online */}

      <Box
        onClick={() => setPayment("Online")}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: `1px solid ${theme.palette.primary.main}`,
          backgroundColor:
            payment === "Online" ? theme.palette.primary.main : "white",
          color: payment === "Online" ? "white" : "black",
          cursor: "pointer",
          width: "196px",
          height: "48px",
          borderRadius: "4px",
          gap: "5px",
        }}
      >
        <img
          style={{
            filter:
              payment === "Online"
                ? "invert(100%) sepia(0%) saturate(0%) hue-rotate(136deg) brightness(190%) contrast(104%)"
                : "invert(55%) sepia(93%) saturate(971%) hue-rotate(172deg) brightness(87%) contrast(93%)",
          }}
          src={onlineImg?.src}
          alt="cashImg"
          loading="lazy"
        />
        <Typography>{t("Online Payment")}</Typography>
      </Box>
    </GlobalDisplayFlexBox>
  );
};

export default PaymentMethods;
