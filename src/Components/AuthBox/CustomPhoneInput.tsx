import PhoneInput from "react-phone-input-2";
import React, { useState } from "react";

import { useTheme } from "@mui/material/styles";

import { useTranslation } from "react-i18next";

import { CustomStackFullWidth, CustomTypography } from "@/styles/PublicStyles";
import { useRouter } from "next/router";

interface customPhoneInput {
  value: string|undefined;
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
  touched,
  errors,
  isLoading,
  
}: customPhoneInput) => {

   //  hooks
   const { t } = useTranslation();
   const theme = useTheme();
   const [focus, setFocus] = useState<boolean>(false);


  //   on change function
  const changeHandler = (e: string) => {
    onHandleChange(e);
  };
 

  return (
    <CustomStackFullWidth dir="ltr" alignItems="flex-start" spacing={0.8}>
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
          height: "56px",
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
