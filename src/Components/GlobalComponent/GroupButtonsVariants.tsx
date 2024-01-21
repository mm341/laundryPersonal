import React from "react";

import { Box, ButtonGroup, styled } from "@mui/material";

import { VariantInterface } from "@/interfaces/VariantInterface";
import VariantFilterButton from "./VariantFilterButton";
import SimpleBar from "simplebar-react";

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
  //    custom design of scrollbar
  const ScrollbarRoot = styled(SimpleBar)`
    .simplebar-scrollbar::before {
      height: 6px;
      color: #329cd7;
      background-color: #b3e6ff;
    }
  `;

  return (
    <Box
      sx={{
        mt: "10px",
        width: "100%",
        height: "60px",
        // overflowX: "auto",
      }}
    >
      <ScrollbarRoot forceVisible="x" autoHide={false}>
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
      </ScrollbarRoot>
    </Box>
  );
};

GroupButtonsVariants.propTypes = {};

export default GroupButtonsVariants;
