import OtpForm from "@/Components/AuthBox/auth/forgot-password/OtpForm";
import { AuthApi } from "@/React-Query/authApi";
import { baseUrl } from "@/api/MainApi";

import { SaveProfileData } from "@/redux/slices/HandelUpdateProfile";
import { useAppDispatch } from "@/redux/store";
import { GlobalButton } from "@/styles/PublicStyles";
import PublicHandelingErrors from "@/utils/PublicHandelingErrors";
import { Box, Button, CircularProgress, Modal, useTheme } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";

const FormSubmitButton = ({
  InputName,
  NewInputName,
  formikName,
  imgChange,
  imgValue,
}: {
  InputName?: string;
  NewInputName?: string | undefined;
  formikName?: string;
  imgChange?: boolean;
  imgValue?: string;
  error?: boolean;
}) => {
  //  hooks
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [otpmodal, setOpenOtpModal] = useState<boolean>(false);
  const [otbdata, setOtbData] = useState<{ mobile: string | undefined }>({
    mobile: "",
  });
  //  get token from localstorage
  let token: string | null = "";
  let language: string | null = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    language = localStorage.getItem("language");
  }
  //  custom Action for send api

  const formSubmitHandler = () => {
    let formData = new FormData();

    if (NewInputName && !imgChange && formikName) {
      formData.append(formikName, NewInputName);
    } else {
      if (imgValue) {
        formData.append("profile_photo", imgValue);
      }
    }
    if (NewInputName !== InputName || imgValue) {
      if (token) {
        setLoading(true);
        axios
          .postForm(`${baseUrl}customer/profile/update`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data", // Assuming you are sending form data
              "Accept-Language": language,
              locale: language,
            },
          })
          .then((res: any) => {
            if (res) {
              setLoading(false);
              toast.success(res?.data?.message);
              dispatch(SaveProfileData(res?.data?.data?.user));

              if (
                formikName === "mobile" ||
                formikName === "alternative_phone"
              ) {
                setOpenOtpModal(true);
                setOtbData({ mobile: NewInputName });
              }
            }
          })
          .catch((err) => {
            setLoading(false);
            PublicHandelingErrors.onErrorResponse(err);
          });
      }
    }
  };

  //  deal with otp
  const handelErrorFromOtp = (error: any) => {
    PublicHandelingErrors.onErrorResponse(error);
    if (error?.response?.data?.errors?.length > 0) {
      error?.response?.data?.errors?.map((e: any) => toast.error(e?.message));
    }
    toast.error(error?.response?.data?.message);
  };
  const { mutate: otpVerifyMutate, isLoading: isLoadingOtpVerifiyAPi } =
    useMutation("verify_phone", AuthApi.verify_phoneUpdate);
  const otpFormSubmitHandler = (values: { otp: string }) => {
    const onSuccessHandler = (res: any) => {
      toast.success(res?.data?.message);
      dispatch(SaveProfileData(res?.data?.data.user));

      setOpenOtpModal(false);
    };
    otpVerifyMutate(values, {
      onSuccess: onSuccessHandler,
      onError: handelErrorFromOtp,
    });
  };

  //  style of verifiction modal

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: { md: "386px", xs: "60%" },
    oveflowY: "scroll",
    transform: "translate(-50%, -50%)",
    width: { sm: "791px", xs: "90%", mx: "auto" },
    bgcolor: "background.paper",
    p: 4,
    borderRadius: "6px",
  };
  return (
    <>
      <Button
        type="submit"
        onClick={formSubmitHandler}
        sx={{ ml: !imgChange ? "0" : "22px" }}
      >
        <GlobalButton
          px={"0"}
          py={"0"}
          sx={{
            width: !imgChange ? "123px" : "70px",
            height: !imgChange ? "54px" : "30px",
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: "4px",
            color: theme.palette.primary.main,
            fontSize: !imgChange ? "20px" : "12px",
            fontWeight: "400",
            backgroundColor: loading ? "white" : "transparent",
          }}
        >
          {!loading ? (
            t("update")
          ) : (
            <CircularProgress size={!imgChange ? 25 : 12} />
          )}
        </GlobalButton>
      </Button>
      <Modal
        open={otpmodal}
        onClose={() => setOpenOtpModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <OtpForm
            formikName={formikName}
            updatProfile
            setOpenOtpModal={setOpenOtpModal}
            data={otbdata}
            formSubmitHandler={otpFormSubmitHandler}
            isLoading={isLoadingOtpVerifiyAPi}
            setModalFor={function (e: string): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default FormSubmitButton;
