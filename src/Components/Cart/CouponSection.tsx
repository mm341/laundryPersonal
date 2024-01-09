import { AddCoupon } from "@/redux/slices/OrderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { GlobalButton, GlobalDisplayFlexBox } from "@/styles/PublicStyles";
import { CircularProgress, TextField, alpha, useTheme } from "@mui/material";
import React from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const CouponSection = ({
  couponValue,
  setCouponValue,
  token,
}: {
  couponValue: string;
  setCouponValue: (e: string) => void;
  token: string | undefined | null;
}) => {
  //  hooks
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const theme = useTheme();

  const { isLoadingCoupon } = useAppSelector((state) => state.orders);
  return (
    <GlobalDisplayFlexBox sx={{ px: "18px" }}>
      <TextField
        value={couponValue}
        onChange={(e) => setCouponValue(e.target.value)}
        sx={{ width: { md: "71%", xs: "100%" }, borderRadius: "4px" }}
        size="small"
        placeholder={t("Enter Coupon")}
        disabled={isLoadingCoupon}
      />
      {!isLoadingCoupon ? (
        <GlobalButton
          onClick={() => {
            if (couponValue) {
              if (token) {
                dispatch(
                  AddCoupon({
                    amount: 0,
                    coupon_code: couponValue,
                  })
                );
              } else {
                toast.error(t("Please Sign In , First"));
              }
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
      ) : (
        <GlobalButton
          py={""}
          px={"0"}
          width={"100px"}
          height={"40px"}
          sx={{
            borderRadius: "8px",
            backgroundColor: alpha(theme.palette.primary.main, 0.3),
            color: "white",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          <CircularProgress size={25} />
        </GlobalButton>
      )}
    </GlobalDisplayFlexBox>
  );
};

export default CouponSection;
