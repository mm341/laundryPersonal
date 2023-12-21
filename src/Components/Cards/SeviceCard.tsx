import {
  GlobalButton,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Fade, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import dumyImg from "../../../public/DumyImg/img-service-2 1.png";
import { useTranslation } from "react-i18next";
import { HomeServices } from "@/interfaces/HomeServices";
const SeviceCard = ({
  setOpenOrderDialog,
  area,
  element,
  setServiceId
}: {
  setOpenOrderDialog?: ((action: boolean) => void) | any;
  area?: boolean;
  element: HomeServices;
  setServiceId:((action:number|undefined)=>void)
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const issmall = useMediaQuery(theme.breakpoints.down("md"));
 
  return (
    <Box data-aos="fade-left" sx={{ position: "relative" }} className="group">
      <img
        src={element?.image_path}
        alt="img"
        loading="lazy"
        style={{
          borderRadius: "5px",
          width: "100%",
          height: "250px",
          objectFit: "cover",
        }}
        className=" brightness-75"
      />

      <Box
        sx={{
          position: "absolute",
          top: "0",
          left: "0",
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, #A3DEFF 100%)",
          width: "100%",
          height: "100%",
        }}
      >
        <GlobalDisplayFlexColumnBox
          width={"90%"}
          sx={{
            mx: "auto",
            height: "100%",
            justifyContent: "flex-end",
            py: "15px",
            gap: { md: "16px", xs: "5px" },
          }}
          alignItems={"flex-start"}
        >
          <Typography
            sx={{ fontSize: { md: "20px", xs: "16px" }, fontWeight: "500" }}
          >
            {element?.name}
          </Typography>
          <Typography
            sx={{ fontSize: { md: "16px", xs: "12px" }, fontWeight: "400" }}
          >
            {element?.description}
          </Typography>

          <GlobalButton
            service
            className="    hidden    group-hover:flex  duration-1000"
            sx={{
              color: "white",
              backgroundColor: theme.palette.primary.main,
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: "4px",
              fontSize: { md: "16px", xs: "12px" },
            }}
            px={!issmall ? "25px" : "10px"}
            py={!issmall ? "10px" : "6px"}
            onClick={() => {
              if (area) {
                router.push(`/products?service_id=${element?.id}`);
              } else {
                setServiceId(element?.id)
                setOpenOrderDialog(true);
              }
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
          >
            {t("Get the Service")}
          </GlobalButton>
        </GlobalDisplayFlexColumnBox>
      </Box>
    </Box>
  );
};

export default SeviceCard;
