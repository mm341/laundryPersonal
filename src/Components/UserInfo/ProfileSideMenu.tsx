import React, { useEffect, useState } from "react";

import { RTL } from "../GlobalComponent/RTL/RTL";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "@/styles/PublicStyles";
import MenuBar from "./MenuBar";
import AccountCircleIcon from "../../../public/info/info.svg";
import AddresseIcon from "../../../public/info/addresse.svg";
import orderPageIcon from "../../../public/info/order.svg";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material";
interface profileSideMenu {
  sidedrawer: string;
  onClose: () => void;
  page: string;
}

export interface TabDatainfo {
  id: number;
  label: string;
  value: string;
  img: { src: string };
}
const ProfileSideMenu = ({ onClose, sidedrawer, page }: profileSideMenu) => {
  const theme=useTheme()
  const { locale } = useRouter();
  const [languagedirection, setLanguagedirection] = useState<string>("ltr");
  const tabDatainfo: TabDatainfo[] = [
    {
      id: 1,
      label: "My Account",
      value: "profile",
      img: AccountCircleIcon,
    },

    {
      id: 2,
      label: "My Orders",
      value: "order",
      img: orderPageIcon,
    },
    {
      id: 3,
      label: "Address manager",
      value: "Address",
      img: AddresseIcon,
    },
  ];

  useEffect(() => {
    locale === "en" ? setLanguagedirection("ltr") : setLanguagedirection("rtl");
  }, [locale]);

  return (
    <RTL direction={languagedirection}>
      <CustomPaperBigCard
        sx={{
          borderRadius: "5px",
          height: "100%",
          padding: "1rem",
          boxShadow: "box-shadow: 0px 0px 6px 0px #00000026",
          backgroundColor: theme.palette.primary.dark,
          mt:{md:"0px",xs:"100px"}
        }}
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
