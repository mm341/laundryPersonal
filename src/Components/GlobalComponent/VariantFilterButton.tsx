import { VariantInterface } from "@/interfaces/VariantInterface";
import { GetProducts } from "@/redux/slices/ProductsSlice";
import { useAppDispatch } from "@/redux/store";
import { Box, Button, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const VariantFilterButton = ({
  setType,
  type,
  FilterType,
  setSearchText,
}: {
  setType: (e: string) => void;
  type: string;
  FilterType: VariantInterface;
  setSearchText: (e: string) => void;
}) => {
  //  hooks
  const theme = useTheme();

  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <Button
      style={{
        backgroundColor:
          type === FilterType?.id ? theme.palette.primary.main : "white",
        // minWidth:"310px",
        width: "max-content",
        // paddingLeft:"1px"
      }}
      sx={{
        "&:hover": {
          backgroundColor:
            type === FilterType?.id ? theme.palette.primary.main : "white",
        },
        backgroundColor:
          type === FilterType?.id ? theme.palette.primary.main : "white",
        // width: { xs: "34%", sm: "185px" },
        // width:"fit-content",
        // minWidth:"250px",
        height: "40px",
        color: type === FilterType?.id ? "white" : theme.palette.primary.main,
        fontSize: { sm: "16px", xs: "10px" },
      }}
      onClick={() => {
        setType(FilterType?.id);
        setSearchText("");
        dispatch(
          GetProducts({
            serviceId: router.query.service_id,
            variantId: FilterType?.id,
          })
        );
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <img
          src={FilterType?.image_path}
          loading="lazy"
          alt="img"
          style={{
            width: "28px",
            height: "28px",
            filter:
            FilterType?.id!==type?
              "invert(45%) sepia(90%) saturate(423%) hue-rotate(158deg) brightness(101%) contrast(87%)"
              :"invert(100%) sepia(10%) saturate(5655%) hue-rotate(245deg) brightness(101%) contrast(149%)"
              ,

          }}
        />
        {FilterType?.name}
      </Box>
    </Button>
  );
};

export default VariantFilterButton;
