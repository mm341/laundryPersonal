import { Box } from "@mui/material";
import React from "react";

const EmptyData = ({ img }: { img: string }) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt:"15px"
      }}
    >
      <img src={img} loading="lazy" alt="img" />
    </Box>
  );
};

export default EmptyData;
