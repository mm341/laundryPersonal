import React from "react";
import { Grid } from "@mui/material";
import BasicInformationForm from "./BasicInformationForm";
import { useAppSelector } from "@/redux/store";

const BasicInformation = () => {
  //  hooks

  const { accountInfo } = useAppSelector((state) => state.profile);

  //  get token from localstorage
  let token: string | null = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  return (
    <Grid>
      <BasicInformationForm accountInfo={accountInfo} />
    </Grid>
  );
};

export default BasicInformation;
