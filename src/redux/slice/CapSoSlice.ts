import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firestore } from "../../Firebase";

export interface CapSoType {
  id?: string;
  cusName: string;
  active: string;
  dateCap: string;
  hsd: string;
  nguonCap: string;
  serviceName: string;
  stt: string;
  quay: number;
}

interface CapSoState {
  capSo: CapSoType[];
}

const initialState: CapSoState = {
  capSo: [],
};

export const fetchDataCapSo = createAsyncThunk("firestore/capso", async () => {
  const collection = await firestore.collection("capSo").get();
  const capSo = collection.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as CapSoType)
  );
  return capSo;
});

export const addCapSo = createAsyncThunk(
  "firestore/add",
  async (capSo: CapSoType) => {
    const collection = await firestore.collection("capSo").add(capSo);
    capSo.id = collection.id;
    return capSo;
  }
);

export const capSoSlice = createSlice({
  name: "capSo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDataCapSo.fulfilled, (state, action) => {
        state.capSo = action.payload;
      })
      .addCase(
        addCapSo.fulfilled,
        (state, action: PayloadAction<CapSoType>) => {
          state.capSo.push(action.payload);
        }
      );
  },
});

export default capSoSlice.reducer;
