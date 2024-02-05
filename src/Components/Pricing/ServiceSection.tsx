import { useAppSelector } from "@/redux/store";
import { GlobalDisplayFlexColumnBox } from "@/styles/PublicStyles";
import { Box, Divider, Typography, styled, useTheme } from "@mui/material";
// import Image from "next/image";
import React from "react";
import SimpleBar from "simplebar-react";
import { Scrollbar } from "../GlobalComponent/Scrollbar";

const ServiceSection = ({
  setServiceId,
  serviceId,
  setSearchText,
}: {
  setServiceId: (e: string) => void;
  serviceId: string | string[] | undefined;
  setSearchText: (e: string) => void;
}) => {
  //    hooks
  const theme = useTheme();
  const { services } = useAppSelector((state) => state.services);

 
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
        <Scrollbar
          style={{
            maxHeight: "650px",
          }}
        >
          {services?.map((e, i) => (
            <Box
              key={i}
              sx={{ backgroundColor: serviceId === e.id ? "#ECEFF1" : "white" }}
            >
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "15px",
                  p: "12px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSearchText("");
                  setServiceId(e?.id);
                }}
              >
                <img
                  src={e?.image_path}
                  loading="lazy"
                  alt="img"
                  width={"100"}
                  height={"100"}
                  style={{ width: "28px", height: "28px" }}
                />
                <Typography
                  sx={{
                    fontSize: { md: "20px", xs: "17px" },
                    fontWeight: serviceId !== e?.id ? "500" : "600",
                    color:
                      serviceId !== e?.id
                        ? theme.palette.secondary.contrastText
                        : "black",
                  }}
                >
                  {e?.name}
                </Typography>
              </Box>
              <Divider orientation="horizontal" />
            </Box>
          ))}
        </Scrollbar>
      </GlobalDisplayFlexColumnBox>
    </Box>
  );
};

export default ServiceSection;
