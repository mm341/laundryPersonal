import { Box, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { RTL } from "./GlobalComponent/RTL/RTL";
import { NavMenuLink } from "@/styles/PublicStyles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";
import { HomeServices } from "@/interfaces/HomeServices";

const NavServices = ({
  setOpenAreaDialog,
  services,
  setServiceId,
}: {
  setOpenAreaDialog: (e: boolean) => void;
  responsiveNavbar?: boolean;
  services: HomeServices[];
  setServiceId: (e: number | undefined) => void;
}) => {
  //   hooks
  const { t } = useTranslation();
  const theme = useTheme();
  const [resdropdown, setResdropdown] = useState<boolean>(false);

  const handleresdropClick = () => {
    setResdropdown(true);
  };
  const handleResdropClose = () => {
    setResdropdown(false);
  };

  //  handel language direction
  let languagedirection: string | null = "";
  if (typeof window !== "undefined") {
    languagedirection = localStorage.getItem("direction");
  }

  return (
    <div
      onMouseOver={handleresdropClick}
      onMouseLeave={handleResdropClose}
      className=" relative"
    >
      <NavMenuLink sx={{ textDecoration: "none" }}>
        <Typography
          sx={{
            color: "black",
            fontWeight: "400",

            fontSize: { xl: "18px", md: "12px" },
          }}
        >
          {t("Services")}
          <KeyboardArrowDownIcon
            style={{
              width: "16px",
              marginLeft: "5px",
            }}
          />
        </Typography>
      </NavMenuLink>
      <RTL direction={languagedirection}>
        {resdropdown && (
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              zIndex: "101",
              width: "302px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              position: "absolute",
              borderRadius: "5px",
              p: "20px  ",
            }}
          >
            {services?.map((e: HomeServices, i: number) => (
              <Box key={e?.id}>
                <Typography
                  onClick={() => {
                    setOpenAreaDialog(true);
                    setServiceId(e?.id);
                  }}
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    cursor: "pointer",
                  }}
                >
                  {e?.name}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </RTL>
    </div>
  );
};

export default NavServices;
