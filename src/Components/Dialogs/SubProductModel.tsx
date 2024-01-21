import { productInterface, sub_products } from "@/interfaces/ProductInterface";
import { useAppSelector } from "@/redux/store";
import {
  CustomStackFullWidth,
  GlobalButton,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import {
  Box,
  Divider,
  ListItem,
  ListItemText,
  Modal,
  Radio,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import SimpleBar from "simplebar-react";
import { Scrollbar } from "../GlobalComponent/Scrollbar";

const SubProductModel = ({
  openDialog,
  handelClose,
  product,
}: {
  openDialog: boolean;
  handelClose: () => void;
  product: productInterface;
}) => {
  //  HOOKS
  const { t } = useTranslation();
  const theme = useTheme();
  //  master data
  const { master } = useAppSelector((state) => state.master);
  //  style of modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    width: { md: "467px", xs: "340px" },
    bgcolor: "background.paper",
    border: "1px solid white",
    boxShadow: 24,
    height: { md: "430px", xs: "480px" },

    borderRadius: "10px",
    p: 3,
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
                  key={i}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "white",
                    alignItems: "center",
                    boxShadow: "0px 6px 10px 0px #0000000D",
                    borderRadius: "4px",
                  }}
                  // selected={adres.id === id}
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
                        <GlobalDisplayFlexColumnBox width={"100%"} gap={"5px"}>
                          <Typography
                            sx={{ fontSize: "16px", fontWeight: "500" }}
                          >
                            {e?.name}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: "400" }}
                          >
                            {e?.price}
                            {master?.currency}
                          </Typography>
                        </GlobalDisplayFlexColumnBox>
                      }
                    />
                    <Radio
                      //   checked={Number(adres.id) === Number(id)}
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      color={"success"}
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
              onClick={handelClose}
            >
              + {t("Add")}
            </GlobalButton>
          </GlobalDisplayFlexBox>
        </GlobalDisplayFlexColumnBox>
      </Stack>
    </Modal>
  );
};

export default SubProductModel;
