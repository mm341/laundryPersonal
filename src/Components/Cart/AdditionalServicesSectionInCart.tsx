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
import { AddToCart } from "@/redux/slices/CartSlice";
const AdditionalServicesSectionInCart = ({
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

  return (
    cartList?.cart_details?.additionals?.length > 0 && (
      <CustomPaperBigCard
        sx={{
          backgroundColor: "white",
        }}
      >
        <GlobalDisplayFlexColumnBox
          width={"100%"}
          gap={"17px"}
          sx={{ px: "18px" }}
        >
          <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
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
                gap: { md: "24px", xs: "32px" },
              }}
            >
              {cartList?.cart_details?.additionals?.map((e, i) => (
                <GlobalDisplayFlexBox key={i}>
                  {/*   name */}

                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    {e?.title}
                  </Typography>

                  <GlobalDisplayFlexBox
                    sx={{
                      gap: "15px",
                      justifyContent: "flex-end",
                    }}
                  >
                    {/*  price and delete */}
                    <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
                      {e?.price} {master?.currency}
                    </Typography>

                    {!isLoadingAddToCart ? (
                      <img
                        onClick={() => {
                          dispatch(
                            AddToCart({
                              additional_service_id: e?.id,
                              remove_additional: 1,
                            })
                          );
                        }}
                        src={deleteIcon?.src}
                        style={{ cursor: "pointer" }}
                        loading="lazy"
                        alt="deleteImg"
                      />
                    ) : (
                      <>
                        <Skeleton variant="text" width="20px" height={20} />
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
