import { CustomStackFullWidth } from "@/styles/PublicStyles";
import React from "react";
import CustomShimmerForProfile from "../customShimmerForProfile/customShimmerForProfile";
import EditProfile from "./ProfileBody/EditProfile";

const ProfilePage = () => {

  
  let data = true;
  return (
    <>
      {/* <Meta title={data?.data?.f_name} description="" keywords="" /> */}
      {/* <AuthModal
        open={authModalOpen}
        handleClose={handleCloseAuthModal}
        modalFor={modalFor}
        setModalFor={setModalFor}
    /> */}
      {/* {data ? ( */}
        <CustomStackFullWidth spacing={2}>
          
          {/* {editProfile */}
          <EditProfile />
        </CustomStackFullWidth>
      
    </>
  );
};

export default ProfilePage;
