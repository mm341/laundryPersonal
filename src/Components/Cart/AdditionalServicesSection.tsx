import { AdditionalServicesInterface } from "@/interfaces/AddtionalServicesInterface";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  CustomPaperBigCard,
  GlobalButton,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Skeleton, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Scrollbar } from "../GlobalComponent/Scrollbar";
import { AddToCart } from "@/redux/slices/CartSlice";
import arrowRight from "../../../public/products/arrowright.svg";
import { toast } from "react-hot-toast";
const AdditionalServicesSection = ({
  additionalSercvices,
}: {
  additionalSercvices: AdditionalServicesInterface[];
}) => {
  //  hooks
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { cartList, isLoadingAddToCart } = useAppSelector(
    (state) => state.cartList
  );
  //  master data
  const { master } = useAppSelector((state) => state.master);

  const handelAddButton = (e: AdditionalServicesInterface) => {
    return !isLoadingAddToCart ? (
      <GlobalButton
        py={""}
        px={"0"}
        width={"105px"}
        height={"32px"}
        sx={{
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
          border: `2px solid ${theme.palette.primary.main}`,
          color: cartList?.cart_details?.additionals
            ?.map((e) => e.id)
            .includes(e?.id)
            ? "white"
            : theme.palette.primary.main,
          fontSize: "16px",
          fontWeight: "500",
          backgroundColor: cartList?.cart_details?.additionals
            ?.map((e) => e.id)
            .includes(e?.id)
            ? theme.palette.primary.main
            : "white",
        }}
        onClick={() => {
          if (
            !cartList?.cart_details?.additionals
              ?.map((e) => e.id)
              .includes(e?.id)
          ) {
            dispatch(
              AddToCart({
                additional_service_id: e?.id,
              })
            );
          } else {
            toast.error("You Already Have This Item In Your Cart");
          }
        }}
      >
        {cartList?.cart_details?.additionals
          ?.map((e) => e.id)
          .includes(e?.id) ? (
          <img src={arrowRight?.src} loading="lazy" alt="img" />
        ) : (
          <Typography>+</Typography>
        )}{" "}
        {t("Add")}{" "}
      </GlobalButton>
    ) : (
      <Skeleton variant="text" width="50px" height={10} />
    );
  };

  return (
    additionalSercvices?.length > 0 && (
      <GlobalDisplayFlexColumnBox
        width={"100%"}
        gap={"26px"}
        sx={{ px: "18px" }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
          {t("Additional Service")}
        </Typography>
        <Scrollbar
          style={{
            maxHeight: "200px",
          }}
        >
          <GlobalDisplayFlexColumnBox
            width={"100%"}
            sx={{ width: "99%", mx: "auto", my: "5px" }}
            gap={"24px"}
          >
            {additionalSercvices?.map((e, i) => (
              <CustomPaperBigCard
                key={i}
                sx={{
                  backgroundColor: "white",
                  boxShadow: "0px 6px 20px 0px #0000001A",
                }}
              >
                <GlobalDisplayFlexBox>
                  {/*  price and name */}
                  <GlobalDisplayFlexColumnBox gap={"20px"}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "black",
                      }}
                    >
                      {e?.title}
                    </Typography>
                    <GlobalDisplayFlexBox
                      sx={{
                        gap: { md: "85px", xs: "20px" },
                        justifyContent: "flex-start",
                      }}
                    >
                      <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
                        {e?.price} {master?.currency}
                      </Typography>
                    </GlobalDisplayFlexBox>
                  </GlobalDisplayFlexColumnBox>

                  {/*  add butoon  */}
                  {handelAddButton(e)}
                </GlobalDisplayFlexBox>
              </CustomPaperBigCard>
            ))}
          </GlobalDisplayFlexColumnBox>
        </Scrollbar>
      </GlobalDisplayFlexColumnBox>
    )
  );
};

export default AdditionalServicesSection;
