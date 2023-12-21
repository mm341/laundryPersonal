import React from "react";
import { IconButton, Typography } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "@/styles/PublicStyles";
import BasicInformation from "./BasicInformation";

const EditProfile = () => {
  return (
    <CustomPaperBigCard>
      <CustomStackFullWidth spacing={1}>
        <BasicInformation />
      </CustomStackFullWidth>
    </CustomPaperBigCard>
  );
};

export default EditProfile;
