import {
  CustomPaperBigCard,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import {
  Box,
  Fade,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ServiceSection from "./ServiceSection";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import ProductsSection from "./ProductsSection";
import { CloseOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import {
  GetProducts,
  GetProductsWithSearchAndService,
  GetProductsWithServiceOnly,
} from "@/redux/slices/ProductsSlice";
const FilterProductsWithService = () => {
  //  hooks
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { services } = useAppSelector((state) => state.services);
  const { products } = useAppSelector((state) => state.products);
  const [serviceId, setServiceId] = useState<string | string[] | undefined>("");
  const [searchText, setSearchText] = useState<string>("");


  //  get initial value of service id
  useEffect(() => {
    if (services?.length > 0) {
      setServiceId(services[0]?.id);
    }
  }, [services]);

  //  get products with servic eid
  useEffect(() => {
    if (serviceId) {
      dispatch(
        GetProductsWithServiceOnly({
          serviceId: serviceId,
        })
      );
    }
  }, [serviceId]);

  //  search action submit
  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchText) {
      setServiceId("");
      dispatch(
        GetProductsWithSearchAndService({
          searchText: searchText,
        })
      );
    }
  };

  //  search action onChange
  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

    if (e.target.value) {
      setServiceId("");
      // dispatch(
      //   GetProductsWithSearchAndService({
      //     searchText: e.target.value,
      //   })
      // );
    } else {
      setServiceId(services[0]?.id);
      dispatch(
        GetProductsWithServiceOnly({
          serviceId: services[0]?.id,
        })
      );
    }
  };
  return (
    <CustomPaperBigCard sx={{ backgroundColor: theme.palette.primary.dark,my:"5px" }}>
      <GlobalDisplayFlexColumnBox gap={"40px"} sx={{ py: "30px", px: "15px" }}>
        {/*  search field */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end" }}
          component={"form"}
          onSubmit={handelSubmit}
        >
          <FormControl
            sx={{
              backgroundColor: "white",
              boxShadow: "0px 1px 20px 0px #0000001A",
              borderRadius: "10px",
            }}
          >
            <OutlinedInput
              size="small"
              onChange={handelChange}
              value={searchText}
              id="header-search"
              endAdornment={
                <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                  <Fade in={searchText !== ""}>
                    <CloseOutlined
                      onClick={() => {
                        setSearchText("");
                        setServiceId(services[0]?.id)
                        dispatch(
                          GetProductsWithServiceOnly({
                            serviceId: services[0]?.id,
                          })
                        );
                      }}
                      color="primary"
                    />
                  </Fade>

                  <SearchIcon onClick={handelSubmit} />
                </InputAdornment>
              }
              aria-describedby="header-search-text"
              aria-label="weight"
              placeholder={t("Search")}
            />
          </FormControl>
        </Box>
        <Grid container spacing={3}>
          {/*  services section */}
          <Grid item md={4} xs={12}>
            <ServiceSection  setSearchText={setSearchText} setServiceId={setServiceId} serviceId={serviceId} />
          </Grid>
          <Grid item md={8} xs={12}>
            <ProductsSection products={products} />
          </Grid>
        </Grid>
      </GlobalDisplayFlexColumnBox>
    </CustomPaperBigCard>
  );
};

export default FilterProductsWithService;
