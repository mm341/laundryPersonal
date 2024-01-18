import { GlobalButton } from "@/styles/PublicStyles";
import { Button, Stack, TextField, useTheme } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import ValidationSchemaForContact from "./ValidationschemaforContactUs";

const ContactForm = () => {
  //  hooks
  const { t } = useTranslation();
  const theme = useTheme();

  //  validation of add addresse form
  const addAddressFormik = useFormik({
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

  return (
    <Stack
      component={"form"}
      onSubmit={addAddressFormik.handleSubmit}
      direction={"column"}
      gap={"28px"}
      p={"20px"}
      autoComplete="new-password"
    >
      {/* Full Name */}

      <TextField
       autoComplete="new-password"
        type="text"
        onChange={addAddressFormik.handleChange}
        name="FullName"
        label={t("Full Name")}
        value={addAddressFormik.values.FullName}
        helperText={addAddressFormik.errors.FullName}
        onBlur={addAddressFormik.handleBlur}
        error={Boolean(
          addAddressFormik.errors.FullName && addAddressFormik.touched.FullName
        )}
        // required
      />
      {/* Email */}
      <TextField
       autoComplete="new-password"
        type="mail"
        onChange={addAddressFormik.handleChange}
        name="Email"
        label={t("Email")}
        value={addAddressFormik.values.Email}
        helperText={addAddressFormik.errors.Email}
        onBlur={addAddressFormik.handleBlur}
        error={Boolean(
          addAddressFormik.errors.Email && addAddressFormik.touched.Email
        )}
        // required
      />
      {/* Phone Number */}
      <TextField
       autoComplete="new-password"
        type="number"
        onChange={addAddressFormik.handleChange}
        name="PhoneNumber"
        label={t("Phone Number")}
        value={addAddressFormik.values.PhoneNumber}
        helperText={addAddressFormik.errors.PhoneNumber}
        onBlur={addAddressFormik.handleBlur}
        error={Boolean(
          addAddressFormik.errors.PhoneNumber &&
            addAddressFormik.touched.PhoneNumber
        )}
        // required
      />

      {/* Message */}

      <TextField
       autoComplete="new-password"
        type="text"
        onChange={addAddressFormik.handleChange}
        multiline
        minRows={5}
        name="message"
        label={t("Message")}
        value={addAddressFormik.values.message}
        helperText={addAddressFormik.errors.message}
        onBlur={addAddressFormik.handleBlur}
        error={Boolean(
          addAddressFormik.errors.message && addAddressFormik.touched.message
        )}
        // required
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
