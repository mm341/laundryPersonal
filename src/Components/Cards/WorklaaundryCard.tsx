import {
  GlobalButton,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const GlobalLaundryCard = () => {
  return (
    <GlobalDisplayFlexColumnBox
      width={"90%"}
      sx={{ mx: "auto" }}
      gap={"24px"}
      alignItems={"Center"}
    >
      <img
        style={{ width: "200px", height: "200px", borderRadius: "100%" }}
        loading="lazy"
        alt="img"
        src={"http://laundry.razinsoft.com/images/work1.jpg"}
      />
      <Typography
        sx={{
          textAlign: "center",
          fontSize: {sm:"20px",xs:"17px"},
          fontWeight: "600",
        }}
      >
        Determine the schedule
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: {sm:"18px",xs:"15px"},
          fontWeight: "400",
        }}
      >
        Choose your area and the pickup and delivery times that suit you through
        our mobile or web.
      </Typography>
    </GlobalDisplayFlexColumnBox>
  );
};

export default GlobalLaundryCard;
