import React from "react";
import { Grid } from "@mui/material";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { AccountUpdate } from "@/interfaces/FormUpdateAccountInterface";
import BasicInformationForm from "./BasicInformationForm";
import { useAppDispatch } from "@/redux/store";
import { Updating } from "@/redux/slices/HandelUpdateProfile";
import MainApi from "@/api/MainApi";
const BasicInformation = () => {
  const [phoneVerify, setPhoneVerify] = useState(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const formSubmitHandler = (values: AccountUpdate) => {
    const { name, phone, alternative_phone, profile_photo } = values;

    if (name || phone || alternative_phone || profile_photo) {
      dispatch(Updating(values));
    }
  };

  return (
    <Grid>
      <BasicInformationForm formSubmitHandler={formSubmitHandler} />
    </Grid>
  );
};

export default BasicInformation;
