import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import PublicRequest from "@/utils/PublicRequests";
import { UpdateProfileModel } from "@/models/UpdateProfileSlice";
import { AccountUpdate } from "@/interfaces/FormUpdateAccountInterface";
import { inititalAccountInfo } from "@/interfaces/AccountInfo";
import PublicHandelingErrors from "@/utils/PublicHandelingErrors";

//  get profile data
export const GetProfileData = createAsyncThunk(
  "updateProfile/GetProfileData",
  () =>
    PublicRequest.getData("customer/profile")
      .then((res: any) => {
        if (res) {
          // toast.success(res?.message);
          return res
        }
      })
      .catch((err) => PublicHandelingErrors.onErrorResponse(err))
);

//  update account
export const Updating = createAsyncThunk(
  "updateProfile/UpdateAccount",
  (payload: AccountUpdate) =>
    PublicRequest.postFormData(payload, "users/update")
);

const initialState: UpdateProfileModel = {
  isloading: false,
  accountInfo: inititalAccountInfo(),
};

export const UpdatingAccount = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    SaveProfileData: (state, { payload }) => {
      state.accountInfo = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(Updating.pending, (state: UpdateProfileModel) => {
      state.isloading = true;
    });
    builder.addCase(
      Updating.fulfilled,
      (state: UpdateProfileModel, { payload }: any) => {
        state.isloading = false;
        if (payload) {
          state.accountInfo = payload.data.user;
        }
      }
    );
    builder.addCase(Updating.rejected, (state: UpdateProfileModel) => {
      state.isloading = false;
    });

    builder.addCase(GetProfileData.pending, (state: UpdateProfileModel) => {
      // state.isloading = true;
    });
    builder.addCase(
      GetProfileData.fulfilled,
      (state: UpdateProfileModel, {payload}:any) => {
       
        if (payload) {
          state.accountInfo = payload?.data?.customer?.user;
        }
        
      }
    );
    builder.addCase(GetProfileData.rejected, (state: UpdateProfileModel) => {
      // state.isloading = false;
    });
  },
});
export const { SaveProfileData } = UpdatingAccount.actions;
export const UpdatingProfile = UpdatingAccount.reducer;
