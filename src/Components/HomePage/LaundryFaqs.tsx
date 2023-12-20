import { GlobalDisplayFlexColumnBox } from "@/styles/PublicStyles";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import GlobalTypography from "./GlobalTypography";

import PublicContainer from "../PublicContainer";
import FaqCard from "../FaqCard";

const LaundryFaqs = () => {
  const array = [
    {
      question: "h1",
      answer: "h2",
    },
    {
      question: "h3",
      answer: "h4",
    },
    {
      question: "h5",
      answer: "h6",
    },
    {
      question: "h7",
      answer: "h8",
    },
    {
      question: "h9",
      answer: "h10",
    },
   
  ];
  return (
    <PublicContainer>
      <GlobalDisplayFlexColumnBox width={"100%"} gap={"75px"}>
        <GlobalTypography text={"FAQ"} />

        <Box
          sx={{
            width: "65%",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          {array?.map((e, i) => (
            <FaqCard i={i} e={e} key={i} />
          ))}
        </Box>
      </GlobalDisplayFlexColumnBox>
    </PublicContainer>
  );
};

export default LaundryFaqs;
