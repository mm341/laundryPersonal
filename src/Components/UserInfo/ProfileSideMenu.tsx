import React from "react";

import { RTL } from "../GlobalComponent/RTL/RTL";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "@/styles/PublicStyles";
import MenuBar from "./MenuBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import RequestPageIcon from "@mui/icons-material/RequestPage";
interface profileSideMenu {
  sidedrawer: string ;
  onClose: () => void
  page: string;
}

export interface TabDatainfo {
  id: number;
  label: string;
  value: string;
  img: React.ReactComponentElement<any>;
}
const ProfileSideMenu = ({ onClose, sidedrawer, page }: profileSideMenu) => {
  const tabDatainfo: TabDatainfo[] = [
    {
      id: 1,
      label: "My Account",
      value: "profile",
      img: <AccountCircleIcon />,
    },
    {
      id: 2,
      label: "My Address",
      value: "Address",
      img: <HomeIcon />,
    },

    {
      id: 3,
      label: "My Orders",
      value: "order",
      img: <RequestPageIcon />,
    },
  ];

  let languagedirection = undefined;
  if (typeof window !== "undefined") {
    languagedirection = localStorage.getItem("direction");
  }

  return (
    <RTL direction={languagedirection}>
      <CustomPaperBigCard
        sx={{ borderRadius: "5px", height: "100%", padding: "1rem" }}
      >
        <CustomStackFullWidth spacing={3}>
          <MenuBar
            tabData={tabDatainfo}
            onClose={onClose}
            sidedrawer={sidedrawer}
            page={page}
          />
        </CustomStackFullWidth>
      </CustomPaperBigCard>
    </RTL>
  );
};

export default ProfileSideMenu;
