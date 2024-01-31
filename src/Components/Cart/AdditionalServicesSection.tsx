import { AdditionalServicesInterface } from "@/interfaces/AddtionalServicesInterface";
import { useAppSelector } from "@/redux/store";
import {
  CustomPaperBigCard,
  GlobalButton,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Scrollbar } from "../GlobalComponent/Scrollbar";

const AdditionalServicesSection = ({
  additionalSercvices,
}: {
  additionalSercvices: AdditionalServicesInterface[];
}) => {
  //  hooks
  const { t } = useTranslation();
  const theme = useTheme();

  //  master data
  const { master } = useAppSelector((state) => state.master);

  return (
    additionalSercvices?.length > 0 && (
      <GlobalDisplayFlexColumnBox
        width={"100%"}
        gap={"26px"}
        sx={{ px: "18px" }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
          {t("Additional Service")}
        </Typography>
        <Scrollbar
          style={{
            maxHeight: "200px",
          }}
        >
          <GlobalDisplayFlexColumnBox width={"95%"} sx={{width:"99%",mx:"auto",my:"5px"}} gap={"24px"}>
            {additionalSercvices?.map((e, i) => (
              <CustomPaperBigCard
                key={i}
                sx={{
                  backgroundColor: "white",
                  boxShadow: "0px 6px 20px 0px #0000001A",
                  
                }}
              >
                <GlobalDisplayFlexBox>
                  {/*  price and name */}
                  <GlobalDisplayFlexColumnBox gap={"20px"}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "black",
                      }}
                    >
                      {e?.title}
                    </Typography>
                    <GlobalDisplayFlexBox
                      sx={{
                        gap: { md: "85px", xs: "20px" },
                        justifyContent: "flex-start",
                      }}
                    >
                      <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
                        {e?.price} {master?.currency}
                      </Typography>
                    </GlobalDisplayFlexBox>
                  </GlobalDisplayFlexColumnBox>

                  {/*  add butoon */}
                  <GlobalButton
                    py={""}
                    px={"0"}
                    width={"102px"}
                    height={"32px"}
                    sx={{
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                      border: `2px solid ${theme.palette.primary.main}`,
                      color: theme.palette.primary.main,
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    + {t("Add")}{" "}
                  </GlobalButton>
                </GlobalDisplayFlexBox>
              </CustomPaperBigCard>
            ))}
          </GlobalDisplayFlexColumnBox>
        </Scrollbar>
      </GlobalDisplayFlexColumnBox>
    )
  );
};

export default AdditionalServicesSection;
