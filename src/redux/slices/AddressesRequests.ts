import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import PublicRequest from "@/utils/PublicRequests";
import { AddressesModel } from "@/models/AddresseSliceModel";

export const GetAllAdddressses = createAsyncThunk(
  "addresse/GetAllAdddressses",
  () => PublicRequest.getData("addresses")
);

const initialState: AddressesModel = {
  isloading: false,
  myAddresses: [],
};

export const AddresseSlice = createSlice({
  name: "addresse",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
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
  },
});

export const AddressesSlice = AddresseSlice.reducer;
