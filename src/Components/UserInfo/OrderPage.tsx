import {
  CustomPaperBigCard,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import GroupButtonsOrder from "./ProfileBody/GroupButtonsOrder";
import OrderCard from "./ProfileBody/OrderCard";
import OrderDetails from "./ProfileBody/OrderDetails";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { GetOrders } from "@/redux/slices/OrderSlice";
import {
  OrdersInterface,
  inititalOrdersInterface,
} from "@/interfaces/OrdersInterface";
import noOrdersFound from "../../../public/info/noOrders.png";
import noOrdersFoundArabic from "../../../public/info/noOrderFoundArabic.png";
import CircularProgress from "@mui/material/CircularProgress";
import Meta from "../GlobalComponent/Meta";
import { useRouter } from "next/router";
import { Scrollbar } from "../GlobalComponent/Scrollbar";
import CustomePagination from "../GlobalComponent/pagination/Pagination";
const OrderPage = () => {
  // hooks
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { locale } = useRouter();
  const [limit, setLimit] = useState<Number>(10);
  const [offset, setOffset] = useState<Number>(1);
  const { orders, isloading, total_size } = useAppSelector(
    (state) => state.orders
  );
  const [orderType, setOrderType] = useState<string>("on_going");
  const [orderData, setOrderData] = useState<OrdersInterface>(
    inititalOrdersInterface()
  );
  const [orderDetails, setOrderDetails] = useState<boolean>(false);

  //  handel filterButton

  const handleOrderType = (value: string) => {
    setOrderType(value);
    setOffset(1);
  };

  //  send request to get all orders
  useEffect(() => {
    dispatch(GetOrders({ filter: orderType,limit:limit,offset:offset }));
  }, [dispatch, orderType,offset]);

  return (
    <>
      <Meta title={"orders"} description="" keywords="" />
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
              <Scrollbar
                style={{
                  maxHeight: "600px",
                }}
              >
                {orders?.length > 0 && !isloading && (
                  <GlobalDisplayFlexColumnBox width={"100%"} gap={"25px"}>
                    {orders?.map((e: OrdersInterface, i: number) => (
                      <OrderCard
                        setOrderData={setOrderData}
                        order={e}
                        setOrderDetails={setOrderDetails}
                        key={i}
                      />
                    ))}
                  </GlobalDisplayFlexColumnBox>
                )}
              </Scrollbar>
              {/*  loading data */}
              {isloading && orders?.length === 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    minHeight: "300px",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}

              {/*  empty orders */}
              {orders?.length === 0 && !isloading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    minHeight: "300px",
                  }}
                >
                  <img
                    src={
                      locale === "en"
                        ? noOrdersFound?.src
                        : noOrdersFoundArabic?.src
                    }
                    loading="lazy"
                    alt="img"
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        )}
        { !orderDetails &&Number(total_size) > 10 && (
          <CustomePagination
            total_size={total_size}
            page_limit={limit}
            offset={offset}
            setOffset={setOffset}
          />
        )}
        {/*  case of open order details */}
        {orderDetails && (
          <OrderDetails
            orderData={orderData}
            setOrderDetails={setOrderDetails}
          />
        )}
      </CustomPaperBigCard>
    </>
  );
};

export default OrderPage;
