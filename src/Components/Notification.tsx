import {
  CustomPaperBigCard,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Typography, styled, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";

import dumyImg from "../../public/navbar/dumyNotificationImg.svg";
import SimpleBar from "simplebar-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import LoadingComponent from "./GlobalComponent/LoadingComponent";
import { useTranslation } from "react-i18next";
interface Props {
  onClose: () => void;
  open: boolean;
}
const NotificationPoPover = (props: Props) => {
  //    hooks

  const theme = useTheme();
  const { locale } = useRouter();
  const { notifications, isloading } = useAppSelector(
    (state) => state.notification
  );
  const { onClose, open } = props;
  const { t } = useTranslation();
  const router=useRouter()
  //  handle close popover

  let menuRef: any = useRef();
  useEffect(() => {
    const handler = (e: any) => {
      if (!menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

 
  return (
    <Box
      ref={menuRef}
      sx={{
        display: open ? "flex" : "none",
        position: "absolute",
        top: { md: "40px", xs: "50px" },
        right: locale === "en" ? {sm:"13%",xs:"7%"} : "13.5%",
        maxHeight: "500px",
        overflowY: "auto",
        zIndex: "99999",
        backgroundColor: "white",
        borderRadius: "15px",
        boxShadow: "0px 0px 4px 0px #00000033",
        height: "390px",
        width: {sm:"390px",xs:"270px"},
      }}
    >
      <CustomPaperBigCard sx={{ backgroundColor: "white" }} >
        <GlobalDisplayFlexColumnBox
          width={"100%"}
          gap={"15px"}
          sx={{ py: "10px" }}
        >
          {notifications?.length > 0 &&
            !isloading &&
            notifications?.map((e, i) => (
              <GlobalDisplayFlexColumnBox width={"100%"} gap={"10px"} key={i}>
                <GlobalDisplayFlexColumnBox gap={"5px"}>
                  <Typography
                    style={{
                      textAlign: locale === "en" ? "left" : "right",
                    }}
                    dir="ltr"
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                    }}
                  >
                    {e?.date}
                  </Typography>
                  <CustomPaperBigCard sx={{ backgroundColor: "white",cursor:e?.order_id?"pointer":"default" }}
                  
                  onClick={()=>{
                    if(e?.order_id){
                      router.push("/info?page=order")
                    }
                  }}
                  >
                    <GlobalDisplayFlexBox sx={{ gap: "50px" }}>
                      <GlobalDisplayFlexBox sx={{ gap: "12px" }}>
                        <img src={e?.image} loading="lazy" alt="img" />

                        <GlobalDisplayFlexColumnBox gap={"7px"} width={"100%"}>
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: "500" }}
                          >
                            {e?.title}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "400",
                              color: theme.palette.secondary.contrastText,
                            }}
                          >
                            {e?.message}
                          </Typography>
                        </GlobalDisplayFlexColumnBox>
                      </GlobalDisplayFlexBox>

                      {/* <Typography sx={{ fontSize: "12px" }}>13:54</Typography> */}
                    </GlobalDisplayFlexBox>
                  </CustomPaperBigCard>
                </GlobalDisplayFlexColumnBox>
              </GlobalDisplayFlexColumnBox>
            ))}

          {notifications?.length === 0 && isloading && <LoadingComponent />}
          {notifications?.length === 0 && !isloading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                minHeight: "300px",
              }}
            >
              <Typography>{t("Empty Data")}</Typography>
            </Box>
          )}
        </GlobalDisplayFlexColumnBox>
      </CustomPaperBigCard>
    </Box>
  );
};

export default NotificationPoPover;
