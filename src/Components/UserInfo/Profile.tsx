import React from "react";

import { Grid, Stack } from "@mui/material";
import { CustomStackFullWidth } from "@/styles/PublicStyles";
import ProfileSideMenu from "./ProfileSideMenu";
import SideDrawer from "./SideDrawer";
import ProfileBody from "./ProfileBody";

interface userInterface {
  page: string | any;
  orderId:string |any
}
const UserInfo = ({ page,orderId }: userInterface) => {
  return (
    <CustomStackFullWidth
      sx={{
        paddingBlockStart: "1rem",
        paddingBlockEnd: "1rem",
      }}
    >
      <Grid container spacing={2} alignItems={"flex-start"}>
        <Grid
          container
          item
          sx={{
            display: { sm: "block", md: "none" },
            zIndex: 1155,
          }}
          alignItems="center"
        >
          <SideDrawer page={page} />
        </Grid>
        <Grid
          item
          xs={0}
          sm={0}
          md={3}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <ProfileSideMenu
            page={page}
            sidedrawer={""}
            onClose={() => console.log("no")}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <ProfileBody page={page} orderId={orderId} />
        </Grid>
      </Grid>
    </CustomStackFullWidth>
  );
};

export default UserInfo;
