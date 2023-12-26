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
import { useAppSelector } from "@/redux/store";
import AuthModal from "./AuthBox/AuthModel";
const Navbar = () => {
  //  hooks
  const router = useRouter();
  const { push, locale, pathname, query, asPath } = useRouter();

  const { t } = useTranslation();
  const theme = useTheme();
  const anchorRef = useRef<Element | PopoverVirtualElement | null>(null);
  const [openAreaDialog, setOpenAreaDialog] = useState<boolean>(false);
  const [ServiceId, setServiceId] = useState<number | undefined>();
  const [modalFor, setModalFor] = useState<string>("sign-in");

  const [authModalOpen, setOpen] = useState<boolean>(false);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  //  selectors

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

  //  close Area model
  const CloseDialog = () => setOpenAreaDialog(false);

  //   save token in variable from localstaorage

  let token: undefined | any | string = undefined;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  //  handel profile section and login button due to token

  const handelAuth = (): React.ReactNode => {
    return !token ? (
      <Box>
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
      </Box>
    ) : (
      <Box  onClick={handleOpenPopover}>
        <Stack
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
              Hello, Mohamed
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
      </Box>
    );
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          py: "15px",
          position: "fixed",
          top: "0",
          width: "100%",
          zIndex: 1005,
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
                <Box sx={{ width: { md: "40%", xs: "100%" } }}>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    onClick={() => push("/")}
                  >
                    home
                  </Typography>
                </Box>

                <GlobalDisplayFlexBox
                  sx={{
                    width: { md: "60%", xs: "100%" },
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
                  <CustomNavbarTypography>
                    {t("How It Work")}
                  </CustomNavbarTypography>
                  <CustomNavbarTypography>
                    {t("Pricing")}
                  </CustomNavbarTypography>
                  <CustomNavbarTypography>
                    {t("Contact us")}
                  </CustomNavbarTypography>
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
                    gap: "0px",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
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
                    Hello, Mohamed
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
