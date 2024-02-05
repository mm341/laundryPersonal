import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import PublicContainer from "../PublicContainer";
import {
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import GlobalTypography from "./GlobalTypography";
import fakeImg from "../../../public/HomePage/output-onlinegiftools (1) 1.gif";
import iphonebackground from "../../../public/HomePage/iphonebackground.png";
import AppSmallSection from "./AppSmallSection";
import { useTranslation } from "react-i18next";

const AppSection = () => {
  //  hooks
  const { t } = useTranslation();
  const theme = useTheme();
  const issmall = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        py: "60px",
        background:
          "linear-gradient(180deg, #C0E3FF 13.03%, rgba(221, 237, 250, 0.4) 100%)",
      }}
    >
      <PublicContainer>
        <GlobalDisplayFlexBox>
          <GlobalDisplayFlexColumnBox width={"100%"} gap={"72px"}>
            {/*  top section */}
            <GlobalTypography text={"usability become smooth"} />
            {/*  bottom section */}
            <GlobalDisplayFlexBox>
              {/*  left section */}
              <GlobalDisplayFlexColumnBox
               data-aos="fade-right"
                width={!issmall ? "45%" : "100%"}
                gap={"28px"}
              >
                <GlobalDisplayFlexColumnBox width={"100%"} gap={"20px"}>
                  <Typography
                    sx={{
                      fontSize: { sm: "24px", xs: "18px" },
                      fontWeight: "600",
                    }}
                  >
                    {t("Our service is amazing on mobile")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { sm: "18px", xs: "14px" },
                      fontWeight: "400",
                    }}
                  >
                    {t(
                      "Download the application on your mobile phone and book all your daily cleaning needs easily, from anywhere, at any time, at reasonable prices, all through our platform on IOS And Android systems in order to ensure that our services reach all users in the Kingdom."
                    )}
                  </Typography>
                </GlobalDisplayFlexColumnBox>
                <GlobalDisplayFlexColumnBox width={"100%"} gap={"20px"}>
                  <GlobalDisplayFlexBox
                    sx={{
                      justifyContent: { sm: "flex-start", xs: "center" },
                      gap: "20px",
                      alignItems: { sm: "flex-end", xs: "flex-start" },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { sm: "24px", xs: "18px" },
                        fontWeight: "600",
                      }}
                    >
                      {t("Download the app and book in seconds")}
                    </Typography>
                    <img
                      src={fakeImg?.src}
                      style={{ width: "72px", height: "72px" }}
                      loading="lazy"
                      alt="img"
                    />
                  </GlobalDisplayFlexBox>
                  <AppSmallSection />
                </GlobalDisplayFlexColumnBox>
              </GlobalDisplayFlexColumnBox>
              {/*  right Photo section */}
              <Box
               data-aos="fade-left"
                sx={{
                  width: { md: "50%", xs: "70%" },
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: { md: "0", xs: "25px" },
                }}
              >
                <img src={iphonebackground?.src} alt="img" loading="lazy" />
              </Box>
            </GlobalDisplayFlexBox>
          </GlobalDisplayFlexColumnBox>
        </GlobalDisplayFlexBox>
      </PublicContainer>
    </Box>
  );
};

export default AppSection;
