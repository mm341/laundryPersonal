import { AddToCart, GetCartDetails } from "@/redux/slices/CartSlice";
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

  const { isloading } = useAppSelector((state) => state.cartList);
  return (
    <GlobalDisplayFlexBox sx={{justifyContent:"flex-start",gap:"15px",width:{md:"51%",xs:"100%"}}} >
      <TextField
       dir="ltr"
        value={couponValue}
        onChange={(e) => setCouponValue(e.target.value)}
        sx={{ width: { md: "71%", xs: "100%" }, borderRadius: "4px" }}
        size="small"
        placeholder={t("Enter Coupon")}
        disabled={isloading}
      />
      {!isloading ? (
        <GlobalButton
          onClick={() => {
            if (couponValue) {
              if (token) {
                dispatch(
                  GetCartDetails({
                    coupon: couponValue,
                  })
                ).then((promiseResponse) => {
                  if (promiseResponse?.payload?.data?.cart_details?.cart_id) {
                    localStorage.setItem("coupon", couponValue);
                    toast.success(t("Coupon Applied Successfully"))
                  }
                });
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
