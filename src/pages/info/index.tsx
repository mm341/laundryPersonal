import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AuthGuard from "@/Components/authentication/AuthGuard";
import { useRouter } from "next/router";
import PublicContainer from "@/Components/PublicContainer";
import UserInfo from "../../Components/UserInfo/Profile";
import { RTL } from "@/Components/GlobalComponent/RTL/RTL";
import MainApi from "@/api/MainApi";
import { HomeServices } from "@/interfaces/HomeServices";
import { HomeAreas } from "@/interfaces/HomeAreas";
import { Master } from "@/interfaces/MasterInterface";
import { FooterSocialLinks } from "@/interfaces/FooterSocialLinks";
import { useAppDispatch } from "@/redux/store";
import { CashAreas, CashServices } from "@/redux/slices/Services";
import { CashFooterLinks, CashMasterData } from "@/redux/slices/MasterSlice";
import HandelNotification from "@/Components/GlobalComponent/HandelNotification";
const Index = ({
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
  const router = useRouter();
  const { locale } = useRouter();
  const { page }: any = router.query;
  const dispatch = useAppDispatch();
  const [languagedirection, setLanguagedirection] = useState<string>("ltr");
  useEffect(() => {
    locale === "en" ? setLanguagedirection("ltr") : setLanguagedirection("rtl");
  }, [locale]);

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
    
      <RTL direction={languagedirection}>
        <CssBaseline />
        <HandelNotification>
        <PublicContainer>
          <AuthGuard>{page && <UserInfo page={page} />}</AuthGuard>
        </PublicContainer>
        </HandelNotification>
      </RTL>
    
  );
};

export default Index;

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
