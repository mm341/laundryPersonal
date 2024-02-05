import { AddresseType } from "@/interfaces/AddresseTypeInterface";
import { GlobalDisplayFlexBox } from "@/styles/PublicStyles";
import { Typography, useTheme } from "@mui/material";
import React from "react";

const GlobalAddresseType = ({
  element,
  addresseType,
  setAddresseType,
}: {
  element: AddresseType;
  addresseType: string;
  setAddresseType: (e: string) => void;
}) => {
  const theme = useTheme();
  return (
    <GlobalDisplayFlexBox
      onClick={() => setAddresseType(element?.value)}
      sx={{
        cursor: "pointer",
        border: `2px solid ${theme.palette.primary.main}`,
        backgroundColor:
          addresseType === element?.value
            ? theme.palette.primary.main
            : "white",
        justifyContent: "center",
        gap: "10px",
        py: "10px",
        borderRadius: "4px",
      }}
    >
      <img
        src={element?.img?.src}
        style={{
          filter:
            addresseType === element?.value
              ? "invert(100%) sepia(0%) saturate(0%) hue-rotate(136deg) brightness(190%) contrast(104%)"
              : "invert(55%) sepia(93%) saturate(971%) hue-rotate(172deg) brightness(87%) contrast(93%)",
        }}
      />
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: "500",
          color:
            addresseType === element?.value
              ? "white"
              : theme.palette.primary.main,
        }}
      >
        {element?.label}
      </Typography>
    </GlobalDisplayFlexBox>
  );
};

export default GlobalAddresseType;
