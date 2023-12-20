import React from "react";
import { Grid } from "@mui/material";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { AccountUpdate } from "@/interfaces/FormUpdateAccountInterface";
import BasicInformationForm from "./BasicInformationForm";
const BasicInformation = () => {
  const [phoneVerify, setPhoneVerify] = useState(false);
  const { t } = useTranslation();
  const formSubmitHandler = (values: AccountUpdate) => {
    const { name, phone } = values;
    let formData = new FormData();
    if (name) {
      formData.append("name", name);
    }

    if (phone) {
      formData.append("phone", phone);
    }
  };

  return (
    <Grid
      sx={{
        borderRadius: "10px",
        background: (theme) => theme.palette.background.paper,
      }}
    >
      <BasicInformationForm />
    </Grid>
  );
};

export default BasicInformation;
