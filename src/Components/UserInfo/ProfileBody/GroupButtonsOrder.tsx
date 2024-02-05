import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, ButtonGroup, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import OrderFilterButton from "./OrderFilterButton";

const GroupButtonsOrder = ({
  setType,
  type,
}: {
  type: string;
  setType: (e: string) => void;
}) => {
  const filterData: string[] = ["Ongoing", "Completed", "Other"];
  return (
    <Box sx={{ mt: "10px", width: "100%" }}>
      <ButtonGroup sx={{ borderTopLeftRadius: "30px", height: "36px" }}>
        {filterData?.map((e, i) => (
          <OrderFilterButton
            key={i}
            setType={setType}
            type={type}
            FilterType={e}
          />
        ))}
      </ButtonGroup>
    </Box>
  );
};

GroupButtonsOrder.propTypes = {};

export default GroupButtonsOrder;
