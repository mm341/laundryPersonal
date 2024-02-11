import { Box } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import BannerCard from "./BannerCard";
import { useAppSelector } from "@/redux/store";
import Slider from "react-slick";
import arrow1 from "../../../public/products/carouselArrowRight.svg";
import arrow2 from "../../../public/products/carouselArrowLeft.svg";
const BannersSection = () => {
  //  hooks
  const { banners } = useAppSelector((state) => state.services);
  //  carousel settings
  let settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // pauseOnHover: true,
    // autoplay: true,

    // autoplaySpeed: 1000,
    // cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow({ onClick }: { onClick?: any }) {
    return (
      <div
        className="  absolute top-[40%]  z-50 cursor-pointer lg:right-[-60px] right-[30px] "
        onClick={onClick}
      >
        <img src={arrow1?.src} alt="arrow2" loading="lazy" />
      </div>
    );
  }

  function SamplePrevArrow({ onClick }: { onClick?: any }) {
    return (
      <div
        className="  absolute top-[40%] lg:left-[-30px] sm:left-[-10px] left-[30px] z-50 cursor-pointer"
        onClick={onClick}
      >
        <img src={arrow2?.src} alt="arrow1" loading="lazy" />
      </div>
    );
  }
  return (
    banners?.length > 0 && (
      <Slider {...settings}>
        {banners?.map((banner, i: number) => (
          <Box key={i} sx={{ width: "100%" }}>
            <BannerCard banner={banner} />
          </Box>
        ))}
      </Slider>
    )
  );
};

export default BannersSection;
