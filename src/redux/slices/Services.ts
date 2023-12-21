import { HomeAreas } from "@/interfaces/HomeAreas";
import { HomeServices } from "@/interfaces/HomeServices";
import { ServicesModel } from "@/models/ServicesSliceModel";
import { language } from "@/models/languageSliceModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ServicesModel = {
  services: [],
  areas: [],
};

// Action creators are generated for each case reducer function
export const ServicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    CashServices: (
      state: ServicesModel,
      action: PayloadAction<HomeServices[]>
    ) => {
      state.services = action.payload;
    },
    CashAreas: (state: ServicesModel, action: PayloadAction<HomeAreas[]>) => {
      state.areas = action.payload;
    },
  },
});

export const { CashServices, CashAreas } = ServicesSlice.actions;

export default ServicesSlice.reducer;
