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
import { Button, Typography } from "@mui/material";
import CustomPhoneInput from "../../CustomPhoneInput";
import CustomLoadingSubmitButton from "@/Components/GlobalComponent/CustomLoadingSubmitButton";
import { AuthApi } from "@/React-Query/authApi";
import PublicHandelingErrors from "@/utils/PublicHandelingErrors";
import { useAppDispatch } from "@/redux/store";
import { SaveProfileData } from "@/redux/slices/HandelUpdateProfile";

export interface SignModel {
  handleClose: () => void;
  signInSuccess?: boolean;
  modalFor?: string;
  setModalFor: (e: string) => void;
}
const SignInPage = ({ setModalFor, handleClose }: SignModel) => {
  //  hooks
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [openModal, setModalOpen] = useState<boolean>(false);
  const [openOtpModal, setOpenOtpModal] = useState<boolean>(false);
  const [otpData, setOtpData] = useState({ phone: "" });
  const [mainToken, setMainToken] = useState<null>(null);

  //  login action validation and send api request
  const loginFormik = useFormik({
    initialValues: {
      contact: "",
    },
    validationSchema: Yup.object({
      contact: Yup.string()
        .required(t("Please give a phone number"))
        .min(12, t("number must be 12 digits")),
    }),
    onSubmit: async (values: { contact: string }) => {
      try {
        const data: { contact?: string; password?: string } = {};
        // data.contact = `+${values.contact.toString()}`;
        data.contact = "01061320054";

        data.password = "Abcdefghij@#123";
        formSubmitHandler(data);
      } catch (err) {}
    },
  });

  //   useEffect(() => {
  //     if (otpData?.phone) {
  //       setOpenOtpModal(true);
  //     }
  //   }, [otpData]);

  const {
    mutate: loginMutation,
    isLoading,
    error,
  } = useMutation("sign-in", AuthApi.signIn);

  const formSubmitHandler = (values: {
    contact?: string;
    password?: string;
  }) => {
    loginMutation(values, {
      onSuccess: async (response: any) => {
 
        dispatch(SaveProfileData(response.data.data.user));
        // if (response.data.data.access.token) {
        toast.success(response?.data?.message);
        localStorage.setItem("token", response?.data?.data?.access?.token);
        // window.location.reload();
        handleClose?.();
        // }
        // if (global?.customer_verification) {
        //   setOtpData({ phone: values?.phone });
        //   setMainToken(response);
        // }
      },
      onError: PublicHandelingErrors.onErrorResponse,
    });
  };

  const handleOnChange = (e: string) => {
    loginFormik.setFieldValue("contact", e);
  };

  //   const handelErrorFromOtp = (error) => {
  //     if (error?.response?.data?.errors?.length > 0) {
  //       error?.response?.data?.errors?.map((e) => toast.error(e?.message));
  //     }
  //     toast.error(error?.response?.data?.message);
  //   };
  //   const { mutate: otpVerifyMutate, isLoading: isLoadingOtpVerifiyAPi } =
  //     useVerifyPhone();
  //   const otpFormSubmitHandler = (values) => {
  //     const onSuccessHandler = (res) => {
  //       toast.success(res?.message);
  //       setOpenOtpModal(false);
  //       dispatch(HandelOrder());
  //       dispatch(ProfileData());
  //       localStorage.setItem("token", res?.token);

  //       handleClose?.();
  //     };
  //     otpVerifyMutate(values, {
  //       onSuccess: onSuccessHandler,
  //       onError: handelErrorFromOtp,
  //     });
  //   };

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
                    value={loginFormik.values.contact}
                    onHandleChange={handleOnChange}
                    // initCountry={global?.country}
                    rtlChange
                    touched={loginFormik.touched.contact}
                    errors={loginFormik.errors.contact}
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
      {/* <CustomModal openModal={openOtpModal} setModalOpen={setOpenOtpModal}>
        <OtpForm
          setOpenOtpModal={setOpenOtpModal}
          data={otpData}
          formSubmitHandler={otpFormSubmitHandler}
          isLoading={isLoadingOtpVerifiyAPi}
        />
      </CustomModal> */}
    </CustomBoxForModal>
  );
};

export default SignInPage;
