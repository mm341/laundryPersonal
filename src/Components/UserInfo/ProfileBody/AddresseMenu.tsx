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
  setAddresseId,
  setAddresse,
  addressesData,
  isLoading,
  addresseDefaultId,
  setAddresseDefaultId,
}: {
  setOpen: (e: boolean) => void;
  setOpenDeleteDialog: (e: boolean) => void;
  setAddresseId: (e: string) => void;
  setAddresse: (e: AddresseInterface) => void;
  addressesData: AddresseInterface[];
  isLoading: boolean;
  addresseDefaultId: string;
  setAddresseDefaultId: (e: string) => void;
}) => {
  //  hooks

  //  handel addresse title img due to addresse title

  const OrderActionStatus = (addresse: AddresseInterface) => {
    let img;
    switch (addresse?.address_name) {
      case "home":
        img = titleADreesseHomeIcon?.src;
        break;

      case "office":
        img = titleADreesseOfficeIcon?.src;
        break;

      case "others":
        img = titleADreesseOthersIcon?.src;
        break;
    }

    return img;
  };

  return (
    <Grid container spacing={1.5}>
      {addressesData?.length > 0 &&
        addressesData?.map((addresse: AddresseInterface, i: number) => (
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
                  selected={addresse?.id === addresseDefaultId}
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
                      checked={addresse?.id === addresseDefaultId}
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      color={"success"}
                      onClick={() => setAddresseDefaultId(addresse?.id)}
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
                              md: "row",
                              xs: "column",
                            },
                            gap: { sm: "", xs: "10px" },
                          }}
                        >
                          <Box
                            onClick={() => setAddresseDefaultId(addresse?.id)}
                            sx={{
                              display: "flex",
                              gap: "15px",
                              alignItems: "center",
                              flexDirection: { md: "row", xs: "column" },
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
                                {addresse?.address_location}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  fontWeight: "400",
                                  color: "#999999",
                                }}
                              >
                                {addresse?.street} street{" "}
                                {addresse?.apartment_no} Apartment,{" "}
                                {addresse?.building_no} Building,{" "}
                                {addresse?.floor_no} Floor
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
                              onClick={() => {
                                setAddresseId(addresse?.id);
                                setOpenDeleteDialog(true);
                              }}
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
      {isLoading && <LoadingComponent />}
      {!isLoading && addressesData?.length === 0 && (
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
