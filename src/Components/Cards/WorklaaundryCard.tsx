import {
  GlobalButton,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { work } from "../HomePage/LaundryWork";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
const GlobalLaundryCard = ({ element }: { element: work }) => {
  //  hooks
  const theme = useTheme();
  const { locale } = useRouter();
  const [title, setTitle] = useState<string>("");
  const [desribtion, setDesribtion] = useState<string>("");
  const issmall = useMediaQuery(theme.breakpoints.down("md"));
  //  translate title and describtion due to language
  useEffect(() => {
    if (locale === "en") {
      setTitle(element?.title?.en);
      setDesribtion(element?.describtion?.en);
    } else {
      setTitle(element?.title?.ar);
      setDesribtion(element?.describtion?.ar);
    }
  }, [locale]);
  return (
    <GlobalDisplayFlexColumnBox
      width={"90%"}
      sx={{ mx: "auto" }}
      gap={!issmall ? "24px" : "10px"}
      alignItems={"Center"}
    >
      <img
        // data-aos="fade-down"
        style={{
          width: !issmall ? "200px" : "150px",
          height: !issmall ? "200px" : "150px",
          borderRadius: "100%",
        }}
        loading="lazy"
        alt="img"
        src={element?.img?.src}
      />

      <Typography
        sx={{
          textAlign: "center",
          fontSize: { sm: "20px", xs: "16px" },
          fontWeight: "600",
        }}
      >
        {title}
      </Typography>

      <Typography
        data-aos="fade-up"
        sx={{
          textAlign: "center",
          fontSize: { sm: "18px", xs: "14px" },
          fontWeight: "400",
        }}
      >
        {desribtion}
      </Typography>
    </GlobalDisplayFlexColumnBox>
  );
};

export default GlobalLaundryCard;
