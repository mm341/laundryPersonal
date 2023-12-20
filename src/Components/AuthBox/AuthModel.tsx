import { Modal, Box } from "@mui/material";
import React, { useState } from "react";
import SignInPage from "./auth/sign-in/SignIn";
import SignUpPage from "./auth/sign-up/SignUp";

export interface authModel {
  open: boolean;
  handleClose: () => void;
  signInSuccess: boolean;
  modalFor?: string;
  setModalFor: (e: string) => void;
}
const AuthModal = ({
  open,
  handleClose,
  signInSuccess,
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
          <SignInPage
            signInSuccess={signInSuccess}
            handleClose={handleClose}
            setModalFor={setModalFor}
          />
        ) : (
          <SignUpPage handleClose={handleClose} setModalFor={setModalFor} />
        )}
      </Modal>
    </Box>
  );
};

export default AuthModal;
