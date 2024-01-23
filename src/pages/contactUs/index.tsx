import PublicContainer from "@/Components/PublicContainer";
import {
  CustomPaperBigCard,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import {
  Box,
  CssBaseline,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import instgram from "../../../public/contactUs/instagram.svg";
import facebook from "../../../public/contactUs/facebook.svg";
import twitter from "../../../public/contactUs/twitter.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import ContactForm from "@/Components/ContactUs/ContactForm";
import Meta from "@/Components/GlobalComponent/Meta";
import { useRouter } from "next/router";
// import Image from "next/image";
import { FooterSocialLinks } from "@/interfaces/FooterSocialLinks";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import MainApi from "@/api/MainApi";
import { HomeServices } from "@/interfaces/HomeServices";
import { HomeAreas } from "@/interfaces/HomeAreas";
import { Master } from "@/interfaces/MasterInterface";
import { CashAreas, CashServices } from "@/redux/slices/Services";
import { CashFooterLinks, CashMasterData } from "@/redux/slices/MasterSlice";
const ContactUs = ({
  homeServices,
  homeAreas,
  masterData,
  footerSocialLinks,
}: {
  homeServices: HomeServices[];
  homeAreas: HomeAreas[];
  masterData: Master;
  footerSocialLinks: FooterSocialLinks[];
}) => {
  //  hooks
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const sm = useMediaQuery(theme.breakpoints.down("md"));

  const { locale } = useRouter();
  const { master } = useAppSelector((state) => state.master);
  const { footerLinks } = useAppSelector((state) => state.master);

  //  cash areas
  useEffect(() => {
    dispatch(CashAreas(homeAreas));
  }, [dispatch, homeAreas]);

  //  cash services
  useEffect(() => {
    dispatch(CashServices(homeServices));
  }, [dispatch, homeServices, homeServices?.length]);

  //  cash master
  useEffect(() => {
    dispatch(CashMasterData(masterData));
  }, [dispatch, masterData]);

  //  cash footer Social Media Links
  useEffect(() => {
    
      dispatch(CashFooterLinks(footerSocialLinks));
    
  }, [dispatch, footerSocialLinks]);

  return (
    <>
      <Meta
        title={"ContactUs"}
        // ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
      />
      <CssBaseline />
      <PublicContainer>
        <CustomPaperBigCard
          sx={{ backgroundColor: theme.palette.primary.dark }}
        >
          <Box
            sx={{ width: { md: "85%", xs: "100%" }, mx: "auto", py: "25px" }}
          >
            <GlobalDisplayFlexColumnBox gap={"55px"}>
              <Typography
                sx={{ fontSize: { md: "48px", xs: "25px" }, fontWeight: "600" }}
              >
                {t("Do you have a question for us?")}
              </Typography>

              <GlobalDisplayFlexColumnBox gap={"20px"}>
                <Grid container spacing={sm ? 3 : 0} alignItems={"center"}>
                  {/*  contacting information  */}
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        width: { md: "130%", xs: "100%" },
                        zIndex: 10,
                        position: "relative",
                        perspectiveOrigin: "left center",
                        perspective: "100px",
                      }}
                    >
                      <CustomPaperBigCard
                        sx={{
                          backgroundColor: "white",
                          transform: {
                            md:
                              locale === "en"
                                ? "rotateY(2deg)"
                                : "rotateY(-1deg)",
                            xs: "rotateY(0deg)",
                          },
                        }}
                      >
                        <GlobalDisplayFlexColumnBox
                          gap={"35px"}
                          sx={{ pt: "70px", pb: "50px" }}
                        >
                          <GlobalDisplayFlexColumnBox gap={"20px"}>
                            <Typography
                              sx={{ fontSize: "36px", fontWeight: "600" }}
                            >
                              {t("Get In Touch")}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: "400",
                                width: "80%",
                                textAlign: "left",
                              }}
                            >
                              {t(
                                "Questions, comments, or suggestions? Simply fill in the form and we’ll be in touch shortly."
                              )}
                            </Typography>
                          </GlobalDisplayFlexColumnBox>

                          <GlobalDisplayFlexBox
                            style={{ flexDirection: "row" }}
                            sx={{
                              justifyContent: "flex-start",
                              gap: "10px",
                              alignItems: "flex-start",
                            }}
                          >
                            <LocationOnIcon />
                            <Typography
                              sx={{ fontSize: "16px", fontWeight: "400" }}
                            >
                              {master?.address}
                            </Typography>
                          </GlobalDisplayFlexBox>
                          <GlobalDisplayFlexBox
                            style={{ flexDirection: "row" }}
                            sx={{
                              justifyContent: "flex-start",
                              gap: "10px",
                              alignItems: "flex-start",
                            }}
                          >
                            <LocalPhoneIcon />
                            <Typography
                              dir="ltr"
                              sx={{ fontSize: "16px", fontWeight: "400" }}
                            >
                              {master?.mobile}
                            </Typography>
                          </GlobalDisplayFlexBox>
                          <GlobalDisplayFlexBox
                            style={{ flexDirection: "row" }}
                            sx={{
                              justifyContent: "flex-start",
                              gap: "10px",
                              alignItems: "flex-start",
                            }}
                          >
                            <MailIcon />
                            <Typography
                              sx={{ fontSize: "16px", fontWeight: "400" }}
                            >
                              {master?.email}
                            </Typography>
                          </GlobalDisplayFlexBox>
                        </GlobalDisplayFlexColumnBox>
                      </CustomPaperBigCard>
                    </Box>
                  </Grid>

                  {/*  contacting form  */}
                  <Grid item xs={12} md={6}>
                    <CustomPaperBigCard
                      sx={{
                        backgroundColor: "white",
                        zIndex: 15,
                        position: "relative",
                      }}
                    >
                      <ContactForm />
                    </CustomPaperBigCard>
                  </Grid>
                </Grid>

                <GlobalDisplayFlexColumnBox gap={"10px"}>
                  <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                    {t("Follow Us")}
                  </Typography>
                  <GlobalDisplayFlexBox
                    style={{ flexDirection: "row" }}
                    sx={{
                      justifyContent: "flex-start",
                      gap: "20px",
                      flexDirection: "row",
                    }}
                  >
                    {/* <img
                      src={instgram?.src}
                      style={{ cursor: "pointer" }}
                      loading="lazy"
                      alt="img"
                    />
                    <img
                      src={facebook?.src}
                      style={{ cursor: "pointer" }}
                      loading="lazy"
                      alt="img"
                    />
                    <img
                      src={twitter?.src}
                      style={{ cursor: "pointer" }}
                      loading="lazy"
                      alt="img"
                    /> */}
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
                  </GlobalDisplayFlexBox>
                </GlobalDisplayFlexColumnBox>
              </GlobalDisplayFlexColumnBox>
            </GlobalDisplayFlexColumnBox>
          </Box>
        </CustomPaperBigCard>
      </PublicContainer>
    </>
  );
};

export default ContactUs;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  let homeServices = [];
  let homeAreas = [];
  let masterData = {};
  let footerSocialLinks = [];
  try {
    const configRes = await MainApi.get("services", {
      headers: {
        "Accept-Language": locale,
        locale: locale,
      },
    });
    homeServices = configRes?.data?.data?.services;
  } catch (e) {
    homeServices = [];
  }
  //  areas
  try {
    const Res = await MainApi.get("areas", {
      headers: {
        "Accept-Language": locale,
        locale: locale,
      },
    });

    homeAreas = Res?.data?.data?.areas;
  } catch (e) {
    homeAreas = [];
  }
  //  masterData
  try {
    const configRes = await MainApi.get("master", {
      headers: {
        "Accept-Language": locale,
        locale: locale,
      },
    });
    masterData = configRes?.data?.data;
  } catch (e) {
    masterData = {};
  }

  //  footerSocialLinks
  try {
    const configRes = await MainApi.get("social-link", {
      headers: {
        "Accept-Language": locale,
        locale: locale,
      },
    });
    footerSocialLinks = configRes?.data?.data?.socialLink;
  } catch (e) {
    footerSocialLinks = [];
  }

  return {
    props: {
      homeServices,
      homeAreas,
      masterData,
      footerSocialLinks,
    },
  };
};
