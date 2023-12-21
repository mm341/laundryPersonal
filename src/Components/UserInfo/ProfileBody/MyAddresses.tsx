import React from "react";

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

const MyAddresses = () => {
  // const { data, refetch, isFetching, isLoading } = useQuery(
  //     ['address-list'],
  //     AddressApi.addressList,
  //     {
  //         onError: onSingleErrorResponse,
  //     }
  // )

  const theme = useTheme();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [idRequest, setIdRequest] = useState("");

  return (
    <CustomPaperBigCard>
      <CustomStackFullWidth spacing={2}>
        <CustomStackFullWidth
          justifyContent="space-between"
          direction="row"
          alignItems="center"
        >
          <CustomTypography fontWeight="500">
            {t("Saved Address")}
          </CustomTypography>
        </CustomStackFullWidth>
        {/* {!isLoading ? ( */}
        {/* <ScrollerProvider maxHeight="40vh"> */}
          <AddresseMenu
          // restaurantZone={restaurantZone}
          // setAddresseId={setAddresseId}
          // checkout={checkout}
          // data={data}
          // defaultAddresse={defaultAddresse}
          // refetch={refetch}
          // setIdRequest={setIdRequest}
          // action={action}
          // handelClose={handelClose}
          />
        {/* </ScrollerProvider> */}
        {/* ) : (
          <AddresseShimmer />
        )} */}

        {/* {!isFetching && data?.data?.addresses?.length === 0 && (
          <Stack width="100%" alignItems="center" justifyContent="center">
            <CustomEmptyResult label="No Saved Address Found" image={noData} />
          </Stack>
        )} */}

        <Stack direction={"row"} gap={"20px"} alignItems={"center"}>
          {/* <Box
            sx={{
              width: "170px",
              height: "40px",
              display:
                data?.data?.addresses?.length > 0 && !checkout
                  ? "flex"
                  : "none",
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
              onClick={() => setOpen(true)}
            >
              {t("Save As Default")}
            </Typography>
          </Box> */}
          <Box
            sx={{
              width: "170px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "8px",
              color: "white",
            }}
          >
            <AddNewAddress color={"white"}  />
          </Box>
        </Stack>

        {/* {open && (
          <DefaultMainAddress
            open={open}
            handleClose={handleClose}
            addressId={idRequest}
            refetch={refetch}
          />
        )} */}
      </CustomStackFullWidth>
    </CustomPaperBigCard>
  );
};

export default MyAddresses;
