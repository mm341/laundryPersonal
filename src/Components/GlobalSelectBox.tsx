import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { HomeAreas } from "@/interfaces/HomeAreas";
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
    <Box sx={{ backgroundColor: "white", borderRadius: "10px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{t(label)}</InputLabel>
        <Select
          sx={{
            "&.mui-style-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
              right: "50px !important",
            },
            color: "red",
          }}
          fullWidth
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={area}
          label="Select"
          onChange={handleChange}
        >
          {homeAreas?.map((e: HomeAreas, i: number) => (
            <MenuItem key={e?.id} value={e?.id}>
              {e?.name}
            </MenuItem>
          ))}
        </Select>
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
