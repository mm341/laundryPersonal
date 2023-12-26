import {
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import ProductsInOrderCard from "./ProductsInOrderCard";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useTranslation } from "react-i18next";
const OrderCardTopSection = ({
  openProductsDetails,
  setOpenProductsDetails,
}: {
  openProductsDetails: boolean;
  setOpenProductsDetails: (e: boolean) => void;
}) => {
  //  hooks
  const { t } = useTranslation();
  return (
    <GlobalDisplayFlexColumnBox width={"100%"} gap={"5px"} >
      <GlobalDisplayFlexBox style={{flexDirection:"row"}} sx={{ p: "18px" }} >
        <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
          {t("Items")} (4)
        </Typography>
        {/*  handel click on arrow */}
        {!openProductsDetails ? (
          <ArrowDropDownIcon
            onClick={() => setOpenProductsDetails(true)}
            sx={{ cursor: "pointer" }}
          />
        ) : (
          <ArrowDropUpIcon
            onClick={() => setOpenProductsDetails(false)}
            sx={{ cursor: "pointer" }}
          />
        )}
      </GlobalDisplayFlexBox>
      <Divider sx={{ width: "100%" }} orientation="horizontal" />
      {/*  case of open  product details */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        
        }}
      >
        <ProductsInOrderCard openProductsDetails={openProductsDetails} />
      </Box>
    </GlobalDisplayFlexColumnBox>
  );
};

export default OrderCardTopSection;
