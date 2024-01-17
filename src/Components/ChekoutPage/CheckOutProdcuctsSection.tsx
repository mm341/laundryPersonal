import {
  CustomPaperBigCard,
  GlobalButton,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import React from "react";
import ProductCardInCart from "../Cards/ProductCardInCart";
import {
  CircularProgress,
  Typography,
  alpha,
  styled,
  useTheme,
} from "@mui/material";
import SimpleBar from "simplebar-react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "@/redux/store";

const CheckOutProductsSection = ({
  checkOut,
  handelAddOrder,
}: {
  checkOut: boolean;
  handelAddOrder: () => void;
}) => {
  //  hooks
  const theme = useTheme();
  const { t } = useTranslation();
  const { isloadingAddOrder } = useAppSelector((state) => state.orders);
  //  custom design of scrollbar
  const ScrollbarRoot = styled(SimpleBar)`
    .simplebar-scrollbar::before {
      width: 6px;

      background-color: #d9d9d9;
    }
  `;
  const array = [...Array(10)];
  return (
    <CustomPaperBigCard sx={{ backgroundColor: "white" }}>
      <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
        {t("Items")} (2)
      </Typography>
      <ScrollbarRoot
        style={{
          maxHeight: "700px",
        }}
      >
        <GlobalDisplayFlexColumnBox
          width={"99%"}
          sx={{ mx: "auto", my: "20px" }}
          gap={"20px"}
        >
          {array?.map((e, i) => (
            <ProductCardInCart key={i} checkOut />
          ))}
        </GlobalDisplayFlexColumnBox>
      </ScrollbarRoot>
      {isloadingAddOrder ? (
        <GlobalButton
          sx={{
            fontSize: "20px",
            fontWeight: "500",
            color: "white",
            height: "48px",
            backgroundColor: alpha(theme.palette.primary.main, 0.3),
            borderRadius: "5px",
          }}
          px={"0"}
          py={"0"}
        >
          <CircularProgress size={25} />
        </GlobalButton>
      ) : (
        <GlobalButton
          onClick={handelAddOrder}
          sx={{
            fontSize: "20px",
            fontWeight: "500",
            color: "white",
            height: "48px",
            backgroundColor: theme.palette.primary.main,
            borderRadius: "5px",
          }}
          px={"0"}
          py={"0"}
        >
          {t("Place Order")}
        </GlobalButton>
      )}
    </CustomPaperBigCard>
  );
};

export default CheckOutProductsSection;
