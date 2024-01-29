export const inititalAccountInfo = () => {
  return {
    alternative_phone: "",
    date_of_birth: null,
    driving_lience: null,
    email: "",
    first_name: "",
    gender: null,
    id: 0,
    is_active: false,
    join_date: "",
    last_name: null,
    mobile: "",
    mobile_verified_at: "",
    name: "",
    profile_photo_path: "",
  };
};

export interface AccountInfo {
  alternative_phone: string;
  date_of_birth: null;
  driving_lience: null;
  email: string;
  first_name: string;
  gender: null;
  id: string;
  is_active: boolean;
  join_date: string;
  last_name: null;
  mobile: string;
  mobile_verified_at: string;
  name: string;
  profile_photo_path: string;
}
