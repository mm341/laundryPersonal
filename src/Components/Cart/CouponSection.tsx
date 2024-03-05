import { AddToCart, GetCartDetails } from "@/redux/slices/CartSlice";
import { AddCoupon } from "@/redux/slices/OrderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { GlobalButton, GlobalDisplayFlexBox } from "@/styles/PublicStyles";
import {
  Box,
  CircularProgress,
  TextField,
  alpha,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
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
  const { locale } = useRouter();
  const theme = useTheme();
  const [vaildCoupon, SetValidCoupon] = useState(false);
  const { isloading } = useAppSelector((state) => state.cartList);
  return (
    <GlobalDisplayFlexBox
      sx={{
        justifyContent: "flex-start",
        gap: "15px",
        width: { md: "51%", xs: "100%" },
      }}
    >
      <Box sx={{ position: "relative", width: { md: "71%", xs: "100%" } }}>
        <TextField
          dir="ltr"
          value={couponValue}
          onChange={(e) => setCouponValue(e.target.value)}
          sx={{ width: "100%", borderRadius: "4px" }}
          size="small"
          placeholder={t("Enter Coupon")}
          disabled={isloading}
        />
        {vaildCoupon && (
          <CloseIcon
            onClick={() =>
              dispatch(
                GetCartDetails({
                  coupon: "",
                })
              ).then((promiseResponse) => {
                if (promiseResponse.payload.data?.cart_details?.cart_id) {
                  localStorage.setItem("coupon", "");
                  SetValidCoupon(false);
                  setCouponValue("");
                  toast.success(t("Coupon Removed Successfully"));
                }
              })
            }
            sx={{
              position: "absolute",
              right:locale==="en"? "10px":"90%",
              top: "7px",
              cursor: "pointer",
            }}
          />
        )}
      </Box>
      {!isloading ? (
        <GlobalButton
          onClick={() => {
            if (couponValue) {
              dispatch(
                GetCartDetails({
                  coupon: couponValue,
                })
              ).then((promiseResponse) => {
                if (promiseResponse?.payload?.data?.cart_details?.cart_id) {
                  localStorage.setItem("coupon", couponValue);
                  toast.success(t("Coupon Applied Successfully"));
                  SetValidCoupon(true);
                }
              });
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
