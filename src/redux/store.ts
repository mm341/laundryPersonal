import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import ServicesSlice from "./slices/Services";
import MasterSlice from "./slices/MasterSlice";
import { UpdatingProfile } from "./slices/HandelUpdateProfile";
import { AddressesSlice } from "./slices/AddressesRequests";
import { OrderSlice } from "./slices/OrderSlice";
import { ProductsSlice } from "./slices/ProductsSlice";
import { NotificationsSlice } from "./slices/Notifications";

const persistConfig = {
  key: "Laundry",
  storage: storage,
  blacklist: [""],
  wishListSlice: ["services", "master", "profile"],
};
const reducers = combineReducers({
  services: ServicesSlice,
  master: MasterSlice,
  profile: UpdatingProfile,
  addresse: AddressesSlice,
  orders: OrderSlice,
  products: ProductsSlice,
  notification: NotificationsSlice,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //     ignoredActions: [
      //         FLUSH,
      //         REHYDRATE,
      //         PAUSE,
      //         PERSIST,
      //         PURGE,
      //         REGISTER,
      //     ],
      // },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
