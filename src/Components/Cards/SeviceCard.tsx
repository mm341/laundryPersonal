import {
  CustomPaperBigCard,
  GlobalButton,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Fade, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { HomeServices } from "@/interfaces/HomeServices";
// import Image from "next/image";
const SeviceCard = ({
  setOpenOrderDialog,
  area,
  element,
  setServiceId,
}: {
  setOpenOrderDialog?: ((action: boolean) => void) | any;
  area?: boolean;
  element: HomeServices;
  setServiceId: (action: string | undefined) => void;
}) => {
  const [bright, setBright] = useState<boolean>(false);
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const issmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <CustomPaperBigCard
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        // height: "335px",
        position: "relative",
      }}
      onMouseOver={() => setBright(true)}
      onMouseLeave={() => setBright(false)}
    >
      <Typography
        sx={{ fontSize: { md: "20px", xs: "16px" }, fontWeight: "500" }}
      >
        {element?.name}
      </Typography>
      <img
        width={"213"}
        height={"300"}
        src={element?.image_path}
        alt="img"
        loading="lazy"
        style={{
          borderRadius: "5px",
          width: "100%",
          height: "100px",
          objectFit: "contain",
        }}
        className=" brightness-75"
      />

      <Typography
        sx={{
          fontSize: { md: "16px", xs: "12px" },
          fontWeight: "400",
          textAlign: "center",
        }}
      >
        {element?.description}
      </Typography>

      {bright && (
        <GlobalDisplayFlexBox
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, #A3DEFF 89%)",
              position:"absolute",
              left:"0",
              top:"0px",
              justifyContent:"center",
              borderRadius: "10px",
          }}
          sx={{ width: "100%", height: "100%" }}
        >
          <GlobalButton
            onClick={() => {
              if (area) {
                localStorage.setItem("service", element?.name);
                router.push(`/products?service_id=${element?.id}`);
              } else {
                localStorage.setItem("service", element?.name);
                setServiceId(element?.id);
                setOpenOrderDialog(true);
              }
            }}
            service
            sx={{
              color: "white",
              display: "flex",
              backgroundColor: theme.palette.primary.main,
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: "4px",
              fontSize: { md: "16px", xs: "12px" },
            }}
            px={!issmall ? "25px" : "10px"}
            py={!issmall ? "10px" : "6px"}
          >
            {t("Get the Service")}
          </GlobalButton>
        </GlobalDisplayFlexBox>
     )} 
    </CustomPaperBigCard>
  );
};

export default SeviceCard;
