import { t } from "i18next";
import { toast } from "react-hot-toast";
import Router from "next/router";

export default class PublicHandelingErrors {
  public static onErrorResponse = (
    error: unknown | any,
    variables?: { contact?: string | undefined; rating?: number | null } | any
  ) => {
    if (error?.response?.data?.errors?.length > 0) {
      error?.response?.data?.errors?.forEach((item: any) => {
        toast.error(item);
      });
      this.handleTokenExpire(error?.response?.status);
    } else if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message);
      this.handleTokenExpire(error?.response?.status);
    } else if (error?.response?.data?.error) {
      toast.error(error?.response?.data?.error);
      this.handleTokenExpire(error?.response?.status);
    }
  };

  public static handleTokenExpire = (status: number) => {
    if (status === 401) {
      if (window?.localStorage.getItem("token")) {
        toast.error(t("Your token has been expired. Please sign in again"));
        Router.push("/");
        // onClose?.();
        // localStorage.clear();
        localStorage.removeItem("token");
        toast.success(t("Logout Successfully"));
      }
    }
  };
}
