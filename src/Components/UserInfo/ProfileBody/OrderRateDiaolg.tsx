import {
  GlobalButton,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import {
  Box,
  Button,
  Modal,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import React from "react";
import ratePhoto from ".././../../../public/info/ratePhoto.png";
import { useTranslation } from "react-i18next";
import CustomTextFieldWithFormik from "@/Components/GlobalComponent/form-fields/CustomTextFieldWithFormik";
import CustomRatings from "@/Components/GlobalComponent/CustomRatings";
import { useFormik } from "formik";
import PublicHandelingErrors from "@/utils/PublicHandelingErrors";
import { toast } from "react-hot-toast";
import { OrdersInterface } from "@/interfaces/OrdersInterface";
import { useMutation } from "react-query";
import { ReviewApi } from "@/React-Query/ReviewApi";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/store";
import { GetOrderDetails, GetOrders } from "@/redux/slices/OrderSlice";

export interface rating {
  rating: number;
  content: string;
  order?: number;
}
const OrderRateDiaolg = ({
  openRateDialog,
  setOpenRateDialog,
  orderData,
  orderId,
}: {
  setOpenRateDialog: (e: boolean) => void;
  openRateDialog: boolean;
  orderData: OrdersInterface;
  orderId: string;
}) => {
  //  hooks

  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { push, locale, pathname, query, asPath } = useRouter();
  const { mutate, isLoading, error } = useMutation(
    "submit-review-deliveryman",
    ReviewApi.submit
  );

  //  formik validation
  const formik = useFormik({
    initialValues: {
      rating: 0,
      content: "",
    },
    onSubmit: async (values, helpers) => {
      try {
        handleFormsubmit(values);
      } catch (err) {}
    },
  });
  //    handel rate stars
  const handleChangeRatings = (value: number) => {
    formik.setFieldValue("rating", value);
  };

  const handleFormsubmit = (values: rating) => {
    const formData: rating = {
      ...values,

      order: orderData?.id,
    };
    mutate(formData, {
      onSuccess: (response: any) => {
        setOpenRateDialog(false);
        dispatch(GetOrderDetails(orderId));
        toast.success(response?.data?.message);
      },
      onError: PublicHandelingErrors.onErrorResponse,
    });
  };

  //  dialog style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    width: { md: "878px", xs: "350px" },
    bgcolor: "background.paper",
    border: "1px solid white",
    boxShadow: 24,
    height: { md: "683px", xs: "700px" },
    borderRadius: "10px",
    p: 3,
  };
  return (
    <Modal
      open={openRateDialog}
      onClose={() => {
        setOpenRateDialog(false);
      }}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Stack sx={style}>
        <GlobalDisplayFlexColumnBox
          width={"100%"}
          gap={"32px"}
          alignItems={"center"}
        >
          <img
            //   className="md:h-[271px] xs:h-[150px]"
            src={ratePhoto?.src}
            style={{ width: "350px", height: "271px" }}
            loading="lazy"
            alt="ratePhoto"
          />

          <Box
            onSubmit={formik.handleSubmit}
            sx={{ width: "100%" }}
            component={"form"}
          >
            <GlobalDisplayFlexColumnBox
              width={"100%"}
              gap={"24px"}
              alignItems={"center"}
            >
              <Typography
                sx={{ fontSize: { md: "32px", xs: "20px" }, fontWeight: "500" }}
              >
                {t("How Was Your Experience?")}
              </Typography>

              <Typography
                sx={{
                  fontSize: { md: "16px", xs: "14px" },
                  fontWeight: "400",
                  color: alpha("#272727", 0.6),
                }}
              >
                {t("Your feedback is valuable to us")}
              </Typography>
              <CustomRatings
                color={""}
                readOnly={false}
                handleChangeRatings={handleChangeRatings}
                ratingValue={formik.values.rating}
                //   readOnly={false}
              />
              <CustomTextFieldWithFormik
                disabled={isLoading}
                type="text"
                rate
                label={t("Write your comments here")}
                touched={formik.touched.content}
                errors={formik.errors.content}
                fieldProps={formik.getFieldProps("content")}
                multiline
                rows={2}
                value={formik.values.content}
              />

              <GlobalDisplayFlexBox
                sx={{ justifyContent: "flex-end", gap: "20px", mt: "20px" }}
              >
                <GlobalButton
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: theme.palette.primary.main,
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: "5px",
                  }}
                  py={"7px"}
                  px={"20px"}
                  onClick={() => setOpenRateDialog(false)}
                >
                  {t("Cancel")}
                </GlobalButton>
                <Button disabled={isLoading} type="submit">
                  <GlobalButton
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                      borderRadius: "5px",
                    }}
                    py={"7px"}
                    px={"20px"}
                  >
                    {t("Confirm")}
                  </GlobalButton>
                </Button>
              </GlobalDisplayFlexBox>
            </GlobalDisplayFlexColumnBox>
          </Box>
        </GlobalDisplayFlexColumnBox>
      </Stack>
    </Modal>
  );
};

export default OrderRateDiaolg;
