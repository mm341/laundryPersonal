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
interface Props {
  onClose: () => void;
  open: boolean;
}
const NotificationPoPover = (props: Props) => {
  //    hooks

  const theme = useTheme();
  const { locale } = useRouter();
  const { notifications,isloading } = useAppSelector((state) => state.notification);
  const { onClose, open } = props;
console.log(notifications)
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

  //  custom design of scrollbar

  return (
    <Box
      ref={menuRef}
      sx={{
        display: open ? "flex" : "none",
        position: "absolute",
        top: { md: "40px", xs: "65px" },
        right: locale === "en" ? "13%" : "13.5%",
        maxHeight: "500px",
        overflowY: "auto",
        zIndex: "99999",
        backgroundColor: "white",
        borderRadius: "15px",
        boxShadow: "0px 0px 4px 0px #00000033",
        height: "390px",
        width:"390px"
      }}
    >
      <CustomPaperBigCard sx={{ backgroundColor: "white" }}>
        <GlobalDisplayFlexColumnBox
          width={"100%"}
          gap={"15px"}
          sx={{ py: "10px" }}
        >
          {notifications?.length > 0 &&!isloading &&
            notifications?.map((e, i) => (
              <GlobalDisplayFlexColumnBox width={"100%"} gap={"10px"} key={i}>
                <GlobalDisplayFlexColumnBox gap={"5px"}>
                  <Typography sx={{ fontWeight: "400", fontSize: "12px" }}>
                    28 Nov, 2023
                  </Typography>
                  <CustomPaperBigCard sx={{ backgroundColor: "white" }}>
                    <GlobalDisplayFlexBox sx={{ gap: "50px" }}>
                      <GlobalDisplayFlexBox sx={{ gap: "12px" }}>
                        <img src={dumyImg?.src} loading="lazy" alt="img" />

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

                      <Typography sx={{ fontSize: "12px" }}>13:54</Typography>
                    </GlobalDisplayFlexBox>
                  </CustomPaperBigCard>
                </GlobalDisplayFlexColumnBox>
              </GlobalDisplayFlexColumnBox>
            ))}

          {notifications?.length === 0 &&isloading && (
            <LoadingComponent />
          )}
        </GlobalDisplayFlexColumnBox>
      </CustomPaperBigCard>
    </Box>
  );
};

export default NotificationPoPover;
