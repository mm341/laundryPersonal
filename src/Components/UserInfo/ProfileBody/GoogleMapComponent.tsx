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
  CircularProgress,
  Skeleton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { locationInterface } from "./AddressForm";
import { CustomStackFullWidth } from "@/styles/PublicStyles";

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

  height,
  markerIcon,
}: props) => {
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
console.log(isMounted)
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

  return isLoaded ? (
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
      //  yesIWantToUseGoogleMapApiInternals
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
      <img loading="lazy" alt="icon" src={markerIcon?.src} />
      <Marker
        position={{ lat: location.lat, lng: location.lng }} // Set the marker position
        icon={{
          url: markerIcon?.src, // Replace with the path to your custom marker icon
          scaledSize: new window.google.maps.Size(30, 30), // Set the size of the icon
        }}
      />

      {isMounted ? (
        <Marker
          position={{ lat: location.lat, lng: location.lng }}
          icon={{
            url: markerIcon?.src,
            scale: 7,
          }}
        ></Marker>
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
  ) : (
    <CustomStackFullWidth
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "400px",
        [theme.breakpoints.down("sm")]: {
          minHeight: "250px",
        },
      }}
    >
      <Skeleton
        width="100%"
        height="100%"
        variant="rectangular"
        animation="wave"
      />
    </CustomStackFullWidth>
  );
};

export default GoogleMapComponent;
