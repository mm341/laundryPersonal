import {
  GlobalButton,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useTranslation } from "react-i18next";

import ProductsInOrderCard from "./ProductsInOrderCard";
import OrderCardTopSection from "./OrderCardTopSection";
import {
  OrdersInterface,
  inititalOrdersInterface,
} from "@/interfaces/OrdersInterface";
import { useAppSelector } from "@/redux/store";
const OrderCard = ({
  setOrderDetails,
  order,
  setOrderData,
}: {
  setOrderDetails: (e: boolean) => void;
  setOrderData: (e: OrdersInterface) => void;
  order: OrdersInterface;
}) => {
  //  hooks

  const { t } = useTranslation();
  const theme = useTheme();

  const [productsDetails, setOpenProductsDetails] = useState<boolean>(false);
  const { master } = useAppSelector((state) => state.master);

  //  handel orderStatus color
  const OrderActionStatus = (order: OrdersInterface) => {
    let color;
    switch (order?.order_status) {
      case "Order confirmed":
      case "Picked your order":
      case "Pending":
      case "Processing":
        color = "#FFA412";
        break;
      case "Delivered":
        color = "#00A53C";
        break;
      case "Cancelled":
        color = "#8E1400";
        break;
    }

    return color;
  };

 
  return (
    <Stack
      sx={{ boxShadow: "0px 2px 4px 0px #00000014", backgroundColor: "white" }}
    >
      <GlobalDisplayFlexColumnBox width={"100%"} gap={"5px"}>
        {/*  top section  */}

        <OrderCardTopSection
          order={order}
          setOpenProductsDetails={setOpenProductsDetails}
          openProductsDetails={productsDetails}
        />

        {/*  bottom section    payment method and order date */}
        <GlobalDisplayFlexBox sx={{ p: "18px" }}>
          <GlobalDisplayFlexColumnBox
            sx={{ width: { md: "50%", xs: "100%" } }}
            gap={"20px"}
          >
            <GlobalDisplayFlexBox
              style={{ flexDirection: "row" }}
              sx={{ justifyContent: "flex-start" }}
              gap={"5px"}
            >
              <Typography
                sx={{ fontSize: { sm: "16px", xs: "12px" }, fontWeight: "500" }}
              >
                {t("Order Date")}:
              </Typography>

              <Typography
                sx={{ fontSize: { sm: "16px", xs: "12px" }, fontWeight: "400" }}
              >
                28 Nov, 2023 16:04
              </Typography>
            </GlobalDisplayFlexBox>

            <GlobalDisplayFlexBox
              style={{ flexDirection: "row" }}
              sx={{ justifyContent: "flex-start" }}
              gap={"5px"}
            >
              <Typography
                sx={{ fontSize: { sm: "16px", xs: "12px" }, fontWeight: "500" }}
              >
                {t("Payment Method")}:
              </Typography>

              <Typography
                sx={{ fontSize: { sm: "16px", xs: "12px" }, fontWeight: "400" }}
              >
                {order?.payment_type}
              </Typography>
            </GlobalDisplayFlexBox>

            <GlobalDisplayFlexBox
              style={{ flexDirection: "row" }}
              sx={{ justifyContent: "flex-start" }}
              gap={"5px"}
            >
              <Typography
                sx={{ fontSize: { sm: "16px", xs: "12px" }, fontWeight: "500" }}
              >
                {t("Total")}:
              </Typography>

              <Typography
                sx={{ fontSize: { sm: "16px", xs: "12px" }, fontWeight: "400" }}
              >
                {order?.total_amount} {master.currency}
              </Typography>
            </GlobalDisplayFlexBox>
          </GlobalDisplayFlexColumnBox>

          <GlobalDisplayFlexColumnBox
            gap={"35px"}
            sx={{
              display: "flex",
              flexDirection: { md: "column", xs: "row" },
              alignItems: { sm: "flex-end", xs: "center" },
              width: { md: "50%", xs: "100%" },
            }}
          >
            <GlobalButton
              px={"0px"}
              py={"0px"}
              sx={{
                borderRadius: "4px",
                border: `1px solid ${OrderActionStatus(order)}`,
                fontSize: "16px",
                fontWeight: "400",
                width: { sm: "170px", xs: "100px" },
                height: "40px",
                color: OrderActionStatus(order),
              }}
            >
              {order?.order_status}
            </GlobalButton>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontSize: { sm: "16px", xs: "12px" },
                fontWeight: "400",
                cursor: "pointer",
                textDecoration: "underline",
                transform: "translateX(-30px)",
              }}
              onClick={() => {
                setOrderData(order);
                setOrderDetails(true);
              }}
            >
              {t("View Details")}
            </Typography>
          </GlobalDisplayFlexColumnBox>
        </GlobalDisplayFlexBox>
      </GlobalDisplayFlexColumnBox>
    </Stack>
  );
};

export default OrderCard;
