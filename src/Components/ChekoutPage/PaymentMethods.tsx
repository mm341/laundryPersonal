import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import cashImg from "../../../public/CheckOut/cash.svg";
import onlineImg from "../../../public/CheckOut/online.svg";
import visaImg from "../../../public/CheckOut/visaImg.png";
import masterImg from "../../../public/CheckOut/masterImg.png";
import madaImg from "../../../public/CheckOut/madaImg.png";
import {
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
const PaymentMethods = ({
  setPayment,
  payment,
  onlineMethod,
  setOnlineMethod,
}: {
  setPayment: (e: string) => void;
  payment: string;
  onlineMethod: string;
  setOnlineMethod: (e: string) => void;
}) => {
  const onlineImage: { img: string; text: string }[] = [
    { img: masterImg?.src, text: "master" },
    { img: visaImg?.src, text: "visa" },
    { img: madaImg?.src, text: "mada" },
  ];
  //  hooks

  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <GlobalDisplayFlexColumnBox gap={"35px"}>
      <GlobalDisplayFlexBox sx={{ justifyContent: "flex-start", gap: "25px" }}>
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
                  ? "invert(100%) sepia(0%) saturate(0%) hue-rotate(136deg) brightness(250%) contrast(104%)"
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
                  ? "invert(100%) sepia(0%) saturate(0%) hue-rotate(136deg) brightness(250%) contrast(104%)"
                  : "invert(55%) sepia(93%) saturate(971%) hue-rotate(172deg) brightness(87%) contrast(93%)",
            }}
            src={onlineImg?.src}
            alt="cashImg"
            loading="lazy"
          />
          <Typography>{t("Online Payment")}</Typography>
        </Box>
      </GlobalDisplayFlexBox>

      {payment === "Online" && (
        <GlobalDisplayFlexBox
          sx={{ justifyContent: "flex-start", gap: "20px" }}
        >
          {onlineImage?.map((e, i: number) => (
            <Box
              onClick={() => setOnlineMethod(e.text)}
              sx={{
                boxShadow:
                  "0px 4.97777795791626px 18.66666603088379px 0px #0000001A",
                width: "124px",
                height: "50px",
                borderRadius: "4px",
                border:onlineMethod===e.text?`1px solid ${theme.palette.primary.main}`:"1px solid white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              key={i}
            >
              <img
                src={e.img}
                loading="lazy"
                alt="img"
                style={{
                  width: "100px",
                  marginRight: "auto",
                  marginLeft: "auto",
                  height: "34px",

                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
        </GlobalDisplayFlexBox>
      )}
    </GlobalDisplayFlexColumnBox>
  );
};

export default PaymentMethods;
