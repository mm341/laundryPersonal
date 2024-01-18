import React from "react";
import { Grid } from "@mui/material";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { AccountUpdate } from "@/interfaces/FormUpdateAccountInterface";
import BasicInformationForm from "./BasicInformationForm";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { SaveProfileData, Updating } from "@/redux/slices/HandelUpdateProfile";
import MainApi, { baseUrl } from "@/api/MainApi";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import PublicHandelingErrors from "@/utils/PublicHandelingErrors";
const BasicInformation = () => {
  //  hooks

  const dispatch = useAppDispatch();

  const { accountInfo } = useAppSelector((state) => state.profile);
  const [loading, setLoading] = useState<boolean>(false);

  //  get token from localstorage
  let token: string | null = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  // const formSubmitHandler = (values: AccountUpdate) => {
  //   const { name, mobile, alternative_phone, profile_photo } = values;

  //   // if (first_name || mobile || alternative_phone || profile_photo) {
  //   let formData = new FormData();

  //   if (name) {
  //     formData.append("name", name);
  //   }

  //   if (mobile) {
  //     formData.append("mobile", mobile);
  //   }

  //   if (alternative_phone) {
  //     formData.append("alternative_phone", alternative_phone);
  //   }

  //   if (profile_photo) {
  //     formData.append("profile_photo", profile_photo);
  //   }

  //   if (name || mobile || alternative_phone || profile_photo) {
  //     if (token) {
  //       setLoading(true);
  //       axios
  //         .postForm(`${baseUrl}users/update`, formData, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "multipart/form-data", // Assuming you are sending form data
  //           },
  //         })
  //         .then((res) => {
  //           if (res) {
  //             setLoading(false);
  //             toast.success(res.data.message);
  //             dispatch(SaveProfileData(res?.data?.data?.user));
  //           }
  //         })
  //         .catch((err) => {
  //           setLoading(false);
  //           PublicHandelingErrors.onErrorResponse(err);
  //         });
  //     }
  //   }
  // };

  return (
    <Grid>
      <BasicInformationForm
        isloading={loading}
        accountInfo={accountInfo}
       
      />
    </Grid>
  );
};

export default BasicInformation;
