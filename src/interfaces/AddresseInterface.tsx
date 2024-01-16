export const initialAddresse = () => {
  return {
    address_name: "",
    building_no: "",
    apartment_no: "",
    floor_no: "",
    id: "",
    latitude: "",
    longitude: "",
    street: "",
  };
};

export interface AddresseInterface {
  address_name: string;
  building_no: string;
  apartment_no: string;
  floor_no: string;
  id: string;
  latitude: string;
  longitude: string;
  street: string;
}
