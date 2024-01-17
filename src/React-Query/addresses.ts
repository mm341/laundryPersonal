
import MainApi from "../api/MainApi";
export const Addresse = {
 

  GetAddreesse: () => {
    return MainApi.get("customer/addresses");
  },
};
