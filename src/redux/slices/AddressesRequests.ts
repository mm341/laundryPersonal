import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import PublicRequest from "@/utils/PublicRequests";
import { AddressesModel } from "@/models/AddresseSliceModel";
import PublicHandelingErrors from "@/utils/PublicHandelingErrors";
import { toast } from "react-hot-toast";

export const GetAllAdddressses = createAsyncThunk(
  "addresse/GetAllAdddressses",
  () => PublicRequest.getData("addresses")
);

export interface addAddressePayload {
  address_name?: string;
  // area?: string;
  block?: string;
  flat_no?: string;
  house_no?: string;
  road_no?: string;
  id?: number;
  latitude?:number
  longitude?:number
}

export const AddAddresse = createAsyncThunk(
  "updateProfile/AddAddresse",
  (payload: addAddressePayload) =>
    PublicRequest.postData(payload, `addresses`)
      .then((res: any) => {
        if (res) {
          toast.success(res?.message);
        }
      })
      .catch((err) => PublicHandelingErrors.onErrorResponse(err))
);

export const UpdateAddresse = createAsyncThunk(
  "updateProfile/UpdateAddresse",
  (payload: addAddressePayload) =>
    PublicRequest.postData(payload, `addresses/${payload?.id}`)
      .then((res: any) => {
        if (res) {
          toast.success(res?.message);
        }
      })
      .catch((err) => PublicHandelingErrors.onErrorResponse(err))
);

const initialState: AddressesModel = {
  isloading: false,
  myAddresses: [],
  isLoadingAddAddresse: false,
};

export const AddresseSlice = createSlice({
  name: "addresse",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //  get addresses
    builder.addCase(GetAllAdddressses.pending, (state: AddressesModel) => {
      state.isloading = true;
      state.myAddresses = [];
    });
    builder.addCase(
      GetAllAdddressses.fulfilled,
      (state: AddressesModel, { payload }: any) => {
        state.isloading = false;
        state.myAddresses = payload?.data?.addresses;
      }
    );
    builder.addCase(GetAllAdddressses.rejected, (state: AddressesModel) => {
      state.isloading = false;
      state.myAddresses = [];
    });
    //  post add address
    builder.addCase(AddAddresse.pending, (state: AddressesModel) => {
      state.isLoadingAddAddresse = true;
    });
    builder.addCase(
      AddAddresse.fulfilled,
      (state: AddressesModel, { payload }: any) => {
        state.isLoadingAddAddresse = false;
      }
    );
    builder.addCase(AddAddresse.rejected, (state: AddressesModel) => {
      state.isLoadingAddAddresse = false;
    });

    //  post update address
    builder.addCase(UpdateAddresse.pending, (state: AddressesModel) => {
      state.isLoadingAddAddresse = true;
    });
    builder.addCase(
      UpdateAddresse.fulfilled,
      (state: AddressesModel, { payload }: any) => {
        state.isLoadingAddAddresse = false;
      }
    );
    builder.addCase(UpdateAddresse.rejected, (state: AddressesModel) => {
      state.isLoadingAddAddresse = false;
    });
  },
});

export const AddressesSlice = AddresseSlice.reducer;
