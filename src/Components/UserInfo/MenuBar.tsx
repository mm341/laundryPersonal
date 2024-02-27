import React, { useState } from "react";
import { alpha, List, MenuItem, Typography, useTheme } from "@mui/material";
import { t } from "i18next";
import Router, { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { TabDatainfo } from "./ProfileSideMenu";
import { CustomStackFullWidth } from "@/styles/PublicStyles";
import CustomImageContainer from "../Cards/CustomImageContainer";
import logouticon from "../../../public/info/logout.svg";
import DeleteDialog from "../DeleteDialogs";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "@/redux/store";
import { LogoutRequest } from "@/redux/slices/ContactingUs";
interface menubar {
  tabData: TabDatainfo[];
  onClose: () => void;
  page: string;
  sidedrawer: string;
}
const MenuBar = ({ tabData, onClose, sidedrawer, page }: menubar) => {
  //  hooks
  const theme = useTheme();
  const router = useRouter();
  const { locale } = useRouter();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  //  get cm_firebase_token from local storage
  let fcm_token: string | undefined | null = "";

  if (typeof window !== "undefined") {
    fcm_token = localStorage.getItem("fcm_token");
  }
  //  change route due to page
  const handleClick = (item: TabDatainfo) => {
    router.push(
      {
        pathname: "/info",
        query: { page: item?.value },
      },
      undefined,
      { shallow: true }
    );
    sidedrawer === "true" && onClose();
  };

  const handellogout = () => {
    dispatch(LogoutRequest({ fcm_token: fcm_token })).then(
      (promiseResponse) => {
        if (
          promiseResponse?.payload?.message === "Logged out successfully!" ||
          promiseResponse?.payload?.message === "!تم تسجيل الخروج بنجاح"
        ) {
          setOpenDeleteDialog(false);
          router.push("/", locale);
          localStorage.removeItem("token");
          localStorage.removeItem("cm_firebase_token");
          toast.success(t("Logout Successfully"));
        }
      }
    );
  };

  return (
    <>
      <List>
        {tabData?.map((item: TabDatainfo, index: number) => (
          <MenuItem
            key={index}
            selected={item.value === page}
            onClick={() => handleClick(item)}
            sx={{
              color: item.value === page ? theme.palette.primary.main : "black",
              paddingY: "0px",
              marginBottom: "5px",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.2),
              },
              "&.Mui-selected": {
                backgroundColor: (theme) => theme.palette.primary.light,
              },
            }}
          >
            <CustomStackFullWidth
              direction="row"
              spacing={1.2}
              padding="10px"
              alignItems={"center"}
            >
              <img
                src={item?.img?.src}
                loading="lazy"
                alt="img"
                style={{ width: "20px" }}
              />
              <Typography fontSize="16px" fontWeight="500">
                {t(item.label.replaceAll("-", " "))}
              </Typography>
            </CustomStackFullWidth>
          </MenuItem>
        ))}
        <CustomStackFullWidth
          onClick={() => setOpenDeleteDialog(true)}
          direction="row"
          spacing={1.6}
          sx={{
            transform:
              locale === "en" ? "translateX(13px)" : "translateX(16px)",
            cursor: "pointer",
          }}
          padding="10px"
          alignItems={"center"}
        >
          <img
            src={logouticon?.src}
            loading="lazy"
            alt="img"
            style={{ width: "20px" }}
          />
          <Typography fontSize="16px" fontWeight="500">
            {t("Logout")}
          </Typography>
        </CustomStackFullWidth>
      </List>

      {/*  logOut Dialog */}
      {openDeleteDialog && (
        <DeleteDialog
          handelAction={handellogout}
          Cancel={"Cancel"}
          header={"Log out?"}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          text={"Are you sure you want to logout from this account?"}
          primaryButtonText={"Yes, Logout"}
        />
      )}
    </>
  );
};

export default MenuBar;
