import React, { useRef } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  useMediaQuery,
} from "@mui/material";

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
import { useDispatch } from "react-redux";
import { ResendCode } from "@/redux/slices/MasterSlice";
import { useAppDispatch } from "@/redux/store";

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
  id?: string;
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
  id,
}: props) => {
  //  hooks
  const { locale } = useRouter();
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const theme = useTheme();
  const issmall = useMediaQuery(theme.breakpoints.down("md"));
  let [resend, setResend] = useState(60);
  const dispatch = useAppDispatch();
  //  get firebase token from localstorage
  let firebase_token: string | undefined | null = undefined;

  if (typeof window !== "undefined") {
    firebase_token = localStorage.getItem("cm_firebase_token");
  }
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
          fcm_token: string | null | undefined;
        } = { otp: "", fcm_token: "" };
        SendData.otp = values.otp;
        if (formikName === "alternative_phone") {
          SendData.alternative_phone = data?.mobile;
        } else {
          SendData.mobile = data?.mobile;
        }
        SendData.fcm_token = firebase_token;
        formSubmitHandler(SendData);
      } catch (err) {}
    },
  });

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
                  onClick={() => {
                    if (id) {
                      dispatch(ResendCode({ mobile: data?.mobile, id: id }));
                    } else {
                      dispatch(ResendCode({ mobile: data?.mobile }));
                    }

                    if (resend === 0) {
                      setResend(60);
                    }
                  }}
                  sx={{
                    fontSize: {md:"14px",xs:"12px"},
                    fontWeight: "400",
                    // color: theme.palette.primary.textLight,
                    display: "flex",
                    alignItems: {md:"center",xs:"flex-start"},
                    gap: "2px",
                    flexDirection:{md:"row",xs:"column"},
                    cursor: resend > 0 ? "default" : "pointer",
                  }}
                >
                  {t("Didn't Receive the Code ? Resend in")}
                  <span
                    style={
                      resend !== 0
                        ? {
                            color: "#329CD7",
                            display: "flex",
                            flexDirection:"row",
                            gap: "2px",
                            alignItems: "center",
                          }
                        : { display: "none" }
                    }
                  >
                    {resend} <span style={{ color: "black" }}>{t("s")}</span>
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
        style={{
          width: "281px",
          height: "284px",
          objectFit: "cover",
          display: issmall ? "none" : "block",
        }}
      />
    </GlobalDisplayFlexBox>
  );
};
export default OtpForm;
