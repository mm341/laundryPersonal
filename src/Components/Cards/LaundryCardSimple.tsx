import {
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import dumyImg from "../../../public/DumyImg/fakeIcon.svg";
import { cardInterface } from "@/interfaces/HomeData";
const LaundrySimpleCard = ({ element }: { element: cardInterface }) => {
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
          src={element?.icon}
          style={{ width: "26px", height: "26px" }}
          loading="lazy"
          alt="img"
        />
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "600",
            textAlign: { sm: "left", xs: "center" },
          }}
        >
          {element?.title}
        </Typography>
      </GlobalDisplayFlexBox>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: "400",
          textAlign: { sm: "left", xs: "center" },
        }}
      >
        {element?.body}
      </Typography>
    </GlobalDisplayFlexColumnBox>
  );
};

export default LaundrySimpleCard;
