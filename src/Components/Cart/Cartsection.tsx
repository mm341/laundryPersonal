import {
  GlobalButton,
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
import SimpleBar from "simplebar-react";
import CouponSection from "./CouponSection";
import SummarySection from "./SummarySection";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import AuthModal from "../AuthBox/AuthModel";
import { AdditionalServicesInterface } from "@/interfaces/AddtionalServicesInterface";
import AdditionalServicesSection from "./AdditionalServicesSection";
import { number } from "yup";

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

  const router = useRouter();
  const [authModalOpen, setOpen] = useState<boolean>(false);
  const [couponValue, setCouponValue] = useState<string>("");
  const [modalFor, setModalFor] = useState<string>("sign-in");
  const { master } = useAppSelector((state) => state.master);

  const array = [...Array(8)];

  //  get token from localstorage

  let token: string | null | undefined = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  //  custom design of scrollbar
  const ScrollbarRoot = styled(SimpleBar)`
    .simplebar-scrollbar::before {
      width: 6px;

      background-color: #d9d9d9;
    }
  `;
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
          <Typography sx={{ px: "20px", fontSize: "16px", fontWeight: "500" }}>
            {t("Cart")} (6)
          </Typography>

          {/*  products */}

          <ScrollbarRoot
            style={{
              maxHeight: "500px",
            }}
          >
            <GlobalDisplayFlexColumnBox
              sx={{ my: "15px" }}
              px={"20px"}
              gap={"16px"}
            >
              {array?.map((e, i: number) => (
                <ProductCardInCart key={i} />
              ))}
            </GlobalDisplayFlexColumnBox>
          </ScrollbarRoot>

          <Divider orientation="horizontal" />
          {/*  additional services section */}
          <AdditionalServicesSection
            choicesIds={choicesIds}
            setChoicesIds={setChoicesIds}
            additionalSercvices={additionalSercvices}
          />

          {/*  coupon section */}
          <CouponSection
            token={token}
            couponValue={couponValue}
            setCouponValue={setCouponValue}
          />
          <SummarySection />

          <Stack width={"100%"} px={"18px"}>
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
                  router.push("/checkout");
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
                  (40.00 {master?.currency})
                </Typography>
                <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
                  {t("CheckOut")}
                </Typography>
              </Stack>
            </GlobalButton>
          </Stack>
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
