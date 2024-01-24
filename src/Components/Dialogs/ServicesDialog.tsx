import {
  GlobalButton,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Grid, Modal, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import GlobalSelectBox from "../GlobalSelectBox";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import GlobalTypography from "../HomePage/GlobalTypography";
import SeviceCard from "../Cards/SeviceCard";
import { HomeServices } from "@/interfaces/HomeServices";
import { Scrollbar } from "../GlobalComponent/Scrollbar";

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
    top: { md: "53%", xs: "56%" },
    left: "50%",
    height: "83%",
    // oveflowY: "auto",
    transform: "translate(-50%, -50%)",
    width: {lg:"57%", md: "62%", xs: "85%" },
    bgcolor: "background.paper",
    p: { md: 4, xs: 1 },
    borderRadius: "10px",
  };

  const theme = useTheme();
  const issmall = useMediaQuery(theme.breakpoints.down("md"));

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

          <Scrollbar style={{ maxHeight: issmall ? "430px" : "90%" }}>
            <Grid sx={{ my: "40px", height: "100%" }} container spacing={3}>
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
          </Scrollbar>
        </Box>
      </Box>
    </Modal>
  );
};

export default ServicesDialog;
