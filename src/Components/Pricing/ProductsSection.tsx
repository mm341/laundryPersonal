import { productInterface } from "@/interfaces/ProductInterface";
import { useAppSelector } from "@/redux/store";
import { GlobalDisplayFlexColumnBox } from "@/styles/PublicStyles";
import { Box,  Typography, styled, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import SimpleBar from "simplebar-react";
import LoadingComponent from "../GlobalComponent/LoadingComponent";
import EmptyData from "../GlobalComponent/EmptyData";
import emptyProductsImg from "../../../public/products/empty products.png";
const ProductsSection = ({ products }: { products: productInterface[] }) => {
  //  hooks

  const { t } = useTranslation();
  
  //  master data
  const { master } = useAppSelector((state) => state.master);

    //  selectors

    const { isloading } = useAppSelector(
      (state) => state.products
    );
  
  //  custom design of scrollbar
  const ScrollbarRoot = styled(SimpleBar)`
    .simplebar-scrollbar::before {
      width: 6px;

      background-color: #d9d9d9;
    }
  `;
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
            gap: { sm: "320px", xs: "110px" },
            p: "12px",
            
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            {t("Items")}
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            {t("Price")}
          </Typography>
        </Box>
        <ScrollbarRoot
          style={{
            maxHeight: "500px",
          }}
        >
          {products?.length > 0 &&products?.map((e: productInterface, i) => (
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
                  gap: { sm: "320px", xs: "110px" },
                  p: "12px",
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "400",
                  }}
                >
                  {e?.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "400",
                  }}
                >
                  {e?.current_price} {master?.currency}
                </Typography>
              </Box>
            </Box>
          ))}
           {/*  case of loading data */}
           {isloading && products?.length === 0 && (
                        <LoadingComponent />
                      )}
                      {/*  case of empty products data */}
                      {!isloading && products?.length === 0 && (
                        <EmptyData img={emptyProductsImg?.src} />
                      )}
        </ScrollbarRoot>
      </GlobalDisplayFlexColumnBox>
    </Box>
  );
};

export default ProductsSection;
