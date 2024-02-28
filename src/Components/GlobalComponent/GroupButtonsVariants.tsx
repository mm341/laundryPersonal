import React from "react";

import { Box, ButtonGroup, styled } from "@mui/material";

import { VariantInterface } from "@/interfaces/VariantInterface";
import VariantFilterButton from "./VariantFilterButton";
import SimpleBar from "simplebar-react";
import { Scrollbar } from "./Scrollbar";
import { ScrollbarHorizontal } from "./ScrollbarHorizontal";

const GroupButtonsVariants = ({
  setType,
  type,
  data,
  setSearchText,
}: {
  type: string;
  setType: (e: string) => void;
  data: VariantInterface[];
  setSearchText: (e: string) => void;
}) => {


  return (
    <Box
      sx={{
        mt: "10px",
        width: "100%",
        height: "60px",
       
        // overflowX: "auto",
      }}
    >
      <ScrollbarHorizontal forceVisible="x" autoHide={false}>
        <ButtonGroup
          sx={{ borderTopLeftRadius: "30px", height: "100%", mb: "15px" }}
        >
          {data?.map((e: VariantInterface, i: number) => (
            <VariantFilterButton
              setSearchText={setSearchText}
              key={i}
              setType={setType}
              type={type}
              FilterType={e}
            />
          ))}
        </ButtonGroup>
      </ScrollbarHorizontal>
    </Box>
  );
};

GroupButtonsVariants.propTypes = {};

export default GroupButtonsVariants;
