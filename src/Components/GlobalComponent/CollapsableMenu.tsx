import React, { useState } from "react";
import { alpha, Collapse, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { useRouter } from "next/router";
import Link from "next/link";

import { t } from "i18next";
import { useTheme } from "@emotion/react";
import { HomeServices } from "@/interfaces/HomeServices";

const CollapsableMenu = ({
  setOpenDrawer,
  setOpenAreaDialog,
  services,
  setServiceId,
}: {
  setOpenDrawer: (e: boolean) => void;
  setOpenAreaDialog: (e: boolean) => void;
  services: HomeServices[];
  setServiceId: (e: number | undefined) => void;
}) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  const handleRoute = (e: HomeServices) => {
    setServiceId(e.id);
    setOpenAreaDialog(true);
    setOpenDrawer(false);
    localStorage.setItem("service", e?.name);
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          "&:hover": {
            backgroundColor: "primary.main",
          },
        }}
      >
        <ListItemText primary={t("Services")} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {services?.map((e: HomeServices, i: number) => (
            <ListItemButton
              sx={{
                pl: 4,
                "&:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.2),
                },
              }}
              key={e?.id}
              onClick={() => handleRoute(e)}
            >
              <ListItemText primary={e?.name}></ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default CollapsableMenu;
