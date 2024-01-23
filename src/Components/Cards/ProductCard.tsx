import { productInterface } from "@/interfaces/ProductInterface";
import { useAppSelector } from "@/redux/store";
import {
  CustomPaperBigCard,
  GlobalButton,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
// import Image from "next/image";
const ProductCard = ({
  product,
  setProduct,
  setOpenDialog,
}: {
  product: productInterface;
  setProduct: (e: productInterface) => void;
  setOpenDialog: (e: boolean) => void;
}) => {
  //  hooks
  const { locale } = useRouter();
  const { t } = useTranslation();
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
            width: { sm: "60%", xs: "100%" },
          }}
        >
          <GlobalDisplayFlexBox
            style={{ width: "147px", height: "110px" }}
            sx={{
              width: "147px",
              height: "110px",
              boxShadow: "0px 2px 6px 0px #0000001F",
              borderRadius: "4px",
            }}
          >
            <img
              width={400}
              height={400}
              src={product?.image_path}
              loading="lazy"
              alt="productImg"
              style={{ width: "100%", height: "100%", borderRadius: "4px" }}
            />
          </GlobalDisplayFlexBox>

          <GlobalDisplayFlexColumnBox width={"100%"} gap={"2px"}>
            {/*  name */}
            <Typography
              sx={{ fontSize: { md: "20px", xs: "14px" }, fontWeight: "600" }}
            >
              {product?.name}
            </Typography>

            {/*  old and current price  case of product discount*/}
            {product?.discount_percentage && (
              <GlobalDisplayFlexColumnBox width={"100%"} gap={"2px"}>
                <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
                  {product?.current_price} {master?.currency} / {t("Item")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#999999",
                    textDecoration: "line-through",
                  }}
                >
                  {product?.old_price} {master?.currency} / {t("Item")}
                </Typography>
              </GlobalDisplayFlexColumnBox>
            )}
            {/*  current price  case of no product discount*/}
            {!product?.discount_percentage && (
              <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
                {product?.current_price} {master?.currency} / {t("Item")}
              </Typography>
            )}
            {/*  quantity */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: locale === "en" ? "flex-start" : "flex-end",
                gap: "10px",
                alignItems: "center",
                mt: { md: "12px", xs: "5px" },
              }}
              dir="ltr"
            >
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
                  color: quantity > 1 ? theme.palette.primary.main : "#999999",
                  border:
                    quantity > 1
                      ? `1px solid ${theme.palette.primary.main}`
                      : `1px solid #999999`,
                }}
              >
                -
              </GlobalButton>
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
          </GlobalDisplayFlexColumnBox>
        </Box>

        {/*  right section  */}

        {/*  add button */}

        <GlobalButton
          py={""}
          px={"0"}
          width={"102px"}
          height={"32px"}
          sx={{
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            border: `2px solid ${theme.palette.primary.main}`,
            color: theme.palette.primary.main,
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={() => {
            setOpenDialog(true);
            setProduct(product);
          }}
        >
          + {t("Add")}{" "}
        </GlobalButton>
        {product?.discount_percentage && (
          <Box
            sx={{
              position: "absolute",
              top: { md: "18.5px", xs: "6.5px" },
              right: { md: "-53px", xs: "-72px" },
              backgroundColor: "#38AE04",
              width: "200px",
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transform: locale === "en" ? "rotate(30deg)" : "rotate(-30deg)",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "white",
                }}
              >
                {product?.discount_percentage} % {t("Off")}
              </Typography>
            </Box>
          </Box>
        )}
      </GlobalDisplayFlexBox>
    </CustomPaperBigCard>
  );
};

export default ProductCard;
