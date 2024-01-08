import {
  CustomPaperBigCard,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Typography, alpha } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import addresseIcon from "../../../../public/info/addresse.svg";
import { OrdersInterface } from "@/interfaces/OrdersInterface";
const OrderDeliveryDetails = ({
  orderData,
}: {
  orderData: OrdersInterface;
}) => {
  //  hooks
  
  const { t } = useTranslation();
  return (
    <CustomPaperBigCard sx={{ backgroundColor: "white" }}>
      <GlobalDisplayFlexColumnBox
        width={"100%"}
        gap={"15px"}
        sx={{ p: "18px" }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
          {t("Delivery Address")}
        </Typography>

        <Box sx={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
          <img
            src={addresseIcon?.src}
            loading="lazy"
            alt="img"
            style={{ width: "18px", height: "20px" }}
          />

          <GlobalDisplayFlexColumnBox width={"100%"} gap={"8px"}>
            <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
              {orderData?.address?.address_name}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                color: alpha("#272727", 0.6),
              }}
            >
              {orderData?.address?.area} area {orderData?.address?.house_no}{" "}
              Apartment, {orderData?.address?.flat_no} Floor,{" "}
              {orderData?.address?.block} Building
            </Typography>
          </GlobalDisplayFlexColumnBox>
        </Box>
      </GlobalDisplayFlexColumnBox>
    </CustomPaperBigCard>
  );
};

export default OrderDeliveryDetails;
