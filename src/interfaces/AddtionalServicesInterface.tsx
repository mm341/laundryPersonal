export const initialAdditionalServices = () => {
  return {
    description: "",
    description_bn: "",
    id: 0,
    price: 0,
    title: "",
    title_bn: "",
  };
};

export interface AdditionalServicesInterface {
  description: string;
  description_bn: string;
  id: number;
  price: number;
  title: string;
  title_bn: string;
}
