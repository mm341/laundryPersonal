import { productInterface, sub_products } from "@/interfaces/ProductInterface";
import { useAppSelector } from "@/redux/store";
import {
  CustomStackFullWidth,
  GlobalButton,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import {
  Divider,
  ListItem,
  ListItemText,
  Modal,
  Radio,
  Skeleton,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SimpleBar from "simplebar-react";
import { Scrollbar } from "../GlobalComponent/Scrollbar";

const SubProductModel = ({
  openDialog,
  handelClose,
  product,
  setSubProductId,
  subproductId,
  HandelAddProductWithSubProductId,
}: {
  setSubProductId: (e: string) => void;
  subproductId: string;
  openDialog: boolean;
  handelClose: () => void;
  product: productInterface;
  HandelAddProductWithSubProductId: () => void;
}) => {
  //  HOOKS
  const { t } = useTranslation();
  const theme = useTheme();
  //  master data
  const { master } = useAppSelector((state) => state.master);
  //  cartList data
  const { isLoadingAddToCart } = useAppSelector((state) => state.cartList);
  //  style of modal
  const style = {
    position: "absolute",
    top: { md: "50%", xs: "56%" },
    left: "50%",
    transform: "translate(-50%, -50%)",

    width: { md: "467px", xs: "90%" },
    bgcolor: "background.paper",
    border: "1px solid white",
    boxShadow: 24,
    height: { md: "430px", xs: "80%" },

    borderRadius: "10px",
    p: 3,
  };

  useEffect(() => {
    setSubProductId(product?.sub_products[0]?.id);
  }, [product]);

  //  handel action add to cart
  const handelAddToCART = () => {
    HandelAddProductWithSubProductId();
    !isLoadingAddToCart && handelClose();
  };
  return (
    <Modal
      open={openDialog}
      onClose={handelClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Stack sx={style}>
        <GlobalDisplayFlexColumnBox width={"100%"} gap={"20px"}>
          <GlobalDisplayFlexColumnBox width={"100%"} gap={"10px"}>
            <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
              {product?.name}
            </Typography>
            <Divider orientation="horizontal" />
          </GlobalDisplayFlexColumnBox>
          <Scrollbar
            style={{
              maxHeight: "270px",
            }}
          >
            <GlobalDisplayFlexColumnBox width={"100%"} gap={"12px"}>
              {product?.sub_products?.map((e: sub_products, i: number) => (
                <ListItem
                  onClick={() => setSubProductId(e?.id)}
                  key={i}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "white",
                    alignItems: "center",
                    boxShadow: "0px 6px 10px 0px #0000000D",
                    borderRadius: "4px",
                  }}
                  selected={e.id === subproductId}
                >
                  <CustomStackFullWidth
                    sx={{
                      display: "flex",
                      flexDirection: {
                        sm: "row",
                        xs: "column",
                      },
                      alignItems: "center",
                    }}
                  >
                    <ListItemText
                      secondary={
                        <GlobalDisplayFlexBox sx={{gap:"10px"}} >
                          {/*  img */}

                          <img loading="lazy" alt="img" src={e?.image_path} style={{width:"80px",height:"80px",borderRadius:"4px"}}/>

                          {/*  name and price and descrbtion */}
                          <GlobalDisplayFlexColumnBox
                            width={"100%"}
                            sx={{gap:{md:"8px",xs:"3px"}}}
                          >
                            <Typography
                              sx={{ fontSize: "16px", fontWeight: "500" }}
                            >
                              {e?.name}
                            </Typography>

                            <Typography
                              sx={{ fontSize: "12px", fontWeight: "500",opacity:"0.65" }}
                            >
                              {e?.description}
                            </Typography>
                            {/*  current price afyer discount */}
                            <GlobalDisplayFlexBox
                            style={{flexDirection:"row"}}
                              sx={{ justifyContent: "flex-start", gap: {md:"2px",xs:"4px"} }}
                            >
                              <Typography
                                sx={{ fontSize: "14px", fontWeight: "400" }}
                              >
                                {e?.price}
                              </Typography>

                              <Typography
                                sx={{ fontSize: "14px", fontWeight: "400" }}
                              >
                                {master?.currency}
                              </Typography>
                            </GlobalDisplayFlexBox>

                            {/*  old price */}
                            {e?.old_price > 0 && (
                              <GlobalDisplayFlexBox
                              style={{flexDirection:"row"}}
                                sx={{
                                  justifyContent: "flex-start",
                                  gap:"10px",
                                }}
                              >
                                 <GlobalDisplayFlexBox
                              style={{flexDirection:"row"}}
                                sx={{
                                  justifyContent: "flex-start",
                                  gap:{md:"2px",xs:"2px"},
                                  width:{md:"30%",xs:"40%"}
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    color: "#999999",
                                    textDecoration: "line-through",
                                  }}
                                >
                                  {e?.old_price}
                                </Typography>

                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    color: "#999999",
                                    textDecoration: "line-through",
                                  }}
                                >
                                  {master?.currency}
                                </Typography>
                                </GlobalDisplayFlexBox>
                                <Typography
                                  sx={{
                                    color: "#38AE04",
                                    fontSize: "13px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {e?.discount_percentage} % {t("Off")}
                                </Typography>
                              </GlobalDisplayFlexBox>
                            )}
                          </GlobalDisplayFlexColumnBox>
                        </GlobalDisplayFlexBox>
                      }
                    />
                    <Radio
                      checked={e.id === subproductId}
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      color={"primary"}
                    />
                  </CustomStackFullWidth>
                </ListItem>
              ))}
            </GlobalDisplayFlexColumnBox>
          </Scrollbar>
          <GlobalDisplayFlexBox
            sx={{ justifyContent: "flex-end" }}
            gap={"40px"}
          >
            <Typography
              sx={{
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "400",
                color: theme.palette.primary.main,
              }}
              onClick={handelClose}
            >
              {t("Cancel")}
            </Typography>

            {!isLoadingAddToCart ? (
              <GlobalButton
                py={""}
                px={"0"}
                width={"102px"}
                height={"32px"}
                sx={{
                  borderRadius: "4px",
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
                onClick={handelAddToCART}
              >
                + {t("Add")}
              </GlobalButton>
            ) : (
              <Skeleton variant="text" width="50px" height={10} />
            )}
          </GlobalDisplayFlexBox>
        </GlobalDisplayFlexColumnBox>
      </Stack>
    </Modal>
  );
};

export default SubProductModel;
