import React from "react";
import { Grid, TextField, Typography } from "@mui/material";

import { useFormik } from "formik";
import ValidationSechemaProfile from "./Validation";

import { useTranslation } from "react-i18next";

import { AccountUpdate } from "@/interfaces/FormUpdateAccountInterface";
import {
  CustomStackFullWidth,
  GlobalDisplayFlexBox,
} from "@/styles/PublicStyles";

import { AccountInfo } from "@/interfaces/AccountInfo";
import InputImage from "@/Components/GlobalComponent/image.input";

import FormSubmitButton from "./FormSubmitButton";

const BasicInformationForm = ({
  accountInfo,
}: {
  accountInfo: AccountInfo;
}) => {
  //  hooks
  const { t } = useTranslation();
  

  //  account form validation and prepare send api request

  const profileFormik = useFormik({
    initialValues: {
      name: accountInfo?.name ? accountInfo?.name : "",
      mobile: accountInfo?.mobile ? accountInfo.mobile : "",
      alternative_phone: accountInfo?.alternative_phone
        ? accountInfo?.alternative_phone
        : "",
      profile_photo: "",
    },
    validationSchema: ValidationSechemaProfile(),
    onSubmit: async (values: AccountUpdate) => {
      try {
      } catch (err) {}
    },
  });

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
        <Grid container md={12} xs={12} spacing={1.5} sx={{ padding: "20px" }}>
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
                imgValue={profileFormik.values.profile_photo}
              />
            </CustomStackFullWidth>
          </Grid>

          {/* name */}
          <Grid item sm={8} xs={12}>
            <GlobalDisplayFlexBox sx={{ gap: "5px" }}>
              <TextField
                // disabled={isloading}
                sx={{ width: "100%", backgroundColor: "white" }}
                id="outlined-basic"
                variant="outlined"
                name="name"
                value={profileFormik.values.name}
                onChange={profileFormik.handleChange}
                label={t("Full Name")}
                required
                error={
                  profileFormik.touched.name &&
                  Boolean(profileFormik.errors.name)
                }
                helperText={
                  profileFormik.touched.name && profileFormik.errors.name
                }
              />

              <FormSubmitButton
                id={accountInfo?.id}
                NewInputName={profileFormik.values.name}
                InputName={accountInfo?.first_name}
                formikName="name"
              />
            </GlobalDisplayFlexBox>
          </Grid>
          {/* Phone Number*/}
          <Grid item sm={8} xs={12}>
            <GlobalDisplayFlexBox sx={{ gap: "5px" }}>
              <TextField
                // disabled={isloading}
                label={<span>{t("Phone Number")}</span>}
                variant="outlined"
                name="mobile"
                value={profileFormik.values.mobile}
                onChange={profileFormik.handleChange}
                sx={{ width: "100%", backgroundColor: "white" }}
                error={
                  profileFormik.touched.mobile &&
                  Boolean(profileFormik.errors.mobile)
                }
                helperText={
                  profileFormik.touched.mobile && profileFormik.errors.mobile
                }
              />
              <FormSubmitButton
                id={accountInfo?.id}
                NewInputName={profileFormik.values.mobile}
                InputName={accountInfo?.mobile}
                formikName="mobile"
              />
            </GlobalDisplayFlexBox>
          </Grid>
          {/* Alternative Phone*/}
          <Grid item sm={8} xs={12}>
            <GlobalDisplayFlexBox sx={{ gap: "5px" }}>
              <TextField
                // disabled={isloading}
                label={<span>{t("Alternative Phone")}</span>}
                variant="outlined"
                name="alternative_phone"
                value={profileFormik.values.alternative_phone}
                onChange={profileFormik.handleChange}
                sx={{ width: "100%", backgroundColor: "white" }}
                error={
                  profileFormik.touched.alternative_phone &&
                  Boolean(profileFormik.errors.alternative_phone)
                }
                helperText={
                  profileFormik.touched.alternative_phone &&
                  profileFormik.errors.alternative_phone
                }
              />
              <FormSubmitButton
              alternativeValue={profileFormik.values.alternative_phone}
                id={accountInfo?.id}
                NewInputName={profileFormik.values.alternative_phone}
                InputName={accountInfo?.alternative_phone}
                formikName="alternative_phone"
              />
            </GlobalDisplayFlexBox>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default BasicInformationForm;
