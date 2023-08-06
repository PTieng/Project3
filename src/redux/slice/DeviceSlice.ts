import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firestore } from "../../Firebase";
export interface DeviceType {
  id?: string | undefined;
  idTB: string;
  name: string;
  ip: string;
  type: string;
  active: string;
  usedService: string[];
  userName: string;
  password: string;
  connect: string;
}

interface DeiviceState {
  devices: DeviceType[];
}

const initialState: DeiviceState = {
  devices: [],
};

export const fetchData = createAsyncThunk("firestore/fetchData", async () => {
  const collection = await firestore.collection("devices").get();
  const devices = collection.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as DeviceType)
  );
  return devices;
});

export const addDevice = createAsyncThunk(
  "device/add",
  async (device: DeviceType) => {
    const collection = await firestore.collection("devices").add(device);
    device.id = collection.id;
    return device;
  }
);

export const updateDevice = createAsyncThunk(
  "device/update",
  async (device: DeviceType) => {
    const { id, ...updatedData } = device;
    await firestore.collection("devices").doc(id).update(updatedData);
    return device;
  }
);


const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.devices = action.payload;
      })
      .addCase(
        addDevice.fulfilled,
        (state, action: PayloadAction<DeviceType>) => {
          state.devices.push(action.payload);
        }
      )
      .addCase(updateDevice.fulfilled, (state, action) => {
        const index = state.devices.findIndex(
          (device) => device.id === action.payload.id
        );
        if (index !== -1) {
          state.devices[index] = action.payload;
        }
      });
  },
});
export default deviceSlice.reducer;
