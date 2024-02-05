import { Typography } from "@mui/material";
import React from "react";

const SaveVariableLocalStorage = () => {
  //  save service name in variable from localstorage
  let serviceName: string | undefined | null = "";

  if (typeof window !== "undefined") {
    serviceName = localStorage.getItem("service");
  }

  return (
    <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
      {serviceName}
    </Typography>
  );
};

export default SaveVariableLocalStorage;
