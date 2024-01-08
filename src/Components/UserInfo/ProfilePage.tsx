import { CustomStackFullWidth } from "@/styles/PublicStyles";
import React from "react";
import CustomShimmerForProfile from "../customShimmerForProfile/customShimmerForProfile";
import EditProfile from "./ProfileBody/EditProfile";
import Meta from "../GlobalComponent/Meta";
import { useAppSelector } from "@/redux/store";

const ProfilePage = () => {
  const { accountInfo } = useAppSelector((state) => state.profile);
 
  return (
    <>
      <Meta title={accountInfo?.first_name} description="" keywords="" />

      <CustomStackFullWidth spacing={2}>
        <EditProfile />
      </CustomStackFullWidth>
    </>
  );
};

export default ProfilePage;
