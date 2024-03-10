import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
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
import { useAppDispatch, useAppSelector } from "@/redux/store";
import homeSelectIcon from "../../../../public/info/addresseTitleIcon.svg";
import officeSelectIcon from "../../../../public/info/officeSelectIcon.svg";
import OthersSelectIcon from "../../../../public/info/addresse.svg";
import { AddresseType } from "@/interfaces/AddresseTypeInterface";
import GlobalAddresseType from "@/Components/GlobalComponent/GlobalAddresseType";
import { GlobalDisplayFlexBox } from "@/styles/PublicStyles";
import markerIcon from "../../../../public/info/markerIcon.svg";
import GoogleMapComponent from "./GoogleMapComponent";

import ValidationSchemaForAddAddress from "./ValidationSchemaForAddAddress";
import { AddresseInterface } from "@/interfaces/AddresseInterface";
import {
  AddAddresse,
  UpdateAddresse,
  addAddressePayload,
} from "@/redux/slices/AddressesRequests";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { GoogleApi } from "@/React-Query/googleApi";
import CustomMapSearch from "./CustomMapSearch";
import { useGeolocated } from "react-geolocated";
export interface locationInterface {
  lat: number;
  lng: number;
}

const AddressForm = ({
  setOpen,
  addresse,
  refetch,
}: {
  setOpen: (e: boolean) => void;
  addresse: AddresseInterface | undefined;
  refetch: () => void;
}) => {
  //  hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { locale } = useRouter();
  const [addresseType, setAddresseType] = useState<string>(
    addresse?.address_name ?? "home"
  );
  //  master data
  const { master } = useAppSelector((state) => state.master);

  const { t } = useTranslation();

  //   handel google map componenet
  // /////////////////////////////////////////////////

  const [location, setLocation] = useState<locationInterface>({
    lat: 0.0459734,
    lng: 31.3477784,
  });
  //  function get current location
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 1000,
      // isGeolocationEnabled: true,
    });
  useEffect(() => {
    if (coords && !addresse?.latitude && !addresse?.longitude) {
      setLocation({
        lat: coords?.latitude,
        lng: coords?.longitude,
      });
    } else if (!coords?.latitude && !addresse?.latitude) {
      setLocation({
        lat: 30.0459734,
        lng: 31.3477784,
      });
    }
  }, [coords, addresse?.latitude, addresse?.longitude]);

  const [placeDetailsEnabled, setPlaceDetailsEnabled] =
    useState<boolean>(false);
  const [locationEnabled, setLocationEnabled] = useState<boolean>(false);
  const [addresseNow, setAddresseNow] = useState<string>(
    addresse?.address_location ?? ""
  );
  const { isLoadingAddAddresse } = useAppSelector((state) => state.addresse);
  const [isDisablePickButton, setDisablePickButton] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState({ description: "" });
  const [enabled, setEnabled] = useState(false);
  const [placeDescription, setPlaceDescription] = useState<any>(undefined);
  const [predictions, setPredictions] = useState([]);
  const [placeId, setPlaceId] = useState("");

  //  get places from api
  const { data: places, isLoading: isLoadingPlacesApi } = useQuery(
    ["places", searchKey.description],
    async () => GoogleApi.placeApiAutocomplete(searchKey.description)
  );

  const {
    isLoading: isLoading2,
    data: placeDetails,
    isError: isErrorTwo,
    error: errorTwo,
    refetch: placeApiRefetchOne,
  } = useQuery(["placeDetails", placeId], async () =>
    GoogleApi.placeApiDetails(placeId)
  );

  useEffect(() => {
    if (placeDetails) {
      setLocation(placeDetails?.data?.result?.geometry?.location);
      setAddresseNow(placeDetails?.data?.result.formatted_address);
      setLocationEnabled(true);
    }
  }, [placeDetails]);
  useEffect(() => {
    if (places) {
      setPredictions(places?.data?.predictions);
    }
  }, [places]);

  //  select Addresse Type
  const typeData: AddresseType[] = [
    {
      label: t("Home"),
      value: "home",
      img: homeSelectIcon,
    },
    {
      label: t("Office"),
      value: "office",
      img: officeSelectIcon,
    },
    {
      label: t("Others"),
      value: "others",
      img: OthersSelectIcon,
    },
  ];

  useEffect(() => {
    if (addresse?.address_name) {
      setAddresseType(addresse?.address_name);
    } else {
      setAddresseType("home");
    }
  }, [addresse?.address_name]);

  //  handel current location with api from google map

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
    if (
      coords?.latitude &&
      coords?.longitude &&
      !addresse?.latitude &&
      !addresse?.longitude
    ) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords?.latitude},${coords?.longitude}&key=AIzaSyCP79UJhaH4Gx2odCILeJ5qhT2H9uVqRBg`
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
    coords?.latitude,
    coords?.longitude,
    // currentLocation?.lat,
    // currentLocation?.lng,
    addresse?.latitude,
    addresse?.longitude,
  ]);

  //  validation of add addresse form
  const addAddressFormik = useFormik({
    initialValues: {
      address_type: "",
      address_location: addresse?.address_location ?? "",
      // area: addresse?.area ?? "",
      building_no: addresse?.building_no ?? "",
      floor_no: addresse?.floor_no ?? "",
      apartment_no: addresse?.apartment_no ?? "",
      street: addresse?.street ?? "",
    },
    validationSchema: ValidationSchemaForAddAddress(),
    onSubmit: async (values) => {
      try {
        let newData: addAddressePayload = {
          latitude: location?.lat,
          longitude: location?.lng,
          building_no: values.building_no,
          floor_no: values.floor_no,
          apartment_no: values.apartment_no,
          street: values.street,
          address_name: values?.address_type,
          id: addresse?.id,
          address_location: addresseNow,
        };
        // formSubmitOnSuccess(newData)

        if (addresse?.id) {
          dispatch(UpdateAddresse(newData)).then((res: any) => {
            if (res?.payload?.data?.addresses?.length > 0) {
              refetch();

              setOpen(false);
            }
          });
        } else {
          dispatch(AddAddresse(newData)).then((res: any) => {
            if (res?.payload?.data?.addresses?.length > 0) {
              refetch();

              setOpen(false);
            }
          });
        }
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
    addAddressFormik.setFieldValue("building_no", value);
  };
  const floorHandler = (value: string) => {
    addAddressFormik.setFieldValue("floor_no", value);
  };
  const appartmentHandler = (value: string) => {
    addAddressFormik.setFieldValue("apartment_no", value);
  };

  useEffect(() => {
    if (addresseType) {
      addAddressFormik.setFieldValue("address_type", addresseType);
    }
  }, [addresseType]);

  useEffect(() => {
    if (addresse?.latitude && addresse?.longitude) {
      setLocation({
        lat: addresse?.latitude,
        lng: addresse?.longitude,
      });
    } 
  }, [addresse?.latitude, addresse?.longitude]);

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

          <Grid item xs={12}>
            <Stack spacing={1}>
              <CustomMapSearch
                setSearchKey={setSearchKey}
                setEnabled={setEnabled}
                predictions={predictions}
                setPlaceId={setPlaceId}
                setPlaceDetailsEnabled={setPlaceDetailsEnabled}
                setPlaceDescription={setPlaceDescription}
                searchKey={searchKey}
                isLoadingPlacesApi={isLoadingPlacesApi}
              />
              <GoogleMapComponent
                addresse={addresse}
                // currentLocation={currentLocation}
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
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextFieldWithFormik
              disabled={isLoadingAddAddresse}
              type="text"
              label={t("Apartment")}
              touched={addAddressFormik.touched.apartment_no}
              errors={addAddressFormik.errors.apartment_no}
              fieldProps={addAddressFormik.getFieldProps("apartment_no")}
              onChangeHandler={appartmentHandler}
              value={addAddressFormik.values.apartment_no}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextFieldWithFormik
              disabled={isLoadingAddAddresse}
              type="text"
              label={t("Building")}
              touched={addAddressFormik.touched.building_no}
              errors={addAddressFormik.errors.building_no}
              fieldProps={addAddressFormik.getFieldProps("building_no")}
              onChangeHandler={BuildingHandler}
              value={addAddressFormik.values.building_no}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextFieldWithFormik
              disabled={isLoadingAddAddresse}
              type="text"
              label={t("Floor")}
              touched={addAddressFormik.touched.floor_no}
              errors={addAddressFormik.errors.floor_no}
              fieldProps={addAddressFormik.getFieldProps("floor_no")}
              onChangeHandler={floorHandler}
              value={addAddressFormik.values.floor_no}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextFieldWithFormik
              disabled={isLoadingAddAddresse}
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
                disabled={isLoadingAddAddresse}
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
                {isLoadingAddAddresse ? (
                  <CircularProgress
                    sx={{ color: "white", fontSize: "10px" }}
                    size={25}
                  />
                ) : (
                  t("Save New Address")
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
};
export default AddressForm;
