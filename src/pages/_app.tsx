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

import Footer from "@/Components/FooterMiddleLandingPage";
import Navbar from "@/Components/Navbar";
import { RTL } from "@/Components/GlobalComponent/RTL/RTL";
export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps | any) {
  const { t } = useTranslation();
  const [languagedirection, setlanguagedirection] = useState<string>("");
  const [theme_mode, setThemeMode] = useState<string>("");
  useEffect(() => {
    // Perform localStorage action
    if (typeof window !== "undefined") {
      setlanguagedirection(localStorage.getItem("direction") ?? "ltr");
    }
  }, [languagedirection]);

  useEffect(() => {
    // Perform localStorage action
    if (typeof window !== "undefined") {
      setThemeMode(localStorage.getItem("mode") ?? "light");
    }
  }, [theme_mode]);

  let userLanguage: string | any = undefined;
  if (typeof window !== "undefined") {
    userLanguage = localStorage.getItem("language");
  }

  const { locale } = useRouter();
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
 
  // const tajawal = Tajawal({
  //   subsets: ["latin"],
  //   weight: ["400", "500", "700", "800"],
  // });

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
                  minHeight: "80vh",
                  mt: {md:router.pathname !== "/" ? "7rem" : "3.9rem",xs:router.pathname !== "/" ? "7rem" : "5rem"},
                  mb: "5rem",
                }}
              >
                {getLayout(<Component {...pageProps} />)}
              </Box>
              <Footer />
            </RTL>
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </CacheProvider>
  );
}


