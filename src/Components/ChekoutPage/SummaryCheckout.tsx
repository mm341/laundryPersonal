import { useAppSelector } from "@/redux/store";
import { GlobalDisplayFlexColumnBox } from "@/styles/PublicStyles";
import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const SummaryCheckout = () => {
  //  hooks
  const { t } = useTranslation();

  //  master data
  const { master } = useAppSelector((state) => state.master);
  //  cartList data
  const { cartList } = useAppSelector((state) => state.cartList);
  return (
    <GlobalDisplayFlexColumnBox width={"100%"}>
      <GlobalDisplayFlexColumnBox width={"100%"} gap={"8px"}>
        {/*  sub total value */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            {t("Subtotal")}
          </Typography>
          <Typography>
            {cartList?.sub_total} {master?.currency}
          </Typography>
        </Box>
        {/* Delivery Charge */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            {t("Delivery Charge")}
          </Typography>
          <Typography>
            {cartList?.delivery_fee} {master?.currency}
          </Typography>
        </Box>
        {/* Discount*/}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            {t("Discount")}
          </Typography>
          {/* <Typography>323 {master?.currency}</Typography> */}
        </Box>

        {/* Total*/}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {t("Total")}
          </Typography>
          <Typography>
            {cartList?.total_order_amount} {master?.currency}
          </Typography>
        </Box>
      </GlobalDisplayFlexColumnBox>
    </GlobalDisplayFlexColumnBox>
  );
};

export default SummaryCheckout;
