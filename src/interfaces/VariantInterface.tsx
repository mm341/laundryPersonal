export const initialVariantData = () => {
  return {
    id: "",
    name: "",
    name_bn: "",
    image_path:""
  };
};

export interface VariantInterface {
  id: string;
  name: string;
  name_bn: string;
  image_path: string;
}
