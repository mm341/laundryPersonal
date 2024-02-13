import FirstSection from "@/Components/HomePage/FirstSection";
import { HomeParentBox } from "@/styles/PublicStyles";
import ServiceSection from "@/Components/HomePage/ServiceSection";

import WorkLaundry from "@/Components/HomePage/LaundryWork";
import { useEffect } from "react";
import LaundryFaqs from "@/Components/HomePage/LaundryFaqs";
import LaundrySimpleSection from "@/Components/HomePage/LaundrySimpleSection";
import AppSection from "@/Components/HomePage/AppSection";
import Meta from "@/Components/GlobalComponent/Meta";
import MainApi from "@/api/MainApi";
import { HomeServices } from "@/interfaces/HomeServices";
import { HomeAreas } from "@/interfaces/HomeAreas";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  CashAreas,
  CashServices,
  GetAllAreas,
  GetAllServices,
} from "@/redux/slices/Services";
import { Master } from "@/interfaces/MasterInterface";
import { CashFooterLinks, CashMasterData } from "@/redux/slices/MasterSlice";
import { FooterSocialLinks } from "@/interfaces/FooterSocialLinks";
import { CssBaseline } from "@mui/material";
import HandelNotification from "@/Components/GlobalComponent/HandelNotification";

export default function Home({
  homeServices,
  homeAreas,
  masterData,
  footerSocialLinks,
}: {
  homeServices: HomeServices[];
  homeAreas: HomeAreas[];
  masterData: Master;
  footerSocialLinks: FooterSocialLinks[];
}) {
  //  hooks
  const dispatch = useAppDispatch();
  //  selectors

  const { services, areas } = useAppSelector((state) => state.services);

  useEffect(() => {
    homeServices?.length === 0 && dispatch(GetAllServices());
  }, [homeServices]);
  useEffect(() => {
    homeAreas?.length === 0 && dispatch(GetAllAreas());
  }, [homeAreas]);
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
console.log("what")
  return (
    <>
      <Meta
        title={"Alwain Elqhasel"}
        // ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
      />
      <CssBaseline />
      <HandelNotification>
      <HomeParentBox style={{ overflowX: "hidden" }}>
        <FirstSection
          homeAreas={homeAreas?.length > 0 ? homeAreas : areas}
          homeServices={homeServices?.length > 0 ? homeServices : services}
        />
        <WorkLaundry />
        <ServiceSection
          homeAreas={homeAreas?.length > 0 ? homeAreas : areas}
          homeServices={homeServices?.length > 0 ? homeServices : services}
        />
        <LaundrySimpleSection />
        <AppSection />
        <LaundryFaqs />
      </HomeParentBox>
      </HandelNotification>
    </>
  );
}

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
