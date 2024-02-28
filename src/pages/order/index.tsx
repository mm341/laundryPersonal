import PublicContainer from "@/Components/PublicContainer";
import {
  GlobalButton,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import React from "react";
import orderImg from "../../../public/order/orderImg.png";
import { Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import HandelNotification from "@/Components/GlobalComponent/HandelNotification";
import Meta from "@/Components/GlobalComponent/Meta";
const OrderPage = () => {
  //  hooks

  const { t } = useTranslation();
  const theme = useTheme();
  const { push } = useRouter();
  return (
    <HandelNotification>
       <Meta
        title={"Order"}
        // ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
      />
      <PublicContainer>
        <GlobalDisplayFlexColumnBox
          width={"100%"}
          gap={"48px"}
          alignItems={"center"}
          height={"100%"}
          sx={{ mt: { sm: "100px", xs: "70px" } }}
        >
          <img
            loading="lazy"
            alt="img"
            src={orderImg?.src}
            style={{ width: "551px", height: "319px" }}
          />
          <GlobalDisplayFlexColumnBox width={"100%"} gap={"24px"}>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: { sm: "24px", xs: "20px" },
                fontWeight: "500",
              }}
            >
              {t("You place the order successfully.")}
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: { sm: "20px", xs: "17px" },
                fontWeight: "400",
              }}
            >
              {t(
                "We start our delivery process and you will receive your order soon."
              )}
            </Typography>
          </GlobalDisplayFlexColumnBox>

          <GlobalButton
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              color: "white",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "8px",
            }}
            px={"0"}
            py={"0"}
            width={"261px"}
            height={"48px"}
            onClick={() => push("/info?page=order")}
          >
            {t("View Order Details")}
          </GlobalButton>
        </GlobalDisplayFlexColumnBox>
      </PublicContainer>
    </HandelNotification>
  );
};

export default OrderPage;
