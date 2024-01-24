import React from "react";

import { useSelector } from "react-redux";

import { Box } from "@mui/material";
import Image from "next/image";
import { Banners } from "@/interfaces/ServiceBanners";

const BannerCard = ({ banner }: { banner: Banners }) => {
  return (
    <Box
      sx={{
        width: "100%",
        cursor: "pointer",
        mt: { md: "0", xs: "20px" },
      }}
    >
      {banner?.image_path && (
        <img
          src={banner?.image_path}
          alt={"bannerImg"}
         
          style={{
            height: "447px",
            borderRadius: "8px",
            cursor: "pointer",
            width:"100%"
          }}
          loading="lazy"
        />
      )}
    </Box>
  );
};

export default BannerCard;
