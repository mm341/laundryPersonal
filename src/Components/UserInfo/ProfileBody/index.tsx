import { RTL } from "@/Components/GlobalComponent/RTL/RTL";
import React from "react";
import ProfilePage from "../ProfilePage";

import OrderPage from "../OrderPage";
import MyAddresses from "./MyAddresses";

const ProfileBody = ({ page }: { page: string }) => {
  let languagedirection = undefined;
  if (typeof window !== "undefined") {
    languagedirection = localStorage.getItem("direction");
  }

  const activeComponent = () => {
    if (page === "profile") {
      return <ProfilePage />;
    }
    if (page === "Address") {
      return <MyAddresses  />;
    }

   
    if (page === "order") {
      return <OrderPage />;
    }
    
  };

  return <RTL direction={languagedirection}>{activeComponent()}</RTL>;
};

export default ProfileBody;
