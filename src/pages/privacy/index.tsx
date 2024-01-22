import Meta from "@/Components/GlobalComponent/Meta";
import GlobalTypography from "@/Components/HomePage/GlobalTypography";
import PublicContainer from "@/Components/PublicContainer";
import MainApi from "@/api/MainApi";
import { GlobalDisplayFlexColumnBox } from "@/styles/PublicStyles";
import { Box, CssBaseline, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const Privacy = ({
  privacyData,
}: {
  privacyData: { title: string; content: string };
}) => {
  return (
    <>
      <Meta
        title={privacyData?.title}
        // ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
      />
       <CssBaseline />
      <PublicContainer>
        <GlobalDisplayFlexColumnBox gap={"32px"}>
          <GlobalTypography FirstSection clearBg text={privacyData?.title} />
          <Box
            dangerouslySetInnerHTML={{
              __html: privacyData?.content,
            }}
          ></Box>
          {/* <Typography sx={{ fontSize: "16px", fontWeight: "400", mt: "30px" }}>
          {t("Last updated: January 01, 2022")}
        </Typography>
        <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
          {t(
            "Please read these terms and conditions carefully before using Our Service."
          )}
        </Typography>

        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "400",

            color: theme.palette.primary.main,
          }}
        >
          {t("Interpretation and Definitions")}
        </Typography>
        <GlobalDisplayFlexColumnBox gap={"30px"}>
          <GlobalDisplayFlexColumnBox gap={"24px"}>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              {t("Interpretation")}
            </Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
              {t(
                "The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural."
              )}
            </Typography>
          </GlobalDisplayFlexColumnBox>

          <GlobalDisplayFlexColumnBox gap={"24px"}>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontSize: "16px",
                fontWeight: "400",
                mt: "20px",
              }}
            >
              {t("Definitions")}
            </Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
              {t(
                "The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural."
              )}
            </Typography>
          </GlobalDisplayFlexColumnBox>

          <GlobalDisplayFlexColumnBox gap={"35px"}>
            <Stack gap={"2px"} direction={"row"}>
              <Typography
                sx={{ fontSize: "16px", fontWeight: "700", color: "#004165" }}
              >
                {t("Application")}
              </Typography>
              {t(
                "means the software program provided by the Company downloaded by You on any electronic device, named Alwan Elghasil"
              )}
            </Stack>

            <Stack gap={"2px"} direction={"row"}>
              <Typography
                sx={{ fontSize: "16px", fontWeight: "700", color: "#004165" }}
              >
                {t("Application")}
              </Typography>
              {t(
                "means the software program provided by the Company downloaded by You on any electronic device, named Alwan Elghasil"
              )}
            </Stack>

            <Stack direction={"row"} gap={"2px"}>
              <Typography
                sx={{ fontSize: "16px", fontWeight: "700", color: "#004165" }}
              >
                {t("Application")}
              </Typography>
              {t(
                "means the software program provided by the Company downloaded by You on any electronic device, named Alwan Elghasil"
              )}
            </Stack>
            <Stack direction={"row"} gap={"2px"}>
              <Typography
                sx={{ fontSize: "16px", fontWeight: "700", color: "#004165" }}
              >
                {t("Application")}
              </Typography>
              {t(
                "means the software program provided by the Company downloaded by You on any electronic device, named Alwan Elghasil"
              )}
            </Stack>
            <Stack direction={"row"} gap={"2px"}>
              <Typography
                sx={{ fontSize: "16px", fontWeight: "700", color: "#004165" }}
              >
                {t("Application")}
              </Typography>
              {t(
                "means the software program provided by the Company downloaded by You on any electronic device, named Alwan Elghasil"
              )}
            </Stack>
            <Stack direction={"row"} gap={"2px"}>
              <Typography
                sx={{ fontSize: "16px", fontWeight: "700", color: "#004165" }}
              >
                {t("Application")}
              </Typography>
              {t(
                "means the software program provided by the Company downloaded by You on any electronic device, named Alwan Elghasil"
              )}
            </Stack>
            <Stack direction={"row"} gap={"2px"}>
              <Typography
                sx={{ fontSize: "16px", fontWeight: "700", color: "#004165" }}
              >
                {t("Application")}
              </Typography>
              {t(
                "means the software program provided by the Company downloaded by You on any electronic device, named Alwan Elghasil"
              )}
            </Stack>
            <Stack direction={"row"} gap={"2px"}>
              <Typography
                sx={{ fontSize: "16px", fontWeight: "700", color: "#004165" }}
              >
                {t("Application")}
              </Typography>
              {t(
                "means the software program provided by the Company downloaded by You on any electronic device, named Alwan Elghasil"
              )}
            </Stack>
            <Stack direction={"row"} gap={"2px"}>
              <Typography
                sx={{ fontSize: "16px", fontWeight: "700", color: "#004165" }}
              >
                {t("Application")}
              </Typography>
              {t(
                "means the software program provided by the Company downloaded by You on any electronic device, named Alwan Elghasil"
              )}
            </Stack>
            <Stack direction={"row"} gap={"2px"}>
              <Typography
                sx={{ fontSize: "16px", fontWeight: "700", color: "#004165" }}
              >
                {t("Application")}
              </Typography>
              {t(
                "means the software program provided by the Company downloaded by You on any electronic device, named Alwan Elghasil"
              )}
            </Stack>
          </GlobalDisplayFlexColumnBox>
        </GlobalDisplayFlexColumnBox>
        <GlobalDisplayFlexColumnBox gap={"20px"}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontSize: "24px",
              fontWeight: "400",
              mt: "20px",
            }}
          >
            Acknowledgment
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
            Our Service may contain links to third-party web sites or services
            that are not owned or controlled by the Company.
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
            The Company has no control over, and assumes no responsibility for,
            the content, privacy policies, or practices of any third party web
            sites or services. You further acknowledge and agree that the
            Company shall not be responsible or liable, directly or indirectly,
            for any damage or loss caused or alleged to be caused by or in
            connection with the use of or reliance on any such content, goods or
            services available on or through any such web sites or services.
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
            We strongly advise You to read the terms and conditions and privacy
            policies of any third-party web sites or services that You visit.
          </Typography>
        </GlobalDisplayFlexColumnBox>

        <GlobalDisplayFlexColumnBox gap={"20px"}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontSize: "24px",
              fontWeight: "400",
              mt: "20px",
            }}
          >
            Acknowledgment
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
            Our Service may contain links to third-party web sites or services
            that are not owned or controlled by the Company.
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
            The Company has no control over, and assumes no responsibility for,
            the content, privacy policies, or practices of any third party web
            sites or services. You further acknowledge and agree that the
            Company shall not be responsible or liable, directly or indirectly,
            for any damage or loss caused or alleged to be caused by or in
            connection with the use of or reliance on any such content, goods or
            services available on or through any such web sites or services.
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
            We strongly advise You to read the terms and conditions and privacy
            policies of any third-party web sites or services that You visit.
          </Typography>
        </GlobalDisplayFlexColumnBox>

        <GlobalDisplayFlexColumnBox gap={"20px"}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontSize: "24px",
              fontWeight: "400",
              mt: "20px",
            }}
          >
            Termination
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
            Our Service may contain links to third-party web sites or services
            that are not owned or controlled by the Company.
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
            The Company has no control over, and assumes no responsibility for,
            the content, privacy policies, or practices of any third party web
            sites or services. You further acknowledge and agree that the
            Company shall not be responsible or liable, directly or indirectly,
          </Typography>
        </GlobalDisplayFlexColumnBox>

        <GlobalDisplayFlexColumnBox gap={"20px"}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontSize: "24px",
              fontWeight: "400",
              mt: "20px",
            }}
          >
            Limitation of Liability
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
            Our Service may contain links to third-party web sites or services
            that are not owned or controlled by the Company.
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
            The Company has no control over, and assumes no responsibility for,
            the content, privacy policies, or practices of any third party web
            sites or services. You further acknowledge and agree that the
            Company shall not be responsible or liable, directly or indirectly,
            for any damage or loss caused or alleged to be caused by or in
            connection with the use of or reliance on any such content, goods or
            services available on or through any such web sites or services.
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
            We strongly advise You to read the terms and conditions and privacy
            policies of any third-party web sites or services that You visit.
          </Typography>
        </GlobalDisplayFlexColumnBox>

        <GlobalDisplayFlexColumnBox gap={"20px"}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontSize: "24px",
              fontWeight: "400",
              mt: "20px",
            }}
          >
            Governing Law
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
            The laws of the Country, excluding its conflicts of law rules, shall
            govern this Terms and Your use of the Service. Your use of the
            Application may also be subject to other local, state, national, or
            international laws.
          </Typography>
        </GlobalDisplayFlexColumnBox>

        <GlobalDisplayFlexColumnBox gap={"20px"}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontSize: "24px",
              fontWeight: "400",
              mt: "20px",
            }}
          >
            Disputes Resolution
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
            The laws of the Country, excluding its conflicts of law rules, shall
            govern this Terms and Your use of the Service. Your use of the
            Application may also be subject to other local, state, national, or
            international laws.
          </Typography>
        </GlobalDisplayFlexColumnBox>

        <GlobalDisplayFlexColumnBox gap={"20px"}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontSize: "24px",
              fontWeight: "400",
              mt: "20px",
            }}
          >
            Translation Interpretation
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
            The laws of the Country, excluding its conflicts of law rules, shall
            govern this Terms and Your use of the Service. Your use of the
            Application may also be subject to other local, state, national, or
            international laws.
          </Typography>
        </GlobalDisplayFlexColumnBox>

        <GlobalDisplayFlexColumnBox gap={"20px"}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontSize: "24px",
              fontWeight: "400",
              mt: "20px",
            }}
          >
            Changes to These Terms and Conditions
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
            The laws of the Country, excluding its conflicts of law rules, shall
            govern this Terms and Your use of the Service. Your use of the
            Application may also be subject to other local, state, national, or
            international laws.
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
            The laws of the Country, excluding its conflicts of law rules, shall
            govern this Terms and Your use of the Service. Your use of the
            Application may also be subject to other local, state, national, or
            international laws.
          </Typography>
        </GlobalDisplayFlexColumnBox> */}
        </GlobalDisplayFlexColumnBox>
      </PublicContainer>
    </>
  );
};

export default Privacy;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  let privacyData = {};

  //  masterData
  try {
    const configRes = await MainApi.get("legal-pages/privacy-policy", {
      headers: {
        "Accept-Language": locale,
        locale: locale,
      },
    });
    privacyData = configRes?.data?.data?.setting;
  } catch (e) {
    privacyData = {};
  }

  return {
    props: {
      privacyData,
    },
  };
};
