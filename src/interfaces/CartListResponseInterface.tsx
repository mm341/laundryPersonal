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
    sub_total: 0,
    coupon: 0,
    delivery_fee: 0,
    total_order_amount:0,
    discount:0
  };
};

export interface CartListInterface {
  cart_details: Cart_details;
  sub_total: number;
  coupon?: number;
  delivery_fee: number;
  total_order_amount: number;
  discount:number
}
