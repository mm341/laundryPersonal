import { Box } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import BannerCard from "./BannerCard";
import { useAppSelector } from "@/redux/store";

const BannersSection = () => {
  //  hooks
  const { banners } = useAppSelector((state) => state.services);
  //   const classes = useStyles();
  return (
    banners?.length > 0 && (
      <Carousel
        sx={{
          "& .mui-style-1m9128y": {
            textAlign: "center !important",
            marginTop: "25px !important",
          },
          "& .rtl-1abc02a": {
            backgroundColor: "#494949 !important",
          },
        }}
        animation={"slide"}
        duration={200}
        swipe={true}
        navButtonsAlwaysVisible={true}
      >
        {banners?.map((banner, i: number) => (
          <Box key={i} sx={{ width: "100%" }}>
            <BannerCard banner={banner} />
          </Box>
        ))}
      </Carousel>
    )
  );
};

export default BannersSection;
