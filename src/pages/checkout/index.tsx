import PublicContainer from "@/Components/PublicContainer";
import {
  CustomPaperBigCard,
  GlobalDisplayFlexColumnBox,
  PreferableTimeInput,
} from "@/styles/PublicStyles";
import {
  Box,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
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
import { GetAllAdddressses } from "@/redux/slices/AddressesRequests";
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
} from "@/redux/slices/OrderSlice";
import timeIcon from "../../../public/CheckOut/timeIcon.svg";
import dateIcon from "../../../public/CheckOut/dateIcon.svg";
import CheckOutProductsSection from "@/Components/ChekoutPage/CheckOutProdcuctsSection";
import Meta from "@/Components/GlobalComponent/Meta";
import { toast } from "react-hot-toast";
const CheckOutPage = () => {
  //  hooks
  const router = useRouter();
  const { t } = useTranslation();
  const { locale } = useRouter();
  const theme = useTheme();
  const dispatch: any = useAppDispatch();
  const [addresseValue, setAddressevalue] = useState<any>(0);
  const [pickupDate, setPickupData] = useState<string>("");
  const { accountInfo } = useAppSelector((state) => state.profile);
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [addtionalInformation, setAdditionalInformation] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [deliveryHour, setDeliveryHour] = useState<string>("");
  const [pickupHour, setPickupHour] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [payment, setPayment] = useState<string>("cash");
  const { myAddresses } = useAppSelector((state) => state.addresse);
  const { schedules, deliverySchedules } = useAppSelector(
    (state) => state.orders
  );

  useEffect(() => {
    if (accountInfo?.first_name && accountInfo?.mobile) {
      setFullName(accountInfo?.first_name);
      setPhoneNumber(accountInfo?.mobile);
    }
  }, [accountInfo?.first_name, accountInfo?.mobile]);
  useEffect(() => {
    if (myAddresses?.length > 0) {
      setAddressevalue(myAddresses[0]?.id);
    }
  }, [myAddresses]);
  useEffect(() => {
    dispatch(GetAllAdddressses());
  }, [dispatch]);

  useEffect(() => {
    if (pickupDate) {
      dispatch(GetPickUpDuration({ date: pickupDate }));
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
      );
    }
  }, [deliveryDate, pickupDate, dispatch, pickupHour]);

  //  function add order

  const handelAddOrder = () => {
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
          products: [],
        })
      );
    } else {
      toast.error(t("Enter all required data"));
    }
  };

  return (
    <>
      <Meta
        title={"CheckOut"}
        // ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
      />
      <PublicContainer>
        <CustomPaperBigCard
          sx={{ backgroundColor: theme.palette.primary.dark }}
        >
          <CustomPaperBigCard sx={{ backgroundColor: "white" }}>
            <Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
              {/*  left section customer details */}
              <Grid item md={8} xs={12}>
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
                        onClick={() => router.back()}
                        color="primary"
                      />
                    ) : (
                      <ArrowForwardIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => router.back()}
                        color="primary"
                      />
                    )}
                    <Typography>{t("CheckOut")}</Typography>
                  </Box>

                  {/* Personal Info */}
                  <GlobalDisplayFlexColumnBox width={"100%"} gap={"20px"}>
                    <ChekOutTitle title="Personal Info" />

                    <Grid container spacing={3}>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          required
                          sx={{ width: "100%" }}
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          label={t("Full Name")}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          required
                          sx={{ width: "100%" }}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
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
                            maxDate={dayjs().add(4, "day")}
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
                        {pickupDate ? (
                          <PreferableTimeInput
                            disablePortal
                            id="combo-box-demo"
                            sx={{ width: "100%" }}
                            options={schedules}
                            getOptionLabel={(option: any) => option?.title}
                            onChange={(e, option: any) => {
                              setPickupHour(option?.hour);
                            }}
                            renderInput={(params) => (
                              <TextField {...params} label={t("Time")} />
                            )}
                          />
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
                            <img src={timeIcon?.src} loading="lazy" alt="img" />
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
                        {pickupHour ? (
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
                            <img src={dateIcon?.src} loading="lazy" alt="img" />
                            {t("Date")}
                          </Stack>
                        )}
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        {deliveryDate ? (
                          <PreferableTimeInput
                            disablePortal
                            id="combo-box-demo"
                            sx={{ width: "100%" }}
                            options={deliverySchedules}
                            getOptionLabel={(option: any) => option?.title}
                            onChange={(e, option: any) => {
                              setDeliveryHour(option?.hour);
                            }}
                            renderInput={(params) => (
                              <TextField {...params} label={t("Time")} />
                            )}
                          />
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
                            <img src={timeIcon?.src} loading="lazy" alt="img" />
                            {t("Time")}
                          </Stack>
                        )}
                      </Grid>
                    </Grid>
                  </GlobalDisplayFlexColumnBox>

                  {/*  delivery addresse */}
                  <GlobalDisplayFlexColumnBox width={"100%"} gap={"20px"}>
                    <ChekOutTitle title="Deliver To" />

                    {myAddresses?.length > 0 && (
                      <Select
                        required
                        sx={{ width: "100%" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        value={addresseValue}
                        onChange={(e) => setAddressevalue(e.target.value)}
                      >
                        {myAddresses?.map(
                          (addresse: AddresseInterface, i: number) => (
                            <MenuItem key={i} value={addresse?.id}>
                              {` ${addresse?.address_name} ${addresse?.area} area ${addresse?.house_no}
                        Apartment, ${addresse?.flat_no} Floor,
                        ${addresse?.block} Building`}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    )}

                    {myAddresses?.length === 0 && (
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
                      onChange={(e) => setAdditionalInformation(e.target.value)}
                      placeholder={t("For e.g. Call before delivery")}
                    />
                  </GlobalDisplayFlexColumnBox>
                  {/* { payment methods} */}
                  <GlobalDisplayFlexColumnBox width={"100%"} gap={"20px"}>
                    <ChekOutTitle title="Payment Method" />

                    <PaymentMethods setPayment={setPayment} payment={payment} />
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
              <Grid item md={4} xs={12}>
                <CheckOutProductsSection
                  handelAddOrder={handelAddOrder}
                  checkOut
                />
              </Grid>
            </Grid>
          </CustomPaperBigCard>
        </CustomPaperBigCard>
      </PublicContainer>

      {/*  add addresse Dialog */}
      <AddNewAddress open={open} setOpen={setOpen} color={"white"} />
    </>
  );
};

export default CheckOutPage;
