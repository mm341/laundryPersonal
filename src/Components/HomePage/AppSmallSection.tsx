import { GlobalDisplayFlexBox } from "@/styles/PublicStyles";
import React from "react";
import googleplay from "../../../public/HomePage/google play.png";
import appleplay from "../../../public/HomePage/App store.png";
import { useAppSelector } from "@/redux/store";
const AppSmallSection = ({ firstSection }: { firstSection?: boolean }) => {
  //  master data
  const { master } = useAppSelector((state) => state.master);
  return (
    <GlobalDisplayFlexBox
      style={{ flexDirection: "row" }}
      sx={{
        gap: "20px",
        justifyContent: "flex-start",
        flexDirection: "row",
        mb: firstSection ? "50px" : "0",
        transform: firstSection
          ? { sm: "translateX(0px)", xs: "translateX(-10px)" }
          : "translateX(0px)",
      }}
    >
      <a href={master?.android_url} target="_blank">
        <img
          style={{ cursor: "pointer" }}
          src={googleplay?.src}
          loading="lazy"
          alt="img"
        />
      </a>
      <a href={master?.ios_url} target="_blank">
        <img
          style={{ cursor: "pointer" }}
          src={appleplay?.src}
          loading="lazy"
          alt="img"
        />
      </a>
    </GlobalDisplayFlexBox>
  );
};

export default AppSmallSection;
