import PhoneInput from "react-phone-input-2";
import React, { ChangeEvent, useEffect, useState } from "react";

import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

import { CustomStackFullWidth, CustomTypography } from "@/styles/PublicStyles";
import { useRouter } from "next/router";

// const useStyles = makeStyles((theme) => ({
//   borderClass: ({ theme, focus, languagedirection, rtlChange }) => ({
//     "&.react-tel-input .special-label": {
//       color: focus ? theme.palette.primary.main : theme.palette.neutral[1000],
//       left: languagedirection === "rtl" ? "80%" : "10px",
//       background: "white",
//     },
//     "&.react-tel-input .form-control": {
//       background: theme.palette.neutral[100],
//       color: theme.palette.neutral[1000],
//       padding:
//         languagedirection === "rtl"
//           ? "18.5px 58px 18.5px 10px"
//           : "18.5px 14px 18.5px 52px",
//     },
//     "&.react-tel-input .flag-dropdown": {
//       left: languagedirection === "rtl" ? "10% !important" : "10px !important",
//     },
//     "&.react-tel-input .form-control:focus": {
//       borderColor: theme.palette.primary.main,
//       borderWidth: "2px",
//       zIndex: 999,
//       boxShadow: "none",
//     },
//     "&.react-tel-input .country-list .country-name": {
//       color: "#000000",
//     },
//     "&.react-tel-input .selected-flag": {
//       padding: languagedirection === "rtl" ? "0 25px 0 11px" : " 0 0px 0 11px",
//     },
//     "&.react-tel-input .selected-flag .arrow": {
//       left: languagedirection === "rtl" ? "13px" : "29px",
//     },
//   }),
// }));
interface customPhoneInput {
  value: string;
  onHandleChange: (e: string) => void;

  touched: boolean | undefined;
  errors: string | undefined;
  isLoading?: boolean;
  wallet?: boolean;
  rtlChange: boolean;
}
const CustomPhoneInput = ({
  value,
  onHandleChange,
  rtlChange,
  touched,
  errors,
  isLoading,
  wallet,
}: customPhoneInput) => {
  const changeHandler = (e: string) => {
    onHandleChange(e);
  };
  const { t } = useTranslation();
  const { locale } = useRouter();
  const theme = useTheme();
  const [languagedirection, setlanguagedirection] = useState<string>("ltr");
  const [focus, setFocus] = useState<boolean>(false);

  // const classes = useStyles({ theme, focus, languagedirection, rtlChange });
  useEffect(() => {
    if (locale === "en") {
      setlanguagedirection("ltr");
    } else {
      setlanguagedirection("rtl");
    }
  }, [locale]);

 
  return (
    <CustomStackFullWidth alignItems="flex-start" spacing={0.8}>
      <PhoneInput
        autoFormat={false}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={t("Enter phone number")}
        value={value}
        disabled={isLoading}
        enableSearch
        onChange={changeHandler}
        inputProps={{
          required: true,
          autoFocus: false,
        }}
        specialLabel={t("Phone")}
        country={"sa"}
        // disableCountryCode
        countryCodeEditable={false}
        disableSearchIcon
        // disableCountryGuess
        autocompleteSearch={false}
        onlyCountries={["sa", "eg"]}
        searchStyle={{ margin: "0", width: "95%", height: "50px" }}
        inputStyle={{
          width: "100%",
          height:  "56px",
        }}
        // containerClass={classes.borderClass}
        dropdownStyle={{ height: "300px", width: "267px" }}
        //  disableDropdown="false"
      />
      {touched && errors && (
        <CustomTypography
          variant="caption"
          sx={{
            ml: "10px",
            fontWeight: "inherit",
            color: theme.palette.error.main,
          }}
        >
          {errors}
        </CustomTypography>
      )}
    </CustomStackFullWidth>
  );
};
export default CustomPhoneInput;
