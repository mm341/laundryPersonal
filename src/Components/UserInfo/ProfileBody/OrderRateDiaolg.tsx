import {
  GlobalButton,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Modal, Stack, Typography, alpha, useTheme } from "@mui/material";
import React from "react";
import ratePhoto from ".././../../../public/info/ratePhoto.png";
import { useTranslation } from "react-i18next";
import CustomTextFieldWithFormik from "@/Components/GlobalComponent/form-fields/CustomTextFieldWithFormik";
import CustomRatings from "@/Components/GlobalComponent/CustomRatings";
const OrderRateDiaolg = ({
  openRateDialog,
  setOpenRateDialog,
}: {
  setOpenRateDialog: (e: boolean) => void;
  openRateDialog: boolean;
}) => {
  //  hooks

  const theme = useTheme();
  const { t } = useTranslation();

  //    handel rate stars
  const handleChangeRatings = () => {
    // formik.setFieldValue('rating', value)
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
              ratingValue={"3"} //   handleChangeRatings={handleChangeRatings}
              //   ratingValue={
              //     data?.restaurant_review?.rating
              //       ? data?.restaurant_review?.rating
              //       : formik.values.rating
              //   }
              //   readOnly={false}
            />
            <CustomTextFieldWithFormik
              type="text"
              rate
              label={t("Write your comments here")}
              //   touched={formik.touched.comment}
              //   errors={formik.errors.comment}
              //   fieldProps={formik.getFieldProps("comment")}
              multiline
              rows={2}
              // onChangeHandler={RestaurantNameHandler}
              //   value={formik.values.comment}
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
            </GlobalDisplayFlexBox>
          </GlobalDisplayFlexColumnBox>
        </GlobalDisplayFlexColumnBox>
      </Stack>
    </Modal>
  );
};

export default OrderRateDiaolg;
