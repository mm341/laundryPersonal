import { FooterSocialLinks } from "@/interfaces/FooterSocialLinks";
import { Master } from "@/interfaces/MasterInterface";
import { MasterModel } from "@/models/MasterSliceModel";
import PublicRequest from "@/utils/PublicRequests";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//  update account
export const ResendCode = createAsyncThunk(
  "updateProfile/UpdateAccount",
  (payload: { mobile: string | undefined }) =>
    PublicRequest.postData(payload, "resend/otp")
);
const initialState: MasterModel = {
  master: {
    android_url: "",
    currency: "",
    delivery_cost: 0,
    fee_cost: 0,
    ios_url: "",
    minimum_cost: 0,
    post_code: [],
    fav_icon: "",
    address: "",
    mobile: "",
    email: "",
  },
  footerLinks: [],
};

// Action creators are generated for each case reducer function
export const MasterSlice = createSlice({
  name: "master",
  initialState,
  reducers: {
    CashMasterData: (state: MasterModel, action: PayloadAction<Master>) => {
      state.master = action.payload;
    },
    CashFooterLinks: (
      state: MasterModel,
      action: PayloadAction<FooterSocialLinks[]>
    ) => {
      state.footerLinks = action.payload;
    },
  },
});

export const { CashMasterData, CashFooterLinks } = MasterSlice.actions;

export default MasterSlice.reducer;
