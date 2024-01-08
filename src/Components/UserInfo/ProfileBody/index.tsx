import { RTL } from "@/Components/GlobalComponent/RTL/RTL";
import React, { useEffect, useState } from "react";
import ProfilePage from "../ProfilePage";

import OrderPage from "../OrderPage";
import MyAddresses from "./MyAddresses";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/store";

const ProfileBody = ({ page }: { page: string }) => {
  //  hooks
  const { locale } = useRouter();
  const [languagedirection, setLanguagedirection] = useState<string>("ltr");
  

  //  handel language direction due to langauge
  useEffect(() => {
    locale === "en" ? setLanguagedirection("ltr") : setLanguagedirection("rtl");
  }, [locale]);

  const activeComponent = () => {
    if (page === "profile") {
      return <ProfilePage />;
    }
    if (page === "Address") {
      return <MyAddresses />;
    }

    if (page === "order") {
      return <OrderPage />;
    }
  };

  return <RTL direction={languagedirection}>{activeComponent()}</RTL>;
};

export default ProfileBody;
