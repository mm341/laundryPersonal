import React, { useEffect, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CustomSideDrawer from "./CustomSideDrawer";
import ProfileSideMenu from "./ProfileSideMenu";

const SideDrawer = ({ page }: { page: string }) => {
  const theme = useTheme();
  const [languagedirection, setlanguagedirection] = useState<string | null>(
    "ltr"
  );
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("direction")) {
      setlanguagedirection(localStorage.getItem("direction"));
    }
  }, []);
  return (
    <>
      {languagedirection && (
        <>
          <Grid item xs={2} sm={2} md={2}>
            <IconButton
              onClick={() => setOpen(true)}
              sx={{
                color: (theme) => theme.palette.primary.main,
              }}
            >
              <MenuOpenIcon />
            </IconButton>
            <CustomSideDrawer
              open={open}
              onClose={() => setOpen(false)}
              anchor={languagedirection === "rtl" ? "right" : "left"}
            >
              <ProfileSideMenu
                onClose={() => setOpen(false)}
                sidedrawer="true"
                page={page}
              />
            </CustomSideDrawer>
          </Grid>
          <Grid justifySelf="flex-end" item xs={10} sm={10} md={2}>
            <Typography
              variant="h3"
              color={theme.palette.primary.main}
              align="center"
              sx={{ marginInlineStart: "-40px" }}
            >
              {page}
            </Typography>
          </Grid>
        </>
      )}
    </>
  );
};
export default SideDrawer;
