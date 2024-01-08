import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  GoogleMap,
  useJsApiLoader,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import {
  Box,
  CircularProgress,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { locationInterface } from "./AddressForm";
import { CustomStackFullWidth } from "@/styles/PublicStyles";
import { useTranslation } from "react-i18next";

interface map {
  center: {
    lat: number;
    lng: number;
  };
}
interface props {
  setDisablePickButton: (e: boolean) => void;
  setLocationEnabled: (e: boolean) => void;
  setLocation: (e: locationInterface) => void;

  location: locationInterface;
  setPlaceDetailsEnabled: (e: boolean) => void;
  placeDetailsEnabled: boolean;
  addresseNow?: string;
  height: string;

  markerIcon: { src: string };
}
const GoogleMapComponent = ({
  setDisablePickButton,
  setLocationEnabled,
  setLocation,
  location,
  setPlaceDetailsEnabled,
  placeDetailsEnabled,
  addresseNow,
  height,
  markerIcon,
}: props) => {
  //  hooks

  const { t } = useTranslation();
  const theme = useTheme();

  const containerStyle = {
    width: "100%",
    height: height,
  };

  const options = useMemo(
    () => ({
      zoomControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    }),
    []
  );
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCP79UJhaH4Gx2odCILeJ5qhT2H9uVqRBg",
  });
  const [isMounted, setIsMounted] = useState(false);
  const [openInfoWindow, setOpenInfoWindow] = useState(false);
  const [mapSetup, setMapSetup] = useState(false);

  const center = useMemo(
    () => ({
      lat: location?.lat,
      lng: location?.lng,
    }),
    [location?.lat, location?.lng]
  );

  const [map, setMap] = useState<any>({});
  const [zoom, setZoom] = useState<number>(10);
  const [centerPosition, setCenterPosition] = useState(center);

  const onLoad = useCallback(function callback(map: any) {
    setZoom(12);
    setMap(map);
  }, []);

  useEffect(() => {
    if (location && placeDetailsEnabled) {
      setCenterPosition(location);
    }
    if (map?.center && mapSetup && map.center.lat && map.center.lng) {
      setCenterPosition({
        lat: map.center.lat(),
        lng: map.center.lng(),
      });
    }

    setIsMounted(true);
  }, [map, mapSetup, placeDetailsEnabled, location]);

  useEffect(() => {
    if (map?.center && map.center.lat && map.center.lng) {
      setIsMounted(true);
    }
  }, [map]);
  const onUnmount = useCallback(function callback() {
    setMap(null);
    // setMapSetup(false)
  }, []);
  let locationLoading: boolean = false;
  return isLoaded ? (
    <Stack direction={"column"}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerPosition}
        onLoad={onLoad}
        zoom={zoom}
        onUnmount={onUnmount}
        onMouseDown={(e) => {
          setMapSetup(true);
          setDisablePickButton(true);

          // setPlaceDetailsEnabled(false)
        }}
        onMouseUp={(e) => {
          setMapSetup(false);
          setDisablePickButton(false);
          setLocationEnabled(true);
          setLocation({
            lat: map.center.lat(),
            lng: map.center.lng(),
          });
          setCenterPosition({
            lat: map.center.lat(),
            lng: map.center.lng(),
          });
          setPlaceDetailsEnabled(false);
        }}
        onZoomChanged={() => {
          // setMapSetup(true)
          if (map && map.center && map.center.lat && map.center.lng) {
            setLocationEnabled(true);
            setLocation({
              lat: map.center.lat(),
              lng: map.center.lng(),
            });
            setCenterPosition({
              lat: map.center.lat(),
              lng: map.center.lng(),
            });
            // setPlaceDetailsEnabled(false)
          }
        }}
        options={options}
      >
        {!locationLoading ? (
          <Stack
            style={{
              zIndex: 3,
              position: "absolute",
              marginTop: -63,
              marginLeft: -32,
              left: "50%",
              top: "50%",
            }}
          >
            {/* <MapMarker width="60px" height="70px" /> */}
            <img loading="lazy" alt="icon" src={markerIcon?.src} />
          </Stack>
        ) : (
          <Stack
            alignItems="center"
            style={{
              zIndex: 3,
              position: "absolute",
              marginTop: -37,
              marginLeft: -11,
              left: "50%",
              top: "50%",
            }}
          >
            <CircularProgress />
          </Stack>
        )}
      </GoogleMap>
      <Box
        sx={{
          boxShadow: "0px 4px 9px 0px #00000012",
          p: "10px",
          display: "flex",
          flexDirection:{md:"row",xs:"column"},
          alignItems: {md:"center",xs:"flex-start"},
          gap: "4px",
        }}
      >
        <img
          style={{ width: "15px", height: "20px" }}
          loading="lazy"
          alt="icon"
          src={markerIcon?.src}
        />
        <Typography sx={{ color: theme.palette.secondary.contrastText,fontSize:"14px",fontWeight:"500" }}>{t("Deliver to :")}</Typography>
        <Typography sx={{ color: theme.palette.secondary.contrastText,fontSize:"14px",fontWeight:"400" }}>
          {addresseNow}
        </Typography>
      </Box>
    </Stack>
  ) : (
    <CustomStackFullWidth
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "400px",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
          minHeight: "250px",
        },
      }}
    >
      <CircularProgress />
    </CustomStackFullWidth>
  );
};

export default GoogleMapComponent;
