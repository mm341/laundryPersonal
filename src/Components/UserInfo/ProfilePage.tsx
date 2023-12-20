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
      {data ? (
        <CustomStackFullWidth spacing={2}>
          {/* <Grid container spacing={1.2}>
                <ProfileStatistics
                    value={data?.data?.order_count}
                    title="Orders"
                    image={order.src}
                    pathname="order"
                />
                {global?.customer_wallet_status !== 0 && (
                    <ProfileStatistics
                        value={addCurrencySymbol}
                        title="Amount in Wallet"
                        image={wallet.src}
                        pathname="wallets"
                    />
                )}
                {global?.loyalty_point_status !== 0 && (
                    <ProfileStatistics
                        value={data?.data?.loyalty_point}
                        title="Loyalty Points"
                        image={lotaly.src}
                        pathname="loyalty"
                    />
                )}
                <ProfileStatistics
                    value={
                        Object?.values(wishListData).length > 0
                            ? Number(wishListData?.food?.length) +
                              Number(wishListData?.restaurant?.length)
                            : 0
                    }
                    title="Favorite"
                    image={user.src}
                    pathname="wishlist"
                />
            </Grid> */}
          {/* {editProfile */}
          <EditProfile />
        </CustomStackFullWidth>
      ) : (
        <CustomShimmerForProfile />
      )}
    </>
  );
};

export default ProfilePage;
