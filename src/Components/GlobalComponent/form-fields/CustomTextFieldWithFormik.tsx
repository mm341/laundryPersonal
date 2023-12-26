import React, { useState } from "react";
//import PropTypes from 'prop-types'
import { CustomTextFieldStyle } from "./CustomTextField.style";
import { InputAdornment, useTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { CustomTextFieldContainer } from "@/styles/PublicStyles";

interface textField {
  label?: string;
  type?: string;
  required?: boolean;
  touched?: boolean;
  errors?: string;
  value?: string;
  fieldProps?: object;
  multiline?: boolean;
  onChangeHandler?: (e: string) => void;
  rows?: number;
  disabled?: boolean;
  languagedirection?: string;
  comment?: boolean;
  rate?:boolean
}
const CustomTextFieldWithFormik = (props: textField) => {
  const {
    label,
    type,
    required,
    touched,
    errors,
    value,
    fieldProps,
    multiline,
    onChangeHandler,
    rows,
    disabled,
    languagedirection,
    comment,
    rate
  } = props;
  const theme = useTheme();
  const [inputValue, setInputValue] = useState<string>(value ?? "");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const onChangeHandlerForField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    //onChangeHandler(e.target.value)
  };
  const onBlurHandler = () => {
    // onChangeHandler(inputValue);
  };
// theme.palette.secondary.contrastText
  const renderHandler = () => {
    if (type === "password") {
      return (
        <CustomTextFieldContainer>
          <CustomTextFieldStyle
        
            theme={theme}
            // autoComplete="off"
            autoComplete="new-password"
            languagedirection={languagedirection}
            disabled={disabled}
            fullWidth
            multiline={multiline}
            rows={rows ? rows : 4}
            label={label}
            name={label}
            required={required}
            error={Boolean(touched && errors)}
            helperText={touched && errors}
            value={inputValue}
            onChange={onChangeHandlerForField}
            onBlur={onBlurHandler}
            type={showPassword ? "text" : type}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...fieldProps}
          />
        </CustomTextFieldContainer>
      );
    } else {
      return (
        <CustomTextFieldContainer>
          <CustomTextFieldStyle
            rate={rate}
            languagedirection={undefined}
            theme={theme}
            // autoComplete="off"
            autoComplete="new-password"
            disabled={disabled}
            // fullWidth
            sx={{
              color:"black" ,
              width: comment ? { sm: "40%", xs: "80%" } : "100%",
              mx: "auto",
            }}
            multiline={multiline}
            rows={rows ? rows : 6}
            label={label}
            name={label}
            required={required}
            error={Boolean(touched && errors)}
            helperText={touched && errors}
            value={inputValue}
            onChange={onChangeHandlerForField}
            onBlur={onBlurHandler}
            type={type}
            {...fieldProps}
          />
        </CustomTextFieldContainer>
      );
    }
  };
  return <Box sx={{ width: "100%", height: "60px" }}>{renderHandler()}</Box>;
};

export default CustomTextFieldWithFormik;
