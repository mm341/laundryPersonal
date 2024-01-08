import { VariantInterface } from "./VariantInterface";
import { initialServiceData, serviceInterface } from "./serviceInterface";

export const initialProductData = () => {
  return {
    current_price: 0,
    description: "",
    discount_percentage: null,
    id: 0,
    image_path: "",
    name: "",
    name_bn: "",
    old_price: 0,
    service: initialServiceData(),
    slug: null,
    sub_products: [],
    variant: { id: 0, name: "", name_bn: "" },
  };
};

export interface sub_products {
  description: string;
  id: number;
  name:string;
  price: number;
}
export interface productInterface {
  current_price: number;
  description: string;
  discount_percentage: null;
  id: number;
  image_path: string;
  name: string;
  name_bn: string;
  old_price: number;
  service: serviceInterface;
  slug: null;
  sub_products: sub_products[];
  variant: VariantInterface;
}
