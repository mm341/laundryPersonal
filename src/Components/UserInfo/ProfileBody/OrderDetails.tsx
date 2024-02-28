import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  CustomPaperBigCard,
  GlobalButton,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import OrderCardTopSection from "./OrderCardTopSection";
import BottomOrderDetailsSection from "./BottomOrderDetailsSection";
import OrderDeliveryDetails from "./OrderDeliveryDetails";
import rateButtonIcon from "../../../../public/info/RateButtonIcon.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/router";
import OrderRateDiaolg from "./OrderRateDiaolg";
import { OrdersInterface } from "@/interfaces/OrdersInterface";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import CustomRatings from "@/Components/GlobalComponent/CustomRatings";
import { GetOrderDetails } from "@/redux/slices/OrderSlice";
import LoadingComponent from "@/Components/GlobalComponent/LoadingComponent";
import Meta from "@/Components/GlobalComponent/Meta";
import HandelNotification from "@/Components/GlobalComponent/HandelNotification";
const OrderDetails = ({ orderId }: { orderId: string }) => {
  //  hooks
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const theme = useTheme();
  const { locale } = useRouter();
  const [productsDetails, setOpenProductsDetails] = useState<boolean>(false);
  const [openRateDialog, setOpenRateDialog] = useState(false);

  useEffect(() => {
    orderId && dispatch(GetOrderDetails(orderId));
  }, [orderId]);

  //  selectors

  const { orderData, isLoadingGetOrderDetails } = useAppSelector(
    (state) => state.orders
  );
  return (
    <HandelNotification>
     <Meta
        title={"Order Details"}
        // ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
      />
      <CustomPaperBigCard
        sx={{
          boxShadow: "box-shadow: 0px 0px 6px 0px #00000026",
          backgroundColor: theme.palette.primary.dark,
        }}
      >
        {isLoadingGetOrderDetails ? (
          <LoadingComponent />
        ) : (
          <GlobalDisplayFlexColumnBox
            sx={{ p: "18px" }}
            gap={"20px"}
            width={"100%"}
          >
            <GlobalDisplayFlexBox
              sx={{ flexDirection: "row", justifyContent: "flex-start" }}
              style={{ flexDirection: "row" }}
              gap={"10px"}
            >
              {/*  top section */}
              {locale === "en" ? (
                <ArrowBackIcon
                  onClick={() => {
                    router.push({
                      pathname: "info",
                      query: {
                        page: "order",
                      },
                    });
                  }}
                  sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
                />
              ) : (
                <ArrowForwardIcon
                  onClick={() => {
                    router.push({
                      pathname: "info",
                      query: {
                        page: "order",
                      },
                    });
                  }}
                  sx={{
                    color: theme.palette.primary.main,
                    cursor: "pointer",
                    transform: "translateY(4px)",
                  }}
                />
              )}

              <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                {t("Order Details")}
              </Typography>
            </GlobalDisplayFlexBox>

            <GlobalDisplayFlexColumnBox gap={"45px"} width={"100%"}>
              <CustomPaperBigCard sx={{ backgroundColor: "white" }}>
                <GlobalDisplayFlexColumnBox width={"100%"} gap={"15px"}>
                  {/*  top section items */}
                  <OrderCardTopSection
                    openProductsDetails={productsDetails}
                    setOpenProductsDetails={setOpenProductsDetails}
                    order={orderData}
                  />

                  {/*  ordder details and price */}
                  <BottomOrderDetailsSection order={orderData} />
                </GlobalDisplayFlexColumnBox>
              </CustomPaperBigCard>

              {/*  delivery Details */}
              <OrderDeliveryDetails orderData={orderData} />

              {/*  rate button case delivered order */}

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {(orderData?.order_status === "Delivered" &&
                  !orderData?.ratings) && (
                  <GlobalButton
                    px={"0"}
                    py={"0"}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      width: { md: "320px", xs: "250px" },
                      height: "48px",
                      borderRadius: "5px",
                    }}
                    onClick={() => setOpenRateDialog(true)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={rateButtonIcon?.src}
                        loading="lazy"
                        alt="img"
                        style={{ width: "20px", height: "20px" }}
                      />
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "white",
                        }}
                      >
                        {t("Rate your Experience")}
                      </Typography>
                    </Box>
                  </GlobalButton>
                )}

                {orderData?.order_status === "Delivered" &&
                  orderData?.rating > 0 && (
                    <Typography
                      sx={{
                        color: theme.palette.primary.main,
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "20px",
                        fontWeight: "400",
                      }}
                    >
                      {t("Your Rating")}{" "}
                      <CustomRatings
                        readOnly={true}
                        ratingValue={orderData?.rating}
                        handleChangeRatings={function (value: number): void {
                          throw new Error("Function not implemented.");
                        }}
                      />
                    </Typography>
                  )}
              </Box>
            </GlobalDisplayFlexColumnBox>
          </GlobalDisplayFlexColumnBox>
        )}
      </CustomPaperBigCard>
      {/*  Order Rate Dialog */}
      <OrderRateDiaolg
      orderId={orderId}
        orderData={orderData}
        setOpenRateDialog={setOpenRateDialog}
        openRateDialog={openRateDialog}
      />
   </HandelNotification>
  );
};

export default OrderDetails;
