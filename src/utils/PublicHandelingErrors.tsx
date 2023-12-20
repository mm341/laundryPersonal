import { t } from "i18next";
import { toast } from "react-hot-toast";
import Router from "next/router";
const handleTokenExpire = (status: number) => {
  if (status === 401) {
    if (window?.localStorage.getItem("token")) {
      toast.error(t("Your token has been expired. Please sign in again"));
      Router.push("/");
      localStorage.clear();
    }
  }
};

export const onErrorResponse = (
  error: unknown | any,
  variables: { phone?: string | undefined }
) => {
  if (error?.response?.data?.errors?.length > 0) {
    error?.response?.data?.errors?.forEach((item: any) => {
      toast.error(item?.message);
      // alert(item?.message)
    });
  } else if (error?.response?.data?.message) {
    toast.error(error?.response?.data?.message);
  } else if (error?.response?.data?.error) {
    toast.error(error?.response?.data?.error);
  }

  // setIsLoading(false)
  handleTokenExpire(error?.response?.status);
};
