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
import React, { useEffect, useState } from "react";
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
import DeleteDialog from "../DeleteDialogs";
const Cartsection = ({
  additionalSercvices,
}: {
  additionalSercvices: AdditionalServicesInterface[];
}) => {
  // hooks
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { locale } = useRouter();
  const [authModalOpen, setOpen] = useState<boolean>(false);
  const [openDeleteCart, setOpenDeleteCart] = useState<boolean>(false);

  const [modalFor, setModalFor] = useState<string>("sign-in");
  const { master } = useAppSelector((state) => state.master);
  const { cartList, isloading, isloadingDeleteCart } = useAppSelector(
    (state) => state.cartList
  );

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

  const handelClearCart = (id: string) => {
    dispatch(DeleteCart({ id: id })).then((promiseResponse) => {
      if (promiseResponse.meta.requestStatus === "fulfilled") {
        setOpenDeleteCart(false);
      }
    });
  };

  useEffect(() => {
    if (cartList?.cart_details?.products?.length === 0) {
      localStorage.setItem("coupon", "");
    }
  }, [cartList]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 0px 4px 0px #0000001F",
          borderRadius: "8px",

          py: "20px",
        }}
      >
        <GlobalDisplayFlexColumnBox width={"100%"} gap={"30px"}>
          <GlobalDisplayFlexBox
            sx={{ justifyContent: "space-between", px: "20px" }}
          >
            <GlobalDisplayFlexBox
              style={{ flexDirection: "row", gap: "5px" }}
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
                style={{ flexDirection: "row", gap: "5px" }}
                onClick={() => setOpenDeleteCart(true)}
                sx={{
                  justifyContent: { md: "flex-end", xs: "flex-start" },
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

          {/*  summary section  */}
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
                    cursor: "default",
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
        checkOut
        open={authModalOpen}
        modalFor={modalFor}
        setModalFor={setModalFor}
        handleClose={handleCloseAuthModal}
      />
      {openDeleteCart && (
        <DeleteDialog
          size={25}
          handelAction={() => handelClearCart(cartList?.cart_details?.cart_id)}
          Cancel={"Cancel"}
          header={"Clear Cart?"}
          openDeleteDialog={openDeleteCart}
          setOpenDeleteDialog={setOpenDeleteCart}
          text={"Are you sure you want to Clear Cart"}
          primaryButtonText={"Yes"}
          loading={isloadingDeleteCart}
        />
      )}
    </>
  );
};

export default Cartsection;
