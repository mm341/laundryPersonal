import { AccountRegister } from "@/interfaces/FormRegisterInterface";
import MainApi from "../api/MainApi";
export const AuthApi = {
  signUp: (formData: AccountRegister) => {
    return MainApi.post("register", formData);
  },
  signIn: (formData: { phone?: string }) => {
    return MainApi.post("login", formData);
  },
};
