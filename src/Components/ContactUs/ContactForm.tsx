import { CustomStackFullWidth, GlobalButton } from "@/styles/PublicStyles";
import { Button, Stack, TextField, useTheme } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import ValidationSchemaForContact from "./ValidationschemaforContactUs";
import CustomPhoneInput from "../AuthBox/CustomPhoneInput";

const ContactForm = () => {
  //  hooks
  const { t } = useTranslation();
  const theme = useTheme();

  //  validation of add addresse form
  const ContactFormik = useFormik({
    initialValues: {
      FullName: "",
      Email: "",
      PhoneNumber: "",
      message: "",
    },
    validationSchema: ValidationSchemaForContact(),
    onSubmit: async (values) => {
      try {
      } catch (err) {}
    },
  });
  const handleOnChange = (e: string) => {
    ContactFormik.setFieldValue("PhoneNumber", e);
  };
  return (
    <Stack
      component={"form"}
      onSubmit={ContactFormik.handleSubmit}
      direction={"column"}
      gap={"28px"}
      p={"20px"}
      autoComplete="new-password"
    >
      {/* Full Name */}

      <TextField
        autoComplete="new-password"
        type="text"
        onChange={ContactFormik.handleChange}
        name="FullName"
        label={t("Full Name")}
        value={ContactFormik.values.FullName}
        helperText={ContactFormik.errors.FullName}
        onBlur={ContactFormik.handleBlur}
        error={Boolean(
          ContactFormik.errors.FullName && ContactFormik.touched.FullName
        )}
        required
      />
      {/* Email */}
      <TextField
        autoComplete="new-password"
        type="mail"
        onChange={ContactFormik.handleChange}
        name="Email"
        label={t("Email")}
        value={ContactFormik.values.Email}
        helperText={ContactFormik.errors.Email}
        onBlur={ContactFormik.handleBlur}
        error={Boolean(
          ContactFormik.errors.Email && ContactFormik.touched.Email
        )}
        required
      />
      {/* Phone Number */}
      {/* <TextField
        autoComplete="new-password"
        type="text"
        onChange={ContactFormik.handleChange}
        name="PhoneNumber"
        label={t("Phone Number")}
        value={ContactFormik.values.PhoneNumber}
        helperText={ContactFormik.errors.PhoneNumber}
        onBlur={ContactFormik.handleBlur}
        error={Boolean(
          ContactFormik.errors.PhoneNumber && ContactFormik.touched.PhoneNumber
        )}
        required
      /> */}

      <CustomStackFullWidth alignItems="center" spacing={{ xs: 2, md: 2 }}>
        <CustomPhoneInput
          value={ContactFormik.values.PhoneNumber}
          onHandleChange={handleOnChange}
          // initCountry={global?.country}
          rtlChange
          touched={ContactFormik.touched.PhoneNumber}
          errors={ContactFormik.errors.PhoneNumber}
          // isLoading={ContactFormik}
        />
      </CustomStackFullWidth>

      {/* Message */}

      <TextField
        autoComplete="new-password"
        type="text"
        onChange={ContactFormik.handleChange}
        multiline
        minRows={5}
        name="message"
        label={t("Message")}
        value={ContactFormik.values.message}
        helperText={ContactFormik.errors.message}
        onBlur={ContactFormik.handleBlur}
        error={Boolean(
          ContactFormik.errors.message && ContactFormik.touched.message
        )}
        required
      />

      <Button type="submit">
        <GlobalButton
          sx={{
            width: "155px",
            height: "48px",
            borderRadius: "4px",
            backgroundColor: theme.palette.primary.main,
            color: "white",
            fontSize: "20px",
            fontWeight: "600",
          }}
          py={"0"}
          px={"0"}
        >
          {t("Send")}
        </GlobalButton>
      </Button>
    </Stack>
  );
};

export default ContactForm;
