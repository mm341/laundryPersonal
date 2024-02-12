import { OrdersInterface } from "@/interfaces/OrdersInterface";
import { useAppSelector } from "@/redux/store";
import { GlobalDisplayFlexColumnBox } from "@/styles/PublicStyles";
import { Box, Typography, alpha, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface OrderData {
  key: string;
  value: string | number;
}
const BottomOrderDetailsSection = ({ order }: { order: OrdersInterface }) => {
  //  hooks

  const { t } = useTranslation();

  const { master } = useAppSelector((state) => state.master);
  //  order data
  const orderDetailsData: OrderData[] = [
    { key: "Order ID", value: `#${order?.order_code}` },
    { key: "Order Date", value: order?.ordered_at },
    { key: "Pick Up at", value: order?.pick_date },
    { key: "Delivery at", value: order?.delivery_date },
    { key: "Order Status", value: order?.order_status },
    { key: "Payment Status", value: order?.payment_status },
    { key: "Sub total", value: `${order?.sub_total} ${master?.currency}` },
    {
      key: "Delivery Charge",
      value: `${order?.delivery_charge} ${master?.currency}`,
    },
    { key: "Discount", value: `${order?.discount} ${master?.currency}` },
  ];

  //  handel order status color
  const OrderActionStatus = (order: OrdersInterface, element: string) => {
    let color;

    if (element !== "Order Status") {
      color = alpha("#272727", 0.6);
    } else {
      if (
        order?.order_status === "cancelled" ||
        order?.order_status === "Order confirmed" ||
        order?.order_status === "Picked your order" ||
        order?.order_status === "Pending" ||
        order?.order_status === "Processing" ||
        order?.order_status === "قيد الانتظار" ||
        order?.order_status === "تم تاكيد الطلب" ||
        order?.order_status === "اختار طلبك" ||
        order?.order_status === "يعالج"
      ) {
        color = "#FFA412";
      } else if (order?.order_status === "Delivered"||order?.order_status === "تم التوصيل") {
        color = "#00A53C";
      } else if (order?.order_status === "Cancelled"||order?.order_status === "ألغيت") {
        color = "#8E1400";
      }
    }

    return color;
  };
  return (
    <Box sx={{ px: "18px" }}>
      <GlobalDisplayFlexColumnBox width={"100%"} gap={"20px"}>
        {orderDetailsData?.map((e: OrderData, i: number) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              flexDirection: { sm: "row", xs: "column" },
              justifyContent: "space-between",
              alignItems: { sm: "center", xs: "flex-start" },
            }}
          >
            <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
              {t(e?.key)}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                color: OrderActionStatus(order, e?.key),
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
            flexDirection: { sm: "row", xs: "column" },
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
            {order?.total_amount} {master?.currency}
          </Typography>
        </Box>
      </GlobalDisplayFlexColumnBox>
    </Box>
  );
};

export default BottomOrderDetailsSection;
