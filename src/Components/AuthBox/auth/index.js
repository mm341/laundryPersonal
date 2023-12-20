import { Modal, Box } from "@mui/material";
import React, { useState } from "react";
import SignInPage from "./sign-in/SignIn";
import SignUpPage from "./sign-up/SignUp";

const AuthModal = ({ open, handleClose, modalFor, setModalFor }) => {
  const [signInPage, setSignInPage] = useState(true);
  const handleModal = (modalFor) => {
    if (modalFor === "sign-in") {
      return (
        <SignInPage
          handleClose={handleClose}
          setModalFor={setModalFor}
          setSignInPage={setSignInPage}
        />
      );
    } else {
      return (
        <SignUpPage
          handleClose={handleClose}
          setSignInPage={setSignInPage}
          setModalFor={setModalFor}
        />
      );
    }
  };
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        maxWidth="400px"
      >
        {modalFor === "sign-in" ? (
          <SignInPage
            handleClose={handleClose}
            setModalFor={setModalFor}
            setSignInPage={setSignInPage}
          />
        ) : (
          <SignUpPage
            handleClose={handleClose}
            setSignInPage={setSignInPage}
            setModalFor={setModalFor}
          />
        )}
      </Modal>
    </Box>
  );
};

export default AuthModal;
