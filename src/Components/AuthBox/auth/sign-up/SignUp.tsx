import React, { useState } from "react";
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
import { Modal, Typography } from "@mui/material";

import { SignModel } from "../sign-in/SignIn";

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
import { SaveProfileData } from "@/redux/slices/HandelUpdateProfile";

const SignUpPage = ({ handleClose, setModalFor, modalFor }: SignModel) => {
  //  hooks
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const theme = useTheme();

  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [otpData, setOtpData] = useState<{ mobile: string | undefined }>({
    mobile: "",
  });

  const signUpFormik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
    },
    validationSchema: SignUpvalidation(),
    onSubmit: async (values, helpers) => {
      try {
        formSubmitHandler(values);
      } catch (err) {}
    },
  });
  //  get firebase token from localstorage
  let firebase_token: string | undefined | null = undefined;

  if (typeof window !== "undefined") {
    firebase_token = localStorage.getItem("cm_firebase_token");
  }
  const { mutate, isLoading, error } = useMutation("sign-up", AuthApi.signUp);

  const formSubmitHandler = (values: AccountRegister) => {
    const signUpData: AccountRegister = {
      name: values.name,
      firebase_token: firebase_token,
      mobile: `+${values.mobile}`,
    };

    mutate(signUpData, {
      onSuccess: async (response) => {
        setOtpData({ mobile: `+${values?.mobile}` });
        setOpenOtpModal(true);
      },
      onError: PublicHandelingErrors.onErrorResponse,
    });
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
  const handleOnChange = (value: string) => {
    signUpFormik.setFieldValue("mobile", value);
  };

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
                  id="name"
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
                  value={signUpFormik.values.mobile}
                  onHandleChange={handleOnChange}
                  // initCountry={global?.country}
                  touched={signUpFormik.touched.mobile}
                  errors={signUpFormik.errors.mobile}
                  // rtlChange="true"mobile
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
      </RTL>
    </CustomBoxForModal>
  );
};

export default SignUpPage;
