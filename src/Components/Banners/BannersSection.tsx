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
        animation={"slide"}
        duration={200}
        swipe={true}
        navButtonsAlwaysVisible={true}
      >
        {banners?.map((banner, i: number) => (
          <Box sx={{ width: "100%" }}>
            <BannerCard banner={banner} key={i} />
          </Box>
        ))}
      </Carousel>
    )
  );
};

export default BannersSection;
