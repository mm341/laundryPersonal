import { useAppSelector } from "@/redux/store";
import {
  CustomPaperBigCard,
  GlobalButton,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
// import Image from "next/image";
const ProductCardInCart = ({ checkOut }: { checkOut?: boolean }) => {
  //  hooks
  const { locale } = useRouter();
  const theme = useTheme();
  //  master data
  const { master } = useAppSelector((state) => state.master);

  let [quantity, setQuantity] = useState<number>(1);
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
      <GlobalDisplayFlexBox sx={{ alignItems: "flex-end" }}>
        {/*  left section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "15px",
            width: { sm: "70%", xs: "100%" },
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
              src="http://adminlaundry.razinsoft.com/storage/images/products/QpiDQXTAt3KnmNfOtGEg66sQmU7ndpKigAzzUhBZ.jpg"
              loading="lazy"
              alt="productImg"
              style={{ width: "100%", height: "100%", borderRadius: "4px" }}
            />
          </GlobalDisplayFlexBox>

          <GlobalDisplayFlexColumnBox
            width={"100%"}
            gap={!checkOut ? "16px" : "10px"}
          >
            {/*product  name */}
            <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
              Blouse
            </Typography>

            {/*  srrvice name */}
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#999999" }}
            >
              Blouse
            </Typography>

            {/*  quantity */}
            {!checkOut && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: locale === "en" ? "flex-start" : "flex-end",
                  gap: "10px",
                  alignItems: "center",
                }}
                dir="ltr"
              >
                {quantity > 1 && (
                  <GlobalButton
                    onClick={() => {
                      quantity > 1 && setQuantity((quantity -= 1));
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

                {quantity === 1 && (
                  <GlobalButton
                    onClick={() => {
                      quantity > 1 && setQuantity((quantity -= 1));
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
                  {quantity}
                </Typography>
                <GlobalButton
                  onClick={() => setQuantity((quantity += 1))}
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

            {checkOut && (
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: theme.palette.secondary.contrastText,
                }}
              >
                3×8.00 {master?.currency}
              </Typography>
            )}
          </GlobalDisplayFlexColumnBox>
        </Box>

        {/* { right Section} */}

        <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
          8.00 {master?.currency}
        </Typography>
      </GlobalDisplayFlexBox>
    </CustomPaperBigCard>
  );
};

export default ProductCardInCart;
