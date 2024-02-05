export const initialAddresse = () => {
  return {
    address_name: "",
    building_no: "",
    apartment_no: "",
    floor_no: "",
    id: "",
    latitude: 0,
    longitude: 0,
    street: "",
    is_default: 0,
    address_location: "",
  };
};

export interface AddresseInterface {
  address_name: string;
  building_no: string;
  apartment_no: string;
  floor_no: string;
  id: string;
  latitude: number;
  longitude: number;
  street: string;
  is_default: number;
  address_location: string;
}
