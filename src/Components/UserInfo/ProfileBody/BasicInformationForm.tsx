import React from "react";
import { Grid, TextField, Typography, useTheme } from "@mui/material";

import { useFormik } from "formik";
import ValidationSechemaProfile from "./Validation";

import { useTranslation } from "react-i18next";

import { AccountUpdate } from "@/interfaces/FormUpdateAccountInterface";
import { ButtonBox } from "@/styles/PublicStyles";
import Button from "@mui/material/Button";
const BasicInformationForm = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const profileFormik = useFormik({
    initialValues: {
      //   f_name: f_name || l_name ? `${f_name}  ${l_name}` : "",
      //   phone: phone ? phone : "",
    },
    validationSchema: ValidationSechemaProfile(),
    onSubmit: async (values: AccountUpdate) => {
      try {
        const data: AccountUpdate = {};

        data.name = values.f_name;

        // if (values.phone !== phone) {
        // data.phone = values.phone;
        // }
        if (Object.values(data).length > 0) {
          formSubmitOnSuccess(data);
        }
      } catch (err) {}
    },
  });

  const formSubmitOnSuccess = (values: AccountUpdate) => {
    // formSubmit(values);
  };

  return (
    <>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: "400",
          mb: "10px",
          ml: "3px",
        }}
      >
        {t("Account info")}
      </Typography>
      <form noValidate onSubmit={profileFormik.handleSubmit}>
        <Grid container md={12} xs={12} spacing={2} sx={{ padding: "20px" }}>
          <Grid item xs={12} md={6}>
            <TextField
              //   disabled={isLoading}
              sx={{ width: "100%" }}
              id="outlined-basic"
              variant="outlined"
              name="f_name"
              value={profileFormik.values.f_name}
              onChange={profileFormik.handleChange}
              label={t("Full Name")}
              required
              error={
                profileFormik.touched.f_name &&
                Boolean(profileFormik.errors.f_name)
              }
              helperText={
                profileFormik.touched.f_name && profileFormik.errors.f_name
              }
                // touched={profileFormik.touched.f_name}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              //   disabled={isLoading}
              label={<span>{t("Phone")}</span>}
              variant="outlined"
              name="phone"
              value={profileFormik.values.phone}
              onChange={profileFormik.handleChange}
              sx={{ width: "100%" }}
              //   InputProps={{
              //     inputMode: "numeric",
              //     pattern: "[0-9]*",
              //   }}
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

          <Grid item md={3} xs={12} sx={{ mt: "25px", mb: "2px" }}>
            <Button
              type="submit"
              sx={{
                color: "white",
                backgroundColor: theme.palette.primary.main,
                ":hover": {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            >
              {t(" Update")}
            </Button>
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
