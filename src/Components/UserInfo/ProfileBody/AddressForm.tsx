import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  SelectChangeEvent,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import LoadingButton from "@mui/lab/LoadingButton";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useTheme } from "@mui/material/styles";
import CustomTextFieldWithFormik from "@/Components/GlobalComponent/form-fields/CustomTextFieldWithFormik";
import GlobalSelectBox from "@/Components/GlobalSelectBox";
import { useAppSelector } from "@/redux/store";
import homeSelectIcon from "../../../../public/info/addresseTitleIcon.svg";
import officeSelectIcon from "../../../../public/info/officeSelectIcon.svg";
import OthersSelectIcon from "../../../../public/info/addresse.svg";
import { AddresseType } from "@/interfaces/AddresseTypeInterface";
import GlobalAddresseType from "@/Components/GlobalComponent/GlobalAddresseType";
import { GlobalDisplayFlexBox } from "@/styles/PublicStyles";
import markerIcon from "../../../../public/info/markerIcon.svg";
import GoogleMapComponent from "./GoogleMapComponent";
import { useGeolocated } from "react-geolocated";
import { useQuery } from "react-query";
import ValidationSchemaForAddAddress from "./ValidationSchemaForAddAddress";
import { AddresseInterface } from "@/interfaces/AddresseInterface";
export interface locationInterface {
  lat: number;
  lng: number;
}

const AddressForm = ({
  setOpen,
  addresse,
}: {
  setOpen: (e: boolean) => void;
  addresse: AddresseInterface | undefined;
}) => {
  //  hooks
  const theme = useTheme();
  const [selectValue, setselectValue] = useState<string>("");
  const [addresseType, setAddresseType] = useState<string>(
    addresse?.address_name ?? "Home"
  );
  const { t } = useTranslation();
  const { areas } = useAppSelector((state) => state.services);

  //   handel google map componenet
  // /////////////////////////////////////////////////
  const [currentLocation, setCurrentLocation] = useState<
    locationInterface | undefined
  >();
  const [location, setLocation] = useState<locationInterface>({
    lat: currentLocation?.lat ?? 30,
    lng: currentLocation?.lng ?? 30,
  });

  const [placeDetailsEnabled, setPlaceDetailsEnabled] =
    useState<boolean>(false);
  const [locationEnabled, setLocationEnabled] = useState<boolean>(false);
  const [addresseNow, setAddresseNow] = useState<string>("");

  const [isDisablePickButton, setDisablePickButton] = useState<boolean>(false);

  const { coords, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 1000,
  });

  useEffect(() => {
    if (coords?.latitude && coords?.longitude && isGeolocationEnabled) {
      setCurrentLocation({
        lat: coords?.latitude,
        lng: coords?.longitude,
      });
    }
  }, [coords?.latitude, coords?.longitude, isGeolocationEnabled]);

  // ///////////////////////////////////////////////////
  //  handel select area
  const handelSelectBox = (
    e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<string>
  ) => {
    setselectValue(e.target.value);
  };

  //  select Addresse Type
  const typeData: AddresseType[] = [
    {
      label: t("Home"),
      value: "Home",
      img: homeSelectIcon,
    },
    {
      label: t("Office"),
      value: "Office",
      img: officeSelectIcon,
    },
    {
      label: t("Others"),
      value: "Others",
      img: OthersSelectIcon,
    },
  ];

  useEffect(() => {
    if (addresse?.latitude) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${addresse?.latitude},${addresse?.longitude}&key=AIzaSyCP79UJhaH4Gx2odCILeJ5qhT2H9uVqRBg`
      )
        .then((res) => res.json())
        .then((address) => {
          setAddresseNow(address?.results[0]?.formatted_address);
        });
    }
    if (currentLocation?.lat && currentLocation?.lng) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation?.lat},${currentLocation?.lng}&key=AIzaSyCP79UJhaH4Gx2odCILeJ5qhT2H9uVqRBg`
      )
        .then((res) => res.json())
        .then((address) => {
          setAddresseNow(address?.results[0]?.formatted_address);
        });
    }
    if (location?.lat && location?.lng) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location?.lat},${location?.lng}&key=AIzaSyCP79UJhaH4Gx2odCILeJ5qhT2H9uVqRBg`
      )
        .then((res) => res.json())
        .then((address) => {
          setAddresseNow(address?.results[0]?.formatted_address);
        });
    }
  }, [
    location?.lat,
    location?.lng,
    currentLocation?.lat,
    currentLocation?.lng,
    addresse?.latitude,
    addresse?.longitude,
  ]);

  //  validation of add addresse form
  const addAddressFormik = useFormik({
    initialValues: {
      address_type: "",
      area: "",
      Building: "",
      floor: "",
      apartment: "",
      street: "",
    },
    validationSchema: ValidationSchemaForAddAddress(),
    onSubmit: async (values) => {
      try {
        // let newData = {
        //     latitude: lat,
        //     longitude: lng,
        //     address: values.address,
        //     house: values.Building,
        //     floor: values.floor,
        //     apartment: values.apartment,
        //     address_type:
        //         values.address_label !== ''
        //             ? values.address_label
        //             : values.address_type,
        //     id: item?.id,
        // }
        // formSubmitOnSuccess(newData)
      } catch (err) {}
    },
  });
  // const formSubmitOnSuccess = (values) => {
  //     formSubmit(values)
  // }

  const StreetHandler = (value: string) => {
    addAddressFormik.setFieldValue("street", value);
  };

  const BuildingHandler = (value: string) => {
    addAddressFormik.setFieldValue("Building", value);
  };
  const floorHandler = (value: string) => {
    addAddressFormik.setFieldValue("floor", value);
  };
  const appartmentHandler = (value: string) => {
    addAddressFormik.setFieldValue("apartment", value);
  };
  // useEffect(() => {
  //     addAddressFormik.setFieldValue('address', deliveryAddress)
  // }, [deliveryAddress])

  useEffect(() => {
    if (addresseType) {
      addAddressFormik.setFieldValue("address_type", addresseType);
    }
  }, [addresseType]);
  useEffect(() => {
    if (selectValue) {
      addAddressFormik.setFieldValue("area", selectValue);
    }
  }, [selectValue]);

  return (
    <Stack>
      <form onSubmit={addAddressFormik.handleSubmit} noValidate>
        <Grid
          container
          spacing={3}
          sx={{
            paddingBlockStart: "10px",
            paddingInlineEnd: "10px",
          }}
        >
          {/* <Grid container spacing={2}> */}
          <Grid item md={8} sm={4} xs={12}>
            <GlobalDisplayFlexBox
              sx={{ justifyContent: "center", gap: "15px" }}
            >
              {typeData?.map((e: AddresseType, i: number) => (
                <GlobalAddresseType
                  setAddresseType={setAddresseType}
                  addresseType={addresseType}
                  key={i}
                  element={e}
                />
              ))}
            </GlobalDisplayFlexBox>
          </Grid>

          <Grid item md={8} sm={12} xs={12}>
            <GlobalSelectBox
              touched={addAddressFormik.touched.apartment}
              errors={addAddressFormik.errors.area}
              area={selectValue}
              handleChange={handelSelectBox}
              label={"Choose Area"}
              homeAreas={areas}
            />
          </Grid>

          <Grid item xs={12}>
            <GoogleMapComponent
              addresse={addresse}
              currentLocation={currentLocation}
              addresseNow={addresseNow}
              setLocation={setLocation}
              location={location}
              setPlaceDetailsEnabled={setPlaceDetailsEnabled}
              placeDetailsEnabled={placeDetailsEnabled}
              setLocationEnabled={setLocationEnabled}
              setDisablePickButton={setDisablePickButton}
              height="300px"
              markerIcon={markerIcon}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextFieldWithFormik
              type="number"
              label={t("Apartment")}
              touched={addAddressFormik.touched.apartment}
              errors={addAddressFormik.errors.apartment}
              fieldProps={addAddressFormik.getFieldProps("apartment")}
              onChangeHandler={appartmentHandler}
              value={addAddressFormik.values.apartment}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextFieldWithFormik
              type="number"
              label={t("Building")}
              touched={addAddressFormik.touched.Building}
              errors={addAddressFormik.errors.Building}
              fieldProps={addAddressFormik.getFieldProps("Building")}
              onChangeHandler={BuildingHandler}
              value={addAddressFormik.values.Building}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextFieldWithFormik
              type="number"
              label={t("Floor")}
              touched={addAddressFormik.touched.floor}
              errors={addAddressFormik.errors.floor}
              fieldProps={addAddressFormik.getFieldProps("floor")}
              onChangeHandler={floorHandler}
              value={addAddressFormik.values.floor}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextFieldWithFormik
              type="text"
              label={t("Street")}
              touched={addAddressFormik.touched.street}
              errors={addAddressFormik.errors.street}
              fieldProps={addAddressFormik.getFieldProps("street")}
              onChangeHandler={StreetHandler}
              value={addAddressFormik.values.street}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { md: "row", xs: "column" },

                alignItems: { md: "flex-end", xs: "center" },
                width: { md: "60%", xs: "100%" },
                justifyContent: { md: "flex-start", xs: "center" },
                gap: { md: "25px", xs: "10px" },
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: theme.palette.primary.main,
                  border: `1px solid ${theme.palette.primary.main}`,
                  width: "161px",
                  height: "48px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() => setOpen(false)}
              >
                {t("Cancel")}
              </Typography>
              <Button
                style={{
                  backgroundColor: "#329CD7",
                  width: "227px",
                  height: "48px",
                }}
                // disabled={loading}
                className="bg-[#329CD7]"
                fullWidth
                sx={{
                  color: "white",
                  mt: "20px",
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: (theme: any) =>
                      alpha(theme.palette.primary.main, 0.9),
                  },
                }}
                variant="contained"
                type="submit"
              >
                {/* {loading ? (
                  <CircularProgress
                    sx={{ color: "white", fontSize: "10px" }}
                    size={size}
                  />
                ) : ( */}
                {t("Save New Address")}
                {/* )} */}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
};
export default AddressForm;
