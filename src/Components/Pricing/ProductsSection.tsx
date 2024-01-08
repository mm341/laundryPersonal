import { useAppSelector } from "@/redux/store";
import { GlobalDisplayFlexColumnBox } from "@/styles/PublicStyles";
import { Box, Divider, Typography, styled, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import SimpleBar from "simplebar-react";

const ProductsSection = () => {
  //  hooks

  const {t}=useTranslation()
  const array = [...Array(15)];
  //  master data
  const { master } = useAppSelector((state) => state.master);

    //  custom design of scrollbar
    const ScrollbarRoot = styled(SimpleBar)`
    .simplebar-scrollbar::before {
      width: 6px;

      background-color: #d9d9d9;
    }
  `;
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        boxShadow: "0px 0px 4px 0px #0000001F",
        borderRadius: "8px",
      }}
    >
      <GlobalDisplayFlexColumnBox gap={"0px"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: {sm:"320px",xs:"110px"},
            p: "12px",
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            {t("Items")}
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            {t("Price")}
          </Typography>
        </Box>
        <ScrollbarRoot
          style={{
            maxHeight: "500px",
          }}
        >
        {array?.map((e, i) => (
          <Box
            key={i}
            sx={{ backgroundColor: i % 2 === 0 ? "#ECEFF1" : "white" }}
          >
            <Box
              key={i}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: {sm:"320px",xs:"110px"},
                p: "12px",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                Thoab
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                Thoab {master?.currency}
              </Typography>
            </Box>
          </Box>
        ))}
        </ScrollbarRoot>
      </GlobalDisplayFlexColumnBox>
    </Box>
  );
};

export default ProductsSection;
