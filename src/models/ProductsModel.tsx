import { productInterface } from "@/interfaces/ProductInterface";
import { VariantInterface } from "@/interfaces/VariantInterface";

export type ProductsModel = {
  isloading: boolean;
  products: productInterface[];
  variants: VariantInterface[];
};
