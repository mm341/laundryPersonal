
export const inititalMasterData = () => {
  return {
    android_url: "",
    currency: "",
    delivery_cost: 0,
    fee_cost: 0,
    ios_url: "",
    minimum_cost: 0,
    post_code: [],
    fav_icon: "",
    address:"",
    mobile:"",
    email:"",
   
  };
};



export interface Master {
  android_url: string;
  currency: string;
  delivery_cost: number;
  fee_cost: number;
  ios_url: string;
  minimum_cost: number;
  post_code: string[];
  fav_icon: string;
  address:string
  mobile:string
  email:string
  
}
