import {
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import dumyImg from "../../../public/DumyImg/fakeIcon.svg";
const LaundrySimpleCard = () => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <GlobalDisplayFlexColumnBox
      width={"100%"}
      sx={{
        mx: "auto",
        height: "100%",
        justifyContent: "flex-end",
      }}
      gap={"12px"}
    >
      <GlobalDisplayFlexBox
        sx={{ gap: "8px", alignItems: "center", justifyContent: "flex-start" }}
      >
        <img
          src={dumyImg?.src}
          style={{ width: "26px", height: "26px" }}
          loading="lazy"
          alt="img"
        />
        <Typography sx={{ fontSize: "20px", fontWeight: "600",textAlign:{sm:"left",xs:"center"} }}>
          HOUSEHOLD ITEMS
        </Typography>
      </GlobalDisplayFlexBox>
      <Typography sx={{ fontSize: "16px", fontWeight: "400",textAlign:{sm:"left",xs:"center"} }}>
        No more wasting time going to the laundromat or having a tedious laundry
        day, as we receive your clothes and deliver them to you quickly!
      </Typography>
    </GlobalDisplayFlexColumnBox>
  );
};

export default LaundrySimpleCard;
