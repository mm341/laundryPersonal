import { GlobalDisplayFlexColumnBox } from "@/styles/PublicStyles";
import { Box, Typography, alpha, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface OrderData {
  key: string;
  value: string;
}
const BottomOrderDetailsSection = () => {
  //  hooks
  const theme = useTheme();

  const { t } = useTranslation();
  //  order data
  const orderDetailsData: OrderData[] = [
    { key: "Order Date", value: "28 Nov, 2023 16:04" },
    { key: "Pick Up at", value: "28 Nov, 2023 16:04" },
    { key: "Delivery at", value: "28 Nov, 2023 16:04" },
    { key: "Order Status", value: "Delivered" },
    { key: "Payment Status", value: "Paid" },
    { key: "Sub total", value: "32.00 SAR" },
    { key: "Delivery Charge", value: "32.00 SAR" },
    { key: "Discount", value: "32.00 SAR" },
  ];
  return (
    <Box sx={{ px: "18px" }}>
      <GlobalDisplayFlexColumnBox width={"100%"} gap={"20px"}>
        {orderDetailsData?.map((e: OrderData, i: number) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              flexDirection: {sm:"row",xs:"column"},
              justifyContent: "space-between",
              alignItems: {sm:"center",xs:"flex-start"},
            }}
          >
            <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
              {t(e?.key)}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                color: alpha("#272727", 0.6),
              }}
            >
              {e?.value}
            </Typography>
          </Box>
        ))}
        {/*  divider */}
        <Box
          sx={{
            width: "100%",
            height: "2px",
            border: "1px dashed  ",
            color: alpha("#272727", 0.4),
          }}
        ></Box>

        {/*  total price */}

        <Box
          sx={{
            display: "flex",
            flexDirection: {sm:"row",xs:"column"},
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
            {t("Total")}
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            40.00 SAR
          </Typography>
        </Box>
      </GlobalDisplayFlexColumnBox>
    </Box>
  );
};

export default BottomOrderDetailsSection;
