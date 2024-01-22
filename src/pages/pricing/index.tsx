import Meta from "@/Components/GlobalComponent/Meta";
import GlobalTypography from "@/Components/HomePage/GlobalTypography";
import FilterProductsWithService from "@/Components/Pricing/FilterProductsWithService";
import PublicContainer from "@/Components/PublicContainer";
import MainApi from "@/api/MainApi";
import { FooterSocialLinks } from "@/interfaces/FooterSocialLinks";
import { HomeAreas } from "@/interfaces/HomeAreas";
import { HomeServices } from "@/interfaces/HomeServices";
import { Master } from "@/interfaces/MasterInterface";
import { CashFooterLinks, CashMasterData } from "@/redux/slices/MasterSlice";
import { CashAreas, CashServices } from "@/redux/slices/Services";
import { useAppDispatch } from "@/redux/store";

import { GlobalDisplayFlexColumnBox } from "@/styles/PublicStyles";
import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Pricing = ({
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
        title={"pricing"}
        // ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
      />
      <PublicContainer>
        <GlobalDisplayFlexColumnBox gap={"64px"}>
          <GlobalDisplayFlexColumnBox gap={"32px"}>
            <GlobalTypography FirstSection clearBg text="Price List" />
            <Typography
              sx={{ textAlign: "center", fontSize: "20px", fontWeight: "400" }}
            >
              {t(
                "It’s our goal to make premium laundry service work with all budgets."
              )}
            </Typography>
          </GlobalDisplayFlexColumnBox>

          <FilterProductsWithService />
        </GlobalDisplayFlexColumnBox>
      </PublicContainer>
    </>
  );
};

export default Pricing;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  let homeServices = [];
  let homeAreas = [];
  let masterData = {};
  let footerSocialLinks = [];
  try {
    const configRes = await MainApi.get("services", {
      headers: {
        "Accept-Language": locale,
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
