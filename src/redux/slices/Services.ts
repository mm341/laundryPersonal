import { HomeAreas } from "@/interfaces/HomeAreas";
import { HomeServices } from "@/interfaces/HomeServices";
import { ServicesModel } from "@/models/ServicesSliceModel";
import { language } from "@/models/languageSliceModel";
import PublicRequest from "@/utils/PublicRequests";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//   GetAllServices
export const GetAllServices = createAsyncThunk("addresse/GetAllServices", () =>
  PublicRequest.getData("services")
);



//   GetAllBanners
export const GetAllBanners = createAsyncThunk("addresse/GetAllBanners", () =>
  PublicRequest.getData("banners")
);




//   GetAllAreas
export const GetAllAreas = createAsyncThunk("addresse/GetAllAreas", () =>
  PublicRequest.getData("areas")
);
const initialState: ServicesModel = {
  services: [],
  areas: [],
  banners:[]
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

  extraReducers: (builder) => {
    //  GetAllServices
    builder.addCase(GetAllServices.pending, (state: ServicesModel) => {
      state.services = [];
    });
    builder.addCase(
      GetAllServices.fulfilled,
      (state: ServicesModel, { payload }: any) => {
        if (payload?.data?.services?.length > 0) {
          state.services = payload?.data?.services;
        } else {
          state.services = [];
        }
      }
    );
    builder.addCase(GetAllServices.rejected, (state: ServicesModel) => {
      state.services = [];
    });

    //  get areas
    builder.addCase(GetAllAreas.pending, (state: ServicesModel) => {
      state.areas = [];
    });
    builder.addCase(
      GetAllAreas.fulfilled,
      (state: ServicesModel, { payload }: any) => {
        if (payload?.data?.areas?.length > 0) {
          state.areas = payload?.data?.areas;
        } else {
          state.areas = [];
        }
      }
    );
    builder.addCase(GetAllAreas.rejected, (state: ServicesModel) => {
      state.areas = [];
    });



    // GetAllBanners
     builder.addCase(GetAllBanners.pending, (state: ServicesModel) => {
      state.banners = [];
    });
    builder.addCase(
      GetAllBanners.fulfilled,
      (state: ServicesModel, { payload }: any) => {
        if (payload?.data?.banners?.length > 0) {
          state.banners = payload?.data?.banners;
        } else {
          state.banners = [];
        }
      }
    );
    builder.addCase(GetAllBanners.rejected, (state: ServicesModel) => {
      state.banners = [];
    });
  },
});

export const { CashServices, CashAreas } = ServicesSlice.actions;

export default ServicesSlice.reducer;
