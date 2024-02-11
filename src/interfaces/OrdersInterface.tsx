import { AccountInfo, inititalAccountInfo } from "./AccountInfo";
import { AddresseInterface, initialAddresse } from "./AddresseInterface";
import { AdditionalServicesInterface } from "./AddtionalServicesInterface";
import { productInterface } from "./ProductInterface";

export const inititalOrdersInterface = () => {
  return {
    address: initialAddresse(),
    amount: 0,
    customer: {
      addresses: [],
      stripe_id: "",
      user: inititalAccountInfo(),
    },
    additionals:[],
    delivery_charge: 0,
    delivery_date: "",
    delivery_hour: "",
    discount: 0,
    driver_status: null,
    drivers: false,
    id: 0,
    item: 0,
    order_code: "",
    order_status: "",
    order_status_bn: "",
    ordered_at: "",
    payment: null,
    payment_status: "",
    payment_status_bn: "",
    payment_type: "",
    payment_type_bn: "",
    payment_url: null,
    pick_date: "",
    pick_hour: null,
    products: [],
    quantity: {},
    rating: 0,
    total_amount: 0,
  };
};

export interface Quantity {
  [key: number]: number;
}
export interface OrdersInterface {
  address: AddresseInterface;
  amount: number;
  customer: {
    addresses: AddresseInterface[];
    stripe_id: string;
    user: AccountInfo;
  };
  additionals:AdditionalServicesInterface[]
  delivery_charge: number;
  delivery_date: string;
  delivery_hour: string;
  discount: number;
  driver_status: null;
  drivers: boolean;
  id: number;
  item: number;
  order_code: string;
  order_status: string;
  order_status_bn: string;
  ordered_at: string;
  payment: null;
  payment_status: string;
  payment_status_bn: string;
  payment_type: string;
  payment_type_bn: string;
  payment_url: null;
  pick_date: string;
  pick_hour: null;
  products: productInterface[];
  quantity: Quantity;
  rating: number;
  total_amount: number;
}
