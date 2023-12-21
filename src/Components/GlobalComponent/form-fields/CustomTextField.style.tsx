import { styled, TextField } from "@mui/material";

export const CustomTextFieldStyle = styled(TextField)(
  ({
    theme,
    languagedirection,
  }: {
    languagedirection: string | undefined;
    theme: any;
  }) => ({
    borderRadius: "10px",
    backgroundColor: theme.palette.primary.light,
    "& .MuiOutlinedInput-root": {
      flexDirection:
        languagedirection && languagedirection === "rtl"
          ? "row-reverse"
          : "row",
    },
  })
);
