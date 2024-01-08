import { AddCoupon } from "@/redux/slices/OrderSlice";
import { useAppDispatch } from "@/redux/store";
import { GlobalButton, GlobalDisplayFlexBox } from "@/styles/PublicStyles";
import { TextField, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const CouponSection = ({
  couponValue,
  setCouponValue,
}: {
  couponValue: string;
  setCouponValue: (e: string) => void;
}) => {
  //  hooks
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const theme = useTheme();
  return (
    <GlobalDisplayFlexBox sx={{ px: "18px" }}>
      <TextField
        value={couponValue}
        onChange={(e) => setCouponValue(e.target.value)}
        sx={{ width: { md: "71%", xs: "100%" }, borderRadius: "4px" }}
        size="small"
        placeholder={t("Enter Coupon")}
      />
      <GlobalButton
        onClick={() => {
          if (couponValue) {
            dispatch(
              AddCoupon({
                amount: 0,
                coupon_code: couponValue,
              })
            );
          }
        }}
        py={""}
        px={"0"}
        width={"100px"}
        height={"40px"}
        sx={{
          borderRadius: "8px",
          backgroundColor: theme.palette.primary.main,
          color: "white",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        {t("Apply")}
      </GlobalButton>
    </GlobalDisplayFlexBox>
  );
};

export default CouponSection;
