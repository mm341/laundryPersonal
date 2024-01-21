import { AdditionalServicesInterface } from "@/interfaces/AddtionalServicesInterface";
import { useAppSelector } from "@/redux/store";
import {
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const AdditionalServicesSection = ({
  additionalSercvices,
  choicesIds,
  setChoicesIds,
}: {
  choicesIds: number[];
  setChoicesIds: any;
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
        gap={"25px"}
        sx={{ px: "18px" }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
          {t("Additional Service")}
        </Typography>
        <GlobalDisplayFlexColumnBox width={"100%"} gap={"20px"}>
          {additionalSercvices?.map((e, i) => (
            <GlobalDisplayFlexColumnBox key={i}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: theme.palette.secondary.contrastText,
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
                {/*   choice yes or no */}
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  // defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value={e?.id}
                    onClick={() => {
                      if (choicesIds?.includes(e?.id)) {
                        setChoicesIds((pre: number[]) => [
                          ...pre.filter((skill: number) => skill !== e?.id),
                        ]);
                      }
                    }}
                    control={<Radio checked={!choicesIds?.includes(e?.id)} />}
                    label={t("No")}
                  />
                  <FormControlLabel
                    value={e?.id}
                    onClick={() => {
                      if (!choicesIds?.includes(e?.id)) {
                        setChoicesIds((pre: number[]) => [...pre, e?.id]);
                      }
                    }}
                    control={<Radio checked={choicesIds?.includes(e?.id)} />}
                    label={t("Yes")}
                  />
                </RadioGroup>

                <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
                  {e?.price} {master?.currency}
                </Typography>
              </GlobalDisplayFlexBox>
            </GlobalDisplayFlexColumnBox>
          ))}
        </GlobalDisplayFlexColumnBox>
      </GlobalDisplayFlexColumnBox>
    )
  );
};

export default AdditionalServicesSection;
