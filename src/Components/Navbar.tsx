import {
  Box,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
  ButtonBase,
  PopoverVirtualElement,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useEffect, useRef, useState } from "react";
import PublicContainer from "./PublicContainer";
import {
  CustomNavbarTypography,
  GlobalButton,
  GlobalDisplayFlexBox,
} from "@/styles/PublicStyles";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import NavServices from "./NavServices";
import AreaDialog from "./Dialogs/AreaDialog";

import DrawerMenu from "./DrawerMenu";

import accountphoto from "../../public/navbar/accountPhoto.svg";
import { AccountPopover } from "./GlobalComponent/AccountPopover";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import AuthModal from "./AuthBox/AuthModel";
import cartIcon from "../../public/navbar/cart.svg";
import notificationIcon from "../../public/navbar/notification.svg";
import NotificationPoPover from "./Notification";
import {
  GetAllNotification,
  GetMasterData,
} from "@/redux/slices/Notifications";
import { GetProfileData } from "@/redux/slices/HandelUpdateProfile";
import Link from "next/link";
import { toast } from "react-hot-toast";
const Navbar = () => {
  //  hooks
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { push, locale, pathname, query, asPath } = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();
  const anchorRef = useRef<Element | PopoverVirtualElement | null>(null);
  const [openAreaDialog, setOpenAreaDialog] = useState<boolean>(false);
  const [ServiceId, setServiceId] = useState<string | undefined>();
  const [modalFor, setModalFor] = useState<string>("sign-in");

  const [authModalOpen, setOpen] = useState<boolean>(false);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  //  selectors
  const { accountInfo, unReadNotifications } = useAppSelector(
    (state) => state.profile
  );
  const { services, areas } = useAppSelector((state) => state.services);
  const issmall = useMediaQuery(theme.breakpoints.down("md"));

  //  change language function
  const changeLocale = (locale: string) => {
    router.push({ pathname, query }, asPath, { locale });
  };

  //  open auth model

  const handleOpenAuthModal = () => {
    setOpen(true);
    setModalFor("sign-in");
  };
  //  close auth model
  const handleCloseAuthModal = () => {
    setOpen(false);
    setModalFor("sign-in");
  };
  //  open  account popover
  const handleOpenPopover = () => {
    setOpenPopover(!openPopover);
  };
  //  close Popover model
  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  //  open notification popover

  const handleOpenNotification = () => {
    if (token) {
      dispatch(GetAllNotification()).then((promiseResponse) => {
        if (promiseResponse.meta.requestStatus === "fulfilled") {
          dispatch(GetProfileData());
        }
      });
      // dispatch(GetMasterData())
      setOpenNotification(!openNotification);
    } else {
      toast.error(t("You Must Login , At First"));
    }
  };

  //  close notification popover
  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  //  close Area model
  const CloseDialog = () => setOpenAreaDialog(false);

  //   save token in variable from localstaorage

  let token: undefined | any | string = undefined;
  let path: undefined | null | string = undefined;
  if (typeof window !== "undefined") {
    path = localStorage.getItem("path");
    token = localStorage.getItem("token");
  }


  //  handel profile section and login button due to token

  const handelAuth = () => {
    return token ? (
      <Box>
        <Stack
          sx={{
            gap: "32px",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Stack
            onClick={handleOpenPopover}
            sx={{
              gap: "10px",
              justifyContent: "center",
              display: "flex",
              flexDirection: "row",
              cursor: "pointer",
            }}
          >
            <GlobalDisplayFlexBox sx={{ justifyContent: "center", gap: "3px" }}>
              <Typography
                sx={{
                  fontSize: { xl: "16px", md: "12px" },
                  fontWeight: "400",
                  color: "#636363",
                }}
              >
                {t("Hello")}, {accountInfo?.name}
              </Typography>
              <KeyboardArrowDownIcon />
            </GlobalDisplayFlexBox>
            <img
              style={{ width: "33.5px", height: "33.5px" }}
              src={accountphoto?.src}
              loading="lazy"
              alt="accountphoto"
            />
          </Stack>
          <img
            onClick={() => {
              if (path) {
                router.push(path);
              }
            }}
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
            src={cartIcon?.src}
            loading="lazy"
            alt="cartIcon"
          />
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                display: unReadNotifications > 0 ? "flex" : "none",
                position: "absolute",
                right: "-5px",
                top: "0px",
                color: "white",

                width: "16px",
                height: "16px",
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.palette.primary.main,
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "10px",
                  fontWeight: "600",
                }}
              >
                {unReadNotifications}
              </Typography>
            </Box>

            <img
              onClick={handleOpenNotification}
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
              src={notificationIcon?.src}
              loading="lazy"
              alt="notificationIcon"
            />
          </Box>
        </Stack>
      </Box>
    ) : (
      <Stack direction={"row"} gap={"32px"} alignItems={"center"}>
        <GlobalButton
          onClick={handleOpenAuthModal}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            borderRadius: "4px",
          }}
          px={"30px"}
          py={"10px"}
        >
          {t("Login")}
        </GlobalButton>

        <img
          onClick={() => {
            if (path) {
              router.push(path);
            }
          }}
          style={{ width: "30px", height: "30px", cursor: "pointer" }}
          src={cartIcon?.src}
          loading="lazy"
          alt="cartIcon"
        />
      </Stack>
    );
  };

  useEffect(() => {
    if (token ) {
      dispatch(GetProfileData());
    }
  }, [token]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          py: "15px",
          position: "fixed",
          top: "0",
          width: "100vw",
          zIndex: 1200,
          boxShadow: "0px 4px 4px 0px #0000000F",
        }}
      >
        <Box sx={{ position: "relative" }}>
          {!issmall ? (
            <PublicContainer>
              <GlobalDisplayFlexBox
                sx={{
                  alignItems: { md: "center", xs: "flex-start" },
                  gap: { md: "0", xs: "50px" },
                }}
              >
                {/*  logo side */}
                <Link href="/" prefetch>
                  <Box sx={{ width: { md: "12%", xs: "100%" } }}>
                    <Typography sx={{ cursor: "pointer" }}>home</Typography>
                  </Box>
                </Link>
                <GlobalDisplayFlexBox
                  sx={{
                    width: { md: "88%", xs: "100%" },
                    gap: "45px",
                    justifyContent: "flex-end",
                  }}
                >
                  {/* services */}
                  <NavServices
                    setServiceId={setServiceId}
                    services={services}
                    setOpenAreaDialog={setOpenAreaDialog}
                  />
                  <Link href="/howItWork" prefetch>
                    <CustomNavbarTypography>
                      {t("How It Work")}
                    </CustomNavbarTypography>
                  </Link>
                  <Link href="/pricing" prefetch>
                    <CustomNavbarTypography>
                      {t("Pricing")}
                    </CustomNavbarTypography>
                  </Link>

                  <Link href="/contactUs" prefetch>
                    <CustomNavbarTypography>
                      {t("Contact us")}
                    </CustomNavbarTypography>
                  </Link>

                  <CustomNavbarTypography
                    onClick={() => {
                      if (locale === "en") {
                        changeLocale("ar");
                        // window.location.reload()
                      } else {
                        changeLocale("en");
                        //   window.location.reload()
                      }
                    }}
                    sx={{ textDecoration: "underline" }}
                  >
                    {locale === "en" ? "AR" : "EN"}
                  </CustomNavbarTypography>
                  {/*  login button */}
                  {handelAuth()}
                </GlobalDisplayFlexBox>
              </GlobalDisplayFlexBox>
            </PublicContainer>
          ) : (
            <DrawerMenu
              token={token}
              services={services}
              areas={areas}
              onClose={handleClosePopover}
              open={openPopover}
            >
              <Box
                component={ButtonBase}
                onClick={handleOpenPopover}
                ref={anchorRef}
                sx={{ transform: "translateY(5px)" }}
              >
                <Stack
                  sx={{
                    gap: "8px",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "row-reverse",
                    cursor: "pointer",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{ width: "30px", height: "30px" }}
                    src={accountphoto?.src}
                    loading="lazy"
                    alt="accountphoto"
                  />

                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#636363",
                    }}
                  >
                    {t("Hello")}, {accountInfo?.name}
                  </Typography>
                </Stack>
              </Box>
            </DrawerMenu>
          )}
          <AccountPopover
            anchorEl={anchorRef.current}
            onClose={handleClosePopover}
            open={openPopover}
          />
          <NotificationPoPover
            onClose={handleCloseNotification}
            open={openNotification}
          />
        </Box>
      </Box>
      <AreaDialog
        openAreaDialog={openAreaDialog}
        handleClose={CloseDialog}
        homeAreas={areas}
        ServiceId={ServiceId}
      />
      <AuthModal
        open={authModalOpen}
        modalFor={modalFor}
        setModalFor={setModalFor}
        handleClose={handleCloseAuthModal}
      />
    </>
  );
};

export default Navbar;
