import React, { ChangeEvent, useEffect, useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";

import { alpha, useTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";

import "react-phone-input-2/lib/material.css";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { CustomBoxForModal } from "../auth.style";

import OtpForm from "../forgot-password/OtpForm";
import img from "../../../../../public/navbar/signinImg.svg";
import { RTL } from "@/Components/GlobalComponent/RTL/RTL";
import {
  CustomStackFullWidth,
  CustomTypography,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import CustomImageContainer from "@/Components/Cards/CustomImageContainer";
import { Box, Button, Modal, Typography } from "@mui/material";
import CustomPhoneInput from "../../CustomPhoneInput";
import CustomLoadingSubmitButton from "@/Components/GlobalComponent/CustomLoadingSubmitButton";
import { AuthApi } from "@/React-Query/authApi";
import PublicHandelingErrors from "@/utils/PublicHandelingErrors";
import { useAppDispatch } from "@/redux/store";
import { SaveProfileData } from "@/redux/slices/HandelUpdateProfile";

export interface SignModel {
  handleClose: () => void;
  signInSuccess?: boolean;
  modalFor: string;
  setModalFor: (e: string) => void;
}
const SignInPage = ({ setModalFor, handleClose, modalFor }: SignModel) => {
  //  hooks
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [openOtpModal, setOpenOtpModal] = useState<boolean>(false);
  const [otpData, setOtpData] = useState<{ mobile: string | undefined }>({
    mobile: "",
  });

  //  get firebase token from localstorage
  let firebase_token: string | undefined | null = undefined;

  if (typeof window !== "undefined") {
    firebase_token = localStorage.getItem("cm_firebase_token");
  }
  //  login action validation and send api request
  const loginFormik = useFormik({
    initialValues: {
      mobile: "",
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required(t("Please give a phone number"))
        .min(12, t("number must be 12 digits")),
    }),
    onSubmit: async (values: { mobile: string | undefined }) => {
      try {
        const data: {
          mobile: string | undefined;
          firebase_token: string | undefined | null;
        } = { mobile: "", firebase_token: "" };
        if (values?.mobile) {
          data.mobile = `+${values?.mobile.toString()}`;
        }
        data.firebase_token = "dit1R4PBb5SQ5gI3LnEJw1:APA91bExTQmRbv2le18rJbDDttRUBjREdy4iM14HBpIZQv12bbIQlTNFHyvWpLgaOnQO6dTDID89cSMbX4A5lWLCsxrXe3lqxveaTFmk9BmSQALzf9YVUIPyDX3nx83CEfDAYMUVgkb1";
        formSubmitHandler(data);
      } catch (err) {}
    },
  });

  //  send request
  const {
    mutate: loginMutation,
    isLoading,
    error,
  } = useMutation("sign-in", AuthApi.signIn);

  const formSubmitHandler = (values: { mobile: string | undefined }) => {
    loginMutation(values, {
      onSuccess: async (response: any) => {
        setOtpData({ mobile: values.mobile });
        setOpenOtpModal(true);
      },
      onError: PublicHandelingErrors.onErrorResponse,
    });
  };

  const handleOnChange = (e: string) => {
    loginFormik.setFieldValue("mobile", e);
  };

  //  deal with otp
  const handelErrorFromOtp = (error: any) => {
    if (error?.response?.data?.errors?.length > 0) {
      error?.response?.data?.errors?.map((e: any) => toast.error(e?.message));
    }
    toast.error(error?.response?.data?.message);
  };
  const { mutate: otpVerifyMutate, isLoading: isLoadingOtpVerifiyAPi } =
    useMutation("verify_phone", AuthApi.verify_phone);
  const otpFormSubmitHandler = (values: {
    otp: string;
    mobile?: string | undefined;
  }) => {
    const onSuccessHandler = (res: any) => {
      dispatch(SaveProfileData(res.data.data.user));

      if (res.data.data.access.token) {
        toast.success(res?.data?.message);
        localStorage.setItem("token", res?.data?.data?.access?.token);

        handleClose?.();
      }
      setOpenOtpModal(false);

      handleClose?.();
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

  const languagedirection = localStorage.getItem("direction");
  return (
    <CustomBoxForModal sx={{ width: { md: "700px", xs: "400px" } }}>
      <RTL direction={languagedirection}>
        <GlobalDisplayFlexBox
          sx={{ flexDirection: { md: "row", xs: "column" }, gap: "50px" }}
          width={"100%"}
        >
          <CustomStackFullWidth
            sx={{ width: { md: "70%", xs: "100%" } }}
            alignItems="center"
            spacing={{ xs: 0.5, md: 2 }}
          >
            <CustomStackFullWidth
              alignItems="center"
              spacing={{ xs: 2, md: 3 }}
            >
              <Typography
                sx={{
                  fontSize: { md: "20px", xs: "17px" },
                  fontWeight: { md: "600", xs: "500" },
                  color: "black",
                  mb: { md: "40px", xs: "60px" },
                  mt: "20px",
                }}
              >
                {t("Login with phone number")}
              </Typography>
            </CustomStackFullWidth>
            <CustomStackFullWidth
              alignItems="center"
              spacing={{ xs: 1, md: 2 }}
            >
              <form onSubmit={loginFormik.handleSubmit} autoComplete="off">
                <CustomStackFullWidth
                  alignItems="center"
                  spacing={{ xs: 2, md: 2 }}
                >
                  <CustomPhoneInput
                    value={loginFormik.values.mobile}
                    onHandleChange={handleOnChange}
                    // initCountry={global?.country}
                    rtlChange
                    touched={loginFormik.touched.mobile}
                    errors={loginFormik.errors.mobile}
                    isLoading={isLoading}
                  />
                </CustomStackFullWidth>

                <CustomLoadingSubmitButton
                  size={25}
                  loading={isLoading}
                  word="Sign In"
                />
              </form>
            </CustomStackFullWidth>

            <CustomStackFullWidth alignItems="center" spacing={0.5}>
              <CustomStackFullWidth
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={0.5}
              >
                <CustomTypography sx={{ fontSize: "16px", fontWeight: "400" }}>
                  {t("Don't have an account?")}
                </CustomTypography>
                <CustomTypography
                  sx={{
                    cursor: "pointer",
                    color: theme.palette.primary.main,
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                  onClick={() => {
                    setModalFor("sign-up");
                  }}
                  variant="body2"
                >
                  {t("Sign Up")}
                </CustomTypography>
              </CustomStackFullWidth>
            </CustomStackFullWidth>
          </CustomStackFullWidth>
          <CustomImageContainer
            src={img?.src}
            width="262px"
            height="232px"
            alt="Logo"
          />
        </GlobalDisplayFlexBox>
      </RTL>
      <Modal
        open={openOtpModal}
        onClose={() => setOpenOtpModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <OtpForm
            modalFor={modalFor}
            setModalFor={setModalFor}
            setOpenOtpModal={setOpenOtpModal}
            data={otpData}
            formSubmitHandler={otpFormSubmitHandler}
            isLoading={isLoadingOtpVerifiyAPi}
          />
        </Box>
      </Modal>
    </CustomBoxForModal>
  );
};

export default SignInPage;
