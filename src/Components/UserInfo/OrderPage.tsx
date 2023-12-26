import {
  CustomPaperBigCard,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Grid, useTheme } from "@mui/material";
import React, { useState } from "react";
import GroupButtonsOrder from "./ProfileBody/GroupButtonsOrder";
import OrderCard from "./ProfileBody/OrderCard";
import OrderDetails from "./ProfileBody/OrderDetails";

const OrderPage = () => {
  // hooks
  const theme = useTheme();
  const [orderType, setOrderType] = useState<string>("Ongoing");
  const [productsDetails, setOpenProductsDetails] = useState<boolean>(false);

  const [orderDetails, setOrderDetails] = useState<boolean>(false);

  //  handel filterButton

  const handleOrderType = (value: string) => {
    setOrderType(value);
  };

  const array = [...Array(4)];

  return (
    <CustomPaperBigCard
      sx={{
        boxShadow: "box-shadow: 0px 0px 6px 0px #00000026",
        backgroundColor: theme.palette.primary.dark,
      }}
    >
      {!orderDetails && (
        <Grid container spacing={2.4}>
          {/*  buttons filter */}
          <Grid item xs={12} sm={12} md={12}>
            <GroupButtonsOrder setType={handleOrderType} type={orderType} />
          </Grid>
          {/*  orders cards */}
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <GlobalDisplayFlexColumnBox width={"100%"} gap={"25px"}>
              {array?.map((e, i) => (
                <OrderCard
                  productsDetails={productsDetails}
                  setOpenProductsDetails={setOpenProductsDetails}
                  setOrderDetails={setOrderDetails}
                  key={i}
                />
              ))}
            </GlobalDisplayFlexColumnBox>
          </Grid>

          {/*  orders cards */}
        </Grid>
      )}
      {/*  case of open order details */}
      {orderDetails && (
        <OrderDetails
          setOrderDetails={setOrderDetails}
          productsDetails={productsDetails}
          setOpenProductsDetails={setOpenProductsDetails}
        />
      )}
    </CustomPaperBigCard>
  );
};

export default OrderPage;
