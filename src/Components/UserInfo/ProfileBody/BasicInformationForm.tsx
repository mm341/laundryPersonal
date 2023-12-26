import React from "react";
import { Box, Grid, TextField, Typography, useTheme } from "@mui/material";

import { useFormik } from "formik";
import ValidationSechemaProfile from "./Validation";

import { useTranslation } from "react-i18next";

import { AccountUpdate } from "@/interfaces/FormUpdateAccountInterface";

import CustomLoadingSubmitButton from "@/Components/GlobalComponent/CustomLoadingSubmitButton";
import { CustomStackFullWidth } from "@/styles/PublicStyles";
import ImageUploaderWithPreview from "@/Components/single-file-uploader-with-preview/ImageUploaderWithPreview";

const BasicInformationForm = ({
  formSubmitHandler,
}: {
  formSubmitHandler: (values: AccountUpdate) => void;
}) => {
  const { t } = useTranslation();

  const profileFormik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      alternative_phone: "",
      profile_photo: "",
    },
    validationSchema: ValidationSechemaProfile(),
    onSubmit: async (values: AccountUpdate) => {
      try {
        const data: AccountUpdate = {};
        if (values.phone) {
          data.phone = values.phone;
        }
        if (values.name) {
          data.name = values.name;
        }

        if (values.alternative_phone) {
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

    profileFormik.setFieldValue("profile_photo", value.currentTarget.files[0]);
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
              <ImageUploaderWithPreview
                file={profileFormik.values.profile_photo}
                onChange={singleFileUploadHandlerForCoverPhoto}
                width="1000px"
                error={
                  profileFormik.touched.profile_photo &&
                  profileFormik.errors.profile_photo
                }
              />
              {/* { profileFormik.touched.profile_photo &&
                profileFormik.errors.profile_photo && (
                  <Typography
                    variant="subtitle2"
                    sx={{
                      ml: "10px",
                      fontWeight: "inherit",
                      color: (theme) => theme.palette.error.main,
                    }}
                  >
                    {t("Cover photo is required")}
                  </Typography>
                )} */}
            </CustomStackFullWidth>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              //   disabled={isLoading}
              sx={{ width: "100%", backgroundColor: "white" }}
              id="outlined-basic"
              variant="outlined"
              name="name"
              value={profileFormik.values.name}
              onChange={profileFormik.handleChange}
              label={t("Full Name")}
              required
              error={
                profileFormik.touched.name && Boolean(profileFormik.errors.name)
              }
              helperText={
                profileFormik.touched.name && profileFormik.errors.name
              }
              // touched={profileFormik.touched.f_name}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              //   disabled={isLoading}
              label={<span>{t("Phone Number")}</span>}
              variant="outlined"
              name="phone"
              value={profileFormik.values.phone}
              onChange={profileFormik.handleChange}
              sx={{ width: "100%", backgroundColor: "white" }}
              required
              error={
                profileFormik.touched.phone &&
                Boolean(profileFormik.errors.phone)
              }
              helperText={
                profileFormik.touched.phone && profileFormik.errors.phone
              }
              //   touched={profileFormik.touched.phone}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              //   disabled={isLoading}
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
              //   touched={profileFormik.touched.phone}
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
                // loading={isLoading}
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
