import GlobalTypography from "@/Components/HomePage/GlobalTypography";
import PublicContainer from "@/Components/PublicContainer";
import {
  CustomPaperBigCard,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import img1 from "../../../public/HowItWork/photosection1.png";
import img2 from "../../../public/HowItWork/photosection2.png";
import img3 from "../../../public/HowItWork/photosection3.png";
import WorkCard from "@/Components/HowItWork/WorkCard";
export interface data {
  title: string;
  describtion: string;
  img: { src: string };
}
// efeef
const HowItWork = () => {
  //  hooks

  const { t } = useTranslation();

  const dataArray: data[] = [
    {
      title: "Creating your account is fast and easy",
      describtion:
        "Type your full name and phone number to set up your account with us.",
      img: img1,
    },
    {
      title: "Add Your washing preferences",
      describtion:
        "Add what you need through many of the services we provide to you",
      img: img2,
    },
    {
      title: "Place your order",
      describtion:
        "Check your order preferences, payment method,Submit your order in just one click.",
      img: img3,
    },
  ];
  return (
    <PublicContainer>
      <CustomPaperBigCard sx={{ backgroundColor: "white" }}>
        <GlobalDisplayFlexColumnBox
          width={"100%"}
          gap={"140px"}
          sx={{ py: "50px" }}
        >
          <GlobalDisplayFlexColumnBox width={"100%"} gap={"48px"}>
            <GlobalTypography FirstSection clearBg text={"How Alwan-Elghasil Work"} />
            <Typography
              sx={{ fontSize: "20px", fontWeight: "400", textAlign: "center" }}
            >
              {t(
                "The faster way to do Laundry and all you need so you never have to worry about washing"
              )}
            </Typography>
          </GlobalDisplayFlexColumnBox>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "160px",width:"85%",mx:"auto" }}>
            {dataArray?.map((e: data, i) => (
              <WorkCard key={i} element={e} />
            ))}
          </Box>
        </GlobalDisplayFlexColumnBox>
      </CustomPaperBigCard>
    </PublicContainer>
  );
};

export default HowItWork;
