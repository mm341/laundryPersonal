import {
  GlobalButton,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Grid, Modal, useTheme } from "@mui/material";
import React, { useState } from "react";
import GlobalSelectBox from "../GlobalSelectBox";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import GlobalTypography from "../HomePage/GlobalTypography";
import SeviceCard from "../Cards/SeviceCard";
import { HomeServices } from "@/interfaces/HomeServices";

interface Props {
  openOrderDialog: boolean;
  handleClose: () => void;
  homeServices: HomeServices[];
}
const ServicesDialog = ({
  openOrderDialog,
  handleClose,
  homeServices,
}: Props) => {
  //  style for model
  const styleDialog = {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "83%",
    // oveflowY: "auto",
    transform: "translate(-50%, -50%)",
    width: { md: "60%", xs: "85%" },
    bgcolor: "background.paper",
    p: 4,
    borderRadius: "10px",
  };



  return (
    <Modal
      open={openOrderDialog}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus={true}
    >
      <Box sx={styleDialog}>
        <Box
          sx={{
            width: "100% ",
            mx: "auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          
          }}
        >
          <GlobalTypography text={"Select Service Category"} />

          <Grid sx={{ my: "40px",height:"100%",overflowY:"auto" }} container spacing={3} >
            {homeServices?.map((e: HomeServices, i: number) => (
              <Grid key={i} item md={4} sm={6} xs={12}>
                <SeviceCard
                  area
                  element={e}
                  setServiceId={function (action: string | undefined): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default ServicesDialog;
