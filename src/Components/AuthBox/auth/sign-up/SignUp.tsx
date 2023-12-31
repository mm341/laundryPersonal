import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";

import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import CustomPhoneInput from "../../CustomPhoneInput";
import { useTranslation } from "react-i18next";

import { useTheme } from "@mui/material/styles";
import { CustomBoxForModal } from "../auth.style";
import { toast } from "react-hot-toast";

import OtpForm from "../forgot-password/OtpForm";
import { Stack, Typography } from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { SignModel } from "../sign-in/SignIn";
import { AccountUpdate } from "@/interfaces/FormUpdateAccountInterface";
import { RTL } from "@/Components/GlobalComponent/RTL/RTL";
import {
  CustomStackFullWidth,
  CustomTypography,
  GlobalDisplayFlexBox,
} from "@/styles/PublicStyles";
import CustomImageContainer from "@/Components/Cards/CustomImageContainer";
import { AccountRegister } from "@/interfaces/FormRegisterInterface";
import img from "../../../../../public/navbar/signUp.svg";
import CustomLoadingSubmitButton from "@/Components/GlobalComponent/CustomLoadingSubmitButton";
import { AuthApi } from "@/React-Query/authApi";
import PublicHandelingErrors from "@/utils/PublicHandelingErrors";
import SignUpvalidation from "../SignUpValidation";

const SignUpPage = ({ handleClose, setModalFor }: SignModel) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const theme = useTheme();

  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [otpData, setOtpData] = useState({ phone: "" });
  const [mainToken, setMainToken] = useState(null);

  const signUpFormik = useFormik({
    initialValues: {
      name: "",
      contact: "",
    },
    validationSchema: SignUpvalidation(),
    onSubmit: async (values, helpers) => {
      try {
        formSubmitHandler(values);
      } catch (err) {}
    },
  });

  const { mutate, isLoading, error } = useMutation("sign-up", AuthApi.signUp);
  // useEffect(() => {
  //   if (otpData?.phone) {
  //     setOpenOtpModal(true);
  //   }
  // }, [otpData]);

  const formSubmitHandler = (values: AccountRegister) => {
  
    const signUpData: AccountRegister = {
      name: values.name,

      contact: `+${values.contact}`,
    };

    mutate(
      signUpData,
      {
        onSuccess: async (response) => {
          // if (global?.customer_verification) {
          //   setOtpData({ phone: `+${values?.phone}` });
          //   setMainToken(response);
          // }
        },
        onError: PublicHandelingErrors.onErrorResponse,
      }
    );
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
  //       dispatch(setToken(res?.token));

  //       handleClose?.();
  //     };
  //     otpVerifyMutate(values, {
  //       onSuccess: onSuccessHandler,
  //       onError: handelErrorFromOtp,
  //     });
  //   };
  const handleOnChange = (value: string) => {
    signUpFormik.setFieldValue("contact", value);
  };

  const languagedirection = localStorage.getItem("direction");
  return (
    <CustomBoxForModal sx={{ width: { md: "700px", xs: "400px" } }}>
      <RTL direction={languagedirection}>
        <GlobalDisplayFlexBox
          sx={{
            flexDirection: { md: "row", xs: "column" },
            gap: "50px",
          }}
        >
          <CustomStackFullWidth
            sx={{ width: { md: "55%", xs: "100%" } }}
            spacing={{ xs: 0.5, md: 3 }}
          >
            <CustomStackFullWidth spacing={{ xs: 1, md: 3 }}>
              <CustomTypography
                sx={{
                  textAlign: "center",
                  fontSize: { md: "24px", xs: "18px" },
                  fontWeight: { md: "600", xs: "500" },
                  color: "black",
                  mt: "40px",
                }}
              >
                {t("Sign up with phone number")}
              </CustomTypography>
            </CustomStackFullWidth>
            <form
              autoComplete="new-password"
              onSubmit={signUpFormik.handleSubmit}
              noValidate
            >
              <CustomStackFullWidth spacing={{ xs: 2, md: 3 }}>
                <TextField
                  sx={{ backgroundColor: "white" }}
                  disabled={isLoading}
                  required
                  fullWidth
                  id="f_name"
                  label={t("Full Name")}
                  name="name"
                  autoComplete="new-password"
                  value={signUpFormik.values.name}
                  onChange={signUpFormik.handleChange}
                  error={
                    signUpFormik.touched.name &&
                    Boolean(signUpFormik.errors.name)
                  }
                  helperText={
                    signUpFormik.touched.name && signUpFormik.errors.name
                  }
                  // touched={signUpFormik.touched.name}
                  autoFocus
                />

                <CustomPhoneInput
                  value={signUpFormik.values.contact}
                  onHandleChange={handleOnChange}
                  // initCountry={global?.country}
                  touched={signUpFormik.touched.contact}
                  errors={signUpFormik.errors.contact}
                  // rtlChange="true"
                  rtlChange
                  isLoading={isLoading}
                />
              </CustomStackFullWidth>
              <CustomLoadingSubmitButton
                size={25}
                loading={isLoading}
                word="Sign Up"
              />
            </form>

            <CustomTypography
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "16px",
                fontWeight: "400",
                gap: "2px",
                width: "100%",
                justifyContent: "flex-start",
              }}
            >
              {t("have an account?")}
              <Typography
                onClick={() => {
                  setModalFor("sign-in");
                }}
                variant="body2"
                sx={{
                  cursor: "pointer",
                  color: theme.palette.primary.main,
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {t("Sign In")}
              </Typography>
            </CustomTypography>
          </CustomStackFullWidth>

          <CustomImageContainer
            src={img?.src}
            width="280px"
            height="259px"
            alt="Logo"
          />
        </GlobalDisplayFlexBox>
        {/* <CustomModal openModal={openOtpModal} setModalOpen={setOpenOtpModal}>
          <OtpForm
            setOpenOtpModal={setOpenOtpModal}
            data={otpData}
            formSubmitHandler={otpFormSubmitHandler}
            isLoading={isLoadingOtpVerifiyAPi}
          />
        </CustomModal> */}
      </RTL>
    </CustomBoxForModal>
  );
};

export default SignUpPage;
