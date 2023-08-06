import { configureStore } from "@reduxjs/toolkit";
import DeviceSlice from "../slice/DeviceSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ServiceSlice from "../slice/ServiceSlice";
import UserSlice from "../slice/UserSlice";

export const store = configureStore({
  reducer: {
    devices: DeviceSlice,
    services: ServiceSlice,
    users: UserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;
