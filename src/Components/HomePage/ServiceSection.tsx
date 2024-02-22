import { GlobalDisplayFlexColumnBox } from "@/styles/PublicStyles";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import GlobalTypography from "./GlobalTypography";
import SeviceCard from "../Cards/SeviceCard";
import PublicContainer from "../PublicContainer";
import AreaDialog from "../Dialogs/AreaDialog";
import { HomeServices } from "@/interfaces/HomeServices";
import { HomeAreas } from "@/interfaces/HomeAreas";

import { Scrollbar } from "../GlobalComponent/Scrollbar";

const ServiceSection = ({
  homeServices,
  homeAreas,
}: {
  homeServices: HomeServices[];
  homeAreas: HomeAreas[];
}) => {
  //  hooks
  const theme = useTheme();
  
  const [openAreaDialog, setOpenAreaDialog] = useState<boolean>(false);
  const [ServiceId, setServiceId] = useState<string | undefined>();

  //  close area dialog
  const CloseDialog = () => {
    setOpenAreaDialog(false);
  };
  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, py: "80px" }}>
      <PublicContainer>
        <GlobalDisplayFlexColumnBox width={"100%"} gap={"72px"}>
          <GlobalTypography text={"Our Services"} />
          <Scrollbar
            style={{
              maxHeight: "620px",
            }}
          >
            <Grid container spacing={3} sx={{p:"5px"}}>
              {homeServices?.map((e: HomeServices, i: number) => (
                <Grid key={e?.id} item md={4} sm={6} xs={12}>
                  <SeviceCard
                    element={e}
                   
                  />
                </Grid>
              ))}
            </Grid>
          </Scrollbar>
        </GlobalDisplayFlexColumnBox>
      </PublicContainer>
      <AreaDialog
        ServiceId={ServiceId}
        homeAreas={homeAreas}
        openAreaDialog={openAreaDialog}
        handleClose={CloseDialog}
      />
    </Box>
  );
};

export default ServiceSection;
