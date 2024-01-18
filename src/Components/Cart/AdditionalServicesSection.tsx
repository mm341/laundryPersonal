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
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const AdditionalServicesSection = ({
  additionalSercvices,
}: {
  additionalSercvices: AdditionalServicesInterface[];
}) => {
  //  hooks
  const { t } = useTranslation();
  const theme = useTheme();
  const [choicesIds, setChoicesIds] = useState<number[]>([]);
  //  master data
  const { master } = useAppSelector((state) => state.master);
  const [choice, setChoice] = useState("no");

  console.log(choicesIds);
  return (
    <GlobalDisplayFlexColumnBox width={"100%"} gap={"25px"} sx={{ px: "18px" }}>
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
                  // onClick={() => {
                  //   // const { value, checked } = e.target;
                  //   if (choicesIds?.includes(e?.id)) {
                  //     setChoicesIds((pre) => [
                  //       ...pre.filter((skill) => skill !== e?.id),
                  //     ]);
                  //   } else {
                  //     setChoicesIds((pre) => [...pre, e?.id]);
                  //   }
                  // }}
                  onClick={() => {
                    if (choicesIds?.includes(e?.id)) {
                      setChoicesIds((pre) => [
                        ...pre.filter((skill) => skill !== e?.id),
                      ]);
                    }
                  }}
                  control={<Radio checked={!choicesIds?.includes(e?.id)} />}
                  label={t("No")}
                  // checked={choice === "no"}
                />
                <FormControlLabel
                  value={e?.id}
                  onClick={() => {
                    if (!choicesIds?.includes(e?.id)) {
                      setChoicesIds((pre) => [...pre, e?.id]);
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
  );
};

export default AdditionalServicesSection;
