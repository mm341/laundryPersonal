import React, { SyntheticEvent, useState } from "react";
import PropTypes from "prop-types";
import { Rating } from "@mui/material";
import { Stack } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { CustomRating } from "@/styles/PublicStyles";

interface customRating {
  handleChangeRatings: (value: number) => void;
  ratingValue: number | string;
  readOnly: boolean;
  color?: string;
}
const CustomRatings = ({
  handleChangeRatings,
  ratingValue,
  readOnly,
  color,
}: customRating) => {
  const [value, setValue] = useState<number | string | null>(ratingValue);
  const handleChange = (e: SyntheticEvent, newValue: number | null) => {
    if (!readOnly) {
      if (newValue) {
        setValue(newValue);
        handleChangeRatings(newValue);
      }
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      gap={"5px"}
    >
      {/* {readOnly && (
        <CustomColouredTypography
          color={"black"}
          sx={{ fontSize: "14px", fontWeight: "500" }}
        >
          {ratingValue}
        </CustomColouredTypography>
      )} */}
      <CustomRating
        precision={0.5}
        readOnly={readOnly}
        name="simple-controlled"
        value={Number(value)}
        onChange={(e, newValue) => handleChange(e, newValue)}
      />
    </Stack>
  );
};

CustomRatings.propTypes = {};

export default CustomRatings;
