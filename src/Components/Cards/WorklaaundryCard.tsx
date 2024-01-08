import {
  GlobalButton,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { work } from "../HomePage/LaundryWork";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
const GlobalLaundryCard = ({ element }: { element: work }) => {
  //  hooks
  const { locale } = useRouter();
  const [title, setTitle] = useState<string>("");
  const [desribtion, setDesribtion] = useState<string>("");
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
      gap={"24px"}
      alignItems={"Center"}
    >
      <img
        // data-aos="fade-down"
        style={{ width: "200px", height: "200px", borderRadius: "100%" }}
        loading="lazy"
        alt="img"
        src={element?.img?.src}
      />

      <Typography
        sx={{
          textAlign: "center",
          fontSize: { sm: "20px", xs: "17px" },
          fontWeight: "600",
        }}
      >
        {title}
      </Typography>

      <Typography
        data-aos="fade-up"
        sx={{
          textAlign: "center",
          fontSize: { sm: "18px", xs: "15px" },
          fontWeight: "400",
        }}
      >
        {desribtion}
      </Typography>
    </GlobalDisplayFlexColumnBox>
  );
};

export default GlobalLaundryCard;
