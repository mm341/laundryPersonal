import {
  Box,
  Grid,
  ListItem,
  ListItemText,
  Radio,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "@/styles/PublicStyles";
import editIcon from "../../../../public/info/edit.svg";
import deleteIcon from "../../../../public/info/delete.svg";
import titleADreesseHomeIcon from "../../../../public/info/addresseTitleIcon.svg";
import titleADreesseOfficeIcon from "../../../../public/info/titleAddresseOfficeIcon.svg";
import titleADreesseOthersIcon from "../../../../public/info/titleAddresseOthersIcon.svg";
import { useAppSelector } from "@/redux/store";
import { AddresseInterface } from "@/interfaces/AddresseInterface";
import LoadingComponent from "@/Components/GlobalComponent/LoadingComponent";
import NoAddressesFound from "../../../../public/info/noAddresseFound.svg";
const AddresseMenu = ({
  setOpen,
  setOpenDeleteDialog,

  setAddresse,
}: {
  setOpen: (e: boolean) => void;
  setOpenDeleteDialog: (e: boolean) => void;

  setAddresse: (e: AddresseInterface) => void;
}) => {
  //  hooks

  //  selectors
  const { myAddresses, isloading } = useAppSelector((state) => state.addresse);

  //  handel addresse title img due to addresse title

  const OrderActionStatus = (addresse: AddresseInterface) => {
    let img;
    switch (addresse?.address_name) {
      case "Home":
        img = titleADreesseHomeIcon?.src;
        break;

      case "Office":
        img = titleADreesseOfficeIcon?.src;
        break;

      case "Others":
        img = titleADreesseOthersIcon?.src;
        break;
    }

    return img;
  };
  return (
    <Grid container spacing={1.5}>
      {myAddresses?.length > 0 &&
        !isloading &&
        myAddresses?.map((addresse: AddresseInterface, i: number) => (
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
                                src={OrderActionStatus(addresse)}
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
                                {addresse?.address_name}
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
                                {addresse?.area} area {addresse?.house_no}{" "}
                                Apartment, {addresse?.flat_no} Floor,{" "}
                                {addresse?.block} Building
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
                              onClick={() => {
                                setAddresse(addresse);
                                setOpen(true);
                              }}
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
      {/*  loading data */}
      {isloading && myAddresses?.length === 0 && <LoadingComponent />}
      {!isloading && myAddresses?.length === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "300px",
          }}
        >
          <img src={NoAddressesFound?.src} loading="lazy" alt="img" />
        </Box>
      )}
    </Grid>
  );
};

export default AddresseMenu;
