import React from "react";
import { IconButton, Typography, useTheme } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "@/styles/PublicStyles";
import BasicInformation from "./BasicInformation";

const EditProfile = () => {
  //  hooks
  const theme = useTheme();
  return (
    <CustomPaperBigCard
      sx={{
        boxShadow: "box-shadow: 0px 0px 6px 0px #00000026",
        backgroundColor: theme.palette.primary.dark,
      }}
    >
      <CustomStackFullWidth spacing={1}>
        <BasicInformation />
      </CustomStackFullWidth>
    </CustomPaperBigCard>
  );
};

export default EditProfile;
