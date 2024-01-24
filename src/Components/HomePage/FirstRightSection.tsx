import { Box } from "@mui/material";
import React from "react";
import rightPhotoSection from "../../../public/HomePage/huge img.webp";
const FirstRightSection = () => {
  
  return (
    <Box
      data-aos="fade-left"
      sx={{
        width: { md: "50%", xs: "100%" },
        height: { sm: "710px", xs: "350px" },
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <img
        alt="img"
        loading="lazy"
        src={rightPhotoSection?.src}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </Box>
  );
};

export default FirstRightSection;
