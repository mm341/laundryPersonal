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
import { persistStore } from "redux-persist";
import i18n, { t } from "i18next";
import "../language/i18n";
import { store } from "../redux/store";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import "simplebar-react/dist/simplebar.min.css";
const clientSideEmotionCache = createEmotionCache();
import type {} from "@mui/lab/themeAugmentation";
// When using TypeScript 3.x and below
import "@mui/lab/themeAugmentation";
import AOS from "aos";
import Footer from "@/Components/FooterMiddleLandingPage";
// import Navbar from "@/Components/Navbar";
import { RTL } from "@/Components/GlobalComponent/RTL/RTL";
import ScrollToTop from "@/Components/GlobalComponent/scroll-top/ScrollToTop";
import dynamic from "next/dynamic";
import logoHeader from "../../public/App/full body.webp";
export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps | any) {
  //  hooks

  const { t } = useTranslation();
  const [languagedirection, setlanguagedirection] = useState<string>("");
  const { locale } = useRouter();
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

  let persistor = persistStore(store);

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
  const router = useRouter();

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

  const [previewLoader, setPreviewLoader] = useState<boolean>(true);

  useEffect(() => {
    if (previewLoader) {
      setTimeout(() => {
        setPreviewLoader(false);
      }, 100);
    }
  }, [previewLoader]);

  //  navbar
  const Navbar = dynamic(() => import("@/Components/Navbar"), { ssr: false });
  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <RTL direction={languagedirection}>
              <CssBaseline />
              <Toaster />
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
                <Box sx={{ width: { md: "30vw", xs: "80vw" } }}>
                  <img
                    src={logoHeader?.src}
                    style={{ width: "100%" }}
                    loading="lazy"
                    alt="logoHeader"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: previewLoader ? "none" : "block",
                }}
              >
                <ScrollToTop />
                <Box
                  sx={{
                    minHeight: "80vh",
                    mt: {
                      md: router.pathname !== "/" ? "7rem" : "3.9rem",
                      xs: router.pathname !== "/" ? "7rem" : "5rem",
                    },
                    mb: "5rem",
                  }}
                >
                  {getLayout(<Component {...pageProps} />)}
                </Box>
              </Box>
              <Footer />
            </RTL>
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
