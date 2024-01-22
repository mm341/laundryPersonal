import Meta from "@/Components/GlobalComponent/Meta";
import GlobalTypography from "@/Components/HomePage/GlobalTypography";
import PublicContainer from "@/Components/PublicContainer";
import MainApi from "@/api/MainApi";
import {
  CustomPaperBigCard,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, CssBaseline, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const About = ({
  aboutUsData,
}: {
  aboutUsData: { title: string; content: string };
}) => {
  return (
    <>
      <Meta
        title={aboutUsData?.title}
        // ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
      />
       <CssBaseline />
      <PublicContainer>
        <CustomPaperBigCard sx={{ backgroundColor: "white" }}>
          <GlobalDisplayFlexColumnBox sx={{ py: "80px" }}>
            <GlobalDisplayFlexColumnBox gap={"128px"}>
              <GlobalDisplayFlexColumnBox width={"100%"} gap={"56px"}>
                <GlobalTypography
                  FirstSection
                  clearBg
                  text={aboutUsData?.title}
                />
                <Box
                  dangerouslySetInnerHTML={{
                    __html: aboutUsData?.content,
                  }}
                ></Box>
                {/* <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "400",
                  width: { md: "73%", xs: "100%" },
                  mx: "auto",
                }}
              >
                {t(
                  "Welcome to Alwan Elghasil, where we redefine cleanliness and care for your garments with a commitment to quality and excellence. At Alwan Elghasil, we believe that every piece of clothing tells a story, and we are here to ensure that each story is told in pristine condition."
                )}
              </Typography> */}
              </GlobalDisplayFlexColumnBox>

              {/* <GlobalDisplayFlexColumnBox
              width={"100%"}
              gap={"96px"}
              sx={{ px: { md: "40px", xs: "10px" } }}
            >
              <GlobalDisplayFlexColumnBox gap={"32px"} width={"100%"}>
                <Typography
                  sx={{
                    fontSize: { md: "36px", xs: "20px" },
                    fontWeight: "500",
                    color: theme.palette.primary.main,
                  }}
                >
                  {t("Our Story")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { md: "20px", xs: "16px" },
                    fontWeight: "400",
                  }}
                >
                  {t(
                    "Our journey began with a simple yet powerful vision – to provide a laundry service that goes beyond just cleaning clothes a service that understands the importance of preserving the fabric, colors,and memories associated with each garment."
                  )}
                </Typography>
              </GlobalDisplayFlexColumnBox>

              <GlobalDisplayFlexColumnBox gap={"32px"} width={"100%"}>
                <Typography
                  sx={{
                    fontSize: { md: "36px", xs: "20px" },
                    fontWeight: "500",
                    color: theme.palette.primary.main,
                  }}
                >
                  {t("Our Commitment")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { md: "20px", xs: "16px" },
                    fontWeight: "400",
                  }}
                >
                  {t(
                    "At Alwan Elghasil, we are dedicated to delivering the highest standards of cleanliness and care. Our state-of-the-artfacilities are equipped with the latest technology, ensuring that your clothes are impeccably clean and treated with the utmost respect for the environment."
                  )}
                </Typography>
              </GlobalDisplayFlexColumnBox>

              <GlobalDisplayFlexColumnBox gap={"48px"}>
                <Typography
                  sx={{
                    fontSize: { md: "36px", xs: "20px" },
                    fontWeight: "500",
                    color: theme.palette.primary.main,
                  }}
                >
                  {t("What Sets Us Apart")}
                </Typography>

                <GlobalDisplayFlexColumnBox gap={"24px"}>
                  <Typography
                    sx={{
                      fontSize: { md: "28px", xs: "18px" },
                      fontWeight: "400",
                      color: theme.palette.primary.main,
                    }}
                  >
                    {t("Quality Assurance")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { md: "20px", xs: "16px" },
                      fontWeight: "400",
                    }}
                  >
                    {t(
                      "We take pride in our rigorous quality control measures. Every garment undergoes a meticulous inspection process to guarantee that it meets our stringent standards before being returned to you."
                    )}
                  </Typography>
                </GlobalDisplayFlexColumnBox>

                <GlobalDisplayFlexColumnBox gap={"24px"}>
                  <Typography
                    sx={{
                      fontSize: { md: "28px", xs: "18px" },
                      fontWeight: "400",
                      color: theme.palette.primary.main,
                    }}
                  >
                    {t("Customer-Centric Approach")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { md: "20px", xs: "16px" },
                      fontWeight: "400",
                    }}
                  >
                    {t(
                      "Your satisfaction is our priority. Our friendly and professional staff is always ready to assist you, whether it's addressing specific concerns, providing expert advice, or ensuring a seamless customer experience."
                    )}
                  </Typography>
                </GlobalDisplayFlexColumnBox>

                <GlobalDisplayFlexColumnBox gap={"24px"}>
                  <Typography
                    sx={{
                      fontSize: { md: "28px", xs: "18px" },
                      fontWeight: "400",
                      color: theme.palette.primary.main,
                    }}
                  >
                    {t("Eco-Friendly Practices")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { md: "20px", xs: "16px" },
                      fontWeight: "400",
                    }}
                  >
                    {t(
                      "We are committed to sustainability. Alwan Elghasil embraces eco-friendly practices, from our choice of detergents to our water and energy-saving initiatives, contributing to a healthier planet for future generations."
                    )}
                  </Typography>
                </GlobalDisplayFlexColumnBox>
              </GlobalDisplayFlexColumnBox>
              <GlobalDisplayFlexColumnBox gap={"32px"} width={"100%"}>
                <Typography
                  sx={{
                    fontSize: { md: "36px", xs: "20px" },
                    fontWeight: "500",
                    color: theme.palette.primary.main,
                  }}
                >
                  {t("Our Team")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { md: "20px", xs: "16px" },
                    fontWeight: "400",
                  }}
                >
                  {t(
                    "Behind Alwan Elghasil is a team of passionate individuals who share a common goal – to redefine the laundry experience.Our skilled and dedicated staff members are the backbone of our operations, ensuring that your garments receive the care they deserve."
                  )}
                </Typography>
              </GlobalDisplayFlexColumnBox>
            </GlobalDisplayFlexColumnBox> */}
            </GlobalDisplayFlexColumnBox>
          </GlobalDisplayFlexColumnBox>
        </CustomPaperBigCard>
      </PublicContainer>
    </>
  );
};

export default About;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  let aboutUsData = {};

  //  masterData
  try {
    const configRes = await MainApi.get("legal-pages/about-us", {
      headers: {
        "Accept-Language": locale,
      },
    });
    aboutUsData = configRes?.data?.data?.setting;
  } catch (e) {
    aboutUsData = {};
  }

  return {
    props: {
      aboutUsData,
    },
  };
};
