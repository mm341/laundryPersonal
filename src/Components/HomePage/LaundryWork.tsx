import { GlobalDisplayFlexColumnBox } from "@/styles/PublicStyles";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import GlobalTypography from "./GlobalTypography";
import PublicContainer from "../PublicContainer";
import GlobalLaundryCard from "../Cards/WorklaaundryCard";
import stepPhoto from "../../../public/HomePage/stepPhoto.png";
import stepPhotoArabic from "../../../public/HomePage/WorkLaundery/stepArabic.png";
import Photo1 from "../../../public/HomePage/WorkLaundery/photo1.svg";
import Photo2 from "../../../public/HomePage/WorkLaundery/photo2.svg";
import Photo3 from "../../../public/HomePage/WorkLaundery/photo3.svg";
import { useRouter } from "next/router";
export interface work {
  img: { src: string };
  title: { en: string; ar: string };
  describtion: { en: string; ar: string };
}
const WorkLaundry = () => {
  //  hook
  const theme = useTheme();
  const { locale } = useRouter();
  const issmall = useMediaQuery(theme.breakpoints.down("md"));
  //  work section data
  const array: work[] = [
    {
      img: Photo1,
      title: { en: "Determine the schedule", ar: "حدد الجدول الزمني" },
      describtion: {
        en: "Choose your area and the pickup and delivery times that suit you through our mobile or web.",
        ar: "اختر منطقتك و أوقات الاستلام والتوصيل التي تناسبك من خلال تطبيقنا على الهاتف المحمول أو الويب.",
      },
    },
    {
      img: Photo2,
      title: { en: "We receive and wash", ar: "نحن نستلم ونغسل" },
      describtion: {
        en: "The delivery will pick you up on time, as we clean and iron your clothes.",
        ar: "سيقوم وكيل التوصيل بالاستلام في الوقت المحدد، حيث نقوم بتنظيف ملابسك وكيها بأحدث الوسائل.",
      },
    },
    {
      img: Photo3,
      title: { en: "Delivery at your door", ar: "الاستلام عند باب منزلك" },
      describtion: {
        en: "Your clothes come back clean and are deliveredto your door on the scheduled delivery date.",
        ar: "تعود ملابسك نظيفة وجميلة ويتم توصيلها عند باب منزلك في تاريخ التسليم المحدد.",
      },
    },
  ];
  return (
    <PublicContainer>
      <GlobalDisplayFlexColumnBox width={"100%"} gap={!issmall?"72px":"30px"}>
        <GlobalTypography text={"How It Work"} />
        <Box
          sx={{
            width: { md: "100%", xs: "70%" },
            display: "flex",
            justifyContent: "center",
            mx: "auto",
          }}
        >
          {!issmall && (
            <img
              src={locale === "en" ? stepPhoto?.src : stepPhotoArabic?.src}
              loading="lazy"
              alt="stepImg"
            />
          )}
        </Box>
        <Grid container spacing={!issmall ? 3 : 5}>
          {array?.map((e: work, i: number) => (
            <Grid key={i} item md={4} sm={6} xs={12}>
              <GlobalLaundryCard element={e} />
            </Grid>
          ))}
        </Grid>
      </GlobalDisplayFlexColumnBox>
    </PublicContainer>
  );
};

export default WorkLaundry;
