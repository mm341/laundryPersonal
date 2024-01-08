import React from "react";
import { Box, Grid, TextField, Typography, useTheme } from "@mui/material";

import { useFormik } from "formik";
import ValidationSechemaProfile from "./Validation";

import { useTranslation } from "react-i18next";

import { AccountUpdate } from "@/interfaces/FormUpdateAccountInterface";

import CustomLoadingSubmitButton from "@/Components/GlobalComponent/CustomLoadingSubmitButton";
import { CustomStackFullWidth } from "@/styles/PublicStyles";
import ImageUploaderWithPreview from "@/Components/single-file-uploader-with-preview/ImageUploaderWithPreview";
import { AccountInfo } from "@/interfaces/AccountInfo";
import InputImage from "@/Components/GlobalComponent/image.input";

const BasicInformationForm = ({
  formSubmitHandler,
  accountInfo,
  isloading,
}: {
  formSubmitHandler: (values: AccountUpdate) => void;
  accountInfo: AccountInfo;
  isloading: boolean;
}) => {
  //  hooks
  const { t } = useTranslation();

  //  account form validation and prepare send api request

  const profileFormik = useFormik({
    initialValues: {
      first_name: accountInfo?.name ? accountInfo?.name : "",
      mobile: accountInfo?.mobile ? accountInfo.mobile : "",
      alternative_phone: accountInfo?.alternative_phone
        ? accountInfo?.alternative_phone
        : "",
      profile_photo: "",
    },
    validationSchema: ValidationSechemaProfile(),
    onSubmit: async (values: AccountUpdate) => {
      try {
        const data: AccountUpdate = {};
        if (values.mobile !== accountInfo?.mobile) {
          data.mobile = values.mobile;
        }
        if (values.first_name !== accountInfo?.name) {
          data.first_name = values.first_name;
        }

        if (values.alternative_phone !== accountInfo?.alternative_phone) {
          data.alternative_phone = values.alternative_phone;
        }
        if (values.profile_photo) {
          data.profile_photo = values.profile_photo;
        }

        if (Object.values(data).length > 0) {
          formSubmitOnSuccess(data);
        }
      } catch (err) {}
    },
  });

  const formSubmitOnSuccess = (values: AccountUpdate) => {
    formSubmitHandler(values);
  };

  const singleFileUploadHandlerForCoverPhoto = (value: any) => {
    profileFormik.setFieldValue("profile_photo", value);
  };

  return (
    <>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "400",
          mb: "10px",
          ml: "3px",
        }}
      >
        {t("Profile Info")}
      </Typography>
      <form noValidate onSubmit={profileFormik.handleSubmit}>
        <Grid container md={12} xs={12} spacing={3.5} sx={{ padding: "20px" }}>
          <Grid item xs={12}>
            <CustomStackFullWidth
              sx={{ width: { md: "80%", xs: "100%" } }}
              spacing={2}
              mb=".8rem"
            >
              {/*Image*/}

              <InputImage
                id="engineer_image"
                init={accountInfo?.profile_photo_path}
                error={
                  profileFormik.touched.profile_photo &&
                  profileFormik.errors.profile_photo
                }
                onImageSubmit={singleFileUploadHandlerForCoverPhoto}
              />
            </CustomStackFullWidth>
          </Grid>

          {/* Full Name */}
          <Grid item xs={12} md={6}>
            <TextField
              disabled={isloading}
              sx={{ width: "100%", backgroundColor: "white" }}
              id="outlined-basic"
              variant="outlined"
              name="first_name"
              value={profileFormik.values.first_name}
              onChange={profileFormik.handleChange}
              label={t("Full Name")}
              required
              error={
                profileFormik.touched.first_name &&
                Boolean(profileFormik.errors.first_name)
              }
              helperText={
                profileFormik.touched.first_name &&
                profileFormik.errors.first_name
              }
            />
          </Grid>
          {/* Phone Number*/}
          <Grid item md={6} xs={12}>
            <TextField
              disabled={isloading}
              label={<span>{t("Phone Number")}</span>}
              variant="outlined"
              name="mobile"
              value={profileFormik.values.mobile}
              onChange={profileFormik.handleChange}
              sx={{ width: "100%", backgroundColor: "white" }}
              required
              error={
                profileFormik.touched.mobile &&
                Boolean(profileFormik.errors.mobile)
              }
              helperText={
                profileFormik.touched.mobile && profileFormik.errors.mobile
              }
            />
          </Grid>
          {/* Alternative Phone*/}
          <Grid item md={6} xs={12}>
            <TextField
              disabled={isloading}
              label={<span>{t("Alternative Phone")}</span>}
              variant="outlined"
              name="alternative_phone"
              value={profileFormik.values.alternative_phone}
              onChange={profileFormik.handleChange}
              sx={{ width: "100%", backgroundColor: "white" }}
              required
              error={
                profileFormik.touched.alternative_phone &&
                Boolean(profileFormik.errors.alternative_phone)
              }
              helperText={
                profileFormik.touched.alternative_phone &&
                profileFormik.errors.alternative_phone
              }
            />
          </Grid>

          <Grid container justifyContent={"flex-end"}>
            <Grid
              item
              md={2.5}
              sm={3.5}
              xs={11.2}
              sx={{ mt: "25px", mb: "2px" }}
            >
              <CustomLoadingSubmitButton
                size={25}
                loading={isloading}
                word="Update Profile"
              />
            </Grid>
          </Grid>
        </Grid>
      </form>

      {/* <CustomModal
        width={"40vh"}
        openModal={phoneVerify}
        setModalOpen={setPhoneVerify}
      >
        <OtpForm
          data={{ phone: profileFormik.values.phone }}
          formSubmitHandler={otpFormSubmitHandler}
          isLoading={isLoadingOtpVerifiyAPi}
          UpdateProfile
          setPhoneVerify={setPhoneVerify}
        />
      </CustomModal> */}
    </>
  );
};
export default BasicInformationForm;
