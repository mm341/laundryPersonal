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
import deleteIcon from "../../../public/products/deleteButton.svg";
import { AddToCart, RemoveElement } from "@/redux/slices/CartSlice";
const AdditionalServicesSectionInCart = ({
  additionalSercvices,
  checkOut,
}: {
  additionalSercvices: AdditionalServicesInterface[];
  checkOut?: boolean;
}) => {
  //  hooks
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { cartList, isLoadingUpdateCart } = useAppSelector(
    (state) => state.cartList
  );
  //  master data
  const { master } = useAppSelector((state) => state.master);

  return (
    cartList?.cart_details?.additionals?.length > 0 && (
      <CustomPaperBigCard
        sx={{
          backgroundColor: "white",
        }}
      >
        <GlobalDisplayFlexColumnBox width={"100%"} gap={"17px"}>
          <Typography sx={{ fontSize: "16px", fontWeight: "500", px: "18px" }}>
            {t("Additional Service")}
          </Typography>
          <Scrollbar
            style={{
              maxHeight: "200px",
            }}
          >
            <GlobalDisplayFlexColumnBox
              sx={{
                width: "100%",
                mx: "auto",
                gap: { md: "24px", xs: "19px" },
                px: "18px",
              }}
            >
              {cartList?.cart_details?.additionals?.map((e, i) => (
                <GlobalDisplayFlexBox
                  sx={{ gap: { md: "0", xs: "5px" } }}
                  key={i}
                >
                  {/*   name */}

                  <GlobalDisplayFlexBox sx={{ md: "40%", xs: "100%" }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: theme.palette.secondary.contrastText,
                      }}
                    >
                      {e?.title}
                    </Typography>
                  </GlobalDisplayFlexBox>

                  <GlobalDisplayFlexBox
                    style={{ flexDirection: "row" }}
                    sx={{
                      width: { md: "50%", xs: "100%" },
                      gap: "15px",
                      justifyContent: { md: "flex-end", xs: "center" },
                    }}
                  >
                    {/*  price and delete */}
                    <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
                      {e?.quantity > 0
                        ? (e?.price * e?.quantity).toFixed(2)
                        : e?.price}{" "}
                      {master?.currency}
                    </Typography>

                    {!isLoadingUpdateCart ? (
                      !checkOut && (
                        <img
                          onClick={() => {
                            dispatch(
                              RemoveElement({
                                additional_service_id: e?.id,
                              })
                            );
                          }}
                          src={deleteIcon?.src}
                          style={{ cursor: "pointer" }}
                          loading="lazy"
                          alt="deleteImg"
                        />
                      )
                    ) : (
                      <>
                        {!checkOut && (
                          <Skeleton variant="text" width="20px" height={20} />
                        )}
                      </>
                    )}
                  </GlobalDisplayFlexBox>
                </GlobalDisplayFlexBox>
              ))}
            </GlobalDisplayFlexColumnBox>
          </Scrollbar>
        </GlobalDisplayFlexColumnBox>
      </CustomPaperBigCard>
    )
  );
};

export default AdditionalServicesSectionInCart;
