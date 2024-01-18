import { CustomStackFullWidth } from "@/styles/PublicStyles";
import React, { useEffect } from "react";
import EditProfile from "./ProfileBody/EditProfile";
import Meta from "../GlobalComponent/Meta";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { GetProfileData } from "@/redux/slices/HandelUpdateProfile";

const ProfilePage = () => {
  //  hooks
  const dispatch=useAppDispatch()

  useEffect(() => {
    dispatch(GetProfileData());
  }, []);
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
