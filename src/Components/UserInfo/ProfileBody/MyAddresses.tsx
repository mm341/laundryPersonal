import React, { useEffect } from "react";

import { Box, Stack, Typography } from "@mui/material";

import noData from "../../../../public/static/nodata.png";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
  CustomTypography,
} from "@/styles/PublicStyles";
// import ScrollerProvider from "@/Components/GlobalComponent/scroller-provider";
import AddresseShimmer from "@/Components/Chimmers/AddresseShimmer";
import CustomEmptyResult from "@/Components/GlobalComponent/empty-view/CustomEmptyResult";
import AddresseMenu from "./AddresseMenu";
import AddNewAddress from "./AddNewAddress";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { GetAllAdddressses } from "@/redux/slices/AddressesRequests";
import DeleteDialog from "@/Components/DeleteDialogs";
import Meta from "@/Components/GlobalComponent/Meta";
import {
  AddresseInterface,
  initialAddresse,
} from "@/interfaces/AddresseInterface";

const MyAddresses = () => {
  //  hooks
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<boolean>(false);
  const [addresse, setAddresse] = useState<AddresseInterface>(
    initialAddresse()
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  //  selectors
  const { myAddresses } = useAppSelector((state) => state.addresse);
  //  request with api to get all addresses
  useEffect(() => {
    dispatch(GetAllAdddressses());
  }, [dispatch]);

  useEffect(() => {
    if (!open) {
      setAddresse(initialAddresse());
    }
  }, [open]);
  return (
    <>
      <Meta title={"addresses"} description="" keywords="" />
      <CustomPaperBigCard
        sx={{
          boxShadow: "box-shadow: 0px 0px 6px 0px #00000026",

          backgroundColor: theme.palette.primary.dark,
        }}
      >
        <CustomStackFullWidth spacing={5}>
          <AddresseMenu
            setAddresse={setAddresse}
            setOpenDeleteDialog={setOpenDeleteDialog}
            setOpen={setOpen}
          />

          <Stack
            sx={{
              flexDirection: { md: "row", xs: "column" },
              paddingLeft: "10px",
            }}
            gap={"30px"}
            alignItems={"center"}
          >
            {myAddresses?.length > 0 && (
              <Box
                sx={{
                  width: "170px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: theme.palette.primary.main,
                  borderRadius: "8px",
                  border: `1px solid ${theme.palette.primary.main}`,
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {t("Save As Default")}
                </Typography>
              </Box>
            )}
            <Box
              sx={{
                width: "190px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.palette.primary.main,
                borderRadius: "8px",
                color: "white",
              }}
            >
              <AddNewAddress
                addresse={addresse}
                open={open}
                setOpen={setOpen}
                color={"white"}
              />
            </Box>
          </Stack>
        </CustomStackFullWidth>
      </CustomPaperBigCard>

      {openDeleteDialog && (
        <DeleteDialog
          Cancel={"Cancel"}
          header={"Remove Address?"}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          text={"Are you sure you want to delete the address?"}
          primaryButtonText={"Yes, Delete"}
        />
      )}
    </>
  );
};

export default MyAddresses;
