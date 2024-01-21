import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { HomeAreas } from "@/interfaces/HomeAreas";
import InputBase from "@mui/material/InputBase";
interface props {
  area: string;
  handleChange: (
    e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<string>
  ) => void;
  label: string;
  homeAreas: HomeAreas[];
  errors?: string | undefined;
  touched?: boolean | undefined;
}
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    // marginBottom: theme.spacing(1),
    // paddingBottom:theme.spacing(1)
    transform: "translateY(5px)",
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    height: "36px",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      // borderColor: "#80bdff",
      // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));
const GlobalSelectBox = ({
  area,
  handleChange,
  label,
  homeAreas,
  errors,
  touched,
}: props) => {
  //  hooks
  const { t } = useTranslation();

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel htmlFor="demo-customized-select-native">
          {t(label)}
        </InputLabel>
        <NativeSelect
          size="medium"
          sx={{ height: "48px" }}
          // sx={{
          //   "&.mui-style-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
          //     right: "50px !important",
          //   },
          //   color: "red",
          // }}
          fullWidth
          required
          id="demo-customized-select-native"
          value={area}
          // label="Select"
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          {homeAreas?.map((e: HomeAreas, i: number) => (
            <option key={e?.id} value={e?.id}>
              {e?.name}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
      {errors && touched && (
        <Typography sx={{ color: "red", fontSize: "12px" }}>
          {errors}
        </Typography>
      )}
    </Box>
  );
};

export default GlobalSelectBox;
