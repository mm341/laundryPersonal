import { GlobalDisplayFlexColumnBox } from "@/styles/PublicStyles";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import GlobalTypography from "./GlobalTypography";

import PublicContainer from "../PublicContainer";
import FaqCard from "../FaqCard";
import { HomeData } from "@/interfaces/HomeData";

const LaundryFaqs = ({ homeData }: { homeData: HomeData }) => {
 
  return (
    <PublicContainer>
      <GlobalDisplayFlexColumnBox width={"100%"} gap={"75px"}>
        <GlobalTypography text={homeData?.faqs?.section_title} />

        <Box
          sx={{
            width: { md: "65%", xs: "100%" },
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          {homeData?.faqs?.cards?.length > 0 &&
            homeData?.faqs?.cards?.map((e, i) => (
              <FaqCard i={i} element={e} key={i} />
            ))}
        </Box>
      </GlobalDisplayFlexColumnBox>
    </PublicContainer>
  );
};

export default LaundryFaqs;
