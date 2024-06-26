import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  CustomPaperBigCard,
  GlobalButton,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { productInterface } from "@/interfaces/ProductInterface";
import { AddToCart, RemoveElement, UpdateCart } from "@/redux/slices/CartSlice";
// import Image from "next/image";
const ProductCardInCart = ({
  checkOut,
  product,
}: {
  checkOut?: boolean;
  product: productInterface;
}) => {
  //  hooks
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  //  master data
  const { master } = useAppSelector((state) => state.master);

  let quantity = product?.quantity;

  //  get coupon from localstorage

  let coupon: null | string | undefined = undefined;

  if (typeof window !== "undefined") {
    coupon = localStorage.getItem("coupon");
  }

  return (
    <CustomPaperBigCard
      sx={{
        borderRadius: "10px",
        backgroundColor: "white",
        position: "relative",
        overflowY: "hidden",
        overflowX: "hidden",
      }}
    >
      <GlobalDisplayFlexBox
        sx={{ alignItems: { md: "flex-end", xs: "center" } }}
      >
        {/*  left section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "10px",
            width: { md: "76%", xs: "100%" },
          }}
        >
          <GlobalDisplayFlexBox
            style={{ width: "118px", height: "76px" }}
            sx={{
              width: "118px",
              height: "85px",
              boxShadow: "0px 2px 6px 0px #0000001F",
              borderRadius: "4px",
            }}
          >
            <img
              width={"100"}
              height={"100"}
              src={product?.image_path}
              loading="lazy"
              alt="productImg"
              style={{ width: "100%", height: "100%", borderRadius: "4px" }}
            />
          </GlobalDisplayFlexBox>

          <GlobalDisplayFlexColumnBox
            width={"100%"}
            sx={{
              gap: !checkOut
                ? { md: "16px", xs: "5px" }
                : { md: "10px", xs: "5px" },
            }}
          >
            {/*product  name */}
            <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
              {product?.name}
            </Typography>

            {/*  service name */}
            <Typography
              sx={{
                fontSize: { md: "14px", xs: "12px" },
                fontWeight: "400",
                color: "#999999",
              }}
            >
              {product?.service?.name}
            </Typography>

            {checkOut && (
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: theme.palette.secondary.contrastText,
                }}
              >
                {product?.quantity}×{product?.old_price[0]} {master?.currency}
              </Typography>
            )}
          </GlobalDisplayFlexColumnBox>
        </Box>

        {/* { right Section} */}

        <GlobalDisplayFlexColumnBox gap={"20px"}>
          {/*  quantity */}
          {!checkOut && !loading && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                alignItems: "center",
              }}
            >
              {product.quantity > 1 && (
                <GlobalButton
                  onClick={() => {
                    setLoading(true);
                    if (product.quantity > 1) {
                      dispatch(
                        UpdateCart({
                          product_id: product?.id,
                          quantity: Number((quantity -= 1)),
                        })
                      ).then((res) => {
                        setLoading(false);
                      });
                    }
                  }}
                  py={"0"}
                  px={"0"}
                  sx={{
                    width: { md: "28px", xs: "20px" },
                    height: { md: "28px", xs: "20px" },
                    borderRadius: "5px",
                    color: theme.palette.primary.main,
                    border: `1px solid ${theme.palette.primary.main}`,
                  }}
                >
                  -
                </GlobalButton>
              )}

              {product.quantity === 1 && (
                <GlobalButton
                  onClick={() => {
                    setLoading(true);
                    product.quantity === 1 &&
                      dispatch(
                        RemoveElement({
                          product_id: product?.id,
                        })
                      ).then((res) => {
                        setLoading(false);
                      });
                  }}
                  py={"0"}
                  px={"0"}
                  sx={{
                    width: { md: "28px", xs: "20px" },
                    height: { md: "28px", xs: "20px" },
                    borderRadius: "5px",
                    color: theme.palette.primary.main,
                    border: `1px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <DeleteIcon
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: { md: "26px", xs: "18px" },
                    }}
                  />
                </GlobalButton>
              )}
              <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
                {product?.quantity}
              </Typography>
              <GlobalButton
                onClick={() => {
                  setLoading(true);
                  dispatch(
                    UpdateCart({
                      product_id: product?.id,
                      quantity: Number((quantity += 1)),
                    })
                  ).then((res) => {
                    setLoading(false);
                  });
                }}
                py={"0"}
                px={"0"}
                sx={{
                  width: { md: "28px", xs: "20px" },
                  height: { md: "28px", xs: "20px" },
                  borderRadius: "5px",
                  color: theme.palette.primary.main,
                  border: `1px solid ${theme.palette.primary.main}`,
                }}
              >
                +
              </GlobalButton>
            </Box>
          )}
          {loading && (
            <GlobalDisplayFlexColumnBox gap={"2px"}>
              <Skeleton variant="text" width="50px" height={10} />
              <Skeleton variant="text" width="50px" height={10} />
            </GlobalDisplayFlexColumnBox>
          )}

          {/*  price */}
          <Typography
            sx={{ fontSize: "16px", fontWeight: "500", textAlign: "center" }}
          >
            {product?.cart_old_price[0]} {master?.currency}
          </Typography>
        </GlobalDisplayFlexColumnBox>
      </GlobalDisplayFlexBox>
    </CustomPaperBigCard>
  );
};

export default ProductCardInCart;
