import PropTypes from "prop-types";
// import toast from 'react-hot-toast'
import {
  alpha,
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  PopoverVirtualElement,
  Stack,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import profile from "../../../public/navbar/profileImg.svg";
import order from "../../../public/navbar/orderImg.svg";
import addresseIcon from "../../../public/navbar/addresseImg.svg";
import DeleteDialog from "../DeleteDialogs";
import { useAppDispatch } from "@/redux/store";
import { LogoutRequest } from "@/redux/slices/ContactingUs";

interface Props {
  anchorEl: Element | PopoverVirtualElement | null;
  onClose: () => void;
  open: boolean;
  customClose?: any;
}
export const AccountPopover = (props: Props) => {
  const { locale } = useRouter();
  const router = useRouter();
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const { anchorEl, onClose, open } = props;
  const dispatch = useAppDispatch();
  const menuData = [
    {
      id: 1,
      label: "My Profile",
      value: "profile",
      img: profile,
    },
    {
      id: 2,
      label: "My Orders",
      value: "order",
      img: order,
    },
    {
      id: 3,
      label: "Address manager",
      value: "Address",
      img: addresseIcon,
    },
  ];
  const [languagedirection, setlanguagedirection] = useState("ltr");
  const [logout, setLogout] = useState<boolean>(false);

  //  get cm_firebase_token from local storage
  let fcm_token: string | undefined | null = "";

  if (typeof window !== "undefined") {
    fcm_token = localStorage.getItem("fcm_token");
  }
  //  logout function
  const handleLogout = async () => {
   
    
    dispatch(LogoutRequest({ fcm_token: fcm_token })).then(
      (promiseResponse) => {
        if (
          promiseResponse?.payload?.message === "Logged out successfully!" ||
          promiseResponse?.payload?.message === "!تم تسجيل الخروج بنجاح"
        ) {
          setLogout(false);
          router.push("/", locale);
          localStorage.removeItem("token");
          localStorage.removeItem("cm_firebase_token");
          // toast.success(t("Logout Successfully"));
        }
      }
    );
   
  };

  const handleClick = (item: { id: number; label: string; value: string }) => {
    router.push({
      pathname: "/info",
      query: {
        page: item?.value,
      },
    });
    onClose();
  };
  //  handel direction of section due to language
  useEffect(() => {
    if (locale === "en") {
      setlanguagedirection("ltr");
    } else {
      setlanguagedirection("rtl");
    }
  }, [locale]);

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
    <>
      <Box
        ref={menuRef}
        sx={{
          display: open ? "flex" : "none",
          position: "absolute",
          top: { md: "50px", xs: "50px" },
          right: locale === "en" ? {xl:"20%",lg:"12%",xs:"12%"} : "21%",
          backgroundColor: "#F3F6FF",
          zIndex: "99999",
          borderRadius: "5px",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            // alignItems:languagedirection === 'rtl' ? 'end' : 'start',
            width: "100%",
            p: 1,
            cursor: "pointer",
            display: "flex",
          }}
        >
          <MenuList sx={{ width: "100%" }}>
            {menuData?.map((menu, index) => (
              <MenuItem
                onClick={() => handleClick(menu)}
                key={index}
                sx={{
                  justifyContent: `${
                    languagedirection === "rtl" && "flex-start"
                  }`,
                  gap: "10px",
                  width: "100%",
                  my: "2px",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.3),
                  },
                }}
              >
                <img src={menu?.img?.src} loading="lazy" alt="accountIMg" />
                <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                  {t(menu?.label)}
                </Typography>
              </MenuItem>
            ))}
          </MenuList>
        </Box>
        <Divider />
        <Box
          sx={{ my: 1, cursor: "pointer" }}
          alignItems={languagedirection === "rtl" ? "end" : "start"}
          width="100%"
        >
          <MenuItem
            onClick={() => setOpenModal(true)}
            sx={{
              justifyContent: `${
                languagedirection === "rtl" ? "flex-end" : "flex-start"
              }`,
              "&:hover": {
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.3),
              },
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              onClick={() => setLogout(true)}
              primary={
                <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                  {t("Logout")}
                </Typography>
              }
            />
          </MenuItem>
        </Box>
      </Box>

      {/* //  logOut Dialog */}
      {logout && (
        <DeleteDialog
          handelAction={handleLogout}
          Cancel={"Cancel"}
          header={"Log out?"}
          openDeleteDialog={logout}
          setOpenDeleteDialog={setLogout}
          text={"Are you sure you want to logout from this account?"}
          primaryButtonText={"Yes, Logout"}
        />
      )}
    </>
  );
};
