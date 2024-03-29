import PublicContainer from "@/Components/PublicContainer";
import {
  CustomPaperBigCard,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
  PreferableTimeInput,
} from "@/styles/PublicStyles";
import {
  Box,
  CssBaseline,
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import ChekOutTitle from "@/Components/GlobalComponent/ChekOutTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { AddresseInterface } from "@/interfaces/AddresseInterface";
import AddNewAddress from "@/Components/UserInfo/ProfileBody/AddNewAddress";
import PaymentMethods from "@/Components/ChekoutPage/PaymentMethods";
import SummaryCheckout from "@/Components/ChekoutPage/SummaryCheckout";
import dayjs from "dayjs";
import CommonUtil from "@/utils/common";
import {
  AddOrder,
  GetDeliveryDuration,
  GetPickUpDuration,
  clearDeliverySchedules,
  clearSchedules,
} from "@/redux/slices/OrderSlice";
import timeIcon from "../../../public/CheckOut/timeIcon.svg";
import dateIcon from "../../../public/CheckOut/dateIcon.svg";
import CheckOutProductsSection from "@/Components/ChekoutPage/CheckOutProdcuctsSection";
import Meta from "@/Components/GlobalComponent/Meta";
import { toast } from "react-hot-toast";
import AuthGuard from "@/Components/authentication/AuthGuard";
import { useQuery } from "react-query";
import { Addresse } from "@/React-Query/addresses";
import PublicHandelingErrors from "@/utils/PublicHandelingErrors";
import MainApi from "@/api/MainApi";
import { HomeServices } from "@/interfaces/HomeServices";
import { HomeAreas } from "@/interfaces/HomeAreas";
import { Master } from "@/interfaces/MasterInterface";
import { FooterSocialLinks } from "@/interfaces/FooterSocialLinks";
import { CashAreas, CashServices } from "@/redux/slices/Services";
import { CashFooterLinks, CashMasterData } from "@/redux/slices/MasterSlice";
import { GetCartDetails } from "@/redux/slices/CartSlice";
import AuthAndCartListGuard from "@/Components/authentication/CartListGuard";
import HandelNotification from "@/Components/GlobalComponent/HandelNotification";
import { Url } from "next/dist/shared/lib/router/router";
import CouponSection from "@/Components/Cart/CouponSection";
const CheckOutPage = ({
  homeServices,
  homeAreas,
  masterData,
  footerSocialLinks,
}: {
  homeServices: HomeServices[];
  homeAreas: HomeAreas[];
  masterData: Master;
  footerSocialLinks: FooterSocialLinks[];
}) => {
  //  hooks
  const router = useRouter();
  const { t } = useTranslation();

  const theme = useTheme();
  const dispatch: any = useAppDispatch();
  const { push, locale, pathname, query, asPath } = useRouter();
  const [pickupDate, setPickupData] = useState<string>("");

  const [addtionalInformation, setAdditionalInformation] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [deliveryHour, setDeliveryHour] = useState<string>("");
  const { schedules, deliverySchedules } = useAppSelector(
    (state) => state.orders
  );
  const [pickupHour, setPickupHour] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [payment, setPayment] = useState<string>("cash_on_delivery");
  const [onlineMethod, setOnlineMethod] = useState<string>("");
  const [couponValue, setCouponValue] = useState<string>("");
  //  selectors

  const { accountInfo } = useAppSelector((state) => state.profile);

  //  handel initialvalue of scheduals

  useEffect(() => {
    if (schedules?.length > 0) {
      setPickupHour(schedules[0]?.hour);
    } else {
      setPickupHour("");
    }
  }, [schedules]);

  //  handel initialvalue of delivery scheduals

  useEffect(() => {
    if (deliverySchedules?.length > 0) {
      setDeliveryHour(deliverySchedules[0]?.hour);
    } else {
      setDeliveryHour("");
    }
  }, [deliverySchedules]);
  //  default addresse

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

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "& .MuiInputLabel-root": {
      top: "-50px !important",
    },
    "label + &": {
      transform: "translateY(5px)",
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      height: "36px",
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
      },
    },
  }));

  // //  default addresse
  // const defaultAddresse: string = myAddresses?.data?.data?.addresses[0]?.id;
  //  handel initial value of default addresse

  const [addresseValue, setAddressevalue] = useState<string>(
    myAddresses?.data?.data?.addresses[0]?.id
  );

  useEffect(() => {
    setAddressevalue(myAddresses?.data?.data?.addresses[0]?.id);
  }, [myAddresses]);
  useEffect(() => {
    if (pickupDate) {
      dispatch(GetPickUpDuration({ date: pickupDate })).then(
        (promiseResponse: any) => {
          if (promiseResponse) {
            if (promiseResponse?.payload?.data?.schedules?.length === 0) {
              toast.error(t("Service is not available this day"));
            }
          }
        }
      );
    }
  }, [dispatch, pickupDate]);

  useMemo(() => {
    if (deliveryDate && pickupDate) {
      dispatch(
        GetDeliveryDuration({
          deliverydata: deliveryDate,
          PickedDate: pickupDate,
          pickup_time: pickupHour,
        })
      ).then((promiseResponse: any) => {
        if (promiseResponse) {
          if (promiseResponse?.payload?.data?.schedules?.length === 0) {
            toast.error(t("Service is not available this day"));
          }
        }
      });
    }
  }, [deliveryDate, pickupDate, pickupHour]);

  useMemo(() => {
    if (!pickupHour) {
      setDeliveryDate("");
    }
  }, [pickupHour]);

  //  get coupon value from localstorage

  //  get token from localstorage

  let token: string | null | undefined = undefined;

  let coupon: string | undefined | null = undefined;

  if (typeof window !== "undefined") {
    coupon = localStorage.getItem("coupon");
    token = localStorage.getItem("token");
  }
  //  function add order
  const handelAddOrder = () => {
    if (dayjs(deliveryDate) <= dayjs(pickupDate)) {
      toast.error(t("The delivery date must be a date after pick date."));
    } else {
      if (
        deliveryDate &&
        pickupDate &&
        pickupHour &&
        deliveryHour &&
        addresseValue
      ) {
        dispatch(
          AddOrder({
            address_id: addresseValue,
            delivery_date: deliveryDate,
            delivery_hour: deliveryHour,
            pick_date: pickupDate,
            pick_hour: pickupHour,
            instruction: addtionalInformation,
            payment_type: payment,
            coupon: coupon,
          })
        ).then((promiseResponse: any) => {
          if (promiseResponse?.payload?.data?.order?.id) {
            localStorage.setItem("coupon", "");
            localStorage.setItem(
              "orderId",
              promiseResponse?.payload?.data?.order?.id
            );
            router.push("/order");
            dispatch(GetCartDetails({}));
          }
        });
      } else {
        toast.error(t("Enter all required data"));
      }
    }
  };

  useEffect(() => {
    if (dayjs(deliveryDate) <= dayjs(pickupDate)) {
      toast.error(t("The delivery date must be a date after pick date."));
    }
  }, [pickupDate, deliveryDate]);
  //  cash areas
  useEffect(() => {
    dispatch(CashAreas(homeAreas));
  }, [dispatch, homeAreas]);

  //  cash services
  useEffect(() => {
    dispatch(CashServices(homeServices));
  }, [dispatch, homeServices, homeServices?.length]);

  //  cash master
  useEffect(() => {
    dispatch(CashMasterData(masterData));
  }, [dispatch, masterData]);

  //  cash footer Social Media Links
  useEffect(() => {
    dispatch(CashFooterLinks(footerSocialLinks));
  }, [dispatch, footerSocialLinks]);

  //  get old path from localstorage

  let path: null | undefined | string | Url | any = undefined;

  if (typeof window !== "undefined") {
    path = localStorage.getItem("path");
  }

  //  get all CartList

  useEffect(() => {
    dispatch(GetCartDetails({}));
    localStorage.setItem("coupon", "");
  }, []);

  return (
    <>
      <Meta
        title={"CheckOut"}
        // ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
      />
      <CssBaseline />

      <HandelNotification>
        <AuthAndCartListGuard>
          <PublicContainer>
            <CustomPaperBigCard
              sx={{ backgroundColor: theme.palette.primary.dark, my: "5px" }}
            >
              <CustomPaperBigCard sx={{ backgroundColor: "white" }}>
                <Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
                  {/*  left section customer details */}
                  <Grid item md={7.75} xs={12}>
                    <GlobalDisplayFlexColumnBox
                      px={"10px"}
                      width={"100%"}
                      gap={"45px"}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          gap: "10px",
                          alignItems: "center",
                          transform: "translateX(-3px)",
                        }}
                      >
                        {locale === "en" ? (
                          <ArrowBackIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() =>
                              router.push(path, undefined, { locale })
                            }
                            color="primary"
                          />
                        ) : (
                          <ArrowForwardIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() =>
                              router.push(path, undefined, { locale })
                            }
                            color="primary"
                          />
                        )}
                        <Typography>{t("CheckOut")}</Typography>
                      </Box>

                      {/* Personal Info */}
                      <GlobalDisplayFlexColumnBox width={"100%"} gap={"20px"}>
                        <ChekOutTitle title="Personal Info" />

                        <Grid container spacing={3}>
                          {/*  full name */}
                          <Grid item sm={6} xs={12}>
                            <TextField
                              InputProps={{ readOnly: true }}
                              required
                              sx={{ width: "100%" }}
                              value={accountInfo?.first_name}
                              label={t("Full Name")}
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            {/*  phone number */}
                            <TextField
                              dir="ltr"
                              InputProps={{ readOnly: true }}
                              required
                              sx={{ width: "100%" }}
                              value={accountInfo?.mobile}
                              label={t("Phone Number")}
                            />
                          </Grid>
                        </Grid>
                      </GlobalDisplayFlexColumnBox>

                      {/* Pickup Schedule */}
                      <GlobalDisplayFlexColumnBox width={"100%"} gap={"20px"}>
                        <ChekOutTitle title="Pickup Schedule" />

                        <Grid container spacing={3}>
                          <Grid item sm={6} xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                // maxDate={dayjs().add(4, "day")}
                                disablePast
                                label={t("Date")}
                                onChange={(e) => {
                                  setPickupData(CommonUtil.formatDate2(e));
                                }}
                                sx={{ width: "100%" }}
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            {pickupDate && schedules?.length > 0 ? (
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  {t("Time")}
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={pickupHour}
                                  label={t("Time")}
                                  sx={{ width: "100%" }}
                                  onChange={(e) => {
                                    setPickupHour(e.target.value);
                                  }}
                                >
                                  {schedules?.map(
                                    (
                                      e: { hour: string; title: string },
                                      i: number
                                    ) => (
                                      <MenuItem key={i} value={e?.hour}>
                                        {e?.title}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            ) : (
                              <Stack
                                sx={{
                                  width: "100%",
                                  height: "55px",
                                  borderRadius: "6px",
                                  border: "1px solid #999999",
                                  backgroundColor: "#ECEFF1",
                                  color: "#999999",
                                }}
                                alignItems={"center"}
                                px={"12px"}
                                direction={"row"}
                                gap={"10px"}
                              >
                                <img
                                  src={timeIcon?.src}
                                  loading="lazy"
                                  alt="img"
                                />
                                {t("Time")}
                              </Stack>
                            )}
                          </Grid>
                        </Grid>
                      </GlobalDisplayFlexColumnBox>

                      {/* Delivery Schedule */}
                      <GlobalDisplayFlexColumnBox width={"100%"} gap={"20px"}>
                        <ChekOutTitle title="Delivery Schedule" />

                        <Grid container spacing={3}>
                          <Grid item sm={6} xs={12}>
                            {pickupHour && pickupDate ? (
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  minDate={dayjs(pickupDate).add(1, "day")}
                                  onChange={(e) => {
                                    setDeliveryDate(CommonUtil.formatDate2(e));
                                  }}
                                  disablePast
                                  label={t("Date")}
                                  sx={{ width: "100%" }}
                                />
                              </LocalizationProvider>
                            ) : (
                              <Stack
                                sx={{
                                  width: "100%",
                                  height: "55px",
                                  borderRadius: "6px",
                                  border: "1px solid #999999",
                                  backgroundColor: "#ECEFF1",
                                  color: "#999999",
                                }}
                                gap={"10px"}
                                alignItems={"center"}
                                px={"12px"}
                                direction={"row"}
                              >
                                <img
                                  src={dateIcon?.src}
                                  loading="lazy"
                                  alt="img"
                                />
                                {t("Date")}
                              </Stack>
                            )}
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            {deliveryDate &&
                            pickupHour &&
                            deliverySchedules?.length > 0 ? (
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  {t("Time")}
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={deliveryHour}
                                  label={t("Time")}
                                  sx={{ width: "100%" }}
                                  onChange={(e) => {
                                    setDeliveryHour(e.target.value);
                                  }}
                                >
                                  {deliverySchedules?.map(
                                    (
                                      e: { hour: string; title: string },
                                      i: number
                                    ) => (
                                      <MenuItem key={i} value={e?.hour}>
                                        {e?.title}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            ) : (
                              <Stack
                                sx={{
                                  width: "100%",
                                  height: "55px",
                                  borderRadius: "6px",
                                  border: "1px solid #999999",
                                  backgroundColor: "#ECEFF1",
                                  color: "#999999",
                                }}
                                alignItems={"center"}
                                px={"12px"}
                                direction={"row"}
                                gap={"10px"}
                              >
                                <img
                                  src={timeIcon?.src}
                                  loading="lazy"
                                  alt="img"
                                />
                                {t("Time")}
                              </Stack>
                            )}
                          </Grid>
                        </Grid>
                      </GlobalDisplayFlexColumnBox>

                      {/*  delivery addresse */}
                      <GlobalDisplayFlexColumnBox width={"100%"} gap={"20px"}>
                        <GlobalDisplayFlexBox>
                          <ChekOutTitle title="Deliver To" />
                          {myAddresses?.data?.data?.addresses?.length > 0 && (
                            <Box
                              onClick={() => setOpen(true)}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                border: `1px solid ${theme.palette.primary.main}`,
                                backgroundColor: theme.palette.primary.main,
                                color: "white",
                                width: "156px",
                                height: "38px",
                                borderRadius: "4px",
                                gap: "5px",
                                cursor: "pointer",
                              }}
                            >
                              <Typography>{t("Add New Address")}</Typography>
                            </Box>
                          )}
                        </GlobalDisplayFlexBox>

                        {myAddresses?.data?.data?.addresses?.length > 0 && (
                          <FormControl fullWidth>
                            <NativeSelect
                              size="medium"
                              sx={{ height: "48px" }}
                              fullWidth
                              required
                              id="demo-customized-select-native"
                              value={addresseValue}
                              // label="Select"
                              onChange={(e) => setAddressevalue(e.target.value)}
                              input={<BootstrapInput />}
                            >
                              {myAddresses?.data?.data?.addresses?.map(
                                (addresse: AddresseInterface, i: number) => {
                                  if (addresse?.street?.length > 30) {
                                    return (
                                      <option
                                        style={{
                                          marginTop: "2px",
                                          marginBottom: "2px",
                                        }}
                                        key={i}
                                        value={addresse?.id}
                                      >
                                        {locale === "en"
                                          ? ` ${t(
                                              addresse?.address_name
                                            )} ${addresse?.street?.slice(
                                              0,
                                              30
                                            )}... ${t("Street")}
                                    ${addresse?.apartment_no} ${t("Apartment")},
                                      ${addresse?.building_no} ${t("Building")},
                                          ${addresse?.floor_no} ${t("Floor")}`
                                          : ` ${t(addresse?.address_name)}
                                          
                                          ${t("Street")}

                                          ${addresse?.street?.slice(0, 30)}... 
                                          ${t("Apartment")}  ${
                                              addresse?.apartment_no
                                            } ,
                                          ${t("Building")}      ${
                                              addresse?.building_no
                                            } ,
                                          ${t("Floor")}   ${
                                              addresse?.floor_no
                                            } `}
                                      </option>
                                    );
                                  } else {
                                    return (
                                      <option
                                        style={{
                                          marginTop: "2px",
                                          marginBottom: "2px",
                                        }}
                                        key={i}
                                        value={addresse?.id}
                                      >
                                        {locale === "en"
                                          ? ` ${t(addresse?.address_name)} ${
                                              addresse?.street
                                            } ${t("Street")}
                                    ${addresse?.apartment_no} ${t("Apartment")},
                                      ${addresse?.building_no} ${t("Building")},
                                          ${addresse?.floor_no} ${t("Floor")}`
                                          : ` ${t(addresse?.address_name)}
                                          
                                          ${t("Street")}

                                          ${addresse?.street} 
                                          ${t("Apartment")}  ${
                                              addresse?.apartment_no
                                            } ,
                                          ${t("Building")}      ${
                                              addresse?.building_no
                                            } ,
                                          ${t("Floor")}   ${
                                              addresse?.floor_no
                                            } `}
                                      </option>
                                    );
                                  }
                                }
                              )}
                            </NativeSelect>
                          </FormControl>
                        )}

                        {myAddresses?.data?.data?.addresses?.length === 0 && (
                          <Box
                            onClick={() => setOpen(true)}
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              width: "100%",
                              height: "48px",
                              border: `1px solid #999999`,
                              px: "30px",
                              fontSize: "16px",
                              fontWeight: "400",
                              alignItems: "center",
                              borderRadius: "4px",
                              color: theme.palette.secondary.contrastText,
                              cursor: "pointer",
                            }}
                          >
                            {t("Add New Address")}
                          </Box>
                        )}
                      </GlobalDisplayFlexColumnBox>

                      {/* { Additional Instruction} */}
                      <GlobalDisplayFlexColumnBox width={"100%"} gap={"20px"}>
                        <ChekOutTitle title="Additional Instruction" />

                        <TextField
                          minRows={2}
                          multiline
                          sx={{ width: "100%" }}
                          value={addtionalInformation}
                          onChange={(e) =>
                            setAdditionalInformation(e.target.value)
                          }
                          placeholder={t("For e.g. Call before delivery")}
                        />
                      </GlobalDisplayFlexColumnBox>
                      {/*  coupon section */}
                      <GlobalDisplayFlexColumnBox width={"100%"} gap={"20px"}>
                        <ChekOutTitle title="Coupon" />
                        <CouponSection
                          token={token}
                          couponValue={couponValue}
                          setCouponValue={setCouponValue}
                        />
                      </GlobalDisplayFlexColumnBox>
                      {/* { payment methods} */}
                      <GlobalDisplayFlexColumnBox width={"100%"} gap={"20px"}>
                        <ChekOutTitle title="Payment Method" />

                        <PaymentMethods
                          onlineMethod={onlineMethod}
                          setOnlineMethod={setOnlineMethod}
                          setPayment={setPayment}
                          payment={payment}
                        />
                      </GlobalDisplayFlexColumnBox>

                      {/* Summary Checkout */}
                      <GlobalDisplayFlexColumnBox width={"100%"} gap={"20px"}>
                        <ChekOutTitle title="Summary" />
                        <Box
                          sx={{
                            width: { md: "50%", xs: "100%" },
                            border: "1px solid ",
                            p: "15px",
                            borderRadius: "4px",
                          }}
                        >
                          <SummaryCheckout />
                        </Box>
                      </GlobalDisplayFlexColumnBox>
                    </GlobalDisplayFlexColumnBox>
                  </Grid>

                  {/*  right section products */}
                  <Grid
                    item
                    md={4.25}
                    xs={12}
                    sx={{ position: "sticky", top: "0px" }}
                  >
                    <CheckOutProductsSection
                      handelAddOrder={handelAddOrder}
                      checkOut
                    />
                  </Grid>
                </Grid>
              </CustomPaperBigCard>
            </CustomPaperBigCard>
          </PublicContainer>
        </AuthAndCartListGuard>
      </HandelNotification>
      {/*  add addresse Dialog */}

      <AddNewAddress
        checkout
        refetch={refetch}
        open={open}
        setOpen={setOpen}
        color={"white"}
      />
    </>
  );
};

export default CheckOutPage;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  let homeServices = [];
  let homeAreas = [];
  let masterData = {};
  let footerSocialLinks = [];
  try {
    const configRes = await MainApi.get("services", {
      headers: {
        "Accept-Language": locale,
        locale: locale,
      },
    });
    homeServices = configRes?.data?.data?.services;
  } catch (e) {
    homeServices = [];
  }
  //  areas
  try {
    const Res = await MainApi.get("areas", {
      headers: {
        "Accept-Language": locale,
        locale: locale,
      },
    });

    homeAreas = Res?.data?.data?.areas;
  } catch (e) {
    homeAreas = [];
  }
  //  masterData
  try {
    const configRes = await MainApi.get("master", {
      headers: {
        "Accept-Language": locale,
        locale: locale,
      },
    });
    masterData = configRes?.data?.data;
  } catch (e) {
    masterData = {};
  }

  //  footerSocialLinks
  try {
    const configRes = await MainApi.get("social-link", {
      headers: {
        "Accept-Language": locale,
        locale: locale,
      },
    });
    footerSocialLinks = configRes?.data?.data?.socialLink;
  } catch (e) {
    footerSocialLinks = [];
  }

  return {
    props: {
      homeServices,
      homeAreas,
      masterData,
      footerSocialLinks,
    },
  };
};
