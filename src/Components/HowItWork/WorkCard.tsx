import { data } from "@/pages/howItWork";
import {
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const WorkCard = ({ element }: { element: data }) => {
  //  hooks

  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <GlobalDisplayFlexBox gap={"150px"}>
      <img src={element?.img?.src}    data-aos="fade-left" />

      <GlobalDisplayFlexColumnBox gap={"10px"}    data-aos="fade-right">
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontSize: {md:"64px",xs:"28px"},
            fontWeight: "500",
            textAlign:{md:"left",xs:"center"}
          }}
        >
          {t(element?.title)}
        </Typography>
        <Typography sx={{ fontSize: {md:"24px",xs:"18px"}, fontWeight: "400", textAlign:{md:"left",xs:"center"} }}>
          {t(element?.describtion)}
        </Typography>
      </GlobalDisplayFlexColumnBox>
    </GlobalDisplayFlexBox>
  );
};

export default WorkCard;
