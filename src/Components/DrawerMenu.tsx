import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";

import { useTranslation } from "react-i18next";
import { RTL } from "./GlobalComponent/RTL/RTL";

import {
  CustomDrawer,
  CustomNavbarTypography,
  GlobalButton,
} from "@/styles/PublicStyles";

import AreaDialog from "./Dialogs/AreaDialog";
import CollapsableMenu from "./GlobalComponent/CollapsableMenu";
import { HomeAreas } from "@/interfaces/HomeAreas";
import { HomeServices } from "@/interfaces/HomeServices";
import AuthModal from "./AuthBox/AuthModel";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "@/redux/store";
import { LogoutRequest } from "@/redux/slices/ContactingUs";
import Link from "next/link";
import logo from "../../public/navbar/logo.svg"
const DrawerMenu = ({
  onClose,
  open,
  children,
  areas,
  services,
  token,
}: {
  open: boolean;
  onClose: (e: boolean) => void;
  children: React.ReactNode;
  areas: HomeAreas[];
  services: HomeServices[];
  token: null | undefined | string;
}) => {
  const [openAreaDialog, setOpenAreaDialog] = useState<boolean>(false);
  const [forSignup, setForSignup] = useState<string>("");
  const [modalFor, setModalFor] = useState<string>("sign-in");
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = useRouter();
  const [languagedirection, setLanguagedirection] = useState<string>("ltr");
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [authModalOpen, setOpen] = useState<boolean>(false);
  const [ServiceId, setServiceId] = useState<string | undefined>();
  const dispatch = useAppDispatch();
  //  change route function
  const changeLocale = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
    setOpenDrawer(false);
  };
  //  open Auth dialog
  const handleOpenAuthModal = () => {
    setOpen(true);
    setOpenDrawer(false);
  };
  //  close area dialog
  const CloseDialog = () => setOpenAreaDialog(false);
  //  close Auth dialog
  const handleCloseAuthModal = () => {
    setOpen(false);
    setForSignup("sign-in");
  };

  //  get cm_firebase_token from local storage

  let fcm_token: string | undefined | null = "";

  if (typeof window !== "undefined") {
    fcm_token = localStorage.getItem("fcm_token");
  }
  //  logout function
  const handleLogout = async () => {
    try {
      // router.push("/", locale);
      dispatch(LogoutRequest({ fcm_token: fcm_token })).then(
        (promiseResponse) => {
          if (
            promiseResponse?.payload?.message === "Logged out successfully!" ||
            promiseResponse?.payload?.message === "!تم تسجيل الخروج بنجاح"
          ) {
            localStorage.removeItem("token");
            localStorage.removeItem("cm_firebase_token");
            // toast.success(t("Logout Successfully"));
          }
        }
      );
      // localStorage.removeItem("token");
      // toast.success(t("Logout Successfully"));
    } catch (err) {
      //   toast.error('Unable to logout.');
    }
  };

  //    open drawer
  const toggleDrawer =
    (openDrawer: boolean) => (event: React.KeyboardEvent | any) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setOpenDrawer(openDrawer);
    };

  //  handel direction related to language
  useEffect(() => {
    if (locale === "en") {
      setLanguagedirection("ltr");
    } else {
      setLanguagedirection("rtl");
    }
  }, [locale]);

  const handleRoute = (path: string) => {
    router.push(`/${path}`);
    setOpenDrawer(false);
  };
  const menuList = () => (
    <RTL direction={languagedirection ? languagedirection : "ltr"}>
      <Box
        sx={{ width: "auto", mt: "40px" }}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
      >
        <List
          sx={{ mt: "30px" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <CollapsableMenu
            setServiceId={setServiceId}
            setOpenDrawer={setOpenDrawer}
            setOpenAreaDialog={setOpenAreaDialog}
            services={services}
          />
          {/*How It Work*/}
          <ListItemButton
            sx={{
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
          >
            <ListItemText
              primary={t("How It Work")}
              onClick={() => handleRoute("howItWork")}
            />
          </ListItemButton>

          {/*Pricing*/}
          <ListItemButton
            sx={{
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
          >
            <ListItemText
              primary={t("Pricing")}
              onClick={() => handleRoute("pricing")}
            />
          </ListItemButton>

          {/*Contact us*/}
          <ListItemButton
            sx={{
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
          >
            <ListItemText
              primary={t("Contact us")}
              onClick={() => handleRoute("contactUs")}
            />
          </ListItemButton>

          {/*Language*/}
          <ListItemButton
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <CustomNavbarTypography
              onClick={() => {
                if (locale === "en") {
                  changeLocale("ar");
                  //   window.location.reload()
                } else {
                  changeLocale("en");
                  //   window.location.reload()
                }
              }}
              style={{ fontSize: "14px" }}
              sx={{
                textDecoration: "underline",
                fontWeight: "400",
                fontSize: "14px",
              }}
            >
              {locale === "en" ? "AR" : "EN"}
            </CustomNavbarTypography>
          </ListItemButton>
          <ListItemButton
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            {token ? (
              <GlobalButton
                onClick={() => handleLogout()}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  borderRadius: "4px",
                }}
                px={"30px"}
                py={"10px"}
              >
                {t("Logout")}
              </GlobalButton>
            ) : (
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
            )}
          </ListItemButton>
        </List>
      </Box>
    </RTL>
  );

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        gap: "15px",
        alignItems: "center",
      }}
      maxWidth="lg"
    >
      {authModalOpen && (
        <AuthModal
          open={authModalOpen}
          modalFor={modalFor}
          setModalFor={setModalFor}
          handleClose={handleCloseAuthModal}
        />
      )}
      <AreaDialog
        homeAreas={areas}
        openAreaDialog={openAreaDialog}
        handleClose={CloseDialog}
        ServiceId={ServiceId}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{ width: "40%", display: "flex", justifyContent: "flex-start" }}
        >
          <Link href="/" prefetch style={{ width: "100%" }}>
            <img
              style={{ width: "60.5px", height: "50px" }}
              src={logo?.src}
              alt="img"
              loading="lazy"
            />
          </Link>
        </Box>
        <Box
          sx={{
            width: "65%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {token && children}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={toggleDrawer(!openDrawer)}
            sx={{
              color: theme.palette.primary.main,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/*  drawer drop down */}
      <CustomDrawer
        anchor="top"
        open={openDrawer}
        onClose={toggleDrawer(false)}
      >
        {menuList()}
      </CustomDrawer>
    </Container>
  );
};

export default DrawerMenu;
