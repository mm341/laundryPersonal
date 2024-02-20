import { VariantInterface } from "./VariantInterface";
import { initialServiceData, serviceInterface } from "./serviceInterface";

export const initialProductData = () => {
  return {
    parent_id:"",
    discounted_price:0,
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
    cart_old_price:[]
   
  };
};

export interface sub_products {
  description?: string;
  id?: string;
  name?:string;
  price?: number;
  old_price?:number
  discount_percentage?:number
  parent_id?:string
  quantity?:number
}
export interface productInterface {
  parent_id: string;
  discounted_price?:number
  current_price: number[];
  description: string;
  discount_percentage: null;
  id: string;
  image_path: string;
  name: string;
  name_bn: string;
  old_price:number[];
  service: serviceInterface;
  slug: null;
  sub_products: sub_products[];
  variant: VariantInterface;
  quantity:number
  cart_old_price:number[]
}
