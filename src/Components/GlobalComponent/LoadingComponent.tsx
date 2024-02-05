import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoadingComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "300px",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingComponent;
