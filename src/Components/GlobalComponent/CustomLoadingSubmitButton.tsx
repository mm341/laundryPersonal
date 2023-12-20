import { Button, CircularProgress, alpha, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const CustomLoadingSubmitButton = ({
  word,
  loading,
}: {
  word: string;
  loading?: boolean;
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Button
      disabled={loading}
      className="bg-[#329CD7]"
      fullWidth
      sx={{
        color: "white",
        mt: "20px",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.9),
        },
      }}
      variant="contained"
      type="submit"
    >
      {loading ? <CircularProgress sx={{ color: "white" }} /> : t(word)}
    </Button>
  );
};

export default CustomLoadingSubmitButton;
