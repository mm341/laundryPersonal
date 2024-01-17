import React from "react";
import { Box, Modal, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";

import { RTL } from "@/Components/GlobalComponent/RTL/RTL";
import AddressForm from "./AddressForm";
import { AddresseInterface } from "@/interfaces/AddresseInterface";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 800,
  width: { md: "80%", xs: "95%" },
  bgcolor: "white",
  borderRadius: "10px",
  boxShadow: 24,
  height: { md: "70vh", xs: "95vh" },
  overflowY: "auto",
  p: 3,
};
const AddNewAddress = ({
  color,
  open,
  setOpen,
  addresse,
  refetch,
}: {
  color: string;
  open: boolean;
  setOpen: (e: boolean) => void;
  addresse?: AddresseInterface |undefined;
  refetch: () => void;
}) => {
  const { t } = useTranslation();

  const clickAddNew = () => {
    setOpen(true);
  };

  let languagedirection;

  if (typeof window !== "undefined") {
    languagedirection = localStorage.getItem("direction");
  }

  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600",
        }}
        onClick={clickAddNew}
        padding="5px 10px"
      >
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Typography fontWeight="500" fontSize={"16px"} color={color}>
            {t("Add New Address")}
          </Typography>
        </Stack>
      </Box>
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
