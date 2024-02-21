
import { VariantInterface } from "@/interfaces/VariantInterface";
import { GetProducts } from "@/redux/slices/ProductsSlice";
import { useAppDispatch } from "@/redux/store";
import { Button, useTheme } from "@mui/material";
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
          width: "max-content"
          
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
      {FilterType?.name}
    </Button>
  );
};

export default VariantFilterButton;
