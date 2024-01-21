import React, { useEffect } from "react";

import { Box, Stack, Typography } from "@mui/material";

import noData from "../../../../public/static/nodata.png";
import { styled, useTheme } from "@mui/material/styles";
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
import {
  DeleteAddresse,
  GetAllAdddressses,
  handelDefaultAddresse,
} from "@/redux/slices/AddressesRequests";
import DeleteDialog from "@/Components/DeleteDialogs";
import Meta from "@/Components/GlobalComponent/Meta";
import {
  AddresseInterface,
  initialAddresse,
} from "@/interfaces/AddresseInterface";
import { useQuery } from "react-query";
import PublicRequest from "@/utils/PublicRequests";
import MainApi from "@/api/MainApi";
import { Addresse } from "@/React-Query/addresses";
import PublicHandelingErrors from "@/utils/PublicHandelingErrors";
import SimpleBar from "simplebar-react";
import { Scrollbar } from "@/Components/GlobalComponent/Scrollbar";

const MyAddresses = () => {
  //  hooks
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<boolean>(false);
  const [addresse, setAddresse] = useState<AddresseInterface>(
    initialAddresse()
  );
  const [addresseDefaultId, setAddresseDefaultId] = useState<string>("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openDefalultDialog, setOpenDefalultDialog] = useState<boolean>(false);
  const [addresseId, setAddresseId] = useState<string>("");

  //  selectors
  const { isloadingDelete, isloadingDefault } = useAppSelector(
    (state) => state.addresse
  );
  //  request with api to get all addresses
  const {
    isLoading,
    data: myAddresses,
    isError,
    error,
    refetch,
  } = useQuery(
    ["addresse"],
    Addresse.GetAddreesse,

    {
      onError: () => {
        PublicHandelingErrors.onErrorResponse;
      },
    }
  );

  //  default addresse
  const defaultAddresse: string = myAddresses?.data?.data?.addresses[0]?.id;

  //  handel initial vaue of addresse form
  useEffect(() => {
    if (!open) {
      setAddresse(initialAddresse());
    }
  }, [open]);

  //  handel initial value of default addresse
  useEffect(() => {
    if (defaultAddresse) {
      setAddresseDefaultId(defaultAddresse);
    }
  }, [defaultAddresse]);
  //  function delete addresse
  const RemoveAddresse = () => {
    dispatch(DeleteAddresse({ id: addresseId })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        refetch();
        setOpenDeleteDialog(false);
      }
    });
  };

  //  function default addresse
  const DefaultAddresse = () => {
    dispatch(handelDefaultAddresse({ id: addresseDefaultId })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        refetch();
        setOpenDefalultDialog(false);
      }
    });
  };
  //  custom design of scrollbar
  

  return (
    <>
      <Meta title={"addresses"} description="addresses" keywords="addresses" />
      <CustomPaperBigCard
        sx={{
          boxShadow: "box-shadow: 0px 0px 6px 0px #00000026",

          backgroundColor: theme.palette.primary.dark,
        }}
      >
        <CustomStackFullWidth spacing={5}>
          {/*  all addresses */}

          <div>
            <Scrollbar
              style={{
                maxHeight: "50vh",
              }}
            >
              <AddresseMenu
                addresseDefaultId={addresseDefaultId}
                setAddresseDefaultId={setAddresseDefaultId}
                addressesData={myAddresses?.data?.data?.addresses}
                isLoading={isLoading}
                setAddresse={setAddresse}
                setOpenDeleteDialog={setOpenDeleteDialog}
                setOpen={setOpen}
                setAddresseId={setAddresseId}
              />
            </Scrollbar>
          </div>

          <Stack
            sx={{
              flexDirection: { md: "row", xs: "column" },
              paddingLeft: "10px",
            }}
            gap={"30px"}
            alignItems={"center"}
          >
            {myAddresses?.data?.data?.addresses?.length > 0 && (
              <Box
                onClick={() => {
                  setOpenDefalultDialog(true);
                }}
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
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  {t("Save As Default")}
                </Typography>
              </Box>
            )}

            {/*  add addresse form */}

            <AddNewAddress
              refetch={refetch}
              addresse={addresse}
              open={open}
              setOpen={setOpen}
              color={"white"}
            />
          </Stack>
        </CustomStackFullWidth>
      </CustomPaperBigCard>
      {/*  open deltete addresse dialog */}
      {openDeleteDialog && (
        <DeleteDialog
          Cancel={"Cancel"}
          header={"Remove Address?"}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          text={"Are you sure you want to delete the address?"}
          primaryButtonText={"Yes, Delete"}
          handelAction={RemoveAddresse}
          loading={isloadingDelete}
        />
      )}

      {/*  open change default addresse dialog */}
      {openDefalultDialog && (
        <DeleteDialog
          Cancel={"Cancel"}
          header={""}
          openDeleteDialog={openDefalultDialog}
          setOpenDeleteDialog={setOpenDefalultDialog}
          text={"Are you sure you want to set another default?"}
          primaryButtonText={"Yes, Confirm"}
          handelAction={DefaultAddresse}
          loading={isloadingDefault}
        />
      )}
    </>
  );
};

export default MyAddresses;
