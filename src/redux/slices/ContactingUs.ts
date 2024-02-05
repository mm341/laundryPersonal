import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import PublicRequest from "@/utils/PublicRequests";

import { ContactInterface } from "@/interfaces/ContactInterface";
import { toast } from "react-hot-toast";
import PublicHandelingErrors from "@/utils/PublicHandelingErrors";

//  update account

interface state {
  isloading: boolean;
}
export const ContactingRequest = createAsyncThunk(
  "contacting/ContactingRequest",
  (payload: ContactInterface) =>
    PublicRequest.postData(payload, "contacts")
      .then((res: any) => {
        if (res) {
          toast.success(res?.message);
          return res;
        }
      })
      .catch((err) => PublicHandelingErrors.onErrorResponse(err))
);

const initialState: state = {
  isloading: false,
};

export const Contacting = createSlice({
  name: "contacting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ContactingRequest.pending, (state: state) => {
      state.isloading = true;
    });
    builder.addCase(
      ContactingRequest.fulfilled,
      (state: state, { payload }: any) => {
        state.isloading = false;
      }
    );
    builder.addCase(ContactingRequest.rejected, (state: state) => {
      state.isloading = false;
    });
  },
});

export const ContactingSlice = Contacting.reducer;
