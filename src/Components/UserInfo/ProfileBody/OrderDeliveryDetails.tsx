import {
  CustomPaperBigCard,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Divider, Typography, alpha } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { OrdersInterface } from "@/interfaces/OrdersInterface";
import addresseIcon from "../../../../public/order/addresseIcon.svg";
import customerIcon from "../../../../public/order/customerIcon.svg";
import phoneIcon from "../../../../public/order/phoneiCON.svg";
import { useRouter } from "next/router";
const OrderDeliveryDetails = ({
  orderData,
}: {
  orderData: OrdersInterface;
}) => {
  //  hooks

  const { t } = useTranslation();

  const { locale } = useRouter();
  return (
    <CustomPaperBigCard sx={{ backgroundColor: "white", px: "28px" }}>
      <GlobalDisplayFlexColumnBox gap={"24px"}>
        {/*  addresse details */}
        <GlobalDisplayFlexColumnBox width={"100%"} gap={"15px"}>
          <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
            {t("Delivery Address")}
          </Typography>

          <Box sx={{ display: "flex", gap: "13px", alignItems: "flex-start" }}>
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
                {locale === "en"
                  ? `${orderData?.address?.street} ${t("Street")} ,
                ${orderData?.address?.apartment_no} ${t("Apartment")} ,
                ${orderData?.address?.building_no} ${t("Building")} ,
                ${orderData?.address?.floor_no} ${t("Floor")}`
                  : `${t("Street")} ${orderData?.address?.street}, 
                  ${t("Apartment")} ${orderData?.address?.apartment_no},
                  ${t("Building")} ${orderData?.address?.building_no}, 
                  ${t("Floor")} ${orderData?.address?.floor_no}`}
              </Typography>
            </GlobalDisplayFlexColumnBox>
          </Box>
        </GlobalDisplayFlexColumnBox>

        <Divider orientation="horizontal" />
        {/*  customer details */}
        <GlobalDisplayFlexColumnBox width={"100%"} gap={"15px"}>
          <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
            {t("Personal Info")}
          </Typography>

          {/*  name */}
          <GlobalDisplayFlexBox
            sx={{ justifyContent: "flex-start", gap: "13px" }}
          >
            <img loading="lazy" alt="img" src={customerIcon?.src} />
            <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
              {t("Name")} :{" "}
              <Typography
                sx={{ fontSize: "14px", fontWeight: "400" }}
                component={"span"}
              >
                {orderData?.customer?.name}
              </Typography>
            </Typography>
          </GlobalDisplayFlexBox>

          {/*  phone */}
          <GlobalDisplayFlexBox
            sx={{ justifyContent: "flex-start", gap: "13px" }}
          >
            <img loading="lazy" alt="img" src={phoneIcon?.src} />
            <Typography  sx={{ fontSize: "14px", fontWeight: "500" }}>
              {t("Phone Number")} :{" "}
              <Typography
              dir="ltr"
                sx={{ fontSize: "14px", fontWeight: "400" }}
                component={"span"}
              >
                {orderData?.customer?.mobile}
              </Typography>
            </Typography>
          </GlobalDisplayFlexBox>
        </GlobalDisplayFlexColumnBox>
      </GlobalDisplayFlexColumnBox>
    </CustomPaperBigCard>
  );
};

export default OrderDeliveryDetails;
