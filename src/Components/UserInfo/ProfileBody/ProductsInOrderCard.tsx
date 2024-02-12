import {
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import React from "react";

import { OrdersInterface } from "@/interfaces/OrdersInterface";
import { productInterface } from "@/interfaces/ProductInterface";
// import Image from "next/image";
import { useAppSelector } from "@/redux/store";
import { useTranslation } from "react-i18next";
const ProductsInOrderCard = ({
  openProductsDetails,
  order,
}: {
  openProductsDetails: boolean;
  order: OrdersInterface;
}) => {
  //  hooks
  const { t } = useTranslation();
  //  master data

  const { master } = useAppSelector((state) => state.master);

  return (
    <Box
      sx={{
        mb: openProductsDetails ? "20px" : "0px",
        mt: openProductsDetails ? "15px" : "0px",
      }}
    >
      {openProductsDetails && (
        <>
          {order?.products?.map((product: productInterface, i: number) => (
            <GlobalDisplayFlexColumnBox
              key={i}
              gap={"20px"}
              sx={{ px: "18px", mt: i !== 0 ? "20px" : "0px" }}
              width={"100%"}
            >
              <GlobalDisplayFlexBox>
                {/*  img and name  */}
                <GlobalDisplayFlexBox
                  style={{ flexDirection: "row" }}
                  sx={{
                    width: {
                      md: "50%",
                      xs: "100%",
                      justifyContent: "flex-start",
                      gap: "20px",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      p: "10px",
                      boxShadow: "0px 0px 6px 0px #00000029",
                      width: "80px",
                      height: "80px",
                    }}
                  >
                    <img
                      width={"300"}
                      height={"300"}
                      src={product?.image_path}
                      loading="lazy"
                      alt="img"
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "30px",
                    }}
                  >
                    <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
                      {product?.name}
                    </Typography>
                    <Typography sx={{ fontWeight: "400", fontSize: "16px" }}>
                      {product?.service?.name}
                    </Typography>
                  </Box>
                </GlobalDisplayFlexBox>

                {/*  price and quantity */}

                <Box
                  sx={{
                    width: { md: "50%", xs: "100%" },
                    display: "flex",
                    justifyContent: { md: "flex-end", xs: "flex-start" },
                    alignItems: { md: "flex-end", xs: "flex-start" },
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
                    {product?.discounted_price &&
                      product?.discounted_price * product?.quantity}{" "}
                    {master.currency}
                  </Typography>
                  <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
                    {product?.quantity}×{product?.discounted_price}{" "}
                    {master.currency}
                  </Typography>
                </Box>
              </GlobalDisplayFlexBox>

              <Divider orientation="horizontal" />
            </GlobalDisplayFlexColumnBox>
          ))}

          {order?.additionals?.map((e, i) => (
            <GlobalDisplayFlexColumnBox key={i} sx={{ px: "18px" }}>
              <GlobalDisplayFlexBox sx={{ py: "24px" }}>
                <GlobalDisplayFlexColumnBox gap={"8px"}>
                  <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
                    {e?.name}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#666666",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    {t("Additional Service")}
                  </Typography>
                </GlobalDisplayFlexColumnBox>
                <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
                  {" "}
                  {e?.price} {master?.currency}
                </Typography>
              </GlobalDisplayFlexBox>
              <Divider orientation="horizontal" />
            </GlobalDisplayFlexColumnBox>
          ))}
        </>
      )}
    </Box>
  );
};

export default ProductsInOrderCard;
