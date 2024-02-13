import { Stack, Typography, useTheme } from "@mui/material";

import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { cardInterface } from "@/interfaces/HomeData";
const FaqCard = ({ element, i }: { element: cardInterface; i: number }) => {
  const theme = useTheme();

  const [previewAnswer, setPreviewAnswer] = useState<Boolean>(false);

  return (
    <Stack
      direction={"column"}
      gap={"0px"}
      sx={{
        backgroundColor: previewAnswer
          ? theme.palette.background.default
          : "white",
        p: previewAnswer ? "15px" : "15px",
        borderRadius: "20px",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        gap={"20px"}
      >
        {!previewAnswer && (
          <KeyboardArrowDownIcon
            sx={{ cursor: "pointer", color: theme.palette.primary.main }}
            onClick={() => setPreviewAnswer(true)}
          />
        )}

        {previewAnswer && (
          <KeyboardArrowUpIcon
            sx={{ cursor: "pointer", color: theme.palette.primary.main }}
            onClick={() => setPreviewAnswer(false)}
          />
        )}
        <GlobalDisplayFlexColumnBox
          sx={{ transform: "translateY(-5px)" }}
          width={"100%"}
          gap={"15px"}
        >
          <Typography
            sx={{
              fontSize: { md: "24px", xs: "16px" },
              fontWeight: "600",
              textAlign: "left",
              cursor: "pointer",
            }}
            onClick={() => setPreviewAnswer(!previewAnswer)}
          >
            {element?.title}
          </Typography>

          {previewAnswer && (
            <Typography
              sx={{
                fontSize: { md: "20px", xs: "12px" },
                fontWeight: "400",
                opacity: "0.7",
                textAlign: "left",
              }}
              style={{ opacity: "0.7" }}
            >
              {element?.body}
            </Typography>
          )}
        </GlobalDisplayFlexColumnBox>
      </Stack>
    </Stack>
  );
};

export default FaqCard;
