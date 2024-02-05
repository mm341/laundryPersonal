import { Box } from "@mui/material";
import React from "react";
import { ClipLoader } from "react-spinners";
const CustomLoaderPage = ({ loading }: { loading: boolean }) => {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        mt: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <ClipLoader color={"#329CD7"} loading={loading} size={50} />
    </Box>
  );
};

export default CustomLoaderPage;
