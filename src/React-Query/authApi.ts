import { AccountRegister } from "@/interfaces/FormRegisterInterface";
import MainApi from "../api/MainApi";
export const AuthApi = {
  signUp: (formData: AccountRegister) => {
    return MainApi.post("register", formData);
  },
  signIn: (formData: { mobile?: string|undefined }) => {
    return MainApi.post("login", formData);
  },
  verify_phone: (formData: { mobile: string|undefined; otp: string }) => {
    return MainApi.post("verify-mobile/otp", formData);
  },

  verify_phoneUpdate: (formData: { otp: string }) => {
    return MainApi.post("customer/profile/verify-mobile-profile", formData);
  },
};
