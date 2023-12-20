import React from "react";
import { alpha, List, MenuItem, Typography, useTheme } from "@mui/material";
import { t } from "i18next";
import Router from "next/router";
import { useSelector } from "react-redux";
import { TabDatainfo } from "./ProfileSideMenu";
import { CustomStackFullWidth } from "@/styles/PublicStyles";
import CustomImageContainer from "../Cards/CustomImageContainer";

interface menubar {
  tabData: TabDatainfo[];
  onClose: () => void;
  page: string;
  sidedrawer: string;
}
const MenuBar = ({ tabData, onClose, sidedrawer, page }: menubar) => {
  const theme = useTheme();
  const handleClick = (item: TabDatainfo) => {
    Router.push(
      {
        pathname: "/info",
        query: { page: item?.value },
      },
      undefined,
      { shallow: true }
    );
    sidedrawer === "true" && onClose();
  };

  return (
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
            <CustomImageContainer
              src={item?.img}
              width="20px"
              alt={"image"}
             
            />
            <Typography fontSize="16px" fontWeight="500">
              {t(item.label.replaceAll("-", " "))}
            </Typography>
          </CustomStackFullWidth>
        </MenuItem>
      ))}
    </List>
  );
};

export default MenuBar;
