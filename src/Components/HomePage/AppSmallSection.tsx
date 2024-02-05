import { GlobalDisplayFlexBox } from "@/styles/PublicStyles";
import React from "react";
import googleplay from "../../../public/HomePage/google play.png";
import appleplay from "../../../public/HomePage/App store.png";
const AppSmallSection = ({ firstSection }: { firstSection?: boolean }) => {
  return (
    <GlobalDisplayFlexBox
      style={{ flexDirection: "row" }}
      sx={{
        gap: "20px",
        justifyContent: "flex-start",
        flexDirection: "row",
        mb: firstSection ? "50px" : "0",
        transform: firstSection ? {sm:"translateX(0px)",xs:"translateX(-10px)"} : "translateX(0px)",
      }}
    >
      <img
        style={{ cursor: "pointer" }}
        src={googleplay?.src}
        loading="lazy"
        alt="img"
      />
      <img
        style={{ cursor: "pointer" }}
        src={appleplay?.src}
        loading="lazy"
        alt="img"
      />
    </GlobalDisplayFlexBox>
  );
};

export default AppSmallSection;
