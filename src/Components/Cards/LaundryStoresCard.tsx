import {
  GlobalButton,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const LaundryStoreCard = () => {
  const theme = useTheme();
  return (
    <GlobalDisplayFlexColumnBox
      width={"90%"}
      sx={{ mx: "auto" }}
      gap={"15px"}
      alignItems={"Center"}
    >
      <img
        style={{ width: "150px", height: "150px", borderRadius: "100%" }}
        loading="lazy"
        alt="img"
        src={"http://laundry.razinsoft.com/images/store1.jpg"}
      />
      <Typography sx={{ textAlign: "center" }}>
        Located in the Dhanmondi area of Dhaka, adjacent to the picturesque
        Dhanmondi Lake
      </Typography>
      <Typography
        sx={{ textAlign: "center", color: theme.palette.primary.main ,fontWeight:"500"}}
      >
        Google Maps
      </Typography>
    </GlobalDisplayFlexColumnBox>
  );
};

export default LaundryStoreCard;
