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
import React, { useEffect, useState } from "react";
import ServiceSection from "./ServiceSection";
import { useAppSelector } from "@/redux/store";
import ProductsSection from "./ProductsSection";
import { CloseOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
const FilterProductsWithService = () => {
  //  hooks
  const { t } = useTranslation();
  const theme = useTheme();
  const { services } = useAppSelector((state) => state.services);
  const [serviceId, setServiceId] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");
  useEffect(() => {
    if (services?.length > 0) {
      setServiceId(services[0]?.id);
    }
  }, [services]);

  return (
    <CustomPaperBigCard sx={{ backgroundColor: theme.palette.primary.dark }}>
      <GlobalDisplayFlexColumnBox gap={"40px"} sx={{ py: "30px", px: "15px" }}>
        {/*  search field */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end" }}
          component={"form"}

          // onSubmit={handelSubmit}
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
              // onChange={handelChange}
              // value={searchText}
              id="header-search"
              endAdornment={
                <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                  <Fade in={searchText !== ""}>
                    <CloseOutlined
                      onClick={() => {
                        setSearchText("");

                        // dispatch(
                        //   GetProducts({
                        //     serviceId: Number(
                        //       router.query.service_id
                        //     ),
                        //     variantId: Number(type),
                        //   })
                        // );
                      }}
                      color="primary"
                    />
                  </Fade>

                  <SearchIcon />
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
            <ServiceSection setServiceId={setServiceId} serviceId={serviceId} />
          </Grid>
          <Grid item md={8} xs={12}>
            <ProductsSection />
          </Grid>
        </Grid>
      </GlobalDisplayFlexColumnBox>
    </CustomPaperBigCard>
  );
};

export default FilterProductsWithService;
