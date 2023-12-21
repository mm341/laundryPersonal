import { GlobalDisplayFlexColumnBox } from "@/styles/PublicStyles";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import GlobalTypography from "./GlobalTypography";
import SeviceCard from "../Cards/SeviceCard";
import PublicContainer from "../PublicContainer";
import AreaDialog from "../Dialogs/AreaDialog";
import LaundrySimpleCard from "../Cards/LaundryCardSimple";

const LaundrySimpleSection = () => {
  const array = [...Array(6)];

  return (
    <PublicContainer>
      <GlobalDisplayFlexColumnBox width={"100%"} gap={"72px"}>
        <GlobalTypography text={"Laundry become simple"} />
        <Grid container spacing={3}>
          {array?.map((e, i) => (
            <Grid key={i} item md={4} sm={6} xs={12}>
              <LaundrySimpleCard />
            </Grid>
          ))}
        </Grid>
      </GlobalDisplayFlexColumnBox>
    </PublicContainer>
  );
};

export default LaundrySimpleSection;
