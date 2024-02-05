import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const ChekOutTitle = ({ title }: { title: string }) => {
  //  hooks
  const { t } = useTranslation();

  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      gap={"10px"}
    >
      <Box
        sx={{
          width: "4px",
          height: "20px",
          backgroundColor: theme.palette.primary.main,
        }}
      ></Box>

      <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
        {t(title)}
      </Typography>
    </Stack>
  );
};

export default ChekOutTitle;
