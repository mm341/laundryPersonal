import { VariantInterface } from "./VariantInterface";
import { initialServiceData, serviceInterface } from "./serviceInterface";

export const initialProductData = () => {
  return {
    current_price: [],
    description: "",
    discount_percentage: null,
    id: "",
    image_path: "",
    name: "",
    name_bn: "",
    old_price: [],
    service: initialServiceData(),
    slug: null,
    sub_products: [],
    variant: { id: "", name: "", name_bn: "" },
    quantity:0,
   
  };
};

export interface sub_products {
  description: string;
  id: string;
  name:string;
  price: number;
  old_price:number
  discount_percentage:number
}
export interface productInterface {
  current_price: number[];
  description: string;
  discount_percentage: null;
  id: string;
  image_path: string;
  name: string;
  name_bn: string;
  old_price: number[];
  service: serviceInterface;
  slug: null;
  sub_products: sub_products[];
  variant: VariantInterface;
  quantity:number
}
