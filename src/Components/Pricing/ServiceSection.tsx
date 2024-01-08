import { useAppSelector } from "@/redux/store";
import { GlobalDisplayFlexColumnBox } from "@/styles/PublicStyles";
import { Box, Divider, Typography, styled, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
import SimpleBar from "simplebar-react";

const ServiceSection = ({
  setServiceId,
  serviceId,
}: {
  setServiceId: (e: number) => void;
  serviceId: number;
}) => {
  //    hooks
  const theme = useTheme();
  const { services } = useAppSelector((state) => state.services);

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
      <ScrollbarRoot
          style={{
            maxHeight: "650px",
          }}
        >
        {services?.map((e, i) => (
          <Box key={i} sx={{backgroundColor:serviceId===e.id ?"#ECEFF1":"white"}}>
            <Box
              key={i}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "15px",
                p: "12px",
                cursor:"pointer"
              }}
              onClick={() => setServiceId(e?.id)}
            >
              <Image
                src={e?.image_path}
                loading="lazy"
                alt="img"
                width={"100"}
                height={"100"}
                style={{ width: "28px", height: "28px" }}
              />
              <Typography
                sx={{
                  fontSize: {md:"20px",xs:"17px"},
                  fontWeight: serviceId!==e?.id?"500":"600",
                  color:serviceId!==e?.id? theme.palette.secondary.contrastText:"black",
                }}
              >
                {e?.name}
              </Typography>
            </Box>
            <Divider orientation="horizontal" />
          </Box>
        ))}
        </ScrollbarRoot>
      </GlobalDisplayFlexColumnBox>
    </Box>
  );
};

export default ServiceSection;
