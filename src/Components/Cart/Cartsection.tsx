import {
  GlobalButton,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import {
  Box,
  Divider,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ProductCardInCart from "../Cards/ProductCardInCart";
import CouponSection from "./CouponSection";
import SummarySection from "./SummarySection";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import AuthModal from "../AuthBox/AuthModel";
import { AdditionalServicesInterface } from "@/interfaces/AddtionalServicesInterface";
import { Scrollbar } from "../GlobalComponent/Scrollbar";
import AdditionalServicesSectionInCart from "./AdditionalServicesSectionInCart";
import EmptyData from "../GlobalComponent/EmptyData";
import emptyProductsImg from "../../../public/products/empty products.png";
import emptyProductsArabicImg from "../../../public/products/empty productsArabic.png";
import deleteProductsImg from "../../../public/products/deleteCart.svg";
import LoadingComponent from "../GlobalComponent/LoadingComponent";
import { toast } from "react-hot-toast";
import { DeleteCart } from "@/redux/slices/CartSlice";
const Cartsection = ({
  additionalSercvices,
  choicesIds,
  setChoicesIds,
}: {
  additionalSercvices: AdditionalServicesInterface[];
  choicesIds: number[];
  setChoicesIds: (e: number[]) => void;
}) => {
  // hooks
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { locale } = useRouter();
  const [authModalOpen, setOpen] = useState<boolean>(false);
  const [couponValue, setCouponValue] = useState<string>("");
  const [modalFor, setModalFor] = useState<string>("sign-in");
  const { master } = useAppSelector((state) => state.master);
  const { cartList, isloading } = useAppSelector((state) => state.cartList);

  //  get token from localstorage

  let token: string | null | undefined = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  //  open auth model
  const handleOpenAuthModal = () => {
    setOpen(true);
    setModalFor("sign-in");
  };

  //  close auth model
  const handleCloseAuthModal = () => {
    setOpen(false);
    setModalFor("sign-in");
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 0px 4px 0px #0000001F",
          borderRadius: "4px",

          py: "20px",
        }}
      >
        <GlobalDisplayFlexColumnBox width={"100%"} gap={"30px"}>
          <GlobalDisplayFlexBox
            sx={{ justifyContent: "space-between", px: "20px" }}
          >
            <GlobalDisplayFlexBox
              sx={{ justifyContent: "flex-start", gap: "2px" }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                {t("Cart")}
              </Typography>
              <Typography>
                ({cartList?.cart_details?.products?.length})
              </Typography>
            </GlobalDisplayFlexBox>
            {/*  clear cart */}
            {cartList?.cart_details?.products?.length > 0 && (
              <GlobalDisplayFlexBox
                onClick={() =>
                  dispatch(DeleteCart({ id: cartList?.cart_details?.cart_id }))
                }
                sx={{
                  justifyContent: "flex-end",
                  gap: "5px",
                  cursor: "pointer",
                }}
              >
                <img src={deleteProductsImg?.src} loading="lazy" alt="img" />
                <Typography
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  {t("Clear Cart")}
                </Typography>
              </GlobalDisplayFlexBox>
            )}
          </GlobalDisplayFlexBox>

          {/*  products */}

          <Scrollbar
            style={{
              maxHeight: "500px",
            }}
          >
            <GlobalDisplayFlexColumnBox
              sx={{ my: "15px" }}
              px={"20px"}
              gap={"16px"}
            >
              {/*  case of exist cart products */}
              {cartList?.cart_details?.products?.length > 0 &&
                !isloading &&
                cartList?.cart_details?.products?.map((e, i: number) => (
                  <ProductCardInCart product={e} key={i} />
                ))}

              {/*  case of empty cart products */}
              {!isloading && cartList?.cart_details?.products?.length === 0 && (
                <EmptyData
                  img={
                    locale === "en"
                      ? emptyProductsImg?.src
                      : emptyProductsArabicImg?.src
                  }
                />
              )}
              {isloading && cartList?.cart_details?.products?.length === 0 && (
                <LoadingComponent />
              )}
            </GlobalDisplayFlexColumnBox>
          </Scrollbar>

          <Divider orientation="horizontal" />
          {/*  additional services section */}

          <Box sx={{ px: "18px" }}>
            <AdditionalServicesSectionInCart
              additionalSercvices={additionalSercvices}
            />
          </Box>

          {/*  coupon section */}
          <CouponSection
            token={token}
            couponValue={couponValue}
            setCouponValue={setCouponValue}
          />
          <SummarySection />

          <GlobalDisplayFlexColumnBox gap={"12px"} width={"100%"} px={"18px"}>
            {Number(cartList?.total_order_amount) > master.minimum_cost && (
              <GlobalButton
                px={"0"}
                py={"0"}
                sx={{
                  width: "100%",
                  height: "48px",
                  borderRadius: "5px",
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                }}
                onClick={() => {
                  if (token) {
                    if (cartList?.cart_details?.products?.length > 0) {
                      router.push("/checkout");
                    } else {
                      toast.error(t("Add Product to your cart, at first"));
                    }
                  } else {
                    handleOpenAuthModal();
                  }
                }}
              >
                <Stack
                  direction={"row"}
                  justifyContent={"center"}
                  width={"100%"}
                  gap={"10px"}
                >
                  <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
                    ({cartList?.total_order_amount} {master?.currency})
                  </Typography>
                  <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
                    {t("CheckOut")}
                  </Typography>
                </Stack>
              </GlobalButton>
            )}
            {Number(cartList?.total_order_amount) <= master.minimum_cost && (
              <>
                <Typography
                  sx={{
                    color: theme.palette.secondary.contrastText,
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  {t("Minimum order value is")} {master.minimum_cost}{" "}
                  {master.currency}
                </Typography>

                <GlobalButton
                  px={"0"}
                  py={"0"}
                  sx={{
                    width: "100%",
                    height: "48px",
                    borderRadius: "5px",
                    backgroundColor: theme.palette.secondary.contrastText,
                    color: "white",
                  }}
                >
                  <Stack
                    direction={"row"}
                    justifyContent={"center"}
                    width={"100%"}
                    gap={"10px"}
                  >
                    <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
                      {t("CheckOut")}
                    </Typography>
                  </Stack>
                </GlobalButton>
              </>
            )}
          </GlobalDisplayFlexColumnBox>
        </GlobalDisplayFlexColumnBox>
      </Box>

      <AuthModal
        open={authModalOpen}
        modalFor={modalFor}
        setModalFor={setModalFor}
        handleClose={handleCloseAuthModal}
      />
    </>
  );
};

export default Cartsection;
