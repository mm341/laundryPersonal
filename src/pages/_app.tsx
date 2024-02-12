import "@/styles/globals.css";
import React, { useEffect, useMemo, useState } from "react";
import createEmotionCache from "@/utils/create-emotion-cache";
import { CacheProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "../theme/index";
import { Box, CssBaseline } from "@mui/material";

import i18n from "i18next";
import "../language/i18n";
import { persistor, store } from "../redux/store";
import { useTranslation } from "react-i18next";
import Router, { useRouter } from "next/router";

import "../styles/nprogress.css";
import nProgress from "nprogress";
import "simplebar-react/dist/simplebar.min.css";

import type {} from "@mui/lab/themeAugmentation";
// When using TypeScript 3.x and below
import "@mui/lab/themeAugmentation";
import AOS from "aos";
import Footer from "@/Components/FooterMiddleLandingPage";
import { PersistGate } from "redux-persist/integration/react";
import { RTL } from "@/Components/GlobalComponent/RTL/RTL";
import ScrollToTop from "@/Components/GlobalComponent/scroll-top/ScrollToTop";
import dynamic from "next/dynamic";
import logoHeader from "../../public/App/Disk-1s-200px.gif";
import DynamicFavicon from "@/Components/GlobalComponent/favicon/DynamicFavicon";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchToken } from "@/firebase";
Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);
const clientSideEmotionCache = createEmotionCache();
export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps | any) {
  //  hooks

  const { t } = useTranslation();
  const [languagedirection, setlanguagedirection] = useState<string>("");
  const { locale } = useRouter();
  const [previewLoader, setPreviewLoader] = useState<boolean>(true);
  const router = useRouter();
  //  handel language direction
  useEffect(() => {
    if (typeof window !== "undefined") {
      setlanguagedirection(localStorage.getItem("direction") ?? "ltr");
    }
  }, [languagedirection]);
  //  handel language
  let userLanguage: string | any = undefined;
  if (typeof window !== "undefined") {
    userLanguage = localStorage.getItem("language");
  }

  //  handel language

  useEffect(() => {
    if (locale === "en") {
      i18n.changeLanguage("en");
      localStorage?.setItem("direction", "ltr");
      setlanguagedirection("ltr");
      localStorage?.setItem("language", "en");
    } else if (locale === "ar") {
      localStorage?.setItem("direction", "rtl");
      setlanguagedirection("rtl");
      i18n.changeLanguage("ar");
      localStorage?.setItem("language", "ar");
    }
  }, [locale]);


  
    useEffect(() => {
      fetchToken().then()
  }, [])
  

  //  custom theme
  const theme = useMemo(
    () =>
      createTheme({
        direction: languagedirection,
      }),
    [languagedirection]
  );
  const getLayout = Component.getLayout ?? ((page: any) => page);
  const queryClient = new QueryClient();

  //   aos custom
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      duration: 1500,
      delay: 300,
    });
  }, []);

  useEffect(() => {
    if (previewLoader) {
      setTimeout(() => {
        setPreviewLoader(false);
      }, 100);
    }
  }, [previewLoader]);

  //  get machine id for public apis
  function getMachineId() {
    let machineId = localStorage.getItem("MachineId");

    if (!machineId) {
      machineId = crypto.randomUUID();
      localStorage.setItem("MachineId", machineId);
    }
    return machineId;
  }

  //  save machine id in localstorage
  let machineId: null | string | undefined = undefined;
  if (typeof window !== "undefined") {
    machineId = localStorage.getItem("MachineId");
  }

  useEffect(() => {
    if (!machineId) {
      getMachineId();
    }
  }, [machineId]);

  //  navbar
  const Navbar = dynamic(() => import("@/Components/Navbar"), { ssr: false });
  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <RTL direction={languagedirection}>
                <CssBaseline />
                <Toaster
                  toastOptions={{
                    className: "",
                  }}
                  containerStyle={{
                    zIndex: 1000000,
                    position: "sticky",
                  }}
                />
                <Head>
                  <title>{t("Loading...")}</title>
                </Head>
                <Navbar />

                <Box
                  sx={{
                    display: !previewLoader ? "none" : "flex",
                    width: "100vw",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ width: { md: "10vw", xs: "40vw" } }}>
                    <img
                      src={logoHeader?.src}
                      style={{ width: "100%" }}
                      loading="lazy"
                      alt="logoHeader"
                    />
                  </Box>
                </Box>
                <Box
                  style={{ overflowX: "hidden" }}
                  sx={{
                    display: previewLoader ? "none" : "block",
                    width:"100vw",
                    minHeight: "80vh",
                    mt: {
                      md: router.pathname !== "/" ? "7rem" : "3.9rem",
                      xs: router.pathname !== "/" ? "7rem" : "5rem",
                    },
                    mb: "5rem",
                  }}
                >
                  <ScrollToTop />
                  <DynamicFavicon />
                  {getLayout(<Component {...pageProps} />)}
                </Box>
                <Footer />
              </RTL>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
