import { number } from "yup";
import { AdditionalServicesInterface } from "./AddtionalServicesInterface";
import { productInterface } from "./ProductInterface";

export interface Cart_details {
  cart_id: string;
  products: productInterface[];
  additionals: AdditionalServicesInterface[];
}

export const initialCart_details = () => {
  return {
    cart_id: "",
    products: [],
    additionals: [],
  };
};

export const initialCartList = () => {
  return {
    cart_details: initialCart_details(),
    sub_total: "",
    coupon: 0,
    delivery_fee: "",
    total_order_amount: "",
    discount:0
  };
};

export interface CartListInterface {
  cart_details: Cart_details;
  sub_total: string;
  coupon?: number;
  delivery_fee: string;
  total_order_amount: string;
  discount:number
}
