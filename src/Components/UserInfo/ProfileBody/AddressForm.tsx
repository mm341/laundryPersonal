import React, { useEffect } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import LoadingButton from "@mui/lab/LoadingButton";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useTheme } from "@mui/material/styles";
import CustomTextFieldWithFormik from "@/Components/GlobalComponent/form-fields/CustomTextFieldWithFormik";
const AddressForm = ({
  // deliveryAddress,
  // formSubmit,
  // isLoading,
  setOpen,
}: // item,
{
  setOpen: (e: boolean) => void;
}) => {
  const { t } = useTranslation();
  // const typeData = [
  //     {
  //         label: t('Home'),
  //         value: 'home',
  //     },
  //     {
  //         label: t('Office'),
  //         value: 'Office',
  //     },
  //     {
  //         label: t('Others'),
  //         value: 'Others',
  //     },
  // ]

  // const addAddressFormik = useFormik({
  //     initialValues: {
  //         address: '',
  //         address_type: item?.address_type ?? '',
  //         address_label: '',
  //         Building: item?.house ?? 0,
  //         floor: item?.floor ?? 0,
  //         apartment: item?.apartment ?? 0,
  //     },
  //     validationSchema: ValidationSchemaForAddAddress(),
  //     onSubmit: async (values, helpers, errors) => {
  //         try {
  //             let newData = {
  //                 latitude: lat,
  //                 longitude: lng,
  //                 address: values.address,
  //                 house: values.Building,
  //                 floor: values.floor,
  //                 apartment: values.apartment,
  //                 address_type:
  //                     values.address_label !== ''
  //                         ? values.address_label
  //                         : values.address_type,
  //                 id: item?.id,
  //             }
  //             formSubmitOnSuccess(newData)
  //         } catch (err) {}
  //     },
  // })
  // const formSubmitOnSuccess = (values) => {
  //     formSubmit(values)
  // }

  // const addressTypeHandler = (value) => {
  //     addAddressFormik.setFieldValue('address_type', value)
  // }
  // const addressLabelHandler = (value) => {
  //     addAddressFormik.setFieldValue('address_label', value)
  // }

  // const houseHandler = (value) => {
  //     addAddressFormik.setFieldValue('Building', value)
  // }
  // const floorHandler = (value) => {
  //     addAddressFormik.setFieldValue('floor', value)
  // }
  // const appartmentHandler = (value) => {
  //     addAddressFormik.setFieldValue('apartment', value)
  // }
  // useEffect(() => {
  //     addAddressFormik.setFieldValue('address', deliveryAddress)
  // }, [deliveryAddress])

  const theme = useTheme();
  //   onSubmit={addAddressFormik.handleSubmit}
  return (
    <Stack>
      <form noValidate>
        <SimpleBar style={{ maxHeight: "240px" }}>
          <Grid
            container
            spacing={2}
            sx={{
              paddingBlockStart: "10px",
              paddingInlineEnd: "10px",
            }}
          >
            <Grid item xs={12} md={12}>
              <CustomTextFieldWithFormik
                required
                type="text"
                label={t("Address")}
                // touched={addAddressFormik.touched.address}
                // errors={addAddressFormik.errors.address}
                // fieldProps={addAddressFormik.getFieldProps("address")}
                // value={addAddressFormik.values.address}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextFieldWithFormik
                type="text"
                label={t("Address Title")} // touched={addAddressFormik.touched.address_type}
                // errors={addAddressFormik.errors.address_type}
                // fieldProps={addAddressFormik.getFieldProps("address_type")}
                // onChangeHandler={addressTypeHandler}
                // value={addAddressFormik.values.address_type}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextFieldWithFormik
                type="number"
                label={t("Building")}
                // touched={addAddressFormik.touched.Building}
                // errors={addAddressFormik.errors.Building}
                // fieldProps={addAddressFormik.getFieldProps("Building")}
                // onChangeHandler={houseHandler}
                // value={addAddressFormik.values.Building}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextFieldWithFormik
                type="number"
                label={t("Floor")}
                // touched={addAddressFormik.touched.floor}
                // errors={addAddressFormik.errors.floor}
                // fieldProps={addAddressFormik.getFieldProps("floor")}
                // onChangeHandler={floorHandler}
                // value={addAddressFormik.values.floor}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextFieldWithFormik
                type="number"
                label={t("Apartment")}
                // touched={addAddressFormik.touched.apartment}
                // errors={addAddressFormik.errors.apartment}
                // fieldProps={addAddressFormik.getFieldProps("apartment")}
                // onChangeHandler={appartmentHandler}
                // value={addAddressFormik.values.apartment}
              />
            </Grid>
          </Grid>
        </SimpleBar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "60%",
            justifyContent: "flex-start",
            gap: "25px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "600",
              color: theme.palette.primary.main,
              border: `1px solid ${theme.palette.primary.main}`,
              width: "150px",
              height: "40px",
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

          {/* <LoadingButton
            type="submit"
            // fullWidth
            // loading={isLoading}
            variant="contained"
            sx={{
              fontSize: "16px",
              fontWeight: "600",
              width: "150px",
              height: "40px",
              color: "white",
            }}
          >
            {t("Save")}
          </LoadingButton> */}
        </Box>
      </form>
    </Stack>
  );
};
export default AddressForm;
