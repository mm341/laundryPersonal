import {
  Box,
  Grid,
  ListItem,
  ListItemText,
  Radio,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";

import { useTheme } from "@mui/material/styles";

import { useTranslation } from "react-i18next";

import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "@/styles/PublicStyles";
import editIcon from "../../../../public/info/edit.svg";
import deleteIcon from "../../../../public/info/delete.svg";
import titleADreesseIcon from "../../../../public/info/addresseTitleIcon.svg";
const AddresseMenu = ({
  setOpen,
  setOpenDeleteDialog,
}: {
  setOpen: (e: boolean) => void;
  setOpenDeleteDialog: (e: boolean) => void;
}) => {
  const array = [...Array(3)];
  return (
    <Grid container spacing={1.5}>
      {array?.map((e, i) => (
        <Grid
          key={i}
          sx={{ paddingRight: "20px", paddingLeft: "10px", mt: "15px" }}
          item
          xs={12}
          md={12}
        >
          <CustomPaperBigCard
            sx={{
              backgroundColor: "white",
              border: "1px solid black",
              paddingTop: "1px",
              paddingBottom: "1px",
            }}
          >
            <React.Fragment>
              <ListItem
                alignItems="flex-start"
                sx={{
                  cursor: "pointer",
                  backgroundColor: "white",
                  my: "10px",
                }}
                // selected={adres.id === id}
              >
                <CustomStackFullWidth
                  sx={{
                    display: "flex",
                    flexDirection: {
                      sm: "row",
                      xs: "column",
                    },
                  }}
                  alignItems="center"
                >
                  <Radio
                    //   checked={Number(adres.id) === Number(id)}
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    color={"success"}
                  />
                  <ListItemText
                    secondary={
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",

                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: {
                            sm: "row",
                            xs: "column",
                          },
                          gap: { sm: "", xs: "10px" },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            gap: "15px",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "5px",
                              alignItems: "center",
                            }}
                          >
                            <img
                              style={{ width: "20px", height: "20px" }}
                              src={titleADreesseIcon?.src}
                              loading="lazy"
                              alt="img"
                            />
                            <Typography
                              component={"span"}
                              sx={{
                                fontWeight: "700",
                                fontSize: "14px",
                              }}
                            >
                              home
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "3px",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: "700",
                                color: "black",
                              }}
                            >
                              location from map
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: "400",
                                color: "#999999",
                              }}
                            >
                              10 شقة، الدور 5، مبني 64، شارع مكة المكرمة
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                          }}
                        >
                          <img
                            onClick={() => setOpen(true)}
                            src={editIcon?.src}
                            loading="lazy"
                            alt="edit"
                          />
                          <img
                            onClick={() => setOpenDeleteDialog(true)}
                            src={deleteIcon?.src}
                            loading="lazy"
                            alt="delete"
                          />
                        </Box>
                      </Box>
                    }
                  />
                </CustomStackFullWidth>
              </ListItem>
            </React.Fragment>
          </CustomPaperBigCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default AddresseMenu;
