import GlobalTypography from "@/Components/HomePage/GlobalTypography";
import PublicContainer from "@/Components/PublicContainer";
import {
  CustomPaperBigCard,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, CssBaseline, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import img1 from "../../../public/HowItWork/photosection1.png";
import img2 from "../../../public/HowItWork/photosection2.png";
import img3 from "../../../public/HowItWork/photosection3.png";
import WorkCard from "@/Components/HowItWork/WorkCard";
import Meta from "@/Components/GlobalComponent/Meta";
import MainApi from "@/api/MainApi";
import { useAppDispatch } from "@/redux/store";
import { CashAreas, CashServices } from "@/redux/slices/Services";
import { CashFooterLinks, CashMasterData } from "@/redux/slices/MasterSlice";
import { HomeServices } from "@/interfaces/HomeServices";
import { HomeAreas } from "@/interfaces/HomeAreas";
import { Master } from "@/interfaces/MasterInterface";
import { FooterSocialLinks } from "@/interfaces/FooterSocialLinks";
export interface data {
  title: string;
  describtion: string;
  img: { src: string };
}
// efeef
const HowItWork = ({
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
  const dispatch = useAppDispatch();
  const dataArray: data[] = [
    {
      title: "Creating your account is fast and easy",
      describtion:
        "Type your full name and phone number to set up your account with us.",
      img: img1,
    },
    {
      title: "Add Your washing preferences",
      describtion:
        "Add what you need through many of the services we provide to you",
      img: img2,
    },
    {
      title: "Place your order",
      describtion:
        "Check your order preferences, payment method,Submit your order in just one click.",
      img: img3,
    },
  ];

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
    if (footerSocialLinks?.length > 0) {
      dispatch(CashFooterLinks(footerSocialLinks));
    }
  }, [dispatch, footerSocialLinks]);
  return (
    <>
      <Meta
        title={"How It Works"}
        // ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
      />
      <CssBaseline />
      <PublicContainer>
        <CustomPaperBigCard sx={{ backgroundColor: "white" }}>
          <GlobalDisplayFlexColumnBox
            width={"100%"}
            gap={"140px"}
            sx={{ py: "50px" }}
          >
            <GlobalDisplayFlexColumnBox width={"100%"} gap={"48px"}>
              <GlobalTypography
                FirstSection
                clearBg
                text={"How Alwan-Elghasil Work"}
              />
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                {t(
                  "The faster way to do Laundry and all you need so you never have to worry about washing"
                )}
              </Typography>
            </GlobalDisplayFlexColumnBox>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "160px",
                width: "85%",
                mx: "auto",
              }}
            >
              {dataArray?.map((e: data, i) => (
                <WorkCard key={i} element={e} />
              ))}
            </Box>
          </GlobalDisplayFlexColumnBox>
        </CustomPaperBigCard>
      </PublicContainer>
    </>
  );
};

export default HowItWork;

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
