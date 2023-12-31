import GroupButtonsVariants from "@/Components/GlobalComponent/GroupButtonsVariants";
import PublicContainer from "@/Components/PublicContainer";
import {
  GetProducts,
  GetProductsWithSearch,
  GetVariants,
} from "@/redux/slices/ProductsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  CustomPaperBigCard,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import {
  Box,
  Fab,
  Fade,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import emptyProductsImg from "../../../public/products/empty products.png";
import EmptyData from "@/Components/GlobalComponent/EmptyData";
import LoadingComponent from "@/Components/GlobalComponent/LoadingComponent";
import {
  initialProductData,
  productInterface,
} from "@/interfaces/ProductInterface";
import ProductCard from "@/Components/Cards/ProductCard";
import { CloseOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import Cartsection from "@/Components/Cart/Cartsection";
import SimpleBar from "simplebar-react";
import SubProductModel from "@/Components/Dialogs/SubProductModel";
import dynamic from "next/dynamic";
import CustomLoaderPage from "@/Components/GlobalComponent/CustomLoaderPage";
import Meta from "@/Components/GlobalComponent/Meta";
const ProductsPage = () => {
  //  hooks
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [searchText, setSearchText] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  let [loading, setLoading] = useState<boolean>(false);
  const [Product, setProduct] = useState<productInterface>(
    initialProductData()
  );
  //  selectors

  const { products, variants, isloading } = useAppSelector(
    (state) => state.products
  );

  //     complete hooks
  const [type, setType] = useState<number>(0);
  useEffect(() => {
    if (router.query.service_id) {
      dispatch(GetVariants({ serviceId: Number(router.query.service_id) }));
    }
  }, [dispatch, router.query.service_id]);

  //    handel initial value of variant type
  useEffect(() => {
    if (variants?.length > 0) {
      setType(Number(variants[0]?.id));
    }
  }, [variants]);

  //  get products with request api
  useEffect(() => {
    if (Number(type) > 0 && router.query.service_id) {
      dispatch(
        GetProducts({
          serviceId: Number(router.query.service_id),
          variantId: Number(type),
        })
      );
    }
  }, [dispatch, router.query.service_id, type]);

  //  search action submit
  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchText) {
      dispatch(
        GetProductsWithSearch({
          serviceId: Number(router.query.service_id),
          variantId: Number(type),
          searchText: searchText,
        })
      );
    }
  };
  //  search action onChange
  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value) {
      dispatch(
        GetProductsWithSearch({
          serviceId: Number(router.query.service_id),
          variantId: Number(type),
          searchText: e.target.value,
        })
      );
    } else {
      dispatch(
        GetProducts({
          serviceId: Number(router.query.service_id),
          variantId: Number(type),
        })
      );
    }
  };

  //  custom design of scrollbar
  const ScrollbarRoot = styled(SimpleBar)`
    .simplebar-scrollbar::before {
      width: 6px;

      background-color: #d9d9d9;
    }
  `;

  //  function close subProduct modal

  const handelCloseModal = () => {
    setOpenDialog(false);
  };

  //  get variable name from localstorage
  const ServiceName = dynamic(
    () => import("@/Components/GlobalComponent/SaveVariableLocalStorage"),
    { ssr: false }
  );
  //  handel loading page pre-render
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  if(typeof window !=="undefined"){
    localStorage.setItem("path", router.asPath);
  }
    
  

  return (
    <>
     <Meta title={"services"} description="" keywords="" />
      {loading ? (
        <CustomLoaderPage loading={loading} />
      ) : (
        <PublicContainer>
          <CustomPaperBigCard
            sx={{
              borderRadius: "10px",
              backgroundColor: theme.palette.primary.dark,
            }}
          >
            <Grid container spacing={3}>
              <Grid item md={8} xs={12}>
                <GlobalDisplayFlexColumnBox width={"100%"} gap={"26px"}>
                  {/*  all variants section */}
                  <GroupButtonsVariants
                    setSearchText={setSearchText}
                    data={variants}
                    type={type}
                    setType={setType}
                  />

                  {/*  products section */}
                  <CustomPaperBigCard
                    sx={{ backgroundColor: "white", py: "20px" }}
                  >
                    <GlobalDisplayFlexColumnBox width={"100%"} gap={"30px"}>
                      <GlobalDisplayFlexBox sx={{ px: "14px" }}>
                        <ServiceName />
                        {/*  search field */}
                        <Box
                          component={"form"}
                          sx={{
                            boxShadow: "0px 1px 20px 0px #0000001A",
                            backgroundColor: "white",
                          }}
                          onSubmit={handelSubmit}
                        >
                          <FormControl>
                            <OutlinedInput
                              size="small"
                              onChange={handelChange}
                              value={searchText}
                              id="header-search"
                              endAdornment={
                                <InputAdornment
                                  position="end"
                                  sx={{ cursor: "pointer" }}
                                >
                                  <Fade in={searchText !== ""}>
                                    <CloseOutlined
                                      onClick={() => {
                                        setSearchText("");

                                        dispatch(
                                          GetProducts({
                                            serviceId: Number(
                                              router.query.service_id
                                            ),
                                            variantId: Number(type),
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
                      </GlobalDisplayFlexBox>

                      {/*  products card */}
                      <ScrollbarRoot
                        style={{
                          maxHeight: "600px",
                        }}
                      >
                        <GlobalDisplayFlexColumnBox
                          width={"100%"}
                          gap={"16px"}
                          sx={{ my: "10px", px: "12px" }}
                        >
                          {products?.length > 0 &&
                            products?.map(
                              (product: productInterface, i: number) => (
                                <ProductCard
                                  setOpenDialog={setOpenDialog}
                                  setProduct={setProduct}
                                  key={product?.id}
                                  product={product}
                                />
                              )
                            )}
                        </GlobalDisplayFlexColumnBox>
                      </ScrollbarRoot>
                      {/*  case of loading data */}
                      {isloading && products?.length === 0 && (
                        <LoadingComponent />
                      )}
                      {/*  case of empty products data */}
                      {!isloading && products?.length === 0 && (
                        <EmptyData img={emptyProductsImg?.src} />
                      )}
                    </GlobalDisplayFlexColumnBox>
                  </CustomPaperBigCard>
                </GlobalDisplayFlexColumnBox>
              </Grid>
              <Grid item md={4} xs={12}>
                <Cartsection />
              </Grid>
            </Grid>
          </CustomPaperBigCard>
        </PublicContainer>
      )}

      <SubProductModel
        handelClose={handelCloseModal}
        product={Product}
        openDialog={openDialog}
      />
    </>
  );
};

export default ProductsPage;
