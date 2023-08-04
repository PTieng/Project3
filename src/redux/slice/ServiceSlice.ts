import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firestore } from "../../Firebase";
export interface ServiceType {
  id?: string;
  idService: string;
  name: string;
  description: string;
  activeService: string;
}

interface ServiceState {
  services: ServiceType[];
}

const initialState: ServiceState = {
  services: [],
};

export const fetchDataService = createAsyncThunk(
  "firestore/service",
  async () => {
    const collection = await firestore.collection("services").get();
    const services = collection.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as ServiceType)
    );
    return services;
  }
);

export const addService = createAsyncThunk(
  "firestore/add/service",
  async (service: ServiceType) => {
    const collection = await firestore.collection("services").add(service);
    service.id = collection.id;
    return service;
  }
);

export const updateService = createAsyncThunk(
  "firestore/update/service",
  async (service: ServiceType) => {
    const { id, ...updateService } = service;
    await firestore.collection("services").doc(id).update(updateService);
    return service;
  }
);
const deviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDataService.fulfilled, (state, action) => {
        state.services = action.payload;
      })
      .addCase(
        addService.fulfilled,
        (state, action: PayloadAction<ServiceType>) => {
          state.services.push(action.payload);
        }
      )
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.services.findIndex(
          (service) => service.id === action.payload.id
        );
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      });
  },
});
export default deviceSlice.reducer;
