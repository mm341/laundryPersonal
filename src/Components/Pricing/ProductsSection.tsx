import { productInterface } from "@/interfaces/ProductInterface";
import { useAppSelector } from "@/redux/store";
import { GlobalDisplayFlexColumnBox } from "@/styles/PublicStyles";
import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../GlobalComponent/LoadingComponent";
import EmptyData from "../GlobalComponent/EmptyData";
import emptyProductsImg from "../../../public/products/empty products.png";
import emptyProductsArabicImg from "../../../public/products/empty productsArabic.png";
import { Scrollbar } from "../GlobalComponent/Scrollbar";
import { useRouter } from "next/router";
const ProductsSection = ({ products }: { products: productInterface[] }) => {
  //  hooks

  const { t } = useTranslation();
  const { locale } = useRouter();
  const theme = useTheme();
  //  master data
  const { master } = useAppSelector((state) => state.master);

  //  selectors

  const { isloading } = useAppSelector((state) => state.products);

  //  handel old price

  const handelProductOldPrice = (product: productInterface) => {
    if (Math.min(...product?.old_price) !== Math.max(...product?.old_price))
      return (
        <Typography sx={{ fontSize: "16px", fontWeight: "400",textDecoration:"line-through" ,opacity:"0.6"}}>
          {Math.min(...product?.old_price)} {master?.currency} / {t("Item")} -{" "}
          {Math.max(...product?.old_price)} {master?.currency} / {t("Item")}
        </Typography>
      );
    else {
      return (
        <Typography sx={{ fontSize: "16px", fontWeight: "400",textDecoration:"line-through",opacity:"0.6" }}>
          {Math.min(...product?.old_price)} {master?.currency} / {t("Item")}{" "}
        </Typography>
      );
    }
  };

  //  handel current price
  const handelProductPrice = (product: productInterface) => {
    if (
      Math.min(...product?.current_price) !==
      Math.max(...product?.current_price)
    )
      return (
        <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
          {Math.min(...product?.current_price)} {master?.currency} / {t("Item")}{" "}
          - {Math.max(...product?.current_price)} {master?.currency} /{" "}
          {t("Item")}
        </Typography>
      );
    else {
      return (
        <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
          {Math.min(...product?.current_price)} {master?.currency} / {t("Item")}{" "}
        </Typography>
      );
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        boxShadow: "0px 0px 4px 0px #0000001F",
        borderRadius: "8px",
      }}
    >
      <GlobalDisplayFlexColumnBox gap={"0px"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            p: "12px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "600",
              width: { sm: "45%", xs: "100%" },
            }}
          >
            {t("Items")}
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "600",
              width: { sm: "55%", xs: "100%" },
            }}
          >
            {t("Price")}
          </Typography>
        </Box>
        <Scrollbar
          style={{
            maxHeight: "500px",
          }}
        >
          {products?.length > 0 &&
            products?.map((e: productInterface, i) => (
              <Box
                key={i}
                sx={{ backgroundColor: i % 2 === 0 ? "#ECEFF1" : "white" }}
              >
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // gap: { sm: "320px", xs: "110px" },
                    justifyContent: "space-between",
                    p: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "400",
                      width: { sm: "45%", xs: "100%" },
                    }}
                  >
                    {e?.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: { sm: "55%", xs: "100%" },
                      gap: "10px",
                    }}
                  >
                   
                      {handelProductPrice(e)}
                    
                    {handelProductOldPrice(e)}
                  </Box>
                </Box>
              </Box>
            ))}
          {/*  case of loading data */}
          {isloading && products?.length === 0 && <LoadingComponent />}
          {/*  case of empty products data */}
          {!isloading && products?.length === 0 && (
            <EmptyData
              img={
                locale === "en"
                  ? emptyProductsImg?.src
                  : emptyProductsArabicImg?.src
              }
            />
          )}
        </Scrollbar>
      </GlobalDisplayFlexColumnBox>
    </Box>
  );
};

export default ProductsSection;
