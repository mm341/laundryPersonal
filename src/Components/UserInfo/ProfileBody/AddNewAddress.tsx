import React, { useState } from "react";
import { Box, Modal, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { RTL } from "@/Components/GlobalComponent/RTL/RTL";
import AddressForm from "./AddressForm";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 800,
  width: "80%",
  bgcolor: "background.paper",
  border: "1px solid white",
  boxShadow: 24,
  height: "40vh",
  overflowY: "auto",
  p: 3,
};
const AddNewAddress = ({ color }: { color: string }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const clickAddNew = () => {
    setOpen(true);
  };
  // const handleChange = (e) => {
  //     setValue(e.target.value)
  // }

  // const { isloadingaddAdddresse } = useSelector((state) => state.handel)
  const dispatch = useDispatch();
  const formSubmitHandler = () => {
    // dispatch(AddAddresse(values)).then((res) => {
    //     if (res?.payload) {
    //         refetch()
    //         setOpen(false)
    //     }
    // })
  };
  const languagedirection = localStorage.getItem("direction");

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
                // formSubmit={formSubmitHandler}
                // isLoading={isloadingaddAdddresse}
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
