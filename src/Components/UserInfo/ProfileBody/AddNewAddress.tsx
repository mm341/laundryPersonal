import React from "react";
import { Box, Modal, Stack, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";

import { RTL } from "@/Components/GlobalComponent/RTL/RTL";
import AddressForm from "./AddressForm";
import { AddresseInterface } from "@/interfaces/AddresseInterface";
const style = {
  position: "absolute",
  top: {md:"50%",xs:"55%"},
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 800,
  width: { md: "80%", xs: "95%" },
  bgcolor: "white",
  borderRadius: "10px",
  boxShadow: 24,
  height: { md: "70vh", xs: "85vh" },
  overflowY: "auto",
  p: 3,
};
const AddNewAddress = ({
  color,
  open,
  setOpen,
  addresse,
  refetch,
  checkout,
}: {
  color: string;
  open: boolean;
  setOpen: (e: boolean) => void;
  addresse?: AddresseInterface | undefined;
  refetch: () => void;
  checkout?: boolean;
}) => {
  //  hooks

  const theme = useTheme();
  const { t } = useTranslation();

  //  open add addresse dialog
  const clickAddNew = () => {
    setOpen(true);
  };

  //  get languagedirection from localstorage
  let languagedirection;

  if (typeof window !== "undefined") {
    languagedirection = localStorage.getItem("direction");
  }

  return (
    <>
    {!checkout && (
      <Box
        sx={{
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600",
          width: "190px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: !checkout ? theme.palette.primary.main : "white",
          borderRadius: "8px",
          color: "white",
        }}
        padding="5px 10px"
        onClick={clickAddNew}
      >
        
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography fontWeight="500" fontSize={"16px"} color={color}>
              {t("Add New Address")}
            </Typography>
          </Stack>
        
      </Box>
    )}
      {open && (
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Stack sx={style} spacing={2}>
            <button
              onClick={() => setOpen(false)}
              className="closebtn"
              style={{ cursor: "pointer" }}
            >
              <CloseIcon sx={{ fontSize: "16px" }} />
            </button>

            <RTL direction={languagedirection}>
              <AddressForm
                refetch={refetch}
                addresse={addresse}
                setOpen={setOpen}
              />
            </RTL>
          </Stack>
        </Modal>
      )}
    </>
  );
};

export default AddNewAddress;
