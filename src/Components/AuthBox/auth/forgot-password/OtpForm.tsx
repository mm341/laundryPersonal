import React, { useRef } from "react";
import { Box, Stack, Typography, TextField } from "@mui/material";

import { useTranslation } from "react-i18next";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useTheme } from "@mui/material";
// import resendImg from '../../../../public/LogIn/resendCode.svg'
import OtpInput from "react-otp-input";
import { useState } from "react";
import { useEffect } from "react";
import img from "../../../../../public/OtpModal/otp img.png";
import {
  CustomStackFullWidth,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import CustomLoadingSubmitButton from "@/Components/GlobalComponent/CustomLoadingSubmitButton";
import { useRouter } from "next/router";

interface props {
  data: { mobile: string | undefined };
  formSubmitHandler: (values: {
    otp: string;
    mobile?: string | undefined;
  }) => void;
  isLoading: boolean;
  modalFor?: string;
  setModalFor: (e: string) => void;
  setOpenOtpModal: (e: boolean) => void;
  updatProfile?: boolean;
  formikName?: string;
}
const OtpForm = ({
  data,
  formSubmitHandler,
  isLoading,
  setOpenOtpModal,
  setModalFor,
  modalFor,
  updatProfile,
  formikName,
}: props) => {
  //  hooks
  const { locale } = useRouter();
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  let [resend, setResend] = useState(59);

  //  validation of otp
  const otpFormik = useFormik({
    //here reset_token is otp inputs
    initialValues: {
      otp: "",
      // mobile: data?.mobile,
    },
    validationSchema: Yup.object({
      otp: Yup.string().required(t("field is empty")),
    }),
    onSubmit: async (values: { otp: string }) => {
      try {
        let SendData: {
          otp: string;
          alternative_phone?: string | undefined;
          mobile?: string | undefined;
        } = { otp: "" };
        SendData.otp = values.otp;
        if (formikName === "alternative_phone") {
          SendData.alternative_phone = data?.mobile;
        } else {
          SendData.mobile = data?.mobile;
        }

        formSubmitHandler(SendData);
      } catch (err) {}
    },
  });
  const theme = useTheme();

  const handleOpenAuthModal = () => {
    setOpenOtpModal(false);
    if (modalFor === "sign-in") {
      setModalFor("sign-in");
    } else {
      setModalFor("sign-up");
    }
  };

  useEffect(() => {
    const handelTimeOut = setTimeout(() => {
      setResend((resend -= 1));
    }, 1000);

    if (resend === 0 || resend < 0) {
      clearTimeout(handelTimeOut);
    }
  }, [resend]);

  useEffect(() => {
    otpFormik.values.otp = otp;
  });

  return (
    <GlobalDisplayFlexBox
      sx={{
        width: "100%",
        flexDirection: { md: "row", xs: "column" },
        gap: { md: "0", xs: "15px" },
      }}
    >
      <GlobalDisplayFlexColumnBox
        sx={{ justifyContent: "flex-start", width: { md: "80%", xs: "100%" } }}
      >
        <Stack alignItems="flex-start" justifyContent="center">
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              // color: theme.palette.primary.textLight,
            }}
          >
            {t("Enter the 4-digit code sent to you at")}
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
            {data?.mobile}
          </Typography>
        </Stack>
        <form noValidate onSubmit={otpFormik.handleSubmit}>
          <Stack
            mt="1rem"
            sx={{
              direction: "column",
              gap: "41px",
              alignItems: "flex-start",
            }}
          >
            <Box
              dir="ltr"
              sx={{
                width: "100%",
                mx: "auto",
                height: "30px",

                borderRadius: "5px",
                pb: "8px",
                pt: "5px",
                display: "flex",
                mt: "14px",
                justifyContent: locale === "en" ? "flex-start" : "flex-end",
              }}
            >
              <OtpInput
                onChange={setOtp}
                inputType="tel"
                inputStyle={{
                  width: "56px",
                  height: "56px",
                  borderBottom: "1px solid #B9B9B9",
                  borderRight: "1px solid #B9B9B9",
                  borderLeft: "1px solid #B9B9B9",
                  borderTop: "1px solid #B9B9B9",
                }}
                value={otp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props: any) => <input {...props} />}
              />
            </Box>

            <GlobalDisplayFlexColumnBox
              gap={"0px"}
              sx={{ width: { md: "75%", xs: "100%" } }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    // color: theme.palette.primary.textLight,
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                  }}
                >
                  {t("Didn't Receive the Code ? Resend in")}
                  <span
                    style={
                      resend !== 0
                        ? {
                            color: "#329CD7",
                            display: "flex",
                            gap: "2px",
                            alignItems: "center",
                          }
                        : { display: "none" }
                    }
                  >
                    {resend} <span style={{ color: "black" }}>s</span>
                  </span>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                }}
              >
                <CustomLoadingSubmitButton
                  size={25}
                  loading={isLoading}
                  word="Verify"
                />

                {/*  button appear case of sign in and sign up  */}
                {!updatProfile && (
                  <Box
                    sx={{
                      width: "100%",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: `1px solid ${theme.palette.primary.main}`,
                      borderRadius: "8px",
                      color: theme.palette.primary.main,
                      cursor: "pointer",
                      px: "15px",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                    onClick={handleOpenAuthModal}
                  >
                    {t("Edit Phone Number")}
                  </Box>
                )}
                {/*  button appear case of  update profile */}
                {updatProfile && (
                  <Box
                    sx={{
                      width: "100%",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: `1px solid ${theme.palette.primary.main}`,
                      borderRadius: "8px",
                      color: theme.palette.primary.main,
                      cursor: "pointer",
                      px: "15px",
                    }}
                    onClick={() => setOpenOtpModal(false)}
                  >
                    {t("Cancel")}
                  </Box>
                )}
              </Box>
            </GlobalDisplayFlexColumnBox>
          </Stack>
        </form>
      </GlobalDisplayFlexColumnBox>

      <img
        src={img?.src}
        loading="lazy"
        alt="img"
        style={{ width: "281px", height: "284px", objectFit: "cover" }}
      />
    </GlobalDisplayFlexBox>
  );
};
export default OtpForm;
