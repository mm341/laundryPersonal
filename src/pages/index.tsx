// import Image from "next/image";
// import { Inter } from "next/font/google";
// import { Box } from "@mui/material";
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
import { CashAreas, CashServices } from "@/redux/slices/Services";
import { Master } from "@/interfaces/MasterInterface";
import { CashFooterLinks, CashMasterData } from "@/redux/slices/MasterSlice";
import { FooterSocialLinks } from "@/interfaces/FooterSocialLinks";

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

  //  cash services
  useEffect(() => {
    dispatch(CashServices(homeServices));
  }, [dispatch, homeServices, homeServices?.length]);
  //  cash areas
  useEffect(() => {
    if (homeAreas?.length > 0) {
      dispatch(CashAreas(homeAreas));
    }
  }, [dispatch, homeAreas, homeAreas?.length]);

  //  cash master
  useEffect(() => {
    if (Object.values(masterData).length > 0) {
      dispatch(CashMasterData(masterData));
    }
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
        title={"Alwain Elqhasel"}
        // ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
      />
      <HomeParentBox>
        <FirstSection homeAreas={homeAreas} homeServices={homeServices} />
        <WorkLaundry />
        <ServiceSection homeAreas={homeAreas} homeServices={homeServices} />
        <LaundrySimpleSection />
        <AppSection />
        <LaundryFaqs />
      </HomeParentBox>
    </>
  );
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  let homeServices = [];
  let homeAreas = [];
  let masterData = {};
  let footerSocialLinks = [];
  //  servcies
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
