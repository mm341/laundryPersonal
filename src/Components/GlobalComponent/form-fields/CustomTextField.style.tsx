import { styled, TextField } from "@mui/material";

export const CustomTextFieldStyle = styled(TextField)(
  ({
    theme,
    languagedirection,
    rate
  }: {
    languagedirection: string | undefined;
    theme: any;
    rate?:boolean
  }) => ({
    borderRadius: "10px",
    backgroundColor:!rate? "white":"transparent",
    "& .MuiOutlinedInput-root": {
      flexDirection:
        languagedirection && languagedirection === "rtl"
          ? "row-reverse"
          : "row",
    },
  })
)


