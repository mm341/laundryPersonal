import React from "react";

import { Divider, Stack, Typography, useMediaQuery } from "@mui/material";

import { useTranslation } from "react-i18next";

import { useTheme } from "@mui/material/styles";

import footerLogo from "../../public/footer/footerLogo.png";
import footerMail from "../../public/footer/mailicon.svg";
import footerAddresse from "../../public/footer/locationicon.svg";
import footerPhone from "../../public/footer/phonicon.svg";
import facebook from "../../public/footer/facebook.svg";
import twitter from "../../public/footer/twitter.svg";
import instagram from "../../public/footer/instagram.svg";
import googleplay from "../../public/HomePage/google play.png";
import appleplay from "../../public/HomePage/App store.png";

import PublicContainer from "./PublicContainer";
import {
  CustomFooterH1Box,
  CustomFooterH2Typography,
  CustomFooterNestedTypography,
  CustomFooterTypographyBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { useAppSelector } from "@/redux/store";
import { FooterSocialLinks } from "@/interfaces/FooterSocialLinks";
import { useRouter } from "next/router";
// import Image from "next/image";

const Footer = () => {
  //  hooks
  const { t } = useTranslation();
  const { push } = useRouter();
  const theme = useTheme();
  const issmall = useMediaQuery(theme.breakpoints.down("md"));
  const { footerLinks } = useAppSelector((state) => state.master);
  //  master data
  const { master } = useAppSelector((state) => state.master);


  return (
    <>
      <Stack
        sx={{
          backgroundColor: theme.palette.primary.main,
          py: "10px",
        }}
      >
        <PublicContainer>
          <GlobalDisplayFlexColumnBox gap={"50px"} width={"100%"}>
            <Stack
              alignItems="center"
              sx={{
                flexDirection: { md: "row", xs: "column" },
                gap: { md: "0px", xs: "65px" },
                justifyContent: "space-between",
                pt: "65px",
              }}
              direction={"row"}
              width={"100%"}
              mx={"auto"}
            >
              {/* logo side */}
              <Stack
                direction={"column"}
                width={"22%"}
                sx={{
                  width: { md: "22%", sm: "60%", xs: "80%" },
                  marginLeft: { md: "0", xs: "auto" },
                  marginRight: { md: "0", xs: "auto" },
                }}
                gap={"35px"}
              >
                <img
                  src={footerLogo?.src}
                  alt="img"
                  loading="lazy"
                  style={{
                    width: "72%",
                    height: "45%",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {t(
                    "“Alwan Elghasil” providing solutions specifically designed for cleaning laundry within the KSA."
                  )}
                </Typography>
              </Stack>

              {/*  other sections */}
              <Stack
                direction={"row"}
                // sx={{ width: { md: '70%', xs: '90%' } }}

                sx={{
                  flexWrap: { sm: "nowrap", xs: "wrap" },
                  width: { md: "70%", xs: "90%" },
                  justifyContent: { sm: "space-between" },
                  alignItems: { sm: "flex-start", xs: "baseline" },
                  flexDirection: { sm: "row", xs: "column" },
                  gap: { sm: "0", xs: "40px" },
                }}
              >
                {/* Download Now */}
                <CustomFooterH1Box
                  sx={{
                    width: { sm: "22%", xs: "100%" },
                  }}
                >
                  <CustomFooterH2Typography
                    sx={{ mt: { sm: "0", xs: "20px" } }}
                  >
                    {t("Download Now")}
                  </CustomFooterH2Typography>
                  <CustomFooterTypographyBox>
                    <img
                      style={{ cursor: "pointer" }}
                      loading="lazy"
                      alt="img"
                      src={googleplay?.src}
                    />
                    <img
                      style={{ cursor: "pointer" }}
                      loading="lazy"
                      alt="img"
                      src={appleplay?.src}
                    />
                  </CustomFooterTypographyBox>
                </CustomFooterH1Box>

                {/* Quick links */}
                <CustomFooterH1Box
                  sx={{
                    width: { sm: "22%", xs: "100%" },
                  }}
                >
                  <CustomFooterH2Typography
                    sx={{ mt: { sm: "0", xs: "20px" } }}
                  >
                    {t("Quick links")}
                  </CustomFooterH2Typography>
                  <CustomFooterTypographyBox>
                    <CustomFooterNestedTypography
                      onClick={() => push("/howItWork")}
                    >
                      {t("How It Work")}
                    </CustomFooterNestedTypography>
                    <CustomFooterNestedTypography
                      onClick={() => push("/pricing")}
                    >
                      {t("Pricing")}
                    </CustomFooterNestedTypography>
                    <CustomFooterNestedTypography
                      onClick={() => push("/about")}
                    >
                      {t("About Us")}
                    </CustomFooterNestedTypography>
                    <CustomFooterNestedTypography
                      onClick={() => push("/privacy")}
                    >
                      {t("Privacy policy")}
                    </CustomFooterNestedTypography>
                    <CustomFooterNestedTypography
                      onClick={() => push("/terms")}
                    >
                      {t("Terms of service")}
                    </CustomFooterNestedTypography>
                  </CustomFooterTypographyBox>
                </CustomFooterH1Box>

                {/* Contact Us */}
                <CustomFooterH1Box
                  sx={{
                    width: { sm: "28%", xs: "100%" },
                    // width: '28%',
                  }}
                >
                  <CustomFooterH2Typography
                    sx={{ mt: { sm: "0", xs: "20px" } }}
                  >
                    {t("Contact us")}
                  </CustomFooterH2Typography>
                  <CustomFooterTypographyBox>
                    <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
                      <img src={footerMail?.src} loading="lazy" alt="address" />
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: !issmall ? "16px" : "12px",
                          color: "white",
                        }}
                      >
                        {master?.email}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
                      <img
                        src={footerPhone?.src}
                        loading="lazy"
                        alt="footerPhone"
                      />
                      <Typography
                        dir="ltr"
                        sx={{
                          fontWeight: "500",
                          fontSize: !issmall ? "16px" : "12px",
                          color: "white",
                        }}
                      >
                        {master?.mobile}
                      </Typography>
                    </Stack>

                    <Stack
                      direction={"row"}
                      gap={"10px"}
                      alignItems={"flex-start"}
                    >
                      <img
                        src={footerAddresse?.src}
                        loading="lazy"
                        alt="footerAddresse"
                      />
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: !issmall ? "16px" : "12px",
                          color: "white",
                        }}
                      >
                        {master?.address}
                      </Typography>
                    </Stack>

                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      gap={"25px"}
                      justifyContent={"center"}
                      width={"100%"}
                    >
                      {footerLinks?.map((e: FooterSocialLinks, i: number) => (
                        <a key={i} target="_blank" href={e?.url}>
                          <img
                            src={e?.photo_path}
                            loading="lazy"
                            alt="img"
                            width={"40"}
                            height={"40"}
                            style={{
                              cursor: "pointer",
                              width: "40px",
                              height: "40px",
                            }}
                          />
                        </a>
                      ))}
                    </Stack>
                  </CustomFooterTypographyBox>
                </CustomFooterH1Box>
              </Stack>
            </Stack>

            <GlobalDisplayFlexColumnBox
              width={!issmall ? "40%" : "100%"}
              sx={{ mx: "auto" }}
              gap={"15px"}
            >
              <Divider flexItem orientation="horizontal" />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "white",
                  textAlign: "center",
                }}
              >
                All rights reserved © 2023 Alwan Elghasil
              </Typography>
            </GlobalDisplayFlexColumnBox>
          </GlobalDisplayFlexColumnBox>
        </PublicContainer>
      </Stack>
    </>
  );
};

Footer.propTypes = {};

export default Footer;
