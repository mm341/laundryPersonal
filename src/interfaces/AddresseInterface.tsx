export const initialAddresse =()=>{
  return{
    address_line: null,
  address_line2: null,
  address_name: "",
  area: "",
  block: "",
  delivery_note: null,
  district_id: null,
  flat_no: "",
  house_name: null,
  house_no: "",
  id: 0,
  latitude: null,
  longitude: null,
  post_code: null,
  road_no: "",
  sub_district_id: null,
  }
}



export interface AddresseInterface {
  address_line: null;
  address_line2: null;
  address_name: string;
  area: string;
  block: string;
  delivery_note: null;
  district_id: null;
  flat_no: string;
  house_name: null;
  house_no: string;
  id: number;
  latitude: null;
  longitude: null;
  post_code: null;
  road_no: string;
  sub_district_id: null;
}
