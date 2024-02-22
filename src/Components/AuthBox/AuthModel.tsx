import { Modal, Box } from "@mui/material";
import React from "react";
import SignInPage from "./auth/sign-in/SignIn";
import SignUpPage from "./auth/sign-up/SignUp";

export interface authModel {
  open: boolean;
  handleClose: () => void;
  modalFor: string;
  setModalFor: (e: string) => void;
  checkOut?:boolean
}
const AuthModal = ({
  open,
  handleClose,
  checkOut,
  modalFor,
  setModalFor,
}: authModel) => {
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalFor === "sign-in" ? (
          <SignInPage checkOut={checkOut} modalFor={modalFor} handleClose={handleClose} setModalFor={setModalFor} />
        ) : (
          <SignUpPage modalFor={modalFor} handleClose={handleClose} setModalFor={setModalFor} />
        )}
      </Modal>
    </Box>
  );
};

export default AuthModal;
