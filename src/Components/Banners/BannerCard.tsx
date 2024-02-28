import React from "react";

import { useSelector } from "react-redux";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import backGroundImg from "../../../public/products/baneerBackground.svg";
import { Banners } from "@/interfaces/ServiceBanners";
import {
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";

const BannerCard = ({ banner }: { banner: Banners }) => {
  // hooks
  const theme = useTheme();
  const issmall = useMediaQuery(theme.breakpoints.down("lg"));
  const isxsmall = useMediaQuery(theme.breakpoints.down("md"));

  
  return (
    <GlobalDisplayFlexBox sx={{ position: "relative" }}>
      <GlobalDisplayFlexBox
        style={{ flexDirection: "row", height: "100%",gap:"50px" }}
        sx={{
          width: "100%",
          position: "absolute",
          // mt: { md: "0", xs: "20px" },
          gap: "50px",
          justifyContent: "center",
        }}
      >
        {banner?.image_path && (
          <img
            src={banner?.image_path}
            alt={"bannerImg"}
            style={{
              height:!isxsmall?"200px":"60px",
              borderRadius: "8px",

              width:  "250px",
            }}
            loading="lazy"
          />
        )}
        <GlobalDisplayFlexColumnBox
          sx={{
            width: { sm: "50%", xs: "100%" },
            alignItems: "center",
            transform: {
              md: "translate(120px,15px)",
              xs: "translate(0px,0px)",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "70px", md: "25px", xs: "18px" },
              fontWeight: "1000",
              color: theme.palette.primary.main,
            }}
          >
            {banner?.title}
          </Typography>
          <Typography
            sx={{
              fontSize: { lg: "32px", md: "20px", xs: "12px" },
              fontWeight: "300",
            }}
          >
            {banner?.description}
          </Typography>
        </GlobalDisplayFlexColumnBox>
      </GlobalDisplayFlexBox>
      <img style={{ width: "100%" }} src={backGroundImg?.src} loading="lazy" />
    </GlobalDisplayFlexBox>
  );
};

export default BannerCard;
