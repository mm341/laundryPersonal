export const initialAdditionalServices = () => {
  return {
    description: "",
    description_bn: "",
    id: "",
    price: 0,
    title: "",
    title_bn: "",
    name:"",
  };
};

export interface AdditionalServicesInterface {
  name:string
  description: string;
  description_bn: string;
  id: string;
  price: number;
  title: string;
  title_bn: string;
}
