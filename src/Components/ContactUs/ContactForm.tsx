import { GlobalButton } from "@/styles/PublicStyles";
import { Button, Stack, TextField, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  //  hooks
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Stack component={"form"} direction={"column"} gap={"28px"} p={"20px"}>
      {/* Full Name */}

      <TextField type="text" name="Full Name" label={t("Full Name")} />
      {/* Email */}
      <TextField type="mail" name="Email" label={t("Email")} />
      {/* Phone Number */}
      <TextField type="number" name="Phone Number" label={t("Phone Number")} />

      {/* Message */}

      <TextField type="text" multiline minRows={5} label={t("Message")} />

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
