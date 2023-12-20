import { GlobalDisplayFlexColumnBox } from "@/styles/PublicStyles";
import { Box, Grid } from "@mui/material";
import React from "react";
import GlobalTypography from "./GlobalTypography";
import PublicContainer from "../PublicContainer";
import GlobalLaundryCard from "../Cards/WorklaaundryCard";
import stepPhoto from "../../../public/HomePage/stepPhoto.png";
const WorkLaundry = () => {
  const array = [...Array(3)];
  return (
    <PublicContainer>
      <GlobalDisplayFlexColumnBox width={"100%"} gap={"72px"}>
        <GlobalTypography text={"How It Work"} />
        <Box
          sx={{
            width: { md: "100%", xs: "70%" },
            display: "flex",
            justifyContent: "center",
            mx: "auto",
          }}
        >
          <img src={stepPhoto?.src} loading="lazy" alt="stepImg" />
        </Box>
        <Grid container spacing={3}>
          {array?.map((e, i) => (
            <Grid key={i} item md={4} sm={6} xs={12}>
              <GlobalLaundryCard />
            </Grid>
          ))}
        </Grid>
      </GlobalDisplayFlexColumnBox>
    </PublicContainer>
  );
};

export default WorkLaundry;
