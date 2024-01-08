export const initialServiceData = () => {
  return {
    description: null,
    description_bn: null,
    id: 0,
    image_path: "",
    name: "",
    name_bn: null,
  };
};

export interface serviceInterface {
  description: null | string;
  description_bn: null;
  id: number;
  image_path: string;
  name: string;
  name_bn: null;
}
