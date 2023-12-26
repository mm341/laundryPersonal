import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import PublicRequest from "@/utils/PublicRequests";
import { UpdateProfileModel } from "@/models/UpdateProfileSlice";
import { AccountUpdate } from "@/interfaces/FormUpdateAccountInterface";

export const Updating = createAsyncThunk(
  "updateProfile/UpdateAccount",
  (payload: AccountUpdate) => PublicRequest.postFormData(payload, "users/update")
);

const initialState: UpdateProfileModel = {
  isloading: false,
};

export const UpdatingAccount = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(Updating.pending, (state: UpdateProfileModel) => {
      state.isloading = true;
    });
    builder.addCase(Updating.fulfilled, (state: UpdateProfileModel) => {
      state.isloading = false;
    });
    builder.addCase(Updating.rejected, (state: UpdateProfileModel) => {
      state.isloading = false;
    });
  },
});

export const UpdatingProfile = UpdatingAccount.reducer;
