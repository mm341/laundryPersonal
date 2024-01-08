import {
  CustomPaperBigCard,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Typography, styled, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import dumyImg from "../../public/navbar/dumyNotificationImg.svg";
import SimpleBar from "simplebar-react";
interface Props {
  onClose: () => void;
  open: boolean;
}
const NotificationPoPover = (props: Props) => {
  //    hooks

  const { t } = useTranslation();
  const theme = useTheme();
  const { locale } = useRouter();

  const { onClose, open } = props;
  const array = [...Array(4)];
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
  const ScrollbarRoot = styled(SimpleBar)`
    .simplebar-scrollbar::before {
      width: 6px;

      background-color: #d9d9d9;
    }
  `;
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
        backgroundColor:"white",
        borderRadius:"15px",
        boxShadow: "0px 0px 4px 0px #00000033"

        
      }}
    >
      <CustomPaperBigCard sx={{ backgroundColor: "white" }}>
        <GlobalDisplayFlexColumnBox
          width={"100%"}
          gap={"15px"}
          sx={{ py: "10px" }}
        >
          {array?.map((e, i) => (
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
                          order
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "400",
                            color: theme.palette.secondary.contrastText,
                          }}
                        >
                          your order is confirmed
                        </Typography>
                      </GlobalDisplayFlexColumnBox>
                    </GlobalDisplayFlexBox>

                    <Typography sx={{ fontSize: "12px" }}>13:54</Typography>
                  </GlobalDisplayFlexBox>
                </CustomPaperBigCard>
              </GlobalDisplayFlexColumnBox>
            </GlobalDisplayFlexColumnBox>
          ))}
        </GlobalDisplayFlexColumnBox>
      </CustomPaperBigCard>
    </Box>
  );
};

export default NotificationPoPover;
