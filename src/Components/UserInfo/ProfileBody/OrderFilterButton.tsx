import { RTL } from "@/Components/GlobalComponent/RTL/RTL";
import { Button, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const OrderFilterButton = ({
  setType,
  type,
  FilterType,
  value
}: {
  setType: (e: string) => void;
  type: string;
  FilterType: string;
  value:string
}) => {
  //  hooks
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Button
      style={{
        backgroundColor:
          type === FilterType ? theme.palette.primary.main : "white",
      }}
      sx={{
        "&:hover": {
          backgroundColor:
            type === FilterType ? theme.palette.primary.main : "white",
        },
        backgroundColor:
          type === FilterType ? theme.palette.primary.main : "white",
        width: { xs: "34%", sm: "185px" },
        height: "40px",
        color: type === FilterType ? "white" : theme.palette.primary.main,
        fontSize: { sm: "16px", xs: "10px" },
      }}
      onClick={() => {
        setType(FilterType);
      }}
    >
      {t(value)}
    </Button>
  );
};

export default OrderFilterButton;
