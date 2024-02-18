import GroupButtonsVariants from "@/Components/GlobalComponent/GroupButtonsVariants";
import PublicContainer from "@/Components/PublicContainer";
import {
  GetAddtionalServices,
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
  CssBaseline,
  Fade,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import emptyProductsImg from "../../../public/products/empty products.png";
import emptyProductsArabicImg from "../../../public/products/empty productsArabic.png";
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

import SubProductModel from "@/Components/Dialogs/SubProductModel";
import dynamic from "next/dynamic";
import CustomLoaderPage from "@/Components/GlobalComponent/CustomLoaderPage";
import Meta from "@/Components/GlobalComponent/Meta";
import { Scrollbar } from "@/Components/GlobalComponent/Scrollbar";
import MainApi from "@/api/MainApi";
import { HomeServices } from "@/interfaces/HomeServices";
import { HomeAreas } from "@/interfaces/HomeAreas";
import { Master } from "@/interfaces/MasterInterface";
import { FooterSocialLinks } from "@/interfaces/FooterSocialLinks";
import {
  CashAreas,
  CashServices,
  GetAllBanners,
} from "@/redux/slices/Services";
import { CashFooterLinks, CashMasterData } from "@/redux/slices/MasterSlice";
import BannersSection from "@/Components/Banners/BannersSection";
import AdditionalServicesSection from "@/Components/Cart/AdditionalServicesSection";
import { AddToCart, GetCartDetails } from "@/redux/slices/CartSlice";
import HandelNotification from "@/Components/GlobalComponent/HandelNotification";
const ProductsPage = ({
  homeServices,
  homeAreas,
  masterData,
  footerSocialLinks,
}: {
  homeServices: HomeServices[];
  homeAreas: HomeAreas[];
  masterData: Master;
  footerSocialLinks: FooterSocialLinks[];
}) => {
  //  hooks
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = useRouter();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [searchText, setSearchText] = useState<string>("");
  const [subproductId, setSubProductId] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [quantityForRequest, setQuantityForAddRequest] = useState<number>(1);
  let [loading, setLoading] = useState<boolean>(false);
  const [choicesIds, setChoicesIds] = useState<number[]>([]);
  const [Product, setProduct] = useState<productInterface>(
    initialProductData()
  );
  //  selectors

  const { products, variants, isloading, additionalSercvices } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (products?.length > 0) {
      if (products[0]?.service?.name) {
        localStorage.setItem("service", products[0]?.service?.name);
      }
    }
  }, [products]);
  //     complete hooks
  const [type, setType] = useState<string>(variants[0]?.id);
  useEffect(() => {
    if (router.query.service_id) {
      dispatch(GetVariants({ serviceId: router.query.service_id }));
      dispatch(GetAddtionalServices());
    }
  }, [dispatch, router.query.service_id]);

  //    handel initial value of variant type
  useEffect(() => {
    if (variants?.length > 0) {
      setType(variants[0]?.id);
    }
  }, [variants]);

  //  search action submit
  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchText) {
      dispatch(
        GetProductsWithSearch({
          serviceId: router.query.service_id,
          variantId: type,
          searchText: searchText,
        })
      );
    }
  };
  //  search action onChange
  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value) {
      setSearchText(e.target.value);
    } else {
      dispatch(
        GetProducts({
          serviceId: router.query.service_id,
          variantId: type,
        })
      );
    }
  };

  useEffect(() => {
    if (router.query.service_id && type) {
      dispatch(
        GetProducts({
          serviceId: router.query.service_id,
          variantId: type,
        })
      );
    }
  }, [router.query.service_id, type]);

  //  get all banners

  useEffect(() => {
    dispatch(GetAllBanners());
  }, []);

  //  get all CartList

  useEffect(() => {
    dispatch(GetCartDetails({}));
  }, []);

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

  if (typeof window !== "undefined") {
    localStorage.setItem("path", router.asPath);
  }

  //  cash areas
  useEffect(() => {
    dispatch(CashAreas(homeAreas));
  }, [dispatch, homeAreas]);

  //  cash services
  useEffect(() => {
    dispatch(CashServices(homeServices));
  }, [dispatch, homeServices, homeServices?.length]);

  //  cash master
  useEffect(() => {
    dispatch(CashMasterData(masterData));
  }, [dispatch, masterData]);

  //  cash footer Social Media Links
  useEffect(() => {
    dispatch(CashFooterLinks(footerSocialLinks));
  }, [dispatch, footerSocialLinks]);

  const HandelAddProductWithSubProductId = () => {
    dispatch(
      AddToCart({
        product_id: subproductId,
        quantity: quantityForRequest,
      })
    );
  };

  return (
    <>
      <Meta title={"services"} description="" keywords="" />
      <CssBaseline />
      <HandelNotification>
        {loading ? (
          <CustomLoaderPage loading={loading} />
        ) : (
          <PublicContainer>
            {/*  Banners */}
            <GlobalDisplayFlexColumnBox gap={"48px"}>
              <Box>
                <BannersSection />
              </Box>
              <CustomPaperBigCard
                sx={{
                  borderRadius: "10px",
                  backgroundColor: theme.palette.primary.dark,
                  my: "5px",
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
                                                serviceId:
                                                  router.query.service_id,
                                                variantId: type,
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

                          <Scrollbar
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
                                      setQuantityForAddRequest={
                                        setQuantityForAddRequest
                                      }
                                      setOpenDialog={setOpenDialog}
                                      setProduct={setProduct}
                                      key={product?.id}
                                      product={product}
                                    />
                                  )
                                )}
                            </GlobalDisplayFlexColumnBox>
                          </Scrollbar>
                          {/*  case of loading data */}
                          {isloading && products?.length === 0 && (
                            <LoadingComponent />
                          )}
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
                        </GlobalDisplayFlexColumnBox>
                      </CustomPaperBigCard>

                      <CustomPaperBigCard
                        sx={{ backgroundColor: "white", py: "20px", px: "0" }}
                      >
                        <AdditionalServicesSection
                          additionalSercvices={additionalSercvices}
                        />
                      </CustomPaperBigCard>
                    </GlobalDisplayFlexColumnBox>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Cartsection
                     
                      additionalSercvices={additionalSercvices}
                    />
                  </Grid>
                </Grid>
              </CustomPaperBigCard>
            </GlobalDisplayFlexColumnBox>
          </PublicContainer>
        )}
      </HandelNotification>
      <SubProductModel
        HandelAddProductWithSubProductId={HandelAddProductWithSubProductId}
        setSubProductId={setSubProductId}
        subproductId={subproductId}
        handelClose={handelCloseModal}
        product={Product}
        openDialog={openDialog}
      />
    </>
  );
};

export default ProductsPage;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  let homeServices = [];
  let homeAreas = [];
  let masterData = {};
  let footerSocialLinks = [];
  try {
    const configRes = await MainApi.get("services", {
      headers: {
        "Accept-Language": locale,
        locale: locale,
      },
    });
    homeServices = configRes?.data?.data?.services;
  } catch (e) {
    homeServices = [];
  }
  //  areas
  try {
    const Res = await MainApi.get("areas", {
      headers: {
        "Accept-Language": locale,
        locale: locale,
      },
    });

    homeAreas = Res?.data?.data?.areas;
  } catch (e) {
    homeAreas = [];
  }
  //  masterData
  try {
    const configRes = await MainApi.get("master", {
      headers: {
        "Accept-Language": locale,
        locale: locale,
      },
    });
    masterData = configRes?.data?.data;
  } catch (e) {
    masterData = {};
  }

  //  footerSocialLinks
  try {
    const configRes = await MainApi.get("social-link", {
      headers: {
        "Accept-Language": locale,
        locale: locale,
      },
    });
    footerSocialLinks = configRes?.data?.data?.socialLink;
  } catch (e) {
    footerSocialLinks = [];
  }

  return {
    props: {
      homeServices,
      homeAreas,
      masterData,
      footerSocialLinks,
    },
  };
};
