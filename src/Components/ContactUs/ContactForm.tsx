import { CustomStackFullWidth, GlobalButton } from "@/styles/PublicStyles";
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import ValidationSchemaForContact from "./ValidationschemaforContactUs";
import CustomPhoneInput from "../AuthBox/CustomPhoneInput";

import { ContactingRequest } from "@/redux/slices/ContactingUs";
import { useAppDispatch, useAppSelector } from "@/redux/store";

const ContactForm = () => {
  //  hooks
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  // const {isloading}=useAppSelector((state)=>state.contact)
  //  validation of add addresse form
  const ContactFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
      message: "",
    },
    validationSchema: ValidationSchemaForContact(),
    onSubmit: async (values) => {
      let phone_number = `+${values.phone_number}`;
      try {
        dispatch(
          ContactingRequest({
            name: values.name,
            phone_number,
            email: values.email,
            message: values.message,
          })
        ).then((res: any) => {
          if (res.payload.message === "Message sent successfully") {
            ContactFormik?.handleReset(res);
            ContactFormik.setFieldValue("phone_number", "+20");
          }
        });
      } catch (err) {}
    },
  });
  const handleOnChange = (e: string) => {
    ContactFormik.setFieldValue("phone_number", e);
  };
  const { isloading } = useAppSelector((state) => state.contact);
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
        disabled={isloading}
        autoComplete="new-password"
        type="text"
        onChange={ContactFormik.handleChange}
        name="name"
        label={t("Full Name")}
        value={ContactFormik.values.name}
        helperText={ContactFormik.errors.name}
        onBlur={ContactFormik.handleBlur}
        error={Boolean(ContactFormik.errors.name && ContactFormik.touched.name)}
        required
      />
      {/* Email */}
      <TextField
        disabled={isloading}
        autoComplete="new-password"
        type="mail"
        onChange={ContactFormik.handleChange}
        name="email"
        label={t("Email")}
        value={ContactFormik.values.email}
        helperText={ContactFormik.errors.email}
        onBlur={ContactFormik.handleBlur}
        error={Boolean(
          ContactFormik.errors.email && ContactFormik.touched.email
        )}
        required
      />
      {/* Phone Number */}

      <CustomStackFullWidth alignItems="center" spacing={{ xs: 2, md: 2 }}>
        <CustomPhoneInput
          value={ContactFormik.values.phone_number}
          onHandleChange={handleOnChange}
          // initCountry={global?.country}
          rtlChange
          touched={ContactFormik.touched.phone_number}
          errors={ContactFormik.errors.phone_number}
          // isLoading={ContactFormik}
        />
      </CustomStackFullWidth>

      {/* Message */}

      <TextField
        disabled={isloading}
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

      <Button type={!isloading ? "submit" : "button"}>
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
          {isloading ? (
            <CircularProgress
              sx={{ color: "white", fontSize: "10px" }}
              size={25}
            />
          ) : (
            t("Send")
          )}
        </GlobalButton>
      </Button>
    </Stack>
  );
};

export default ContactForm;
